<script>
import { url } from "../utilities/vars";
import supabase from "../utilities/supabase";
import CrudAppFormAddListItem from "./CrudAppFormAddListItem.vue";
import CrudAppListItems from "./CrudAppListItems.vue";

export default {
  components: {
    CrudAppListItems,
    CrudAppFormAddListItem,
  },
  props: {
    url: String,
  },
  data() {
    return {
      lists: [],
      listName: "",
    };
  },
  async created() {
    this.getLists();
  },
  methods: {
    async getLists() {
      const { data: lists, error } = await supabase.from("lists").select("*");

      const finalRes = lists;

      this.lists = [...finalRes];
    },
    async addList(event) {

      const { data, error } = await supabase
        .from("lists")
        .insert([{ list_name: this.listName }])
        .select();

      const finalRes = data;

      this.lists = [...this.lists, ...data];
    },
  },
};
</script>

<template>
  <div>
    <input type="text" v-model="listName" />
    <button @click="addList">Add List</button>

    <div v-if="lists.length">
      <div v-for="(list, index) in lists" :key="index">
        <h2>{{ list.list_name }}</h2>

        <CrudAppFormAddListItem :list_id="list.id"></CrudAppFormAddListItem>
        <CrudAppListItems :list_id="list.id"></CrudAppListItems>
      </div>
    </div>
  </div>
</template>

<style>
h2 {
  margin-top: var(--s6);
}

input,
select,
textarea {
  border: 1px solid black;
}

button {
  background: black;
  color: white;
  padding: 0.5rem 1rem;
}
</style>
