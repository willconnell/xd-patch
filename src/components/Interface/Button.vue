<template>
  <div class="customBtn"></div>
</template>

<style scoped>
.customBtn {
  cursor: pointer;
  display: block;
  margin: auto;
  background-color: var(--background-color-secondary);
  color: var(--text-primary-color);
  padding: 15px;
  border-radius: 5px;
  border: 1px solid var(--background-color-secondary);
}
.customBtn:hover {
  border: 1px solid var(--accent-color);
}

.customBtn:active {
  background-color: var(--accent-color);
}
</style>
