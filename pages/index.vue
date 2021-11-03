<template>
  <section id="home">
    <div class="home container-xl">
      <img src="/item-1-big.png" alt="item" class="home__image">
      <div class="home__info">
        <h1 class="home__info-name">Meet Daopolis Citizens</h1>
        <h3 class="home__info-minted">112226 daopolis minted!</h3>
        <h3 class="home__info-description">8,640 automatically generated NFT's for Daopolis play-to-earn game</h3>
        <div class="home__info-price"><img src="/celo.png" alt="celo"><h3>0.38477 CELO</h3></div>
        <div class="home__info-count">
          <button class="home__info-count-button" @click="changeCountCards(false)">-</button>
          <h2 class="home__info-count-number">{{ countCards }}</h2>
          <button class="home__info-count-button" @click="changeCountCards(true)">+</button>
          <button class="home__info-count-max" @click="countCards = 10">Max 10</button>
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
      countCards: 1
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
      padding-top: 1rem;
    }
    &-description {
      font-size: 1.8rem;
      padding-top: 1rem;
    }
    &-price {
      display: flex;
      align-items: center;
      padding-top: 2.5rem;
      img {
        width: 2rem;
        margin-right: 1rem;
      }
      h3 {
        font-size: 1.8rem;
      }
    }
    &-count {
      display: grid;
      grid-template-columns: 3.6rem 2rem 3.6rem 9.8rem;
      grid-column-gap: 3.6rem;
      align-items: center;
      padding-top: 4rem;
      &-button {
        width: 3.6rem;
        height: 3.6rem;
        border-radius: .8rem;
        color: $green;
        font-size: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      &-max {
        width: 9.8rem;
        height: 3.2rem;
        border-radius: 2rem;
      }
      &-number {
        font-size: 2.6rem;
        border-bottom: .1rem solid $green;
        justify-self: center;
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
}
</style>
