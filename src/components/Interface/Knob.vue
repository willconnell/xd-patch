<template>
  <svg class="knob" :height="size" :width="size" :style="knobStyle">
    <circle
      :cx="size / 2"
      :cy="size / 2"
      :r="size / 2 - 2"
      stroke="black"
      stroke-width="1"
      fill="none"
    />
    <line
      :x1="size / 2"
      :y1="2"
      :x2="size / 2"
      :y2="size / 2"
      style="stroke: black; stroke-width: 1"
    />
  </svg>
  <div>{{ label }}</div>
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
    label: {
      type: String,
      default: "Knob Label", // fixme: change to blank later
    },
    // size = height = width of svg
    size: {
      type: Number,
      default: 44,
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
