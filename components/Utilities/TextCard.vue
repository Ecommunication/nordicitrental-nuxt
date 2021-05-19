<template>
  <div
    class="text-card"
    :class="`${backgroundClass} ${dark ? 'dark' : ''}`"
    :style="style"
  >
    <div class="text-card-body" v-html="contentHtml"></div>
    <slot name="actions"></slot>
  </div>
</template>

<script>
export default {
  props: {
    contentHtml: { type: String, required: true },
    backgroundClass: { type: String, default: "bg-white" },
    padding: { type: String, default: "16px" },
    dark: { type: Boolean, default: false }
  },
  computed: {
    style() {
      return `padding: ${this.padding};`;
    }
  }
};
</script>

<style lang="scss">
.text-card {
  .text-card-body {
    margin-bottom: 30px;
  }
  h2 {
    color: #092d4f;
  }
}
.dark {
  h2 {
    color: #ffffff;
  }
}
</style>
