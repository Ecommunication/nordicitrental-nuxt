<template>
  <div :key="pageKey">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <InputField
          label="Fornavn"
          :input="form.firstName"
          @onChange="
            val => onChange('firstName', val, formValidations.firstName)
          "
          :errors="errors.firstName"
        />
      </div>
      <div class="col-xs-12 col-md-6">
        <InputField
          label="Efternavn"
          :input="form.lastName"
          @onChange="val => onChange('lastName', val, formValidations.lastName)"
          :errors="errors.lastName"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-6">
        <InputField
          label="Firmanavn"
          :input="form.companyName"
          @onChange="
            val => onChange('companyName', val, formValidations.companyName)
          "
          :errors="errors.companyName"
        />
      </div>
      <div class="col-xs-12 col-md-6">
        <InputField
          label="Gadenavn og nr"
          :input="form.streetNameAndNo"
          @onChange="
            val =>
              onChange('streetNameAndNo', val, formValidations.streetNameAndNo)
          "
          :errors="errors.streetNameAndNo"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-4">
        Multi Selection (Land)
      </div>
      <div class="col-xs-12 col-md-4">
        <InputField
          label="By"
          :input="form.town"
          @onChange="val => onChange('town', val, formValidations.town)"
          :errors="errors.town"
        />
      </div>
      <div class="col-xs-12 col-md-4">
        <InputField
          label="Postnummer"
          :input="form.zipCode"
          @onChange="val => onChange('zipCode', val, formValidations.zipCode)"
          :errors="errors.zipCode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import InputField from "@/components/Utilities/Form/InputField";
import validations from "@/components/Formular/validations.js";
export default {
  components: {
    InputField
  },
  props: ["submitTrigger"],
  data() {
    return {
      pageKey: 0,
      form: {
        firstName: "",
        lastName: "",
        companyName: "",
        streetNameAndNo: "",
        town: "",
        country: "",
        zipCode: ""
      },
      errors: {},
      formValidations: {
        firstName: [
          { rule: v => v === "000", msg: "xxxxxxx %s uld be 000" },
          validations.isRequired
        ],
        lastName: [validations.isRequired],
        companyName: [validations.isRequired],
        streetNameAndNo: [validations.isRequired],
        town: [validations.isRequired],
        country: [],
        zipCode: [validations.isRequired]
      }
    };
  },
  watch: {
    submitTrigger(val) {
      console.log("submitTrigger", val);
      if (val) {
        this.submit();
      }
    }
  },
  methods: {
    onChange(key, val, valid) {
      this.form[key] = val;
      this.errors[key] = this.validate(valid, val);
    },
    validate(valid, value) {
      const errors = [];
      valid.forEach(validation => {
        if (!validation.rule(value)) {
          errors.push(validation.msg);
        }
      });
      return errors;
    },
    submit() {
      Object.entries(this.formValidations).forEach(([key, validation]) => {
        const value = this.form[key];
        const errors = this.validate(validation, value);
        this.errors[key] = errors;
      });

      const hasAnyError = Object.entries(this.errors).some(([key, error]) => {
        console.log("!!!", error, key);
        return !!error.length;
      });

      this.pageKey++;

      this.$emit("onSubmit", { form: this.form, hasAnyError });
      console.log({ form: this.form, hasAnyError }, "from address component");
    }
  }
};
</script>

<style lang="scss" scoped></style>
