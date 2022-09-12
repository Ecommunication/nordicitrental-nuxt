<template>
  <div class="employee text-center" v-if="employee">
    <nuxt-img
      class="employee-img mx-auto"
      v-if="employee.AboutUsEmployeesImage"
      :src="employee.AboutUsEmployeesImage.url | formatImage"
      :alt="employee.AboutUsEmployeesImage.alternativeText"
    />
    <h3 class="employee-name">{{ employee.AboutUsEmployeesName }}</h3>
    <p class="employee-title">{{ employee.AboutUsEmployeesTitle }}</p>
  </div>
</template>

<script>
export default {
  props: {
    employee: { type: Object, required: true },
  },
};
</script>
