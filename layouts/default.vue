<template>
  <div class="app">
    <Header />
    <Nuxt />
  </div>
</template>
<script>
import Header from './../components/Header'
export default {
  components: {
    Header,
  },
 async mounted() {
    await this.$store.dispatch('updateUser')
    await this.$store.dispatch('updateTotalMintCount')
    await this.$store.dispatch('walletConnect', false)
  }
}
</script>
<style lang="scss">

//DEFAULT STYLES

html,
body {
  margin: 0;
  padding: 0;
  font-family: OpenSans-Regular;
  font-style: normal;
  overflow-x: hidden;
  font-size: var(--fontSize);
  scroll-behavior: smooth;
  background: $backgroundBody;
}
h1,h2,h3,h4,h5,h6,p,span,a {
  margin: 0;
  padding: 0;
  color: $textColor;
}
h1 {
  font-size: 3.2rem;
  font-family: Orbitron-Black;
}
h2 {
  font-size: 2rem;
}
a,h3 {
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.03em;
}
p {
  font-size: 1.4rem;
  letter-spacing: 0.03em;
}
h4 {
  font-size: 1.3rem;
}
button {
  font-size: 1.6rem;
  border-radius: 2.5rem;
  color: $textColor;
  font-family: OpenSans-SemiBold;
  background: none;
  border: .1rem solid $green;
  padding: 0;
  cursor: pointer;
}
a {
  text-decoration: none;
  font-family: OpenSans-SemiBold;
}
ul {
  padding-left: 0;
}
li {
  list-style: none;
}
input,textarea {
  background: $white;
  border: .1rem solid $border2;
  border-radius: .4rem;
  font-size: 1.6rem;
  color: $textColor;
  padding: 1.2rem 1rem;
  outline: none;
  resize: none;
  font-family: OpenSans-Regular;
  &::placeholder {
    color: $placeholderText;
  }
}
ul {
  margin: 0;
}
.container-xl {
  width: 120rem;
  margin: 0 auto;

  @media(max-width: 460px) {
    width: 94%;
    margin: 0 auto;
  }
}
.container-l {
  width: 81.8rem;
  margin: 0 auto;
}

//SCROLL BAR

::-webkit-scrollbar {
  width: 9px;
  background: $backgroundBody;
}

::-webkit-scrollbar-thumb {
  background: #fff;
  cursor: pointer;
}

// MODALS


.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  &__block {
    position: relative;
    padding: 2.8rem 6.9rem;
    background: $modalColor;
    border-radius: .8rem;
  }
  &__title {
    color: $titleColor;
    text-align: center;
  }
  &__close {
    width: 1.4rem;
    position: absolute;
    right: 2.1rem;
    top: 2.1rem;
    z-index: 4;
    cursor: pointer;
  }
}

//FONTS

@font-face {
  font-family: 'Orbitron-Black';
  src: local("Orbitron-Black"),
  url(./assets/fonts/Orbitron-Black.ttf) format('truetype');
}

@font-face {
  font-family: "Orbitron-Bold";
  src: local("Orbitron-Bold"),
  url(./assets/fonts/Orbitron-Bold.ttf) format('truetype');
}
@font-face {
  font-family: "Orbitron-Medium";
  src: local("Orbitron-Medium"),
  url(./assets/fonts/Orbitron-Medium.ttf) format('truetype');
}
@font-face {
  font-family: 'OpenSans-Bold';
  src: local("OpenSans-Bold"),
  url(./assets/fonts/OpenSans-Bold.ttf) format('truetype');
}
@font-face {
  font-family: 'OpenSans-SemiBold';
  src: local("OpenSans-SemiBold"),
  url(./assets/fonts/OpenSans-SemiBold.ttf) format('truetype');
}
@font-face {
  font-family: 'OpenSans-Light';
  src: local("OpenSans-Light"),
  url(./assets/fonts/OpenSans-Light.ttf) format('truetype');
}
@font-face {
  font-family: 'OpenSans-Medium';
  src: local("OpenSans-Medium"),
  url(./assets/fonts/OpenSans-Medium.ttf) format('truetype');
}
@font-face {
  font-family: 'OpenSans-Regular';
  src: local("OpenSans-Regular"),
  url(./assets/fonts/OpenSans-Regular.ttf) format('truetype');
}
@font-face {
  font-family: 'Cabin-Regular';
  src: local("Cabin-Regular"),
  url(./assets/fonts/Cabin-Regular.ttf) format('truetype');
}
@font-face {
  font-family: 'Cabin-Bold';
  src: local("Cabin-Bold"),
  url(./assets/fonts/Cabin-Bold.ttf) format('truetype');
}
@font-face {
  font-family: 'Cabin-Medium';
  src: local("Cabin-Medium"),
  url(./assets/fonts/Cabin-Medium.ttf) format('truetype');
}
</style>
