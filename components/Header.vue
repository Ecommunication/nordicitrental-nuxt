<template>
  <div>
    <header class="main-header grid-small">
      <nuxt-link to="/" class="logo">
        <img class="" :src="header.logo.src" :alt="header.logo.altText" />
      </nuxt-link>

      <div class="right-col">
        <div class="mb-2">
          <HeaderCart />
        </div>

        <div class="mb-5 px-3">
          <HeaderCta :cta="header.telephone" />
        </div>

        <div class="mb-2">
          <HeaderNavigation
            :navigation="navList"
            :showDropdown="showDropdown"
            @onClickMainMenu="val => (showDropdown = val)"
          />
          <HeaderMobileNavigation :items="mobileMenu" />
        </div>
      </div>
    </header>
    <HeaderFullMenu
      :show="showDropdown === 'product'"
      :items="categories"
      @onClickMainMenu="val => (showDropdown = val)"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    header: { type: Object, required: true }
  },
  computed: {
    ...mapState(["navigation"]),
    categories() {
      const arr =
        this.navigation?.Products && this.navigation.Products.length
          ? this.navigation.Products[0]
          : {};
      const categories = arr.Products || [];

      return categories.map(category => category.product_categories);
    },
    navList() {
      return this.navigation.NavSingle.map(nav => {
        const items = nav.NavSingleR.map(e => ({
          label: e.Title,
          link: nav.Rooturl
        }));

        return {
          label: nav.RootTitle,
          link: nav.Rooturl,
          items
        };
      });
    },
    mobileMenu() {
      const menus = [];

      const products = {
        label: "Produkter",
        link: "#",
        items: this.categories.map(category => {
          const copiedCategory = JSON.parse(JSON.stringify(category))
          const categoryProduct = copiedCategory.shift() || {};

          return {
            label: categoryProduct.Name || "",
            link: `/produkt-kategori/${categoryProduct.Slug}`,
            items: copiedCategory.map(product => {
              return {
                label: product.Name || "",
                link: `/produkt/${product.Slug}`
              };
            })
          };
        })
      };

      menus.push(products);

      this.navList.forEach(nav => {
        menus.push(nav)
      });

      return menus;
    }
  },
  data() {
    return {
      showDropdown: false
    };
  }
};
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 10px;

  .logo {
    margin-top: 15px;
    width: 290px;
    height: auto;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .right-col {
    text-align: right;
  }
}

@media only screen and (max-width: 600px) {
  .main-header {
    justify-content: center;

    .right-col {
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>
