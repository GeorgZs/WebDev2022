<template>
    <div>
        <NavBar/>
        <div class="search-main-container">
            <div class="page-content">
                <b-col cols="12" md="6" class="justify-content-md-center">
                    <h1 class="banner">What are you searching for?</h1>
                    <SearchBar></SearchBar>
                </b-col>
                <b-col cols="12" md="6" class="recommendations">
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
                <div id="about">
                    <b-col cols="12" md="6" class="justify-content-md-center">
                        <h1 class="banner">What is <img src="/logo-text.svg" alt="Fürdu"/></h1>
                        <p>Fürdu is a rough translation of "for you" in german, reflecting our core value of our system: a software that finds the right service provider for you! We are here for users in need of a service and for small businesses who want to increase the online visibility of their services. We connect people in need of a service to be done with the best local businesses who can help them.</p>
                    </b-col>
                    <div class="team">
                        <figure>
                            <img class="upper" src="/ivan.jpg" alt="Ivan"/>
                            <figcaption>Ivan "the relaxed one"</figcaption>
                        </figure>
                        <figure>
                            <img class="upper" src="/georg.jpg" alt="Georg"/>
                            <figcaption>Georg "the bossy one"</figcaption>
                        </figure>
                        <figure>
                            <img class="upper" src="/lance.jpg" alt="Lance"/>
                            <figcaption>Lance "the part-time one"</figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <span id="footer">Copyrights © Fürdu All Rights Reserved</span>
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
  },
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
      this.$router.push('/results?queryResult=' + buttonItem.name)
    }
  }
}
</script>

<style>
.banner {
    padding-bottom: 2rem;
    font-weight: 600;
    font-size: 2.5rem;
}

@media screen and (max-width: 630) {
    .banner {
        font-size: 2rem;
    }
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
    background-color:#0b7e74;
}

.recommendation-list-top > *, .recommendation-list-bottom > * {
    margin: 0.40rem;
}

.recommendation-list-top {
    justify-content: center;
}

.recommendation-list-bottom {
    justify-content: center;
}

#about {
    width: 100%;
    margin-top: 4rem;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    background: whitesmoke;
}

#about .banner {
    margin: 0;
    padding: 2rem 0;

    display: flex;
    align-items: baseline;
    justify-content: center;
}

#about .banner img {
    height: 2.5rem;
    margin: 0 0.5rem;
}

.team {
    padding: 2rem;
    gap: 2rem;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.upper {
    height: 12rem;
    width: 12rem;
    object-fit: cover;
    border-radius: 100%;

    border: 0.25rem solid white;
}

.team figcaption {
    margin-top: 1rem;

    color: #0d9488;
    font-size: 1.25rem;
}

#footer {
    padding: 2rem;
    display: flex;
    justify-content: center;
    font-weight: 600;
}
</style>
