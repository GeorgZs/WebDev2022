<script>
export default {
  name: 'NavBar',
  props: {
    isDashboard: {
      default: false
    }
  },
  data() {
    return {
      isLoggedIn: localStorage.loginToken || false,
      routeName: this.$route.name,
      searchValue: 'results?query=',
      searchBar: ''
    }
  },
  methods: {
    search() {
      this.$router.push('/results?query=' + this.searchBar)
    }
  }
}
</script>

<template>
    <div class="navbar">
        <div v-if="!isDashboard" class="navbar-left">
            <router-link to="/">
                <img id="navbar-logo" src="/logo-full.svg" alt="Gabagool"/>
            </router-link>
            <b-input-group v-if="!(routeName === 'home' || routeName === 'searchResult')" id="nav-bar-group">
                <b-form-input id="nav-bar-input" v-model="searchBar"/>
                <b-input-group-append>
                    <b-button @click="search()" id="nav-bar-search-button" variant="outline-secondary">Search</b-button>
                </b-input-group-append>
            </b-input-group>
        </div>
        <div v-else class="navbar-left"><!-- Empty left side --></div>
        <div v-if="!isLoggedIn" class="navbar-right">
            <b-button id="login-button-navbar" variant="outline-secondary" to="/login">Login</b-button>
            <b-button id="register-button-navbar" to="/register">Register</b-button>
        </div>
        <div v-else class="navbar-right">
            <b-button id="my-account-button" to="/dashboard">My Account <b-icon icon="person-circle" aria-hidden="true"/></b-button>
        </div>
    </div>
</template>

<style>
#navbar-logo {
    height: 2.64rem;
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

.navbar-left {

    display: flex;
    flex-direction: row;
    align-items: center;
}

.navbar-right > *, .navbar-left > * {
    margin: 1rem;
}

#nav-bar-group > * {
    margin: 0.50rem;
}

@media screen and (max-width: 614px) {
    #nav-bar-group {
        display: none;
    }
}

#nav-bar-input {
    width: 10rem;
    border-radius: 15px;
}

#nav-bar-search-button {
    border-radius: 15px;
}
#nav-bar-search-button:hover {
    background: #0d9488;
}
#register-button-navbar {
    background: #0d9488;
    border-color: #0d9488;
}
#login-button-navbar:hover {
    background: #0d9488;
}
#my-account-button {
    background: #0d9488;
}
</style>
