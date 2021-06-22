<template>
  <table class="cart-list">
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th class="table-header-cell col3">Vare</th>
        <th class="table-header-cell">Pris</th>
        <th class="table-header-cell">Antal</th>
        <th class="table-header-cell">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr class="table-row" v-for="item in cart" :key="item.itemId">
        <td>
          <div @click="onDeleteItem(item.itemId)" class="product-remove">
            x
          </div>
        </td>
        <td class="product-thumbnail">
          <nuxt-link :to="`/produkt/${item.product.info.slug}`">
            <img
              v-if="item.product.gallery.main"
              width="220"
              height="220"
              class="product-thumbnail-image"
              :src="item.product.gallery.main"
            />
          </nuxt-link>
        </td>
        <td>
          <nuxt-link :to="`/produkt/${item.product.info.slug}`"
            ><div class="product-name">
              {{ item.product.info.name }}
            </div></nuxt-link
          >
          <p class="booking-date">
            <span>
              Total lejeperiode:
              <span class="special">{{ item.noOfDays }}</span> dage.  <br />
              Fra:
              <span class="special">{{ item.startDate | formatDate }}</span> til
              <span class="special">{{ item.endDate | formatDate }}</span>
            </span>
            <br />
            <br />
            <span v-if="item.productOptions.length">
              <span class="text-blue">Tilvalg</span>
              <span v-for="(opts, index) in item.productOptions" :key="index">
                <span> <br> {{opts.name}} </span>
              </span>
            </span>
          </p>
        </td>
        <td class="product-price" style="min-width: 100px;">
          {{ (item.price / item.amount) | formatPrice }}
        </td>
        <td class="product-quantity">
          <AmountPicker
            :amount="item.amount"
            @changed="amount => onAmountPickerChange(item.itemId, amount)"
          />
        </td>
        <td class="product-subtotal">
          {{ item.price | formatPrice }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions } from "vuex";
import AmountPicker from "@/components/Utilities/AmountPicker";
export default {
  components: { AmountPicker },
  props: {
    cart: { type: Array, required: true }
  },
  methods: {
    ...mapActions(["updateAmount", "deleteItem"]),
    async onAmountPickerChange(itemId, amount) {
      await this.updateAmount({ itemId, amount });
    },
    async onDeleteItem(itemId) {
      await this.deleteItem(itemId);
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-list {
  font-size: 0.8em;
  padding: 40px 0 20px 0;

  th {
    border: 1px solid #f5f5f5;
  }

  .table-header-cell {
    text-align: left;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 400;
    color: #092d4f;
  }

  .col3 {
    width: 385px;
  }


  .table-row {
    .product-remove {
      font-weight: 600;
      padding: 6px 12px 9px 12px;
      cursor: pointer;
      border: 1.5px solid white;
    }

    .product-remove:hover {
      color: brown;
    }

    .product-name {
    }
    .booking-date {
      font-size: 0.85em;
    }

    .product-subtotal {
      width: 105px;
    }

    td {
      padding: 0 15px;
    }
  }
}
</style>
