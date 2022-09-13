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
  <table class="item-details">
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
