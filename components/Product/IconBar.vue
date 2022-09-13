<template>
  <div class="icon-bar">
    <div v-for="icon in icons" :key="icon.key">
      <div class="icon text-center">
        <div class="img-container flex">
          <img
            v-if="icon.img"
            :src="icon.img"
            class="m-auto"
            :alt="icon.value"
          />
        </div>
        <div class="desc">{{ icon.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    features: { type: Array, default: [] },
  },
  computed: {
    icons() {
      return this.iconData
        .map((i) => {
          const feature = this.features.find(
            (f) => f.key.toLowerCase() === i.key.toLowerCase()
          );
          return feature && feature.value
            ? {
                ...i,
                value: this.shortenText(feature.value),
              }
            : null;
        })
        .filter((i) => i);
    },
  },
  data() {
    return {
      iconData: [
        {
          key: 'Processor',
          img: require('@/assets/images/icons/product/mini-specifications/cpu.png'),
        },
        {
          key: 'Ram',
          img: require('@/assets/images/icons/product/mini-specifications/mem.png'),
        },
        {
          key: 'Harddisk',
          img: require('@/assets/images/icons/product/mini-specifications/hdd.png'),
        },
        {
          key: 'Skærm',
          img: require('@/assets/images/icons/product/mini-specifications/screen-size.png'),
        },
        {
          key: 'Opløsning',
          img: require('@/assets/images/icons/product/mini-specifications/screen-resolution.png'),
        },
        {
          key: 'Hard drive',
          img: require('@/assets/images/icons/product/mini-specifications/hdd.png'),
        },
        {
          key: 'Screen',
          img: require('@/assets/images/icons/product/mini-specifications/screen-size.png'),
        },
        {
          key: 'Resolution',
          img: require('@/assets/images/icons/product/mini-specifications/screen-resolution.png'),
        },
      ],
    };
  },
  methods: {
    shortenText(val) {
      return val.length > 14 ? val.substr(0, 14) + ' ...' : val;
    },
  },
};
</script>
