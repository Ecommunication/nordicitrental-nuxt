<template>
  <ClientOnly>
    <div class="checkout-cart">
      <HeaderImg
        v-if="data.ImageCover"
        :img="data.ImageCover.url | formatImage"
        :text="data.TextCover"
      />
      <div class="container">
        <div class="row">
          <div class="col" style="width: 100%">
            <div v-if="noOfItems">
              <Breadcrumb class="breadcrumb-el" />

              <CartList :cart="cart.items" />

              <nuxt-link :to="localePath('/kurv/ordre')">
                <div
                  class="button btn-block btn-primary mt-2 mb-2"
                  style="border-radius: 7px"
                >
                  {{ data.CompleteBooking }}
                </div>
              </nuxt-link>
              <Totals :cart="cart" />
            </div>

            <div v-else class="cart-empty py-10 text-center">
              <h1 class="text-blue">{{ data.EmptyCart }}</h1>

              <img
                class="mx-auto mt-10 mb-10"
                src="~/assets/images/icons/empty-cart.svg"
                width="150px"
                alt=""
              />

              <nuxt-link :to="localePath('/alle-produktkategorier')">
                <div class="button btn-primary">{{ data.GoToProducts }}</div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import CartList from '@/components/Cart/CartList';
import Breadcrumb from '@/components/Cart/Breadcrumb';
import Totals from '@/components/Cart/Totals';
import HeaderImg from '@/components/Utilities/HeaderImg';

export default {
  components: {
    CartList,
    Totals,
    HeaderImg,
    Breadcrumb,
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['noOfItems']),
  },
  head() {
    return {
      title: 'Nordic IT Rental',
      meta: [
        {
          name: 'title',
          content: this.data.MetaTitle || '',
        },
        {
          name: 'description',
          content: this.data.MetaDescription || '',
        },
      ],
    };
  },
  data() {
    return {
      cover: {
        text: 'Bookinger',
        img: '',
      },
      errorAfterFetch: null,
    };
  },
  methods: {
    ...mapActions(['switchPersistanceState']),
  },
  async asyncData({ params, $axios, i18n }) {
    const data = await $axios.$get(`/kurv?_locale=${i18n.locale}`);
    return { data };
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb-el {
  margin: 60px 0 10px 0;
}
@media only screen and (max-width: 767px) {
  .breadcrumb-el {
    margin: 8px 0 20px 0;
  }
}
</style>
