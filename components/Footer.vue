<template>
  <footer>
    <div class="footer container-xl">
      <div class="footer__links">
        <img src="/cybertime.png" alt="cybertime" class="footer__links-logo">
        <ul class="footer__links-ul">
          <li class="footer__links-list">
            <a href="#" class="footer__links-link">Medium</a>
          </li>
          <li class="footer__links-list">
            <a href="#" class="footer__links-link">Twitter</a>
          </li>
          <li class="footer__links-list">
            <a href="#" class="footer__links-link">Telegram</a>
          </li>
          <li class="footer__links-list">
            <a href="#" class="footer__links-link">Github</a>
          </li>
        </ul>
      </div>
      <div class="footer__links">
        <ul class="footer__links-ul">
          <li class="footer__links-list">
            <a href="#" class="footer__links-link">Team</a>
          </li>
          <li class="footer__links-list">
            <a href="#" class="footer__links-link">Litepaper</a>
          </li>
          <li class="footer__links-list">
            <a href="#" class="footer__links-link">Smart contract</a>
          </li>
          <li class="footer__links-list">
            <a href="#" class="footer__links-link">Security Audit</a>
          </li>
        </ul>
      </div>
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
  justify-content: space-between;
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
