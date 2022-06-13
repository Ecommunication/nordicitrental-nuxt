<i18n>
{
  "en": {
  "product":"PRODUCT:",
  "total":"TOTAL",
  "bookingdetails":"Booking details",
  "totalperiod":"Total renting period: ",
  "daysFrom": " days. From: ",
  "to":" to ",
  "options":"Options"
  },
  "da":{
  "product":"VARE:",
  "total":"TOTAL",
  "bookingdetails":"Booking detailjer",
  "totalperiod": "Total lejeperiode: ",
  "daysFrom": " dage. Fra: ",
  "to":" til ",
  "options":"Tilvalg"
  }
}
</i18n>

<template>
  <table>
    <tr>
      <td class="td-left" style="font-weight: 600">{{ $t('product') }}</td>
      <td class="td-right" style="font-weight: 600">{{ $t('total') }}</td>
    </tr>
    <tr v-for="(item, index) in items" :key="index">
      <td class="td-left">
        <div>
          <div>
            <nuxt-link :to="localPath(`/produkt/${item.slug}`)">
              <span>{{ item.amount }}x</span> {{ item.title }}
            </nuxt-link>
          </div>
          <div class="booking-details">
            <div style="font-weight: 600">{{ $t('bookingdetails') }}</div>
            <div>
              {{ $t('totalperiod') }}{{ item.noOfDays }}{{ $t('daysFrom') }}
              {{ item.startDate | formatDate }}{{ $t('to') }}
              {{ item.endDate | formatDate }}
            </div>
            <div class="product-options mt-2" v-if="item.options.length">
              <div style="font-weight: 600">{{ $t('options') }}</div>
              <div v-for="(option, index) in item.options" :key="index">
                {{ option.ProductName }}
              </div>
            </div>
          </div>
        </div>
      </td>
      <td class="td-right">{{ item.total | formatPrice }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
  },
};
</script>

<style lang="scss" scoped>
a:hover {
  font-weight: bold;
}
table {
  width: 100%;
  font-size: 0.8em;
}
tr {
  color: #091d4f;
}

td {
  padding: 10px 20px;
  text-align: left;
}
td.td-left {
  width: 61%;
}
td.td-right {
  width: 39%;
}
.booking-details {
  font-size: 0.8em;
  padding: 10px 20px;
}

@media only screen and (max-width: 767px) {
  table {
    font-size: 1em;
  }
}
</style>
