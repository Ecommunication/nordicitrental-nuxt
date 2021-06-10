<template>
  <div class="cover-slider">
    <div class="cover-slider-container">
      <div
        class="cover-slider-item"
        v-for="slide in slides"
        :key="slide.id"
        :style="`background: url(${$formatImage(slide.BackgroundImage.url)})`"
      >
        <section class="capture abs-center">
          <h1
            class="slider-title title-white mb-2"
            v-html="slide.TextAreaHeader"
          ></h1>
          <h1
            class="slider-title title-white"
            v-html="slide.TextAreaSubHeader"
          ></h1>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  props: ["slides"],
  mounted() {
    setTimeout(function() {
      var allBoxes = $(".cover-slider-container").children("div");
      transitionBox(null, allBoxes.first());

      function transitionBox(from, to) {
        function next() {
          var nextTo;
          if (to.is(":last-child")) {
            nextTo = to
              .closest(".cover-slider-container")
              .children("div")
              .first();
          } else {
            nextTo = to.next();
          }
          to.fadeIn(500, function() {
            setTimeout(function() {
              transitionBox(to, nextTo);
            }, 8000);
          });
        }

        if (from) {
          from.fadeOut(500, next);
        } else {
          next();
        }
      }
    }, 100);
  },
  methods: {
    transitionBox: function() {}
  }
};
</script>

<style lang="scss" scoped>
.cover-slider {
  height: 500px;
  .cover-slider-container {
    height: 100%;
    .cover-slider-item {
      position: relative;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat !important;
      background-size: cover !important;
      background-position: center center !important;
      display: none;
      .abs-center {
        position: absolute;
        left: 25%;
        top: 25%;
        h1 {
          font-size: 2em;
        }
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .cover-slider {
    height: 250px;
    .cover-slider-container {
      .cover-slider-item {
        .abs-center {
          left: 10%;
          top: 10%;
          width: 80%;
        }
      }
    }
  }
}
</style>
