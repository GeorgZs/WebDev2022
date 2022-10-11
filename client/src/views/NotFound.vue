<template>
    <div>
        <NavBar/>
        <b-row class="justify-content-md-center big-row">
            <b-col cols="2"/>
            <b-col cols="8">
                <div class="not-found-container">
                <img id="not-found-404-img" src='../images/output-onlinepngtools (2).png'/>
                <h1>This page was not found</h1>
                <span>How about going to the <router-link to="/">Home page</router-link> or the <router-link to="/login">Login Page</router-link> instead? &#129300;</span>
                </div>
            </b-col>
            <b-col cols="2"/>
        </b-row>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  components: { NavBar }
}
</script>

<style>
.big-row {
    width: 100%
}

.not-found-container {
    margin-top: 1.5rem;
}

#not-found-404-img {
    width: 60%;
    height: 40%;
}
</style>
