<template>
  <div class="call-me">
    <div class="call-me-form">
      <input v-model="name" class="mb-4" type="text" placeholder="Navn" />

      <input
        v-model="phone"
        class="mb-4"
        type="text"
        placeholder="Telefon nr."
      />

      <div @click="submit" class="button btn-primary btn-block">Send</div>
    </div>
    <div
    v-if="result"
      class="mt-2 result-container"
      :class="error ? 'msg-error' : 'msg-success'"
    >
      {{ result }}
    </div>
  </div>
</template>

<script>

const messages = {
  success: "We will get back to you, soon!",
  error: {
    nameNotEmpty: "Navn can not be empty.",
    phoneNotEmpty: "Phone can not be empty",
    phoneNotValid: "Phone format is not valid."
  }
}

export default {
  data() {
    return {
      name: "",
      phone: "",
      error: false,
      result: ""
    };
  },
  methods: {
    submit() {
      if (!this.validate()) return;

      const payload = { name: this.name, phone: this.phone };
      console.log(payload);
      this.error = false;
      this.result = messages.success;
      this.resetForm();
    },
    validate() {
      if (!this.name) {
        this.result = messages.error.nameNotEmpty;
        this.error = true;
        return false;
      }

      if (!this.phone) {
        this.result = messages.error.phoneNotEmpty;
        this.error = true;
        return false;
      }

      const phoneValidationRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      if(!this.phone.match(phoneValidationRegex)){
        this.result = messages.error.phoneNotValid;
        this.error = true
        return false;
      }

      return true;
    },
    resetForm() {
      this.name = "";
      this.phone = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.result-container {
  padding: 10px 20px;
  border: 1px solid #e6e6e6;
  font-size: 0.9em;
}
.msg-success {
  color: #092d4f;
  border-color: #092d4f;
}
.msg-error {
  color: red;
  border-color: red;
}
</style>
