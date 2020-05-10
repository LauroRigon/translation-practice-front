<template>
  <div>
    <Notification
      v-for="notification in sharedState.notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import store from "@/store";
import Notification from "@/components/Notification";

export default {
  name: "NotificationsContainer",
  components: {Notification},
  data() {
    return {
      sharedState: store.state
    }
  },
}
</script>

<style scoped>

</style>