<script>
import supabase from "../utilities/supabase";
import { listPath } from "../utilities/vars";
import LayoutStack from "./LayoutStack.vue";
import LayoutCluster from "./LayoutCluster.vue";
import SVGPencil from "./SVGPencil.vue";
import SVGTrash from "./SVGTrash.vue";
import SVGArrowRight from "./SVGArrowRight.vue";
import SVGPlus from "./SVGPlus.vue";
import ButtonAction from "./ButtonAction.vue";

export default {
  emits: ['delete', 'edit'],
  components: {
    LayoutCluster,
    LayoutStack,
    SVGArrowRight,
    SVGPencil,
    SVGTrash,
    SVGPlus,
    ButtonAction,
  },
  props: {
    name: String,
    id: Number,
    listItems: Object,
    index: Number
  },
  data() {
    return {
      items: [],
      itemCount: 0,
      url: ''
    };
  },
  async created() {
    this.itemCount = this.listItems ? this.listItems.length : 0;

    this.url = `${listPath}${this.id}`;
  }
};
</script>
<template>
  <div class="list-menu-item">
    <LayoutCluster justify="space-between">
      <h3>
        <a :href="url">{{ name }}</a>
      </h3>

      <div class="indicator">{{ itemCount }}</div>

      <LayoutCluster>
        <ButtonAction  @click="$emit('edit', index)" label="Edit">
          <SVGPencil />
        </ButtonAction>
        <ButtonAction @click="$emit('delete', index)" label="Delete">
          <SVGTrash />
        </ButtonAction>
      </LayoutCluster>
    </LayoutCluster>
  </div>
</template>

<style>
.list-menu-item {
  color: var(--text-color);
  border: 1px solid var(--gray-25);
  background-color: var(--color-app-item-background);
  padding: var(--s3) var(--padding-inline-app-item);
  border-radius: var(--border-radius-app-item);
  box-shadow: var(--box-shadow-app-item) var(--color-app-item-shadow);
  transition: all 200ms linear;
}

.list-menu-item:hover {
  --color-app-item-background: var(--white);
  --color-app-item-shadow: var(--hotpink-80);
}


.list-menu-item a {
  color: inherit;
  text-decoration-color: var(--grass-green);
  text-decoration-thickness: 3px;
  text-underline-offset: 3px;
  transition: all 250ms ease-in-out;
}

.list-menu-item a:hover {
  text-decoration-color: var(--hotpink-70);
  text-shadow: 0px 0px 6px var(--hotpink-90);
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
