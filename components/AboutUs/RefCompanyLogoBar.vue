<template>
  <div class="ref-company-logo-bar">
    <span v-for="(company) in companies" :key="company.id">
      <img class="logo" v-if="company.Logo" :src="apiUrl + company.Logo.url" :alt="company.Logo.alternativeText" >
    </span>
  </div>
</template>

<script>
export default {
  props: {
    companies: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      apiUrl: process.env.apiUrl
    }
  },
};
</script>

<style lang="scss" scoped>
  .ref-company-logo-bar {
    text-align: center;
    .logo {
      margin: 2em;
    }
  }
</style>
