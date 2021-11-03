<template>
  <div class="modal">
    <div class="modal__block modal__block-transfer">
      <h1 class="modal__block-transfer-title">Transfer NFT: Daopolis #1111</h1>
      <div class="modal__block-transfer-form">
        <h3 class="modal__block-transfer-form-title">Enter address</h3>
        <input type="text" class="modal__block-transfer-form-input" placeholder="0xf1b....c3d4" v-model="address">
      </div>
      <div class="modal__block-transfer-buttons">
        <button class="modal__block-transfer-buttons-cancel" @click="closeModal">Cancel</button>
        <button
          class="modal__block-transfer-buttons-transfer"
          :class="{'modal__block-transfer-buttons-transfer-active': address.length >= 10}"
          @click="closeModal"
          :disabled="address.length < 10"
        >
          Transfer
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      address: '',
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss">
.modal__block-transfer {
  display: flex;
  align-items: self-start;
  flex-direction: column;
  padding: 3.2rem 2.4rem 2.4rem;
  &-title {
    font-family: Cabin-Bold;
  }
  &-form {
    padding-top: 2.4rem;
    &-input {
      width: 60.4rem;
      height: 1.4rem;
      border: .1rem solid $green;
      background: none;
      margin-top: 1rem;
    }
  }
  &-buttons {
    padding-top: 11.6rem;
    display: flex;
    align-items: center;
    align-self: flex-end;
    &-cancel {
      width: 13.6rem;
      height: 4.8rem;
    }
    &-transfer {
      width: 13.6rem;
      height: 4.8rem;
      margin-left: 1.6rem;
      background: $placeholderText;
      border: none;
      &-active {
        background: $green;
      }
    }
  }
}
</style>
