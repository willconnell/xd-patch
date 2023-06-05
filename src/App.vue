<template>
  <ThemeSwitch />
  <Btn
    style="position: absolute; top: 15px; left: 15px"
    @click="() => (showModal = true)"
  >
    About
  </Btn>
  <Modal :show="showModal" :toggle="toggleModal">
    <div>
      <h3>Instructions</h3>
      <ol class="left">
        <li>Allow MIDI access</li>
        <li>Connect Korg Minilogue XD via USB</li>
        <li>Press "GET KNOB POSITIONS"!</li>
      </ol>
      <p class="left">
        The interface will now reflect the current true state of your Minilogue
        XD, and all live knob changes will update in real time!
      </p>
      <br />
      <h3>Support</h3>
      <p class="left">
        Synthesizers: Korg Minilogue XD, Korg Minilogue XD Module
        <br />
        Browsers: Chrome, Edge, Firefox, Opera. (see
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API#browser_compatibility"
          target="_blank"
          >here</a
        >
        for detailed list)
        <br />
        Troubleshoot MIDI connection
        <span
          style="cursor: pointer; text-decoration: underline"
          @click="troubleshoot"
          >here</span
        >
      </p>
      <br />
      <p style="margin-bottom: -10px">
        <a href="https://github.com/willconnell/xd-patch" target="_blank">
          <i class="fa fa-github"></i>
        </a>
        - built by
        <a href="https://willconnell.me" target="_blank">Will Connell</a> - 2023
      </p>
    </div>
  </Modal>
  <div class="siteTitle">
    <span id="minilogue"> (minilogue) </span>
    <span id="xdpatch">XD PATCH</span>
  </div>
  <MinilogueXD :toggleDevices="toggleDevices" :showDevices="showDevices" />
  <a href="https://ko-fi.com/willconnell" target="_blank">
    <Btn id="coffee"> buy me a coffee </Btn>
  </a>
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
      // show intro modal if user has never been to site before
      showModal: !localStorage.getItem("visitedBefore"),
      showDevices: false,
    };
  },
  mounted() {
    localStorage.setItem("visitedBefore", true);
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleDevices() {
      this.showDevices = !this.showDevices;
    },
    troubleshoot() {
      this.showModal = false;
      this.showDevices = true;
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

<style scoped>
.left {
  text-align: left;
}
#coffee {
  position: absolute;
  bottom: 15px;
  left: 15px;
}
.siteTitle {
  margin-top: -50px;
  margin-bottom: 20px;
  margin-left: -55px;
}
#minilogue {
  font-size: 14px;
  margin-bottom: 37px;
}
#xdpatch {
  font-size: 2em;
  font-weight: bold;
  margin-left: 10px;
}
</style>
