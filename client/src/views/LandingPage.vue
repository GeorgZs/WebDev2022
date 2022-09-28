<template>
    <div class="main-container-landing">
        <div id="left-section">
          <img width="160px" height="160px" src="./IMG_20211129_080633__01.jpg" alt="LOGO"/>
          <div class="description-box">
            <div class="details-box">
              <!--map-->
              <p>Here are the descriptions</p>
            </div>
          </div>
        </div>
        <div id="right-section">
          <div class="right-container">
            <h2>NAME</h2>
            <p>DESCRIPTION</p>
            <Accordion :services="this.providerServices"></Accordion>
          </div>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      landingPageData: {},
      providerServices: [],
      // flag for rendering optional html elements
      loggedIn: false
    }
  },
  async mounted() {
    let tempArr = []

    await Api.get('/v1/' + this.$route.params)
      .then(response => {
        this.landingPageData = response.data
      })
      .catch(err => {
        this.landingPageData = err
      })
    await Api.get('v1/providers/' + this.$route.params.providerId + '/services')
      .then(response => {
        tempArr = response.data
      })
      .catch(error => {
        tempArr = error
      })

    let counter = 1
    tempArr.forEach(element => {
      this.providerServices.push({
        ...element,
        isFormValid: 'null',
        visible: false,
        counter: 'collapse-' + counter,
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
}
</script>

<style>
.main-container-landing {
  display: flex;
  flex-direction: row;
  margin: 5rem 16rem 2rem 16rem;
}

#left-section {
  justify-self: flex-start;
}

#right-section {
  justify-self: center;
  width: 100%;
}

.details-box {
  margin-top: 4rem;
}

.main-container-landing > * {
  padding: 2rem;
}
</style>
