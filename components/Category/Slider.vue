<template>
  <div class="row">
    <div class="col" style="width: 100%">
      <h3
        class="text-blue title-md"
        :style="`text-align: ${titlePosition}; padding-bottom: ${titlePaddingBottom}px;`"
      >
        {{ title }}
      </h3>
      <div class="row" :style="`justify-content: ${justifyContent};`">
        <div class="col mx-2" v-for="(cat, index) in categories" :key="index">
          <nuxt-link :to="localePath(`/produkt-kategori/${cat.Slug}`)">
            <div
              class="category-card"
              :style="`width: ${size}px; height: ${size}px;`"
            >
              <img
                :alt="
                  cat.Image.alternativeText
                    ? cat.Image.alternativeText
                    : 'Nordic IT Rental udlejning - ' + cat.Title
                "
                v-if="cat.Image"
                :src="cat.Image.url | formatImage"
              />
              <img
                :alt="'Nordic IT Rental udlejning - ' + cat.Title"
                v-else
                src="~/assets/images/icons/no-photos.svg"
              />
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
    titlePaddingBottom: { type: Number, default: 48 },
    justifyContent: { type: String, default: "space-around" },
    size: { type: Number, default: 180 },
  },
};
</script>
