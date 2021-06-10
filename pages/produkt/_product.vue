<template>
  <div>
    <HeaderImg
      v-if="product.cover"
      :img="product.cover.image"
      :text="product.cover.text"
      :height="460"
    />

    <div class="container py-10">
      <div class="row" style="justify-content: center; padding: 16px;">
        <div class="col-md-4">
          <div class="product-gallery">
            <div class="product-gallery-main-image">
              <img :src="product.gallery.main" alt="" />
            </div>
            <div class="product-gallery-other-images">
              <div
                class="product-gallery-other-img-container"
                v-for="(image, index) in product.gallery.thumbnails"
                :key="index"
              >
                <img :src="image" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="product-meta">
            <IconBar class="mb-8" :icons="product.icons" />
            <div class="product-prices text-blue">
              <div class="price-weekly-container">
                <span class="price-weekly">{{
                  product.pricing.weekly | formatPrice
                }}</span>
                <span class="price-explanation"
                  >(Pris for første uges leje)</span
                >
              </div>
              <div class="price-daily-container">
                <span class="price-daily">{{
                  product.pricing.daily | formatPrice
                }}</span>
                <span class="price-explanation"
                  >(Pris efter første uges leje, pr. dag.)</span
                >
              </div>
            </div>

            <div
              class="product-description"
              v-html="product.descriptions.short"
            ></div>

            <AddToCart
              class="mt-8"
              :product="product"
              :dailyPrice="product.pricing.daily"
              :weeklyPrice="product.pricing.weekly"
            />
          </div>
        </div>
      </div>
      <div class="row mt-10">
        <div class="col">
          <Tabs
            :description="product.descriptions.long"
            :features="featuresTab"
          />
        </div>
      </div>

      <div class="row mt-10">
        <div class="col">
          <Suggestions :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Product } from "@/utils/dto";
import AddToCart from "@/components/Product/AddToCart";
import Tabs from "@/components/Product/Tabs";
import IconBar from "@/components/Product/IconBar";
import Suggestions from "@/components/Product/Suggestions";
import HeaderImg from "@/components/Utilities/HeaderImg";
import BackgroundImg from "@/components/Utilities/BackgroundImg";

export default {
  components: {
    HeaderImg,
    BackgroundImg,
    AddToCart,
    Tabs,
    IconBar,
    Suggestions
  },
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
    console.log(data)
    return { data };
  }
};
</script>

<style lang="scss" scoped>
.product-gallery {
  margin-right: 20px;
  .product-gallery-main-image {
    max-height: 300px;
    max-width: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .product-gallery-other-images {
    display: flex;
    flex-wrap: wrap;
    .product-gallery-other-img-container {
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
}
.product-meta {
  .product-prices {
    font-weight: 700;
    .price-weekly {
      font-size: 1.8em;
    }
    .price-explanation {
      margin-left: 5px;
      font-size: 0.9em;
    }
  }

  .product-description {
    font-size: 0.8em;
    font-weight: 100;
  }
}
</style>
