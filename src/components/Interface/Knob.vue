<template>
  <svg class="knob" height="44" width="44" style="background-color: none">
    <circle
      cx="22"
      cy="22"
      r="20"
      stroke="black"
      stroke-width="1"
      fill="none"
    />
    <line
      x1="22"
      y1="2"
      x2="22"
      y2="22"
      style="stroke: black; stroke-width: 1"
    />
  </svg>
  <div>Knob Label</div>
</template>

<script>
export default {
  name: "Knob",
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.knob {
  transition: transform 1s;
  transform: rotate(145deg);
}
</style>
