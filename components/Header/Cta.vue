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
  <div class="cta-header">
    <div class="relative flex space-x-2">
      <div
        class="group my-auto flex cursor-pointer space-x-2 text-mainBlue" @click="langClick"
      >
        <img
          width="24px"
          :src="
            availableLocales.find((locale) => locale.code === $i18n.locale).img
          "
          alt="Vælg sprog"
        />
        <div
          v-if="langOpen"
          class="rounded-sm bg-white p-2 shadow-md absolute mt-9 z-10" style="width:130px;left:0;"
        >
          <div class="flex flex-col space-y-3">
            <div
              v-for="locale in availableLocales"
              :key="locale.code"
              class=""
            >
              <nuxt-link
                :key="locale.code"
                class="text-base font-medium flex space-x-2"
                :to="switchLocalePath(locale.code)"
                >
              <img width="24px" height="24px" :src="locale.img" alt="Vælg sprog" />
              <span>{{ locale.name }}</span>
            </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div
        class="group my-auto flex cursor-pointer space-x-2 text-mainBlue"
        @click="currencyClick"
      >
        <div
          class="flex justify-center rounded-full md:h-7 md:w-7"
        >
          <i class="fas fa-euro-sign fa-sm my-auto mr-1"></i>
        </div>
        <div
          v-if="currencyOpen"
          class="z-20 bg-white p-2 shadow-md absolute mt-8 ml-0" style="width: 130px;left:0;"
        >
          <div class="flex flex-col" v-for="currency in currencies" :key="currency.currency">
            <button class="text-base font-medium text-left" @click="changeCurrency(currency)">
              {{ currency.currency }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import * as EUicon from '~/assets/images/icons/languages/EU-Icon.png';
import * as DKicon from '~/assets/images/icons/languages/DK-Icon.png';
import * as UKicon from '~/assets/images/icons/languages/UK-Icon.png';
export default {
  props: ['cta'],
  data() {
    return {
      langOpen: false,
      currencyOpen: false,
    };
  },

  computed: {
    ...mapState(['currencies']),
    availableLocales() {
      return this.$i18n.locales.map((locale) => {
        switch (locale.code) {
          case 'da':
            return {
              ...locale,
              img: DKicon,
            };
          case 'en':
            return {
              ...locale,
              img: UKicon,
            };
        }
      });
    },
  },
  //   mounted() {
  //     // On initial load, if the locale is EN set the default currency to EUR
  //   if(this.$i18n.locale === 'en') {
  //     this.changeCurrency({currency: 'EURO'});
  //   }
  // },
  methods: {
    ...mapActions(['changeCurrency']),
    currencyClick() {
      // this.changeCurrency();
      this.currencyOpen = !this.currencyOpen;
      this.langOpen = false
    },
    langClick() {
      this.langOpen = !this.langOpen;
      this.currencyOpen = false;
    },
  },

};

</script>
