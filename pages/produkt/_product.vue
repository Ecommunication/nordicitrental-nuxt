<template>
  <div class="product-single">
    <HeaderImg
      v-if="product.cover"
      :img="product.cover.image"
      :text="product.cover.text || product.info.name"
      :height="460"
    />
    <div class="container py-10">
      <div class="row" style="justify-content: center; padding: 16px">
        <div class="col-md-4">
          <ProductGallery
            :gallery="product.gallery"
            :productName="product.Name"
          />
        </div>
        <div class="col-md-8">
          <div class="product-meta">
            <IconBar class="mb-8" :features="product.features" />
            <div class="product-prices text-blue">
              <div class="price-weekly-container">
                <span class="price-weekly">{{
                  product.pricing.weekly | formatPrice
                }}</span>
                <span class="price-explanation">{{
                  produktside.FirstWeekPriceText
                }}</span>
              </div>
              <div class="price-daily-container">
                <span class="price-daily">{{
                  product.pricing.daily | formatPrice
                }}</span>
                <span class="price-explanation">{{
                  produktside.DailyPriceText
                }}</span>
              </div>
            </div>

            <div
              class="product-description"
              v-html="product.descriptions.short"
            />

            <AddToCart
              :key="addToCartKey"
              class="mt-8"
              :product="product"
              :dailyPrice="product.pricing.daily"
              :weeklyPrice="product.pricing.weekly"
              :produktside="produktside"
              @addedToCart="onAddedToCart"
            />
          </div>
        </div>
      </div>
      <div class="row mt-10">
        <div class="col w-100">
          <Tabs
            :description="product.descriptions.long"
            :features="product.features"
          />
        </div>
      </div>

      <div class="row mt-10">
        <div class="col">
          <Suggestions :products="product.upsell" :produktside="produktside" />
        </div>
      </div>
    </div>

    <Modal
      class="cartNotifModal"
      :title="`modal-added-to-cart`"
      v-show="isModalVisible && Object.keys(modalData).length"
      @close="closeDialog"
      :width="500"
      modalName="cartModal"
    >
      <template v-slot:header>{{ produktside.AddedToCartText }}</template>
      <template v-slot:body>
        <div class="cartNotifModal-body">
          <div class="text-center">
            <i class="cartNotifModal-icon fas fa-cart-arrow-down"></i>
          </div>
          <div class="mt-5">
            <div class="text-blue" style="font-weight: 600">
              {{ modalData.title }}
            </div>
            {{ produktside.CartRentalPeriodText }}
            <span class="ml-1">
              {{ modalData.startDate | formatDate }} -
              {{ modalData.endDate | formatDate }}
            </span>
          </div>
          <div class="text-blue my-5" style="font-weight: 600">
            {{ produktside.TotalPriceText }} {{ modalData.price | formatPrice }}
          </div>
          <div style="display: flex; justify-content: space-between">
            <div class="button btn-primary" @click="goToProduct">
              <span class="text-uppercase">{{
                produktside.ContinueBrowsingText
              }}</span>
            </div>
            <nuxt-link class="button btn-primary" :to="localePath('/kurv')">
              <span class="text-uppercase">{{ produktside.OrderText }}</span>
            </nuxt-link>
          </div>
        </div>
      </template>
    </Modal>

    <Modal
      class="imageModal"
      :title="`modal-image-lightbox`"
      v-show="imageModalIsOpen"
      @close="closeImageModal"
      :width="700"
      name="imageModal"
    >
      <template v-slot:body>
        <div class="product-modal-main-image">
          <img :src="imageModal" />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import { Product, ProductOption } from '@/utils/dto';
import Modal from '@/components/Utilities/Modal';
import AddToCart from '@/components/Product/AddToCart';
import Tabs from '@/components/Product/Tabs';
import IconBar from '@/components/Product/IconBar';
import Suggestions from '@/components/Product/Suggestions';
import HeaderImg from '@/components/Utilities/HeaderImg';
import BackgroundImg from '@/components/Utilities/BackgroundImg';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import { GET_PRODUCTPAGE_TEXTS, GET_ONE_PRODUCTS } from '@/lib/api';
export default {
  components: {
    HeaderImg,
    BackgroundImg,
    Modal,
    AddToCart,
    Tabs,
    IconBar,
    Suggestions,
    VueSlickCarousel,
  },
  async asyncData({ i18n, app, params, $axios, $config }) {
    const client = app.apolloProvider.defaultClient;
    const res = await client.query({
      query: GET_PRODUCTPAGE_TEXTS,
      variables: { locale: i18n.locale },
    });
    const { produktside } = res.data;

    const productgql = await client.query({
      query: GET_ONE_PRODUCTS,
      variables: { locale: i18n.locale, slug: params.product },
    });
    const { products } = productgql.data;

    // Create object for dynamic routing i18n route params
    const i18nObj = {};
    products[0]?.localizations.forEach((item) => {
      Object.assign(i18nObj, { [item.locale]: { product: item.ProductSlug } });
    });

    // Set i18n route params for localized routes
    await app.store.dispatch('i18n/setRouteParams', i18nObj);

    const productsData =
      (await $axios.$get(
        `/products?ProductSlug=${params.product}&_locale=${i18n.locale}`
      )) || [];
    const productData = productsData[0] || {};
    if (!productData) return;

    // const categories = await Promise.all(
    //     productData.product_categories.map(async cat => {
    //       const categoryData = await $axios.$get(
    //           `/product-categories?Slug=${cat.Slug}`
    //       );
    //       return categoryData && categoryData[0] ? categoryData[0] : [];
    //     })
    // );

    const product = new Product(productData, []);

    return { product, produktside };
  },
  data() {
    return {
      addToCartKey: new Date().getTime(),
      isModalVisible: true,
      modalData: {},
      imageModal: null,
      imageModalIsOpen: false,
      productThumbsSettings: {
        slidesToShow: 3,
        arrows: true,
        dots: false,
      },
    };
  },
  head() {
    return {
      title: this.product?.meta?.title || '',
      meta: [
        {
          name: 'title',
          content: this.product?.meta?.title || '',
        },
        {
          name: 'description',
          content: this.product?.meta?.desc || '',
        },
      ],
    };
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
        price: cartData.price,
      };
    },
    closeDialog() {
      this.isModalVisible = false;
      this.modalData = {};
    },
    goToProduct() {
      this.closeDialog();
      this.addToCartKey = new Date().getTime();
    },
  },
};
</script>
