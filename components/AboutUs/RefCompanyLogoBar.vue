<template>
  <div class="ref-company-logo-bar" :style="barStyle">
    <span v-for="(image, index) in images" :key="index">
      <img class="logo" :src="image" :style="elStyle" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    elStyle: {
      type: String,
      required: false
    },
    images: {
      type: Array,
      required: true
    },
    barStyle: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.ref-company-logo-bar {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .logo {
    margin: 2em 3em;
  }
}
</style>
