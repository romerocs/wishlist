<script>
import LayoutStack from "./LayoutStack.vue";
import LayoutCluster from "./LayoutCluster.vue";
import AppItem from "./AppItem.vue";
import ButtonDelete from "./ButtonDelete.vue";
import ButtonEdit from "./ButtonEdit.vue";
import SVGArrowRight from "./SVGArrowRight.vue";
import PriorityToggle from "./PriorityToggle.vue";

export default {
  emits: ['edit', 'delete', 'priority'],
  props: {
    item: Object,
    id: Number,
    index: Number,
    name: String,
    description: String,
    url: String,
    is_priority: Boolean,
    price: Number,
    logged_in: Boolean
  },
  data() {
    return {
      isPriority: this.is_priority
    };
  },
  components: {
    AppItem,
    ButtonDelete,
    ButtonEdit,
    LayoutCluster,
    LayoutStack,
    PriorityToggle,
    SVGArrowRight,
  }
};
</script>

<template>
  <AppItem class="list-item">
    <header>
      <LayoutCluster>
        <PriorityToggle @click="logged_in && $emit('priority', index)" :logged_in="logged_in" :is_priority="is_priority" />

        <ButtonEdit v-if="logged_in" @click="$emit('edit', index)" />
        <ButtonDelete v-if="logged_in" @click="$emit('delete', index)" />
      </LayoutCluster>
    </header>
    <div class="body">
      <LayoutStack>
        <h2>{{ name }}</h2>
        <p v-if="description">
          {{ description }}
        </p>

        <a
          v-if="url"
          :href="url"
          target="_blank"
          class="button price-button"
          style="margin-right: auto"
        >
          <span v-if="price">${{ price }}</span>
          <SVGArrowRight style="translate: 0 2px" />
        </a>
      </LayoutStack>
    </div>
  </AppItem>
</template>

<style lang="scss" scoped>
@use "../styles/4-components/button";

.list-item header {
  line-height: 1;
  padding: var(--s1) var(--app-item-inline-padding);
  border-bottom: 1px solid var(--app-item-border-color);
}

.list-item .body {
  padding: var(--s6) var(--app-item-inline-padding);
}

.price-button {
  display: flex;
  align-items: baseline;
  line-height: 1;
  gap: 10px;
}

.priority-toggle {
  width: 22px;
  aspect-ratio: 1 / 1;
  border: 2px solid var(--white);
  border-radius: 22px;
  outline: 2px solid var(--gray-15);
  background-color: var(--gray-15);
  transition: all 100ms linear;
}

.priority-toggle[aria-checked="true"] {
  outline: 2px solid var(--gray-35);
  background-color: var(--hotpink-70);
  background: radial-gradient(
    circle,
    rgba(250, 107, 171, 1) 60%,
    rgba(123, 4, 58, 1) 100%
  );
}
</style>
