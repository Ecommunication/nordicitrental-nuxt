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

