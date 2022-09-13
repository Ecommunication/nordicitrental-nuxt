<template>
  <div id="coverSlider" class="relative">
    <div
      :class="`custom-slider-container transform duration-300 transition-opacity ${
        selectedIndex === index
          ? 'block opacity-100 static'
          : ' opacity-0 absolute inset-0'
      }`"
      v-for="(slide, index) in slides"
      :key="index"
    >
      <div class="slider-item">
        <div :class="`row `">
          <div
            class="slider-item-container col px-0 py-0"
            :style="`width: 100%;`"
          >
            <BackgroundImg
              :src="slide.BackgroundImage.url | formatImage"
              style="display: flex; align-items: center"
            >
              <template
                v-slot:body
                v-if="slide.TextAreaHeader || slide.TextAreaSubHeader"
              >
                <div class="grid-small" style="width: 100%">
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
import BackgroundImg from '@/components/Utilities/BackgroundImg';

export default {
  props: ['slides'],
  components: {
    BackgroundImg,
  },
  data() {
    return {
      selectedIndex: 0,
      duration: 8, // sec
    };
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
    getNextIndex(arr, currentIndex) {
      const lastIndex = arr.length - 1;
      let nextIndex = currentIndex + 1;
      if (nextIndex > lastIndex) {
        nextIndex = 0;
      }
      return nextIndex;
    },
  },
};
</script>
