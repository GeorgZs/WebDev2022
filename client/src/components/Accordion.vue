<template>
    <div class="list-container" :key="rerenderIndex">
        <b-button v-if="isLoggedIn" v-b-modal.modal-1 id="mutation-button" variant="success">
          Add Service <b-icon icon="plus" aria-hidden="true"/>
        </b-button>
        <b-modal ref='my-modal' v-model="showModal" id="modal-1" title="Add a new Service" @ok="submitNewService()" @show="resetModal()">
          <p class="my-4">Enter your details</p>
          <span>Name</span>
          <b-form-input v-model="updatedService.name" placeholder="Enter new name" id="popup-form"/>
          <span>Price</span>
          <b-input-group append="SEK" id="popup-form">
            <b-form-input v-model="updatedService.price" placeholder="Enter new price" type="number"/>
          </b-input-group>
          <span>Duration</span>
          <b-input-group append="minutes" id="popup-form">
            <b-form-input v-model="updatedService.duration" placeholder="Enter new duration" type="number"/>
          </b-input-group>
          <span>Details</span>
          <b-form-textarea
            rows="2"
            no-resize
            placeholder="Enter new details"
            v-model="updatedService.details"
            id="popup-form"/>
          <span>Address</span>
          <b-form-input v-model="updatedService.address" placeholder="Enter address" id="popup-form"/>
        </b-modal>
        <div id="list" v-for="service in services" :key="service._id">
              <div id="card-view">
                <div @click="clickForm(service, service.address)" id="details-list">
                    <div id="service-name-container">
                      <h2 id='header-service-name'>{{ service.name }}</h2>
                      <router-link id="route-to-service" :to="`/providers/${service.providerId}`">
                        <h6> {{ service.providerName }} </h6>
                      </router-link>
                    </div>
                    <div class="price-container">
                      <div class="price-location">
                        <h4 id="bubble-text">{{ service.price }} SEK</h4>
                        <span id="location-tag"> <b-icon icon="geo"/> {{ service.address || "No location saved" }}</span>
                      </div>
                      <div v-if="isLoggedIn" class="edit-functionality">
                        <b-icon @click="service.confirmEdit = !service.confirmEdit" icon="pencil" aria-hidden="true"/>
                        <b-modal v-model="service.confirmEdit" title="Update Current Service" @show="resetModal()" @ok="updateService(service.providerId, service._id, service)">
                          <p>* Empty textfields will default to previously set Service values</p>
                          <br/>

                          <span>New Name</span>
                          <b-form-input v-model="updatedService.name" placeholder="Enter new name" id="popup-form"/>
                          <span>New Price</span>
                          <b-form-input v-model="updatedService.price" placeholder="Enter new price" type="number" id="popup-form"/>
                          <span>New Duration</span>
                          <b-form-input v-model="updatedService.duration" placeholder="Enter new duration" type="number" id="popup-form"/>
                          <span>New Details</span>
                          <b-form-textarea
                            rows="2"
                            no-resize
                            placeholder="Enter new details"
                            v-model="updatedService.details"
                            id="popup-form"/>
                          <span>New Address</span>
                          <b-form-input v-model="updatedService.address" placeholder="Enter address" id="popup-form"/>
                        </b-modal>
                        <b-icon @click="service.confirmDelete = !service.confirmDelete" icon="trash" aria-hidden="true"/>
                        <b-modal v-model="service.confirmDelete" title="Delete Service" @show="resetModal()" @ok="deleteService(service.providerId, service._id)">
                          <p>Are you sure you want to delete this service?</p>
                          <p>Service Name: {{ service.name }}</p>
                        </b-modal>
                      </div>
                    </div>
                </div>
                <b-collapse v-model="service.visible" :id="service.counter" class="mt-2">
                  <b-card id="card-container">
                    <h3 class="card-text">Create a booking request</h3>
                    <p id="details-text-form"> Details: {{ service.details || "No Details saved" }} </p>
                    <form class="form">
                        <div class="card-paragraph">
                            <br>
                            <iframe
                            v-if="service.address !== ''"
                            :id='`map-element-${service.counter}`'
                            style="border:0"
                            loading="lazy"
                            :src='`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${address}`'/>
                            <p v-else> No Details entered regarding Location</p>
                            <p> Address: {{ service.address || "No location saved" }} </p>
                        </div>
                        <div class="left-form">
                            Name*
                            <b-form-input placeholder="Enter your full name"  v-model="service.formInput.name" id="name-input"></b-form-input>
                            <b-form-invalid-feedback id="feedback">
                                Enter a name for your booking
                            </b-form-invalid-feedback>
                            Email*
                            <b-form-input placeholder="Enter your email"   v-model="service.formInput.email" id="email-input" type="email"></b-form-input>
                            <b-form-invalid-feedback id="feedback">
                                Enter a valid email
                            </b-form-invalid-feedback>
                            Phone Number
                            <b-input-group>
                                <template #prepend>
                                  <b-input-group-text >{{ countryCode }}</b-input-group-text>
                                </template>
                            <b-form-input v-model="service.formInput.phoneNumber" id="phone-number-input" type="number"></b-form-input>
                            <b-form-invalid-feedback id="feedback">
                                Enter a valid phone number
                            </b-form-invalid-feedback>
                            </b-input-group>
                        </div>
                        <div class="right-form">
                            Time*
                            <b-form-input v-model="service.formInput.timePeriod" id="time-period-input" type="time"></b-form-input>
                            <b-form-invalid-feedback id="feedback">
                                Enter the time of your booking
                            </b-form-invalid-feedback>
                            Date
                            <b-form-input v-model="service.formInput.date" id="date-input" type="date"></b-form-input>
                            <b-form-invalid-feedback id="feedback">
                                Enter a date for your booking
                            </b-form-invalid-feedback>
                            Message
                            <b-form-textarea
                                id="message-input"
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
                    <p :style="'visibility:' + isVisible(service.isFormValid) + '; color: red; justify-content: center; padding-top: 0.5rem;'">Error: {{ errorMessage }}</p>
                    <b-button id="request-button" size="lg" @click="submitForm(service._id, service)" >Request Booking</b-button>
                  </b-card>
                </b-collapse>
              </div>
        </div>
        <b-col cols="6" v-if="services.length === 0" class="justify-content-md-center no-service-available">
          <h4>There are no services available, please try something else</h4>
          <h6>Please try again with another search term</h6>
        </b-col>
    </div>
</template>

<script>
import { Api } from '@/Api'
const validator = require('validator')

export default {
  props: {
    services: {
      default: []
    },
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      servicesList: [],
      apiKey: 'AIzaSyDwRByjwDc9rECZ8631Up2NHGFbuk-1qE0',
      lanceApiKey: 'AIzaSyAX4EG0aDD8SPrmWIavGP5gBpdZPsWWAjE',
      urlParamsSearch: '',
      urlParams: window.location.search,
      countryCode: '+46',
      showModal: false,
      updatedService: {
        name: '',
        price: '',
        duration: '',
        detail: '',
        address: ''
      },
      rerenderIndex: 1,
      errorMessage: ''
    }
  },
  mounted() {
    const values = window.location.href.split('#')
    if (values[1] !== undefined) document.getElementById(values[1]).focus()
  },
  methods: {
    async deleteService(providerId, serviceId) {
      await Api.delete('v1/providers/' + providerId + '/services/' + serviceId)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })

      this.refreshList()
      window.location.reload()
    },

    async updateService(providerId, serviceId, service) {
      await Api.patch('v1/providers/' + providerId + '/services/' + serviceId, {
        name: this.updatedService.name === '' ? service.name : this.updatedService.name,
        price: this.updatedService.price === '' ? Number(service.price) : Number(this.updatedService.price),
        duration: this.updatedService.duration === '' ? Number(service.duration) : Number(this.updatedService.duration),
        details: this.updatedService.details === '' ? service.details : this.updatedService.details,
        address: this.updatedService.address === '' ? service.address : this.updatedService.address
      })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })

      this.refreshList()
      window.location.reload()
    },
    resetModal() {
      this.updatedService.name = ''
      this.updatedService.price = ''
      this.updatedService.duration = ''
      this.updatedService.detail = ''
      this.updatedService.address = ''
    },
    async submitNewService() {
      const h = this.$createElement

      await Api.post('v1/providers/' + localStorage.loginId + '/services', {
        name: this.updatedService.name,
        price: Number(this.updatedService.price),
        duration: Number(this.updatedService.duration),
        details: this.updatedService.details,
        address: this.updatedService.address
      }).then(response => {
        const vNodesMsg = h('p', [h('strong', 'New Service Created')])
        this.$bvToast.toast([vNodesMsg], {
          toaster: 'b-toaster-bottom-right',
          variant: 'success',
          solid: true,
          autoHideDelay: 3000,
          appendToast: true,
          noCloseButton: true
        })
      }).catch(err => {
        console.log(err)
        const vNodesMsg = h('p', [h('strong', 'Error Creating New Service')])
        this.$bvToast.toast([vNodesMsg], {
          toaster: 'b-toaster-bottom-right',
          variant: 'danger',
          solid: true,
          autoHideDelay: 3000,
          appendToast: true,
          noCloseButton: true
        })
      })
      this.$refs['my-modal'].hide()
      window.location.reload()
    },
    clickForm(service, address) {
      service.visible = !service.visible
      service.isFormValid = 'null'

      service.formInput.name = ''
      service.formInput.email = ''
      service.formInput.phoneNumber = ''
      service.formInput.date = ''
      service.formInput.timePeriod = ''
      service.formInput.message = ''

      if (address.length > 0 || address !== undefined) {
        address.trim()
        let mapsAddress = address

        if (address.includes(' ')) {
          mapsAddress = address.split(' ').join('+')
        }
        document.getElementById('map-element-' + service.counter).src = 'https://www.google.com/maps/embed/v1/place?key=' + this.apiKey + '&q=' + mapsAddress
      }
    },
    isVisible(isFormValid) {
      return isFormValid === 'false' ? 'visible' : 'hidden'
    },
    checkFormValidity(service) {
      if (service.formInput.name === '' || service.formInput.email === '' ||
          service.formInput.timePeriod === '') {
        service.isFormValid = 'false'
        this.errorMessage = 'required fields cannot be empty'
        return false
      } else if (!validator.isEmail(service.formInput.email)) {
        service.isFormValid = 'false'
        this.errorMessage = 'check that the email is correct'
        return false
      } else {
        service.isFormValid = 'true'
        return true
      }
    },
    async submitForm(serviceId, service) {
      service.isFormValid = 'null'

      const formValiditiy = this.checkFormValidity(service)

      const snackMessage = formValiditiy
        ? 'Form Successfully Submitted!'
        : 'Error with Form Submission'

      const h = this.$createElement

      const vNodesMsg = h('p', [h('strong', snackMessage)])

      if (formValiditiy) {
        await Api.post('v1/services/' + serviceId + '/bookingRequests', {
          timePeriod: service.formInput.timePeriod,
          date: service.formInput.date,
          user: {
            name: service.formInput.name,
            email: service.formInput.email,
            phoneNumber: this.countryCode + service.formInput.phoneNumber
          },
          message: service.formInput.message ? service.formInput.message : undefined
        })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })

        this.$bvToast.toast([vNodesMsg], {
          toaster: 'b-toaster-bottom-right',
          variant: formValiditiy ? 'success' : 'danger',
          solid: true,
          autoHideDelay: 3000,
          appendToast: true,
          noCloseButton: true
        })
        return true
      }
      return false
    },
    refreshList() {
      this.rerenderIndex += 1
    }
  }
}
</script>

<style>

iframe {
  width: 100%;
  height: 80%;
}
#card-view {
    flex-direction: column;
    width: 100%;
}

#popup-form {
  margin-bottom: 1rem;
}

#mutation-button {
  border-radius: 100px;
  align-self: center;
  margin-bottom: 1rem;
}

#mutation-button:focus {
  border: 2px green;
  animation: blinker 1s linear;
  animation-duration: 2s;
}

#request-button {
  background-color: #0d9488;
}

@keyframes blinker {
  50% {
    opacity: 0.25;
  }
}

.edit-functionality, .price-location {
  display: flex;
  flex-direction: column;
  padding-left: 3rem;

  text-align: right;
}

@media screen and (max-width: 565px) {
  .edit-functionality {
    flex-direction: row;
  }

  .edit-functionality > * {
    padding: 1rem
  }
}

#location-tag {
  align-self: flex-end;
  width: fit-content;
  margin-top: 0.5rem;
}

@media screen and (max-width: 400px) {
  #header-service-name {
    font-size: 1.5rem;
  }

  #route-to-service {
    font-size: 0.5rem;
  }
}

#route-to-service {
  margin-top: 0.5rem;
  align-self: flex-start;
  width: fit-content;
}

.edit-functionality > * {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

#details-text-form {
  padding-left: 1.5rem;
  padding-bottom: 0.75rem;
}

#card-container {
  text-align: center;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.75);
}

#row {
    flex-direction: row;
}

#details-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
}

#service-name-container {
  text-align: left;
  padding-left: 2.5rem;

  display: flex;
  flex-direction: column;
}

.price-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  padding-right: 2.5rem;
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
    width: 55%;
}

.card-text {
    padding-bottom: 1rem;
}

.form {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.details > *, .card-paragraph > *, .right-form > *, .left-form > * {
    margin: 0.5rem
}

.card-paragraph {
    display:flex;
    flex-direction: column;
    width: 15rem;
}

.no-service-available {
  margin-top: 1rem;
}

.no-service-available > * {
  margin-top: 3rem;
}
</style>
