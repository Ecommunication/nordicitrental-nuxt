<template>
  <div class="index">
    <CoverSlider :slides="data.IndexPageSlider" />

    <div class="row py-10">
      <div class="col" style="width:100%;">
        <h3 class="text-blue title-md mb-10" style="text-align: center;">
          Vælg et produkt du ønsker at leje:
        </h3>
        <div class="row" style="max-width: 1200px; justify-content: space-between;">
          <div
            class="col mx-2"
            v-for="(cat, index) in data.IndexCategories"
            :key="index"
          >
            <nuxt-link :to="`/produkt-kategori/${cat.Title}`">
              <div class="category-card">
                <img :src="cat.Image.url | formatImage" />
                <span class="category-title text-md weight-thin">{{
                  cat.Title
                }}</span>
              </div>
            </nuxt-link>
          </div>
        </div>

        <div class="grid flex flex-justify-center">
          <nuxt-link to="/alle-produktkategorier" class="btn btn-blue text-center mx-auto mt-10">
            Alle produkter
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="row py-10 bg-gray-light">
      <div class="col" style="max-width: 1200px; width: 100%; margin: 0 auto;">
        <h3
          class="text-blue title-md weight-thin mb-10"
          style="text-align: center;"
        >
          Vi har gjort det nemt at leje IT udstyr
        </h3>

        <div class="info">
          <div
            class="info-card"
            v-for="(item, index) in data.IndexRentalBennefits"
            :key="index"
          >
            <img class="info-card-img" :src="item.Icon.url | formatImage" />
            <div class="info-card-body">
              <span class="info-card-title text-blue">{{ item.Title }}</span>
              <span class="info-card-desc">{{ item.Description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 px-0" style="min-height: 500px; width: 100%;">
        <BackgroundImg
          v-if="data.IndexLetterboxImageLeft"
          :src="data.IndexLetterboxImageLeft.url | formatImage"
        />
      </div>
      <div class="col-md-6 px-0">
        <TextCard
          style="height: 100%;"
          v-if="data.IndexLetterboxTextRight"
          :contentHtml="data.IndexLetterboxTextRight"
          backgroundClass="bg-gray-dark"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 px-0">
        <TextCard
          style="height: 100%;"
          v-if="data.IndexLetterboxTextLeft"
          :contentHtml="data.IndexLetterboxTextLeft"
          backgroundClass="bg-blue"
        />
      </div>
      <div class="col-md-6 px-0" style="min-height: 500px; width: 100%;">
        <BackgroundImg
          v-if="data.IndexLetterboxImageLeft"
          :src="data.IndexLetterboxImageLeft.url | formatImage"
        />
      </div>
    </div>

    <div class="row">
      <TextCard
        class="text-center"
        v-if="data.IndexServiceDescription"
        :contentHtml="data.IndexServiceDescription"
        backgroundClass="bg-white"
      />
    </div>

    <div class="row py-10">
      <div class="col" style="max-width: 1200px; width: 100%; margin: 0 auto;">
        <div class="info">
          <div
            class="info-card"
            v-for="(item, index) in data.IndexCategoriesCount"
            :key="index"
          >
            <div class="info-card-body">
              <span class="info-card-title text-blue">{{ item.Title }}</span>
            </div>
            <img class="info-card-img" :src="item.Icon.url | formatImage" />
            <div class="info-card-spinner text-blue">
              {{ item.Counter }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col bg-blue py-10" style="width: 100%;">
        <RefCompanyLogoBar
          :images="
            data.IndexReferencesCarousel.map(item =>
              $formatImage(item.Reference[0].url)
            )
          "
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 px-0" style="min-height: 500px; width: 100%;">
        <BackgroundImg
          v-if="data.IndexContactLeftImage"
          :src="data.IndexContactLeftImage.url | formatImage"
        />
      </div>
      <div class="col-md-6 px-0">
        <ContactUsForm
          class="my-10"
          :title="data.ContactHeader"
          formTitle="Send os en besked, så kontakter vi dig i dag."
          style="margin: 0 auto;"
        >
          <template v-slot:left-col>
            <div class="text-center">
              <h3 class="text-blue">Kontakt</h3>
              <img
                src="https://nordicitrental.dk//wp-content/uploads/2017/12/employee_mic-135x135.png"
                alt="Kontakt"
              />
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
import RefCompanyLogoBar from "@/components/AboutUs/RefCompanyLogoBar";
import ContactUsForm from "@/components/Formular/Contact";

export default {
  components: {
    TextCard,
    BackgroundImg,
    RefCompanyLogoBar,
    ContactUsForm
  },
  async asyncData({ params, $axios }) {
    const data = await $axios.$get("/forside");
    console.log(data);
    return { data };
  }
};
</script>

<style lang="scss" scoped>
.category-card:hover {
  background: rgb(238, 238, 238);
}
.category-card {
  width: 180px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  img {
    max-width: 110px;
    max-height: 100px;
    width: 100%;
    height: 100%;
  }
}

.info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .info-card {
    width: 250px;
    text-align: center;
    margin: 15px;
    .info-card-img {
      margin: 30px auto;
      max-width: 79px;
      max-height: 57px;
    }
    .info-card-body {
      display: flex;
      flex-direction: column;
      .info-card-title {
        font-weight: 600;
      }
      .info-card-desc {
        font-size: 0.7em;
      }
    }
    .info-card-spinner {
      font-size: 2.1em;
      font-weight: 700;
    }
  }
}
</style>
