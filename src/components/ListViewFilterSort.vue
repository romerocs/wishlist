<script>
import LayoutCluster from "./LayoutCluster.vue";

export default {
  props: {
    filter: Function,
    sort: Function,
  },
  components: {
    LayoutCluster,
  },
};
</script>

<template>
  <LayoutCluster gap="var(--s8)">
    <div class="list-view__filter">
      <LayoutCluster gap="var(--s0)" justify="flex-start">
        <label for="list-filter">Filter:</label>

        <div class="select">
          <select name="list-filter" id="list-filter" @change="filter">
            <option value="all">View All</option>
            <option value="purchased">Purchased</option>
            <option value="link">Items with link</option>
          </select>
        </div>
      </LayoutCluster>
    </div>

    <div class="list-view__sort">
      <LayoutCluster gap="var(--s0)">
        <label for="list-sort">Sort:</label>

        <div class="select">
          <select name="list-filter" id="list-sort" @change="sort">
            <option value="default">Default</option>
            <option value="high">Priority: High to Low</option>
            <option value="low">Priority: Low to High</option>
          </select>
        </div>
      </LayoutCluster>
    </div>
  </LayoutCluster>
</template>

<style lang="scss">
.select {
  position: relative;
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;
  box-shadow: var(--shadow-elevation-low);

  select,
  &::after {
    grid-area: select;
  }

  min-width: 15ch;
  max-width: 30ch;

  border-radius: 0.25em;

  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;

  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

  &::after {
    content: "";
    background-image: var(--select-arrow);
    top: 0;
    right: 12px;
    z-index: 2;
    display: block;
    position: absolute;
    width: 16px;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
}
</style>
