<template>
  <div>
    <HeaderImg
      v-if="category.cover"
      :img="category.cover.image"
      :text="category.cover.text"
      :height="490"
    />

    <div class="container mt-10">
      <div class="row">
        <div class="col">
          <div
            class="product"
            v-for="product in category.products"
            :key="product.info.id"
          >
            <div class="product-image">
              <img :src="product.gallery.main" />
            </div>
            <div class="product-info mt-9">
              <div class="product-title text-blue">{{ product.info.name }}</div>
              <div class="product-description">
                {{ getParsedDescription(product.descriptions.short) }}
              </div>
              <div class="product-body">
                <div class="mb-3">
                  <div class="price-weekly">
                    {{ product.pricing.weekly | formatPrice }}
                  </div>
                  <div class="explanation">
                    Pris for første uges leje
                  </div>
                  <div class="mt-1">
                    <span class="price-daily">{{
                      product.pricing.daily | formatPrice
                    }}</span>
                    <span class="explanation"
                      >Pris efter første uges leje, pr. dag.</span
                    >
                  </div>
                </div>
                <nuxt-link
                  :to="'/produkt/' + product.info.slug"
                  class="btn btn-shop btn-blue product-button"
                  >Vælg produkt</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <CategorySlider
        v-if="category.CategoryUpsell && category.CategoryUpsell.length"
        title="Lignende produkter"
        :categories="category.CategoryUpsell"
        titlePosition="left"
        :titlePaddingBottom="20"
        justifyContent="center"
        :size="210"
      />

      <div class="row py-5" v-if="category.description">
        <div class="col">
          <div class="category-description" v-html="category.description"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderImg from "@/components/Utilities/HeaderImg";
import CategorySlider from "@/components/Category/Slider";
import { Category } from "@/utils/dto";

export default {
  components: {
    HeaderImg,
    CategorySlider
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
  async asyncData({ params, $axios, $config, route, store }) {
    const slug = params.category.toLowerCase();
    const categoriesData = await $axios.$get(
      `/product-categories?Slug=${slug}`
    );

    console.log({route, store})

    if(categoriesData && Array.isArray(categoriesData) && !categoriesData.length){
      /* return store.dispatch('throwError404', { slug }) */
    }

    const categoryData = categoriesData[0] || {};
    if (!categoryData) return;
    console.log({categoriesData})

    const category = new Category(categoryData);

    return { category };
  },
  methods: {
    getParsedDescription(desc) {
      const plainText = desc.replace(/(<([^>]+)>)/gi, "");
      const words = plainText.split(" ");
      const first34Words = words.slice(0, 34);
      const description = first34Words.join(" ") + (words.length > 34 ? " ..." : "");
      return description;
    }
  }
};
</script>

<style lang="scss">
.explanation {
  font-size: 0.65em;
  font-weight: 300;
}
.product {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-bottom: 2px solid #e9e9e9;
  .product-image {
    text-align: center;
    display: block;
    width: 289px;
    img {
      width: 80%;
      height: 80%;
    }
  }
  .product-info {
    flex: 1;
    .product-title {
      font-size: 23px;
      font-weight: bold;
    }
    .product-description {
      color: #585858;
      margin: 7px 0;
      font-size: 0.7em;
      line-height: 25px;
    }
    .product-body {
      color: #092d4f;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .price-weekly {
        font-size: 2.1em;
        font-weight: 700;
      }
      .price-daily {
        font-weight: bold;
      }

      .product-button {
        font-size: 0.7em;
      }
    }
  }
}
.col {
  padding: 16px;
}
</style>
