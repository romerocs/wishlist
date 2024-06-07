<script>
import supabase from "../utilities/supabase";
import {
  priorityMap,
  priorityMapToText,
  sortOptions,
  filterOptions,
} from "../utilities/vars";
import { store } from "./_store";
import ActionItem from "./ActionItem.vue";
import Button from "./Button.vue";
import LayoutStack from "./LayoutStack.vue";
import LayoutCluster from "./LayoutCluster.vue";
import ListViewFilterSort from "./ListViewFilterSort.vue";
import ListViewItem from "./ListViewItem.vue";
import Modal from "./Modal.vue";
import SVGPlus from "./SVGPlus.vue";
import SVGTrash from "./SVGTrash.vue";
import SidePane from "./SidePane.vue";
import PriorityDropdown from "./PriorityDropdown.vue";
import AppItem from "./AppItem.vue";

export default {
  props: {
    id: Number,
    list: Object,
    list_items: Array,
  },
  async created() {
    const { data, error } = await supabase.auth.getSession();
    const { session } = data;

    store.logged_in = Boolean(session);
    this.logged_in = Boolean(session);
  },
  data() {
    const list_items_unpurchased = this.list_items.filter(
      (item) => item.list_item_is_purchased !== true
    );

    const list_items_sorted_by_priority = list_items_unpurchased.sort(
      (a, b) => {
        return a.list_item_is_priority < b.list_item_is_priority ? 1 : -1;
      }
    );

    return {
      name: this.list.list_name,
      list_items_unfiltered: this.list_items,
      listItems: list_items_sorted_by_priority,
      priorityMapToText: priorityMapToText,
      currentItem: {},
      currentItemIndex: 0,
      itemToAdd: {},
      filterState: filterOptions.notpurchased.value,
      sortState: sortOptions.priority_high_low.value,
      logged_in: false,
      store,
      sortOptions,
    };
  },
  components: {
    ActionItem,
    Button,
    LayoutCluster,
    LayoutStack,
    ListViewFilterSort,
    ListViewItem,
    Modal,
    SidePane,
    SVGPlus,
    SVGTrash,
    PriorityDropdown,
    AppItem,
  },
  watch: {
    "store.priority_change": {
      handler({ index, value, type }) {
        
        if (type === "item") {
          store.priority_change.value = value;
          this.togglePriority(index, value, type);
        }
        
        if (type === "form") {
          this.currentItem.list_item_is_priority = priorityMap[value];
          this.itemToAdd.list_item_is_priority = priorityMap[value];
        };
      },
      deep: true,
    },
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
        this.$refs.sidePaneEdit.$el.close();

        this.filter(this.filterState);
        this.sort(this.sortState);
      } else {
        //output message to alert bar maybe?
        //or log it somehowd
        console.log(error);
      }
    },
    async addListItemSubmit() {
      this.itemToAdd.list_id = this.id;


      const {
        data: [added_item],
        error,
      } = await supabase.from("list_items").insert(this.itemToAdd).select();

      if (!error) {
        //loading animation here.

        this.listItems.push(added_item);

        this.$refs.sidePaneAdd.$el.close();
      } else {
        //output message to alert bar maybe?
        //or log it somehow
        console.log(error);
      }
    },
    
    async togglePriority(index, value, type) {
      const updatedPriority = priorityMap[value];

      this.currentItem = this.listItems[index];
      this.currentItem.list_item_is_priority = updatedPriority;
      const { id } = this.currentItem;

      const { data, error } = await supabase
        .from("list_items")
        .update({ list_item_is_priority: updatedPriority })
        .eq("id", id);

      if (error) {
        console.log(error);
      }
    },
    openDeleteListItemModal(itemIndex) {
      this.currentItem = this.listItems[itemIndex];
      this.currentItemIndex = itemIndex;
      this.$refs.deleteListItemModal.$el.showModal();
    },
    openAddListPane() {
      this.itemToAdd = {};

      this.$refs.sidePaneAdd.$el.showModal();
    },
    openEditListPane(itemIndex) {
      this.currentItem = this.listItems[itemIndex];
      this.currentItemIndex = itemIndex;

      this.$refs.sidePaneEdit.$el.showModal();
    },
    sort(sortType) {
      this.sortState = sortType;

      switch (sortType) {
        case sortOptions.priority_low_high.value:
          this.listItems = this.listItems.sort((a, b) => {
            return a.list_item_is_priority - b.list_item_is_priority;
          });
          break;
        case sortOptions.priority_high_low.value:
          this.listItems = this.listItems.sort((a, b) => {
            return a.list_item_is_priority < b.list_item_is_priority ? 1 : -1;
          });
          break;
        case sortOptions.price_high_low.value:
          this.listItems = this.listItems.sort((a, b) => {
            return Number(a.list_item_price) < Number(b.list_item_price)
              ? 1
              : -1;
          });
          break;
        case sortOptions.price_low_high.value:
          this.listItems = this.listItems.sort((a, b) => {
            return Number(a.list_item_price) - Number(b.list_item_price);
          });
          break;
      }
    },
    filter(filterType) {
      this.filterState = filterType;

      switch (filterType) {
        case "purchased":
          this.listItems = this.list_items_unfiltered.filter(
            (item) => item.list_item_is_purchased
          );
          break;
        case "notpurchased":
          this.listItems = this.list_items_unfiltered.filter(
            (item) => !item.list_item_is_purchased
          );
          break;
        case "link":
          this.listItems = this.list_items_unfiltered.filter(
            (item) => item.list_item_url
          );
          break;
        case "nolink":
          this.listItems = this.list_items_unfiltered.filter(
            (item) => !item.list_item_url
          );
          break;
      }

      this.sort(this.sortState);
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
  <SidePane ref="sidePaneEdit">
    <div>
      <LayoutStack>
        <h2>Edit</h2>

        <PriorityDropdown
          :disabled="currentItem.list_item_is_purchased"
          :priority="priorityMapToText(currentItem.list_item_is_priority)"
          :index="currentItemIndex"
          type="form"
        />

        <div>
          <input
            type="text"
            placeholder="Name"
            :disabled="currentItem.list_item_is_purchased"
            v-model="currentItem.list_item_name"
          />
        </div>

        <div>
          <input
            type="url"
            placeholder="https://www.amazon.com"
            :disabled="currentItem.list_item_is_purchased"
            v-model="currentItem.list_item_url"
          />
        </div>

        <div class="price">
          <input
            type="number"
            step="0.01"
            placeholder="20.99"
            :disabled="currentItem.list_item_is_purchased"
            v-model.number="currentItem.list_item_price"
          />
        </div>

        <div>
          <textarea
            rows="10"
            :disabled="currentItem.list_item_is_purchased"
            v-model="currentItem.list_item_description"
          ></textarea>
        </div>

        <ActionItem class="purchased-checkbox">
          <input
            type="checkbox"
            v-model="currentItem.list_item_is_purchased"
            :checked="currentItem.list_item_is_purchased"
          />

          Mark as purchased
        </ActionItem>
        <button
          class="button button-save"
          @click="editListItemSubmit"
        >
          Save
        </button>
      </LayoutStack>
    </div>
  </SidePane>
  <SidePane ref="sidePaneAdd">
    <div>
      <LayoutStack>
        <h2>Add Item</h2>

        <PriorityDropdown
          :disabled="itemToAdd.list_item_is_purchased"
          :priority="priorityMapToText(false)"
          :index="0"
          type="form"
        />

        <div>
          <input
            type="text"
            placeholder="Name"
            :disabled="itemToAdd.list_item_is_purchased"
            v-model="itemToAdd.list_item_name"
          />
        </div>

        <div>
          <input
            type="url"
            placeholder="https://www.amazon.com"
            :disabled="itemToAdd.list_item_is_purchased"
            v-model="itemToAdd.list_item_url"
          />
        </div>

        <div class="price">
          <input
            type="number"
            step="0.01"
            placeholder="20.99"
            :disabled="itemToAdd.list_item_is_purchased"
            v-model.number="itemToAdd.list_item_price"
          />
        </div>

        <div>
          <textarea
            rows="10"
            :disabled="itemToAdd.list_item_is_purchased"
            v-model="itemToAdd.list_item_description"
          ></textarea>
        </div>

        <button
          class="button button-save"
          @click="addListItemSubmit"
        >
          Save
        </button>
      </LayoutStack>
    </div>
  </SidePane>
  <div class="list-view">
    <LayoutStack gap="var(--s8)">
      <h1>{{ name }}</h1>

      <LayoutStack>
        <LayoutCluster align="flex-end">
          <ListViewFilterSort :sort="sort" :filter="filter" />
          <Button
            v-if="logged_in"
            @click="openAddListPane"
            style="margin-left: auto"
          >
            <LayoutCluster justify="center">
              <span>Add Item</span>
              <SVGPlus />
            </LayoutCluster>
          </Button>
        </LayoutCluster>

        <ListViewItem
          v-for="(item, index) in listItems"
          :key="item.id"
          v-if="listItems.length"
          :id="item.id"
          :index="index"
          :item="item"
          :name="item.list_item_name"
          :description="item.list_item_description"
          :url="item.list_item_url"
          :price="Number(item.list_item_price)"
          :priority="item.list_item_is_priority"
          :logged_in="logged_in"
          @delete="openDeleteListItemModal"
          @edit="openEditListPane"
        />

        <AppItem class="empty-state" v-else>
          <LayoutStack>
            <div class="emoji">😢</div>
            <div>No Results</div>
          </LayoutStack>
        </AppItem>
      </LayoutStack>
    </LayoutStack>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/4-components/button";

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

.purchased-checkbox {
  --purchased-checkbox-color: var(--grass-green);
  --color-hollow-button-border: var(--purchased-checkbox-color);
  position: relative;
  color: var(--hunter-green);
  padding: var(--s1) var(--action-item-inline-padding);
  gap: 8px;

  input {
    overflow: hidden;
    -webkit-appearance: none;
    appearance: none;
    padding: 0;
    margin: 0;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    border: 1px solid var(--purchased-checkbox-color);
  }

  input::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-image: var(--icon-checkmark);
    background-size: 90%;
    background-position: center;
    background-color: var(--purchased-checkbox-color);
  }

  input:checked::before {
    opacity: 1;
  }

  input:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}

.button-save {
  flex-basis: 100%;
}
.empty-state {
  display: grid;
  place-content: center;
  font-size: var(--s4);
  aspect-ratio: 2 / 1;
  text-align: center;
}

.empty-state .emoji {
  font-size: var(--s9);
  line-height: 1;
}
</style>
