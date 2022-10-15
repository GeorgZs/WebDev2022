<template>
    <div class="main-component">
    <SideBar/>
    <div class="navbar-dash-container">
        <NavBar isDashboard="true"/>
    </div>
        <div class="settings-component">
            <div class="settings-body">
                <div class="heading-text">
                    <h3>My Account</h3>
                </div>
                <div class="settings-form">
                    <b-form class="inputs">
                        <p>Name:</p>
                        <b-form-group
                        id="input-group-1"
                        label-for="input-1"
                        >
                        <b-form-input id="input-1" type="text" placeholder="Name" v-model="account.name">

                        </b-form-input>
                        </b-form-group>

                        <p>Address:</p>
                        <b-form-group
                        id="input-group-2"
                        label-for="input-2"

                        >
                        <b-form-input id="input-2" type="text" placeholder="Address" v-model="account.address">

                        </b-form-input>
                        </b-form-group>

                        <p>Sector:</p>
                        <b-form-group
                        id="input-group-3"
                        label-for="input-3"

                        >
                        <b-form-input id="input-3" type="text" placeholder="Sector" v-model="account.sector">

                        </b-form-input>
                        </b-form-group>

                        <p>Email:</p>
                        <b-form-group
                        id="input-group-4"
                        label-for="input-4"

                        >
                        <b-form-input id="input-4" type="text" placeholder="Email" v-model="account.email">

                        </b-form-input>
                        </b-form-group>

                        <p>Phone Number:</p>
                        <b-form-group
                        id="input-group1"
                        label-for="input-5"

                        >
                        <b-form-input id="input-5" type="text" placeholder="Phone Number" v-model="account.phoneNumber">

                        </b-form-input>
                        </b-form-group>
                    </b-form>
                    <b-button id="profile-button" v-on:click="updateAccount()" variant="info">Update Profile</b-button>
                </div>
                <div class="landing-page-text">
                    <h3>Landing page data </h3>
                </div>
                <div class="landing-page-form">
                    <b-form class="inputs">
                    <div class="logo-and-color-input">
                        <div class="logo-color">
                            <p>Logo:</p>
                            <b-form-file
                                v-model="landingPage.logo"
                                type="file"
                                @change="onFileSelected"
                                placeholder="Choose a file or drop it here..."
                                drop-placeholder="Drop file here..."
                            ></b-form-file>

                        <p id="color-text">Color:</p>
                        <b-form-group
                        id="input-group-7"
                        label-for="input-7"

                        >
                        <b-form-input id="input-7" type="color" placeholder="Color" v-model="landingPage.color">

                        </b-form-input>
                        </b-form-group>
                        </div>

                        <div class="logo-image">
                            <img  id="sidebar-logo" :src="this.landingPage.logo" alt="Gabagool"/>
                        </div>

                    </div>

                    <div class="details-input">
                        <p>Details:</p>
                        <b-form-group
                        id="input-group-8"
                        label-for="input-8"

                        >
                        <b-form-textarea id="input-8" type="text" placeholder="Details" v-model="landingPage.details">

                        </b-form-textarea>
                        </b-form-group>
                    </div>

                    </b-form>
                    <b-button id="landing-page-button" @click="updateLandingPage()" variant="info">Update Landing page</b-button>
                </div>
                <div class="danger-zone">
                    <div class="danger-text">
                        <h3>Danger Zone</h3>
                    </div>
                    <div class="danger-component">
                        <div class="delete-services-text">
                            <p>This action is irreversible and will delete all services created by your account. </p>
                        </div>
                        <div class="delete-service-button">
                            <b-button variant="outline-danger">Delete services</b-button>
                        </div>
                        <div class="delete-account-text">
                            <p>This action is irreversible and will delete your account and all associated services. Please proceed with caution</p>
                        </div>
                        <div class="delete-account-button">
                            <b-button v-on:click="deleteAccount()" variant="outline-danger">Delete account</b-button>
                        </div>
                        <br/>
                        <div v-if="userEmail === 'georg@gmail.com'" class="danger-danger-buttons">
                          <b-button v-on:click="deleteBookingRequests()" variant="outline-danger">Delete All Booking Requests</b-button>
                          Booking Request Id:
                          <b-form-input id="booking-id-input" v-model="bookingId"></b-form-input>
                          <b-button v-on:click="putBookingRequestById()" variant="outline-danger">Replace Booking Data with Funny Quotes</b-button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from '../Api'
import NavBar from '../components/NavBar.vue'
import SideBar from '../components/SideBar.vue'

export default {
  name: 'settings',
  data() {
    return {
      account: {
        name: undefined,
        address: undefined,
        sector: undefined,
        email: undefined,
        phoneNumber: undefined
      },
      landingPage: {
        logo: undefined,
        color: undefined,
        details: undefined
      },
      snackMessage: '',
      formValiditiy: null,
      userEmail: '',
      bookingId: ''
    }
  },
  async mounted() {
    const userId = localStorage.loginId
    await Api.get('v1/providers/' + userId)
      .then(response => { this.userEmail = response.data.email })
  },
  methods: {
    async updateAccount() {
      const h = this.$createElement

      await Api.patch('v1/providers/' + localStorage.loginId, {
        name: this.account.name,
        address: this.account.address,
        sector: this.account.sector,
        email: this.account.email,
        phoneNumber: this.account.phoneNumber
      })
        .then(response => {
          this.snackMessage = h('p', [h('strong', 'Account Successfully Updated')])
          this.formValiditiy = true
        })
        .catch(error => {
          console.log(error)

          this.snackMessage = h('p', [h('strong', 'Error Updating Account')])
          this.formValiditiy = false
        })
      this.showSnackbar()
    },
    onFileSelected(event) {
      this.landingPage.logo = event.target.files[0]
      console.log(this.landingPage.logo)
    },
    async updateLandingPage() {
      const h = this.$createElement
      const fd = new FormData()

      fd.append('image', this.landingPage.logo)
      const headers = { 'Content-Type': 'multipart/form-data' }

      await Api.post('v1/providers/' + localStorage.loginId + '/landingPage', fd, { headers })
        .then(response => {
          console.log(response)
          this.snackMessage = h('p', [h('strong', 'Landing Page Successfully Updated')])
          this.formValiditiy = true
        })
        .catch(error => {
          console.log(error)

          this.snackMessage = h('p', [h('strong', 'Error Updating Landing Page')])
          this.formValiditiy = false
        })

      this.showSnackbar()
    },
    async deleteAccount() {
      const h = this.$createElement

      await Api.delete('v1/providers/' + localStorage.loginId)
        .then(response => {
          console.log(response)
          localStorage.clear()
          this.$router.push('/login')
        })
        .catch(error => {
          console.log(error)
          this.snackMessage = h('p', [h('strong', 'Error Deleting Account')])
          this.formValiditiy = false
        })
      this.showSnackbar()
    },
    // async created
    // api get
    // create get in landingpage for picture
    // take pic here in settings.vue
    showSnackbar() {
      if (this.formValiditiy !== null) {
        this.$bvToast.toast([this.snackMessage], {
          toaster: 'b-toaster-bottom-right',
          variant: this.formValiditiy ? 'success' : 'danger',
          solid: true,
          autoHideDelay: 3000,
          appendToast: true,
          noCloseButton: true
        })
      }
    },
    async deleteBookingRequests() {
      await Api.delete('v1/bookingRequests')
        .then(response => console.log(response))
        .catch(err => console.log(err))
    },
    async putBookingRequestById() {
      let existingBookingRequest

      await Api.get('v1/bookingRequests/' + this.bookingId)
        .then(response => { existingBookingRequest = response.data })
        .catch(err => console.log(err))

      await Api.put('v1/bookingRequests/' + this.bookingId, {
        providerId: existingBookingRequest.providerId,
        serviceId: existingBookingRequest.providerId,
        timePeriod: '420:69',
        user: {
          name: 'Doofenschmerz',
          email: 'ILoveJava@hatemail.com',
          phoneNumber: '69696969696969'
        },
        date: '1.1.1',
        message: 'April Fools',
        response: 'Accepted'
      })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
  },
  components: { SideBar, NavBar }
}
</script>

<style>
.main-component {
    height: 100%;
    padding-right: 1rem;
}
.settings-component{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.top-bar {
    display: flex;
    justify-content: space-between;
}
.profile-pic{
    display: flex;
    align-items: center;
    align-content: center;
}
.landing-page-button {
    display: flex;
    align-items: center;
    align-content: center;
}
.settings-body {
    height: 100%;
    width: 80%;
    background-color: white;
    padding-left: 4rem;
    padding-right: 4rem;
    padding-top: 1.25rem;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(140, 139, 139, 0.2);
}
.heading-text {
    display: flex;
    align-items: flex-start;
    border-bottom: 0.5px solid black;
    margin-bottom: 20px;
}
.inputs {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
}
.d-block {
    display: flex;
}
p {
    display: flex;
    align-self: flex-start;
}
#profile-button {
    background-color: #0d9488;
    border:none;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
}
#landing-page-button {
    background-color: #0d9488;
    border:none;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
}
.landing-page-text {
    display: flex;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
}
.logo-and-color-input {
    display: flex;
    flex-wrap: wrap;
}
.logo-color {
    width: 60%;
    margin-right: 5rem;
}
#color-text {
    margin-top: 1.25rem;
}
.logo-image {
    width: 20%;
    border: 1px solid black;
    border-radius: 100%;
}

.danger-zone {
    border: 1px solid red;
    border-radius: 7px;
    margin-top: 40px;
    margin-bottom: 30px;
    padding-bottom: 40px;
}
.danger-component {
  margin-left: 2rem;
}
.danger-text{
    display: flex;
    align-content: flex-start;
    margin-left: 2rem;
    margin-top: 2rem;
}
.delete-services{
    display: flex;
    flex-direction: column;
}
.delete-services-text {
    display: flex;
}
.delete-service-button{
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;
    margin-bottom: 40px;
}
.delete-account-text {
    display: flex;
}
.delete-account-button{
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;
}

#booking-id-input {
  width: 20%
}

.danger-danger-buttons {
  display: flex;
  align-items: center;
}

.danger-danger-buttons > * {
  margin: 1rem
}

</style>
