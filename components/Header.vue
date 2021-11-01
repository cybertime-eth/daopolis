<template>
  <header>
    <div class="header container-xl">
      <div class="header__logo">
        <img src="/logo.png" alt="logo" class="header__logo-img">
        <nuxt-link to="/" class="header__logo-link">DAOPOLIS</nuxt-link>
      </div>
      <button class="header__box">
        My collection
      </button>
      <div class="header__wallet" v-if="address">
        <h3 class="header__wallet-address">{{ address }}</h3>
      </div>
      <button class="header__connect" v-else @click="showConnectModal = true">Connect Wallet</button>
    </div>
    <connect v-if="showConnectModal && !address" @closeModal="closeModal"/>
  </header>
</template>
<script>
import connect from '@/components/modals/connect'
export default {
  data() {
    return {
      image: false,
      showConnectModal: false,
      showProfileMenu: false
    }
  },
  components: {
    connect,
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    address() {
      return this.$store.state.address
    }
  },
  methods: {
    closeModal(payload) {
      this.showConnectModal = payload
      this.showProfileMenu = payload
    }
  }
}
</script>
<style lang="scss">
header {
  box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
}
.header {
  height: 9.5rem;
  display: grid;
  grid-template-columns: 88rem 14rem 20rem;
  align-items: center;
  justify-content: space-between;
  &__logo {
    display: flex;
    align-items: center;
    width: 14.9rem;
    justify-content: space-between;
    &-link {
      font-family: Orbitron-Black;
      letter-spacing: 0.04em;
      font-size: 2.4rem;
      padding-left: 1.5rem;
    }
    &-img {
      width: 3rem;
    }
  }
  &__ul {
    display: flex;
    justify-content: space-between;
  }
  &__box {
    width: 13.9rem;
    height: 4.8rem;
    cursor: pointer;
  }
  &__wallet {
    background: $modalColor;
    border-radius: 2.5rem;
    width: 19.7rem;
    height: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: end;
    cursor: pointer;
  }
  &__connect {
    width: 17.4rem;
    height: 4.8rem;
    cursor: pointer;
  }
}
</style>
