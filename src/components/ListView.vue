<script>
import supabase from "../utilities/supabase";
import LayoutStack from "./LayoutStack.vue";
import LayoutCluster from "./LayoutCluster.vue";
import ListViewFilterSort from "./ListViewFilterSort.vue";
import ListViewItem from "./ListViewItem.vue";
import Modal from "./Modal.vue";
import SVGTrash from "./SVGTrash.vue";
import SidePane from "./SidePane.vue";

export default {
  props: {
    id: Number,
    list: Object,
  },
  data() {
    return {
      name: this.list.list_name,
      listItems: this.list.list_items,
      currentEditItemIndex: 0,
      currentEditItem: [],
      currentDeleteItemIndex: 0,
      currentDeleteItem: [],
    };
  }, 
  components: {
    LayoutStack,
    LayoutCluster,
    ListViewItem,
    ListViewFilterSort,
    Modal,
    SVGTrash,
    SidePane
  },
  updated() {
    console.log(this.listItems);
  },
  methods: {
    async deleteListItem() {
      const { id } = this.currentDeleteItem;

      //ask to confirm before deleting, using modal
      const { data, error } = await supabase
        .from("list_items")
        .delete()
        .eq("id", id);
      if (!error) {
        //loading animation here.
        this.listItems.splice(this.currentDeleteItemIndex, 1);
      } else {
        //output message to alert bar maybe?
        //or log it somehowd  
        console.log(error);
      }
    },
    editListItemSubmit() {
      this.listItems.splice(this.currentEditItemIndex, 1, this.currentEditItem);
    },
    openDeleteListItemModal(itemIndex) {
      this.currentDeleteItem = this.listItems[itemIndex];
      this.currentDeleteItemIndex = itemIndex;

      this.$refs.deleteListItemModal.$el.showModal();
    },
    openEditListPane(itemIndex) {
      this.currentEditItem = this.listItems[itemIndex];
      this.currentEditItemIndex = itemIndex;

      this.$refs.editPane.$el.showModal();
    },
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
            return item.hasOwnProperty("url");
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
  <Modal ref="deleteListItemModal">
    <LayoutStack gap="var(--s4)" style="text-align: center">
      <p>
        Delete <b>{{ currentDeleteItem.list_item_name }}</b
        >?
      </p>
      <button class="button" @click="deleteListItem"><SVGTrash /></button>
    </LayoutStack>
  </Modal>
  <SidePane ref="editPane">
    <div>
      <LayoutStack> 
        <h2>Edit</h2>

        <div>
          <input type="text" placeholder="Name" v-model="currentEditItem.list_item_name">
        </div>

        <div>
          <input type="url" placeholder="https://www.amazon.com" v-model="currentEditItem.list_item_url">
        </div>

        <div class="price">
          <input type="number" step="0.01" placeholder="20.99" v-model="currentEditItem.list_item_price">
        </div>

        <div>
          <textarea rows="10" v-model="currentEditItem.list_item_description"></textarea>
        </div>

        <div>
          [toggle priority heres]
        </div>

        <div>
          <button class="button" @click="editListItemSubmit">Save</button>
        </div>
      </LayoutStack>
    </div>
  </SidePane>
  <div class="list-view">
    <LayoutStack gap="var(--s6)">
      <h1>{{ name }}</h1>

      <LayoutStack>
        <div v-for="(item, index) in listItems" :key="item.id">
          <ListViewItem
            :item="item"
            @delete="openDeleteListItemModal"
            @edit="openEditListPane"
            :index="index"
          />
        </div>
      </LayoutStack>
    </LayoutStack>
  </div>
</template>

<style>
  .price {
    position: relative;
  }

  .price:before {
    content: "";
    position: absolute;
    top: 50%;
    left: var(--padding-input);
    translate: 0 -50%;
    width: 16px;
    height: 16px;
    background-image: var(--icon-dollar-sign);
    background-size: cover;
  }

  .price input {
    padding-left: 30px;
  }
</style>
