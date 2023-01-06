<script>
import LayoutCluster from "./LayoutCluster.vue";

export default {
  props: {
    filter: Function,
    sort: Function
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
            <option value="all">All Items</option>
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

<style>
.select {
  position: relative;
}

.select::after {
  content: "";
  position: absolute;
  background-image: url("/images/chevron.svg");
  background-size: cover;
  top: 50%;
  right: 12px;
  width: 12px;
  height: 13.71px;
  transform: translateY(-50%);
}
</style>
