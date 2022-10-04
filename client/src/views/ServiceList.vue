<template>
    <div>
        <SideBar/>
        <div class="navbar-dash-container">
            <NavBar style="justify-content:flex-end" isDashboard="true"/>
        </div>
        <Accordion :services="services" :isLoggedIn="isLoggedIn"/>
    </div>
</template>

<script>
import { Api } from '@/Api'
import Accordion from '../components/Accordion.vue'
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'

export default {
  data() {
    return {
      services: [],
      rerenderIndex: 1,
      isLoggedIn: localStorage.loginToken !== ''
    }
  },
  async mounted() {
    let tempArr = []
    await Api.get('v1/providers/' + localStorage.loginId + '/services')
      .then(response => {
        tempArr = response.data
      })
      .catch(error => {
        tempArr = error
      })
    let counter = 1
    tempArr.forEach(element => {
      this.services.push({
        ...element,
        isFormValid: 'null',
        visible: false,
        counter: 'collapse-' + counter,
        popUp: 'modal-' + counter,
        confirmDelete: false,
        confirmEdit: false,
        formInput: {
          name: '',
          email: '',
          phoneNumber: '',
          message: '',
          date: '',
          timePeriod: ''
        }
      })
      counter++
    })
  },
  components: { Accordion, SideBar, NavBar }
}
</script>

<style>

</style>
