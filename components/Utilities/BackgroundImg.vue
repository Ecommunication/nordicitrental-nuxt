<template>
  <div
    class="background-image"
    :style="`height: 100%; width: 100%; background-image: url(${src})`"
  >
    <slot name="body"></slot>
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
    minHeight: { type: Number, required: false }
  },
  computed: {
    minHeightProcessed() {
      return this.minHeight ? `${this.minHeight}px` : "100%";
    }
  }
};
</script>

<style lang="scss" scoped>
.background-image {
  background-position: center center;
  background-size: cover;
}
</style>
