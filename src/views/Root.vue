<template>
  <div>
    <TheNavbar/>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
export default {
  name: "App",
  components: {TheNavbar}
}
</script>