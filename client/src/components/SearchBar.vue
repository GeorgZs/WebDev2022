<template>
    <div class="search-bar">
        <b-form-input @click="onLoad()" v-model="input"  id="input-bar" placeholder="Search for a service or provider..."></b-form-input>
        <b-button :to="searchValue + input" id="search-button">Search</b-button>
    </div>
</template>

<script>
export default {
  name: 'searchBar',
  data() {
    return {
      searchValue: 'results?query=',
      input: ''
    }
  },
  methods: {
    onLoad() {
      document.getElementById('input-bar').addEventListener('keypress', event => {
        if (event.key === 'Enter') {
          location.replace(window.location.href + this.searchValue + this.input)
        }
      })
    }
  }
}
</script>

<style>
.search-bar {
    width: 100vh;
    padding-bottom: 6rem;
}

.search-bar > * {
    margin: 1rem;
}

#input-bar {
    border-radius: 100px;
    margin: auto;
}

#search-button {
    border-radius: 100px;
    width: 18%;
    background-color:#0d9488;
}
</style>
