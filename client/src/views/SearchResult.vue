<template>
  <div>
    <NavBar />
    <div class="results-main-container">
      <div class="search-bar-container">
        <div id="search-bar">
          <h3 id="results-for">Results for:</h3>
          <b-form-input list="suggestions" autocomplete="off" id="input-bar-search" @click="onLoad()" @input="onButtonPress(urlParamsSearch)" v-model="urlParamsSearch" placeholder="Search for a service..."></b-form-input>
          <datalist id="suggestions">
            <option v-for="suggestion in suggestions" v-bind:key="suggestion.name">{{ suggestion.name }}</option>
          </datalist>
          <b-button @click="getList()" id="search-button">Search</b-button>
        </div>
        <div class="filter">
          <b-dropdown id="sort-by-btn" text="Sort By">
            <b-dropdown-item @click="reload('price', true)">Price</b-dropdown-item>
            <b-dropdown-item @click="reload('name', true)">Name</b-dropdown-item>
            <b-dropdown-item @click="reload('address', true)">Address</b-dropdown-item>
            <b-dropdown-item @click="reload('duration', true)">Duration</b-dropdown-item>
            <b-dropdown-item @click="reload('', false)">No Filter</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <Accordion :key="rerenderIndex" :services="this.services"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import Accordion from '@/components/Accordion.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'searchResult',
  data() {
    return {
      visible: false,
      services: [],
      urlParams: window.location.search,
      urlParamsSearch: '',
      rerenderIndex: 1,
      globalOrdering: '',
      suggestions: []
    }
  },
  async mounted() {
    let tempArr = []
    const params = new URLSearchParams(this.urlParams)
    this.urlParamsSearch = params.get('queryResult')

    const searchPath = params !== ''
      ? 'v1/services' + this.urlParams
      : 'v1/services'

    await Api.get(searchPath)
      .then(response => {
        tempArr = response.data
      })
      .catch(error => {
        console.log(error)
        tempArr = []
      })
    if (tempArr.length > 0) await this.createAccordionList(tempArr)
  },
  methods: {
    async createAccordionList(tempArr) {
      let counter = 1
      tempArr.forEach(async element => {
        let tempElement
        await Api.get('v1/providers/' + element.providerId)
          .then(response => { tempElement = response.data })
          .catch(err => { console.log(err) })
        this.services.push({
          ...element,
          providerName: tempElement.name,
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
    },
    async onButtonPress(input) {
      await Api.get('v1/services?queryResult=' + input)
        .then(response => {
          this.suggestions = response.data
          return this.suggestions
        })
        .catch(error => {
          console.log(error)
        })
    },
    onLoad() {
      document.getElementById('input-bar').addEventListener('keypress', event => {
        if (event.key === 'Enter') {
          location.replace(window.location.href + this.searchValue + this.input)
        }
      })
    },
    async getAppendedList(ordering) {
      const sortByCondition = 'sort=' + ordering
      this.globalOrdering = sortByCondition

      await Api.get('v1/services' + this.urlParams + '&' + sortByCondition)
        .then(response => {
          this.services = response.data
        })
        .catch(error => {
          this.services = error
        })
    },
    async getList() {
      // add + this.urlParamsSearch
      location.replace('results?queryResult=' + this.urlParamsSearch)

      // temporary get method, has no filter or index applied
      await Api.get('v1/services?queryResult=' + this.urlParamsSearch)
        .then(response => {
          this.services = response.data
        })
        .catch(error => {
          this.services = error
        })
    },
    reload(ordering, isSorted) {
      // this.getAppendedList(ordering)
      // window.location.search += '&sort=' + ordering
      isSorted === true
        ? location.replace('results?queryResult=' + this.urlParamsSearch + '&sort=' + ordering)
        : location.replace('results?queryResult=' + this.urlParamsSearch)
      this.rerenderIndex += 1
      // window.location.reload()
    }
  },
  components: { Accordion, NavBar }
}
</script>

<style>
.results-main-container {
    display: flex;
    flex-direction: column;
    padding-bottom: 2.75rem;
}

.search-bar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#search-button {
  border-radius: 100px;
  width: 18%;
}

#search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  width: 40%;
  height: 10rem;
}

#search-bar > * {
  margin: 1rem;
}

#input-bar-search {
  border-radius: 100px;
  margin: auto
}

.filter {
  width: 60%;
  align-self: flex-end;
}

.filter > * {
  margin: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
}

#filter-by-btn, #sort-by-btn {
  border-radius: 100px;
  width: 10%;
  background-color: rgb(136, 0, 0);
  border-color: brown;
}

@media screen and (max-width: 1055px){
  #filter-by-btn, #sort-by-btn {
    width: fit-content;
  }

  .filter {
    padding-top: 3rem;
    align-self: center
  }

  #search-button {
    width: fit-content
  }
}

#collapse-sortBy {
  position: fixed;
  z-index: 2;
  width: 15rem;
  margin-left: 17rem;
}

</style>
