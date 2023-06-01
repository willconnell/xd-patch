<template>
  <button class="customBtn" :style="paddingSize">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    large: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    paddingSize() {
      return this.large ? { padding: "15px" } : { padding: "10px" };
    },
  },
};
</script>

<style scoped>
.customBtn {
  cursor: pointer;
  display: block;
  margin: auto;
  background-color: var(--background-color-secondary);
  color: var(--text-primary-color);
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
