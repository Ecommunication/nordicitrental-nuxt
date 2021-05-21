<template>
  <p class="grid-small margin-center" v-if="$fetchState.pending">
    Indlæser side
  </p>
  <p class="grid-small margin-center" v-else-if="$fetchState.error">
    Vi kunne desværre ikke indlæse siden i øjeblikket. Prøv igen senere.
  </p>
  <div v-else>
    <CoverImage
      :textCover="product.data.TextCover"
      :imageCover="product.imageCover"
    />

    <div class="product grid-small margin-center">
      <div class="product-gallery">
        <div class="product-gallery__main-image">
          <img class="img-responsive" :src="product.gallery.main" alt="" />
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
          <div style="font-size: 0.8em; line-height: 25px;" v-html="product.data.DescriptionShort"></div>
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
  </div>
</template>
<script>
import AddToCart from "@/components/Product/AddToCart";
import Tabs from "@/components/Product/Tabs";
import IconBar from "@/components/Product/IconBar";

export default {
  components: { AddToCart, Tabs, IconBar },
  data() {
    return {
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
      iconBar: [
        {}
      ],
      featuresTab: {},
      product: {
        imageCover: null,
        textCover: null,
        metaTitle: null,
        metaDescription: null,
        gallery: {
          main: null,
          thumbnails: null
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
    console.log(product);

    this.product.data = product;
    this.product.imageCover = process.env.apiUrl + product.ImageCover.url;

    this.product.metaTitle = product.MetaTitle;
    this.product.textCover = product.TextCover;
    this.product.metaDescription = product.MetaDescription;

    this.product.gallery.main = process.env.apiUrl + product.MainImage.url;

    this.product.pricing.weekly = product.WeekPrice;
    this.product.pricing.daily = product.DailyPriceAfterWeek;
  }
};
</script>
