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
        v-else-if="dots"
        :width="2 * sdRad + 2"
        :height="11 * sdRad + 2 - (3 * sdRad) / 5"
        class="dots"
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
    <div class="label" :style="labelStyle">{{ label.toUpperCase() }}</div>
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
    // fixme: if side dots enabled, selector should always be in the middle
    dots: {
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
        marginTop: `${26 - 26 * (this.value / (this.positions - 1))}px`,
      };
    },
    // conditional style if labels or dots are present
    labelStyle() {
      return this.labels.length || this.dots
        ? {}
        : {
            margin: "auto",
            marginTop: "3px",
          };
    },
  },
};
</script>

<style scoped>
.switchOutline {
  display: block;
  margin: auto;
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
  margin: auto;
}
.dots {
  margin-left: 6px;
}
.switchWrapper {
  display: block;
  margin: auto;
  width: 50px;
  /* fixme */
  /* background-color: rgba(255, 0, 0, 0.29); */
}
.label {
  margin-top: 3px;
  font-size: 8px;
  width: 34px;
  text-align: center;
  line-height: 95%;
}
.labels {
  font-size: 7px;
  text-align: left;
  line-height: 180%;
  margin-top: 4px;
  margin-left: 2px;
}
</style>
