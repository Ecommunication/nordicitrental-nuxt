<template>
  <p class="grid-small margin-center" v-if="$fetchState.pending">
    Indlæser side
  </p>
  <p class="grid-small margin-center" v-else-if="$fetchState.error">
    Vi kunne desværre ikke indlæse siden i øjeblikket. Prøv igen senere.
  </p>
  <div v-else>
    <BackgroundImg
      v-if="product.imageCover"
      :minHeight="460"
      :src="product.imageCover"
      style="display: flex; align-items: center;"
    >
      <template v-slot:body>
        <h1 class="slider-title title-white" style="margin: auto;">
          {{ product.data.TextCover }}
        </h1>
      </template>
    </BackgroundImg>

    <div class="mt-14 product grid-small margin-center">
      <div class="product-gallery" style="max-width: 500px; margin-right: 50px ">
        <div class="product-gallery__main-image" >
          <img class="img-responsive" :src="product.gallery.main" alt="" />
        </div>
        <div class="product-galery-other-images">
          <div
            class="product-galery-other-img-container"
            v-for="(image, index) in product.gallery.thumbnails"
            :key="index"
          >
            <img :src="image" />
          </div>
        </div>
      </div>
      <div class="product-meta">
        <IconBar class="mb-14" />
        <div class="product-meta__specs"></div>
        <div class="product-meta__prices">
          <div class="product-meta__prices-weekly">
            <span>
              {{ product.pricing.weekly | formatPrice }}
              <i class="product-meta__prices-price-info"
                >(Pris for første uges leje)</i
              >
            </span>
          </div>
          <div class="product-meta__prices-daily">
            <span>
              {{ product.pricing.daily | formatPrice }}
              <i class="product-meta__prices-price-info"
                >(Pris efter første uges leje, pr. dag.)</i
              >
            </span>
          </div>
        </div>
        <div class="product-meta__description">
          <div
            style="font-size: 0.8em; line-height: 25px;"
            v-html="product.data.DescriptionShort"
          ></div>
        </div>
        <div class="product-meta__buy-section">
          <div class="product-meta__buy-section__addons"></div>
          <div class="product-meta__buy-section__period">
            <AddToCart
              :dailyPrice="product.pricing.daily"
              :weeklyPrice="product.pricing.weekly"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="product grid-small margin-center mt-10">
      <Tabs :description="descriptionTab" :features="featuresTab" />
    </div>

    <div class="product grid-small margin-center mt-10">
      <Suggestions :products="products" />
    </div>
  </div>
</template>
<script>
import AddToCart from "@/components/Product/AddToCart";
import Tabs from "@/components/Product/Tabs";
import IconBar from "@/components/Product/IconBar";
import Suggestions from "@/components/Product/Suggestions";
import BackgroundImg from "@/components/Utilities/BackgroundImg";

export default {
  components: { BackgroundImg, AddToCart, Tabs, IconBar, Suggestions },
  data() {
    return {
      apiUrl: process.env.apiUrl,
      descriptionTab: {
        title: "Lej en iPad Air med 4G mulighed",
        desc: `Den stilfulde iPad Air Wi-Fi + 4G/LTE, er en af de nyere Apple iPads i vores sortiment. Air modellen er ultratynd og let med et holdbart aluminiumskabinet, effektiv ydelse, Wi-Fi og LTE-teknologi – kombinationen af bedre mobilitet og mere produktivitet. Når du lejer en iPad Air modtager du den med et beskyttelses cover. Denne iPad er markant lettere end forgængeren (iPad 4). Den er også tyndere, og med en markant hurtigere processor.
Ved leje af iPad Air er det muligt at tilkøbe 4G datakort. Læs mere om køb af 4G datakort her.
Ved udlejning af iPads er du sikret et stilfuld og professionelt produkt.
Når du lejer en iPad hos Nordic IT Rental, leveres den altid med seneste IOS og opladet.
Vi kan installere de lejede iPads præcis som du ønsker det, og med de App´s du ønsker.
Alle iPads leveres i et pænt og praktisk silikonecover der beskytter iPaden mod slag og skader.
Det er også muligt at få skræddersyet surveys eller andre brugerflader på en lejede iPad.
Du er altid velkommen til at kontakte vores salgsafdeling på tlf. 71998904 for at høre mere om leje af iPads.`
      },
      iconBar: [{}],
      products: [
        {
          id: 1,
          img:
            "https://nordicitrental.dk/wp-content/uploads/2015/05/ipadstander-220x220.jpg",
          title: "iPad gulvstander – sort"
        },
        {
          id: 2,
          img:
            "https://nordicitrental.dk/wp-content/uploads/2014/10/simcard-220x165.gif",
          title: "Data simkort med 3G/4G til iPad"
        }
      ],
      featuresTab: {},
      product: {
        imageCover: null,
        textCover: null,
        metaTitle: null,
        metaDescription: null,
        gallery: {
          main: null,
          thumbnails: []
        },
        data: null,
        pricing: {
          daily: null,
          weekly: null
        }
      }
    };
  },
  head() {
    return {
      title: this.product.textCover,
      meta: [
        {
          name: "title",
          content: this.product.metaTitle ?? ""
        },
        {
          name: "description",
          content: this.product.metaDescription ?? ""
        }
      ]
    };
  },
  async fetch() {
    const products = await fetch(
      process.env.apiUrl + "/products?ProductSlug=" + this.$route.params.product
    ).then(res => res.json());

    const product = products[0];

    this.product.data = product;
    this.product.imageCover = process.env.apiUrl + product.ImageCover.url;

    this.product.metaTitle = product.MetaTitle;
    this.product.textCover = product.TextCover;
    this.product.metaDescription = product.MetaDescription;

    this.product.gallery.main = process.env.apiUrl + product.MainImage.url;
    product.ProductGallery.forEach(image => {
      this.product.gallery.thumbnails.push(process.env.apiUrl + image.url);
    });

    this.product.pricing.weekly = product.WeekPrice;
    this.product.pricing.daily = product.DailyPriceAfterWeek;
  }
};
</script>

<style lang="scss" scoped>
.product-galery-other-images {
  display: flex;
  flex-wrap: wrap;
  .product-galery-other-img-container {
    width: 90px;
    height: 90px;
    margin: 15px;
    border: 1px solid rgba(0,0,0,.05);
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background-position: center center;
    }
  }
}
</style>
