import Vue from 'vue';

export default ({ app }, inject) => {
  const formatPrice = (val) => {
    if (app.store.state.currencies.find((c) => c.active).currency === 'EURO') {
      const formattedPrice = new Intl.NumberFormat('en-US').format(
        parseFloat(val / 7.5).toFixed(2)
      );
      return '€ ' + formattedPrice;
    } else {
      const formattedPrice = new Intl.NumberFormat('da-DK').format(
        parseInt(val)
      );
      return 'Kr. ' + formattedPrice + ',-';
    }
  };
  Vue.filter('formatPrice', formatPrice);
};
