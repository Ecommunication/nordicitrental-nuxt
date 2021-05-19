<template>
  <div>
    Google map
  </div>
</template>

<script>
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
export default {
  head() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
        }
      ]
    };
  },
  methods: {},
  mounted() {

  },
  data() {
    return {};
  }
};
</script>
