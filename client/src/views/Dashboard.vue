<template>
    <div>
        <SideBar/>
        <div class="navbar-dash-container">
            <NavBar isDashboard="true"/>
        </div>
        <div class="main-container">
            <h1>Welcome back {{ user.name }}!</h1>
            <div id="indox-preview">
                <router-link to="/dashboard/inbox">
                    <h4 v-if="nrOfBookingRequestsToday === 1" id="link-text">{{nrOfBookingRequestsToday}} Upcoming Request Today</h4>
                    <h4 v-else id="link-text">{{nrOfBookingRequestsToday}} Upcoming Requests Today</h4>
                </router-link>
                <div v-if="bookingRequest" class="upcoming-request">
                  <div class="request" @click="goToInbox()">
                    <div class="request-info">
                      <h4 class="request-heading"><span>{{ bookingRequest.service.name }}</span><span class="service-price">・{{ bookingRequest.service.price }} SEK</span></h4>
                      <span class="request-timeframe"><b-icon icon="clock" /> {{ bookingRequest.timePeriod }}</span>
                      <span class="request-note">{{ bookingRequest.message }}</span>
                      <span class="request-sender"><b-icon icon="person" /> {{ bookingRequest.user.name }}</span>
                    </div>
                  </div>
                </div>
                <div v-else class="upcoming-request">
                  <h5 class="no-data">There are no upcoming requests</h5>
                </div>
                <span v-if="bookingRequest" class="hint-text"><em>* Click on the card above to go to your inbox and see all requests</em></span>
            </div>
            <div class="bottom-bar">
              <div class="service-num">
                <router-link to="/dashboard/services">
                  <h4 id="active-services">Num of Active Services: </h4> <!--In a box or smthing -> click brings to service list-->
                  <!--some quick add features maybe like quick add service, quick respond, idk-->
                </router-link>
                <h4 v-if="numOfServices === 1" class="num-of-services">{{ numOfServices }} Service Active</h4>
                <h4 v-else class="num-of-services">{{ numOfServices }} Services Active</h4>
              </div>
              <div class="quick-add">
                <h4 id="active-services">Quick Actions</h4>
                <row>
                  <b-button id="curve-button" to="/dashboard/services#mutation-button">Add Service <b-icon icon="plus" aria-hidden="true"/></b-button> <!--add the pop up for quick add-->
                  <b-button id="curve-button" to="/dashboard/services">See all Services</b-button>
                </row>
                <row>
                  <b-button id="curve-button" to="/dashboard/inbox">See inbox  <b-icon icon="envelope" aria-hidden="true"/></b-button> <!--sdfdf-->
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
      numOfServices: '',
      nrOfBookingRequestsToday: '',
      bookingRequest: {
        timePeriod: '',
        user: {
          name: '',
          email: '',
          phoneNumber: ''
        },
        date: '',
        message: ''
      },
      user: {
        name: ''
      }
    }
  },
  methods: {
    // biggest todos: get closest request,
    goToInbox() {
      this.$router.push('/dashboard/inbox')
    }
  },
  async created() {
    await Api.get('v1/providers/' + localStorage.loginId)
      .then(response => { this.user = response.data })
      .catch(err => { this.user = err })

    let services = []
    await Api.get('v1/providers/' + localStorage.loginId + '/services')
      .then(response => { services = response.data })
      .catch(err => { services = err })
    this.numOfServices = services.length

    let bookingRequests = []
    await Api.get('v1/providers/' + localStorage.loginId + '/bookingRequests')
      .then(response => { bookingRequests = response.data })
      .catch(err => { bookingRequests = err })

    console.dir(bookingRequests)
    const todayStart = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0)
    const todayEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59)
    bookingRequests = bookingRequests.filter((req) => new Date(req.date) >= todayStart && new Date(req.date) <= todayEnd)

    if (bookingRequests[0]) {
      bookingRequests[0].service = services.find(s => s._id === bookingRequests[0].serviceId)
    }

    this.nrOfBookingRequestsToday = bookingRequests.length
    this.bookingRequest = bookingRequests[0]
  },
  components: { SideBar, NavBar }
}
</script>

<style>
.no-data {
    font-style: italic;
}

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
