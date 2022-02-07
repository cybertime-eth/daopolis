<template>
  <div class="modal">
    <div class="modal__block modal__block-image">
      <div class="modal__block-image-box">
        <img :src="image" alt="image" class="modal__block-image-image">
        <div class="modal__block-image-buttons">
          <!-- <div class="modal__block-image-dropdown">
            <button class="modal__block-image-buttons-button" ref="shareButton" @click="shareImage">
              <img src="/share-image.svg" alt="close">
            </button>
            <div class="modal__block-image-dropdown-menu" v-if="showSharingMenu">
              <a class="modal__block-image-dropdown-menu-item" :href="twitterURL" target="_blank">
                <img src="/socials/twitter-share.svg" alt="twitter">
                Twitter
              </a>
              <a class="modal__block-image-dropdown-menu-item">
                <img src="/socials/discord-share.svg" alt="discord">
                Discord
              </a>
              <a class="modal__block-image-dropdown-menu-item" :href="telegramURL" target="_blank">
                <img src="/socials/telegram-share.svg" alt="telegram">
                Telegram
              </a>
            </div>
          </div> -->
          <button class="modal__block-image-buttons-button" @click="downloadImage">
            <img src="/download.svg" alt="close">
          </button>
        </div>
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
  data() {
    return {
      showSharingMenu: false
    }
  },
  computed: {
    sharingURL() {
      return encodeURIComponent(this.image)
    },
    sharingText() {
      const text = "Just minted NFT on daopolis.city and now I'm #DaopolisCitizen by @cybertime_eth #nftcollection #nftcollectables #nftcollector #nftcommunity #celo $celo #nftdrop"
      return encodeURIComponent(text)
    },
    twitterURL() {
      return `http://twitter.com/share?url='${this.sharingURL}'&text='${this.sharingText}'`
    },
    telegramURL() {
      return `https://t.me/share?url='${this.sharingURL}'&text='${this.sharingText}'`
    }
  },
  beforeMount() {
    window.addEventListener('click', this.handleClickWindow)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleClickWindow)
  },
  methods: {
    handleClickWindow(e) {
      if (this.$refs.shareButton && !this.$refs.shareButton.contains(e.target)) {
        this.showSharingMenu = false
      }
    },
    async shareImage() {
      if (!this.isMobile()) {
        this.showSharingMenu = !this.showSharingMenu
      } else {
        if (!navigator) return
        const imageData = await fetch(this.image)
        const blob = await imageData.blob()
        const index = this.image.lastIndexOf("/") + 1
        const filename = this.image.substr(index)
        const files = [new File([blob], filename, { type: blob.type })]
        const shareData = {
          text: "Just minted NFT on daopolis.city and now I'm #DaopolisCitizen by @cybertime_eth #nftcollection #nftcollectables #nftcollector #nftcommunity #celo $celo #nftdrop",
          title: this.image,
          files,
        }
        if (navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData)
          } catch (err) {
            if (err.name !== 'AbortError') {
              console.error(err.name, err.message)
            }
          }
        } else {
          console.log('Sharing not supported', shareData)
        }
      }
    },
    async downloadImage() {
      const imageData = await fetch(this.image)
      const imageBlob = await imageData.blob()
      const imageURL = URL.createObjectURL(imageBlob)
      const index = this.image.lastIndexOf("/") + 1
      const filename = this.image.substr(index)
      const link = document.createElement('a')
      link.href = imageURL
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
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
      position: relative;
    }
    &-image {
      width: 588px;
    }
    &-buttons {
      display: flex;
      position: absolute;
      top: 8px;
      right: 8px;
      &-button {
        width: 32px;
        height: 32px;
        padding: 2px;
        background: rgba(218, 221, 225, 0.73);
        border-radius: 4px;
        border-color: transparent;
      }
    }
    &-dropdown {
      position: relative;
      margin-right: 16px;
      &-menu {
        width: 230px;
        background: #252326;
        box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        &-item {
          display: flex;
          align-items: center;
          padding: 20px 10px;
          font-size: 16px;
          cursor: pointer;
          img {
            margin-right: 15px;
          }
        }
      }
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
        padding: 0 8px;
      }
      &-image {
        width: 100%;
      }
      &-buttons {
        top: auto;
        bottom: 8px;
      }
    }
  }
}
</style>
