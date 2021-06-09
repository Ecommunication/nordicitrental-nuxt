<template>
  <footer class="bg-blue pt-5 pb-1">
    <div class="footer-container">
      <div class="footer-1">
        <div class="footer-col" v-html="footer.widget1" />
        <div class="footer-col" v-html="footer.widget2" />
        <div class="footer-col" v-html="footer.widget3" />
        <div class="footer-col">
          <div>
            <p><strong>Nyhedsbrev</strong></p>
            <div>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
      <div class="footer-2">
        <div class="footer-col">
          <RefCompanyLogoBar
            style="text-align: left;"
            :images="footer.images.map(item => $formatImage(item.Image.url))"
            elStyle="margin: 1em 3em 1em 0;"
          />
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import NewsletterForm from "@/components/Formular/Newsletter";
import RefCompanyLogoBar from "@/components/AboutUs/RefCompanyLogoBar";

export default {
  components: {
    NewsletterForm,
    RefCompanyLogoBar
  },
  props: ["footer"]
};
</script>

<style lang="scss">
footer {
  font-weight: 300;
  font-size: 0.9em;
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;

    .footer-col {
      padding: 16px 40px;
    }

    .footer-1 {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 24px;
      justify-content: space-between;
    }

    .footer-2 {
      border-top: 1px solid #395a79;
    }
  }
}
</style>
