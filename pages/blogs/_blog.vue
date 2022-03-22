<template>
  <div class="container">
    <h1 class="font-semibold text-mainBlue">{{ blog.Headline }}</h1>
    <h2 class="">{{ blog.Subline }}</h2>
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
