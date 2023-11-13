<script>
import SVGPriorityArrow from "./SVGPriorityArrow.vue";

export default {
  props: {
    priority: {
      validator(value) {
        return ['high', 'low'].includes(value);
      }
    }
  },
  components: {
    SVGPriorityArrow
  },
};
</script>
<template>
  <div
    class="option"
  >
    <SVGPriorityArrow :priority="priority" />
    <span>{{ priority }} Priority</span>
  </div>
</template>

<style>
.option {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  text-transform: capitalize;
}
</style>
