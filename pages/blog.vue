<template>
  <div>
    <HeaderImg img="" :text="`Blog`" />
    <div
      class="container my-10 grid grid-cols-1 gap-10 px-10 md:grid-cols-2 xl:grid-cols-3"
    >
      <div
        v-for="blog in [1, 2, 3, 4]"
        :key="blog"
        class="flex transform cursor-pointer flex-col transition-transform duration-300 hover:scale-110"
      >
        <nuxt-link to="/">
          <div class="flex justify-between">
            <h3 class="text-lg font-semibold text-mainBlue">
              Ny aftale med TDC
            </h3>
            <p class="text-right text-sm font-thin text-black">
              28. Januar, 2022
            </p>
          </div>
          <div
            class="aspect-square flex flex-col rounded-md bg-mainBlue p-4 shadow-md"
          >
            <img src="~/assets/images/icons/no-photos.svg" />
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderImg from '@/components/Utilities/HeaderImg';
export default {
  components: { HeaderImg },
  head() {
    return {};
  },
  data() {
    return {};
  },
  async asyncData({ params, $axios }) {},
};
</script>

<style lang="scss" scoped>
.aspect-square {
  aspect-ratio: 1/1;
}
</style>
