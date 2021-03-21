<template>
  <div>
    <CoverSlider :slides="frontPageSlider" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      frontPageSlider: []
    }
  },
  async fetch() {
    const home = await fetch(
            'http://localhost:1337/forside'
    ).then(res => res.json());

    this.frontPageSlider = home.FrontPageSlider;
  }
}
</script>
