<template>
  <div>
    <div class="w-full flex flex-row justify-center mb-4">
      <span class="relative w-1/3">
        <input
          class="rounded-md"
          v-model="inputSearch"
          placeholder="iPhone X"
        />
        <i
          class="fas fa-search fa-lg absolute right-0 top-1/3 opacity-50 mx-2"
        />
      </span>
    </div>
    <div
      v-if="inputSearch.length > 0"
      class="absolute bg-gray-500 bg-opacity-50 w-full min-h-screen z-10 p-4"
    >
      <div
        class="relative container max-h-screen overflow-y-scroll bg-white shadow-md z-20 rounded-md p-4"
      >
        <div class="flex flex-row justify-between">
          <p class="text-2xl text-mainBlue font-medium">
            Der blev fundet {{ searchResult.length }} resultater
          </p>
          <span
            class="cursor-pointer transform transition-transform hover:scale-110 origin-center text-mainBlue"
            ><i class="fas fa-times fa-lg"
          /></span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <div>
              <p class="text-base font-medium text-mainBlue">Bærbar</p>
            </div>
            <div v-for="product in searchResult" :key="product.id">
              <div
                class="flex border-t border-b cursor-pointer group hover:bg-gray-50"
              >
                <nuxt-img
                  class="max-h-14 transform transition-transform duration-300 group-hover:translate-x-3 aspect-square object-contain"
                  :src="product.MainImage.url | formatImage"
                  :alt="product.Name"
                />
                <div
                  class="flex w-full justify-between space-x-5 ml-4 text-base"
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
            </div>
          </div>
          <div class="invisible md:visible">
            <p class="text-base font-medium text-mainBlue">
              HP Envy 13-ah1006no
            </p>
            <div class="grid grid-cols-2 border-t">
              <div>
                <ul class="text-sm list-disc list-inside mt-2 space-y-2">
                  <li class="list-item">Model: Envy 13-ah00001no</li>
                  <li class="list-item">Model: Envy 13-ah00001no</li>
                  <li class="list-item">Model: Envy 13-ah00001no</li>
                  <li class="list-item">Model: Envy 13-ah00001no</li>
                  <li class="list-item">Model: Envy 13-ah00001no</li>
                  <li class="list-item">Model: Envy 13-ah00001no</li>
                </ul>
                <p class="text-mainBlue font-semibold">
                  {{ product.DailyPrice | formatPrice }}
                </p>
              </div>
              <div class="my-auto">
                <nuxt-img src="~/assets/images/employee_mic.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag';
export default {
  apollo: {
    products: gql`
      query getAllProductsOverview {
        products(limit: 4000) {
          Name
          id
          ProductSlug
          DailyPrice
          product_categories {
            Name
          }
          MainImage {
            url
            alternativeText
          }
        }
      }
    `,
  },
  data() {
    return {
      inputSearch: '',
      searchResult: [],
    };
  },
  computed: {},
  watch: {
    inputSearch(val) {
      this.$emit('onChange', this.searchProducts(val));
    },
  },
  methods: {
    searchProducts(val) {
      this.searchResult = this.products.filter(({ Name }) =>
        Name.toLowerCase().includes(val.toLowerCase())
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.aspect-square {
  aspect-ratio: 4/3;
}
</style>
