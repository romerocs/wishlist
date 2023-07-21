<script>
import LayoutStack from "./LayoutStack.vue";
import CrudAppListItem from "./CrudAppListItem.vue";
import { store } from "./_store";

export default {
  props: {
    list_id: Number,
  },
  components: {
    CrudAppListItem,
    LayoutStack,
  },
  data() {
    return {
      list_items: [],
      store
    };
  },
  watch: {
    'store.added_item'(newValue) {
      const { list_id } = newValue[0];

      if(this.list_id === list_id) {
        //TODO: ADD VISUAL FEEDBACK THAT ITEM WAS SUCCESSFULLY ADDED.
        this.list_items = [...this.list_items, newValue[0]];
      }
    },
    'store.deleted_item'(newValue) {
      const { id, list_id } = newValue;

      if(this.list_id === list_id) {

        const index = this.list_items.findIndex(item => {
          return item.id === id;
        });

        const listCopy = [...this.list_items];
        listCopy.splice(index, 1);

        this.list_items = [...listCopy];
      }
    }
  },
  async created() {
    //this.getListItems();
  },
  methods: {
    async getListItems() {
      const params = new URLSearchParams({ id: this.list_id });

      const res = await fetch(`/.netlify/functions/get_list_items?${params}`);

      const finalRes = await res.json();
      this.list_items = [...finalRes];
    },
  },
};
</script>

<template>
  <div>
    <LayoutStack>
      <div v-if="list_items.length">
        <div v-for="(list_item, index) in list_items" :key="index">
          <CrudAppListItem :list_id="list_item.list_id" :name="list_item.list_item_name" :url="list_item.list_item_url" :priority="list_item.list_item_priority" :price="list_item.list_item_price" :description="list_item.list_item_description" :item_id="list_item.id"></CrudAppListItem>
        </div>
      </div>
    </LayoutStack>
  </div>
</template>
