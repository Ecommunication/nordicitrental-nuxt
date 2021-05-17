<template>
  <div class="text-card" v-html="contentHtml" :class="backgroundClass" :style="style"></div>
</template>

<script>
export default {
  props: {
    contentHtml: { type: String, required: true },
    backgroundClass: { type: String, default: 'bg-white' },
    padding: { type: String, default: "16px" }
  },
  computed: {
    style(){
      return `padding: ${this.padding};`
    }
  }
};
</script>

<style lang="scss">
.text-card {
  h2 {
    color: #092d4f;
  }
}
</style>
