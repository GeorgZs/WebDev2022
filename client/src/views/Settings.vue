<template>
    <div class="main-component">
    <SideBar/>
        <div class="settings-component">
            <div class="top-bar">
                <div class="profile-pic">
                </div>
                <div class="landing-page-button">
                    <h3>button</h3>
                </div>
            </div>
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
                    <b-button variant="info">Update Profile</b-button>
                </div>
                <div class="landing-page-text">
                    <h3>Landing page data </h3>
                </div>
                <div class="landing-page-form">
                    <b-form class="inputs">
                        <p>Enter Logo:</p>
                        <b-form-group
                        id="input-group-6"
                        label-for="input-6"
                        >
                        <b-form-input id="input-6" type="text" placeholder="Logo" required v-model="landingPage.logo">

                        </b-form-input>
                        </b-form-group>

                        <p>Enter Color:</p>
                        <b-form-group
                        id="input-group-7"
                        label-for="input-7"

                        >
                        <b-form-input id="input-7" type="text" placeholder="Color" required v-model="landingPage.color">

                        </b-form-input>
                        </b-form-group>

                        <p>Enter Details:</p>
                        <b-form-group
                        id="input-group-8"
                        label-for="input-8"

                        >
                        <b-form-input id="input-8" type="text" placeholder="Details" required v-model="landingPage.details">

                        </b-form-input>
                        </b-form-group>
                    </b-form>
                    <b-button variant="info">Update Landing page</b-button>
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
  components: { SideBar }
}
</script>

<style>
.main-component {
    height: 100%;
    background-color:white;
    padding-right: 1rem;
}
.settings-component{
    background-color: bisque;
    height: 100%;
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
    background-color: white;
    padding-left: 200px;
    padding-right: 200px;
    padding-top: 50px;
    border: 1px solid black;

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
.landing-page-text {
    display: flex;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
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
