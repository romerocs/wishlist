<script>
import { mode, url } from '../utilities/vars';

export default {
  data() {
    return {
      lists: [],
      listName: ''
    };
  },
  async created() {
    this.getLists();
  },
  methods: {
    async getLists() {
      const res = await fetch(
        `${url}/.netlify/functions/get_lists`
      );

      const finalRes = await res.json();

      this.lists = [...finalRes];
    },
    async addList(event) {
      const res = await fetch(`${url}/.netlify/functions/add_list`, {
        method: 'POST',
        body: JSON.stringify({name: this.listName})
      });
      const finalRes = await res.json();

      this.lists = [...this.lists, ...finalRes];
    },
  },
};
</script>

<template>
  <div>
    <input type="text" v-model="listName"/>
    <button @click="addList">Add List</button>

    <table v-if="lists.length">
      <tr>
        <th>List Name</th>
        <th>List ID</th>
      </tr>
      <tr v-for="(list, index) in lists" :key="index">
        <td>
          {{ list.list_name }}
        </td>
        <td>{{ list.id }}</td>
      </tr>
    </table>
  </div>
</template>

<style>
input[type="text"] {
  border: 1px solid black;
}

button {
  background: black;
  color: white;
  padding: 0.5rem 1rem;
}

table {
  color: #333;
  background: white;
  border: 1px solid grey;
  font-size: 12pt;
  border-collapse: collapse;
}
table thead th,
table tfoot th {
  color: #777;
  background: rgba(0,0,0,.1);
}
table caption {
  padding:.5em;
}
table th,
table td {
  padding: .5em;
  border: 1px solid lightgrey;
}
</style>
