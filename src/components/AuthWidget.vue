<script>
import supabase from "../utilities/supabase";

export default {
  props: {
    url: String,
  },
  async created() {
    const { data, error } = await supabase.auth.getSession();
    const { session } = data;
    
    this.isLoggedIn = Boolean(session);

    if (this.isLoggedIn) {
      const { user } = session;
      this.avatarImg = user.user_metadata.avatar_url;
    }
  },
  mounted() {
    document.addEventListener("click", this.outsideClickHandler.bind(this));
  },
  data() {
    return {
      isLoggedIn: false,
      btnDisabled: false,
      panelVisibility: "none",
      avatarImg: "",
    };
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
    toggleVisibility() {
      if (this.panelVisibility === "block") {
        this.panelVisibility = "none";
      } else {
        this.panelVisibility = "block";
      }
    },
    outsideClickHandler(e) {
      const closePanel =
        !e.target.closest(".widget") && this.panelVisibility === "block";

      if (closePanel) {
        this.panelVisibility = "none";
      }
    },
  },
};
</script>

<template>
  <div class="widget">
    <button class="btn-avatar" aria-label="Login" @click="toggleVisibility">
      <img :src="avatarImg" alt="" />
    </button>

    <div class="popover" ref="popover">
      <button @click="logOut" v-if="isLoggedIn">Sign Out</button>
      <button @click="signInWithGoogle" v-else="isLoggedIn">Sign In</button>
    </div>
  </div>
</template>

<style>
.widget {
  position: relative;
}

.popover {
  display: v-bind(panelVisibility);
  position: absolute;
}

.btn-avatar {
  background-color: gray;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  overflow: hidden;
}

.btn-avatar:disabled {
  pointer-events: none;
}
</style>
