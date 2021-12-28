<template>
  <div class="modal">
    <div class="modal__block modal__block-purchased">
      <h1 class="modal__block-purchased-title">Congratulations!</h1>
	  <carousel :perPage="1" :paginationEnabled="false" :mouseDrag="false" :navigateTo="currNftIndex">
		<slide :key="index" v-for="(nft, index) in nftList">
		  <img :src="nft.image" alt="item" class="modal__block-purchased-image">
		  <p class="modal__block-purchased-page" v-if="nftList.length > 1">{{ currNftIndex + 1 }}/{{ nftList.length }}</p>
		  <h3 class="modal__block-purchased-success">You successfully purchased</h3>
		  <h3 class="modal__block-purchased-name">Daopolis №{{ nft.id }}</h3>
		  <p class="modal__block-purchased-link">View on CELO <img src="/share.svg" alt="share"></p>
		</slide>
	  </carousel>
	  <button class="modal__block-purchased-buttons-collection" @click="closeModal">My collection</button>
      <!-- <div class="modal__block-purchased-buttons" v-if="nftList.length !== 1 && !openCard">
        <button class="modal__block-purchased-buttons-collection" @click="closeModal">My collection</button>
        <button class="modal__block-purchased-buttons-open" @click="openCard = true">Open</button>
      </div> -->
	  <button class="modal__block-purchased-buttons-slide slide-left" :class="{disabled: currNftIndex <= 0}" @click="navigateToPrev" v-if="nftList.length > 1">
		<img src="/nav-arrow-left.svg" alt="left" class="modal__block-purchased-buttons-slide-image">
	  </button>
	  <button class="modal__block-purchased-buttons-slide slide-right" :class="{disabled: currNftIndex >= nftList.length - 1}" @click="navigateToNext" v-if="nftList.length > 1">
		<img src="/nav-arrow-right.svg" alt="right" class="modal__block-purchased-buttons-slide-image">
	  </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
	  currNftIndex: 0,
    }
  },
  props: ['openCard'],
  computed: {
	nftList() {
	  const nftTokenList = this.$store.state.nftList.slice(-this.$store.state.mintCount)
	  if (nftTokenList.length > 0) {
		return nftTokenList
	  } else {
		return [{
		  image: '/item-1.png'
		}]
	  }
	}
  },
  methods: {
	navigateToPrev() {
	  let navigate = this.currNftIndex - 1
	  if (navigate >= 0) {
		this.currNftIndex = navigate
	  }
	},
	navigateToNext() {
	  let navigate = this.currNftIndex + 1
	  if (navigate < this.nftList.length) {
		this.currNftIndex = navigate
	  }
	},
    closeModal() {
      this.$router.push('/collection')
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss">
.modal__block-purchased {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;
  padding: 3.2rem 2.4rem 2.8rem;
  &-title {
    color: $green;
    font-family: Cabin-Medium;
  }
  .VueCarousel-slide {
	text-align: center;
  }
  &-image {
    width: 23rem;
    height: 23rem;
    object-fit: cover;
    margin: 3rem auto 0;
  }
  &-page {
	font-size: .9rem;
	color: $border;
  }
  &-success {
	line-height: 1;
	font-weight: 600;
	font-size: 1.34rem;
    padding-top: .6rem;
  }
  &-name {
	line-height: 1;
	font-weight: 600;
	font-size: 1.34rem;
    padding-top: .75rem;
  }
  &-link {
    display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 1.1rem;
	font-weight: 600;
	font-size: 1.1rem;
    color: $border2;
    img {
      width: 1.8rem;
      padding-left: 1.2rem;
    }
  }
  &-buttons {
    padding-top: 2.8rem;
    width: 38rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-collection {
      width: 100%;
	  height: 4.8rem;
	  margin-top: 3.2rem;
    }
    &-open {
      width: 18.6rem;
      height: 4.8rem;
      background: $green;
    }
	&-slide {
	  position: absolute;
	  top: 40%;
	  width: 2.24rem;
	  border: 0;
	  &.slide-left {
		left: 2.4rem;
	  }
	  &.slide-right {
		right: 2.4rem;
	  }
	  &.disabled {
		opacity: 0.6;
		pointer-events: none;
	  }
	  image {
		width: 100%;
	  }
	}
  }
  &-collection {
    width: 38rem;
    height: 4.8rem;
    margin-top: 3.2rem;
  }
}
</style>
