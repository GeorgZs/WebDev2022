<template>
    <div class="main-container">
        <div :onload="loadServices()" class="list-container">
            <div id="list" v-for="service in services" :key="service._id">
                <div class="details">
                    <div>Name: {{ service.name }}</div>
                    <div>Price: {{ service.price }}</div>
                    <div>Duration: {{ service.duration }}</div>
                    <div>Details: {{ service.details }}</div>
                </div>
                <div class="form">
                    FD
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { services } from './HomeSearch.vue'
import { Api } from '@/Api'

console.log(services)

export default {
  name: 'searchResult',
  data() {
    return {
      services: services,
      urlParams: window.location.search
    }
  },
  methods: {
    async loadServices() {
      // await Api.get('v1/services?search=' + this.query) for query
      // + this.urlParams
      await Api.get('v1/services')
        .then(response => {
          this.services = response.data
        })
        .catch(error => {
          this.services = error
        })
      console.log(services)
    }
  }
}
</script>

<style>
.list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#list {
    width: 100vh;
    display: flex;
    justify-content: space-evenly;
    margin: 0.25rem;
    border: 0.05rem solid black;
    width: 60%;
}
</style>
