<template>
  <div>
    <b-form @submit.prevent="handleSubmit">
      <b-form-group
        label="Name"
        label-for="name"
      >
        <b-form-input
          id="name"
          v-model="privateState.credentials.name"
          required
          placeholder="Your name"
          @blur="$v.privateState.credentials.name.$touch()"
        />
        <template v-if="$v.privateState.credentials.name.$error">
          <p class="text-danger" v-if="!$v.privateState.credentials.name.required">Name required</p>
        </template>
      </b-form-group>

      <b-form-group
              label="Email"
              label-for="email"
      >
        <b-form-input
                id="email"
                v-model="privateState.credentials.email"
                required
                placeholder="Your email"
                @blur="$v.privateState.credentials.email.$touch()"
        />
        <template v-if="$v.privateState.credentials.email.$error">
          <p class="text-danger" v-if="!$v.privateState.credentials.email.required">Email required</p>
          <p class="text-danger" v-if="!$v.privateState.credentials.email.email">Type a valid email</p>
        </template>
      </b-form-group>

      <b-form-group
        label="Password"
        label-for="password"
      >
        <b-form-input
          id="password"
          v-model="privateState.credentials.password"
          required
          placeholder="Your password"
          @blur="$v.privateState.credentials.password.$touch()"
        />
        <template v-if="$v.privateState.credentials.password.$error">
          <p class="text-danger" v-if="!$v.privateState.credentials.password.required">Password required</p>
          <p class="text-danger" v-if="!$v.privateState.credentials.password.minLength">Type at least 6 chars</p>
        </template>
      </b-form-group>

      <b-form-group
              label="Password"
              label-for="password-confirm"
      >
        <b-form-input
                id="password-confirm"
                v-model="privateState.credentials.confirm_password"
                required
                placeholder="Your password again"
                @blur="$v.privateState.credentials.confirm_password.$touch()"
        />
        <template v-if="$v.privateState.credentials.confirm_password.$error">
          <p class="text-danger" v-if="!$v.privateState.credentials.confirm_password.required">Password required</p>
          <p class="text-danger" v-if="!$v.privateState.credentials.confirm_password.sameAsPassword">Passwords does not match</p>
        </template>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="$v.privateState.credentials.$anyError || sharedState.loadings.register">Register</b-button>
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
    privateState: {
      credentials: {
        name: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        confirm_password: { required, sameAsPassword: sameAs('password') },
      }
    }
  },

  data() {
    return {
      privateState: {
        credentials: {
          name: '',
          email: '',
          password: '',
          confirm_password: ''
        }
      },
      sharedState: store.state,
    }
  },

  methods: {
    handleSubmit() {
      store.register(this.privateState.credentials)
    }
  },
}
</script>