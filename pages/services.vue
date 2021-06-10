<template>
  <div>
    <HeaderImg
      v-if="data.ImageCover"
      :img="data.ImageCover.url | formatImage"
      :text="data.TextCover"
    />

    <div class="row">
      <div class="col-md-6 px-0">
        <TextCard
          v-if="data.LeftTextCol1"
          :contentHtml="data.LeftTextCol1"
          backgroundClass="bg-white"
        >
          <template v-slot:actions>
            <div>
              <div class="button btn-primary" @click="showModal">
                Ring Mig Op
              </div>

              <Modal v-show="isModalVisible" @close="closeModal" :width="600">
                <template v-slot:header>
                  Call Me
                </template>
                <template v-slot:body>
                  <CallMeForm />
                </template>
              </Modal>
            </div>
          </template>
        </TextCard>
      </div>
      <div class="col-md-6 px-0">
        <TextCard
          v-if="data.RightTextCol1"
          :contentHtml="data.RightTextCol1"
          backgroundClass="bg-blue"
          :dark="true"
        >
          <template v-slot:actions>
            <Button :button="buttons.goToProduct" />
          </template>
        </TextCard>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 px-0" style="min-height: 526px; width: 100%;">
        <BackgroundImg
          v-if="data.LeftImageCol2"
          :src="data.LeftImageCol2.url | formatImage"
        />
      </div>
      <div class="col-md-6 px-0">
        <TextCard
          style="height: 100%;"
          v-if="data.RightTextCol2"
          :contentHtml="data.RightTextCol2"
          backgroundClass="bg-gray-darkest"
        />
      </div>
    </div>

    <div class="row">
      <div class="col" style="width: 100%;">
        <TextCard
          v-if="data.MidTextCol3"
          :contentHtml="data.MidTextCol3"
          backgroundClass="bg-blue"
          :dark="true"
        >
          <template v-slot:actions>
            <Button :button="buttons.goToContact" />
          </template>
        </TextCard>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 px-0">
        <TextCard
          class="pb-0"
          v-if="data.LeftTextCol4"
          :contentHtml="data.LeftTextCol4"
        />
      </div>
      <div class="col-md-6 px-0">
        <TextCard
          class="pb-0"
          v-if="data.RightTextCol4"
          :contentHtml="data.RightTextCol4"
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <TextCard
          v-if="data.MidTextCol5"
          :contentHtml="data.MidTextCol5"
          backgroundClass="bg-blue"
          :dark="true"
          padding="42px 230px"
        />
      </div>
    </div>

    <div class="row">
      <div class="col py-14" style="width: 100%;">
        <ContactUsForm
          :title="data.ContactHeader"
          formTitle="Send os en besked, så kontakter vi dig i dag."
          style="margin: 0 auto;"
        >
          <template v-slot:left-col>
            <div class="text-center">
              <h3 class="text-blue">Kontakt</h3>
              <p class="mt-10">
                <img
                  src="https://nordicitrental.dk//wp-content/uploads/2017/12/employee_mic-135x135.png"
                  alt="Kontakt"
                />
              </p>
              <p style="font-size: 16px;">
                Michael Vedel<br />
                Salg – kunder
              </p>
              <p class="mt-5" style="font-size: 16px;">
                Tlf. 71998904<br />
                <a href="mailto:salg@nordicitrental.dk"
                  >salg@nordicitrental.dk</a
                >
              </p>
            </div>
          </template>
        </ContactUsForm>
      </div>
    </div>
  </div>
</template>

<script>
import TextCard from "@/components/Utilities/TextCard";
import HeaderImg from "@/components/Utilities/HeaderImg";
import BackgroundImg from "@/components/Utilities/BackgroundImg";
import Button from "@/components/Utilities/Button";
import ContactUsForm from "@/components/Formular/Contact";
import Modal from "@/components/Utilities/Modal";
import CallMeForm from "@/components/Utilities/CallMeForm";

export default {
  components: {
    TextCard,
    HeaderImg,
    BackgroundImg,
    Button,
    ContactUsForm,
    Modal,
    CallMeForm
  },
  data() {
    return {
      isModalVisible: false,
      data: null,
      errorAfterFetch: null,
      buttons: {
        goToProduct: {
          label: "Se Produkter",
          variant: "btn-dark",
          action: {
            type: "link",
            href: "/produkt-kategori"
          }
        },
        goToContact: {
          label: "Kontakt Os",
          variant: "btn-primary btn-large",
          action: {
            type: "link",
            href: "/kontakt"
          }
        }
      }
    };
  },
  async asyncData({ params, $axios }) {
    const data = await $axios.$get("/services");
    return { data };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 42px 230px;
}
.employee-table {
  h3 {
    margin: 40px 0;
    font-size: 40px;
    color: #092d4f;
  }
}
</style>
