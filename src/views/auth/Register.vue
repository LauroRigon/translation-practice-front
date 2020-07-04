<template>
  <div class="simple-card login-form flex-grow-1" style="max-width: 450px;">
    <b-form @submit.prevent="handleSubmit">
      <b-form-group
        label="Name"
        label-for="name"
      >
        <b-form-input
          id="name"
          v-model="credentials.name"
          required
          placeholder="Your name"
          @blur="$v.credentials.name.$touch()"
        />
        <template v-if="$v.credentials.name.$error">
          <p class="text-danger" v-if="!$v.credentials.name.required">Name required</p>
        </template>
      </b-form-group>

      <b-form-group
              label="Email"
              label-for="email"
      >
        <b-form-input
                id="email"
                v-model="credentials.email"
                required
                placeholder="Your email"
                @blur="$v.credentials.email.$touch()"
        />
        <template v-if="$v.credentials.email.$error">
          <p class="text-danger" v-if="!$v.credentials.email.required">Email required</p>
          <p class="text-danger" v-if="!$v.credentials.email.email">Type a valid email</p>
        </template>
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
          @blur="$v.credentials.password.$touch()"
        />
        <template v-if="$v.credentials.password.$error">
          <p class="text-danger" v-if="!$v.credentials.password.required">Password required</p>
          <p class="text-danger" v-if="!$v.credentials.password.minLength">Type at least 6 chars</p>
        </template>
      </b-form-group>

      <b-form-group
        label="Password"
        label-for="password-confirm"
      >
        <b-form-input
          id="password-confirm"
          v-model="credentials.confirm_password"
          required
          placeholder="Your password again"
          @blur="$v.credentials.confirm_password.$touch()"
        />
        <template v-if="$v.credentials.confirm_password.$error">
          <p class="text-danger" v-if="!$v.credentials.confirm_password.required">Password required</p>
          <p class="text-danger" v-if="!$v.credentials.confirm_password.sameAsPassword">Passwords does not match</p>
        </template>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        :disabled="$v.credentials.$anyError"
        block
      >Sign Up</b-button>

      <div class="d-flex flex-grow-1 align-items-center">
        <div class="flex-grow-1 border-secondary border-bottom border-top-0 mr-1"></div>
        <p class="mb-1">or</p>
        <div class="flex-grow-1 border-secondary border-bottom border-top-0 ml-1"></div>
      </div>

      <div class="d-flex flex-grow-1 justify-content-center">
        <router-link :to="{ name: 'login' }">Already have an Account</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

import store from "@/store";

export default {
  name: "Register",

  components: { BForm, BFormGroup, BFormInput, BButton },

  validations: {
    credentials: {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      confirm_password: { required, sameAsPassword: sameAs('password') },
    }
  },

  data() {
    return {
      credentials: {
        name: '',
        email: '',
        password: '',
        confirm_password: ''
      }
    }
  },

  methods: {
    handleSubmit() {
      store.dispatch('auth/register', this.credentials);
    }
  },
}
</script>