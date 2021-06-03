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
