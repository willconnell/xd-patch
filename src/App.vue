<template>
  <ThemeSwitch />
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
import ThemeSwitch from "./components/Interface/ThemeSwitch.vue";

export default {
  name: "App",
  components: {
    MinilogueXD,
    ThemeSwitch,
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
  --text-secondary-color: #8e8e8e;
  --element-size: 2.8rem;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --background-color-primary: #1e1e1e;
  --background-color-secondary: #2d2d30;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
}
</style>
