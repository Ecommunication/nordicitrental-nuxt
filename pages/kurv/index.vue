<template>
  <div class="container">
    <div class="booking">
      <!-- TODO: img is missing -->
      <BackgroundImg
        v-if="cover.img"
        :minHeight="470"
        :src="cover.img | imgUrl"
        style="display: flex; align-items: center;"
      >
        <template v-slot:body>
          <h1 class="slider-title title-white">{{ cover.text }}</h1>
        </template>
      </BackgroundImg>

      <Breadcrumb class="mt-16 mb-4" />

      <CartList :cart="cart.items" />

      <nuxt-link to="/kurv/ordre">
        <div
          class="button btn-block btn-primary mt-2 mb-2"
          style="border-radius: 7px;"
        >
          Udfør booking
        </div>
      </nuxt-link>
      <Totals :cart="cart" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CartList from "@/components/Cart/CartList";
import Breadcrumb from "@/components/Cart/Breadcrumb";
import Totals from "@/components/Cart/Totals";
import BackgroundImg from "@/components/Utilities/BackgroundImg";

export default {
  components: {
    CartList,
    Totals,
    BackgroundImg,
    Breadcrumb
  },
  computed: {
    ...mapState(["cart"])
  },
  data() {
    return {
      cover: {
        text: "Bookinger",
        img: ""
      },
      errorAfterFetch: null,
      apiUrl: process.env.apiUrl
    };
  },
  methods: {
    ...mapActions(["switchPersistanceState"])
  },
  async fetch() {}
};
</script>

<style lang="scss" scoped>
.booking {
  padding-bottom: 15px;
}
</style>
