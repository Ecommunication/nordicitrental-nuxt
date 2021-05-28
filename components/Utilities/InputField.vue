<template>
  <div class="input-field">
    {{ input }} || {{ inputLocal }} || {{ showError }}
    <div v-if="label" class="label">{{ label }}:</div>
    <input
      v-model="inputLocal"
      type="text"
      :class="showError ? 'withError' : ''"
    />
    <div class="error-msg" v-if="errorMsg && showError">{{ errorMsg }}</div>
  </div>
</template>

<script>
export default {
  props: {
    input: { type: String, required: false },
    label: { type: String },
    errorMsg: { type: String },
    validationRule: { type: Function | String, required: false }
  },
  data() {
    return {
      inputLocal: "",
      showError: false
    };
  },
  created() {
    if (this.input) {
      this.inputLocal = this.input;
    }
  },
  watch: {
    inputLocal(val) {
      console.log("changed", val);
      this.$emit("changed", val);

      if (this.validationRule) {
        this.showError = !this.validate(val);
      }
    }
  },
  methods: {
    validate(val) {
      const rules = {
        isRequired: val => !!val
      };

      const isFn = typeof this.validationRule === "function";
      if (isFn) {
        return this.validationRule(val);
      }

      let isValid;
      try {
        isValid = rules[this.validationRule](val);
      } catch (error) {
        console.log(`${this.validationRule} is not a validation rule`);
        isValid = true;
      }
      console.log({ isValid });

      return isValid;
    }
  }
};
</script>

<style lang="scss" scoped>
.input-field {
  padding-bottom: 25px;

  input.withError {
    border: 1px solid red;
  }

  .error-msg {
    margin-top: 4px;
    margin-left: 4px;
    font-size: 15px;
    color: red;
  }
}
</style>
