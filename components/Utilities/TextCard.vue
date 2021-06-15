<template>
  <div
    class="text-card"
    :class="`${backgroundClass} ${dark ? 'dark' : ''}`"
    :style="largeCSS"
  >
    <div>
      <div class="text-card-body" v-html="contentHtml"></div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentHtml: { type: String, required: true },
    backgroundClass: { type: String, default: "bg-white" },
    dark: { type: Boolean, default: false },
    largeCSS: { type: String, required: false }
  }
};
</script>

<style lang="scss">
.text-card {
  padding: 45px;
  width: 100%;
  h2,
  h2 * {
    font-weight: 700 !important;
  }
  .max-width-container {
    max-width: 1350px;
    margin: 0 auto;
  }
  .text-card-body {
    margin-bottom: 30px;

    img {
      width: 100%;
      height: 100%;
    }

    i {
      font-size: 0.6em;
    }
  }
}
.dark {
  h2 {
    color: #ffffff;
  }
}
@media screen and (min-width: 1600px) {
  .text-card {
    padding: 45px 230px;
  }
}

@media screen and (max-width: 767px) {
  .text-card {
    padding: 15px !important;
  }
}
</style>
