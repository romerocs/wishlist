<template>
  <div class="app-item">
    <slot />
  </div>
</template>

<style>
.app-item {
  --app-item-shadow-color: var(--gray-25);
  --app-item-border-color : var(--gray-25);
  --app-item-border-radius: 16px;
  --app-item-box-shadow: var(--box-shadow-medium);
  --app-item-inline-padding: var(--s8);

  color: var(--text-color);
  border: 1px solid var(--app-item-border-color);
  background-color: var(--app-item-background-color, var(--gray-3));
  border-radius: var(--app-item-border-radius);
  box-shadow: var(--app-item-box-shadow) transparent;
  transition: all 200ms linear;
}
</style>
