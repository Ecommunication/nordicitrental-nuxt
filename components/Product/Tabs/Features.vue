<template>
  <div class="features-table" style="width: 100%">
    <div class="table-row" v-for="(feature, index) in features" :key="index">
      <div class="table-key">{{ feature.key }}</div>
      <div class="table-value">{{ feature.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    features: { type: Array, required: true }
  }
};
</script>

<style lang="scss" scoped>
.features-table {
  font-size: 0.7em;
}
.table-row {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid rgb(231, 231, 231);

  .table-key {
    width: 40%;
    padding-left: 15px;
  }
  .table-value {
    width: 60%;
    padding-left: 15px;
  }
}
</style>
