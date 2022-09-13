<i18n>
{
  "en": {
"billingaddress": "Billing address",
"shippingaddress":"Shipping address"
  },
  "da": {
"billingaddress": "Faktureringsadresse",
"shippingaddress":"Leveringsadresse"
  }
}
</i18n>

<template>
  <Table class="addresses-table">
    <tr style="background: none">
      <td class="table-title">
        <h2>{{ $t('billingaddress') }}</h2>
      </td>
      <td class="table-title">
        <h2 class="pl-4">{{ $t('shippingaddress') }}</h2>
      </td>
    </tr>
    <tr>
      <td class="td-left">
        <div>{{ addresses.billing }}</div>
      </td>
      <td class="td-right">
        <div>{{ addresses.shipping }}</div>
      </td>
    </tr>
  </Table>
</template>

<script>
import Table from '@/components/Cart/Order/Table';
export default {
  components: {
    Table,
  },
  props: {
    addresses: { type: Object, required: true },
  },
};
</script>
