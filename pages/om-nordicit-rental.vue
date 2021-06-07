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
      <BackgroundImg
        v-if="data.ImageCover"
        :minHeight="420"
        :src="data.ImageCover.url | formatImage"
        style="display: flex; align-items: center;"
      >
        <template v-slot:body>
          <h1 class="slider-title title-white">{{ data.TextCover }}</h1>
        </template>
      </BackgroundImg>

      <!-- Todo: create row/col grid structure for responsive feature. Currently not provided both in here and the home page components -->
      <div class="index-letter-box wrap-grid grid-cols-2">
        <TextCard
          v-if="data.LeftTextCol1"
          :contentHtml="data.LeftTextCol1"
          backgroundClass="bg-gray-dark"
          padding="55px"
        />
        <BackgroundImg
          v-if="data.RightImageCol1"
          :minHeight="500"
          :src="data.RightImageCol1.url | formatImage"
        />
      </div>

      <div class="section">
        <TextCard v-if="data.MidTextCol2" :contentHtml="data.MidTextCol2" />
      </div>

      <div class="section bg-blue">
        <RefCompanyLogoBar :companies="data.MidColReference3" />
      </div>

      <div class="section bg-gray-dark wrap-grid wrap-2">
        <div v-for="quote in data.MidColReference4" :key="quote.id">
          <RefCompanyQuote
            :logo="quote.MidColReference4Logo"
            :author="quote.MidColReference4Author"
            :text="quote.MidColReference4Text"
          />
        </div>
      </div>

      <div class="section employee-table">
        <h3>{{ data.EmployeeHeader }}</h3>
        <div style="display: flex; flex-wrap: wrap; justify-content: center;">
          <div
            v-for="employee in [
              ...data.AboutUsEmployees,
              ...data.AboutUsEmployees,
              ...data.AboutUsEmployees,
              ...data.AboutUsEmployees,
               ...data.AboutUsEmployees,
                ...data.AboutUsEmployees
            ]"
            :key="employee.id"
          >
            <Employee :employee="employee" style="width: 300px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextCard from "@/components/Utilities/TextCard";
import BackgroundImg from "@/components/Utilities/BackgroundImg";
import RefCompanyLogoBar from "@/components/AboutUs/RefCompanyLogoBar";
import RefCompanyQuote from "@/components/AboutUs/RefCompanyQuote";
import Employee from "@/components/AboutUs/Employee";
export default {
  components: {
    TextCard,
    BackgroundImg,
    RefCompanyLogoBar,
    RefCompanyQuote,
    Employee
  },
  data() {
    return {
      data: null,
      errorAfterFetch: null,
      apiUrl: process.env.apiUrl
    };
  },
  async fetch() {
    // Todo: this may be changed with asyncData (by using $axios) for preventing entering route before fetching all data.
    const path = "/om-os";
    try {
      this.data = await fetch(this.apiUrl + path).then(r => r.json());
      console.log(this.data.ImageCover);
    } catch (e) {
      this.errorAfterFetch = e;
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 42px 230px;
}
.employee-table {
  h3 {
    margin: 40px 0;
    font-size: 40px;
    color: #092d4f;
  }
}
</style>
