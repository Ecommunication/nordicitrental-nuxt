<template>
  <div class="container relative space-y-4 p-5">
    <nuxt-img :src="blog.FeatureImage.url" class="w-full"></nuxt-img>
    <div class="md:w-3/4 w-10/12 mx-auto space-y-4">
      <h1 class="text-3xl font-semibold text-mainBlue md:text-5xl">
        {{ blog.Headline }}
      </h1>
      <div class="text-base" v-html="blog.Subline"></div>
      <span class="text-sm"
        ><i class="far fa-clock" /> {{ blog.published_at | formatDate }}</span
      >
      <div v-html="blog.Content"></div>
      <div class="space-x-10 border-t-2 pt-4">
        <nuxt-link to="/" class="text-base">
          <span
            ><i class="fas fa-chevron-left" /> Forrige nyhed</span
          ></nuxt-link
        >
        <nuxt-link to="/" class="text-base"
          ><span>Næste nyhed <i class="fas fa-chevron-right" /></span
        ></nuxt-link>
      </div>
      <div class="border-b-2 pb-4 text-base">
        <nuxt-link to="/blog">Til oversigten</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_BLOG_BY_SLUG } from '@/lib/api';
export default {
  async asyncData({ i18n, app, params, $axios, $config }) {
    const client = app.apolloProvider.defaultClient;
    const res = await client.query({
      query: GET_BLOG_BY_SLUG,
      variables: { locale: i18n.locale, slug: params.blog },
    });
    const blog = res.data.blogs[0];

    return { blog };
  },
  data() {
    return {};
  },
  head() {
    return {
      title: this.blog?.MetaTitle || '',
      meta: [
        {
          name: 'title',
          content: this.blog?.MetaTitle || '',
        },
        {
          name: 'description',
          content: this.blog?.MetaDescription || '',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
