<template>
  <div
    class="text-card"
    :class="`${backgroundClass} ${dark ? 'dark' : 'primary'}`"
    :style="largeCSS"
  >
    <div class="text-card-container" :style="containerCSS">
      <div class="text-card-body" v-html="html"></div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentHtml: { type: String, default: "" },
    backgroundClass: { type: String, default: "bg-white" },
    dark: { type: Boolean, default: false },
    largeCSS: { type: String, required: false },
    containerCSS: { type: String, required: false },
  },
  computed: {
    html() {
      return this.$formatHTML(this.contentHtml);
    },
  },
};
</script>
