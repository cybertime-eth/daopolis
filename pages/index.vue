<template>
  <section id="home">
    <div class="home container-xl">
      <video autoplay loop  src="/daopolis-movie.MP4" class="home__image"></video>
      <div class="home__main" v-if="currentStep === 1">
        <h1 class="home__main-name">Meet Daopolis Citizens</h1>
        <h3 class="home__main-description">Automatically generated 9192 NFT's. Born in the CyberTime era, Daopolis
          citizens will be the foundation of a new gaming metaverse on Celo. Find your digital avatar, gain access
          to a private club and participate in unique NFT games!</h3>
        <h3 class="home__main-minted">Access to the whitelist allows minting NFTs from just 2 CELO. Get on the list today!</h3>
        <button class="home__main-buy" @click="currentStep = 2">Get access to whitelist</button>
      </div>
      <div class="home__info" v-else>
        <h1 class="home__info-name">Meet Daopolis Citizens</h1>
        <h3 class="home__info-description">8,640 automatically generated NFT's for Daopolis play-to-earn game</h3>
        <h3 class="home__info-minted">1650/8846 minted</h3>
        <div class="home__info-count">
          <div class="home__info-count-line" :style="'width:' + widthLine + '%'"></div>
          <div class="home__info-count-prices">
            <div class="home__info-count-price">
              <img src="/dot.png" alt="dot" class="home__info-count-price-dot">
              <h4 class="home__info-count-price-celo">7 celo</h4>
            </div>
            <div class="home__info-count-price">
              <img src="/dot.png" alt="dot" class="home__info-count-price-dot">
              <h4 class="home__info-count-price-celo">9 celo</h4>
            </div>
            <div class="home__info-count-price">
              <img src="/dot.png" alt="dot" class="home__info-count-price-dot">
              <h4 class="home__info-count-price-celo">11 celo</h4>
            </div>
            <div class="home__info-count-price">
              <img src="/dot.png" alt="dot" class="home__info-count-price-dot">
              <h4 class="home__info-count-price-celo">13 celo</h4>
            </div>
            <div class="home__info-count-price">
              <img src="/dot.png" alt="dot" class="home__info-count-price-dot">
              <h4 class="home__info-count-price-celo">15 celo</h4>
            </div>
          </div>
        </div>
        <div class="home__info-price"><img src="/celo.png" alt="celo"><h3>2 CELO</h3></div>
        <div class="home__info-select">
          <p class="home__info-select-title">Select the amount of NFT you want to buy</p>
          <div class="home__info-select-buttons">
            <button class="home__info-select-buttons-button">1</button>
            <button class="home__info-select-buttons-button">5</button>
            <button class="home__info-select-buttons-button">10</button>
            <button class="home__info-select-buttons-button">20</button>
          </div>
        </div>
        <button class="home__info-buy" @click="showAlertPurchased = true">Buy now</button>
      </div>
    </div>
    <Footer />
    <Loading v-if="showAlertLoad" @closeModal="closeModal" />
    <Error v-if="showAlertError" @closeModal="closeModal" />
    <Purchased v-if="showAlertPurchased" @closeModal="closeModal" :openCard="false" :countCards="countCards"/>
  </section>
</template>
<script>
import Footer from '@/components/Footer'
import Loading from '@/components/modals/loading'
import Error from '@/components/modals/error'
import Purchased from '@/components/modals/purchased'
export default {
  data() {
    return {
      showAlertLoad: false,
      showAlertError: false,
      showAlertPurchased: false,
      countCards: 1,
      currentStep: 1,
      countMinted: 1650,
      maxCountMinted: 8846,
      widthLine: 33,
    }
  },
  methods: {
    closeModal(paylaod) {
      this.showAlertLoad = paylaod
      this.showAlertError = paylaod
      this.showAlertPurchased = paylaod
    },
    changeCountCards(sign) {
      if(sign && this.countCards < 10) {
        this.countCards += 1
      } else if(!sign && this.countCards >= 2){
        this.countCards -= 1
      }
    },
    buyNFT() {
      this.$store.dispatch('buyNft')
    },
  },
  components: {
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
    &-minted {
      color: $green;
      text-transform: uppercase;
      font-family: OpenSans-Bold;
      padding-top: 6rem;
      text-align: center;
      font-size: 1.8rem;
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
        }
      }
    }
    &-count {
      width: 100%;
      height: .4rem;
      background: $white;
      margin-top: 2.5rem;
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
        width: 44rem;
        justify-content: space-between;
        margin: 0 auto;
        position: absolute;
        top: -.2rem;
        left: 7.3rem;
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
      padding-top: 6rem;
      img {
        width: 2rem;
        margin-right: 1rem;
      }
      h3 {
        font-size: 1.8rem;
      }
    }
    &-buy {
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
}
</style>
