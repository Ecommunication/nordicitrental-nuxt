import Vue from "vue";

const baseURL = process.env.apiUrl;
console.log({ baseURL });
export const formatImage = val => val ? baseURL + val : "";

Vue.filter("formatImage", formatImage);

export default ({ app }, inject) => {
  inject("formatImage", formatImage);
};
