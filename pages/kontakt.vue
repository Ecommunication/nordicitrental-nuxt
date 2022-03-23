<template>
  <div>
    <HeaderImg
      v-if="data.ImageCover"
      :img="data.ImageCover.url | formatImage"
      :text="data.TextCover"
    />

    <div class="grid-small">
      <div class="row" style="width: 100%">
        <div class="col py-10" style="width: 100%">
          <ContactUsForm
            :formTitle="contactForm.title"
            formStyle="max-width: 450px;"
            leftColStyle="flex-grow: 1;"
            rightColStyle="flex-grow: 1;"
            :formTexts="contactForm"
          >
            <template v-slot:left-col>
              <div class="employee text-left">
                <h3 class="text-blue title1">{{ data.ContactInfo }}</h3>
                <div
                  class="mt-6"
                  style="font-size: 16px"
                  v-html="data.Infobox"
                ></div>
              </div>
            </template>
          </ContactUsForm>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col" style="width: 90%; max-width: 1000px; margin: 0 auto">
        <h3 class="text-blue title1" style="margin-bottom: 20px">
          {{ data.FindUsHere }}
        </h3>
        <GoogleMap
          class="mb-14"
          :mapConfig="googleMap.config"
          :coords="googleMap.coords"
          :title="googleMap.title"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundImg from '@/components/Utilities/BackgroundImg';
import HeaderImg from '@/components/Utilities/HeaderImg';
import ContactUsForm from '@/components/Formular/Contact';
import GoogleMap from '@/components/Utilities/GoogleMap';

const coords = { lat: 55.727014, lng: 12.3736072 }; // Todo: get coordinates
import { GET_CONTACT_FORM_TEXTS } from '~/lib/api';

export default {
  components: {
    BackgroundImg,
    HeaderImg,
    ContactUsForm,
    GoogleMap,
  },
  head() {
    return {
      title: this.data.PageTitle,
      meta: [
        {
          name: 'title',
          content: this.data.MetaTitle || '',
        },
        {
          name: 'description',
          content: this.data.MetaDescription || '',
        },
      ],
    };
  },
  data() {
    return {
      googleMap: {
        config: { zoom: 8, center: coords },
        coords,
        title: 'Nordic It Rental Aps',
      },
    };
  },
  async asyncData({ params, $axios, i18n, app }) {
    const data = await $axios.$get(`/kontakt?_locale=${i18n.locale}`);

    const client = app.apolloProvider.defaultClient;
    const res = await client.query({
      query: GET_CONTACT_FORM_TEXTS,
      variables: { locale: i18n.locale },
    });
    const { contactForm } = res.data;
    return { data, contactForm };
  },
};
</script>

<style lang="scss" scoped>
.title1 {
  font-size: 20px;
}
</style>
