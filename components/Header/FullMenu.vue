<template>
  <div class="full-width-menus" :class="show ? 'active' : ''">
    <div class="menu-container">
      <div class="menu-col" v-for="(cat, index) in items" :key="index">
        <div
          v-for="(item, index) in cat"
          :key="item.id"
          class="item-label"
          :class="index === 0 ? 'col-title' : 'col-item'"
          @click="
            goTo(`/produkt-kategori/${item.Slug}`)
          "
        >
          {{ item.Name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    items: { type: Array, default: [] }
  },
  methods: {
    goTo(path) {
      this.throwMainMenuEvent(false);
      this.$router.push(path);
    },
    throwMainMenuEvent(val) {
      this.$emit("onClickMainMenu", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.full-width-menus {
  font-size: 0.8em;
  width: 100%;
  position: absolute;
  background: #f3f5f4;
  z-index: 1000;
  padding: 16px;
  border-top: 1px solid #ececec;
  transition: visibility 0s, opacity 0.4s ease;
  visibility: hidden;
  opacity: 0;
  .menu-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 940px;
    margin: auto;

    .menu-col {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin: 8px 0px;

      .col-title {
        font-weight: 700;
        color: #092d4f;
      }
      .col-title,
      .col-item {
        cursor: pointer;
        margin-bottom: 8px;
      }
    }
  }
}
.full-width-menus.active {
  visibility: visible;
  opacity: 1;
}
</style>
