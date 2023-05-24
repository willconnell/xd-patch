<template>
  <ThemeSwitch />
  <MinilogueXD />
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
  margin-top: 60px;
}

html body {
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
}

/* light mode style variables */
:root {
  --background-color-primary: #ebebeb;
  --background-color-secondary: #fafafa;
  --accent-color: #cacaca;
  --text-primary-color: #222;
  --text-secondary-color: #8e8e8e;
  --element-size: 2.8rem;
}

/* dark mode style variables */
:root.dark-theme {
  --background-color-primary: #1e1e1e;
  --background-color-secondary: #2d2d30;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
}
</style>
