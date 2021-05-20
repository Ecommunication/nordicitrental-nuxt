<template>
  <div>
    <p class="title">Vælg lejeperiode:</p>
    <div class="date-picker-container">
      <date-picker
        class="date-picker"
        v-model="time"
        range
        valueType="date"
        format="DD/M/YYYY"
      ></date-picker>
    </div>

    <div class="price">
      {{ price | formatPrice }}
    </div>

    <div class="days">Total lejeperiode: {{ noOfDays }} dage</div>

    <div class="actions mt-10">
      <input
        class="amount-picker"
        type="number"
        step="1"
        min="1"
        v-model="amount"
      />
      <div class="add-to-cart ml-3 button btn-primary">TILFØJ TIL KURV</div>
    </div>

    <div class="mt-10">{{ time }} | {{ noOfDays }}</div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  components: {
    DatePicker
  },
  props: {
    dailyPrice: { type: String, required: true },
    weeklyPrice: { type: String, required: true }
  },
  computed: {
    noOfDays() {
      return this.time && this.time.length
        ? this.dayDifference(this.time[0], this.time[1])
        : 0;
    },
    price() {
      const unitPrice = this.calculatePrice(
        this.dailyPrice,
        this.weeklyPrice,
        this.noOfDays
      );
      return unitPrice * this.amount
    }
  },
  data() {
    return {
      time: null,
      amount: 1
    };
  },
  methods: {
    calculatePrice(dailyPrice, weeklyPrice, days) {
      if (!days) return weeklyPrice; // todo: ask the business logic for this case
      const NO_OF_DAYS_IN_WEEK = 7;
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
  text-align: left;
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
