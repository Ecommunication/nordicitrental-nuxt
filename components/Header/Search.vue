<template>
  <div>
    <div class="mb-4 flex w-full flex-row justify-center">
      <span class="relative w-1/3">
        <input
          class="rounded-md"
          v-model="inputSearch"
          placeholder="iPhone X"
        />
        <i
          class="fas fa-search fa-lg absolute right-0 top-1/3 mx-2 opacity-50"
        />
      </span>
    </div>
    <div
      v-if="inputSearch.length > 0"
      class="absolute z-10 min-h-screen w-full bg-gray-500 bg-opacity-50 p-4"
      @click="closeSearch"
    >
      <div
        class="container relative z-20 max-h-screen overflow-y-scroll rounded-md bg-white p-4 shadow-md"
      >
        <div class="flex flex-row justify-between">
          <p class="text-2xl font-medium text-mainBlue">
            Der blev fundet {{ searchResult.length }} resultater
          </p>
          <span
            class="origin-center transform cursor-pointer text-mainBlue transition-transform hover:scale-110"
            @click="closeSearch"
            ><i class="fas fa-times fa-lg"
          /></span>
        </div>
        <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <div
              v-for="product in searchResult"
              :key="product.id"
              @mouseover="hoverProduct(product)"
            >
              <nuxt-link :to="`/produkt/${product.ProductSlug}`">
                <div
                  class="group flex cursor-pointer border-t border-b hover:bg-gray-50"
                >
                  <nuxt-img
                    class="aspect-square max-h-14 transform object-contain transition-transform duration-300 group-hover:translate-x-3"
                    :src="product.MainImage.url | formatImage"
                    :alt="product.Name"
                  />
                  <div
                    class="ml-4 flex w-full justify-between space-x-5 text-base"
                  >
                    <div
                      class="my-auto transform transition-transform duration-300 group-hover:translate-x-3"
                    >
                      <p class="">{{ product.Name }}</p>
                    </div>
                    <div class="my-auto whitespace-nowrap">
                      <p>{{ product.DailyPrice | formatPrice }}</p>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
          <div class="invisible md:visible">
            <template v-if="productPreview">
              <p class="text-base font-medium text-mainBlue">
                {{ productPreview.Name }}
              </p>
              <div class="grid grid-cols-2 border-t">
                <div>
                  <ul
                    v-for="attribute in productPreview.ProductAttributes"
                    :key="attribute.id"
                    class="list-inside list-disc text-sm"
                  >
                    <li class="list-item">
                      {{ attribute.AttributeKey }}:
                      {{ attribute.AttributeValue }}
                    </li>
                  </ul>
                  <p class="font-semibold text-mainBlue">
                    {{ productPreview.DailyPrice | formatPrice }}
                  </p>
                </div>
                <div class="my-auto">
                  <nuxt-img :src="productPreview.MainImage.url | formatImage" />
                </div>
              </div>
            </template>
            <p v-else class="text-base font-medium text-mainBlue">
              Peg over et produkt for at se detaljer
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_ALL_PRODUCTS } from '@/lib/api';

export default {
  props: { categories: [] },
  data() {
    return {
      inputSearch: '',
      searchResult: [],
      productPreview: null,
    };
  },
  computed: {},
  watch: {
    inputSearch(val) {
      this.$emit('onChange', this.searchProducts(val));
    },
  },
  methods: {
    async searchProducts(val) {
      const res = await this.$apollo.query({
        query: GET_ALL_PRODUCTS,
        variables: { locale: this.$i18n.locale, search: val },
      });
      this.searchResult = res.data.products;
    },
    hoverProduct(product) {
      this.productPreview = product;
    },
    closeSearch(event) {
      event.stopPropagation();
      this.inputSearch = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.aspect-square {
  aspect-ratio: 4/3;
}
.product-description {
  ul {
    list-style-type: disc !important;
    list-style-position: inside !important;
    color: aqua !important;
    li {
      display: list-item !important;
    }
  }
}
</style>
