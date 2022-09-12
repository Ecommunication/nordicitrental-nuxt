<template>
  <div class="input-checkbox round">
    <input type="checkbox" v-model="inputLocal" />
    <label @click="inputLocal = !inputLocal"></label>
    <div class="label ml-6">
      {{optionVal.Name}},
      <span v-if="optionVal.FixedPrice">{{optionVal.FixedPrice | formatPrice}}</span>
      eksl. moms
    </div>
    <div v-if="label" class="label ml-6" @click="inputLocal = !inputLocal">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    input: { type: Boolean, required: false },
    label: { type: String },
    optionVal: {type: Object, required: true},
    validation: {
      type: Object,
      required: false,
    },
  },
  computed: {
    errorMsg() {
      return this.validation && this.validation.msg
        ? this.validation.msg.replace(
            '%s',
            `<span style="font-weight: 600;">${this.label}</span>`
          )
        : null;
    },
    validationRule() {
      return this.validation && this.validation.rule
        ? this.validation.rule
        : null;
    },
  },
  data() {
    return {
      inputLocal: false,
      showError: false,
    };
  },
  created() {
    if (this.input) {
      this.inputLocal = this.input;
    }
  },
  watch: {
    inputLocal(val) {
      this.$emit('changed', val);

      if (this.validationRule) {
        this.showError = !this.validationRule(val);
      }
    },
  },
};
</script>
