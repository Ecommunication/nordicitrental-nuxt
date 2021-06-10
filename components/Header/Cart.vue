<template>
  <div class="cart">
    <nuxt-link to="/kurv">
      <span>
        <i class="fas fa-shopping-cart mr-2"></i>
        Produkter ({{ noOfItems }})
      </span>
    </nuxt-link>
  </div>
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
.cart {
  display: inline-block;
  background: #092d4f;
  padding: 9px 36px 9px 18px;
  font-size: 0.8em;
  border-bottom-right-radius: 30px;
}
a {
  color: white;
}
</style>
