<template>
  <div class="modal">
    <div class="modal__block modal__block-purchased">
      <h1 class="modal__block-purchased-title">Congratulations!</h1>
      <img src="/item-1.png" alt="item" class="modal__block-purchased-image" v-if="openCard">
      <img src="/item-null.png" alt="item" class="modal__block-purchased-image" v-else>
      <h3 class="modal__block-purchased-success">You successfully purchased</h3>
      <h3 class="modal__block-purchased-name" v-if="countCards === 1">Daopolis #11111</h3>
      <h3 class="modal__block-purchased-name" v-else>DAOPOLIS X{{ countCards }}</h3>
      <p class="modal__block-purchased-link">View on CELO <img src="/share.svg" alt="share"></p>
      <button class="modal__block-purchased-collection" v-if="countCards !== 1 || openCard" @click="closeModal">My collection</button>
      <div class="modal__block-purchased-buttons" v-if="countCards === 1 && !openCard">
        <button class="modal__block-purchased-buttons-collection" @click="closeModal">My collection</button>
        <!-- <button class="modal__block-purchased-buttons-open" @click="openCard = true">Open</button> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: ['openCard', 'countCards'],
  mounted() {
    this.$store.dispatch('getCollection')
  },
  methods: {
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
  padding: 3.2rem 2.4rem 2.8rem;
  &-title {
    color: $green;
    font-family: Cabin-Medium;
  }
  &-image {
    width: 28.2rem;
    height: 28.2rem;
    object-fit: cover;
    margin-top: 3rem;
  }
  &-success {
    padding-top: .9rem;
  }
  &-name {
    padding-top: 1rem;
  }
  &-link {
    display: flex;
    align-items: center;
    padding-top: 2.5rem;
    color: $border2;
    img {
      width: 1.8rem;
      padding-left: 1.2rem;
    }
  }
  &-buttons {
    padding-top: 3.2rem;
    width: 38rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-collection {
      width: 100%;
      height: 4.8rem;
    }
    &-open {
      width: 18.6rem;
      height: 4.8rem;
      background: $green;
    }
  }
  &-collection {
    width: 38rem;
    height: 4.8rem;
    margin-top: 3.2rem;
  }
}
</style>
