<template>
    <div class="main-container">
      <div class="search-bar-container">
        <div id="search-bar">
          <h3 id="results-for">Result for:</h3>
          <b-form-input id="input-bar" v-model="this.urlParamsSearch"></b-form-input>
              <!--add filter and sort for the results-->
          <b-button @click="getList()" id="search-button">Search</b-button>
        </div>
      </div>
        <Accordion :services="this.services"></Accordion>
    </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import Accordion from '../components/Accordion.vue'

export default {
  name: 'searchResult',
  data() {
    return {
      visible: false,
      services: [],
      urlParams: window.location.search,
      urlParamsSearch: ''
    }
  },
  methods: {
    async getList() {
      // add + this.urlParamsSearch
      console.log('clicked')
      await Api.get('v1/services')
        .then(response => {
          this.services = response.data
        })
        .catch(error => {
          this.services = error
        })
    },
    accordionClick(card) {
      this.visible = card
    }
  },
  async mounted() {
    // await Api.get('v1/services?search=' + this.query) for query
    // + this.urlParams
    let tempArr = []
    const params = new URLSearchParams(this.urlParams)
    this.urlParamsSearch = params.get('query')
    await Api.get('v1/services')
      .then(response => {
        tempArr = response.data
      })
      .catch(error => {
        tempArr = error
      })

    let counter = 1
    tempArr.forEach(element => {
      this.services.push({
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
  },
  components: { Accordion }
}
</script>

<style>

.search-bar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#results-for {
  width: 30vh;
  margin-bottom: 0
}

#search-button {
  border-radius: 100px;
  width: 18%;
}

#search-bar {
  width: 100vh;
  display: flex;
  align-items: flex-start;
  height: fit-content;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

#search-bar > * {
  margin: 1rem;
}

#input-bar {
  border-radius: 100px;
  margin: auto;
}

</style>
