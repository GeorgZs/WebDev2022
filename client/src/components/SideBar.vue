<script>
export default {
  name: 'SideBar',
  data() {
    return {
      routes: [{
        icon: 'inboxes',
        link: '/dashboard/inbox'
      },
      {
        icon: 'list-check',
        link: '/dashboard/services'
      },
      {
        icon: 'gear-wide-connected',
        link: '/dashboard/settings'
      }],
      activeRoute: location.pathname
    }
  }
}
</script>

<template>
  <nav class="sidebar">
    <router-link to="/">
      <img id="sidebar-logo" src="/logo.svg" alt="Gabagool"/>
    </router-link>
    <router-link v-for="route in routes" :key="route.link" :to="route.link" class="nav-item" :class="{ active: activeRoute.endsWith(route.link)}">
      <b-icon :icon="route.icon" />
    </router-link>
    <span class="nav-item logout"><b-icon icon="box-arrow-right" /></span>
  </nav>
</template>

<style>
.sidebar {
  position: fixed;

  height: 100vh;
  width: 6rem;

  display: flex;
  flex-direction: column;

  background-color: #f0fdfa;
}

.sidebar + * {
  margin-left: 6rem;
}

#sidebar-logo {
  margin: 1rem;
  margin-bottom: 3rem;

  height: 4rem;
  width: 4rem;
  object-fit: contain;
}

.sidebar .nav-item {
  height: 6rem;
  width: 6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #115e59;
  font-size: 1.5rem;
  border-bottom: 2px solid #ccfbf1;

  transition: all 0.65s;
}

.nav-item.active {
  color: #2dd4bf;
}

.nav-item:hover {
  background-color: #ccfbf1;
}

.logout {
  margin-top: auto;
}
</style>
