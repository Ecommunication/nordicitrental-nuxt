<template>
  <div class="all-categories">
    <HeaderImg
      v-if="data.ImageCover"
      :img="data.ImageCover.url | formatImage"
      text="Alle produkter"
    />

    <div class="categories mt-16 mb-5" style="max-width: 940px; margin: 0 auto">
      <nuxt-link
        :to="localePath(`/produkt-kategori/${category.info.slug}`)"
        v-for="(category, index) in categories"
        :key="index"
      >
        <div
          class="category-card-container"
          v-if="category.products.length > 0"
        >
          <div class="category-img-container text-center">
            <img :src="category.img" v-if="category.img" />
            <img
              src="~/assets/images/icons/no-photos.svg"
              class="mx-auto"
              alt=""
              style="max-width: 70px"
              v-else
            />
          </div>
          <div class="category-title text-center">
            {{ category.info.name }} ({{ category.products.length }})
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { Category } from '@/utils/dto';
import HeaderImg from '@/components/Utilities/HeaderImg';
export default {
  components: {
    HeaderImg,
  },
  async asyncData({ params, $axios, i18n }) {
    const data = await $axios.$get(`/om-os?_locale=${i18n.locale}`);

    const categoriesData = await $axios.$get(
      `/product-categories?_locale=${i18n.locale}`
    );
    const categories = categoriesData.map((cat) => new Category(cat));

    return { categories, data };
  },
};
</script>
