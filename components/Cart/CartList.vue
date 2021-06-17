<template>
  <table class="cart-list">
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th class="col3">Vare</th>
        <th>Pris</th>
        <th>Antal</th>
        <th>Total</th>
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
            : Total lejeperiode:
            <span class="special">{{ item.noOfDays }}</span> dage. Fra:
            <span class="special">{{ item.startDate | formatDate }}</span> til
            <span class="special">{{ item.endDate | formatDate }}</span>
          </p>
        </td>
        <td class="product-price">
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
      border-radius: 100%;
      border: 1.5px solid #092d4f;
      color: #092d4f;
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
