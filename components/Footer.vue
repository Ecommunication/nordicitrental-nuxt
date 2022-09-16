<i18n>
{
  "en": {
    "newsletter":"Newsletter"
  },
  "da": {
    "newsletter":"Nyhedsbrev"

  }
}
</i18n>

<template>
  <footer class="bg-blue pt-5 pb-1" id="main-footer">
    <div class="footer-container">
      <div class="footer-1">
        <div class="footer-col" v-html="footer.widget1" />
        <div class="footer-col" v-html="footer.widget2" />
        <div class="footer-col" v-html="footer.widget3" />
        <div class="footer-col">
          <div>
            <p>
              <strong>{{ $t('newsletter') }}</strong>
            </p>
            <div>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
      <div class="footer-2">
        <div class="footer-col">
          <div class="ref-company-logo-bar">
            <span v-for="(image, index) in footer.images" :key="index">
              <img
                class="logo"
                :src="image.Image.url | formatImage"
                :alt="image.Image.alternativeText"
              />
            </span>
            <a
              href="https://www.linkedin.com/company/nordic-it-retnal-aps"
              target="_blank"
              rel="noreferrer"
            >
              <img
                :src="'/uploads/linked_in_9ba84ec3c3.png' | formatImage"
                alt="Nordic IT Rental - Linkedin"
              />
            </a>
            <a href="https://www.facebook.com/nordicitrental" target="_blank" rel="noreferrer">
              <img
                :src="'/uploads/FB_icon_29ff5245e9.png' | formatImage"
                alt="Nordic IT Rental - Facebook"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import NewsletterForm from '@/components/Formular/Newsletter';

export default {
  components: {
    NewsletterForm,
  },
  props: ['footer'],
  mounted() {},
};
</script>
