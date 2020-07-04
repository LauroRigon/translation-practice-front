<template>
  <div>
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import Notification from "@/components/Notification";

export default {
  name: "NotificationsContainer",
  components: {Notification},
  computed: {
    notifications() {
      return this.$store.state.notifications;
    }
  },
}
</script>