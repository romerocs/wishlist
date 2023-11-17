<script>
import { store } from "./_store";
import { priorityMapToText } from "../utilities/vars";
import SVGPriorityArrow from "./SVGPriorityArrow.vue";
import PriorityLabel from "./PriorityLabel.vue";
import AppItem from "./AppItem.vue";
import ActionItem from "./ActionItem.vue";
import SVGChevron from "./SVGChevron.vue";

export default {
  props: {
    type: String,
    index: Number,
    priority: {
      validator(value) {
        return ["high", "low"].includes(value);
      },
    },
  },
  data() {
    return {
      store,
      _priority: this.priority,
      priorityPaneIsVisible: false,
    };
  },
  watch: {
    priority: {
      handler(newValue, oldValue) {
        if(this._priority === undefined) this._priority = this.priority;
        
      },
    },
    "store.priority_change": {
      handler({index, value}) {
        if (this.index === index) {
          this._priority = value;
        }
      },
      deep: true
    },
  },
  components: {
    AppItem,
    ActionItem,
    SVGChevron,
    PriorityLabel,
    SVGPriorityArrow,
  },
  methods: {
    togglePriorityPane() {
      this.priorityPaneIsVisible = !this.priorityPaneIsVisible;
    },
    setPriority(priority) {
      this._priority = priority;
      this.priorityPaneIsVisible = false;

      store.priority_change = {
        "index" : this.index,
        "value" : priority,
        "type"  : this.type
      }
    },
  },
};
</script>
<template>
  <div class="priority-dropdown-wrapper">
    <ActionItem class="priority-dropdown" ref="priorityButton">
      <button @click="togglePriorityPane">
        <PriorityLabel v-if="_priority" :priority="_priority" />
        <span v-else>Set Priority</span>
        <SVGChevron width="12px" />
      </button>
    </ActionItem>

    <AppItem
      role="radiogroup"
      aria-label="Priorities"
      v-if="priorityPaneIsVisible"
      class="priority-dropdown-pane"
      ref="priorityDropdown"
    >
      <PriorityLabel
        aria-checked="false"
        role="radio"
        priority="high"
        @click="setPriority('high')"
      />
      <PriorityLabel role="radio" priority="low" @click="setPriority('low')" />
    </AppItem>
  </div>
</template>

<style lang="scss" scoped>
.priority-dropdown-wrapper {
  position: relative;
  font-size: var(--s-1);
}

.priority-dropdown {
  position: relative;
  padding-inline: 0;
  background-color: var(--white);
}
.priority-dropdown button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--gap-action-inputs-column);
}

.priority-dropdown-pane {
  position: absolute;
  z-index: 2;
  background-color: var(--white);
  width: 100%;
  margin-top: 4px;
  border-radius: var(--border-radius-button);
  border-color: var(--color-hollow-button-border);
}
.priority-dropdown-pane > * {
  padding: 10px 8px;
  border-top: 1px solid var(--app-item-border-color);
}
.priority-dropdown-pane > *:first-child {
  border-top: none;
}
</style>
