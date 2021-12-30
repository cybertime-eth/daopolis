<template>
  <div class="modal">
    <div class="modal__block">
      <h2 class="modal__title desktop">Connect your wallet</h2>
			<h2 class="modal__title mobile">Open <span class="modal__title-city">daopolis.city</span> in your Metamask mobile app</h2>
      <img src="/close.svg" alt="close" class="modal__close" @click="closeModal">
      <div class="modal__connect desktop">
        <button class="modal__connect-button" @click="connectMetaTrust">
          MetaMask
          <img src="/auth/metamask.svg" alt="metamask" class="modal__connect-button-image">
        </button>
        <!-- <button class="modal__connect-button" @click="connectMetaTrust">
          CELO Wallet
          <img src="/auth/trastwallet.svg" alt="metamask" class="modal__connect-button-image">
        </button>
        <button class="modal__connect-button" @click="connectWallet">
          WalletConnect
          <img src="/auth/WalletConnect.png" alt="metamask" class="modal__connect-button-image">
        </button> -->
      </div>
			<img src="/auth/metamask-mobile.svg" alt="metamask" class="modal__connect-image mobile">
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    async connectMetaTrust() {
      await this.$store.dispatch('connectMetaTrust')
    },
    async connectWallet() {
      await this.$store.dispatch('walletConnect', true)
    },
    closeModal() {
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss">
.modal {
  &__connect {
    padding-top: 4.4rem;
    &-button {
      margin-bottom: 1.4rem;
      background: $modalColor;
      border-radius: .4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.2rem 1rem;
      width: 30rem;
      cursor: pointer;
      &-image {
        width: 2.4rem;
      }
    }
	}
	@media(max-width: 460px) {
		&__block {
			padding-top: 8rem !important;
			padding-bottom: 4rem !important;
		}
		&__title {
			width: 70%;
    	margin: 0 auto;
			line-height: 2.2rem;
			text-align: center;
    	font-size: 1.6rem;
			&-city {
				color: $green;
			}
		}
		&__connect-image {
			margin-top: 4rem !important;
			margin: 0 auto;
		}
	}
}
</style>
