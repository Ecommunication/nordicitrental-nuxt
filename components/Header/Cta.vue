<template>
  <div class="flex w-full justify-between">
    <span class="cta">
      <i class="fas fa-phone mr-2"></i>
      {{ cta }}
    </span>
    <div class="space-x-2">
      <nuxt-link
        class="text-sm font-bold"
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        >{{ locale.name }}</nuxt-link
      >
      <button @click="currencyClick" class="text-sm font-bold text-mainBlue">
        {{ this.currency }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: ['cta'],
  computed: {
    ...mapState(['currency']),
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
  methods: {
    ...mapActions(['changeCurrency']),
    currencyClick() {
      this.changeCurrency();
    },
  },
};
</script>

<style lang="scss">
.cta {
  color: #212121;
  font-size: 0.95em;
  font-weight: 100;
}
</style>
