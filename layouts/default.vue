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
.service-installation-delivery {
  h2 {
    font-size: 30px !important;
    margin: 20px !important
  }
  p {
    font-size: 16px !important;
  }
}
.text-card-body {
  h1,
  h2,
  h3,
  h4 {
    font-size: 40px;
    line-height: 42px;
  }
}

.category-description {
  h1,
  h2,
  h3,
  h4 {
    margin-top: 30px;
    color: #092d4f;
  }

  p {
    font-size: 0.8em;
    line-height: 25px;
  }
  h1 {
    font-size: 1.4em;
  }
  h2 {
    font-size: 1.2em;
  }
  h3 {
    font-size: 1em;
  }
}

@media only screen and (max-width: 600px) {
  h1 {
    font-size: 0.8em !important;
  }
}
</style>
