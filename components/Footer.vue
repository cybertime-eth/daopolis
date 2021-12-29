<template>
  <footer>
    <div class="footer container-xl">
      <div class="footer__links">
        <img src="/cybertime.png" alt="cybertime" class="footer__links-logo">
        <ul class="footer__links-ul">
          <li class="footer__links-list">
            <a href="https://cybertime.medium.com/" class="footer__links-link">Medium</a>
          </li>
          <li class="footer__links-list">
            <a href="https://twitter.com/cybertime_eth" class="footer__links-link">Twitter</a>
          </li>
          <li class="footer__links-list">
            <a href="https://t.me/cybertime_eth" class="footer__links-link">Telegram</a>
          </li>
          <li class="footer__links-list">
            <a href="https://github.com/cybertime-eth" class="footer__links-link">Github</a>
          </li>
          <li class="footer__links-list">
            <a href="https://discord.gg/cKcWfCux4s" class="footer__links-link">Discord</a>
          </li>
        </ul>
      </div>
      <!-- <div class="footer__links">
        <ul class="footer__links-ul">
          <li class="footer__links-list">
            <a href="https://cyberbox.art" class="footer__links-link">CyberBox NFT Marketplace</a>
          </li>
          <li class="footer__links-list">
            <a href="https://docs.cybertime.finance/team" class="footer__links-link">Team</a>
          </li>
          <li class="footer__links-list">
            <a href="https://docs.cybertime.finance/litepaper" class="footer__links-link">Litepaper</a>
          </li>
        </ul>
      </div> -->
    </div>
  </footer>
</template>
<style lang="scss">
footer {
  width: 100%;
  height: 10.4rem;
  background: $black;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  &__links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 4.85rem;
      padding-right: .5rem;
    }
    &-ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-list {
      padding-left: 2.4rem;
    }
    &-link {
      font-size: 1.4rem;
      color: $textColor;
    }
  }
}

@media(max-width: 460px) {
  .footer {
    width: 100%;
    flex-wrap: wrap;
    &__links {
      &-list {
        padding-left: 1.6rem;
      }
      &-link {
        font-size: 1.3rem;
      }
    }
  }
}
</style>
