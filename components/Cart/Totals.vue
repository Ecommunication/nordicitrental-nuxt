<i18n>
{
  "en": {
    "total":"Total",
    "delivery":"Shipping and handling",
    "yesDelivery": "Yes please, i want delivery and pickup: kr. 800",
    "noPickup":"I want to pickup and return to Nordic IT Rental in Ballerup",
    "vat": "Vat"
  },
  "da": {
    "total":"Total",
    "delivery":"Fragt og håndtering",
    "yesDelivery": "Ja tak, jeg ønsker levering og afhentning: kr. 800",
    "noPickup":"Jeg ønsker at afhente og returnere hos Nordic IT Rental i Ballerup",
    "vat": "Moms"
  }
}
</i18n>

<template>
  <div class="cart-totals">
    <h3 class="cart-totals-title text-blue">{{ $t('total') }}</h3>

    <div class="cart-totals-table">
      <div class="cart-row">
        <div class="cart-col table-key">{{ $t('delivery') }}</div>
        <div class="cart-col table-value">
          <div>
            <div class="mb-2">
              <input
                class="radio-button"
                type="radio"
                :checked="option === 'delivery'"
                @click="
                  () => {
                    option = 'delivery';
                    setShipmentMethod('delivery');
                  }
                "
              />
              <label>{{ $t('yesDelivery') }}</label>
            </div>
            <div>
              <input
                class="radio-button"
                type="radio"
                :checked="option === 'pick-up'"
                @click="
                  () => {
                    option = 'pick-up';
                    setShipmentMethod('pick-up');
                  }
                "
              />
              <label>{{ $t('noPickup') }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-row">
        <div class="cart-col table-key">{{ $t('vat') }}</div>
        <div class="cart-col table-value">
          {{ vat | formatPrice }}
        </div>
      </div>

      <div class="cart-row">
        <div class="cart-col table-key">{{ $t('total') }}</div>
        <div class="cart-col table-value">
          {{ afterTax | formatPrice }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['vat', 'afterTax']),
  },
  data() {
    return {
      option: '',
    };
  },
  methods: {
    ...mapActions(['setShipmentMethod']),
  },
  created() {
    this.option = this.cart.shipping.method;
  },
};
</script>

<style lang="scss" scoped>
.cart-totals {
  padding: 20px 0 30px 0;
  font-size: 0.8em;

  .cart-totals-title {
    margin-bottom: 8px;
    margin-left: 16px;
  }

  .cart-totals-table {
    border-top: 2px solid #f5f5f5;
    .cart-row {
      display: flex;
      .cart-col {
        padding: 10px 16px;
      }

      .table-key {
        width: 30%;
      }
      .table-value {
        width: 70%;
      }
    }
  }
}
.radio-button {
  width: initial;
}
</style>
