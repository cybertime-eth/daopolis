<template>
  <div class="menu-mobile">
    <div class="menu-mobile-list">
      <a href="https://cybertime.medium.com" target="_blank" class="menu-mobile-list-link">Medium</a>
      <a href="https://twitter.com/cybertime_eth" target="_blank" class="menu-mobile-list-link">Twitter</a>
      <a href="https://t.me/cybertime_eth" target="_blank" class="menu-mobile-list-link">Telegram</a>
      <a href="https://github.com/cybertime-eth" target="_blank" class="menu-mobile-list-link">Github</a>
      <a href="https://discord.gg/cKcWfCux4s" target="_blank" class="menu-mobile-list-link">Discord</a>
      <a @click="logout" class="menu-mobile-list-link">Logout</a>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style lang="scss">
.menu-mobile {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: .8rem;
  right: 0;
  bottom: 0;
  background: $backgroundBody;
  z-index: 10;
  &-list {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-top: 9.5rem;
    &-link {
      width: 100%;
      padding-bottom: 2.5rem;
      font-weight: 600;
      font-size: 1.6rem;
    }
  }
}
</style>
