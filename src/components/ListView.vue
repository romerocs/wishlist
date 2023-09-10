<script>
import LayoutStack from "./LayoutStack.vue";
import ListViewFilterSort from "./ListViewFilterSort.vue";
import ListViewItem from "./ListViewItem.vue";

export default {
  props: {
    id: Number,
    list: Object
  },
  data() {
    return {
      name: ""
    };
  },
  created() {
    console.log(this.list);
    this.name = this.list.list_name;
  },
  components: {
    LayoutStack,
    ListViewItem,
    ListViewFilterSort,
  },
  methods: {
    filter(event) {
      const filterType = event.target.value;

      switch (filterType) {
        case "purchased":
          this.items = this.data.filter((item) => {
            return item.has >= item.needs;
          });
          break;
        case "link":
          this.items = this.data.filter((item) => {
            return item.hasOwnProperty('url');
          });
          break;
        case "all":
          this.items = this.data;
          break;
      }
    },
    sort(event) {
      const sortType = event.target.value;

      switch (sortType) {
        case "low":
          this.items = Array.from(this.data).sort((a, b) => {
            return a.priority - b.priority;
          });
          break;
        case "high":
          this.items = Array.from(this.data).sort((a, b) => {
            return a.priority < b.priority ? 1 : -1;
          });
          break;
        case "default":
          this.items = Array.from(this.data).sort((a, b) => {
            return a.index - b.index;
          });
          break;
      }
    },
  },
};
</script>

<template>
  <div class="list-view">
    <LayoutStack gap="var(--s6)">
      <h1>{{name}}</h1>
    </LayoutStack>
  </div>
</template>

<style>

</style>
