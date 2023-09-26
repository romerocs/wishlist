<script>
import supabase from "../utilities/supabase";
import Button from "./Button.vue";
import LayoutStack from "./LayoutStack.vue";
import LayoutCluster from "./LayoutCluster.vue";
import ListViewFilterSort from "./ListViewFilterSort.vue";
import ListViewItem from "./ListViewItem.vue";
import Modal from "./Modal.vue";
import SVGPlus from "./SVGPlus.vue";
import SVGTrash from "./SVGTrash.vue";
import SidePane from "./SidePane.vue";

export default {
  props: {
    id: Number,
    list: Object,
    list_items: Array,
  },
  data() {
    return {
      name: this.list.list_name,
      listItems: this.list_items,
      currentItem: {},
      currentItemIndex: 0,
      sidePaneMode: {
        edit: false,
        add: false
      }
    };
  },
  components: {
    Button,
    LayoutStack,
    LayoutCluster,
    ListViewItem,
    ListViewFilterSort,
    Modal,
    SVGTrash,
    SVGPlus,
    SidePane,
  },
  methods: {
    async deleteListItem() {
      const { id } = this.currentItem;

      //ask to confirm before deleting, using modal
      const { data, error } = await supabase
        .from("list_items")
        .delete()
        .eq("id", id);

      if (!error) {
        //loading animation here.
        this.listItems.splice(this.currentItemIndex, 1);
        this.$refs.deleteListItemModal.$el.close();
      } else {
        //output message to alert bar maybe?
        //or log it somehowd
        console.log(error);
      }
    },
    async editListItemSubmit() {
      const { id } = this.currentItem;

      const { data, error } = await supabase
        .from("list_items")
        .update(this.currentItem)
        .eq("id", id);

      if (!error) {
        //loading animation here.
        this.$refs.sidePane.$el.close();
        this.sidePaneMode.edit = false;
      } else {
        //output message to alert bar maybe?
        //or log it somehowd
        console.log(error);
      }
    },
    async addListItemSubmit() {
      this.currentItem.list_id = this.id;

      const { data, error } = await supabase
        .from("list_items")
        .insert(this.currentItem)
        .select();

      if (!error) {
        //loading animation here.
        this.listItems.push(this.currentItem);
        this.$refs.sidePane.$el.close();
        this.sidePaneMode.add = false;
      } else {
        //output message to alert bar maybe?
        //or log it somehowd
        console.log(error);
      }
    },
    openDeleteListItemModal(itemIndex) {
      this.currentItem = this.listItems[itemIndex];
      this.currentItemIndex = itemIndex;
      this.$refs.deleteListItemModal.$el.showModal();
    },
    openAddListPane() {
      this.sidePaneMode.add = true;
      this.$refs.sidePane.$el.showModal();
    },
    openEditListPane(itemIndex) {
      this.sidePaneMode.edit = true;
      this.currentItem = this.listItems[itemIndex];
      this.currentItemIndex = itemIndex;

      this.$refs.sidePane.$el.showModal();
    },
  },
};
</script>

<template>
  <Modal ref="deleteListItemModal">
    <LayoutStack gap="var(--s4)" style="text-align: center">
      <p>
        Delete <b>{{ currentItem.list_item_name }}</b
        >?
      </p>
      <button class="button" @click="deleteListItem"><SVGTrash /></button>
    </LayoutStack>
  </Modal>
  <SidePane ref="sidePane">
    <div>
      <LayoutStack>
        <h2 v-if="sidePaneMode.edit">Edit</h2>
        <h2 v-if="sidePaneMode.add">Add Item</h2>

        <div>
          <input
            type="text"
            placeholder="Name"
            v-model="currentItem.list_item_name"
          />
        </div>

        <div>
          <input
            type="url"
            placeholder="https://www.amazon.com"
            v-model="currentItem.list_item_url"
          />
        </div>

        <div class="price">
          <input
            type="number"
            step="0.01"
            placeholder="20.99"
            v-model.number="currentItem.list_item_price"
          />
        </div>

        <div>
          <textarea
            rows="10"
            v-model="currentItem.list_item_description"
          ></textarea>
        </div>

        <div>[toggle priority heres]</div>

        <div>
          <button class="button" v-if="sidePaneMode.edit" @click="editListItemSubmit">Save</button>
          <button class="button" v-if="sidePaneMode.add" @click="addListItemSubmit">Save</button>
        </div>
      </LayoutStack>
    </div>
  </SidePane>
  <div class="list-view">
    <LayoutStack gap="var(--s6)">
      <h1>{{ name }}</h1>

      <LayoutStack>
        <Button @click="openAddListPane" style="margin-left: auto">
          <LayoutCluster justify="center">
            <span>Add List</span>
            <SVGPlus />
          </LayoutCluster>
        </Button>
        <div v-for="(item, index) in listItems" :key="item.id">
          <ListViewItem
            :id="item.id"
            :index="index"
            :item="item"
            :name="item.list_item_name"
            :description="item.list_item_description"
            :url="item.list_item_url"
            :price=Number(item.list_item_price)
            :is_priority="item.list_item_is_priority"
            @delete="openDeleteListItemModal"
            @edit="openEditListPane"
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

<!-- 

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
 -->
