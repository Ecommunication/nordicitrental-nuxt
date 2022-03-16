<template>
  <div>
    <div class="w-full flex flex-row justify-center mb-4">
      <span class="relative w-1/3">
        <input v-model="inputSearch" placeholder="iPhone X" />
        <i
          class="fas fa-search fa-lg absolute right-0 top-1/3 opacity-50 mx-2"
        />
      </span>
    </div>
    <div class="absolute bg-gray-500/50 w-full h-screen z-10">
      <div class="relative container bg-white h-60 shadow-md z-20">
        <div class="grid grid-cols-2">
          <div>All products</div>
          <div>product view</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllProductsOverview } from '/lib/api.js';
export default {
  data() {
    return {
      inputSearch: '',
      searchResult: [],
      allProducts: [],
    };
  },
  computed: {},
  watch: {
    inputSearch(val) {
      this.$emit('onChange', val);
    },
  },
  mounted() {
    getAllProductsOverview().then(({ data }) => this.allProducts.push(data));
  },
};
</script>

<style lang="scss" scoped></style>
