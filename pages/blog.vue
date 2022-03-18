<template>
  <div>
    <HeaderImg img="" :text="`Blog`" />
    <div
      class="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 my-10 px-10"
    >
      <div
        v-for="blog in [1, 2, 3, 4]"
        :key="blog"
        class="flex flex-col transform transition-transform duration-300 hover:scale-110 cursor-pointer"
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
            class="bg-mainBlue shadow-md p-4 rounded-md aspect-square flex flex-col"
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
