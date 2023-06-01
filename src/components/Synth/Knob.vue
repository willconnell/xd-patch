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
import { mapGetters } from "vuex";

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
    ...mapGetters(["transition"]),
    knobStyle() {
      return this.transition
        ? {
            transition: "transform 1s",
            transform: `rotate(${this.degRotation}deg)`,
          }
        : {
            transform: `rotate(${this.degRotation}deg)`,
          };
    },
    // deg rotation vs. value of minilogueXD knobs isn't perfectly linear;
    // I took a fourth order polynomial fit of the following rough data points
    // to get a reasonable match to what the user will see on their physical
    // minilogue
    //     145 deg @ 1023; 90 deg @ ~916; 0 deg @ 512;
    //     -90 deg @ ~118; -145 deg @ 0
    degRotation() {
      return (
        1.355 * 10 ** -10 * this.value ** 4 +
        2.896 * 10 ** -7 * this.value ** 3 -
        7 * 10 ** -4 * this.value ** 2 +
        0.5435 * this.value -
        145
      );
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
