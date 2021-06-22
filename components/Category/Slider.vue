<template>
  <div class="row">
    <div class="col" style="width:100%;">
      <h3 class="text-blue title-md" :style="`text-align: ${titlePosition}; padding-bottom: ${titlePaddingBottom}px;`">
        {{ title }}
      </h3>
      <div class="row" style="justify-content: space-around;">
        <div class="col mx-2" v-for="(cat, index) in categories" :key="index">
          <nuxt-link :to="`/produkt-kategori/${cat.Slug}`">
            <div class="category-card">
              <img :src="cat.Image.url | formatImage" />
              <span class="category-title text-md weight-thin mt-6">{{
                cat.Title
              }}</span>
            </div>
          </nuxt-link>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    categories: { type: Array, required: true },
    titlePosition: { type: String, default: "center" },
    titlePaddingBottom: { type: Number, default: 48 }
  }
};
</script>

<style lang="scss" scoped>
.category-card:hover {
  background: rgb(238, 238, 238);
}
.category-card {
  width: 180px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid rgba(228, 228, 228, 0.35);
  img {
    max-width: 110px;
    max-height: 68px;
  }
  .category-title {
    font-size: 24px;
  }
}
</style>
