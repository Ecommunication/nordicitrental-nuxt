<template>
  <div class="mb-10">
    <h2 class="ml-3">Du kunne også være interesseret i...</h2>
    <div class="products">
      <div
        @mouseenter="hover = product.id"
        @mouseleave="hover = null"
        class="product"
        :class="hover === product.id ? 'active' : ''"
        v-for="product in products"
        :key="product.id"
      >
        <div class="product-img-container">
          <img class="product-img" :src="product.img" alt="" />
        </div>
        <h3 class="product-title text-blue text-center mt-3">
          {{ product.title }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: { type: Array, required: true }
  },
  data() {
    return {
      hover: null
    };
  }
};
</script>

<style lang="scss" scoped>
.products {
  display: flex;
  cursor: pointer;
  .product {
    display: block;
    width: 225px;
    height: 225px;
    margin: 0 15px;
    border: 1px solid #ccc;
    padding: 15px;
    .product-img-container {
      width: 80%;
      height: 80%;
      margin: 10px auto 0 auto;
      .product-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-position: center center;
      }
    }
    .product-title {
      clear: both;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.7em;
    }
  }
  .product.active {
    border-color: #092d4f;
  }
}
</style>
