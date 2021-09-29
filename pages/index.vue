<template>
  <div class="index" id="index">
    <CoverSlider :slides="data.IndexPageSlider" />

    <div class="grid-wide" id="indexCategorySlider">
      <CategorySlider
        class="py-8"
        title="Vælg et produkt du ønsker at leje"
        :categories="data.IndexCategories"
      >
        <div class="grid flex flex-justify-center">
          <nuxt-link
            to="/alle-produktkategorier"
            class="btn btn-blue text-center mx-auto mt-10 title-sm"
          >
            Alle produkter
          </nuxt-link>
        </div>
      </CategorySlider>
    </div>

    <div class="row py-10 bg-gray-light" id="indexRentalBenefits">
      <div class="col">
        <h3
          class="text-blue title-md weight-thin mb-6"
        >
          Vi har gjort det nemt at leje IT udstyr
        </h3>

        <div class="info grid-wide">
          <div
            class="info-card"
            v-for="(item, index) in data.IndexRentalBennefits"
            :key="index"
          >
            <img class="info-card-img" :alt="item.Icon.alternativeText" :src="item.Icon.url | formatImage" />
            <div class="info-card-body">
              <span
                class="info-card-title text-blue mb-3"
                >{{ item.Title }}</span
              >
              <span class="info-card-desc">{{ item.Description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row home-section-1">
      <div class="col-md-6 px-0">
        <div class="home-section-1-1">
          <BackgroundImg
            v-if="data.IndexLetterboxImageLeft"
            :src="data.IndexLetterboxImageLeft.url | formatImage"
          />
        </div>
        <div class="home-section-1-2 index-category-text-card-left">
          <TextCard
            v-if="data.IndexLetterboxTextLeft"
            :contentHtml="data.IndexLetterboxTextLeft"
            backgroundClass="bg-blue"
            largeCSS="padding: 18px 36px;"
            dark
          />
        </div>
      </div>
      <div class="col-md-6 px-0 index-category-text-card-right">
        {{data.IndexLetterboxImageRight}}
        <TextCard
          style="height: 100%;"
          v-if="data.IndexLetterboxTextRight"
          :contentHtml="data.IndexLetterboxTextRight"
          backgroundClass="bg-gray-dark"
          largeCSS="padding: 45px 150px;"
        />
      </div>
    </div>

    <div class="row service-installation-delivery" id="indexServiceDescription">
      <TextCard
        class="text-center"
        v-if="data.IndexServiceDescription"
        :contentHtml="data.IndexServiceDescription"
        backgroundClass="bg-white"
      />
    </div>

    <div class="row pb-10" ref="counterRef" id="indexCounters">
      <div class="col">
        <HomeCategories
          :categories="data.IndexCategoriesCount"
          :counterAnimationLoaded="counterAnimationLoaded"
        />
      </div>
    </div>

    <RefSlider
      :images="data.IndexReferencesCarousel"
    />

    <div class="row" id="indexContactSection">
      <div class="col-md-6 px-0">
        <BackgroundImg
          v-if="data.IndexContactLeftImage"
          :src="data.IndexContactLeftImage.url | formatImage"
        />
      </div>
      <div class="col-md-6 px-0">
        <div class="contact-us-form">
          <ContactUsForm
            class="mt-7 mb-10"
            customCSS="padding: 0 10px; justify-content: center;"
            :title="data.IndexContactRightText"
            formTitle="Bliv ringet op"
          >
            <template v-slot:left-col>
              <div class="text-center pr-35">
                <h3 class="text-blue" style="font-size: 20px;">Kontakt</h3>
                <img
                  src="~/assets/images/employee_mic.png"
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
import ContactUsForm from "@/components/Formular/Contact";

export default {
  components: {
    TextCard,
    BackgroundImg,
    ContactUsForm
  },
  head() {
    return {
      title: this.data.PageTitle,
      meta: [
        {
          name: "title",
          content: this.data.MetaTitle
        },
        {
          name: "description",
          content: this.data.MetaDescription
        }
      ]
    };
  },
  async asyncData({ params, $axios }) {
    const data = await $axios.$get("/forside");
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
#indexCategorySlider {
  width: 90%;
  margin: 0 auto;

  a {
    padding-right: 30px;
    padding-left: 30px;
  }

  & > .col {
    width: 100%;

    h3 {
      margin-bottom: 60px;
      max-width: 700px;
      text-align: 0;
      padding-bottom: 0;
    }
  }

  .category-card {
    width: 210px;
  }

  .row {
    .row {
      justify-content: center;
    }
  }
}

#indexRentalBenefits {
  & > {
    .col {
      width: 100%;
      margin: 0 auto;
    }
  }
  h3 {
    text-align: center;
    font-size: 26px;
  }

  .info {
    &.grid-wide {
      margin: 0 auto;
    }

    .info-card-title {
      font-weight: 700;
    }
  }
}

#indexCounters {
  & > {
    .col {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
    }
  }
}

#indexContactSection {
  & > {
    .col {
      width: 100%;
      min-height: 500px;
    }
  }
}

#indexContactSection {
  .contact-us-form {
    max-width: 700px;
    margin: 0 auto;
  }
}

.info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 90%;
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

.home-section-1 {
  .home-section-1-1 {
    min-height: 500px;
    width: 100%;
    height: 50%;
  }
  .home-section-1-2 {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: #092d4f;
    padding: 50px 0;
  }
}

@media only screen and (max-width: 767px) {
  .info {
    width: 100%;
    .info-card {
      width: 120px;
    }
  }
  .home-section-1 {
    .home-section-1-1 {
      min-height: 300px;
    }
    .home-section-1-2 {
      padding: 0;
    }
  }
}
</style>
