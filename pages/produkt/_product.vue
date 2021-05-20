<template>
  <p class="grid-small margin-center" v-if="$fetchState.pending">
    Indlæser side
  </p>
  <p class="grid-small margin-center" v-else-if="$fetchState.error">
    Vi kunne desværre ikke indlæse siden i øjeblikket. Prøv igen senere.
  </p>
  <div v-else>
    <CoverImage
      :textCover="product.data.TextCover"
      :imageCover="product.imageCover"
    />

    <div class="product grid-small margin-center">
      <div class="product-gallery">
        <div class="product-gallery__main-image">
          <img class="img-responsive" :src="product.gallery.main" alt="" />
        </div>
      </div>
      <div class="product-meta">
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
          <div v-html="product.data.DescriptionShort"></div>
        </div>
        <div class="product-meta__buy-section">
          <div class="product-meta__buy-section__addons"></div>
          <div class="product-meta__buy-section__period">
            <AddToCart
              :dailyPrice="product.pricing.daily"
              :weeklyPrice="product.pricing.weekly"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddToCart from "@/components/Product/AddToCart";

export default {
  components: { AddToCart },
  data() {
    return {
      product: {
        imageCover: null,
        textCover: null,
        metaTitle: null,
        metaDescription: null,
        gallery: {
          main: null,
          thumbnails: null
        },
        data: null,
        pricing: {
          daily: null,
          weekly: null
        }
      }
    };
  },
  head() {
    return {
      title: this.product.textCover,
      meta: [
        {
          name: "title",
          content: this.product.metaTitle ?? ""
        },
        {
          name: "description",
          content: this.product.metaDescription ?? ""
        }
      ]
    };
  },
  async fetch() {
    const products = await fetch(
      process.env.apiUrl + "/products?ProductSlug=" + this.$route.params.product
    ).then(res => res.json());

    const product = products[0];
    console.log(product);

    this.product.data = product;
    this.product.imageCover = process.env.apiUrl + product.ImageCover.url;

    this.product.metaTitle = product.MetaTitle;
    this.product.textCover = product.TextCover;
    this.product.metaDescription = product.MetaDescription;

    this.product.gallery.main = process.env.apiUrl + product.MainImage.url;

    this.product.pricing.weekly = product.WeekPrice;
    this.product.pricing.daily = product.DailyPriceAfterWeek;
    console.log(this.product.pricing);
  }
};
</script>
