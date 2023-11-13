<template>
  <div class="action-item">
    <slot />
  </div>
</template>

<style>
.action-item {
  --action-item-inline-padding: var(--s-3);
  background-color: var(--white);
  border: 1px solid var(--color-hollow-button-border);
  border-radius: var(--border-radius-button);
  scale: 1;
  transition: all 200ms ease-in-out;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-item > * {
  padding-inline: var(--action-item-inline-padding);
  line-height: 1;
  width: 100%;
  color: inherit;
}
</style>
