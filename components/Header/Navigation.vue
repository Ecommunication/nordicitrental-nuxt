<template>
  <nav class="navigation">
    <div class="desktop-navigation">
      <div v-for="(item, index) in items" :key="index">
        <nuxt-link class="nav-item" :to="item.to">{{ item.label }}</nuxt-link>
      </div>
    </div>
    <div class="mobile-navigation">
      <select v-model="page">
        <option value="">Navigation</option>
        <option v-for="(item, index) in items" :key="index" :value="item.to">{{
          item.label
        }}</option>
      </select>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      page: "",
      items: [
        { to: "/produkt-kategori/ipads-og-tablets", label: "Produkter" },
        { to: "/services", label: "Services" },
        { to: "/om-nordicit-rental", label: "Om os" },
        { to: "/kurv", label: "Bookinger" },
        { to: "/kontakt", label: "Kontakt" }
      ]
    };
  },
  watch: {
    page(val) {
      console.log({ val });
      this.$router.push(val);
    }
  }
};
</script>

<style lang="scss">
.navigation {
  .desktop-navigation {
    display: flex;

    .nav-item {
      font-size: 0.8em;
      font-weight: 700;
      margin: 0 14px;
      transition: all 0.2s ease;
      -webkit-transition: all 0.2s ease;
    }
    .nav-item:hover {
      color: #326fa9;
    }
  }

  .mobile-navigation {
    display: none;
    width: 100%;
  }

  @media only screen and (max-width: 600px) {
    .desktop-navigation {
      display: none;
    }
    .mobile-navigation {
      display: block;
    }
  }
}
</style>
