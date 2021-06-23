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
              <img
                v-if="product.gallery.main"
                @click="openImageModal(product.gallery.main)"
                :src="product.gallery.main"
                alt=""
              />
            </div>
            <div class="product-gallery-other-images">
              <div
                class="product-gallery-other-img-container"
                v-for="(image, index) in product.gallery.thumbnails"
                :key="index"
                @click="openImageModal(image)"
              >
                <img :src="image" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="product-meta">
            <IconBar class="mb-8" :features="product.features" />
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
              :key="addToCartKey"
              class="mt-8"
              :product="product"
              :dailyPrice="product.pricing.daily"
              :weeklyPrice="product.pricing.weekly"
              @addedToCart="onAddedToCart"
            />
          </div>
        </div>
      </div>
      <div class="row mt-10">
        <div class="col">
          <Tabs
            :description="product.descriptions.long"
            :features="product.features"
          />
        </div>
      </div>

      <div class="row mt-10">
        <div class="col">
          <Suggestions :products="product.upsell" />
        </div>
      </div>
    </div>

    <Modal
      v-show="isModalVisible && Object.keys(modalData).length"
      @close="closeDialog"
      :width="500"
    >
      <template v-slot:header>
        Produktet er lagt i kurven
      </template>
      <template v-slot:body>
        <div style="font-size: 0.8em; width: 80%; margin: 0 auto;">
          <div class="text-center">
            <i
              class="fas fa-cart-arrow-down"
              style="font-size: 100px; color: #092D4F;"
            ></i>
          </div>
          <div class="mt-5">
            <div class="text-blue" style="font-weight: 600;">
              {{ modalData.title }}
            </div>
            Lejeperiode fra:
            <span class="ml-1">
              {{ modalData.startDate | formatDate }} -
              {{ modalData.endDate | formatDate }}
            </span>
          </div>
          <div class="my-5 text-blue" style="font-weight: 600;">
            Totalpris: {{ modalData.price | formatPrice }}
          </div>
          <div style="display: flex; justify-content: space-between;">
            <div class="button btn-primary" @click="goToProduct">
              FORTSÆT MED AT KOBE
            </div>
            <div class="button btn-primary" @click="goToCart">CHECKUD</div>
          </div>
        </div>
      </template>
    </Modal>

    <Modal
      class="imageModal"
      v-show="imageModalIsOpen"
      @close="closeImageModal"
      :width="700"
    >
      <template v-slot:header>
        {{ product.info.name }}
      </template>
      <template v-slot:body>
        <div style="height: 600px;">
          <img
            style="width: 100%; height: 100%; object-fit: cover;"
            :src="imageModal"
          />
        </div>
        <div style="display: flex;">
          <div
            class="mx-2"
            style="border: 1px solid #ccc; padding: 5px; cursor: pointer;"
            @click="openImageModal(image)"
            v-for="(image, index) in [
              product.gallery.main,
              ...product.gallery.thumbnails
            ]"
            :key="index"
          >
            <div style="width: 100px; height: 100px; ">
              <img
                style="width: 100%; height: 100%; object-fit: cover;"
                :src="image"
              />
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import { Product, ProductOption } from "@/utils/dto";
import Modal from "@/components/Utilities/Modal";
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
    Modal,
    AddToCart,
    Tabs,
    IconBar,
    Suggestions
  },
  data() {
    return {
      addToCartKey: new Date().getTime(),
      isModalVisible: true,
      modalData: {},
      imageModal: null,
      imageModalIsOpen: false
    };
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
    const productsData =
      (await $axios.$get(`/products?ProductSlug=${params.product}`)) || [];
    const productData = productsData[0] || {};
    if (!productData) return;

    const categories = await Promise.all(
      productData.product_categories.map(async cat => {
        const categoryData = await $axios.$get(
          `/product-categories?Slug=${cat.Slug}`
        );
        return categoryData && categoryData[0] ? categoryData[0] : [];
      })
    );
    const product = new Product(productData, categories);
    console.log(product, 1, categories);

    return { product };
  },
  methods: {
    openImageModal(imgSrc) {
      this.imageModalIsOpen = true;
      this.imageModal = imgSrc;
    },
    closeImageModal() {
      this.imageModalIsOpen = false;
    },
    onAddedToCart(cartData) {
      this.isModalVisible = true;
      this.modalData = {
        endDate: cartData.endDate,
        startDate: cartData.startDate,
        title: cartData?.product?.info?.name,
        price: cartData.price
      };
    },
    closeDialog() {
      this.isModalVisible = false;
      this.modalData = {};
    },
    goToCart() {
      this.$router.push("/kurv");
    },
    goToProduct() {
      this.closeDialog();
      this.addToCartKey = new Date().getTime();
    }
  }
};
</script>

<style lang="scss" scoped>
.product-gallery {
  margin-right: 20px;
  .product-gallery-main-image {
    cursor: zoom-in;
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
      cursor: zoom-in;
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
