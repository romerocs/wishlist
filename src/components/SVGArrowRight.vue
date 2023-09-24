<script>
export default {
  props: {
    width: Number,
  },
  data() {
    return {
      _width: this.width ? this.width : 15,
    };
  },
};
</script>

<template>
  <svg :width="_width" viewBox="0 0 16 16">
    <path
      d="M15.9 8.4c.1-.2.1-.5 0-.8-.1-.1-.1-.2-.2-.3l-7-7c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L12.6 7H1c-.6 0-1 .4-1 1s.4 1 1 1h11.6l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l7-7c.1-.1.2-.2.2-.3z"
    />
  </svg>
</template>
