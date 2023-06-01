<template>
  <ThemeSwitch />
  <Btn
    style="position: absolute; top: 15px; left: 15px"
    @click="() => (showModal = true)"
  >
    About
  </Btn>
  <Modal :show="showModal" :toggle="toggleModal" />
  <div style="margin-top: -50px; margin-bottom: 20px; margin-left: -55px">
    <span style="font-size: 14px; margin-bottom: 37px"> (minilogue) </span>
    <span style="font-size: 2em; font-weight: bold; margin-left: 10px"
      >XD PATCH</span
    >
  </div>
  <MinilogueXD />
  <Btn style="position: absolute; bottom: 15px; left: 15px">
    buy me a coffee
  </Btn>
</template>

<script>
import MinilogueXD from "./components/Synth/MinilogueXD.vue";
import ThemeSwitch from "./components/Interface/ThemeSwitch.vue";
import Modal from "./components/Interface/Modal.vue";
import Btn from "./components/Interface/Btn.vue";

export default {
  name: "App",
  components: {
    MinilogueXD,
    ThemeSwitch,
    Modal,
    Btn,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
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

/* make all links primary text color */
a {
  color: var(--text-primary-color);
}
a:visited {
  color: var(--text-primary-color);
}
</style>
