<template>
  <b-toast ref="bvToast" id="my-toast" :variant="notification.type" solid @hidden="handleHidden">
    <template v-slot:toast-title>
      <div class="d-flex flex-grow-1 align-items-baseline">
        <strong class="mr-auto">{{ notification.title }}</strong>
      </div>
    </template>
    {{ notification.message }}
  </b-toast>
</template>

<script>
import store from "../store";
import { BToast } from 'bootstrap-vue'

export default {
  name: "Notification",
  components: { BToast },
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    this.$refs.bvToast.show('my-toast');
  },

  methods: {
    handleHidden() {
      store.removeNotification(this.notification.id)
    }
  },
}
</script>

<style scoped>

</style>