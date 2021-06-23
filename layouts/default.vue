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
.footer-col {
  font-size: 14px;

  strong {
    font-size: 17px;
    font-weight: 300;
  }
  li {
    margin-bottom: 2px;
  }
}

.service-lad-os-overtage {
  p {
    margin-bottom: 20px !important;
  }
  h2 {
    margin-bottom: 33.2px !important;
  }
}

.service-installation-delivery {
  h2 {
    font-size: 30px !important;
    margin: 20px !important;
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
    color: #092d4f;
  }

  p {
    font-size: 0.8em;
    line-height: 25px;
  }
  h1 {
    font-size: 1.5em;
    margin: 24.9px 0;
  }
  h2 {
    font-size: 1.2em;
  }
  h3 {
    font-size: 1em;
  }
  h4 {
    font-size: 0.7em;
    margin: 18.62px 0;
  }
}

.slider-title {
  font-size: 50px;
  padding: 20px;
  font-family: sans-serif;
}

/*  Tablets */
@media only screen and (min-width: 768px) and (max-width: 1365px) {
  h1 {
    font-size: 32px;
  }
}

/*  mobile */
@media only screen and (max-width: 767px) {
  body {
    font-size: 14px;
  }
  h1,
  h2,
  h3,
  h4 {
    font-size: 26px !important;
  }
  i, span, div {
    font-size: 14px !important;
  }
  .slider-title {
    font-size: 26px;
  }
}
</style>
