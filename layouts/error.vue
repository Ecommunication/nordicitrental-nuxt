<template>
  <div class="">
    <HeaderImg img="" text="" />
    <div class="grid-small">
      <div class="row" style="width: 100%">
        <div class="col space-y-4 py-10 text-center" style="width: 100%">
          <h1 class="text-2xl font-semibold text-mainBlue">
            Siden blev desværre ikke fundet
          </h1>
          <img
            src="~/assets/images/icons/404.svg"
            width="400px"
            class="mx-auto"
          />
          <p>Den side du søgte efter blev desværre ikke fundet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderImg from '@/components/Utilities/HeaderImg';

export default {
  components: {
    HeaderImg,
  },
  head() {
    return {
      title: 'Nordic IT Rental - Siden blev ikke fundet',
    };
  },
  async asyncData({ params, $axios }) {
    const data = await $axios.$get('/error-404');
    return { data };
  },
};
</script>
