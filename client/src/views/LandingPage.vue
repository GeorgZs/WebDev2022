<script>
import NavBar from '@/components/NavBar.vue'
import Accordion from '@/components/Accordion.vue'
import { Api } from '@/Api'

export default {
  data() {
    return {
      providerId: this.$route.params.providerId,
      serviceList: [],
      name: undefined,
      sector: undefined,
      address: undefined,
      email: undefined,
      phoneNumber: undefined,
      logo: '/404.png',
      content: undefined
    }
  },
  async mounted() {
    const { data: provider } = await Api.get(`/v1/providers/${this.providerId}`)
    const { data: landingPage } = await Api.get(`/v1/providers/${this.providerId}/landingPages`)

    this.name = provider.name
    this.sector = provider.sector
    this.address = provider.address
    this.email = provider.email
    this.phoneNumber = provider.phoneNumber
    this.logo = landingPage.logo || '/404.png'
    this.content = landingPage.content

    let tempArr = []

    await Api.get('v1/providers/' + this.providerId + '/services')
      .then(response => { tempArr = response.data })
      .catch(err => { console.log(err) })
    await this.createAccordionList(tempArr)
  },

  methods: {
    async createAccordionList(tempArr) {
      let counter = 1
      tempArr.forEach(async element => {
        this.serviceList.push({
          ...element,
          isFormValid: 'null',
          visible: false,
          counter: 'collapse-' + counter,
          popUp: 'modal-' + counter,
          confirmDelete: false,
          confirmEdit: false,
          formInput: {
            name: '',
            email: '',
            phoneNumber: '',
            message: '',
            date: '',
            timePeriod: ''
          }
        })
        counter++
      })
    }
  },
  components: {
    NavBar,
    Accordion
  }
}
</script>

<template>
  <div class="landing-page">
    <NavBar />
    <div id="provider">
      <div class="info">
        <img class="logo" :src="logo"/>
        <div class="provider-info">
          <div class="primary-info">
          <h2 class="heading"><span class="name">{{name}}</span><span class="sector">・{{sector}}</span></h2>
          <span class="address"><b-icon icon="geo" /> {{address}}</span>
        </div>
        <div class="contact-info">
          <a :href="'mailto:' + email"><b-icon icon="envelope" /> {{email}}</a>
          <a :href="'tel:' + phoneNumber"><b-icon icon="telephone" /> {{phoneNumber}}</a>
        </div>
        </div>

      </div>
      <span class="provider-content">{{content}}</span>
      <h3 class="service-list-header">Services</h3>
      <Accordion :services="serviceList" isLandingPage/>
    </div>
  </div>
</template>

<style>
.landing-page {
  text-align: left;
}

#provider {
  display: flex;
  flex-direction: column;
}

.info {
  width: 100%;
  padding: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  background: whitesmoke;
}

.provider-info {
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
}

.info a {
  padding: 0.5rem 1rem;

  color: #0d9488;
  text-decoration: none;

  border-radius: 0.5rem;
  transition: all 0.65s;
}

.info a:hover {
  color: #0d9488;
  text-decoration: none;
  background-color: #f0fdfa;
}

.logo {
  height: 10rem;
  width: 10rem;
  object-fit: cover;

  border-radius: 100%;
  border: 0.25rem solid white;
  background-color: white;

  margin-right: 1rem;
}

.primary-info {
  padding: 0.5rem 1.5rem;

  display: flex;
  flex-direction: column;
}

.heading {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;

  font-size: 1.25rem;
  margin: 0;
}

.name {
  font-size: 1.75rem;
  color: #0d9488;
}

.contact-info {
  padding: 0.5rem;

  display: flex;
  flex-wrap: wrap;
  row-gap: 0.25rem;
}

.provider-content {
  padding: 4rem 3rem;
  padding-top: 0;

  white-space: pre-line;
  background: whitesmoke;
}

#provider h3 {
  color: #115E59;

  font-size: 1.5rem;
  margin: 2rem 0;
}

.service-list-header {
  align-self: center;
}

</style>
