<template>
  <section class="collection">
    <h1 class="collection__title">My Collection</h1>
    <div class="collection__empty" v-if="nftList.length === 0">
      <h3 class="collection__empty-title">You don't have NFT Daopolis yet</h3>
      <button class="collection__empty-button" @click="$router.push('/')">Buy</button>
    </div>
    <div class="collection__items" v-else>
      <div class="collection__item" :key="index" v-for="(nft, index) in nftList">
        <img :src="nft.image" alt="item" class="collection__item-image" @click="openFullImage(nft.image)">
        <div class="collection__item-info">
          <h2 class="collection__item-info-name">
            Daopolis #{{ nft.id }}
          </h2>
          <!-- <div class="collection__item-info-buttons">
            <button class="collection__item-info-buttons-transfer" @click="showTransfer = true">Transfer</button>
            <button class="collection__item-info-buttons-open" @click="showPurchased = true">Open</button>
          </div> -->
        </div>
      </div>
    </div>
    <Transfer @closeModal="closeModal" v-if="showTransfer"/>
    <Purchased @closeModal="closeModal" v-if="showPurchased" :openCard="true"/>
    <ImageModal :image="detailImageSrc" @closeModal="closeModal" v-if="showFullImage"/>
  </section>
</template>
<script>
import Transfer from '@/components/modals/transfer'
import Purchased from '@/components/modals/purchased'
import ImageModal from '@/components/modals/imageModal'
export default {
  data() {
    return {
      showTransfer: false,
      showPurchased: false,
      showFullImage: false,
      detailImageSrc: null
    }
  },
  computed: {
    nftList() {
      return this.$store.state.nftList
    }
  },
  mounted() {
    this.$store.dispatch('getCollection')
  },
  methods: {
    openFullImage(imageSrc) {
      this.showFullImage = true
      this.detailImageSrc = imageSrc
    },
    closeModal(payload) {
      this.showTransfer = payload
      this.showPurchased = payload
      this.showFullImage = false
      this.detailImageSrc = null
    }
  },
  components: {
    Transfer,
    Purchased,
    ImageModal
  }
}
</script>
<style lang="scss">
.collection {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 4.2rem;
  padding-bottom: 20rem;
  &__title {
    font-family: Cabin-Bold;
  }
  &__empty {
    padding-top: 6rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    &-button {
      margin-top: 2rem;
      width: 18.4rem;
      height: 4.8rem;
      background: $green;
      cursor: pointer;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: 28.2rem 28.2rem 28.2rem 28.2rem;
    grid-column-gap: 2rem;
    padding-top: 4.8rem;
  }
  &__item {
    width: 28.2rem;
    height: 36.2rem;
    background: $modalColor;
    margin-bottom: 2rem;
    border-radius: .4rem;
    &-image {
      width: 28.2rem;
      height: 28.2rem;
      object-fit: cover;
      cursor: pointer;
    }
    &-info {
      padding: 1.3rem 1.6rem 3.4rem;
      &-name {
        font-size: 2.2rem;
      }
      &-buttons {
        padding-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-transfer {
          width: 7.4rem;
          height: 3.2rem;
          border: .1rem solid $buttonDark;
          border-radius: 0;
          font-size: 1.4rem;
          &-open {
            margin-top: .6rem;
          }
        }
        &-open {
          width: 12.3rem;
          height: 4.3rem;
        }
      }
    }
  }

  @media(max-width: 460px) {
    &__items {
      grid-template-columns: 14.4rem 14.4rem
    }
    &__item {
      width: 14.4rem;
      height: 24.6rem;
      &-image {
        width: 14.4rem;
        height: 14.4rem;
      }
    }
  }
}
</style>
