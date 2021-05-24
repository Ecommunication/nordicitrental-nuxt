<template>
  <div class="icon-bar">
    <div v-for="(icon, index) in icons" :key="index">
      <div class="icon text-center">
        <div class="img-container">
          <img :src="icon.Icon.url | imageUrl" :alt="icon.Icon.alternativeText" />
        </div>
        <div class="desc">{{ icon.Description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icons: { type: Array, required: true },
  }
};
</script>

<style lang="scss" scoped>
.icon-bar {
  display: flex;
}
.icon {
  margin: 0 5px;
  width: 100px;
  .img-container {
    width: 45px;
    height: 45px;
    line-height: 54px;
    margin: 0 auto;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }
  .desc {
    font-size: 0.75em;
    margin-top: 2px;
  }
}
</style>
