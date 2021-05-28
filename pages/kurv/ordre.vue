<template>
  <div class="container">
    <div class="ordre">
      <div>
        Ordre .... Header Image ...
        <Breadcrumb class="mt-10 mb-10" />
        {{ form }}
        <div class="title1 mb-7">Faktureringsoplysninger</div>
        <div class="customer-contact-form">
          <InputField
            class="mb-10"
            label="Fornavn"
            errorMsg="error msg"
            :input="form.firstName"
            @changed="val => (form.firstName = val)"
            validationRule="isRequired"
          />
          <!-- :validationRule="v => v === 'asd'" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Cart/Breadcrumb";
import InputField from "@/components/Utilities/InputField";

export default {
  components: {
    Breadcrumb,
    InputField
  },
  methods: {

  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        companyName: "",
        streetNameAndNo: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.title1 {
  font-weight: bold;
  color: #092d4f;
}
</style>
