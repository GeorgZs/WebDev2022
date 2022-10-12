<template>
    <div>
        <NavBar />
        <div id="main-content">
            <div id="register-component">
                <div class="register-information">
                    <h1>Register</h1>
                    <span>Welcome, please fill in information about your business</span>
                </div>
                <div class="left-right">
                    <div class="left-side">
                        <div class="register-form">
                            <input type="text" name="name" autocomplete="off" v-model="register.name" required>
                            <label for="name" class="field-name">
                                <span class="content-name">Name</span>
                            </label>
                        </div>
                        <div class="register-form">
                            <input id="address" type="text" name="address" autocomplete="off" v-model="register.address" required>
                            <label for="address" class="field-name">
                                <span class="content-name">Address</span>
                            </label>
                        </div>
                        <div class="register-form">
                            <input id="sector" type="text" name="sector" autocomplete="off" v-model="register.sector" required>
                            <label for="sector" class="field-name">
                                <span class="content-name">Sector</span>
                            </label>
                        </div>

                    </div>
                    <div class="right-side">
                        <div class="register-form">
                            <input id="email" type="text" name="email" autocomplete="off" v-model="register.email" required>
                            <label for="email" class="field-name">
                                <span class="content-name">Email</span>
                            </label>
                        </div>
                        <div class="register-form">
                            <input id="password" type="text" name="password" autocomplete="off" v-model="register.password" required>
                            <label for="password" class="field-name">
                                <span class="content-name">Password</span>
                            </label>
                        </div>
                        <div class="register-form">
                            <input id="phoneNumber" type="text" name="phoneNumber" autocomplete="off" v-model="register.phoneNumber" required>
                            <label for="phoneNumber" class="field-name">
                                <span class="content-name">Phone number</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="button-for-register">
                    <b-button id="register-button" v-on:click="registerUser()" variant="primary">Register</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { Api } from '../Api'

export default {
  name: 'register',
  data() {
    return {
      register: {
        name: '',
        address: '',
        sector: '',
        email: '',
        password: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    hello() {
      return alert('Hello world')
    },
    async registerUser() {
      await Api.post('/v1/providers/register', {
        email: this.register.email,
        password: this.register.password,
        name: this.register.name,
        address: this.register.address,
        sector: this.register.sector,
        phoneNumber: this.register.phoneNumber
      })
        .then(response => {
          const h = this.$createElement
          const vNodesMsg = h('p', [h('strong', 'Registered Successfully - Proceeding to Login...')])

          this.$bvToast.toast([vNodesMsg], {
            toaster: 'b-toaster-bottom-right',
            variant: 'success',
            solid: true,
            autoHideDelay: 1000,
            appendToast: true,
            noCloseButton: true
          })

          setTimeout(() => {
            this.register = response.data
            this.$router.push('/login')
          }, 1000)
        })
        .catch(error => { console.log(error) })
    }
  },
  components: {
    NavBar
  }
}
</script>

<style>
#main-content {
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-left: 12rem;
    padding: 10px;
}

#register-component {
    background-color:white;
    height: 70%;
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-direction: column;
    text-align: left;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.register-information {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 45px;
    margin-top: 20px;

}

.left-right {
    display: flex;
    justify-content: space-evenly;
    margin-top: 4rem;
    height: 50%;
}
.left-side {
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 80%;

}
.right-side {
    display: flex;
    flex-direction: column;
    width: 40%;
}

.register-form {
    width: 100%;
    position: relative;
    height: 50px;
    margin: 7px;
}

.register-form input {
    width: 100%;
    height: 100%;
    padding-top: 5px;
    border: none;
    outline: none;
}
.register-form label {
    position: absolute;
    bottom: 0px;
    left: 0%;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border-bottom: 1px solid black;
}

.register-form input:focus + .field-name .content-name, .register-form input:valid + .field-name .content-name {
    transform: translateY(-150%);
    font-size: 14px;
}

.register-form input:focus + .field-name::after, .register-form input:valid + .field-name::after {
    transform: translateX(0%);

}
.register-form input:focus + .password-name .content-name, .register-form input:valid + .password-name .content-name {
    transform: translateY(-150%);
    font-size: 14px;
}

.register-form input:focus + .password-name::after, .register-form input:valid + .password-name::after {
    transform: translateX(0%);
}

.button-for-register {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
}
#register-button {
    background-color: #0d9488;
    border:none;
}

</style>
