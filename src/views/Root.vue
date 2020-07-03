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
  name: "Root",
  components: {TheNavbar}
}
</script>