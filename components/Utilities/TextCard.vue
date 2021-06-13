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
    largeCSS: { type: String, default: false }
  }
};
</script>

<style lang="scss">
.text-card {
  h2,
  h2 * {
    font-weight: 700 !important;
  }
  padding: 45px;
  width: 100%;
  .max-width-container {
    max-width: 1350px;
    margin: 0 auto;
  }
  .text-card-body {
    margin-bottom: 30px;

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
</style>
