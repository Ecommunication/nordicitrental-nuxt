<template>
  <div class="row">
    <div class="col px-0 py-0" :style="`min-height: ${height}px; width: 100%;`">
      <BackgroundImg :src="img" class="bg-img">
        <template v-slot:body v-if="text">
          <h1 class="slider-title title-white">{{ text }}</h1>
        </template>
      </BackgroundImg>
    </div>
  </div>
</template>

<script>
import BackgroundImg from "@/components/Utilities/BackgroundImg";

export default {
  components: {
    BackgroundImg
  },
  props: {
    height: { type: Number, default: 420 },
    img: { type: String, required: true },
    text: { type: String, required: false }
  }
};
</script>

<style lang="scss" scoped>
.bg-img {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
