<template>
  <div class="switch">
    <div class="value" :style="valueStyle"></div>
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
  },
  computed: {
    valueStyle() {
      return {
        marginTop: `${26 * (this.value / (this.positions - 1))}px`,
      };
    },
  },
};
</script>

<style scoped>
.switch {
  display: flex;
  flex-direction: column;
  width: 14px;
  height: 40px;
  border-radius: 10px;
  border-color: black;
  border-width: 1px;
  border-style: solid;
}
.value {
  height: 12px;
  border-radius: 100%;
  border-color: black;
  border-width: 1px;
  border-style: solid;
}
</style>
