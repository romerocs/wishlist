<script>
import { store } from "./_store";
import { priorityMapToText } from "../utilities/vars";
import LayoutStack from "./LayoutStack.vue";
import LayoutCluster from "./LayoutCluster.vue";
import AppItem from "./AppItem.vue";
import ActionItem from "./ActionItem.vue";
import ButtonDelete from "./ButtonDelete.vue";
import ButtonEdit from "./ButtonEdit.vue";
import SVGArrowRight from "./SVGArrowRight.vue";
import SVGChevron from "./SVGChevron.vue";
import PriorityDropdown from "./PriorityDropdown.vue";
import PriorityLabel from "./PriorityLabel.vue";

export default {
  emits: ["edit", "delete", "priority"],
  props: {
    item: Object,
    id: Number,
    index: Number,
    name: String,
    description: String,
    url: String,
    priority: Boolean,
    price: Number,
    logged_in: Boolean,
  },
  data() {
    return {
      store,
      priorityPaneIsVisible: false,
      _priority: priorityMapToText(this.priority),
    };
  },
  components: {
    AppItem,
    ActionItem,
    ButtonDelete,
    ButtonEdit,
    SVGChevron,
    LayoutCluster,
    LayoutStack,
    PriorityDropdown,
    PriorityLabel,
    SVGArrowRight,
  },
};
</script>

<template>
  <AppItem class="list-item">
    <header>
      <LayoutCluster>
        <PriorityDropdown
          v-if="logged_in"
          :priority="_priority"
          :index="index"
          type="item"
        />
        <PriorityLabel v-else :priority="_priority" />
        <ButtonEdit v-if="logged_in" @click="$emit('edit', index)" />
        <ButtonDelete v-if="logged_in" @click="$emit('delete', index)" />
      </LayoutCluster>
    </header>
    <div class="body">
      <LayoutStack gap="var(--s6)">
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
</style>
