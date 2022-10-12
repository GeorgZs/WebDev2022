<template>
    <div>
        <NavBar/>
        <div class="search-main-container">
            <div class="page-content">
                <h1 style="padding-bottom: 2rem">What are you searching for?</h1>
                <SearchBar></SearchBar>
                <b-col cols="6" class="recommendations">
                    <b-col>
                        <b-row class="justify-content-md-center">
                            <b-col cols="2"></b-col>
                            <b-col cols="8">
                                <h6 id="recom-text">Recommendations:</h6>
                                <b-row class="recommendation-list-top justify-content-md-center">
                                    <b-button v-if="list.length > 0" @click="navigate(list[0])" id="list-button">{{ list[0].name }}</b-button>
                                    <b-button v-if="list.length > 1" @click="navigate(list[1])" id="list-button">{{ list[1].name }}</b-button>
                                    <b-button v-if="list.length > 2" @click="navigate(list[2])" id="list-button">{{ list[2].name }}</b-button>
                                </b-row>
                                <b-row class="recommendation-list-bottom justify-content-md-center">
                                    <b-button v-if="list.length > 3" @click="navigate(list[3])" id="list-button">{{ list[3].name }}</b-button>
                                    <b-button v-if="list.length > 4" @click="navigate(list[4])" id="list-button">{{ list[4].name }}</b-button>
                                </b-row>
                            </b-col>
                            <b-col cols="2"></b-col>
                        </b-row>
                    </b-col>
                </b-col>
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
  },
  methods: {
    navigate(buttonItem) {
      this.$router.push('/results?query=' + buttonItem.name)
    }
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
    align-self: center;
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
