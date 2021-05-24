<template>
  <div class="description-tab">
    <div v-html="description"></div>
  </div>
</template>

<script>
export default {
  props: {
    description: String
  }
};
</script>

<style lang="scss">
.description-tab {
  padding: 0 25px;
  p {
    font-size: 0.75em;
    line-height: 25px;
    font-weight: 100;
  }
  h2, h3 {
    margin-bottom: 20px;
    color: #092D4F;
  }
}
</style>
