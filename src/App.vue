<template>
  <div class="themeBox">
    <input type="checkbox" v-model="isDark" />
    isDark: {{ isDark }}
    <br />
  </div>
  <MinilogueXD />
  <br />
  <br />
  <br />
  <br />
  <br />
  <img
    alt="Korg Minilogue XD"
    style="width: 500px"
    src="./assets/miniloguexd.png"
  />
</template>

<script>
import MinilogueXD from "./components/MinilogueXD.vue";

export default {
  name: "App",
  components: {
    MinilogueXD,
  },
  data() {
    return {
      isDark: false,
      theme: "dark-theme",
    };
  },
  watch: {
    isDark() {
      this.setTheme();
    },
  },
  mounted() {
    this.setTheme();
  },
  methods: {
    setTheme() {
      document.documentElement.className = this.isDark ? "dark-theme" : "";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  margin-top: 60px;
}

html body {
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
}

/* Define styles for the default root window element */
:root {
  --background-color-primary: #ebebeb;
  --background-color-secondary: #fafafa;
  --accent-color: #cacaca;
  --text-primary-color: #222;
  --element-size: 4rem;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --background-color-primary: #1e1e1e;
  --background-color-secondary: #2d2d30;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
}
</style>
