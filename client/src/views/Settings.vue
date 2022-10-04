<template>
    <div class="main-component">
    <SideBar/>
        <div class="settings-component">
            <NavBar/>
            <div class="settings-body">
                <div class="heading-text">
                    <h3>My Account</h3>
                </div>
                <div class="settings-form">
                    <b-form class="inputs">
                        <p>Enter Name:</p>
                        <b-form-group
                        id="input-group-1"
                        label-for="input-1"
                        >
                        <b-form-input id="input-1" type="text" placeholder="Name" required v-model="account.name">

                        </b-form-input>
                        </b-form-group>

                        <p>Enter Address:</p>
                        <b-form-group
                        id="input-group-2"
                        label-for="input-2"

                        >
                        <b-form-input id="input-2" type="text" placeholder="Address" required v-model="account.address">

                        </b-form-input>
                        </b-form-group>

                        <p>Enter Sector:</p>
                        <b-form-group
                        id="input-group-3"
                        label-for="input-3"

                        >
                        <b-form-input id="input-3" type="text" placeholder="Sector" required v-model="account.sector">

                        </b-form-input>
                        </b-form-group>

                        <p>Enter Email:</p>
                        <b-form-group
                        id="input-group-4"
                        label-for="input-4"

                        >
                        <b-form-input id="input-4" type="text" placeholder="Email" required v-model="account.email">

                        </b-form-input>
                        </b-form-group>

                        <p>Enter Phone Number:</p>
                        <b-form-group
                        id="input-group1"
                        label-for="input-5"

                        >
                        <b-form-input id="input-5" type="text" placeholder="Phone Number" required v-model="account.phoneNumber">

                        </b-form-input>
                        </b-form-group>
                    </b-form>
                    <b-button id="profile-button" variant="info">Update Profile</b-button>
                </div>
                <div class="landing-page-text">
                    <h3>Landing page data </h3>
                </div>
                <div class="landing-page-form">
                    <b-form class="inputs">
                    <div class="logo-and-color-input">
                        <div class="logo-color">
                            <p>Enter Logo:</p>
                            <b-form-file
                                v-model="file1"
                                :state="(file1)"
                                placeholder="Choose a file or drop it here..."
                                drop-placeholder="Drop file here..."
                            ></b-form-file>

                        <p id="color-text">Enter Color:</p>
                        <b-form-group
                        id="input-group-7"
                        label-for="input-7"

                        >
                        <b-form-input id="input-7" type="color" placeholder="Color" required v-model="landingPage.color">

                        </b-form-input>
                        </b-form-group>
                        </div>

                        <div class="logo-image">
                            <img id="sidebar-logo" src="/logo.svg" alt="Gabagool"/>
                        </div>

                    </div>

                    <div class="details-input">
                        <p>Enter Details:</p>
                        <b-form-group
                        id="input-group-8"
                        label-for="input-8"

                        >
                        <b-form-input id="input-8" type="text" placeholder="Details" required v-model="landingPage.details">

                        </b-form-input>
                        </b-form-group>
                    </div>

                    </b-form>
                    <b-button id="landing-page-button" variant="info">Update Landing page</b-button>
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
                            <b-button variant="outline-danger">Delete account</b-button>
                        </div>
                        <div class="delete-account-text">
                            <p>This action is irreversible and will delete your account and all associated services. Please proceed with caution</p>
                        </div>
                        <div class="delete-account-button">
                            <b-button variant="outline-danger">Delete account</b-button>
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
        name: '',
        address: '',
        sector: '',
        email: '',
        phoneNumber: ''
      },
      landingPage: {
        logo: '',
        color: '',
        details: ''
      }
    }
  },
  methods: {
    hello() {
      return alert('Hello world')
    },
    async updateAccount() {
      await Api.patch('', {
        name: this.account.name,
        address: this.name.address,
        sector: this.account.sector,
        email: this.account.email,
        phoneNumber: this.account.phoneNumber
      })
        .then(response => {
          this.account = response.data
        })
        .catch(error => { console.log(error) })
    },
    async updateLandingPage() {
      await Api.patch('', {
        logo: this.landingPage.logo,
        color: this.landingPage.color,
        details: this.landingPage.details
      })
        .then(response => {
          this.landingPage = response.data
        })
        .catch(error => { console.log(error) })
    },
    async deleteAccount() {
      await Api.delete('')
        .then(response => {
          console.log(response)
        })
        .catch(error => { console.log(error) })
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
}
#landing-page-button {
    background-color: #0d9488;
    border:none;
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
    margin-top: 40px;
    margin-bottom: 30px;
    padding-bottom: 40px;
}
.danger-text{
    display: flex;
    align-content: flex-start;
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

</style>
