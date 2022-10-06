<template>
    <div>
        <NavBar/>
        <div class="not-found-container">
            <img id="not-found-404-img" src='../images/output-onlinepngtools (2).png'/>
            <h1>This page was not found</h1>
            <span>Were you looking for the <router-link to="/">Home page</router-link> instead? &#129300;</span>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  components: { NavBar }
}
</script>

<style>
.not-found-container {
    margin-top: 1.5rem;
}

#not-found-404-img {
    width: 40rem;
    height: 20rem;
}
</style>
