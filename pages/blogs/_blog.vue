<template>
  <div class="container relative space-y-4 p-5">
    <span class="absolute right-5">{{ blog.published_at | formatDate }}</span>
    <h1 class="text-3xl font-semibold text-mainBlue md:text-5xl">
      {{ blog.Headline }}
    </h1>
    <div class="text-base" v-html="blog.Subline"></div>
    <div v-html="blog.Content"></div>
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
