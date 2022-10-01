<script>
import NavBar from '@/components/NavBar.vue'

/*
logo: { type: String },
name: { type: String, required: true },
sector: { type: String, required: true },
address: { type: String, required: true },

content: { type: String },

email: { type: String, required: true },
phoneNumber: { type: String },
primaryColor: { type: String },

*/

export default {
  data() {
    return {
      name: 'Max Hairsaloon',
      logo: 'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fb2a6ec6a-4f4f-11e6-953c-cb8534df0970.jpg?crop=418%2C627%2C261%2C0',
      sector: 'Beauty'
    }
  },
  components: {
    NavBar
  }
}
</script>

<template>
  <div class="landing-page">
    <div id="top">
      <NavBar />
    </div>
    <div id="info">
      <img class="logo" :src="logo"/>
      <span class="heading"><span class="name">{{name}}</span><span class="sector">・{{sector}}</span></span>
    </div>
  </div>
</template>

<style>
.landing-page {
  text-align: left;
}

#top {
  height: 20vh;
  min-height: 12rem;
  background-color: #65a30d;
  background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10L82 4l17.32 10zm-80 80l-1 1.732-17.32-10L2 84l17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10L62 24l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM111 40h-2V20h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zM40 49v2H20v-2h20zm19.32 5l-1 1.732-17.32-10L42 44l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM91 60h-2V40h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM39.32 74l-1 1.732-17.32-10L22 64l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM71 80h-2V60h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM120 89v2h-20v-2h20zm-84.134 9.16l-1.732 1-10-17.32 1.732-1 10 17.32zM51 100h-2V80h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM100 109v2H80v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM31 120h-2v-20h2v20z' fill='%23a3e635' fill-opacity='0.25' fill-rule='evenodd'/%3E%3C/svg%3E");
}

#info {
  position: relative;
  padding: 0.25rem 2rem;
}

.logo {
  position: absolute;
  top: -4rem;
  z-index: 100;

  height: 8rem;
  width: 8rem;
  object-fit: cover;

  border-radius: 8rem;
  border: 0.25rem solid white;
  background-color: white;
}

.logo + * {
  margin-left: 8.5rem;
}

.heading {
  padding: 0.5rem;
  font-size: 1.25rem;
}

.name {
  font-size: 1.5em;
  color: #65a30d;
}

</style>
