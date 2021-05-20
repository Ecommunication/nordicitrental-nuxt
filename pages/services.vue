<template>
  <!-- About Us -->
  <div>
    <p class="grid-small margin-center" v-if="$fetchState.pending">
      Indlæser side
    </p>
    <p
      class="grid-small margin-center"
      v-else-if="$fetchState.error || errorAfterFetch"
    >
      Vi kunne desværre ikke indlæse siden i øjeblikket. Prøv igen senere.
    </p>

    <div v-else-if="data">
      <BackgroundImg
        v-if="data.ImageCover"
        :minHeight="420"
        :src="apiUrl + data.ImageCover.url"
        style="display: flex; align-items: center;"
      >
        <template v-slot:body>
          <h1 class="slider-title title-white">{{ data.TextCover }}</h1>
        </template>
      </BackgroundImg>

      <div class="index-letter-box wrap-grid grid-cols-2">
        <TextCard
          v-if="data.LeftTextCol1"
          :contentHtml="data.LeftTextCol1"
          backgroundClass="bg-white"
          padding="45px"
        >
          <template v-slot:actions>
            <Button :button="buttons.callMe" />
          </template>
        </TextCard>

        <TextCard
          v-if="data.RightTextCol1"
          :contentHtml="data.RightTextCol1"
          backgroundClass="bg-blue"
          padding="45px"
          :dark="true"
        >
          <template v-slot:actions>
            <Button :button="buttons.goToProduct" />
          </template>
        </TextCard>
      </div>

      <div class="index-letter-box wrap-grid grid-cols-2">
        <BackgroundImg
          v-if="data.LeftImageCol2"
          :minHeight="526"
          :src="apiUrl + data.LeftImageCol2.url"
        />
        <TextCard
          v-if="data.RightTextCol2"
          :contentHtml="data.RightTextCol2"
          backgroundClass="bg-gray-darkest"
          padding="55px"
        />
      </div>

      <div style="display: flex;">
        <TextCard
          v-if="data.MidTextCol3"
          :contentHtml="data.MidTextCol3"
          backgroundClass="bg-blue"
          :dark="true"
          padding="42px 230px"
        >
          <template v-slot:actions>
            <Button :button="buttons.goToContact" />
          </template>
        </TextCard>
      </div>

      <div class="index-letter-box wrap-grid grid-cols-2">
        <TextCard
          v-if="data.LeftTextCol4"
          :contentHtml="data.LeftTextCol4"
          padding="55px"
        />

        <TextCard
          v-if="data.RightTextCol4"
          :contentHtml="data.RightTextCol4"
          padding="55px"
        />
      </div>

      <div style="display: flex;">
        <TextCard
          v-if="data.MidTextCol5"
          :contentHtml="data.MidTextCol5"
          backgroundClass="bg-blue"
          :dark="true"
          padding="42px 230px"
        />
      </div>

      <div>
        <ContactUsForm
          :title="data.ContactHeader"
          formTitle="Send os en besked, så kontakter vi dig i dag."
        >
          <template v-slot:left-col>
            <div class="text-left employee">
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
import BackgroundImg from "@/components/Utilities/BackgroundImg";
import Button from "@/components/Utilities/Button";
import ContactUsForm from "@/components/Formular/Contact";

export default {
  components: {
    TextCard,
    BackgroundImg,
    Button,
    ContactUsForm
  },
  data() {
    return {
      data: null,
      errorAfterFetch: null,
      apiUrl: process.env.apiUrl,
      buttons: {
        callMe: {
          label: "Ring Mig Op",
          variant: "btn-primary",
          action: {
            type: "modal",
            modal: "call-me"
          }
        },
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
  async fetch() {
    // Todo: this may be changed with asyncData (by using $axios) for preventing entering route before fetching all data.
    const path = "/services";
    try {
      this.data = await fetch(this.apiUrl + path).then(r => r.json());
    } catch (e) {
      this.errorAfterFetch = e;
      console.log(e);
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
