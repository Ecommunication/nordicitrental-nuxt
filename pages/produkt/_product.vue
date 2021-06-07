<template>
  <div>
    <BackgroundImg
      v-if="product.cover.image"
      :minHeight="460"
      :src="product.cover.image"
      style="display: flex; align-items: center;"
    >
      <template v-slot:body>
        <h1 class="slider-title title-white" style="margin: auto;">
          {{ product.cover.text }}
        </h1>
      </template>
    </BackgroundImg>

    <div class="mt-14 product grid-small margin-center">
      <div
        class="product-gallery"
        style="max-width: 500px; margin-right: 50px "
      >
        <div class="product-gallery__main-image">
          <img class="img-responsive" :src="product.gallery.main" alt="" />
        </div>
        <div class="product-galery-other-images">
          <div
            class="product-galery-other-img-container"
            v-for="(image, index) in product.gallery.thumbnails"
            :key="index"
          >
            <img :src="image" />
          </div>
        </div>
      </div>
      <div class="product-meta">
        <IconBar class="mb-14" :icons="product.icons" />
        <div class="product-meta__specs"></div>
        <div class="product-meta__prices">
          <div class="product-meta__prices-weekly">
            <span>
              {{ product.pricing.weekly | formatPrice }}
              <i class="product-meta__prices-price-info"
                >(Pris for første uges leje)</i
              >
            </span>
          </div>
          <div class="product-meta__prices-daily">
            <span>
              {{ product.pricing.daily | formatPrice }}
              <i class="product-meta__prices-price-info"
                >(Pris efter første uges leje, pr. dag.)</i
              >
            </span>
          </div>
        </div>
        <div class="product-meta__description">
          <div
            style="font-size: 0.8em; line-height: 25px;"
            v-html="product.descriptions.short"
          ></div>
        </div>
        <div class="product-meta__buy-section">
          <div class="product-meta__buy-section__addons"></div>
          <div class="product-meta__buy-section__period">
            <AddToCart
              :product="product"
              :dailyPrice="product.pricing.daily"
              :weeklyPrice="product.pricing.weekly"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="product grid-small margin-center mt-10">
      <Tabs :description="product.descriptions.long" :features="featuresTab" />
    </div>

    <div class="product grid-small margin-center mt-10">
      <Suggestions :products="products" />
    </div>
  </div>
</template>
<script>
import { Product } from "@/utils/dto";
import AddToCart from "@/components/Product/AddToCart";
import Tabs from "@/components/Product/Tabs";
import IconBar from "@/components/Product/IconBar";
import Suggestions from "@/components/Product/Suggestions";
import BackgroundImg from "@/components/Utilities/BackgroundImg";

export default {
  components: { BackgroundImg, AddToCart, Tabs, IconBar, Suggestions },
  data() {
    return {
      products: [
        {
          id: 1,
          img:
            "https://nordicitrental.dk/wp-content/uploads/2015/05/ipadstander-220x220.jpg",
          title: "iPad gulvstander – sort"
        },
        {
          id: 2,
          img:
            "https://nordicitrental.dk/wp-content/uploads/2014/10/simcard-220x165.gif",
          title: "Data simkort med 3G/4G til iPad"
        }
      ],
      featuresTab: {}
    };
  },
  computed: {
    product() {
      return new Product(this.data[0]);
    }
  },
  head() {
    return {
      title: this.product?.cover?.text || "",
      meta: [
        {
          name: "title",
          content: this.product?.meta?.title || ""
        },
        {
          name: "description",
          content: this.product?.meta?.desc || ""
        }
      ]
    };
  },
  async asyncData({ params, $axios, $config }) {
    const data = await $axios.$get(`/products?ProductSlug=${params.product}`);
    return { data };
  }
};
</script>

<style lang="scss" scoped>
.product-galery-other-images {
  display: flex;
  flex-wrap: wrap;
  .product-galery-other-img-container {
    width: 90px;
    height: 90px;
    margin: 15px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background-position: center center;
    }
  }
}
</style>
