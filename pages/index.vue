<template>
  <section id="home">
    <div class="home container-xl">
      <video src="/daopolis-movie.MP4" class="home__image" autoplay muted loop></video>
	    <div class="home__main" v-if="currentStep === 0">
        <h1 class="home__main-name">Meet Daopolis Citizens</h1>
        <h3 class="home__main-description">Automatically generated 9192 NFT's. Born in the CyberTime era, Daopolis
          citizens will be the foundation of a new gaming metaverse on Celo. Find your digital avatar, gain access
          to a private club and participate in unique NFT games!</h3>
        <h3 class="home__main-minted">Access to the whitelist allows minting NFTs from just 2 CELO. Get on the list today!</h3>
        <a href="https://discord.gg/cKcWfCux4s" target="_blank"><button class="home__main-buy" >Get into whitelist</button></a>
      </div>
      <div class="home__info" v-else>
        <h1 class="home__info-name">Meet Daopolis Citizens</h1>
        <h3 class="home__info-description">Automatically generated 9192 NFT's. Born in the CyberTime era, Daopolis citizens will be the foundation of a new gaming metaverse on Celo. Find your digital avatar, gain access to a private club and participate in unique NFT games!</h3>
		<div class="home__info-sale" v-if="openSaleUser">
		  <h3 class="home__info-sale-open">Public sale will open soon</h3>
		  <div class="home__info-sale-countdown" v-if="currSaleTime > 0">
			<div class="home__info-sale-countdown-sector day-sector">{{ countdownDay }}</div>
			<span>:</span>
			<div class="home__info-sale-countdown-sector hour-sector">{{ countdownHour }}</div>
			<span>:</span>
			<div class="home__info-sale-countdown-sector minute-sector">{{ countdownMinute }}</div>
			<span>:</span>
			<div class="home__info-sale-countdown-sector second-sector">{{ countdownSeconds }}</div>
		  </div>
		  <p class="home__info-sale-description">If you are on the whitelist, then connect and buy a collection at a low price.</p>
		</div>
		<div v-if="isConnected && !openSaleUser">
		  <h3 class="home__info-minted">{{ totalMintCount }}/9192 minted</h3>
		  <div class="home__info-count" v-if="totalMintCount > 2000">
		    <div class="home__info-count-line" :style="'width:' + widthLine + '%'"></div>
		    <div class="home__info-count-prices">
		  	  <div class="home__info-count-price" :key="index" v-for="(price, index) in celoPrices">
		  	    <img src="/dot.png" alt="dot" class="home__info-count-price-dot">
		  	    <h4 class="home__info-count-price-celo">{{ price }} celo</h4>
		  	  </div>
		    </div>
		  </div>
		  <div class="home__info-price" v-if="totalMintCount > 2000"><img src="/celo.png" alt="celo"><h3>{{ totalCeloPrice }} CELO</h3></div>
		  <div class="home__info-select">
		    <p class="home__info-select-title">Select the amount of NFT you want to buy</p>
		    <div class="home__info-select-buttons">
		  	  <button class="home__info-select-buttons-button" :class="{selected: buyCount === 1}" @click="handleClickBuyCount(1)">1</button>
		  	  <button class="home__info-select-buttons-button" :class="{selected: buyCount === 5}" @click="handleClickBuyCount(5)">5</button>
		  	  <button class="home__info-select-buttons-button" :class="{selected: buyCount === 10}" @click="handleClickBuyCount(10)">10</button>
		  	  <button class="home__info-select-buttons-button" :class="{selected: buyCount === 20}" @click="handleClickBuyCount(20)">20</button>
		    </div>
		  </div>
		</div>
		<button class="home__info-connect" @click="showConnectModal = true" v-if="!isConnected">Connect Wallet</button>
        <button class="home__info-buy" @click="handleClickBuy" v-else-if="!openSaleUser">Buy now</button>
      </div>
    </div>
    <Footer />
    <Loading v-if="showLoadAlertModal" @closeModal="closeModal" />
	<connect v-if="showConnectModal && !isConnected" @closeModal="closeModal"/>
    <Error v-if="showErrorModal" @closeModal="closeErrorModal" />
    <Purchased v-if="showPurchasedModal" @closeModal="closePurchasedModal" :openCard="false" :countCards="countCards"/>
  </section>
</template>
<script>
import Footer from '@/components/Footer'
import Loading from '@/components/modals/loading'
import Connect from '@/components/modals/connect'
import Error from '@/components/modals/error'
import Purchased from '@/components/modals/purchased'
import { DISTRIBUTED_CELO_PRICES } from '@/constants'
export default {
  data() {
    return {
      showAlertLoad: false,
	  showConnectModal: false,
      countCards: 1,
      currentStep: 1,
      countMinted: 1650,
      maxCountMinted: 8846,
	  widthLine: 33,
	  currSaleTime: 0
    }
  },
  computed: {
	isConnected() {
	  return this.$store.state.address
	},
	openSaleUser() {
	  return !this.$store.state.userInWhitelist
	},
	countdownDay() {
	  return this.getFormattedTime(this.currSaleTime / 3600 / 24)
	},
	countdownHour() {
	  return this.getFormattedTime(this.currSaleTime % (3600 * 24) / 3600)
	},
	countdownMinute() {
	  return this.getFormattedTime(this.currSaleTime % (3600 * 24) % 3600 / 60)
	},
	countdownSeconds() {
	  return this.getFormattedTime(this.currSaleTime % (3600 * 24) % 3600 % 60)
	},
	totalMintCount() {
	  return this.$store.state.totalMintCount
	},
	buyCount() {
	  return this.$store.state.mintCount
	},
	celoPriceInfo() {
	  const distributedPrices = DISTRIBUTED_CELO_PRICES
	  const celoPriceInfo = distributedPrices.find(item => this.totalMintCount >= item.min && this.totalMintCount <= item.max || this.totalMintCount > 9192 && item.min > 9192)
	  return celoPriceInfo
	},
	celoPrices() {
	  return DISTRIBUTED_CELO_PRICES.map(item => item.price)
	},
	totalCeloPrice() {
	  return this.$store.state.celoPrice * this.buyCount
	},
	showErrorModal() {
	  return this.$store.state.rejectBuyNft
	},
	showPurchasedModal() {
    return this.$store.state.successPurchasedNft
	},
	showLoadAlertModal() {
	  return this.showAlertLoad && !this.showErrorModal && !this.showPurchasedModal
	},
  },
  watch: {
	totalMintCount() {
	  if (this.celoPriceInfo) {
		const prices = this.celoPrices
		this.widthLine = (prices.indexOf(this.celoPriceInfo.price) + 1) * 100 / ( prices.length + 1)
		this.$store.commit('setCeloPrice', this.celoPriceInfo.price)
	  }
	}
  },
  mounted() {
	if (this.$store.state.countdownTime > 0) {
	//   const storedTime = localStorage.getItem('daopolis_sale_time')
	  const storedTime = null
	  if (storedTime) {
		this.currSaleTime = parseInt(storedTime)
	  } else {
		this.currSaleTime = this.$store.state.countdownTime
	  }
	  setInterval(this.countdownSaleTime, 1000)
	}
  },
  methods: {
	handleClickBuyCount(count) {
	  this.$store.commit('setMintCount', count)
	},
    closeModal(paylaod) {
	  this.showConnectModal = paylaod
      this.showAlertLoad = paylaod
	},
	closeErrorModal(payload) {
	  this.$store.commit('setRejectBuyNft', payload)
	  this.closeModal(payload)
	},
	closePurchasedModal(payload) {
	  this.$store.commit('setSuccessPurchasedNft', payload)
	  this.closeModal(payload)
	},
	getFormattedTime(time) {
	  const decimalTime = Math.floor(time)
	  return decimalTime > 9 ? Math.floor(decimalTime) : `0${decimalTime}`
	},
    countdownSaleTime() {
	  this.currSaleTime = this.currSaleTime - 1
	  localStorage.setItem('daopolis_sale_time', this.currSaleTime)
	},
    handleClickBuy() {
	  this.showAlertLoad = true
      this.$store.dispatch('buyNft')
    },
  },
  components: {
	Connect,
    Footer,
    Loading,
    Error,
    Purchased
  }
}
</script>
<style lang="scss">
.home {
  display: grid;
  grid-template-columns: 51rem 1fr;
  grid-column-gap: 10.2rem;
  justify-content: space-between;
  padding-top: 4.8rem;
  padding-bottom: 18rem;
  flex-wrap: wrap;
  &__image {
    width: 48.6rem;
    border: .2rem solid $green;
    padding: 1rem;
    border-radius: .8rem;
  }
  &__info {
    &-name {
      font-size: 2.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    &-minted, &-sale-open {
      color: $green;
      text-transform: uppercase;
      font-family: OpenSans-Bold;
      padding-top: 4.8rem;
      text-align: center;
      font-size: 1.8rem;
    }
	&-sale {
	  &-open {
		text-transform: none;
		text-align: left;
		font-size: 1.35rem;
	  }
	  &-countdown {
		display: flex;
		align-items: center;
		margin-top: 1.8rem;
		font-family: OpenSans-Bold;
		font-weight: 500;
		font-size: 2.25rem;
		&-sector {
		  background: $gray2;
		  padding: 5px 8px;
		  border-radius: 2px;
		  color: $textColor;
		}
		span {
		  padding: 0 5px;
		}
	  }
	  &-description {
		padding-top: 2.4rem;
	  }
	}
    &-description {
      font-size: 1.8rem;
      padding-top: 1rem;
    }
    &-select {
      padding-top: 3.6rem;
      &-buttons {
        display: flex;
        align-items: center;
        padding-top: 1.5rem;
        &-button {
          width: 5.7rem;
          height: 3.2rem;
          border-radius: 2rem;
		  margin-right: 3rem;
		  &.selected {
			border-color: $border3;
		  }
        }
      }
    }
    &-count {
      width: 100%;
      height: .4rem;
      background: $white;
	  margin-top: 2.5rem;
	  margin-bottom: 2.9rem;
      position: relative;
      z-index: 0;
      &-line {
        background: $green;
        height: .4rem;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
      &-prices {
        display: flex;
        align-items: center;
        width: 48rem;
        justify-content: space-between;
        margin: 0 auto;
        position: absolute;
        top: -.2rem;
		left: 50%;
		transform: translateX(-50%)
      }
      &-price {
        display: flex;
        flex-direction: column;
        align-items: center;
        &-dot {
          width: .8rem;
          position: relative;
          z-index: 2;
        }
        &-celo {
          font-size: 1.1rem;
          padding-top: .2rem;
        }
      }
    }
    &-price {
      display: flex;
      align-items: center;
      padding-top: 2.8rem;
      img {
        width: 2rem;
        margin-right: 1rem;
      }
      h3 {
        font-size: 1.8rem;
      }
    }
    &-connect, &-buy {
      margin-top: 4rem;
      background: $green;
      width: 100%;
      height: 5.8rem;
      border-radius: 3rem;
      font-size: 1.8rem;
    }
  }
  &__main {
    &-name {
      font-size: 2.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    &-description {
      font-size: 1.8rem;
      padding-top: 4rem;
      line-height: 2.2rem;
    }
    &-minted {
      color: $green;
      text-transform: uppercase;
      font-family: OpenSans-Bold;
      padding-top: 4.7rem;
    }
    &-buy {
      margin-top: 4.5rem;
      background: $green;
      width: 100%;
      height: 5.8rem;
      border-radius: 3rem;
      font-size: 1.8rem;
    }
  }

  @media(max-width: 460px) {
    // mobile responsive
    display: block;
    width: 94%;
    padding-top: 2rem;
    padding-bottom: 13rem;
    &__image {
      width: 94%;
    }
    &__main {
      padding-top: 3.6rem;
      &-name, &-description, &-minted {
        text-align: center;
      }
      &-description {
        padding-top: 8px;
        line-height: 20px;
        font-size: 1.6rem;
        font-weight: normal;
      }
      &-minted {
        padding-top: 3.6rem;
        font-size: 1.8rem;
      }
    }
    &__info {
      padding-top: 3.6rem;
      &-name, &-description, &-minted {
        text-align: center;
      }
      &-minted {
        padding-top: 3.6rem;
      }
      &-price {
        justify-content: center;
      }
      &-select-title {
        font-size: 1.6rem;
      }
      &-select-buttons {
        &-button {
		  flex: 1;
          &:last-child {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
