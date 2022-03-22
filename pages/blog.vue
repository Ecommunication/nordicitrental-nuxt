<template>
  <div>
    <HeaderImg
      :img="blogpage.ImageCover.url | formatImage"
      :text="blogpage.TextCover"
    />
    <div
      class="container my-10 grid grid-cols-1 gap-10 px-10 md:grid-cols-2 xl:grid-cols-3"
    >
      <div
        v-for="blog in blogs"
        :key="blog"
        class="flex transform cursor-pointer flex-col transition-transform duration-300 hover:scale-110"
      >
        <nuxt-link :to="`/blogs/${blog.slug}`">
          <div class="flex justify-between">
            <h3 class="text-lg font-semibold text-mainBlue">
              {{ blog.Headline }}
            </h3>
            <p class="text-right text-sm font-thin text-black">
              {{ blog.published_at | formatDate }}
            </p>
          </div>
          <div
            class="aspect-square flex flex-col rounded-md bg-mainBlue p-4 shadow-md"
          >
            <nuxt-img
              :src="blog.FeatureImage.url"
              fit="cover"
              format="webp"
              quality="90"
            />
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderImg from '@/components/Utilities/HeaderImg';
import { GET_BLOG_PAGE_AND_BLOGS } from '@/lib/api';
export default {
  components: { HeaderImg },
  async asyncData({ i18n, app, params, $axios, $config }) {
    const client = app.apolloProvider.defaultClient;
    const res = await client.query({
      query: GET_BLOG_PAGE_AND_BLOGS,
      variables: { locale: i18n.locale },
    });
    const { blogpage, blogs } = res.data;

    console.log(blogpage);

    return { blogpage, blogs };
  },
  data() {
    return {};
  },
  head() {
    return {
      title: this.blogpage?.MetaTitle || '',
      meta: [
        {
          name: 'title',
          content: this.blogpage?.MetaTitle || '',
        },
        {
          name: 'description',
          content: this.blogpage?.MetaDescription || '',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.aspect-square {
  aspect-ratio: 1/1;
}
</style>
