<template>
  <svg class="knob" height="44" width="44" :style="knobStyle">
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
    // range from 0 to 1023, matching the minilogue XD's standard
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    knobStyle() {
      return {
        transition: "transform 1s",
        transform: `rotate(${this.degRotation}deg)`,
      };
    },
    degRotation() {
      return (this.value / 1023) * 290 - 145;
    },
  },
};
</script>
