<script>
export default {
  props: {
    priority: {
      validator(value) {
        return ['high', 'low'].includes(value);
      }
    }
  },
};
</script>

<template>
  <svg width="16" viewBox="0 0 12 12" :style="{
        fill: `var(--priority-${this.priority})`,
        rotate: this.priority === 'high' ? '0deg' : '180deg',
      }">
    <path
      fill-rule="evenodd"
      d="M6 0C2.7 0 0 2.7 0 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm2.6 5.9c-.2.1-.6.1-.8 0L6.6 4.7v3.8c0 .3-.3.5-.6.5s-.6-.2-.6-.5V4.7L4.2 5.9c-.2.1-.6.1-.8 0-.2-.2-.2-.5 0-.7l2.2-2c.1 0 .1-.1.2-.1.1-.1.3-.1.4-.1.1 0 .1.1.2.1l2.2 2c.2.2.2.6 0 .8z"
      clip-rule="evenodd"
    />
  </svg>
</template>
