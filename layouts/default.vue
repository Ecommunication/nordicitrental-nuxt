<template>
  <div class="wrapper">
    <header v-if="false" class="main-header grid-small margin-center flex">
      <div class="main-header__logo flex">
        <nuxt-link to="/" class="flex">
          <img
            class="mt-auto"
            :src="meta.Logo.url | formatImage"
            :alt="meta.Logo.alternativeText"
          />
        </nuxt-link>
      </div>
      <div class="main-header__navigation ml-auto flex flex-column">
        <div class="main-header__navigation-cart flex-end">
          <HeaderCart />
        </div>
        <div class="main-header__navigation-cta flex-end">
          <HeaderCta :cta="meta.Telephone" />
        </div>
        <div class="main-header__navigation-menu flex mt-auto">
          <HeaderNavigation />
        </div>
      </div>
    </header>
    <main>
      <nuxt />
    </main>
    <!-- <FooterMain :footer="footer" /> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["meta"]),
    footer() {
      return {
        widget1: this.meta.FooterWidget1,
        widget2: this.meta.FooterWidget2,
        widget3: this.meta.FooterWidget3,
        images: this.meta.FooterImagesBottom
      };
    }
  }
};
</script>

<style lang="scss">
.description {
  h1,
  h2,
  h3,
  h4 {
    color: #092d4f;
  }
}
.description-tab {
  padding: 0 25px;
  p {
    font-size: 0.75em;
    line-height: 25px;
    font-weight: 100;
  }
  h2,
  h3 {
    margin-bottom: 20px;
    color: #092d4f;
  }
}
</style>
