<template>
  <div class="ref-company-logo-bar">
    <span v-for="company in companies" :key="company.id">
      <img
        class="logo"
        v-if="company.Logo"
        :src="company.Logo.url | formatImage"
        :alt="company.Logo.alternativeText"
      />
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
