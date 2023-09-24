<script>
import supabase from "../utilities/supabase";
import LayoutStack from "./LayoutStack.vue";
import LayoutCluster from "./LayoutCluster.vue";
import AppItem from "./AppItem.vue";
import ButtonDelete from "./ButtonDelete.vue";
import ButtonEdit from "./ButtonEdit.vue";
import SVGArrowRight from "./SVGArrowRight.vue";

export default {
  props: {
    item: Object,
    index: Number,
  },
  data() {
    const priority_label = this.item.list_item_is_priority
      ? "You really want this"
      : "You kinda want this";

    return {
      id: this.item.id,
      name: this.item.list_item_name,
      description: this.item.list_item_description,
      url: this.item.list_item_url,
      is_priority: this.item.list_item_is_priority,
      priority_label: priority_label,
      price: this.item.list_item_price,
    };
  },
  components: {
    LayoutStack,
    LayoutCluster,
    AppItem,
    ButtonDelete,
    ButtonEdit,
    SVGArrowRight,
  },
  methods: {
    async togglePriority() {
      const { data, error } = await supabase
        .from("list_items")
        .update({ list_item_is_priority: !this.is_priority })
        .eq("id", this.id);

      if (!error) {
        //loading animation here.
        this.is_priority = !this.is_priority;
      } else {
        //output message to alert bar maybe?
        //or log it somehow
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <AppItem class="list-item">
    <header>
      <LayoutCluster>
        <button
          @click="togglePriority"
          class="priority-toggle"
          role="switch"
          :aria-checked="is_priority"
          type="button"
          :aria-label="priority_label"
        ></button>

        <ButtonEdit @click="$emit('edit', index)" />
        <ButtonDelete @click="$emit('delete', index)" />
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

<style>
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
