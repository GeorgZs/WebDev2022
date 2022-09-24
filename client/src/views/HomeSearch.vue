<template>
    <div class="main-container">
        <div class="page-content">
            <h1 style="padding-bottom: 2rem">What are you searching for</h1>
            <div class="search-bar">
                <b-form-input @click="onLoad()" id="input-bar"></b-form-input>
                <b-button :to="this.searchValue" id="search-button">Search</b-button>
            </div>
            <div class="recommendations">
                <p>Recommendations</p>
                <div class="recommendation-list-top">
                    <b-button id="list-button">Temporary</b-button>
                    <b-button id="list-button">HAIR SALON</b-button>
                    <b-button id="list-button">Nail Technician sarah</b-button>
                </div>
                <div class="recommendation-list-bottom">
                    <b-button id="list-button">Plumber Mark renton</b-button>
                    <b-button id="list-button">Drill master</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'homeSearch',
  data() {
    return {
      searchValue: 'results?query='
    }
  },
  methods: {
    onLoad() {
      document.getElementById('input-bar').addEventListener('keypress', event => {
        this.searchValue += `${event.key}`
      })
    }
  }
}
</script>

<style>
.main-container {
    height: 70vh;
}

.page-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8rem;
}

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

.recommendations {
    width: 100vh;
}

#list-button {
    border-radius: 100px;
    width: fit-content;
}

.recommendation-list-top > *, .recommendation-list-bottom > * {
    margin: 0.40rem;
}
</style>
