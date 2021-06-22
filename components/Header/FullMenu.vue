<template>
  <div class="full-width-menus" :class="show ? 'active' : ''">
    <div class="menu-container">
      <div class="menu-col" v-for="(cat, index) in items" :key="index">
        <nuxt-link
          v-for="(item, index) in cat"
          :key="item.id"
          class="item-label text-blue mb-3"
          :class="index === 0 ? 'col-title' : 'col-item'"
          :to="`/${index === 0 ? 'produkt-kategori' : 'produkt'}/${item.Slug}`"
        >
          <div
            style="display: flex;"
            @mouseenter="
              () => (hover = index !== 0 ? cat[0].id + item.id : null)
            "
            @mouseleave="() => (hover = null)"
          >
            <div class="mr-2">{{ item.Name }}</div>
            <div class="hover-icon">
              <img
                v-show="hover === cat[0].id + item.id"
                :src="require('@/assets/images/icons/menu/hover.svg')"
              />
            </div>
          </div>
        </nuxt-link>
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
    throwMainMenuEvent(val) {
      this.$emit("onClickMainMenu", val);
    }
  },
  data() {
    return {
      hover: null
    };
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

      .item-label {
        .hover-icon {
          height: 21px;
          width: 21px;
          img {
            object-fit: contain;
            height: 100%;
            width: 100%;
          }
        }
      }
      .item-label:hover {
        color: #009edd;
      }

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
