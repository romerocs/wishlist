<script>
import LayoutStack from "./LayoutStack.vue";
import { store } from "./_store";

export default {
  props: {
    list_id: Number,
    item_id: Number,
    name: String,
    url: String,
    priority: String,
    price: String,
    description: String,
  },
  data() {

    return {
      current_name: this.name,
      current_price: this.price,
      current_url: this.url,
      current_priority: this.priority,
      current_description: this.description,
      updated_name: this.name,
      updated_price: this.price,
      updated_url: this.url,
      updated_priority: this.priority,
      updated_description: this.description,
            errors: {
        name: false,
      },
      errorMessage: undefined,
      updateSuccessful: undefined,
    };
  },
  components: {
    LayoutStack,
  },
  methods: {
    async updateListItem() {
      if (this.updated_name) {
        this.errorMessage = false;
        this.errors.name = false;

        const data = {
          id: this.item_id,
          name: this.updated_name,
          price: this.updated_price ? this.updated_price : false,
          url: this.updated_url ? this.updated_url : false,
          priority: this.updated_priority ? this.updated_priority : false,
          description: this.updated_description
            ? this.updated_description
            : false,
        };

        const res = await fetch(`/.netlify/functions/update_list_item`, {
          method: "POST",
          body: JSON.stringify(data),
        });

        const finalRes = await res;

        if (finalRes.status === 200) {
          this.current_name = this.updated_name;
          this.current_price = this.updated_price;
          this.current_url = this.updated_url;
          this.current_priority = this.updated_priority;
          this.current_description = this.updated_description;
          this.updateSuccessful = true;
        }

      } else {
        this.errorMessage = "Need to have a name for what you want.";
        this.errors.name = true;
      }
    },
    async deleteListItem() {
      const data = {
        id: this.item_id,
      };

      const res = await fetch(`/.netlify/functions/delete_list_item`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      const finalRes = await res;

      if (finalRes.status === 200) {
        store.deleted_item = {
          id: this.item_id,
          list_id: this.list_id,
        };
      }
    },
    openEditModal() {
      this.$refs.dialog.showModal();
    },
    closeModalHandler(e) {
      this.updateSuccessful = undefined;
    },
  },
};
</script>

<template>
  <LayoutStack>
    <h3>
      {{ current_name }}
    </h3>

    <div v-if="description">{{ description }}</div>
    <div v-if="url">{{ url }}</div>
    <div v-if="priority">{{ priority }}</div>
    <div v-if="price">{{ price }}</div>

    <button @click="deleteListItem">Delete</button>
    <button @click="openEditModal">Edit</button>
  </LayoutStack>

  <dialog ref="dialog" @close="closeModalHandler">
    <form method="dialog">
      <button>Close</button>
    </form>

    <form v-on:submit.prevent="updateListItem">
      <LayoutStack gap="var(--s6)">
        <div class="error error_message" v-if="errorMessage">
          {{ errorMessage }}
        </div>

        <!-- TODO: ADD ABILITY TO CLOSE THIS MESSAGE -->
        <div class="success" v-if="updateSuccessful">Updated!</div>
        <input
          :class="{ error_input: errors.name, error: errors.name }"
          v-model="updated_name"
          placeholder="Warm Mittens"
        />
        <input v-model="updated_price" placeholder="$3.99" />
        <input v-model="updated_url" type="url" placeholder="https://" />
        <select v-model="updated_priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <textarea v-model="updated_description" />

        <button type="submit">Update Item</button>
      </LayoutStack>
    </form>
  </dialog>
</template>

<style scoped>
button {
  margin-right: auto;
  background: white;
  border: 1px solid black;
  color: black;
}

dialog {
  width: 50vw;
}

dialog::backdrop {
  background-color: rgb(0 0 0 / 0.8);
}
</style>
