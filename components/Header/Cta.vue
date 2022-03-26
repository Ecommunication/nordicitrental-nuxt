<i18n>
{
  "en": {
    "language":"Language: ",
    "currency":"Currency: "
  },
  "da": {
    "language":"Sprog: ",
    "currency":"Valuta: "
  }
}
</i18n>

<template>
  <div class="flex w-full justify-between cta-header">
    <div class="space-x-2 flex">
      <p class="text-sm font-medium text-mainBlue">
        {{ $t('language') }}
        <nuxt-link
          class="font-bold"
          v-for="locale in availableLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          >{{ locale.name }}</nuxt-link
        >
      </p>
      <button @click="currencyClick" class="text-sm font-bold text-mainBlue">
        <span class="font-medium">{{ $t('currency') }}</span
        ><span>{{ this.currency }}</span>
      </button>
    </div>
    <span class="cta">
      <i class="fas fa-phone mr-2"></i>
      {{ cta }}
    </span>
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
  font-size: 1rem;
  font-weight: 100;
}

.cta-header {
  margin-left: 14px;
}
</style>
