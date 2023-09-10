<script>
import LayoutCluster from "./LayoutCluster.vue";
import LayoutStack from "./LayoutStack.vue";
import ButtonLink from "./ButtonLink.vue";
import SVGArrowRight from "./SVGArrowRight.vue";
import SVGInfo from "./SVGInfo.vue";

export default {
  props: {
    title: String,
    notes: String,
    priority: String,
    needs: Number,
    url: String,
    price: String,
  },
  components: {
    ButtonLink,
    SVGArrowRight,
    SVGInfo,
    LayoutCluster,
    LayoutStack,
    LayoutStack
  },
  data() {
    const bgColor = `var(--priority-${this.priority.toLowerCase()})`;

    return {
      bgColor: bgColor,
    };
  }
};
</script>

<template>
  <div class="list-item">
    <LayoutStack>
      <LayoutCluster justify="space-between">
        <div class="priority">{{ priority }}</div>
        
        <div class="info"><SVGInfo /></div>
      </LayoutCluster>

      <LayoutStack gap="var(--s5)">

        <h3>{{ title }}</h3>

        <a class="link" :style="{ marginTop: 'auto'}" :href="url" v-if="url">
          <span v-if="price">{{ price }}</span> <SVGArrowRight />
        </a>
        <div v-else-if="price">
          {{ price }}
        </div>
      </LayoutStack>
    </LayoutStack>
  </div>
</template>

<style scoped>
.list-item {
  border: 1px solid var(--gray);
  padding: var(--s0);
  border-radius: var(--border-radius-2x);
  background-color: v-bind(bgColor);
  padding: var(--s8);
  aspect-ratio: 1 / 1;
}

.list-item :deep(.l-stack) {
  height: 100%;
}

h3 {
  font-size: var(--s8);
  line-height: 1.07;
}

.priority {
  text-transform: uppercase;
  line-height: 1;
  letter-spacing: 1.1px;
  font-size: var(--s-1);
}

.link {
  border: 3px solid var(--gray-1);
  text-decoration: none;
  border-bottom-width: 6px;
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 700;
  display: inline-flex;
  gap: var(--s-4);
  margin-left: auto;
  background-color: var(--hotpink-70);
}

.link:active {
  color: inherit;
  border-bottom-width: 3px;
}

</style>
