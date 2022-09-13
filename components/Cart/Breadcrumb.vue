<i18n>
{
  "en": {
"bookings":"Bookings",
"order":"Order",
"receipt":"Receipt"
  },
  "da":{
"bookings":"Bookinger",
"order":"Ordre",
"receipt":"Kvittering"
  }
}
</i18n>

<template>
  <div class="breadcrumb">
    <ul v-for="(item, index) in items" :key="index">
      <li
        class="breadcrumb-item"
        :class="`
        ${path === item.path ? 'selected' : ''}
        ${index === 0 ? 'first-child' : ''}
        ${index === items.length - 1 ? 'last-child' : ''}
        `"
      >
        <div class="selected-icon"></div>
        <i class="interceptor">{{ index + 1 }}.</i>
        {{ $t(item.label) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: '',
      items: [
        { label: 'bookings', path: '/kurv' },
        { label: 'order', path: '/kurv/ordre' },
        { label: 'receipt', path: '/kurv/kvittering' },
      ],
    };
  },
  created() {
    const { path } = this.$route;
    this.path = path;
  },
};
</script>
