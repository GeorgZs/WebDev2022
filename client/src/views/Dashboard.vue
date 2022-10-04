<template>
    <div>
        <SideBar/>
        <div class="navbar-dash-container">
            <NavBar style="justify-content:flex-end" isDashboard="true"/>
        </div>
        <div class="main-container">
            <h1>Welcome back {Placehoder name}</h1>
            <div id="indox-preview">
                <router-link to="/dashboard/inbox">
                    <h4 id="link-text">Upcoming Requests:</h4>
                </router-link>
                <h5 class="date">{date here}</h5>
                <div class="request" @click="goToInbox()">
                    <div class="request-info">
                      <h4 class="request-heading"><span>Service Name</span><span class="service-price">・123 SEK</span></h4>
                      <span class="request-timeframe"><b-icon icon="clock" /> Afternoon</span>
                      <span class="request-note">My poor child finally grew out of his "furry-phase" please help him get back to normal again.</span>
                      <span class="request-sender"><b-icon icon="person" /> Hannes Mannes</span>
                    </div>
                </div>
                <span class="hint-text"><em>* Click on the card above to go to your inbox</em></span>
            </div>
            <div class="bottom-bar">
              <div class="service-num">
                <router-link to="/dashboard/services">
                  <h4 id="active-services">Num of Active Services: </h4> <!--In a box or smthing -> click brings to service list-->
                  <!--some quick add features maybe like quick add service, quick respond, idk-->
                </router-link>
                <h4 class="num-of-services">{{ numOfServices }} Serivces Active</h4>
              </div>
              <div class="quick-add">
                <h4 id="active-services">Quick Actions</h4>
                <row>
                  <b-button id="curve-button" to="/dashboard/services">Add Service <b-icon icon="plus" aria-hidden="true"/></b-button> <!--add the pop up for quick add-->
                  <b-button id="curve-button" to="/dashboard/services">See all Services</b-button>
                </row>
                <row>
                  <b-button id="curve-button" to="/dashbaord/inbox">See inbox  <b-icon icon="envelope" aria-hidden="true"/></b-button> <!--sdfdf-->
                  <b-button id="curve-button" to="/">Search <b-icon icon="search" aria-hidden="true"/></b-button>
                </row>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from '../Api.js'
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'

export default {
  data() {
    return {
      numOfServices: 0
    }
  },
  methods: {
    // biggest todos: get closest request,
    goToInbox() {
      this.$router.push('/dashboard/inbox')
    }
  },
  async created() {
    let list = []
    await Api.get('v1/providers/' + localStorage.loginId + '/services')
      .then(response => { list = response.data })
      .catch(err => { list = err })
    this.numOfServices = list.length
    // when getting collection sort by date and get the first one
    // Api.get('get using token the logged in user').then(response => {}).catch(err => {})
  },
  components: { SideBar, NavBar }
}
</script>

<style>

.main-container {
    margin-left: 6rem;
    padding: 1.5rem 3rem 3rem 3rem;
    text-align: left;
}
.navbar-dash-container {
    display: flex;
    justify-content: flex-end;
    margin-right: 0px;
    padding-left: 4rem;
}

#link-text {
  color: #0d9488;
  margin-bottom: 1.75rem;
  border-bottom: 0.5px solid #09554f;
}

#indox-preview {
    margin-top: 2rem;
}

.hint-text {
    font-size: 0.75rem;
    padding-top: 0.5rem;
}

#active-services {
  color: #0d9488;
  margin-top: 1.75rem;
  text-align: center;
}

.bottom-bar {
  display: flex;
  justify-content: space-evenly;
}

.service-num {
  text-align: center;
}

.num-of-services {
  padding-top: 2rem;
}

.quick-add {
  display: flex;
  flex-direction: column;

  padding-right: 2rem;
}

.quick-add > * {
  margin: 0.5rem;
}

#curve-button {
  border-radius: 5px;
  width: 10rem;
  background-color:#0d9488
}
</style>
