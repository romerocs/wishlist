<!-- TODO: POST QUESTION ABOUT HYDRATION IN EITHER ASTRO OR VUE DISCUSSION BOARD -->
<!-- TODO: CHECK IF LIST NAME ALREADY EXISTS BEFORE ADDING -->
<script>
import supabase from "../utilities/supabase";

import Button from "./Button.vue";
import LayoutStack from "./LayoutStack.vue";
import LayoutCluster from "./LayoutCluster.vue";
import SVGPencil from "./SVGPencil.vue";
import SVGTrash from "./SVGTrash.vue";
import SVGArrowRight from "./SVGArrowRight.vue";
import SVGPlus from "./SVGPlus.vue";
import ListMenuItem from "./ListMenuItem.vue";
import Modal from "./Modal.vue";

export default {
  components: {
    LayoutCluster,
    LayoutStack,
    ListMenuItem,
    Modal,
    SVGArrowRight,
    SVGPencil,
    SVGPlus,
    SVGTrash,
    Button,
  },
  props: {
    lists_server_side: Array,
    url: String,
  },
  data() {
    return {
      lists: this.lists_server_side,
      listName: "",
      editListIndex: 0,
      deleteListIndex: 0,
    };
  },
  methods: {
    async editList() {
      const list = this.lists[this.editListIndex];
      const { id } = list;

      const { data, error } = await supabase
        .from("lists")
        .update({ list_name: this.listName })
        .eq("id", id);

      if (!error) {
        //loading animation here.
        list.list_name = this.listName;
        this.lists[this.editListIndex] = list;
        this.$refs.editListModal.$el.close();
      } else {
        //output message to alert bar maybe?
        //or log it somehow
        console.log(error);
      }
    },
    async addList(event) {
      //TODO: ENSURE LIST NAME IS NOT EMPTY!!
      const { data, error } = await supabase
        .from("lists")
        .insert([{ list_name: this.listName }])
        .select();

      const finalRes = data;

      this.lists = [...this.lists, ...data];
      this.$refs.addListModal.$el.close();
    },
    async deleteList() {
      const list = this.lists[this.deleteListIndex];
      const { id } = list;

      //ask to confirm before deleting, using modal
      const { data, error } = await supabase
        .from("lists")
        .delete()
        .eq("id", id);

      if (!error) {
        //loading animation here.
        this.lists.splice(this.deleteListIndex, 1);
        this.$refs.deleteListModal.$el.close();
      } else {
        //output message to alert bar maybe?
        //or log it somehow
        console.log(error);
      }
    },
    openEditListModal(listIndex) {
      this.editListIndex = listIndex;
      this.listName = this.lists[listIndex].list_name;
      this.$refs.editListModal.$el.showModal();
    },
    openAddListModal() {
      this.listName = "";
      this.$refs.addListModal.$el.showModal();
    },
    openDeleteListModal(listIndex) {
      this.deleteListIndex = listIndex;
      this.listName = this.lists[listIndex].list_name;

      this.$refs.deleteListModal.$el.showModal();
    },
  },
};
</script>
<template>
  <Modal ref="addListModal">
    <LayoutStack gap="var(--s4)">
      <input v-model="listName" />
      <button class="button" @click="addList">Add List</button>
    </LayoutStack>
  </Modal>
  <Modal ref="editListModal">
    <LayoutStack gap="var(--s4)">
      <input v-model="listName" />
      <button class="button" @click="editList">Save</button>
    </LayoutStack>
  </Modal>
  <Modal ref="deleteListModal">
    <LayoutStack gap="var(--s4)" style="text-align: center">
      <p>
        Delete <b>{{ listName }}</b
        >?
      </p>
      <button class="button" @click="deleteList"><SVGTrash /></button>
    </LayoutStack>
  </Modal>

  <nav class="list-navigation" v-if="lists.length">
    <LayoutStack gap="var(--s-2)">
      <Button @click="openAddListModal" style="margin-left: auto">
        <LayoutCluster justify="center">
          <span>Add List</span>
          <SVGPlus />
        </LayoutCluster>
      </Button>
      <div v-for="(list, index) in lists" :key="index">
        <ListMenuItem
          @delete="openDeleteListModal"
          @edit="openEditListModal"
          :name="list.list_name"
          :id="list.id"
          :list-items="list.list_items"
          :index="index"
        />
      </div>
    </LayoutStack>
  </nav>
</template>

<style>
.btn-add-list {
  color: var(--gray-50);
  line-height: 1;
  font-weight: 700;
  text-transform: uppercase;
  font-size: var(--s-2);
  padding: var(--padding-input);
  border: 1px dashed var(--color-hollow-button-border);
  border-radius: var(--border-radius-2x);
  box-shadow: var(--box-shadow-app-item) var(--color-app-item-shadow);
  transition: all 200ms linear;
}

.btn-add-list:hover {
  color: var(--gray-65);
  box-shadow: var(--box-shadow-app-item) var(--gray-35);
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
