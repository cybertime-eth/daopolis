<template>
  <header>
    <div class="header container-xl">
    <nuxt-link to="/">
      <div class="header__logo">
        <img :src="logoImage" alt="logo" class="header__logo-img">
        <span class="header__logo-link">DAOPOLIS</span>
      </div>
    </nuxt-link>
	  <div class="header__buttons">
    <div class="header__error-network" v-if="showWrongNetwork">
      <img src="/pulse.svg" alt="pulse">
      <p class="header__error-network-text">You are on the wrong network</p>
    </div>
		<nuxt-link to="/collection"  v-if="!showWrongNetwork && address && saleOpened">
		  <button class="header__box">
			My collection
		  </button>
		</nuxt-link>
		<div class="header__wallet" @click="handleShowProfileMenu" v-if="address">
		<h3 class="header__wallet-address">{{ address }}</h3>
		</div>
		<button class="header__connect" v-else @click="showConnectModal = true">Connect <span class="desktop-inline">Wallet</span></button>
    <img src="/burger.svg" alt="burger" class="header__mobile-menu" @click="openProfileMenu" v-if="!showProfileMenuMobile">
    <img src="/close.svg" alt="burger" class="header__mobile-menu" @click="closeProfileMenu" v-else>
	  </div>
    </div>
   <connect v-if="showConnectModal && !address" @closeModal="closeModal"/>
   <profileModal v-show="showProfileMenu" @closeModal="closeModal"/>
   <profileMenuMobile v-show="showProfileMenuMobile"/>
  </header>
</template>
<script>
import connect from '@/components/modals/connect'
import profileModal from '@/components/modals/profileModal'
import profileMenuMobile from '@/components/modals/profileMenuMobile'
export default {
  data() {
    return {
      image: false,
      showConnectModal: false,
      showProfileMenu: false,
      showProfileMenuMobile: false,
      isMobilePlatform: false
    }
  },
  components: {
	connect,
	profileModal,
	profileMenuMobile
  },
  computed: {
    saleOpened() {
      return this.$store.state.saleOpened
    },
    address() {
      return this.$store.state.address
    },
    showWrongNetwork() {
      return this.$store.state.wrongNetwork
    },
    logoImage() {
      if (!this.isMobilePlatform) {
        return '/logo.png';
      } else {
        return '/logo-mobile.png';
      }
    }
  },
  mounted() {
    this.isMobilePlatform = this.isMobile()
  },
  methods: {
    handleShowProfileMenu() {
      if (!this.isMobilePlatform) {
        this.showProfileMenu = true
      }
    },
    closeModal(payload) {
      this.showConnectModal = payload
      this.showProfileMenu = payload
	},
	openProfileMenu() {
	  document.querySelector('.header').classList.add('fixed')
	  this.showProfileMenuMobile = true
	},
	closeProfileMenu() {
	  document.querySelector('.header').classList.remove('fixed')
	  this.showProfileMenuMobile = false
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
  position: relative;

  &.fixed {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 20;
  }
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
  &__error {
    &-network {
      padding: 1.2rem .8rem;
      background: $pink;
      display: flex;
      align-items: center;
      border-radius: .8rem;
      justify-self: flex-end;
      margin-right: 2.25rem;
      img {
        width: 1.35rem;
      }
      &-text {
        color: $white;
        padding-left: .8rem;
        font-size: 1.08rem;
      }
    }
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
  &__mobile-menu {
    display: none;
  }

  @media (max-width: 460px) {
    &__logo-link {
      display: none;
    }
    &__logo-img {
      width: 2rem;
    }
    &__error-network {
      position: absolute;
      right: 1.3rem;
      top: 9.3rem;
      &-text {
        font-size: 1.2rem;
      }
    }
    &__box, &__wallet {
      width: auto;
      height: auto;
      white-space: nowrap;
    }
    &__box {
      padding: 0.6rem 1rem;
      margin-right: 0.8rem;
    }
    &__wallet {
      padding: 0.5rem 1rem;
    }
    &__connect {
      width: 10.1rem;
      height: 2rem;
      font-size: 1.3rem;
      line-height: 1;
    }
    &__mobile-menu {
      display: block;
      width: 1.9rem;
      margin-left: 2rem;
      cursor: pointer;
    }
  }
}
</style>
