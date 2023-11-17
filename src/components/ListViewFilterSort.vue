<script>
import { sortOptions } from "../utilities/vars";
import LayoutCluster from "./LayoutCluster.vue";
import SVGChevron from "./SVGChevron.vue";

export default {
  props: {
    filter: Function,
    sort: Function,
  },
  data() {
    return {
      _sortOptions: sortOptions,
    };
  },
  components: {
    LayoutCluster,
    SVGChevron,
  },
};
</script>

<template>
  <LayoutCluster>
    <div class="list-view__filter">
      <div class="select">
        <select name="list-filter" id="list-filter" @change="sort">
          <option>Sort by</option>
          <option v-for="(key, index) in Object.keys(_sortOptions)" :key="index" :value="key">{{ _sortOptions[key].label }}</option>
        </select>
      </div>
    </div>

    <!-- <div class="list-view__sort">
      <div class="select">
        <select name="list-filter" id="list-sort" @change="sort">
          <option value="default">Default</option>
          <option value="high">Priority: High to Low</option>
          <option value="low">Priority: Low to High</option>
        </select>
        <SVGChevron width="12px" />
      </div>
    </div> -->
  </LayoutCluster>
</template>

<style lang="scss">
.select {
  --padding-block: 6px;
  --padding-inline: 16px;

  position: relative;
  border: 1px solid var(--color-hollow-button-border);
  border-radius: var(--border-radius-button);
  cursor: pointer;
}

.select select {
  padding: var(--padding-block) var(--padding-inline);
  padding-right: calc(var(--padding-inline) * 2.5);
  position: relative;
  z-index: 1;
}

.select:after {
  content: "";
  position: absolute;
  top: 50%;
  right: var(--padding-inline);
  translate: 0 -50%;
  width: 14px;
  height: 14px;
  background-image: var(--icon-chevron-down);
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
