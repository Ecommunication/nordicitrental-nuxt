<template>
  <div v-if="products.length" class="mb-10">
    <h2 class="ml-6 mb-6" style="font-size: 24px">
      {{ produktside.SuggestionsText }}
    </h2>
    <div class="products">
      <div class="row">
        <div class="col" v-for="product in products" :key="product.info.id">
          <nuxt-link :to="localePath(`/produkt/${product.info.slug}`)">
            <div
              @mouseenter="hover = product.info.id"
              @mouseleave="hover = null"
              class="product"
              :class="hover === product.info.id ? 'active' : ''"
            >
              <div class="product-img-container">
                <img
                  class="product-img"
                  :src="product.gallery.main.url | formatImage"
                  :alt="product.gallery.main.alternativeText"
                />
              </div>
              <h3 class="product-title text-blue text-center mt-3">
                {{ product.info.name }}
              </h3>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: { type: Array, default: [] },
    produktside: { type: Object },
  },
  data() {
    return {
      hover: null,
    };
  },
};
</script>
