<template>
  <div class="page-services">
    <HeaderImg
      v-if="data.ImageCover"
      :img="data.ImageCover.url | formatImage"
      :text="data.TextCover"
    />

    <div class="row">
      <div class="col-md-6 px-0 py-0">
        <TextCard
          v-if="data.LeftTextCol1"
          :contentHtml="data.LeftTextCol1"
          backgroundClass="bg-white"
          largeCSS="padding: 45px 170px;"
        >
          <template v-slot:actions>
            <div>
              <div class="button btn-primary" @click="showModal">
                {{ data.CallMe }}
              </div>

              <Modal
                :title="`modal-call-me-form`"
                v-show="isModalVisible"
                @close="closeModal"
                :width="600"
              >
                <template v-slot:header>{{ data.CallMe }} </template>
                <template v-slot:body>
                  <CallMeForm />
                </template>
              </Modal>
            </div>
          </template>
        </TextCard>
      </div>
      <div class="col-md-6 px-0 py-0">
        <TextCard
          v-if="data.RightTextCol1"
          :contentHtml="data.RightTextCol1"
          backgroundClass="bg-blue"
          :dark="true"
          largeCSS="padding: 45px 170px;"
        >
          <template v-slot:actions>
            <Button :button="buttons.goToProduct" />
          </template>
        </TextCard>
      </div>
    </div>

    <div id="service-rentrange" class="row">
      <div class="col-md-6 px-0 py-0" style="min-height: 526px; width: 100%">
        <BackgroundImg
          v-if="data.LeftImageCol2"
          :src="data.LeftImageCol2.url | formatImage"
        />
      </div>
      <div class="col-md-6 px-0">
        <TextCard
          style="height: 100%"
          v-if="data.RightTextCol2"
          :contentHtml="data.RightTextCol2"
          backgroundClass="bg-gray-darkest"
          largeCSS="padding: 45px 170px;"
        />
      </div>
    </div>

    <div id="service-howto" class="row">
      <div class="col px-0 py-0" style="width: 100%">
        <TextCard
          v-if="data.MidTextCol3"
          :contentHtml="data.MidTextCol3"
          backgroundClass="bg-blue"
          :dark="true"
          containerCSS="max-width: 1600px; margin: 0 auto;"
        >
          <template v-slot:actions>
            <nuxt-link class="kontakt-os-btn" :to="localePath('/kontakt')">{{
              data.ContactUs
            }}</nuxt-link>
          </template>
        </TextCard>
      </div>
    </div>

    <div id="service-reasons" class="row">
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

    <div id="service-handle" class="row service-lad-os-overtage">
      <div class="col w-100 px-0">
        <TextCard
          v-if="data.MidTextCol5"
          :contentHtml="data.MidTextCol5"
          backgroundClass="bg-blue"
          :dark="true"
          containerCSS="max-width: 1600px; margin: 0 auto;"
        />
      </div>
    </div>

    <div class="row grid-small">
      <div class="col pt-8" style="width: 100%">
        <ContactUsForm
          :title="data.ContactHeader"
          formTitle="Bliv ringet op"
          :formTexts="contactForm"
          style="margin: 30px auto"
          customCSS="justify-content: center;"
          titleStyle="font-size: 40px; margin-bottom: 24px;"
        >
          <template v-slot:left-col>
            <img
              src="~/assets/images/employee_mic.png"
              alt="Kontakt"
              class=""
            />
            <div
              class="pr-20 text-left text-base"
              v-html="forsideData.IndexContactRightInfo"
            ></div>
          </template>
        </ContactUsForm>
      </div>
    </div>
  </div>
</template>

<script>
import TextCard from '@/components/Utilities/TextCard';
import HeaderImg from '@/components/Utilities/HeaderImg';
import BackgroundImg from '@/components/Utilities/BackgroundImg';
import Button from '@/components/Utilities/Button';
import ContactUsForm from '@/components/Formular/Contact';
import Modal from '@/components/Utilities/Modal';
import CallMeForm from '@/components/Utilities/CallMeForm';
import { GET_CONTACT_FORM_TEXTS } from '~/lib/api';

export default {
  components: {
    TextCard,
    HeaderImg,
    BackgroundImg,
    Button,
    ContactUsForm,
    Modal,
    CallMeForm,
  },
  computed: {
    currentRouteHash() {
      return this.$router.currentRoute.hash.replace('#', '');
    },
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
      isModalVisible: false,
      data: null,
      errorAfterFetch: null,
      buttons: {
        goToProduct: {
          label: 'Se Produkter',
          variant: 'btn-dark',
          action: {
            type: 'link',
            href: '/produkt-kategori',
          },
        },
      },
    };
  },
  async asyncData({ params, $axios, i18n, app }) {
    const data = await $axios.$get(`/services?_locale=${i18n.locale}`);
    const forsideData = await $axios.$get(`/forside?_locale=${i18n.locale}`);

    const client = app.apolloProvider.defaultClient;
    const res = await client.query({
      query: GET_CONTACT_FORM_TEXTS,
      variables: { locale: i18n.locale },
    });
    const { contactForm } = res.data;

    return { data, forsideData, contactForm };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
