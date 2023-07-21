<script>
import LayoutStack from "./LayoutStack.vue";
import { store } from "./_store";

export default {
  components: {
    LayoutStack,
  },
  props: {
    list_id: Number
  },
  data() {
    return {
      name: undefined,
      errors: {
        name: false,
      },
      price: undefined,
      url: undefined,
      priority: "medium",
      description: undefined,
      errorMessage: undefined,
      store
    };
  },
  methods: {
    async addListItem(e) {
      if (this.name) {
        this.errorMessage = false;
        this.errors.name = false;

        const data = {
          id: this.list_id,
          name: this.name,
          price: this.price ? this.price : false,
          url: this.url ? this.url : false,
          priority: this.priority ? this.priority : false,
          description: this.description ? this.description : false,
        };

        const res = await fetch(`/.netlify/functions/add_list_item`, {
          method: "POST",
          body: JSON.stringify(data),
        });

        const finalRes = await res.json();

        store.added_item = finalRes;

      } else {
        this.errorMessage = "Need to have a name for what you want.";
        this.errors.name = true;
      }
    },
  },
};
</script>
<template>
  <form v-on:submit.prevent="addListItem">
    <LayoutStack gap="var(--s6)">
      <div class="error error_message" v-if="errorMessage">
        {{ errorMessage }}
      </div>
      <input
        :class="{ error_input: errors.name, error: errors.name }"
        v-model="name"
        placeholder="Warm Mittens"
      />
      <input v-model="price" placeholder="$3.99" />
      <input v-model="url" type="url" placeholder="https://" />
      <select v-model="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <textarea v-model="description" />

      <button type="submit">Add Item</button>
    </LayoutStack>
  </form>
</template>

<style>
.error {
  color: red;
  border-color: currentColor;
}

.error_input {
  border-width: 2px;
}
</style>
