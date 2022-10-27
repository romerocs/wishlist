<template>
  <div class="not-sidebar">
    <slot />
  </div>
</template>

<style>
  .not-sidebar {
    flex-basis: 0;
    flex-grow: 999;
    min-width: 50%;
  }
</style>