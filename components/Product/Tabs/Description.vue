<template>
  <div class="product-description-tab">
    <div v-html="description"></div>
  </div>
</template>

<script>
export default {
  props: {
    description: '',
  },
};
</script>
