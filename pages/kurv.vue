<template>
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

    <div class="breadcrumb"></div>

    <CartList :cart="cart.items" />
    <div style="width: 80%; margin-left: auto; margin-right: auto;">
      <div class="button btn-block btn-primary">Udfør booking</div>
      <Totals :cart="cart" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartList from "@/components/Cart/CartList";
import Totals from "@/components/Cart/Totals";
import BackgroundImg from "@/components/Utilities/BackgroundImg";

export default {
  components: {
    CartList,
    Totals,
    BackgroundImg
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
  async fetch() {}
};
</script>

<style lang="scss" scoped>
.booking {
  margin: 0 auto;
  max-width: 1200px;
}
</style>
