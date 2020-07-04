<template>
  <div>
    <NotificationsContainer />
    <router-view></router-view>
  </div>
</template>

<script>
import NotificationsContainer from "@/components/NotificationsContainer";

export default {
  name: 'App',
  components: {
    NotificationsContainer,
  }
}
</script>
