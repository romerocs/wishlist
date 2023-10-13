<script>
export default {
  props: {
    logged_in: Boolean,
    is_priority: Boolean,
  },
  data() {
    const priority_label = this.is_priority
      ? "You really want this"
      : "You kinda want this";

    return {
      priority_label: priority_label,
    };
  },
};
</script>

<template>
  <button
    v-if="logged_in"
    class="priority-indicator"
    :class="{ '-is-priority' : is_priority }"
    role="switch"
    :aria-checked="is_priority"
    type="button"
    :aria-label="priority_label"
  ></button>

  <div class="priority-indicator" :class="{ '-is-priority' : is_priority }" :aria-label="priority_label" v-else></div>
</template>

<style>
.priority-indicator {
  width: 22px;
  aspect-ratio: 1 / 1;
  border: 2px solid var(--white);
  border-radius: 22px;
  outline: 2px solid var(--gray-15);
  background-color: var(--gray-15);
  transition: all 100ms linear;
}

.priority-indicator.-is-priority {
  outline: 2px solid var(--gray-35);
  background-color: var(--hotpink-70);
  background: radial-gradient(
    circle,
    rgba(250, 107, 171, 1) 60%,
    rgba(123, 4, 58, 1) 100%
  );
}
</style>
