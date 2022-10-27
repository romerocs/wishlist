<script>
import LayoutCluster from "./LayoutCluster.vue";
import ButtonLink from "./ButtonLink.vue";
import IconShoppingCart from "./IconShoppingCart.vue";

export default {
  props: {
    title: String,
    notes: String,
    priority: Number,
    needs: Number,
    url: String
  },
  components: {
    LayoutCluster,
    ButtonLink,
    IconShoppingCart
  },
};
</script>

<template>
  <div class="list-item">
    <LayoutCluster justify="space-between">
      <div>
        <h3>{{ title }}</h3>
        <div class="item-notes">
          <i>{{ notes }}</i>
        </div>
        <div>
          <small>Priority: {{ priority }} | Needs: {{ needs }}</small>
        </div>
      </div>

      <ButtonLink v-bind:url="url" url="https://cromero.io" bg-color="var(--black)">
          <span class='u-show-for-sr'>Shop</span>
          <IconShoppingCart />
      </ButtonLink>
    </LayoutCluster>
  </div>
</template>

<style>
.list-item {
  border: 1px solid var(--gray);
  padding: var(--s0);
  border-radius: var(--border-radius-2x);
}
</style>
