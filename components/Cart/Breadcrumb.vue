<template>
  <div class="breadcrumb">
    <div v-for="(item, index) in items" :key="index">
      <div
        class="breadcrumb-item"
        :class="`
        ${path === item.path ? 'selected' : ''}
        ${index === 0 ? 'first-child' : ''}
        ${index === items.length - 1 ? 'last-child' : ''}
        `"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      items: [
        { label: "Bookinger", path: "/kurv" },
        { label: "Ordre", path: "/kurv/ordre" },
        { label: "Kvittering" }
      ]
    };
  },
  created() {
    const { path } = this.$route;
    this.path = path;
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  font-size: 0.8em;

  .breadcrumb-item {
    background: #092d4f;
    color: #ffffff;
    padding: 0 50px;
    line-height: 53px;
  }

  .breadcrumb-item.selected {
    font-weight: bold;
  }
  .breadcrumb-item.first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .breadcrumb-item.last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>
