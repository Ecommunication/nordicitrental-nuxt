<template>
  <div>
    <HeaderImg
        v-if="data.ImageCover"
        :img="data.ImageCover.url | formatImage"
        :text="data.TextCover"
    />
    <div class="container">
      <div class="row" style="padding: 16px;">
        <div class="col" style="width: 100%;">
          <Breadcrumb class="mt-10 mb-10" />
          <CustomerInformationForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Breadcrumb from "@/components/Cart/Breadcrumb";
import CustomerInformationForm from "@/components/Formular/CustomerInformation";
import HeaderImg from "@/components/Utilities/HeaderImg";

export default {
  components: {
    Breadcrumb,
    HeaderImg,
    CustomerInformationForm
  },
  data() {
    return {};
  },
  async asyncData({ params, $axios }) {
    const data = await $axios.$get("/checkud-ordre");
    return { data };
  },
};
</script>

<style lang="scss" scoped></style>
