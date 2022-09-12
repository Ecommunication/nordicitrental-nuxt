<template>
  <div class="faq" @mouseenter="hover = true" @mouseleave="hover = false">
    <div class="question">{{ q }}</div>
    <div class="answer" :class="hover ? 'active' : ''" v-html="a"></div>
  </div>
</template>

<script>
export default {
  props: {
    q: { type: String, required: true },
    a: { type: String, required: true },
  },
  data() {
    return {
      hover: false,
    };
  },
};
</script>
