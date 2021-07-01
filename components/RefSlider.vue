<template>
  <div>
    <div
      class="custom-slider-container"
      v-for="(slide, index) in slides"
      :key="index"
    >
      <div
        class="slider-item"
        :style="{
          opacity: selectedIndex === index ? 1 : 0
        }"
      >
        <div class="row" v-if="selectedIndex === index">
          <div class="col px-0 py-0" style="width: 100%;">
            <div class="ref-company-logo-bar">
              <div
                class="logo-container"
                v-for="(image, index) in slide"
                :key="index"
              >
                <img class="logo" :src="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RefCompanyLogoBar from "@/components/AboutUs/RefCompanyLogoBar";

export default {
  props: ["images"],
  components: {
    RefCompanyLogoBar
  },
  data() {
    return {
      slides: [],
      selectedIndex: 0,
      duration: 8 // sec
    };
  },
  created() {
    const SHOW_IN = 4;
    this.slides = this.splitChunks(this.images, SHOW_IN);
  },
  mounted() {
    const interval = setInterval(() => {
      if (this.slides.length > 0) {
        this.selectedIndex = this.getNextIndex(this.slides, this.selectedIndex);
      } else {
        clearInterval(interval);
      }
    }, this.duration * 1000);
  },
  methods: {
    splitChunks(arr, len) {
      var chunks = [],
        i = 0,
        n = arr.length;

      while (i < n) {
        chunks.push(arr.slice(i, (i += len)));
      }

      return chunks;
    },
    getNextIndex(arr, currentIndex) {
      const lastIndex = arr.length - 1;
      let nextIndex = currentIndex + 1;
      if (nextIndex > lastIndex) {
        nextIndex = 0;
      }
      return nextIndex;
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-slider-container {
  .slider-item {
    /* transition: 2s ease; */
    .slider-title {
      display: inline-block;
    }
  }
}
</style>

<style lang="scss">
</style>
