<template>
  <nav class="top-nav w-100">
    <div class="top-nav__menu d-flex">
      <div class="d-flex flex-grow-1 flex-nowrap justify-content-end ">
        <div class="m-1">
          <b-dropdown size="sm" variant="link" no-caret>
            <template v-slot:button-content>
              <b-avatar src="https://static-cdn.jtvnw.net/user-default-pictures-uv/13e5fa74-defa-11e9-809c-784f43822e80-profile_image-70x70.png"></b-avatar>
            </template>

            <b-dropdown-item @click="handleLogout">
              <font-awesome-icon icon="power-off"/> Sair
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {BDropdown, BDropdownItem, BAvatar} from 'bootstrap-vue'
import store from "@/store";

export default {
  name: "TheNavbar",
  components: {BDropdown, BDropdownItem, BAvatar},
  methods: {
    handleLogout() {
      store.dispatch('auth/logoutFromClient');
    }
  }
}
</script>

<style scoped>

</style>