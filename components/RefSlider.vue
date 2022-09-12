<template>
  <div class="frontpage-references bg-blue py-10">
    <div class="frontpage-references__images">
      <VueSlickCarousel
        :centerMode="true"
        :arrows="true"
        :dots="true"
        :slidesToShow="4"
      >
        <div
          :key="index"
          class="frontpage-references__images-image flex flex-justify-center"
          v-for="(image, index) in images"
        >
          <div>
            <nuxt-img
              v-if="image.Reference"
              :src="image.Reference[0].url | formatImage"
              :alt="image.Reference[0].alternativeText"
            />
            <nuxt-img v-else :src="image" />
          </div>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel';

export default {
  props: ['images'],
  components: {
    VueSlickCarousel,
  },
  mounted() {},
};
</script>
