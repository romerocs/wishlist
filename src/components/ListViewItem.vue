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
    url: String,
    price: String,
  },
  components: {
    LayoutCluster,
    ButtonLink,
    IconShoppingCart,
  },
};
</script>

<template>
  <div class="list-item">
    <LayoutCluster justify="space-between">
      <div>
        <h3>{{ title }}</h3>
        <div class="notes">
          <div class="price" v-if=price>${{ price }}</div>
          <i>{{ notes }}</i>
        </div>
        <div>
          <small>Priority: {{ priority }} | Needs: {{ needs }}</small>
        </div>
      </div>

      <ButtonLink
        v-bind:url="url"
        v-if="url"
        url="https://cromero.io"
        bg-color="var(--violet-dark)"
      >
        <LayoutCluster justify="space-between" gap="var(--s-3)">
          <IconShoppingCart />
          <span>Buy</span>
        </LayoutCluster>
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

h3 {
  font-size: var(--s3);
}
.price {
  font-weight: 600;
}
</style>
