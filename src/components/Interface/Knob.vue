<template>
  <div class="knobWrapper">
    <svg class="knob" :height="size" :width="size" :style="knobStyle">
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="size / 2 - 2"
        style="stroke: var(--text-primary-color); stroke-width: : 1;"
        fill="none"
      />
      <line
        :x1="size / 2"
        :y1="2"
        :x2="size / 2"
        :y2="size / 2"
        style="stroke: var(--text-primary-color); stroke-width: 1"
      />
    </svg>
    <div class="knobLabel">{{ label.toUpperCase() }}</div>
  </div>
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
      default: "",
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

<style scoped>
.knobLabel {
  font-size: 8px;
  max-width: 70px;
  text-align: center;
  margin: auto;
}
.knobWrapper {
  margin-top: 7px;
  min-width: 60px;
}
</style>
