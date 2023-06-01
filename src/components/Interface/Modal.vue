<template>
  <div v-if="show">
    <div class="overlay" @click="toggle"></div>
    <div class="modal">
      <div class="close" @click="toggle">
        <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>close</title>
          <path
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </div>
      <div class="content">
        <h3>Title</h3>
        <p>Description</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["show", "toggle"],
  data() {
    return {
      showModal: true,
    };
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  display: block;
  position: fixed;
  margin: 15% auto;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  z-index: 9999;
  padding: 20px 30px;
  background-color: var(--background-color-primary);
  border-radius: 8px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  fill: var(--text-primary-color);
}
.close:hover {
  fill: var(--text-secondary-color);
}
</style>
