<template>
  <div class="frontpage-references bg-blue py-10">
    <div class="frontpage-references__images">
      <VueSlickCarousel :centerMode="true" :arrows="true" :dots="true" :slidesToShow="4">
        <div class="frontpage-references__images-image flex flex-justify-center" v-for="(image, index) in images">

          <div>
<!--            <img :src="image.Logo.url | formatImage" :alt="image.Logo.alternativeText">-->
          </div>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  props: ["images"],
  components: {
    VueSlickCarousel,
  },
  mounted() {
  },
};
</script>
<style lang="scss">

</style>
