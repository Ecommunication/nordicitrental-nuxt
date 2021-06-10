import { Cart, Order, SHIPMENT_METHODS } from "../utils/dto"

// Helpers
const validate = (validations, value) => {
  const errors = [];
  validations.forEach(validation => {
    if (!validation.rule(value)) {
      errors.push(validation.msg);
    }
  });
  return errors;
};

export const state = () => ({
  meta: {},
  cart: new Cart()
});

export const getters = {
  noOfItems: state => state.cart.items.length,
  itemsTotal: state =>
    state.cart.items.reduce((acc, cur) => acc + cur.price, 0),
  shippingCost: state => (state.cart.shipping && state.cart.shipping.cost) || 0,
  beforeTax: (state, getters) => getters.itemsTotal + getters.shippingCost,
  vat: (state, getters) => getters.beforeTax * 0.25,
  afterTax: (state, getters) => getters.vat + getters.beforeTax
};

export const mutations = {
  ADD_TO_CART(state, productData) {
    state.cart.items.push(productData);
  },
  UPDATE_AMOUNT(state, { cartItem, amount, price }) {
    cartItem.amount = amount;
    cartItem.price = price;
  },
  DELETE_ITEM(state, cartItemIndex) {
    const { items } = state.cart;
    items.splice(cartItemIndex, 1);
  },
  SET_SHIPMENT_METHOD(state, shipmentMethod) {
    state.cart.shipping = shipmentMethod;
  },
  SET_STATE(state, payload) {
    state.persistedState = payload;
  },
  RESET_CART(state) {
    state.cart = new Cart();
  },
  SET_META_DATA(state, data) {
    state.meta = data;
  }
};

export const actions = {
  addToCart({ commit }, payload) {
    const itemId = new Date().getTime();
    commit("ADD_TO_CART", { ...payload, itemId });
  },
  getCartItem({ commit, state }, { itemId, returnObj = false }) {
    const { items } = state.cart;
    const cartItemIndex = items.findIndex(item => item.itemId === itemId);
    if (cartItemIndex === -1)
      throw new Error("Invalid Product Id / Cart doesn't have this item.");
    const cartItem = items[cartItemIndex];
    return returnObj ? cartItem : cartItemIndex;
  },
  async deleteItem({ commit, dispatch }, itemId) {
    const cartItemIndex = await dispatch("getCartItem", {
      itemId,
      returnObj: false
    });
    commit("DELETE_ITEM", cartItemIndex);
  },
  async updateAmount({ commit, dispatch }, { itemId, amount }) {
    const cartItem = await dispatch("getCartItem", {
      itemId,
      returnObj: true
    });
    const price = amount * cartItem.unitPrice;
    commit("UPDATE_AMOUNT", { cartItem, amount, price });
  },
  async setShipmentMethod({ commit }, shipmentMethod) {
    const method = Object.values(SHIPMENT_METHODS).find(sm => sm.method === shipmentMethod) || SHIPMENT_METHODS.DELIVERY;
    commit("SET_SHIPMENT_METHOD", method);
  },
  async sendCart({ commit, state }, userInfoForm) {
    const order = new Order(
      state.cart.items,
      state.cart.shipping,
      userInfoForm
    );

    commit("RESET_CART");

    /* const payload = {
      OrderFirstName: "Caner"
    };
    const { data } = await this.$axios.$post("/orders", payload);
    console.log(data);
    return data */
  },
  validateForm({}, { validations, form }) {
    const errors = {};
    Object.entries(validations).forEach(([key, validation]) => {
      const value = form[key];
      const keyErrors = validate(validation, value);
      errors[key] = keyErrors;
    });

    const hasAnyError = Object.values(this.errors).some(
      error => !!error.length
    );

    return { errors, hasAnyError };
  },
  async getMetaData({ commit }) {
    const data = await this.$axios.$get("/general-meta");
    commit("SET_META_DATA", data);
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch("getMetaData");
  }
};
