<script>
import supabase from "../utilities/supabase";
import { store } from "./_store";
import LayoutCluster from "./LayoutCluster.vue";
import ButtonLink from "./ButtonLink.vue";
import SVGChevron from "./SVGChevron.vue";

export default {
  props: {
    url: String,
  },
  components: {
    ButtonLink,
    LayoutCluster,
    SVGChevron,
  },
  async created() {
    const { data, error } = await supabase.auth.getSession();
    const { session } = data;

    store.logged_in = Boolean(session);

    if (store.logged_in) {
      const { user } = session;

      this.name = user.user_metadata.full_name;
      this.avatarImg = user.user_metadata.avatar_url;
    }
  },
  mounted() {
    document.addEventListener("click", this.outsideClickHandler.bind(this));
  },
  data() {
    const panelVisible = "block";
    const panelHidden = "none";

    return {
      btnDisabled: false,
      panelVisible: panelVisible,
      panelHidden: panelHidden,
      panelState: panelHidden,
      avatarImg: "",
      name: "",
      store,
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

      window.location.href = "/";
    },
    toggleVisibility() {
      if (this.panelState === this.panelVisible) {

        const keyframes = [
          { opacity: 0 }
        ];

        const options = { duration: 50, easing: "linear" };

        this.$refs.popover.animate(keyframes, options).onfinish = () => {
          this.panelState = this.panelHidden;
        };
      } else {
        this.panelState = this.panelVisible;

        const keyframes = [
          { opacity: 0 }, 
          { opacity: 1 }
        ];

        const options = { duration: 100, fill: "forwards", easing: "linear" };

        this.$refs.popover.animate(keyframes, options);
      }
    },
    outsideClickHandler(e) {
      const closePanel =
        !e.target.closest(".widget") && this.panelState === this.panelVisible;

      if (closePanel) {
        this.panelState = this.panelHidden;
      }
    },
  },
};
</script>

<template>
  <div class="widget">
    <div v-if="store.logged_in">
      <button class="btn-profile" aria-label="Login" @click="toggleVisibility">
        <LayoutCluster gap="var(--s-3)">
          <img
            class="avatar"
            :src="avatarImg"
            alt=""
            referrerpolicy="no-referrer"
          />
          <span>Hi, {{ name }}</span>
          <SVGChevron width="10" />
        </LayoutCluster>
      </button>

      <div class="popover" ref="popover">
        <LayoutCluster justify="center" :style="{ height: '100%'}">
          <button class="button" style="--btn-width: 100%" @click="logOut">Sign Out</button>
        </LayoutCluster>
      </div>
    </div>

    <div v-else="store.logged_in">
      <button class="button" @click="signInWithGoogle">Sign In</button>
    </div>
  </div>
</template>

<style>

.widget {
  position: relative;
}

.popover {
  aspect-ratio: 2 / 1;
  display: v-bind(panelState);
  opacity: 0;
  position: absolute;
  width: 100%;
  padding: var(--s3);
  border: 1px solid var(--gray-6);
  border-radius: var(--border-radius-2x);
  box-shadow: var(--shadow-elevation-low);
}

.btn-profile {
  font-size: var(--s-1);
  font-weight: 700;
  padding: var(--s-1) var(--s1);
}

.avatar {
  background-color: gray;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  overflow: hidden;
}

.btn-avatar:disabled {
  pointer-events: none;
}
</style>
