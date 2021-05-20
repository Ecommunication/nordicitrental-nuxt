<template>
  <div class="features-table" style="width: 100%">
    <!-- Todo: make it dynamic according to data type -->
    <div class="table-row">
      <div class="table-key">Mærke</div>
      <div class="table-value">Apple</div>
    </div>

    <div class="table-row">
      <div class="table-key">Model</div>
      <div class="table-value">iPad Air</div>
    </div>

    <div class="table-row">
      <div class="table-key">Processor</div>
      <div class="table-value">
        A7-processor med 64-bit-arkitektur og M7-bevægelseshjælpeprocessor
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
