<template>
  <input
    class="amount-picker"
    type="number"
    step="1"
    min="1"
    v-model="form.amount"
  />
</template>

<script>
export default {
  props: {
    form: { type: Object, required: true },
  }
};
</script>

<style lang="scss" scoped>
.amount-picker {
  padding: 10px 5px 10px 10px;
  font-size: 1em;
  width: 65px;
}
</style>
