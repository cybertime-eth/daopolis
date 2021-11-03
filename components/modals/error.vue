<template>
  <div class="modal">
    <div class="modal__block modal__block-error modal__error">
      <p class="modal__block-error-title">Transaction Error</p>
      <img src="/error.png" alt="error" class="modal__block-error-image">
      <h3 class="modal__block-error-content">Transaction rejected</h3>
      <p class="modal__block-error-subtitle">Metamask Tx Signature: User denied transaction signature</p>
      <button class="modal__block-error-close" @click="closeModal">Close</button>
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
  &__error {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1.6rem 1.6rem 2.4rem;
  }
  &__block-error {
    &-image {
      margin-top: 2.9rem;
    }
    &-content {
      padding-top: 3.6rem;
    }
    &-subtitle {
      padding-top: .6rem;
      width: 31.6rem;
      text-align: center;
    }
    &-close {
      margin-top: 1.6rem;
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
</style>
