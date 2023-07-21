<script>
import supabase from "../utilities/supabase";
import cookie from "cookie";

export default {
  props: {
    url: String
  },
  async created() {
    this.getLists();

    const { data, error } = await supabase.auth.getSession();

    this.isLoggedIn = Boolean(data.session);
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    async signInWithGoogle() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${this.url}/`,
        },
      });
    },
    async logOut() {
      const { error } = await supabase.auth.signOut();
    },
    async getLists() {
      let { data: lists, error } = await supabase.from("lists").select("*");

      const finalRes = JSON.stringify(lists);
    },
  },
};
</script>

<template>
  <div>
    <button @click="logOut" v-if="isLoggedIn">Sign Out</button>
    <button @click="signInWithGoogle" v-else="isLoggedIn">Sign In</button>
  </div>
</template>
