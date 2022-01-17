<template>
  <div class="modal">
    <div class="modal__block modal__block-image">
      <div class="modal__block modal__block-image-box">
        <img :src="image" alt="image" class="modal__block-image-image">
      </div>
      <button class="modal__block-image-close" @click="closeModal">
        <img src="/close-bold.svg" alt="close">
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['image'],
  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss">
.modal {
  background: rgba(0, 0, 0, 0.8);
  &__block-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: 0;
    position: relative;
    &-box {
      background: rgba(0, 0, 0, 0.8);
      padding: 0;
      margin: 0;
    }
    &-image {
      width: 588px;
    }
    &-close {
      position: absolute;
      top: 21px;
      right: 21px;
      padding: 0;
      border: 0;
    }
  }

  @media(max-width: 767px) {
    &__block-image-image {
      width: 80vw;
    }
  }

  @media(max-width: 460px) {
    &__block-image {
      margin: 0 !important;
      padding: 0 !important;
      &-box {
        margin: 0 !important;
      }
      &-image {
        width: 100%;
      }
    }
  }
}
</style>
