<script>
import { sortOptions, filterOptions } from "../utilities/vars";
import LayoutCluster from "./LayoutCluster.vue";
import LayoutStack from "./LayoutStack.vue";
import SVGChevron from "./SVGChevron.vue";

export default {
  props: {
    filter: Function,
    sort: Function,
  },
  data() {
    return {
      _sortOptions: sortOptions,
      _filterOptions: filterOptions,
    };
  },
  components: {
    LayoutCluster,
    LayoutStack,
    SVGChevron,
  },
};
</script>

<template>
  <LayoutCluster class="list-view-filter-sort">
    <LayoutStack class="list-view__filter" gap="4px">
      <label for="list-sort">Sort</label>
      <div class="select">
        <select
          name="list-sort"
          id="list-sort"
          @change="(event) => sort(event.target.value)"
        >
          <option
            v-for="(key, index) in Object.keys(_sortOptions)"
            :key="index"
            :value="key"
          >
            {{ _sortOptions[key].label }}
          </option>
        </select>
      </div>
    </LayoutStack>

    <LayoutStack class="list-view__sort" gap="4px">
      <label for="list-sort">Filter</label>
      <div class="select">
        <select
          name="list-filter"
          id="list-filter"
          @change="(event) => filter(event.target.value)"
        >
          <option
            v-for="(key, index) in Object.keys(_filterOptions)"
            :selected="_filterOptions[key].selected"
            :key="index"
            :value="key"
          >
            {{ _filterOptions[key].label }}
          </option>
        </select>
      </div>
    </LayoutStack>
  </LayoutCluster>
</template>

<style lang="scss">
.list-view-filter-sort {
  --padding-block: 6px;
  --padding-inline: 16px;
}

.select {
  position: relative;
  border: 1px solid var(--color-hollow-button-border);
  border-radius: var(--border-radius-button);
  cursor: pointer;
}

.list-view-filter-sort label {
  text-transform: uppercase;
  font-weight: 700;
  font-size: var(--s-3);
  padding-left: 8px;
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
