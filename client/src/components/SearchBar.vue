<template>
    <div class="search-bar">
      <b-form-input id="input-bar" @click="onLoad()" @change="onButtonPress(input)" v-model="input" autocomplete="off" placeholder="Search for a service..."/>
      <datalist id="input-bar">
        <option v-for="suggestion in suggestions" v-bind:key="suggestion.name">{{ suggestion.name }}</option>
      </datalist>
      <b-button :to="searchValue + input" id="search-button">Search</b-button>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'searchBar',
  data() {
    return {
      searchValue: 'results?queryResult=',
      input: '',
      suggestions: []
    }
  },
  methods: {
    onLoad() {
      document.getElementById('input-bar').addEventListener('keypress', event => {
        if (event.key === 'Enter') {
          location.replace(window.location.href + this.searchValue + this.input)
        }
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
    }
  }
}
</script>

<style>
.search-bar {
    padding-bottom: 5rem;
}

.search-bar > * {
    margin: 1rem;
}

#input-bar {
    border-radius: 100px;
    margin: auto;
    margin-bottom: 1rem;
    height: 2.75rem;
}

@media screen and (max-width: 700px) {
  #input-bar {
    width: 90%
  }
}

@media screen and (max-width: 570px) {
  #input-bar {
    width: 70%
  }
}

@media screen and (max-width: 510px) {
  #input-bar {
    width: 50%
  }
}

#search-button {
    border-radius: 100px;
    width: 18%;
    background-color:#0d9488;
}
</style>
