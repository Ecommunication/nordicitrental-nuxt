<template>
  <nav class="navigation">
    <div class="desktop-navigation">
      <div class="nav-item">
        <div class="item-label" @click="throwMainMenuEvent('product')">
          Produkter
        </div>
      </div>

      <div v-for="(nav, index) in navigation" :key="index">
        <div class="nav-item">
          <div class="item-label" @click="clickedMainMenu(index, nav)">
            {{ nav.label }}
          </div>

          <div v-if="showDropdown === index" class="sub-menu">
            <div
              v-for="(item, index) in nav.items"
              :key="index"
              class="item-label col-item"
              @click="goTo(item.link)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </div>


  </nav>
</template>

<script>
export default {
  props: {
    showDropdown: {
      type: Number | Boolean | String,
      required: true
    },
    navigation: {
      type: Array,
      required: true
    }
  },
  mounted() {
    document.addEventListener("click", (e) => {
      e.stopPropagation();
      const isItemLabel = e.target.className.includes('item-label');
      if(!isItemLabel){
        // close menu
        this.throwMainMenuEvent(false)
      }
    })
  },
  methods: {
    clickedMainMenu(navIndex, nav) {
      if (!nav.items.length) {
        this.goTo(nav.link);
      } else {
        this.throwMainMenuEvent(navIndex);
      }
    },
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

<style lang="scss">
.navigation {
  .desktop-navigation {
    display: flex;

    .nav-item {
      position: relative;
      cursor: pointer;
      font-size: 0.8em;
      font-weight: 700;
      margin: 0 14px;
      transition: all 0.2s ease;
      -webkit-transition: all 0.2s ease;

      .item-label {}
      .item-label:hover {
        color: #326fa9;
      }

      .sub-menu {
        font-size: 0.9em;
        position: absolute;
        z-index: 1000;
        left: 50%;
        top: 35px;
        background: #f3f5f4;
        padding: 14px 0;
        transform: translateX(-50%);
        border-top: 1px solid #ececec;
        transition: visibility 0s, opacity 0.4s ease;
        visibility: visible;
        opacity: 1;
        font-weight: 400;
        text-align: left;

        .col-item {
          display: block;
          margin-bottom: 8px;
          width: 250px;
          padding: 10px 20px;
        }

        .col-item:hover {
          color: #326fa9;
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .desktop-navigation {
      display: none;
    }
  }
}
</style>
