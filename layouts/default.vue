<template>
  <p v-if="$fetchState.pending">Indlæser side</p>
  <p v-else-if="$fetchState.error">Vi kunne desværre ikke indlæse siden i øjeblikket. Prøv igen senere.</p>
  <div v-else class="wrapper">
    <header class="main-header grid-small margin-center flex">
      <div class="main-header__logo flex">
        <nuxt-link to="/" class="flex">
          <img class="mt-auto" :src="siteLogo" alt="">
        </nuxt-link>
      </div>
      <div class="main-header__navigation ml-auto flex flex-column">
        <div class="main-header__navigation-cart flex-end">
        <HeaderCart />
        </div>
        <div class="main-header__navigation-cta flex-end">
          <HeaderCta :cta="sitePhone" />
        </div>
        <div class="main-header__navigation-menu flex mt-auto">
          <HeaderNavigation />
        </div>
      </div>
    </header>
    <main>
      <nuxt />
    </main>
    <FooterMain :footer="footerData" />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        siteLogo: null,
        sitePhone: null,
        footerData: null,
      }
    },
    async fetch() {
      const meta = await fetch(
              process.env.apiUrl + '/general-meta'
      ).then(res => res.json());

      this.siteLogo = 'http://localhost:1337' + meta.Logo.url;
      this.sitePhone = meta.Telephone;
      this.footerData = {
        widget1: meta.FooterWidget1,
        widget2: meta.FooterWidget2,
        widget3: meta.FooterWidget3,
        images: meta.FooterImagesBottom,
      };
    }
  }
</script>
