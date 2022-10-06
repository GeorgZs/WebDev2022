<template>
    <div>
        <NavBar/>
        <div class="search-main-container">
            <div class="page-content">
                <h1 style="padding-bottom: 2rem">What are you searching for?</h1>
                <SearchBar></SearchBar>
                <div class="recommendations">
                    <h6 id="recom-text">Recommendations</h6>
                    <div class="recommendation-list-top">
                        <b-button id="list-button">{{ this.list[0].name }}</b-button>
                        <b-button id="list-button">{{ this.list[1].name }}</b-button>
                        <b-button id="list-button">{{ this.list[2].name }}</b-button>
                    </div>
                    <div class="recommendation-list-bottom">
                        <b-button id="list-button">{{ this.list[3].name }}</b-button>
                        <b-button id="list-button">{{ this.list[4].name }}</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'

import SearchBar from '@/components/SearchBar.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: { SearchBar, NavBar },
  data() {
    return {
      list: []
    }
  }, // finish the onclick for searching via the randomized buttons
  async mounted() {
    await Api.get('v1/services')
      .then(response => {
        this.list = response.data
        this.list.sort(() => Math.random() - 0.5)
      })
      .catch(err => { this.list = err })
  }
}
</script>

<style>
.search-main-container {
    height: 70vh;
}

.page-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8rem;
}

.recommendations {
    width: 100vh;
}

#recom-text {
    margin-bottom: 1.25rem;
}

#list-button {
    border-radius: 100px;
    width: fit-content;
    background-color:#0b7e74
}

.recommendation-list-top > *, .recommendation-list-bottom > * {
    margin: 0.40rem;
}
</style>
