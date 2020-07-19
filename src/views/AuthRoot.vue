<template>
  <div class="auth-main-content d-flex align-items-center justify-content-center vh-100 overflow-hidden">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AuthRoot",
}
</script>