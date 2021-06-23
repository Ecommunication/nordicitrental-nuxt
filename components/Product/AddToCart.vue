<template>
  <div>
    <div v-if="options.length" class="mb-5">
      <p class="title mb-2">Tilføj Tilvalg:</p>

      <div v-for="(option, index) in options" :key="index">
        <CheckboxRounded
          v-if="option.key === OPTIONS.MICROSOFT_OFFICE"
          :label="option.option.Name"
          :input="option.value"
          @changed="val => (option.value = val)"
        />
      </div>
    </div>

    <p class="title">Vælg lejeperiode:</p>
    <client-only>
      <div class="date-picker-container">
        <div>
          <div class="date-picker-label">Start</div>
          <date-picker
            class="date-picker"
            v-model="start"
            valueType="date"
            format="DD/M/YYYY"
            :disabled-date="disableBeforeToday"
          ></date-picker>
        </div>

        <div>
          <div class="date-picker-label">Slut</div>
          <date-picker
            class="date-picker"
            v-model="end"
            valueType="date"
            format="DD/M/YYYY"
            :disabled-date="disableBeforeStartDatePlusAWeek"
          ></date-picker>
        </div>
      </div>
    </client-only>

    <div class="price">
      {{ price | formatPrice }}
    </div>

    <div class="days">Total lejeperiode: {{ noOfDays }} dage</div>
    <div class="alert" v-show="!canBePlaced">
      Lejeperioden skal bestå af min. 8 dage
    </div>

    <div class="actions mt-8">
      <AmountPicker :amount="amount" @changed="onAmountPickerChange" />
      <div
        class="add-to-cart ml-3 button btn-primary"
        :class="canBePlaced ? '' : 'btn-disabled'"
        @click="submit"
      >
        TILFØJ TIL KURV
      </div>
    </div>

    <!-- <div class="mt-10">{{ time }} | {{ noOfDays }}</div> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DatePicker from "vue2-datepicker";
import AmountPicker from "@/components/Utilities/AmountPicker";
import CheckboxRounded from "@/components/Utilities/Form/CheckboxRounded";
import "vue2-datepicker/index.css";
export default {
  components: {
    DatePicker,
    AmountPicker,
    CheckboxRounded
  },
  props: {
    dailyPrice: { type: Number, required: true },
    weeklyPrice: { type: Number, required: true },
    product: { type: Object, required: true }
  },
  computed: {
    /* Options */
    microsoftOfficeOption() {
      const microsoftOfficeOption = this.options.find(
        o => o.key === this.OPTIONS.MICROSOFT_OFFICE
      );
      return microsoftOfficeOption || {};
    },
    microsoftOfficeUnitPrice() {
      return this.microsoftOfficeOption.value
        ? this.microsoftOfficeOption.option.FixedPrice
        : 0;
    },
    /* Add Options here */

    noOfDays() {
      const dayDifference = this.dayDifference(this.start, this.end) + 1;
      return dayDifference > 0 ? dayDifference : 0;
    },
    unitPrice() {
      const productPrice = this.calculatePrice(
        this.dailyPrice,
        this.weeklyPrice,
        this.noOfDays
      );

      return (
        productPrice +
        this.microsoftOfficeUnitPrice /* + add addional options here */
      );
    },
    price() {
      return this.unitPrice * this.amount;
    },
    canBePlaced() {
      return this.noOfDays > 7;
    },
    productId() {
      return this.product.info.id;
    }
  },
  data() {
    return {
      OPTIONS: {
        MICROSOFT_OFFICE: "microsoft-office"
      },
      start: new Date(new Date().toDateString()),
      end: this.shiftDateXDays(new Date(), 7),
      amount: 1,
      options: []
    };
  },
  created() {
    console.log(this.product.options);
    this.options = this.product.options.map(o => ({
      option: o,
      key: o.ProductSlug,
      value: null
    }));
  },
  methods: {
    ...mapActions(["addToCart"]),
    onAmountPickerChange(amount) {
      this.amount = parseInt(amount);
    },
    // days can be -x, +x
    shiftDateXDays(date, days) {
      const DAY = 1 * 24 * 60 * 60 * 1000;
      return new Date(new Date(date.getTime() + days * DAY).toDateString());
    },
    disableBeforeToday(date) {
      const today = new Date(new Date().toDateString());
      return date < today;
    },
    disableBeforeStartDatePlusAWeek(date) {
      const startDate = new Date(this.start);
      const nextWeekDate = this.shiftDateXDays(startDate, 7);
      return date < nextWeekDate;
    },
    calculatePrice(dailyPrice, weeklyPrice, days) {
      if (!days) return weeklyPrice;
      const NO_OF_DAYS_IN_WEEK = 8;
      const price =
        days <= NO_OF_DAYS_IN_WEEK
          ? parseFloat(weeklyPrice)
          : parseFloat(weeklyPrice) +
            parseFloat(dailyPrice) * (days - NO_OF_DAYS_IN_WEEK);
      return price;
    },
    dayDifference(date1, date2) {
      const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
      const d1 = new Date(date1).getTime();
      const d2 = new Date(date2).getTime();
      const diffInMs = d2 - d1;
      const diffInDays = diffInMs / ONE_DAY_IN_MS;
      return diffInDays;
    },
    submit() {
      if (!this.canBePlaced) return;

      const payload = {
        productId: this.productId,
        amount: this.amount,
        unitPrice: this.unitPrice,
        price: this.price,
        noOfDays: this.noOfDays,
        startDate: this.start,
        endDate: this.end,
        product: this.product,
        productOptions: this.options
          .filter(o => o.value)
          .map(o => ({
            id: o.option.id,
            name: o.option.Name,
            price: o.option.FixedPrice
          }))
      };

      console.log(payload);
      this.addToCart(payload);
      this.$emit("addedToCart", payload);
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: 600;
  font-size: 0.8em;
  margin-bottom: 16px;
}
.date-picker-container {
  display: flex;
  .date-picker-label {
    font-size: 0.8em;
  }
  .date-picker {
    width: 75%;
  }
}
.price {
  margin-top: 23px;
  color: #092d4f;
  font-size: 1.5em;
  font-weight: bold;
}
.days {
  font-size: 16px;
}

.alert {
  font-size: 16px;
  color: red;
}

.actions {
  display: flex;
  input[type="number"]::-webkit-inner-spin-button {
    opacity: 1;
  }
  .amount-picker {
    padding: 10px 5px 10px 10px;
    font-size: 1em;
    width: 65px;
  }

  .add-to-cart {
    padding: 15px 25px;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 5px;
  }
}
</style>
