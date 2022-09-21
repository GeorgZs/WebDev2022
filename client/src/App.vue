<template>
  <div id="app">
    <div class="navbar">
      <div class="navbar-left">
          <router-link to="/home">
              <img src="" alt="Gabagool"/>
          </router-link>
      </div>
      <div class="navbar-right">
          <b-button variant="outline-secondary">Login</b-button>
          <b-button>Register</b-button>
      </div>
  </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%), 0 2px 2px rgb(0 0 0 / 6%), 0 0 2px rgb(0 0 0 / 7%);
}

.navbar-right > *, .navbar-left > * {
  margin: 1rem;
}
</style>
