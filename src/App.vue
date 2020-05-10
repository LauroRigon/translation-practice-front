<template>
  <div class="container">
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
