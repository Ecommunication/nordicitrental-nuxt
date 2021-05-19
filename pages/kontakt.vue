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

      <div>
        <ContactUsForm :formTitle="contactUsTitle">
          <template v-slot:left-col>
            <div class="text-left employee">
              <h3 class="text-blue">Kontakt info</h3>
              <div class="mt-6">
                <div>Nordic IT rental ApS</div>
                <div>Industriparken 22A</div>
                <div>2750 Ballerup</div>
                <div>Tel: +45 7199 8904</div>
                <div>E-mail: salg@nordicitrental.dk</div>
              </div>
            </div>
          </template>
        </ContactUsForm>
        <GoogleMap />
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundImg from "@/components/Utilities/BackgroundImg";
import ContactUsForm from "@/components/Formular/Contact";
import GoogleMap from "@/components/Utilities/GoogleMap"

export default {
  components: {
    BackgroundImg,
    ContactUsForm,
    GoogleMap
  },
  data() {
    return {
      data: null,
      errorAfterFetch: null,
      apiUrl: process.env.apiUrl,
      contactUsTitle: "Kontakt os"
    };
  },
  async fetch() {
    // Todo: this may be changed with asyncData (by using $axios) for preventing entering route before fetching all data.
    const path = "/kontakt";
    try {
      this.data = await fetch(this.apiUrl + path).then(r => r.json());
    } catch (e) {
      this.errorAfterFetch = e;
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped></style>
