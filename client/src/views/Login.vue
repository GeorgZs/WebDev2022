<template>
    <div>
        <NavBar/>
        <div id="body-content">
            <div id="login-component">
                <h2>Login</h2>
                <div class="no-account-text">
                    <span>No account?</span><a href="register"><span> Create here!</span></a>
                </div>

                <div class="login-credentials">
                    <div class="login-form">
                        <input id="email-field" type="text" name="email" autocomplete="off" v-model="credentials.email" required>
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
      }
    }
  },
  methods: {
    hello() {
      return alert('Hello world')
    },
    loginUser() {
      Api.post('/v1/providers/login', this.credentials)
        .then(response => {
          localStorage.loginToken = response.data.token
          localStorage.loginId = response.data.id
        })
    }
  },
  components: { NavBar }
}
</script>

<style>
#body-content {
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding: 10px;
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
    background-color: #0d9488;
    border:none;
}

</style>
