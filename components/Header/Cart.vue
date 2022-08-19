<i18n>
{
  "en": {
    "products":"Products"
  },
  "da":{
    "products":"Produkter"
  }
}
</i18n>

<template>
  <div class="ml-auto">
    <ClientOnly>
      <div v-if="!noOfItems" class="cart-placeholder"></div>
      <div v-if="!!noOfItems" class="cart2">
        <nuxt-link :to="localePath('/kurv')">
          <span class="pr-2">
            <i class="fas fa-shopping-cart"></i>
            ({{ noOfItems }})
          </span>
        </nuxt-link>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['noOfItems']),
  },
};
</script>

<style lang="scss" scoped>
.cart2 {
  //position: relative;
  //display: inline-block;
  //background: #092d4f;
  //font-size: 0.8em;
  //border-radius: 50%;
  //padding: 0.5em;
  * {
    color: #092d4f;
  }
}

.cart-placeholder {
  height: 38px;
  width: 100%;
}

a {
  color: white;
}
</style>
