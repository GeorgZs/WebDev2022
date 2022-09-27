<template>
    <div class="list-container">
        <div id="list" v-for="service in servicesList" :key="service._id">
              <div id="card-view">
                <!--block v-b-toggle.service.counter-->
                <div @click="clickForm(service)" id="details-list">
                    <h2>{{ service.name }}</h2>
                    <div class="circle">
                        <h4 id="bubble-text">{{ service.price }}</h4>
                    </div>
                    <div class="circle">
                        <h4 id="bubble-text">Location</h4>
                    </div>
                    <div class="circle">
                        <h4 id="bubble-text">Reviews</h4>
                    </div>
                    <router-link :to="landingPage(service.providerId)">
                        <h4>Provider name</h4>
                    </router-link>
                    <!--Add link to provider here using providerId-->
                    <!--Div [text] div column div -> service name and below 3 divs with price location review-->
                </div>
                <b-collapse v-model="service.visible" :id="service.counter" class="mt-2">
                  <b-card>
                    <h3 class="card-text">Create a booking request</h3>
                    <form class="form">
                        <div class="card-paragraph">
                            <br>
                            <!--fix width and height to be responsive-->
                            <iframe
                            id="mapElement"
                            width="250"
                            height="250"
                            style="border:0"
                            loading="lazy"
                            :src='`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${address}`'></iframe> <!--use service.address after finished-->
                                <br>
                                <p> Address: {{ service.address }} </p>
                                <p> Details: {{ service.details }} </p>
                        </div>
                        <div class="left-form">
                            Name*
                            <b-form-input placeholder="Enter your full name" :state='service.isFormValid === "null" ? null : service.isFormValid === "true" ? true : false' v-model="service.formInput.name" id="name-input"></b-form-input>
                            <b-form-invalid-feedback id="feedback">
                                Enter a name for your booking
                            </b-form-invalid-feedback>
                            Email*
                            <b-form-input placeholder="Enter your email"  :state='service.isFormValid === "null" ? null : service.isFormValid === "true" ? true : false' v-model="service.formInput.email" id="email-input" type="email"></b-form-input>
                            <b-form-invalid-feedback id="feedback">
                                Enter a valid email
                            </b-form-invalid-feedback>
                            Phone Number
                            <b-input-group>
                                <template #prepend>
                                  <b-input-group-text >+46</b-input-group-text>
                                </template>
                            <b-form-input :state='service.isFormValid === "null" ? null : service.isFormValid === "true" ? true : false' v-model="service.formInput.phoneNumber" id="phone-number-input" type="number"></b-form-input>
                            <b-form-invalid-feedback id="feedback">
                                Enter a valid phone number
                            </b-form-invalid-feedback>
                            </b-input-group>
                        </div>
                        <div class="right-form">
                            Time*
                            <b-form-input :state='service.isFormValid === "null" ? null : service.isFormValid === "true" ? true : false' v-model="service.formInput.timePeriod" id="time-period-input" type="time"></b-form-input>
                            <b-form-invalid-feedback id="feedback">
                                Enter the time of your booking
                            </b-form-invalid-feedback>
                            Date
                            <b-form-input :state='service.isFormValid === "null" ? null : service.isFormValid === "true" ? true : false' v-model="service.formInput.date" id="date-input" type="date"></b-form-input>
                            <b-form-invalid-feedback id="feedback">
                                Enter a date for your booking
                            </b-form-invalid-feedback>
                            Message*
                            <b-form-textarea
                                id="message-input"
                                :state='service.isFormValid === "null" ? null : service.isFormValid === "true" ? true : false'
                                v-model="service.formInput.message"
                                rows="4"
                                placeholder="Enter a small message"
                                no-resize
                            ></b-form-textarea>
                            <b-form-invalid-feedback id="feedback">
                                Enter a message to explain the nature of the booking
                            </b-form-invalid-feedback>
                        </div>
                    </form>
                    <p :style="'visibility:' + isVisible(service.isFormValid)">* fields are required</p>
                    <b-button size="lg" @click="submitForm(service._id, service)" >Complete Booking</b-button>
                  </b-card>
                </b-collapse>
              </div>
        </div>
        <h4 v-if="services.length === 0">There were no services availabe, please try something else</h4>
    </div>
</template>

<script>
import { Api } from '@/Api'
const validator = require('validator')

export default {
  props: ['services'],
  data() {
    return {
      servicesList: this.services,
      apiKey: 'AIzaSyDwRByjwDc9rECZ8631Up2NHGFbuk-1qE0',
      address: 'Paris'
    }
  },
  methods: {
    clickForm(service) {
      if (this.address.length > 1) {
        // on opening form, render map
        document.getElementById('mapElement').src = 'https://www.google.com/maps/embed/v1/place?key=' + this.apiKey + '&q=' + this.address
      }

      service.visible = !service.visible
      service.formInput.name = ''
      service.formInput.email = ''
      service.formInput.phoneNumber = ''
      service.formInput.date = ''
      service.formInput.timePeriod = ''
      service.formInput.message = ''
      service.isFormValid = 'null'
      console.log(service)
    },
    landingPage(serviceId) {
      return '/providers/' + serviceId + '/landingPage'
    },
    isVisible(isFormValid) {
      return isFormValid === 'false' ? 'visible' : 'hidden'
    },

    // broken
    // make sure on resubmission after false form, resets state and does check
    checkFormValidity(service) {
      if (service.formInput.name === '' || service.formInput.email === '' ||
          service.formInput.timePeriod === '' || service.formInput.message === '') {
        service.isFormValid = 'false'
        return false
      } else if (!validator.isEmail(service.formInput.email) || service.formInput.phoneNumber.length < 8) {
        service.isFormValid = 'false'
        return false
      } else {
        service.isFormValid = 'true'
        return true
      }
    },
    async submitForm(serviceId, service) {
      service.isFormValid = 'null'

      const formValiditiy = this.checkFormValidity(service)

      // finish form validation
      const snackMessage = formValiditiy
        ? 'Form Successfully Submitted!'
        : 'Error with Form Submission'

      const h = this.$createElement

      const vNodesMsg = h('p', [h('strong', snackMessage)])

      this.$bvToast.toast([vNodesMsg], {
        toaster: 'b-toaster-bottom-right',
        variant: formValiditiy ? 'success' : 'danger',
        solid: true,
        autoHideDelay: 3000,
        appendToast: true,
        noCloseButton: true
      })
      // post request when form is all correct
      if (formValiditiy) {
        await Api.post('v1/services/' + serviceId + '/bookingRequests', {
          timePeriod: service.formInput.timePeriod,
          date: service.formInput.date,
          user: {
            name: service.formInput.name,
            email: service.formInput.email,
            phoneNumber: service.formInput.phoneNumber
          },
          message: service.formInput.message
        })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
        return true
      }
      return false
    }
  }
  // courtesy of: https://v2.vuejs.org/v2/cookbook/form-validation.html
  // var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

}
</script>

<style>
#card-view {
    flex-direction: column;
    width: 100%;
}

#row {
    flex-direction: row;
}

#details-list {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 1rem;
    align-items: center;
    flex-wrap: wrap;
}

#bubble-text {
    margin-bottom: 0
}

#feeback {
    width: 15rem;
}

.circle {
    border-radius: 40px;
    height: auto;
    width: auto;
    background: #f8f8f8;
    padding: 0.85rem;
    border: 0.05rem solid black;
}

.list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#list {
    width: 100vh;
    display: flex;
    justify-content: space-evenly;
    margin: 0.20rem;
    border: 0.05rem solid black;
    border-radius: 0.5rem;
    width: 60%;
}

.card-text {
    padding-bottom: 1rem;
}

.form {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.details > *, .card-paragraph > *, .right-form > *, .left-form > * {
    margin: 0.5rem
}

.card-paragraph {
    width: 15rem;
}
</style>
