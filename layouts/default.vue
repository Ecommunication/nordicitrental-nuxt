<template>
  <div>
    <Header :header="header" />
    <main>
      <nuxt />
    </main>
    <Footer :footer="footer" />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["meta"]),
    header() {
      return {
        logo: {
          src: this.$formatImage(this.meta.Logo.url),
          altText: this.meta.Logo.alternativeText
        },
        telephone: this.meta.Telephone
      };
    },
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

@media only screen and (max-width: 600px) {
  h1 {
    font-size: 0.8em !important;
  }
}
</style>
