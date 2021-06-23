<template>
  <div>
    <div class="ml-5 mb-2">
      <recaptcha style="margin-left: -20px;" />
      <div
        v-if="captchaError"
        class="text-left"
        style="font-size: 14px; color: brown;"
      >
        Please verify that you are not a robot.
      </div>
    </div>
    <div
      @click="submit"
      class="button btn-primary"
      style="float: none; width: 100%"
    >
      Send
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: { type: Object, required: true },
    formValidations: { type: Object, required: true }
  },
  data() {
    return {
      captchaError: null,
      formErrors: {}
    };
  },
  methods: {
    async submit() {
      if (this.isFormValid()) {
        try {
          const token = await this.$recaptcha.getResponse();
          console.log("ReCaptcha token:", token);

          // send token to server alongside your form data

          // at the end you need to reset recaptcha
          await this.$recaptcha.reset();
          this.captchaError = null;
        } catch (error) {
          this.captchaError = error;
          console.log("Login error:", error);
          return;
        }

        try {
          await this.$axios.post(
            `${process.env.serviceApi}/email/send-email/contact-us`,
            this.form
          );
          console.log("contact us form submitted");
          this.$emit("formSubmitted");
        } catch (error) {
          console.log(
            "contact us form submission error",
            error?.response?.data
          );
        }
      }
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
    isFormValid() {
      Object.entries(this.formValidations).forEach(([key, validation]) => {
        console.log({ key, validation, f: this.form });
        const value = this.form[key];
        const errors = this.validate(validation, value);
        this.formErrors[key] = errors;
      });

      const hasAnyError = Object.entries(this.formErrors).some(
        ([key, error]) => {
          return !!error.length;
        }
      );

      console.log({ form: this.form, hasAnyError });
      this.$emit("changeErrors", this.formErrors);
      return !hasAnyError;
    }
  }
};
</script>

<style lang="scss" scoped></style>
