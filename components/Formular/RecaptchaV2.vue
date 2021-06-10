<template>
  <div>
    <div class="ml-5 mb-2">
      <recaptcha />
      <div
        v-if="captchaError"
        class="text-left"
        style="font-size: 14px; color: brown;"
      >
        Please verify that you are not a robot.
      </div>
    </div>
    <div class="input-container">
      <div
        @click="submit"
        class="button btn-primary"
        style="float: none; width: 100%"
      >
        Send
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: { type: Object, required: true }
  },
  data() {
    return {
      captchaError: null
    };
  },
  methods: {
    async submit() {
      try {
        const token = await this.$recaptcha.getResponse();
        console.log("ReCaptcha token:", token);

        // send token to server alongside your form data

        // at the end you need to reset recaptcha
        await this.$recaptcha.reset();
        this.captchaError = null;

        console.log("submit form now", this.form);
      } catch (error) {
        this.captchaError = error;
        console.log("Login error:", error);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
