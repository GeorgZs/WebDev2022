<template>
    <div class="search-bar">
        <b-form-input @click="onLoad()" id="input-bar"></b-form-input>
        <b-button :to="this.searchValue" id="search-button">Search</b-button>
    </div>
</template>

<script>
export default {
  name: 'searchBar',
  data() {
    return {
      searchValue: 'results?query='
    }
  },
  methods: {
    onLoad() {
      document.getElementById('input-bar').addEventListener('keypress', event => {
        if (event.key === 'Enter') {
          location.replace(window.location.href + this.searchValue)
        } else {
          this.searchValue += `${event.key}`
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
}
</style>
