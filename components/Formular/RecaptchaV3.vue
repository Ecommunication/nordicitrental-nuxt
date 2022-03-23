<template>
  <div>
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
    formValidations: { type: Object, required: true },
  },
  async mounted() {
    try {
      await this.$recaptcha.init();
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    async submit() {
      try {
        const token = await this.$recaptcha.execute('login');
        console.log(token);

        // send token to server alongside your form data
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
