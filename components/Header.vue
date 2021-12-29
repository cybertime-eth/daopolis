<template>
  <header>
    <div class="header container-xl">
      <div class="header__logo">
        <img src="/logo.png" alt="logo" class="header__logo-img">
        <nuxt-link to="/" class="header__logo-link">DAOPOLIS</nuxt-link>
      </div>
	  <div class="header__buttons">
		<nuxt-link to="/collection"  v-if="address && !openSaleUser">
		  <button class="header__box">
			My collection
		  </button>
		</nuxt-link>
		<div class="header__wallet" @click="showProfileMenu = true" v-if="address">
		<h3 class="header__wallet-address">{{ address }}</h3>
		</div>
		<button class="header__connect" v-else @click="showConnectModal = true">Connect Wallet</button>
	  </div>
    </div>
   <connect v-if="showConnectModal && !address" @closeModal="closeModal"/>
   <profileModal v-show="showProfileMenu" @closeModal="closeModal"/>
  </header>
</template>
<script>
import connect from '@/components/modals/connect'
import profileModal from '@/components/modals/profileModal'
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
	profileModal
  },
  computed: {
    openSaleUser() {
      return !this.$store.state.userInWhitelist
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &__logo {
    display: flex;
    align-items: center;
    &-link {
      font-family: Orbitron-Black;
      letter-spacing: 0.1em;
      font-size: 2.4rem;
    }
    &-img {
      width: 6rem;
      margin-right: 1rem;
    }
  }
  &__ul {
    display: flex;
    justify-content: space-between;
  }
  &__box {
    width: 18.4rem;
    height: 4.8rem;
    cursor: pointer;
  }
  &__buttons {
	display: flex;
	align-items: center;
  }
  &__box {
	margin-right: 30px;
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
    width: 17.9rem;
    height: 4.8rem;
    cursor: pointer;
  }
}
</style>
