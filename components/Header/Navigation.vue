<i18n>
{
  "en": {
    "products": "Products"
  },
  "da":{
    "products": "Produkter"

  }
}
</i18n>

<template>
  <nav class="navigation">
    <div class="desktop-navigation">
      <div class="nav-item">
        <div
          class="item-label text-blue"
          @click="throwMainMenuEvent('product')"
        >
          {{ $t('products') }}
        </div>
      </div>

      <div v-for="(nav, index) in navigation" :key="index">
        <div class="nav-item">
          <div
            class="item-label text-blue"
            @click="clickedMainMenu(index, nav)"
          >
            {{ nav.label }}
          </div>
          <div v-if="showDropdown === index" class="sub-menu">
            <nuxt-link
              :to="item.link"
              class="item-label col-item"
              v-for="(item, index) in nav.items"
              :key="index"
            >
              <div
                style="display: flex; justify-content: space-between"
                @mouseenter="() => (hover = index)"
                @mouseleave="() => (hover = null)"
              >
                <div class="mr-2">{{ item.label }}</div>
                <div class="hover-icon">
                  <img
                    v-if="hover === index"
                    :src="require('@/assets/images/icons/menu/hover.svg')"
                  />
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    showDropdown: {
      type: Number | Boolean | String,
      required: true,
    },
    navigation: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      hover: null,
    };
  },
  mounted() {
    document.addEventListener('click', (e) => {
      e.stopPropagation();
      const isItemLabel = e.target.className.includes('item-label');
      if (!isItemLabel) {
        // close menu
        this.throwMainMenuEvent(false);
      }
    });
  },
  methods: {
    clickedMainMenu(navIndex, nav) {
      if (!nav.items.length) {
        this.goTo(nav.link);
      } else {
        this.throwMainMenuEvent(navIndex);
      }
    },
    goTo(path) {
      this.throwMainMenuEvent(false);
      this.$router.push(path);
    },
    throwMainMenuEvent(val) {
      this.$emit('onClickMainMenu', val);
    },
  },
};
</script>
