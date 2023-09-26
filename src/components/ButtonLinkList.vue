<script>
import SVGArrowRight from "./SVGArrowRight.vue";
import ActionItem from "./ActionItem.vue";

export default {
  emits: ["delete"],
  props: {
    url: String
  },
  components: {
    SVGArrowRight,
    ActionItem,
  },
};
</script>
<template>
  <ActionItem>
    <a :href="url">
      <SVGArrowRight :width="10" />
    </a>
  </ActionItem>
</template>
