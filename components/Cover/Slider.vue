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
          <div
            class="col px-0 py-0"
            :style="`min-height: ${500}px; width: 100%;`"
          >
            <BackgroundImg
              :src="slide.BackgroundImage.url | formatImage"
              style=" display: flex; align-items: center;"
            >
              <template
                v-slot:body
                v-if="slide.TextAreaHeader || slide.TextAreaSubHeader"
              >
                <div class="grid-small" style="width: 100%;">
                  <div
                    class="slider-title title-white slider-title-1"
                    v-html="slide.TextAreaHeader"
                  ></div>
                  <br />
                  <div
                    class="mt-2 slider-title title-white slider-title-2"
                    v-html="slide.TextAreaSubHeader"
                  ></div>
                </div>
              </template>
            </BackgroundImg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BackgroundImg from "@/components/Utilities/BackgroundImg";

export default {
  props: ["slides"],
  components: {
    BackgroundImg
  },
  data() {
    return {
      selectedIndex: 0,
      duration: 5 // sec
    };
  },
  mounted() {
    const interval = setInterval(() => {
      if (this.slides.length > 0) {
        this.selectedIndex = this.getNextIndex(this.slides, this.selectedIndex);
        console.log(this.selectedIndex);
      } else {
        console.log("stop");
        clearInterval(interval);
      }
    }, this.duration * 1000);
  },
  methods: {
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
    transition: 2s ease;
    .slider-title {
      display: inline-block;
    }
  }
}
</style>

<style lang="scss">
.custom-slider-container {
  .slider-item {
    .slider-title.slider-title-1 {
      font-size: 40px;
    }
    .slider-title.slider-title-2 {
      font-size: 30px;
    }
  }
}
</style>
