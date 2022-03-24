<i18n>
{
  "en": {
    "subtotal":"Subtotal:",
    "shipping":"Shipping:",
    "vat":"Vat:",
    "paymentMethod":"Payment method:",
    "total":"Total:",
    "notice": "Notice:",
    "cvr":"CVR NUMBER:"
  },
  "da": {
    "subtotal":"Subtotal:",
    "shipping":"Forsendelse:",
    "vat":"Moms:",
    "paymentMethod":"Betalingsmetode:",
    "total":"Total:",
    "notice": "Bemærkning:",
    "cvr":"CVR NUMMER:"
  }
}
</i18n>

<template>
  <div>
    <Table style="font-size: 0.8em">
      <tr>
        <td class="td-left">{{ $t('subtotal') }}</td>
        <td class="td-right">{{ details.subtotal | formatPrice }}</td>
      </tr>
      <tr>
        <td class="td-left">{{ $t('shipping') }}</td>
        <td class="td-right">{{ details.shipping | formatPrice }}</td>
      </tr>
      <tr>
        <td class="td-left">{{ $t('vat') }}</td>
        <td class="td-right">{{ details.vat | formatPrice }}</td>
      </tr>
      <tr>
        <td class="td-left">{{ $t('paymentMethod') }}</td>
        <td class="td-right">{{ details.paymentMethod }}</td>
      </tr>
      <tr>
        <td class="td-left">{{ $t('total') }}</td>
        <td class="td-right">{{ details.total | formatPrice }}</td>
      </tr>
      <tr>
        <td class="td-left">{{ $t('notice') }}</td>
        <td class="td-right">{{ details.remark }}</td>
      </tr>
      <tr>
        <td class="td-left">{{ $t('cvr') }}</td>
        <td class="td-right">{{ details.cvr }}</td>
      </tr>
    </Table>
  </div>
</template>

<script>
import Table from '@/components/Cart/Order/Table';
export default {
  components: {
    Table,
  },
  props: {
    details: { type: Object, required: true },
  },
};
</script>
