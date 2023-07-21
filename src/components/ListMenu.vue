<!-- TODO: POST QUESTION ABOUT HYDRATION IN EITHER ASTRO OR VUE DISCUSSION BOARD -->
<!-- TODO: CHECK IF LIST NAME ALREADY EXISTS BEFORE ADDING -->
<script>
import supabase from "../utilities/supabase";

export default {
  props: {
    data: Array,
  },
  data() {
    return {
      lists: [],
      listName: "",
    };
  },
  async created() {
    this.lists = this.data;

    // const { data: { user } } = await supabase.auth.getUser();
    // console.log(user);
    //this.getLists();
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
    async deleteList(event) {
      const { id } = event.target;

      const { data: list_items, error: error_list_items } = await supabase
        .from("list_items")
        .delete()
        .eq("list_id", id);

      console.log(error_list_items);

      const { data, error } = await supabase
        .from("lists")
        .delete()
        .eq("id", id);

      console.log(error);
      // const finalRes = data;

      //this.lists = [...this.lists, ...data];
      this.lists = [...this.lists];
    },
    openModal() {
      this.$refs.modal.showModal();
      this.$refs.listNameInput.focus();
    },
    closeModal() {
      this.$refs.modal.close();
    },
  },
};
</script>
<template>
  <dialog ref="modal">
    <button @click="closeModal">Close</button>
    <input type="text" v-model="listName" ref="listNameInput" />
    <button @click="addList">Add List</button>
  </dialog>

  <nav class="list-navigation" v-if="lists.length">
    <ul role="list" v-for="(list, index) in lists" :key="index">
      <li>
        <a :href="'\/lists\/' + list.id">{{ list.list_name }}</a>
        <button @click="deleteList" ref="deleteButton" v-bind:id="list.id">
          Delete
        </button>
      </li>
    </ul>
  </nav>
  <button @click="openModal">Add List</button>
</template>

<style>
.list-navigation {
  min-width: 15.625rem;
}

.list-navigation > *:before,
.list-navigation > *:after {
  content: "";
  width: 100%;
  height: 1px;
  display: block;
}

.list-navigation > *:before {
  transform: translateY(-2px);
}

.list-navigation > * {
  margin: 0;
  padding: 0;
}

.list-navigation a {
  color: var(--gray-1);
  font-weight: 700;
  text-decoration: none;
  display: block;
  width: 100%;
  padding: var(--s-3) var(--s10) var(--s-3) var(--s0);
  background: linear-gradient(
    90deg,
    hsl(90deg 100% 44%) 0%,
    hsl(88deg 100% 44%) 21%,
    hsl(87deg 100% 44%) 30%,
    hsl(86deg 100% 44%) 39%,
    hsl(84deg 100% 44%) 46%,
    hsl(83deg 100% 44%) 54%,
    hsl(82deg 100% 44%) 61%,
    hsl(80deg 100% 44%) 69%,
    hsl(79deg 100% 44%) 79%,
    hsl(78deg 100% 44%) 100%
  );
  border-radius: var(--border-radius-2x);
}

.list-navigation > * > *:not(:first-child):before {
  content: "";
  width: 100%;
  height: 1px;
  display: block;
  transform: translateY(-2px);
}
</style>
