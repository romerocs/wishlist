<template>
  <div class="action-item">
    <slot />
  </div>
</template>

<style>
.action-item {
  border: 1px solid var(--color-hollow-button-border);
  border-radius: var(--border-radius-button);
  width: 22px;
  aspect-ratio: 1 / 1;
  scale: 1;
  transition: all 200ms ease-in-out;
}

.action-item:hover {
  scale: 1.1;
}

.action-item > * {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  width: 100%;
  height: 100%;
  color: inherit;
}
</style>
