<template>
  <section id="home">
    <div class="home container-xl" :class="{'wrong-network': wrongNetwork}">
      <video src="/daopolis-movie.MP4" class="home__image" autoplay muted loop playsinline></video>
      <div class="home__info">
        <h1 class="home__info-name">Meet Daopolis Citizens</h1>
        <h3 class="home__info-description">Automatically generated 9192 NFT's. Born in the CyberTime era, Daopolis citizens will be the foundation of a new gaming metaverse on Celo. Find your digital avatar, gain access to a private club and participate in unique NFT games!</h3>
		<div class="home__info-network" v-if="wrongNetwork">
			<div class="home__info-network-box">
				<img src="/pulse-pink.svg" alt="pulse">
				<span class="home__info-network-status">You are on the wrong network</span>
			</div>
			<div class="home__info-network-add">
				<div class="home__info-network-add-name">Switch to the Celo Network</div>
				<div class="home__info-network-add-description">Click the button below to switch to Celo Network as custom network in your Metamask wallet.</div>
			</div>
			<button class="home__info-add-network" @click="handleClickAddNetwork">Switch to Celo Network</button>
			<div class="home__info-network-manual">
				<button class="home__info-add-manually" @click="showManualNetwork = !showManualNetwork"><span>{{ !showManualNetwork ? '+' : '-' }}</span>Manually add the network instead</button>
				<div class="home__info-network-manual-detail" v-if="showManualNetwork">
					<div class="home__info-network-manual-description">Use the following table to add a custom network RPC manually:</div>
					<div class="home__info-network-manual-detail-box">
						<div class="home__info-network-manual-detail-box-info">Network Name:<b>Celo Mainnet</b></div>
						<div class="home__info-network-manual-detail-box-info">New RPC URL:<a href="https://forno.celo.org" target="_blank">https://forno.celo.org</a></div>
						<div class="home__info-network-manual-detail-box-info">Chain ID:<b>42220</b></div>
						<div class="home__info-network-manual-detail-box-info">Currency Symbol (optional):<b>CELO</b></div>
						<div class="home__info-network-manual-detail-box-info">Block Explorer URL (optional):<a href="https://explorer.celo.org" target="_blank">https://explorer.celo.org</a></div>
					</div>
					<a class="home__info-network-manual-link" href="https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC" target="_blank">Metamask FAQ: How to add custom Network RPC →</a>
				</div>
			</div>
			<div class="home__info-network-alert" v-if="showNetworkAlert">
				<img class="home__info-network-alert-icon" src="/check.svg" alt="check" v-if="!isMobile()">
				<img class="home__info-network-alert-icon" src="/check-mark.svg" alt="check" v-else>
				<span class="home__info-network-alert-description">Network successfully added to MetaMask</span>
			</div>
		</div>
		<div v-else>
			<div class="home__info-sale" v-if="!saleOpened">
			<h3 class="home__info-sale-open" v-if="currSaleTime >= 0">Public sale will open soon</h3>
			<div class="home__info-sale-countdown" v-if="currSaleTime > 0">
				<div class="home__info-sale-countdown-sector day-sector">{{ countdownDay }}</div>
				<span>:</span>
				<div class="home__info-sale-countdown-sector hour-sector">{{ countdownHour }}</div>
				<span>:</span>
				<div class="home__info-sale-countdown-sector minute-sector">{{ countdownMinute }}</div>
				<span>:</span>
				<div class="home__info-sale-countdown-sector second-sector">{{ countdownSeconds }}</div>
			</div>
			<p class="home__info-sale-description" v-if="!isConnected">If you are on the whitelist, then connect and buy a collection at a low price.</p>
			</div>
			<div v-if="isConnected && saleOpened">
				<h3 class="home__info-minted">{{ totalMintCount }}/9192 minted</h3>
				<div class="home__info-count" v-if="totalMintCount >= 2000">
					<div class="home__info-count-line" :style="'width: calc(' + widthLine + '% - 10px)'"></div>
					<div class="home__info-count-prices">
						<div class="home__info-count-price" :key="index" v-for="(price, index) in celoPrices">
							<img src="/dot.png" alt="dot" class="home__info-count-price-dot">
							<h4 class="home__info-count-price-celo">{{ price }} celo</h4>
						</div>
					</div>
				</div>
				<div class="home__info-price" v-if="totalMintCount >= 2000"><img src="/celo.png" alt="celo"><h3>{{ totalCeloPrice }} CELO</h3></div>
				<div class="home__info-select">
					<p class="home__info-select-title">Select the amount of NFT you want to buy</p>
					<div class="home__info-select-buttons">
						<button class="home__info-select-buttons-button" :class="{selected: buyCount === 1, disabled: !hasActiveBalanceFor(1) }" @click="handleClickBuyCount(1)">1</button>
						<button class="home__info-select-buttons-button" :class="{selected: buyCount === 5, disabled: !hasActiveBalanceFor(5)}" @click="handleClickBuyCount(5)">5</button>
						<button class="home__info-select-buttons-button" :class="{selected: buyCount === 10, disabled: !hasActiveBalanceFor(10)}" @click="handleClickBuyCount(10)">10</button>
						<button class="home__info-select-buttons-button" :class="{selected: buyCount === 20, disabled: !hasActiveBalanceFor(20)}" @click="handleClickBuyCount(20)">20</button>
					</div>
				</div>
				<p class="home__info-funds" v-if="insufficentFunds">Insufficient funds</p>
				<div class="home__info-buy-celo-box" v-if="insufficentFunds">
					<button class="home__info-buy-celo celo-button">
						<a href="https://app.ubeswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x471ece3750da237f93b8e339c536989b8978a438" target="_blank">Buy Celo</a>
					</button>
					<button class="home__info-bridge celo-button">
						<a href="https://app.allbridge.io/bridge?from=SOL&to=CELO&asset=SOL" target="_blank">Bridge SOL</a>
					</button>
					<button class="home__info-bridge celo-button">
						<a href="https://optics.app/" target="_blank">Bridge ETH</a>
					</button>
				</div>
				<button class="home__info-buy" @click="handleClickBuy" v-else>Buy now</button>
			</div>
		</div>
		<button class="home__info-connect" @click="showConnectModal = true" v-if="!isConnected">Connect Wallet</button>
      </div>
    </div>
    <Footer />
    <Loading v-if="showLoadAlertModal" @closeModal="closeModal" />
	<connect v-if="showConnectModal && !isConnected" @closeModal="closeModal"/>
    <Error v-if="showErrorModal" @closeModal="closeErrorModal" />
    <Purchased v-if="showPurchasedModal" @closeModal="closePurchasedModal" :openCard="false"/>
  </section>
</template>
<script>
import Footer from '@/components/Footer'
import Loading from '@/components/modals/loading'
import Connect from '@/components/modals/connect'
import Error from '@/components/modals/error'
import Purchased from '@/components/modals/purchased'
import { DISTRIBUTED_CELO_PRICES, SALE_START_TIME, SALE_TIMEZONE_UTC, OPEN_SALE_HOURS } from '@/constants'
export default {
  data() {
    return {
	  showAlertLoad: false,
	  showManualNetwork: false,
	  showConnectModal: false,
      countMinted: 1650,
      maxCountMinted: 8846,
	  widthLine: 33,
	  currSaleTime: 0,
	  balance: 0
    }
  },
  computed: {
	isConnected() {
	  return this.$store.state.address
	},
	wrongNetwork() {
	  return this.$store.state.wrongNetwork
	},
	showNetworkAlert() {
		return this.$store.state.successAddedNetwork
	},
	saleOpened() {
	  return this.$store.state.saleOpened
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
	  const celoPriceInfo = distributedPrices.find(item => this.totalMintCount >= item.min && this.totalMintCount < item.max || this.totalMintCount > 9192 && item.min > 9192)
	  return celoPriceInfo
	},
	celoPrices() {
	  return DISTRIBUTED_CELO_PRICES.map(item => item.price)
	},
	totalCeloPrice() {
	  return this.$store.state.celoPrice * this.buyCount
	},
	insufficentFunds() {
	  return this.totalCeloPrice > this.balance;
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
	isConnected() {
	  if (this.$store.state.address) {
		this.updateBalance()
	  }
	},
	totalMintCount() {
	  if (this.celoPriceInfo) {
		const prices = this.celoPrices
		const priceInfo = this.celoPriceInfo
		const priceIndex = prices.indexOf(priceInfo.price)
		const priceOffset = (this.$store.state.totalMintCount - priceInfo.min) / (priceInfo.max - priceInfo.min)
		this.widthLine = (priceIndex + 1 + priceOffset) * 100 / ( prices.length + 1)
		this.$store.commit('setCeloPrice', this.celoPriceInfo.price)
	  }
	}
  },
  mounted() {
	const startSaleTime = SALE_START_TIME
	if (startSaleTime > 0) {
	  const currLocalDate = new Date()
	  const startUTCTime = startSaleTime + (-SALE_TIMEZONE_UTC * 60 * 60000)
	  const startLocalDate = new Date(startUTCTime + 3600000 * SALE_TIMEZONE_UTC)
	  const endLocalDate = new Date(startLocalDate.getTime() + (12 * 60 * 60 * 1000))
	  const diffSeconds = (endLocalDate - currLocalDate) / 1000
	  const saleSeconds = OPEN_SALE_HOURS * 3600
	  if (diffSeconds <= saleSeconds) {
		this.currSaleTime = diffSeconds
		setInterval(this.countdownSaleTime, 1000)
	  } else if (diffSeconds < 0) {
		this.currSaleTime = -1
      } else {
		this.$store.commit('setSaleOpened', true)	
	  }

      if (this.currSaleTime < 0) {
        this.$store.commit('setSaleOpened', true)
      }
	}
		if (this.balance === 0) {
			this.updateBalance()
		}
  },
  methods: {
	async updateBalance() {
	  this.balance = await this.$store.dispatch('getBalance')
	  if (!this.hasActiveBalanceFor(this.buyCount)) {
		this.handleClickBuyCount(1)
	  }
	},
	hasActiveBalanceFor(count) {
	  return this.balance > this.$store.state.celoPrice * count
	},
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
	},
	handleClickAddNetwork() {
      this.$store.dispatch('addCeloNetwork')
    },
    handleClickBuy() {
	  this.showAlertLoad = true
      this.$store.dispatch('buyNft')
    }
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
      font-size: 28px;
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
	  font-weight: 400;
      font-size: 18px;
      padding-top: 1rem;
	}
	&-network {
	  margin-top: 3.45rem;
	  &-box {
		display: flex;
		align-items: flex-end;
		img {
		  margin-right: 0.6rem;
		}
	  }
	  &-status {
		line-height: 1;
		font-size: 16px;
		color: $pink2;
	  }
	  &-add {
		margin-top: 1.2rem;
		color: $white;
		&-name {
		  font-size: 16px;
		  font-weight: 600;
		}
		&-description {
		  margin-top: 0.6rem;
		  font-size: 14px;
		  color: $white;
		}
	  }
	  &-manual {
			&-description {
				font-size: 14px;
			}
		&-detail {
		  padding: 1.2rem 0;
		  color: $white;
		  &-box {
			background: $gray3;
			margin: 1.5rem 0;
			padding: 0.75rem;
			&-info {
			  padding-top: 1.2rem;
			  font-size: 16px;
			  color: $white;
			  a, b {
				margin-left: 0.75rem;
				font-weight: 600;
				font-size: 16px;
				color: $white;
			  }
			  &:first-child {
				padding: 0;
			  }
			}
		  }
		}
		&-link {
		  font-size: 14px;
		  color: $lightBlue;
		}
	  }
		&-alert {
			position: fixed;
			left: calc((100vw - 121rem) / 2);
			bottom: 0.5rem;
			display: flex;
			align-items: center;
			width: auto;
			background: $green2;
			padding: 0.9rem 1.64rem;
			border-radius: 7px;
			&-icon {
				margin-right: 0.9rem;
			}
			&-description {
				font-weight: 700;
				font-size: 1.2rem;
				color: $white;
			}
		}
	}
    &-select {
      padding-top: 3.6rem;
      &-buttons {
        display: flex;
        align-items: center;
        padding-top: 1.5rem;
        &-button {
          width: 3.75rem;
          height: 2.4rem;
          border-radius: 20px;
		  margin-right: 2.1rem;
		  font-size: 1.05rem;
		  &.selected {
			background: $green2;
			color: $white;
		  }
		  &.disabled:not(.selected) {
			pointer-events: none;
			background: transparent;
			border-color: $grayLight;
			color: $grayLight;
		  }
        }
      }
	}
	&-funds {
	  padding-top: 2.7rem;
	  padding-bottom: 1.2rem;
	  font-size: 14px;
	  color: $pink2;
	}
	&-buy-celo-box {
	  display: flex;
	  align-items: center;
	  flex-wrap: wrap;
	  .celo-button {
		width: 14.2rem;
		background: transparent;
		padding: 1.35rem 0;
		margin-right: 0.75rem;
		border-radius: 30px;
		text-align: center;
		font-weight: 700;
		font-size: 18px;
		color: $white;
		&.home__info-buy-celo, &:hover {
		  background: $green;
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
	&-add-manually {
	  background: transparent;
	  border: 0;
	  font-size: 14px;
	  span {
		margin-right: 0.6rem;
	  }
	}
    &-add-network, &-connect, &-buy {
      margin-top: 3.3rem;
      background: $green;
      width: 100%;
      height: 5.8rem;
      border-radius: 3rem;
      font-size: 18px;
	}
	&-add-network {
	  width: auto;
	  height: auto;
	  padding: 1.27rem 4.4rem;
	  margin: 1.8rem 0;
	  background: transparent;
	  border: 1px solid $green;
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
      &-name, &-description, &-minted, &-sale-open, &-sale-description {
        text-align: center;
			}
			&-name {
				font-size: 1.8rem;
			}
			&-description {
				font-size: 1.4rem;
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
		  width: auto;
		  height: 3.2rem;
		  font-size: 1.4rem;
          &:last-child {
            margin: 0;
          }
        }
      }
      &-sale-countdown {
        justify-content: center;
	  }
	  &-count-prices {
		width: 29rem;
	  }
	  &-network-status, &-network-add-name, &-network-manual-detail-box-info {
		font-size: 1.6rem;
		a, b {
		  font-size: 1.6rem;
		}
	  }
	  &-network-add-description, &-add-manually,
	  &-manual-description, &-network-manual-link {
		font-size: 1.4rem;
	  }
	  &-add-network {
		font-size: 1.8rem;
	  }
	  &-buy-celo-box {
		display: block;
		.celo-button {
		  width: 100%;
		  margin-right: 0;
		  margin-bottom: 1.6rem;
		}
	  }
	}
	&.wrong-network {
		padding-top: 7rem;
		.home__info {
			&-name, &-description {
				text-align: left;
			}
			&-add-network {
				width: 100%;
			}
			&-network-alert {
				left: 0;
				top: auto;
				bottom: 0;
				right: 0;
				padding: 1.2rem 0.8rem;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
				background: $white;
				&-description {
					color: $gray4;
					font-size: 1.4rem;
				}
			}
		}
	}
  }
}
</style>
