<template>
  <div>
    <NotificationsContainer />
    <router-view></router-view>
  </div>
</template>

<script>
import store from "@/store";
import NotificationsContainer from "@/components/NotificationsContainer";

export default {
  name: 'App',
  components: {
    NotificationsContainer,
  },

  data() {
    return {
      sharedState: store.state
    }
  },
}
</script>
