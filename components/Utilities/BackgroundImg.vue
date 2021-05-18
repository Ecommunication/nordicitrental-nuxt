<template>
  <div
    class="background-image"
    :style="`min-height: ${minHeight}px; background-image: url(${src})`"
  >
    <slot name="body"></slot>
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
    minHeight: { type: Number, default: 600 }
  }
};
</script>

<style lang="scss" scoped>
.background-image {
  background-position: center center;
  background-size: cover;
}
</style>
