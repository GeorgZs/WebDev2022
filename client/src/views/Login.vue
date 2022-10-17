<template>
    <div>
        <NavBar/>
        <div id="body-content">
            <div id="login-component">
                <h2 id="login-title">Login</h2>
                <div class="no-account-text">
                    <span>No account?</span><a href="register"><span> Create here!</span></a>
                </div>

                <div class="login-credentials">
                    <div class="login-form">
                        <input id="email-field" type="text" name="email" @click="onLoad()" autocomplete="off" v-model="credentials.email" required>
                            <label for="email" class="email-name">
                                <span class="content-name">email</span>
                            </label>
                    </div>
                    <div class="login-form">
                        <input id="password-field" type="password" name="password" autocomplete="off" v-model="credentials.password" required>
                            <label for="password" class="password-name">
                                <span class="content-name">password</span>
                            </label>
                    </div>
                    <b-button id="button-login" v-on:click="loginUser()">Login</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { Api } from '../Api'

export default {
  name: 'login',
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      formValiditiy: false
    }
  },
  methods: {
    hello() {
      return alert('Hello world')
    },
    async loginUser() {
      const h = this.$createElement
      await Api.post('/v1/providers/login', this.credentials)
        .then(response => {
          localStorage.loginToken = response.data.token
          localStorage.loginId = response.data.id
          this.snackMessage = h('p', [h('strong', 'Login successful')])
          this.formValiditiy = true
          this.$router.push('/dashboard')
        })
        .catch(error => {
          console.log(error)
          this.snackMessage = h('p', [h('strong', 'Login unsuccessful')])
          this.formValiditiy = false
        })
      this.showSnackbar()
    },
    onLoad() {
      document.getElementById('input-bar').addEventListener('keypress', async event => {
        if (event.key === 'Enter') {
          await this.loginUser()
        }
      })
    },
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
    }
  },
  components: { NavBar }
}
</script>

<style>
#body-content {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin-top: 5rem;
}

#login-component {
    background-color:white;
    height: 50%;
    width: 40%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
#login-title {
    margin-top: 2rem;
}

@media screen and (max-width: 700px) {
    #login-component{
        width: 60%;
    }
    #body-content{
        margin-top:100px;
    }
    #button-login{
        margin-bottom: 15px;
    }
}
@media screen and (max-width: 400px) {
    #login-component{
        width: 100%;
    }
    #body-content{
        margin-top:100px;
    }
    #button-login{
        margin-bottom: 15px;
    }
}
.no-account-text {
    display: flex;
    justify-content: center;
}

.no-account-text > * {
    margin: 0.3rem;
}

.login-credentials {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
}

.login-form {
    width: 60%;
    position: relative;
    height: 50px;
    margin: 7px;
}

.login-form input {
    width: 100%;
    height: 100%;
    padding-top: 5px;
    border: none;
    outline: none;
}
.login-form label {
    position: absolute;
    bottom: 0px;
    left: 0%;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border-bottom: 1px solid black;
}

.login-form label::after {
    content: "";
    position: absolute;
    left: 0px;
    bottom: -1px;
    height: 100%;
    width: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;

}

.content-name {
    position: absolute;
    bottom: 5px;
    left: 0px;
    transition: all 0.3s ease;
}
.login-form input:focus + .email-name .content-name, .login-form input:valid + .email-name .content-name {
    transform: translateY(-150%);
    font-size: 14px;
}

.login-form input:focus + .email-name::after, .login-form input:valid + .email-name::after {
    transform: translateX(0%);

}
.login-form input:focus + .password-name .content-name, .login-form input:valid + .password-name .content-name {
    transform: translateY(-150%);
    font-size: 14px;
}

.login-form input:focus + .password-name::after, .login-form input:valid + .password-name::after {
    transform: translateX(0%);
}

#button-login {
    margin-top: 3.5rem;
    margin-bottom: 2.5rem;
    background-color: #0d9488;
    border:none;
}

</style>
