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

<style>
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica", sans-serif;
  }
</style>
