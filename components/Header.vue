<template>
  <div>
    <header ref="header" class="main-header grid-small" style="max-width: 1024px;">
      <div class="cart-in-mobile space-y-4">
        <HeaderCart />
        <HeaderCta :cta="header.telephone" class="float-left" />
      </div>
      <nuxt-link :to="localePath('/')" class="logo">
        <nuxt-img
          format="webp"
          :src="header.logo.src"
          :alt="header.logo.altText"
        />
      </nuxt-link>

      <div class="right-col">
        <div class="cart-in-desktop flex mt-5">
          <HeaderCta :cta="header.telephone" />
          <div class="ml-1">
            <i class="fa fa-search cursor-pointer" @click="showSearch = !showSearch"></i>
          </div>
          <div class="cta-phone">
            <a href="tel: +45 71998904">Tlf.: +45 71998904</a>
          </div>
          <HeaderCart />
        </div>

        <div class="mb-2 mt-auto">
          <HeaderNavigation
            :navigation="navList"
            :showDropdown="showDropdown"
            @onClickMainMenu="(val) => (showDropdown = val)"
          />
          <HeaderMobileNavigation :items="mobileMenu" />
        </div>
      </div>
    </header>

    <!-- Minified -->
    <div class="minified-header" v-show="minifiedHeader">
      <div class="minified-wrapper">
        <nuxt-link :to="localePath('/')" class="minified-logo">
          <img class="" :src="header.logo.src" :alt="header.logo.altText" />
        </nuxt-link>
        <div class="minified-navigation">
          <HeaderNavigation
            style="font-size: 16.5px"
            :navigation="navList"
            :showDropdown="showDropdown"
            @onClickMainMenu="onClickMainMenu"
          />
          <HeaderMobileNavigation :items="mobileMenu" />
        </div>
        <div class="minified-cart ml-3">
          <HeaderCart />
        </div>
      </div>
    </div>

    <HeaderFullMenu
      :show="showDropdown === 'product'"
      :items="categories"
      @onClickMainMenu="(val) => (showDropdown = val)"
    />
    <HeaderSearch :categories="categories" class="search-bar-top" v-show="showSearch" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    header: { type: Object, required: true },
  },
  computed: {
    ...mapState(['navigation']),
    categories() {
      const arr =
        this.navigation?.Products && this.navigation.Products.length
          ? this.navigation.Products[0]
          : {};
      const categories = arr.Products || [];

      return categories.map((category) => category.product_categories);
    },
    navList() {
      return this.navigation.NavSingle.map((nav) => {
        const items = nav.NavSingleR.map((e) => ({
          label: e.Title,
          link: nav.Rooturl + (e.Url || ''),
        }));

        return {
          label: nav.RootTitle,
          link: nav.Rooturl,
          items,
        };
      });
    },
    mobileMenu() {
      const menus = [];

      const products = {
        label: 'Produkter',
        link: '#',
        items: this.categories.map((category) => {
          const copiedCategory = JSON.parse(JSON.stringify(category));
          const categoryProduct = copiedCategory.shift() || {};

          return {
            label: categoryProduct.Name || '',
            link: `/produkt-kategori/${
              categoryProduct.CustomPermalink || categoryProduct.Slug
            }`,
            items: copiedCategory.map((product) => {
              return {
                label: product.Name || '',
                link: `/produkt-kategori/${
                  product.CustomPermalink || product.Slug
                }`,
              };
            }),
          };
        }),
      };

      menus.push(products);

      this.navList.forEach((nav) => {
        menus.push(nav);
      });

      return menus;
    },
  },
  data() {
    return {
      showDropdown: false,
      headerHeight: 0,
      minifiedHeader: false,
      showSearch: true,
    };
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    const { header: headerEl } = this.$refs;
    this.headerHeight = headerEl.clientHeight;
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      const pageTopCoordinate = window.scrollY;
      this.minifiedHeader = pageTopCoordinate > this.headerHeight;
    },
    scrollTop() {
      window.scrollTo(0, 0);
    },
    onClickMainMenu(val) {
      if (val === 'product') {
        this.scrollTop();
      }
      this.showDropdown = val;
    },
  },
};
</script>
