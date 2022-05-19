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
  <div class="cta-header my-2 inline-flex space-x-8">
    <span class="cta my-auto">
      {{ cta }}
    </span>
    <div class="relative flex space-x-6" >
      <!-- <div
        class="group my-auto flex cursor-pointer space-x-2 text-mainBlue" @click="langClick"
      >
        <img
          width="24px"
          :src="
            availableLocales.find((locale) => locale.code === $i18n.locale).img
          "
        />
        <i
          :class="`fas fa-chevron-down my-auto transform transition-transform duration-300 ${
            langOpen && 'rotate-180'
          } group-hover:text-opacity-50`"
        ></i>
        <div
          v-if="langOpen"
          class="absolute top-8 z-20 rounded-sm bg-white p-2 shadow-md"
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
              <img width="24px" height="24px" :src="locale.img" />
              <span>{{ locale.name }}</span>
            </nuxt-link
              >
            </div>
          </div>
        </div>
      </div> -->
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
