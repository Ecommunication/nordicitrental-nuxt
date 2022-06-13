<template>
  <div>
    <HeaderImg
      :img="blogpage.ImageCover.url | formatImage"
      :text="blogpage.TextCover"
    />
    <div class="container my-10 flex flex-col space-y-5 px-5">
      <div
        v-for="blog in blogs"
        :key="blog.id"
        class="mx-auto flex transform cursor-pointer transition-transform duration-300 hover:scale-105"
      >
        <nuxt-link
          :to="localePath(`/blogs/${blog.slug}`)"
          class="flex flex-col gap-10 md:flex-row md:gap-20"
        >
          <div class="relative flex flex-col md:w-1/2">
            <nuxt-img
              :src="blog.FeatureImage.url"
              format="webp"
              fit="cover"
              :alt="blog.Headline"
            />
          </div>
          <div class="my-auto flex flex-col justify-between md:w-1/2">
            <p class="text-sm font-thin text-black">
              <i class="far fa-clock" /> {{ blog.PublishDate | formatDate }}
            </p>
            <h3 class="text-lg font-semibold text-mainBlue">
              {{ blog.Headline }}
            </h3>
            <div v-html="blog.Subline" class="text-base font-normal"></div>
            <span
              class="w-10 whitespace-nowrap border-b-2 border-mainBlue text-base"
              >LÆS MERE</span
            >
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
