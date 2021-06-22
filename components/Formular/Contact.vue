<template>
  <div>
    <h2 v-if="title" class="text-center mb-10" style="font-size: 25px;">{{ title }}</h2>
    <div class="form-row" :style="customCSS">
      <div class="left-col">
        <slot name="left-col"></slot>
      </div>
      <div class="right-col">
        <div class="form">
          <h3 v-if="formTitle" class="text-blue mb-10" style="font-size: 20px;">{{ formTitle }}</h3>

          <form class="mt-5" :key="formKey">
            <InputField
              label="Navn"
              :input="form.name"
              @onChange="val => onChange('name', val, formValidations.name)"
              :errors="errors.name"
            />

            <InputField
              label="E-mailadresse"
              :input="form.email"
              @onChange="val => onChange('email', val, formValidations.email)"
              :errors="errors.email"
            />

            <InputField
              label="Firmanavn"
              :input="form.companyName"
              @onChange="
                val => onChange('companyName', val, formValidations.companyName)
              "
              :errors="errors.companyName"
            />

            <InputField
              label="Telefon"
              :input="form.phone"
              @onChange="val => onChange('phone', val, formValidations.phone)"
              :errors="errors.phone"
            />

            <Textarea
              label="Besked"
              :input="form.message"
              :rows="8"
              @changed="val => (form.message = val)"
            />

            <Recaptcha
              :form="form"
              :formValidations="formValidations"
              @changeErrors="val => (errors = val)"
              @formSubmitted="isModalVisible = true"
            />
          </form>
          <Modal v-show="isModalVisible" @close="closeModal" :width="600">
            <template v-slot:header>
              Kontakt
            </template>
            <template v-slot:body>
              <div>Tak for din henvendelse.</div>
              <div>Vi vil vende tilbage så snart som muligt.</div>
            </template>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Utilities/Modal";
import InputField from "@/components/Utilities/Form/InputField";
import Textarea from "@/components/Utilities/Form/Textarea";
import Recaptcha from "@/components/Formular/RecaptchaV2";
import validations from "@/components/Formular/validations.js";

export default {
  components: { Modal, InputField, Textarea, Recaptcha },
  props: {
    customCSS: { type: String, required: false },
    title: { type: String, required: false },
    formTitle: { type: String, required: false }
  },
  data() {
    return {
      formKey: new Date().getTime(),
      isModalVisible: false,
      form: {
        name: "",
        email: "",
        companyName: "",
        phone: "",
        message: ""
      },
      formValidations: {
        name: [validations.isRequired],
        email: [validations.isRequired, validations.isEmail],
        companyName: [validations.isRequired],
        phone: [validations.isRequired, validations.isPhone]
      },
      errors: {}
    };
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
    resetForm() {
      this.form = {
        name: "",
        email: "",
        companyName: "",
        phone: "",
        message: ""
      };
      this.formKey = new Date().getTime();
    },
    closeModal() {
      this.isModalVisible = false;
      this.resetForm();
    }
  }
};
</script>

<style lang="scss" scoped>
.form-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .left-col {
    padding: 0 10px;
    margin-bottom: 25px;
  }

  .right-col {
    padding: 0 10px;
    .form {
      max-width: 300px;
    }
  }
}

@media screen and (max-width: 767px) {
  .form-row {
    justify-content: space-around !important;
    padding: 0 20px !important;
  }
}
</style>
