<template>
  <div class="w-100">
    <div class="tabs">
      <div v-for="(tab, index) in tabs" :key="index">
        <div
          @click="changeTab(index)"
          class="tab"
          :class="index === selected ? 'active' : ''"
        >
          {{ tab }}
        </div>
      </div>
    </div>
    <div class="tab-body">
      <div v-if="selected === 0">
        <DescriptionTab :description="description" />
      </div>
      <div v-else-if="selected === 1">
        <FeaturesTab :features="features" />
      </div>
    </div>
  </div>
</template>

<script>
import DescriptionTab from '@/components/Product/Tabs/Description';
import FeaturesTab from '@/components/Product/Tabs/Features';
export default {
  components: { DescriptionTab, FeaturesTab },
  props: {
    description: { type: String, required: true },
    features: { type: Array, required: true },
  },
  data() {
    return {
      selected: 0,
      tabs: ['Beskrivelse', 'Yderligere information'],
    };
  },
  methods: {
    changeTab(index) {
      this.selected = index;
    },
  },
};
</script>
