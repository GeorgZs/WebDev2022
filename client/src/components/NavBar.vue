<script>
export default {
  name: 'NavBar',
  data() {
    return { isLoggedIn: localStorage.loginToken || false }
  }
}
</script>

<template>
    <div class="navbar">
        <div class="navbar-left">
            <router-link to="/">
                <img id="logo" src="/logo.svg" alt="Gabagool"/>
            </router-link>
            <b-button variant="outline-secondary" to="/">Search</b-button>
        </div>
        <div v-if="!isLoggedIn" class="navbar-right">
            <b-button variant="outline-secondary" to="/login">Login</b-button>
            <b-button to="/register">Register</b-button>
        </div>
    </div>
</template>

<style>
    #logo {
        height: 4rem;
        width: 4rem;
        object-fit: contain;
    }

    .navbar {
        width: 100%;
       /* box-shadow: 0 1px 3px rgb(0 0 0 / 10%), 0 2px 2px rgb(0 0 0 / 6%), 0 0 2px rgb(0 0 0 / 7%); */
    }

    .navbar-right > *, .navbar-left > * {
        margin: 1rem;
    }
</style>
