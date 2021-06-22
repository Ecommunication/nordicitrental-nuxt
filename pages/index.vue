<template>
  <div class="index">
    <CoverSlider :slides="data.IndexPageSlider" />

    <div class="grid-wide" style="width: 90%; margin: 0 auto;">
      <CategorySlider
        class="py-8"
        title="Vælg et produkt du ønsker at leje"
        :categories="data.IndexCategories"
      >
        <div class="grid flex flex-justify-center">
          <nuxt-link
            to="/alle-produktkategorier"
            class="btn btn-blue text-center mx-auto mt-10 title-sm"
            style="padding-right: 30px; padding-left: 30px; "
          >
            Alle produkter
          </nuxt-link>
        </div>
      </CategorySlider>
    </div>

    <div class="row py-10 bg-gray-light">
      <div class="col" style="width: 100%; margin: 0 auto;">
        <h3
          class="text-blue title-md weight-thin mb-6"
          style="text-align: center; font-size: 26px;"
        >
          Vi har gjort det nemt at leje IT udstyr
        </h3>

        <div class="info grid-wide" style="width: 90%; margin: 0 auto;">
          <div
            class="info-card"
            v-for="(item, index) in data.IndexRentalBennefits"
            :key="index"
          >
            <img class="info-card-img" :src="item.Icon.url | formatImage" />
            <div class="info-card-body">
              <span
                class="info-card-title text-blue mb-3"
                style="font-weight: 700;"
                >{{ item.Title }}</span
              >
              <span class="info-card-desc">{{ item.Description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 px-0">
        <div style="min-height: 500px; width: 100%; height: 50%;">
          <BackgroundImg
            v-if="data.IndexLetterboxImageLeft"
            :src="data.IndexLetterboxImageLeft.url | formatImage"
          />
        </div>
        <div
          style="min-height: 400px; width: 100%;  display: flex; flex-direction: column; justify-content: flex-end; background: #092D4F;"
        >
          <TextCard
            v-if="data.IndexLetterboxTextLeft"
            :contentHtml="data.IndexLetterboxTextLeft"
            backgroundClass="bg-blue"
            largeCSS="padding: 18px 36px;"
            dark
          />
        </div>
      </div>
      <div class="col-md-6 px-0">
        <TextCard
          style="height: 100%;"
          v-if="data.IndexLetterboxTextRight"
          :contentHtml="data.IndexLetterboxTextRight"
          backgroundClass="bg-gray-dark"
          largeCSS="padding: 45px 150px;"
        />
      </div>
    </div>

    <div class="row service-installation-delivery">
      <TextCard
        class="text-center"
        v-if="data.IndexServiceDescription"
        :contentHtml="data.IndexServiceDescription"
        backgroundClass="bg-white"
      />
    </div>

    <div class="row pb-10" ref="counterRef">
      <div class="col" style="max-width: 1280px; width: 100%; margin: 0 auto;">
        <HomeCategories
          :categories="data.IndexCategoriesCount"
          :counterAnimationLoaded="counterAnimationLoaded"
        />
      </div>
    </div>

    <div class="row">
      <div class="col bg-blue py-10" style="width: 100%;">
        <RefSlider
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
        <div style="max-width: 585px; margin: 0 auto;">
          <ContactUsForm
            class="mt-5 mb-10"
            customCSS="padding: 0 10px; justify-content: center;"
            title="Lad os snakke om mulighederne for at leje"
            formTitle="Bliv ringet op"
            style="margin: 0 auto;"
          >
            <template v-slot:left-col>
              <div class="text-center">
                <h3 class="text-blue" style="font-size: 20px;">Kontakt</h3>
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
  </div>
</template>

<script>
import CategorySlider from "@/components/Category/Slider";
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
  },
  data() {
    return {
      counterAnimationLoaded: false
    };
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      const isVisible = this.isInViewport(this.$refs.counterRef);
      if (!this.counterAnimationLoaded && isVisible) {
        this.counterAnimationLoaded = true;
        console.log("call counter");
      }
    },
    isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
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
