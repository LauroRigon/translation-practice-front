<template>
  <div>
    <b-form @submit.prevent="handleSubmit">
      <b-form-group
        label="Email"
        label-for="email"
      >
        <b-form-input
          id="email"
          type="email"
          v-model="privateState.credentials.email"
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
          v-model="privateState.credentials.password"
          required
          placeholder="Your password"
        />
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="sharedState.loadings.login">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue'

import store from "@/store";

export default {
  name: "Login",

  components: { BForm, BFormGroup, BFormInput, BButton },

  data() {
    return {
      privateState: {
        credentials: {
          email: '',
          password: '',
        }
      },
      sharedState: store.state,
    }
  },

  methods: {
    handleSubmit() {
      store.login(this.privateState.credentials);
    }
  },
}
</script>

<style scoped>

</style>