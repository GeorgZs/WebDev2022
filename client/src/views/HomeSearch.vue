<template>
    <div>
        <NavBar/>
        <div class="main-container">
            <div class="page-content">
                <h1 style="padding-bottom: 2rem">What are you searching for</h1>
                <SearchBar></SearchBar>
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
    </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: { SearchBar, NavBar }
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
