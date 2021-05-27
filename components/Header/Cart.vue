<template>
  <nuxt-link to="/kurv">
    <span>
      <i class="fas fa-shopping-cart"></i>
      Produkter ({{ noOfItems }})
    </span>
  </nuxt-link>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["noOfItems"])
  }
};
</script>

<style lang="scss" scoped>
a {
  color: white;
}
</style>
