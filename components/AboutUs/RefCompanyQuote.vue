<template>
  <div style="margin: 1em 0; padding: 1em;">
    <div v-if="logo && logo.url">
      <img :src="apiUrl + logo.url" :alt="logo.alternativeText" />
    </div>
    <div v-html="text"></div>
    <div class="weight-bold">{{ author }}</div>
  </div>
</template>

<script>
export default {
  props: {
    logo: {
      type: Object,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      apiUrl: process.env.apiUrl
    };
  }
};
</script>

<style lang="scss" scoped></style>
