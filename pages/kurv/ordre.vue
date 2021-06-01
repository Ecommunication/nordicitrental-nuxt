<template>
  <div class="container">
    <div class="ordre">
      <div>
        Ordre .... Header Image ...
        <Breadcrumb class="mt-10 mb-10" />
        <CustomerInformationForm />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Breadcrumb from "@/components/Cart/Breadcrumb";
import CustomerInformationForm from "@/components/Formular/CustomerInformation";

export default {
  components: {
    Breadcrumb,
    CustomerInformationForm
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>

</style>
