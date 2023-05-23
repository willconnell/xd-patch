<template>
  <div class="switchWrapper">
    <div class="switch">
      <div class="switchOutline">
        <div class="selector" :style="selectorStyle"></div>
      </div>
      <div v-if="labels.length" class="labels">
        <div v-for="label in labels" :key="label">
          {{ label.toUpperCase() }}<br />
        </div>
      </div>
      <svg
        v-else-if="sideDots"
        :width="2 * sdRad + 2"
        :height="11 * sdRad + 2 - (3 * sdRad) / 5"
        class="sideDots"
      >
        <circle
          :cx="sdRad + 1"
          :cy="sdRad + 1"
          :r="sdRad"
          stroke="black"
          stroke-width="1px"
          fill="none"
        />
        <circle
          :cx="sdRad + 1"
          :cy="sdRad + 1 + (sdRad * 3 - sdRad * (1 / 5))"
          :r="sdRad"
          stroke="black"
          stroke-width="1px"
          fill="none"
        />
        <circle
          :cx="sdRad + 1"
          :cy="sdRad + 1 + 2 * (sdRad * 3 - sdRad * (1 / 5))"
          :r="sdRad"
          stroke="black"
          stroke-width="1px"
          fill="none"
        />
        <circle
          :cx="sdRad + 1"
          :cy="sdRad + 1 + 3 * (sdRad * 3 - sdRad * (1 / 5))"
          :r="sdRad"
          stroke="black"
          stroke-width="1px"
          fill="none"
        />
      </svg>
    </div>
    <div class="label">{{ label.toUpperCase() }}</div>
  </div>
</template>

<script>
export default {
  props: {
    // value is 0 indexed
    value: {
      type: Number,
      default: 0,
    },
    // the maximum number of positions for the switch, i.e. 2 for a binary I/O switch
    positions: {
      type: Number,
      default: 3,
    },
    // fixme: if sidedots enabled, selector should always be in the middle
    sideDots: {
      type: Boolean,
      default: false,
    },
    labels: {
      type: Array,
      default: [],
    },
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // radius of sideDot, upon which all other sideDot dimensions are derived
      sdRad: 4,
    };
  },
  computed: {
    selectorStyle() {
      return {
        marginTop: `${26 * (this.value / (this.positions - 1))}px`,
      };
    },
  },
};
</script>

<style scoped>
.switchOutline {
  display: flex;
  flex-direction: column;
  width: 14px;
  height: 40px;
  border-radius: 10px;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  margin-top: 1px;
}
.selector {
  height: 12px;
  width: 12px;
  border-radius: 100%;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  transition: margin-top 0.7s;
}
.switch {
  display: flex;
  flex-direction: row;
  width: 33px;
}
.sideDots {
  margin-left: 6px;
}
.switchWrapper {
  width: 50px;
  /* fixme */
  /* background-color: rgba(255, 0, 0, 0.29); */
}
.label {
  margin-top: 3px;
  font-size: 8px;
  width: 34px;
  margin-left: -10px;
  text-align: center;
  line-height: 95%;
  /* fixme */
  /* background-color: rgba(0, 0, 255, 0.387); */
}
.labels {
  font-size: 7px;
  text-align: left;
  line-height: 180%;
  margin-top: 4px;
  margin-left: 2px;
}
</style>
