<template>
  <div class="modal">
    <div class="modal__block">
      <h2 class="modal__title">Connect your wallet</h2>
      <img src="/close.svg" alt="close" class="modal__close" @click="closeModal">
      <div class="modal__connect">
        <button class="modal__connect-button" @click="connectValora">
          Valora
          <img src="/auth/valora.svg" alt="valora" class="modal__connect-button-image">
        </button>
        <button class="modal__connect-button" @click="connectMetaTrust">
          MetaMask
          <img src="/auth/metamask.svg" alt="metamask" class="modal__connect-button-image">
        </button>
        <button class="modal__connect-button" @click="connectWallet">
          WalletConnect
          <img src="/auth/WalletConnect.png" alt="metamask" class="modal__connect-button-image">
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    walletUri() {
      return this.$store.state.walletUri
    }
  },
  watch: {
    walletUri() {
      if (this.$store.state.walletUri) {
        this.openMetamaskAppFromMobile()
      }
    }
  },
  methods: {
    async connectMetaTrust() {
      if (window.ethereum) {
        await this.$store.dispatch('connectMetaTrust')
      } else {
        if (!this.walletUri) {
          this.$store.dispatch('createWalletConnect')
        } else {
          this.openMetamaskAppFromMobile()
        }
      }
    },
    openMetamaskAppFromMobile() {
      if (this.isMobile()) {
        location.href = `https://metamask.app.link/wc?uri=${encodeURIComponent(this.walletUri)}`
      }
    },
    connectValora() {
      this.$emit('showValora')
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
		margin-left: 0.3rem;
		&__block {
			width: 100%;
			&.no-metamask {
				padding-top: 8rem !important;
				padding-bottom: 4rem !important;
			}
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
		&__connect-button {
			width: 100%;
		}
		&__connect-image {
			margin-top: 4rem !important;
			margin: 0 auto;
		}
	}
}
</style>
