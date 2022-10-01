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
                <img id="navbar-logo" src="/logo.svg" alt="Gabagool"/>
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
#navbar-logo {
    height: 4rem;
    width: 4rem;
    object-fit: contain;
}

.navbar {
    width: 100%;
    height: 6rem;
    padding: 0 !important;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}

.navbar-right > *, .navbar-left > * {
    margin: 1rem;
}
</style>
