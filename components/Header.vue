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
          <HeaderNavigation />
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    header: { type: Object, required: true }
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
