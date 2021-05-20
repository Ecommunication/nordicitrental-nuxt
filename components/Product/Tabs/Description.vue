<template>
  <div class="description-tab">
    <h3 class="title">{{title}}</h3>
    <div class="description">{{desc}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      desc: String
    }
  }
</script>

<style lang="scss" scoped>
.description-tab {
  padding: 0 25px;
}
.title {
  margin-bottom: 20px;
}
.description {
  font-size: 0.75em;
  line-height: 25px;
}
</style>
