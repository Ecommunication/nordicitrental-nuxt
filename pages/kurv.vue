<template>
  <!-- About Us -->
  <div>
    <CartList :cart="cart" />

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
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartList from "@/components/Cart/CartList";
import BackgroundImg from "@/components/Utilities/BackgroundImg";

export default {
  components: {
    CartList,
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
  async fetch() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
