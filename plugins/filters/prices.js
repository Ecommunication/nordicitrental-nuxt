import Vue from "vue";

export default ({ app }, inject) => {
  const formatPrice = (val) => {
    if (app.store.state.currency === "EUR") {
      const formattedPrice = new Intl.NumberFormat("en-US").format(
        parseInt(val / 7.5)
      );
      return "€ " + formattedPrice;
    } else {
      const formattedPrice = new Intl.NumberFormat("da-DK").format(
        parseInt(val)
      );
      return "Kr. " + formattedPrice + ",-";
    }
  };
  Vue.filter("formatPrice", formatPrice);
};
