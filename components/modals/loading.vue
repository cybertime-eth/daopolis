<template>
  <div class="modal">
    <div class="modal__block modal__block-loading">
      <p class="modal__block-loading-title">Waiting for Confirmation</p>
      <img src="/loading.png" alt="loading" class="modal__block-loading-image-rotate">
      <h3 class="modal__block-loading-content">Connecting</h3>
      <p class="modal__block-loading-subtitle">Please confirm this transaction</p>
      <button class="modal__block-loading-close" @click="closeModal">Close</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss">
.modal {
  &__block-loading {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1.6rem 1.6rem 2.4rem;
    &-image {
      &-rotate {
        margin-top: 2.9rem;
        animation: loading 1.5s infinite;
      }
    }
    &-content {
      padding-top: 3.6rem;
    }
    &-subtitle {
      padding-top: .6rem;
    }
    &-close {
      margin-top: 3.6rem;
      border-radius: .4rem;
      background: $buttonDark2;
      width: 31.6rem;
      height: 2.8rem;
      border: none;
      font-size: 1.3rem;
      color: $border;
    }
  }
}
@keyframes loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
