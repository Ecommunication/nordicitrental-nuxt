<template>
  <div class="newsletter-form">
    <div class="mb-1">
      <input type="text" placeholder="Navn" v-model="form.name" />
    </div>
    <div class="mb-1">
      <input type="text" placeholder="Firma" v-model="form.company" />
    </div>
    <div class="mb-1">
      <input type="text" placeholder="E-mail" v-model="form.email" />
    </div>
    <div class="mt-1 button btn-primary">Tilmeld</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        company: "",
        email: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.newsletter-form {
  display: block;
}
</style>
