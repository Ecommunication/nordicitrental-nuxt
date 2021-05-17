<template>
  <!-- About Us -->
  <div>
    <p class="grid-small margin-center" v-if="$fetchState.pending">
      Indlæser side
    </p>
    <p
      class="grid-small margin-center"
      v-else-if="$fetchState.error || errorAfterFetch"
    >
      Vi kunne desværre ikke indlæse siden i øjeblikket. Prøv igen senere.
    </p>

    <div v-else-if="data">
      <div class="index-letter-box wrap-grid grid-cols-2">
        <div
          v-if="data.LeftTextCol1"
          v-html="data.LeftTextCol1"
          class="outline pl-32 pr-32 pt-20 pb-10 bg-gray-dark"
        />
        <div class="grid grid-rows-2 outline">
          <!--  <div
            v-if="data.RightImageCol1"
            class="outline outline-image-box"
            :style="
              'background-image: url(http://localhost:1337' +
                data.RightImageCol1.url +
                ')'
            "
          /> -->
          <BackgroundImg
            :minHeight="500"
            :src="apiUrl + data.RightImageCol1.url"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundImg from "@/components/Utilities/BackgroundImg";
export default {
  components: {
    BackgroundImg
  },
  data() {
    return {
      data: null,
      errorAfterFetch: null,
      apiUrl: process.env.apiUrl
    };
  },
  async fetch() { // Todo: this may be changed with asyncData (by using $axios) for preventing entering route before fetching all data.
    const path = "/om-os";
    try {
      this.data = await fetch(this.apiUrl + path).then(r => r.json());
      console.log(this.data);
    } catch (e) {
      this.errorAfterFetch = e;
      console.log(e);
    }
  }
};
</script>
