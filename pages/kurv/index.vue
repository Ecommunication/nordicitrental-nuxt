<template>
  <div class="container">
    <div class="row">
      <div class="col" style="width: 100%;">
        <!-- TODO: img is missing -->
        <!-- <HeaderImg
        v-if="product.cover"
        :img="product.cover.image"
        :text="product.cover.text"
        :height="460"
      /> -->

        <div v-if="noOfItems">
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

        <div v-else>
          <div>Kurven er tom</div>
          <nuxt-link to="/">
            <div class="button btn-primary">
              Gå til produkter
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import CartList from "@/components/Cart/CartList";
import Breadcrumb from "@/components/Cart/Breadcrumb";
import Totals from "@/components/Cart/Totals";
import HeaderImg from "@/components/Utilities/HeaderImg";

export default {
  components: {
    CartList,
    Totals,
    HeaderImg,
    Breadcrumb
  },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["noOfItems"])
  },
  data() {
    return {
      cover: {
        text: "Bookinger",
        img: ""
      },
      errorAfterFetch: null
    };
  },
  methods: {
    ...mapActions(["switchPersistanceState"])
  }
};
</script>

<style lang="scss" scoped></style>
