<template>
  <div class="simple-card login-form flex-grow-1" style="max-width: 450px;">
    <b-form @submit.prevent="handleSubmit">
      <b-form-group
        label="Email"
        label-for="email"
      >
        <b-form-input
          id="email"
          type="email"
          v-model="credentials.email"
          required
          placeholder="Your email"
        />
      </b-form-group>

      <b-form-group
        label="Password"
        label-for="password"
      >
        <b-form-input
          id="password"
          v-model="credentials.password"
          required
          placeholder="Your password"
          type="password"
        />
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="false" block>Login</b-button>
    </b-form>

    <div class="d-flex flex-grow-1 align-items-center">
      <div class="flex-grow-1 border-bottom border-top-0 mr-1" style="border-color: #383838 !important;"></div>
      <p class="mb-1">or</p>
      <div class="flex-grow-1 border-bottom border-top-0 ml-1" style="border-color: #383838 !important;"></div>
    </div>
    <div class="d-flex flex-grow-1 justify-content-center">
      <router-link :to="{name: 'register'}">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue'

export default {
  name: "Login",

  components: { BForm, BFormGroup, BFormInput, BButton },

  data() {
    return {
      credentials: {
        email: '',
        password: '',
      }
    }
  },

  methods: {
    handleSubmit() {
      this.$store.dispatch('auth/login', this.credentials);
    }
  },
}
</script>