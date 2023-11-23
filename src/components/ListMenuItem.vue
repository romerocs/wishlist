<script>
import { listPath } from "../utilities/vars";
import LayoutStack from "./LayoutStack.vue";
import LayoutCluster from "./LayoutCluster.vue";
import SVGPlus from "./SVGPlus.vue";
import AppItem from "./AppItem.vue";
import ButtonDelete from "./ButtonDelete.vue";
import ButtonEdit from "./ButtonEdit.vue";
import ButtonLinkList from "./ButtonLinkList.vue";

export default {
  emits: ["delete", "edit"],
  components: {
    LayoutCluster,
    LayoutStack,
    SVGPlus,
    AppItem,
    ButtonDelete,
    ButtonEdit,
    ButtonLinkList,
  },
  props: {
    name: String,
    id: Number,
    listItems: Object,
    index: Number,
    logged_in: Boolean
  },
  data() {
    return {
      items: [],
      itemCount: 0,
      url: "",
    };
  },
  async created() {
    const list_items_unpurchased = this.listItems.filter(item => item.list_item_is_purchased !== true);
    
    this.itemCount = list_items_unpurchased ? list_items_unpurchased.length : 0;

    this.url = `${listPath}${this.id}`;
  },
};
</script>
<template>
  <AppItem class="list-menu-item">
    <LayoutCluster justify="space-between">
      <h3>{{ name }}</h3>

      <div class="indicator">{{ itemCount }}</div>

      <LayoutCluster>
        <ButtonEdit v-if="logged_in" @click="$emit('edit', index)" />
        <ButtonDelete v-if="logged_in" @click="$emit('delete', index)" />
        <ButtonLinkList :url="url" />
      </LayoutCluster>
    </LayoutCluster>
  </AppItem>
</template>

<style>
.list-menu-item {
  padding: var(--s3) var(--padding-inline-app-item);
}

.indicator {
  margin-right: auto;
  width: 22px;
  height: 22px;
  border-radius: 22px;
  background-color: var(--gray-15);
  color: var(--gray-65);
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--s-2);
}
</style>
