<i18n>
{
  "en": {
    "found": "There was found ",
    "results": "results",
    "hoverOver": "Hover over a product to read more",
    "placeholderSearch": "SEARCH FOR A PRODUCT"
  },
  "da":{
    "found":"Der blev fundet ",
    "results": "resultater",
    "hoverOver": "Peg over et produkt for at læse mere",
    "placeholderSearch": "SØG EFTER PRODUKT"
  }
}
</i18n>

<template>
  <div class="">
    <div class="grid-small mb-4 flex w-full flex-row justify-center">
      <span class="relative mx-14 w-full">
        <input
          class="rounded-md"
          v-model="inputSearch"
          :placeholder="$t('placeholderSearch')"
        />
        <i
          class="fas fa-search fa-lg absolute right-0 top-1/3 mx-2 opacity-50"
        />
      </span>
    </div>
    <div
      v-if="inputSearch.length > 0"
      class="absolute z-10 h-full w-full bg-gray-500 bg-opacity-50 p-4"
      @click="closeSearch"
    >
      <div
        class="modal-height container relative z-20 overflow-y-scroll rounded-md bg-white shadow-md"
      >
        <div class="p-4">
          <div
            class="sticky top-0 z-10 flex w-full flex-row justify-between bg-white"
          >
            <p class="text-2xl font-medium text-mainBlue">
              {{ $t('found') }} {{ searchResult.length }} {{ $t('results') }}
            </p>
            <span
              class="my-auto origin-center transform cursor-pointer text-mainBlue transition-transform hover:scale-110"
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
                <div class="sticky top-16">
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
                      <nuxt-img
                        :src="productPreview.MainImage.url | formatImage"
                      />
                    </div>
                  </div>
                </div>
              </template>
              <p v-else class="text-base font-medium text-mainBlue">
                {{ $t('hoverOver') }}
              </p>
            </div>
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
      if (val.length > 0) {
        document.querySelector('body').style.overflow = 'hidden';
      } else {
        document.querySelector('body').style.overflow = 'scroll';
      }
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
    closeSearch() {
      this.inputSearch = '';
      this.productPreview = null;
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
.modal-height {
  height: calc(100% - 20rem);
}
</style>
