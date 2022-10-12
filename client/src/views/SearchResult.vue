<template>
  <div>
    <NavBar />
    <div class="results-main-container">
      <div class="search-bar-container">
        <div id="search-bar">
          <h3 id="results-for">Results for:</h3>
          <b-form-input id="input-bar-search" v-model="urlParamsSearch"></b-form-input>
              <!--add filter and sort for the results-->
          <b-button @click="getList()" id="search-button">Search</b-button>
        </div>
        <div class="filter">
          <b-button v-b-toggle.collapse-sortBy id="sort-by-btn">Sort By</b-button>
          <b-collapse id="collapse-sortBy" class="mt-2">
            <b-card>
              Sort by
              <b-form-checkbox-group v-model="categoryChecked">
                <b-form-checkbox value="name">Name</b-form-checkbox>
                <b-form-checkbox value="duration">Duration</b-form-checkbox>
                <b-form-checkbox value="price">Price</b-form-checkbox>
                <b-form-checkbox value="location">Location</b-form-checkbox>
              </b-form-checkbox-group>
              <br>
              Order by
              <b-form-checkbox-group v-model="ordering">
                <b-form-checkbox value="asc">Asc</b-form-checkbox>
                <b-form-checkbox value="desc">Desc</b-form-checkbox>
              </b-form-checkbox-group>
              <b-button @click="reload()">Apply Filter</b-button>
            </b-card>
          </b-collapse>
          <b-button id="filter-by-btn">Filter By</b-button>
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
      ordering: [],
      categoryChecked: [],
      rerenderIndex: 1
    }
  },
  async mounted() {
    let tempArr = []
    const params = new URLSearchParams(this.urlParams)
    // needs to be included in query
    this.urlParamsSearch = params.get('query')
    await Api.get('v1/services')
      .then(response => {
        tempArr = response.data
      })
      .catch(error => {
        tempArr = error
      })

    await this.createAccordionList(tempArr)
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
    async getAppendedList() {
      const ordering = this.ordering[0] === 'asc' ? 1 : this.ordering[0] === 'desc' ? -1 : 0
      const sortByCondition = '?sort=' + this.categoryChecked[0] + ':' + ordering

      await Api.get('v1/services' + sortByCondition)
        .then(response => {
          this.services = response.data
        })
        .catch(error => {
          this.services = error
        })
    },
    async getList() {
      // add + this.urlParamsSearch
      location.replace('results?query=' + this.urlParamsSearch)

      // temporary get method, has no filter or index applied
      await Api.get('v1/services')
        .then(response => {
          this.services = response.data
        })
        .catch(error => {
          this.services = error
        })
    },
    reload() {
      this.getAppendedList()
      this.rerenderIndex += 1
    }
  },
  components: { Accordion, NavBar }
}
</script>

<style>
.results-main-container {
    display: flex;
    flex-direction: column;
}

.search-bar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
