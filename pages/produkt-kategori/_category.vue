<template>
  <div>
    <CoverImage
      :textCover="category.cover.text"
      :imageCover="category.cover.image"
    />
    <div class="product-category grid-small margin-center">
      <div
        class="product"
        v-for="product in category.products"
        :key="product.info.id"
      >
        <div class="product-image">
          <div>
            <img
              class="product-image__image-cover img-responsive"
              :src="product.gallery.main"
              alt=""
            />
          </div>
        </div>
        <div class="product-info">
          <span class="product-info__title block">{{ product.info.name }}</span>
          <div class="product-info__description">
            {{ product.description }}
          </div>
          <section class="product-info__details">
            <div class="product-info__details-pricing">
              <div class="product-info__details-pricing__weekly">
                <span class="block">{{
                  product.pricing.weekly | formatPrice
                }}</span>
                <i class="product-info__details-pricing__price-info"
                  >Pris for første uges leje</i
                >
              </div>
              <div class="product-info__details-pricing__daily">
                <span>{{ product.pricing.daily | formatPrice }}</span>
                <i class="product-info__details-pricing__price-info"
                  >Pris efter første uges leje, pr. dag.</i
                >
              </div>
            </div>
            <div class="product-info__details-buy">
              <nuxt-link
                :to="'/produkt/' + product.info.slug"
                class="btn btn-shop btn-blue"
                >Vælg produkt</nuxt-link
              >
            </div>
          </section>
        </div>
      </div>

      <div class="description" v-html="category.description"></div>
    </div>
  </div>
</template>
<script>
import { Category } from "@/utils/dto";

export default {
  computed: {
    category() {
      return new Category(this.data[0]);
    }
  },
  head() {
    return {
      title: this.category.meta.title,
      meta: [
        {
          name: "title",
          content: this.category.meta.title
        },
        {
          name: "description",
          content: this.category.meta.desc
        }
      ]
    };
  },
  async asyncData({ params, $axios, $config }) {
    const data = await $axios.$get(
      `/product-categories?Slug=${params.category}`
    );
    return { data };
  }
};
</script>
