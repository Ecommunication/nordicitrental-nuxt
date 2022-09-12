<template>
  <div class="input-field selection">
    <div>
      <div v-if="label" class="label">{{ label }}:</div>
      <select v-model="inputLocal" :class="firstErrorMsg ? 'withError' : ''">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <div class="error-msg" v-if="firstErrorMsg" v-html="firstErrorMsg"></div>
  </div>
</template>

<script>
export default {
  props: {
    input: { type: String, required: false },
    label: { type: String },
    options: { type: Array, required: true },
    defaultOption: { type: Object, required: false },
    validation: {
      type: Object,
      required: false,
    },
    errors: { type: Array, required: false },
  },
  computed: {
    firstErrorMsg() {
      return Array.isArray(this.errors) && this.errors.length
        ? this.errors[0].replace(
            "%s",
            `<span style="font-weight: 600;">${this.label}</span>`
          )
        : null;
    },
  },
  data() {
    return {
      inputLocal: "",
    };
  },
  created() {
    if (this.input) {
      this.inputLocal = this.input;
    } else {
      if (this.defaultOption) {
        this.inputLocal = this.defaultOption.value;
      }
    }
  },
  watch: {
    inputLocal(val) {
      this.$emit("onChange", val);
    },
  },
};
</script>
