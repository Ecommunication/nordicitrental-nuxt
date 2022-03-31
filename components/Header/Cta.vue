<i18n>
{
  "en": {
    "language":"Choose language",
    "currency":"Choose currency"
  },
  "da": {
    "language":"Vælg sprog",
    "currency":"Vælg valuta"
  }
}
</i18n>

<template>
  <div class="cta-header mb-2 flex w-full space-x-8">
    <span class="cta my-auto">
      <i class="fas fa-phone mr-2"></i>
      {{ cta }}
    </span>
    <div class="relative flex space-x-6">
      <div
        class="group my-auto flex cursor-pointer space-x-2 text-mainBlue"
        @click="langClick"
      >
        <i class="fas fa-globe-europe fa-lg text-center"></i>
        <i
          :class="`fas fa-chevron-down transform transition-transform duration-300 ${
            langOpen && 'rotate-180'
          } group-hover:text-opacity-50`"
        ></i>
        <div
          v-if="langOpen"
          class="absolute top-8 z-20 rounded-sm bg-white p-2 shadow-md"
        >
          <div class="flex flex-col">
            <nuxt-link
              class="text-base font-medium"
              v-for="locale in availableLocales"
              :key="locale.code"
              :to="switchLocalePath(locale.code)"
              >{{ locale.name }}</nuxt-link
            >
          </div>
        </div>
      </div>
      <div
        class="group my-auto flex cursor-pointer space-x-2 text-mainBlue"
        @click="currencyClick"
      >
        <div
          class="flex justify-center rounded-full border-2 border-mainBlue p-1 md:h-7 md:w-7"
        >
          <i class="fas fa-euro-sign fa-sm my-auto mr-1"></i>
        </div>
        <i
          :class="`fas fa-chevron-down my-auto transform transition-transform duration-300 ${
            currencyOpen && 'rotate-180'
          } group-hover:text-opacity-50`"
        ></i>
        <div
          v-if="currencyOpen"
          class="absolute top-8 z-20 bg-white p-2 shadow-md"
        >
          <div class="flex flex-col">
            <button class="text-base font-medium" @click="changeCurrency">
              {{ this.currency }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: ['cta'],
  data() {
    return { langOpen: false, currencyOpen: false };
  },
  computed: {
    ...mapState(['currency']),
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
  methods: {
    ...mapActions(['changeCurrency']),
    currencyClick() {
      // this.changeCurrency();
      this.currencyOpen = !this.currencyOpen;
    },
    langClick() {
      this.langOpen = !this.langOpen;
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
