<template>
  <div class="newsletter-form">
    <div class="mb-1">
      <input type="text" placeholder="Navn" v-model="form.firstname" />
    </div>
    <div class="mb-1">
      <input type="text" placeholder="Firma" v-model="form.company" />
    </div>
    <div class="mb-1">
      <input type="email" placeholder="E-mail" v-model="form.email" />
    </div>
    <div @click="submit" class="mt-1 button btn-primary">Tilmeld</div>
    <div v-if="message" class="mt-2 message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultErrorMsg: "Something went wrong",
      successMsg: "You have successfully subscribed to our newsletter.",
      message: null,
      form: {
        firstname: "",
        company: "",
        email: ""
      }
    };
  },
  methods: {
    resetForm() {
      this.form = {
        firstname: "",
        company: "",
        email: ""
      };
    },
    async submit() {
      if (this.form.email && this.form.firstname) {
        try {
          console.log("submitting...", this.form);
          const r = await this.$axios.$post(
            `${process.env.serviceApi}/mailchimp/subscribe`,
            this.form
          );
          this.message = this.successMsg;
          this.resetForm();
        } catch (error) {
          this.message =
            "Error: " + (error?.response?.data?.title || this.defaultErrorMsg);
        }
      }
    }
  },
  watch: {
    message(val) {
      if (val) {
        setTimeout(() => {
          this.message = null;
        }, 3000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.newsletter-form {
  display: block;
  max-width: 250px;
  .message {
    width: 100%;
    font-size: 0.9em;
  }
}
</style>
