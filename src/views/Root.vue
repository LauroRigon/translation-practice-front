<template>
  <div class="main container-fluid">
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
  body {
    background-color: #0E0E10;
    font-family: "Helvetica", sans-serif !important;
    color: rgb(211, 211, 211);
  }
</style>