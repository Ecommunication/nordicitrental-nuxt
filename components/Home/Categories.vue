<template>
  <div class="info">
    <div class="info-card" v-for="(item, index) in categories" :key="index">
      <h3>{{ item.Title }}</h3>
      <div class="img-wrapper">
        <img
          class="info-card-img mx-auto"
          :alt="item.Title"
          :src="item.Icon.url | formatImage"
        />
      </div>
      <Counter
        :end="item.Counter"
        :render="counterAnimationLoaded"
        :durationMs="2000"
      />
    </div>
  </div>
</template>

<script>
import Counter from '@/components/Utilities/Counter';

export default {
  components: {
    Counter,
  },
  props: {
    categories: {
      type: Array,
      default: [],
    },
    counterAnimationLoaded: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
