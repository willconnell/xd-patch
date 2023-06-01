<template>
  <div class="mainInterface">
    <!-- <div class="master section">
      <Knob label="master" />
      <Knob label="tempo" />
    </div> 
    <div class="divider"></div> -->
    <div class="voice section">
      <Knob label="portamento" :value="(prog?.portamento / 127) * 1023" />
      <Knob label="voice mode depth" :value="prog?.voiceModeDepth" />
      <Switch
        :dots="true"
        :dotLabels="['poly', 'unison', 'chord', 'arp']"
        :value="prog?.voiceModeType - 1"
        :positions="4"
        style="margin-top: 0px; margin-bottom: 14px"
      />
    </div>
    <div class="divider"></div>
    <div class="oscillators section">
      <div class="secTitle">VCO 1</div>
      <div class="row sr">
        <Switch
          label="wave"
          :labels="['saw', 'tri', 'sqr']"
          :value="prog?.vco1Wave"
        />
        <Switch
          label="octave"
          :dots="true"
          :positions="4"
          :value="prog?.vco1Octave"
        />
        <Knob label="pitch" :value="prog?.vco1Pitch" />
        <Knob label="shape" :value="prog?.vco1Shape" />
        <div style="width: 70px; display: flex; flex-direction: row">
          <Switch label="sync" :positions="2" :value="prog?.sync" />
          <Switch label="ring" :positions="2" :value="prog?.ring" />
        </div>
      </div>
      <div class="secTitle">VCO 2</div>

      <div class="row sr">
        <Switch
          label="wave"
          :labels="['saw', 'tri', 'sqr']"
          :value="prog?.vco2Wave"
        />
        <Switch
          label="octave"
          :dots="true"
          :positions="4"
          :value="prog?.vco2Octave"
        />
        <Knob label="pitch" :value="prog?.vco2Pitch" />
        <Knob label="shape" :value="prog?.vco2Shape" />
        <Knob label="cross mod depth" :value="prog?.crossModDepth" />
      </div>
      <div class="secTitle">MULTI ENGINE</div>
      <div class="row">
        <Switch
          label="wave"
          :labels="['usr', 'vpm', 'noi']"
          :value="prog?.multiType"
        />
        <div class="multiEngine">
          {{ this.prog?.multiString }}
        </div>
        <Knob label="shape" :value="prog?.multiShape" />
      </div>
    </div>
    <div class="divider"></div>
    <div class="mixer section">
      <div class="secTitle">MIXER</div>
      <Knob label="vco 1" :value="prog?.vco1Level" />
      <Knob label="vco 2" :value="prog?.vco2Level" />
      <Knob label="multi" :value="prog?.multiLevel" />
    </div>
    <div class="divider"></div>
    <div class="filter section">
      <div class="secTitle">FILTER</div>
      <Knob label="cutoff" :value="prog?.cutoff" />
      <Knob label="resonance" :value="prog?.resonance" />
      <div class="row">
        <!-- manually bump up drive to match key track height -->
        <Switch
          label="drive"
          :value="prog?.cutoffDrive"
          style="margin-top: 0px"
        />
        <Switch label="key track" :value="prog?.cutoffKeyTrack" />
      </div>
    </div>
    <div class="divider"></div>
    <div class="modulation section">
      <div class="secTitle">AMP EG</div>
      <div class="row sr">
        <Knob label="attack" :value="prog?.ampEGAttack" />
        <Knob label="decay" :value="prog?.ampEGDecay" />
        <Knob label="sustain" :value="prog?.ampEGSustain" />
        <Knob label="release" :value="prog?.ampEGRelease" />
      </div>
      <div class="secTitle">EG</div>
      <div class="row sr">
        <Knob label="attack" :value="prog?.egAttack" />
        <Knob label="decay" :value="prog?.egDecay" />
        <Knob label="eg int" :value="prog?.egInt" />
        <Switch
          label="target"
          :labels="['pitch', 'pitch 2', 'cutoff']"
          :value="prog?.egTarget"
          style="margin-left: -2px; margin-right: 12px; width: 50px"
        />
      </div>
      <div class="secTitle">LFO</div>
      <div class="row">
        <Switch
          label="wave"
          :labels="['usr', 'vpm', 'noi']"
          :value="prog?.lfoWave"
        />
        <Switch
          label="mode"
          :labels="['bpm', 'normal', '1 shot']"
          :value="prog?.lfoMode"
        />
        <Knob label="rate" :value="prog?.lfoRate" />
        <Knob label="int" :value="prog?.lfoInt" />
        <Switch
          label="target"
          :labels="['pitch', 'shape', 'cutoff']"
          :value="prog?.lfoTarget"
        />
      </div>
    </div>
    <div class="divider"></div>
    <div class="effects section">
      <div class="secTitle">MOD</div>
      <div class="row">
        <!-- fixme: configure sub types for FX later -->
        <Switch
          label="mod"
          :labels="['on', 'off']"
          :positions="2"
          :value="prog?.modFxIO"
        />
        <Knob label="time" :value="prog?.modFxTime" />
        <Knob label="depth" :value="prog?.modFxDepth" />
      </div>
      <div class="secTitle">REVERB</div>

      <div class="row">
        <Switch
          label="rev"
          :labels="['on', 'off']"
          :positions="2"
          :value="prog?.reverbIO"
        />
        <Knob label="time" :value="prog?.reverbTime" />
        <Knob label="depth" :value="prog?.reverbDepth" />
      </div>
      <div class="secTitle">DELAY</div>

      <div class="row">
        <Switch
          label="del"
          :labels="['on', 'off']"
          :positions="2"
          :value="prog?.delayIO"
        />
        <Knob label="time" :value="prog?.delayTime" />
        <Knob label="depth" :value="prog?.delayDepth" />
      </div>
    </div>
  </div>
  <br />
  <button @click="requestDataDump" class="customBtn">GET KNOB POSITIONS</button>

  <!-- <div
    style="display: flex; direction: column; position: absolute; bottom: 30px"
  >
    <div style="width: 300px; text-align: left">
      Inputs Deteced:
      <ul v-for="device in inputs" :key="device">
        <li style="">{{ device.name }}</li>
      </ul>
    </div>
    <div style="width: 300px; text-align: left">
      Outputs Deteced:
      <ul v-for="device in outputs" :key="device">
        <li style="">{{ device.name }}</li>
      </ul>
    </div>
  </div> -->

  <!-- 
    next steps:
      -------adding labels to poly/chord/latch switch
      -------implement dark mode toggle
      -------labeling different sections
      -------dark mode styling
      -------create nice dark mode switch
      -------matching height of "drive" and "key track" switches
      -------fix odd spreading of voice section; why is voice type switch so tall?
      -------add fill to side dots
      -------calibrate clock position of knobs to actual on minilogue
      -------add support to the multi engine
      -------validate data with actual minilogue
      -------changing preset auto updates interface
      -------live knob turning feature for all knobs
      add multi engine support for live knob turn feature
      warning for users who don't have midi access enabled
      investigate why poly/unison switch defaults to top position
      midi channel selector
      figure out how input/output midi UI will look
      add instructions / settings / coffee button

      take demo footage
      edit footage into a nice demo video
      take clips of video and turn it into gifs

      create simple personal website
      set up hosting for both
  -->
</template>

<script>
import parseSysex from "../../utilities/sysex.js";
import sampleData from "../../utilities/sample.js";
import {
  signals,
  twoWaySwitches,
  threeWaySwitches,
  fourWaySwitches,
} from "../../utilities/midi.js";
import Knob from "./Knob";
import Switch from "./Switch";
import Modal from "../Interface/Modal";
import { mapMutations } from "vuex";

export default {
  components: { Knob, Switch, Modal },
  data() {
    return {
      showModal: true,
      sample: 0,
      switchValue: 0,
      accessGranted: false,
      midiAccess: null,
      channel: 0, // todo: make user configurable
      inputs: [],
      outputs: [],
      prog: {},
      ticker: null,
    };
  },
  mounted() {
    this.requestMidiAccess();
  },
  methods: {
    ...mapMutations(["updateTransition"]),
    async requestMidiAccess() {
      const vm = this;
      try {
        // Request access to MIDI devices
        this.midiAccess = await navigator.requestMIDIAccess({
          sysex: true,
        });
        this.accessGranted = true;

        // TODO: user selectable input
        this.midiAccess.inputs.forEach((input) => {
          this.inputs.push(input);
          input.open().then(() => {
            input.onmidimessage = function (e) {
              if (e.data[0] === parseInt(`0xf${vm.channel}`, 16)) {
                console.log("REAL MIDI DATA");
                console.log("sysex response", e);
                vm.prog = parseSysex(e.data);
              } else if (e.data[0] === parseInt(`0xc${vm.channel}`, 16)) {
                console.log("PROGRAM CHANGE");
                vm.requestDataDump();
              } else if (e.data[0] === parseInt(`0xb${vm.channel}`, 16)) {
                console.log("setting change", e.data);
                vm.updateInterface(e.data);
              } else if (e.data[0] != 0xf8) {
                console.log("non clock non sysex", e.data);
              }
            };
          });
        });
        // add outputs to ref array
        this.midiAccess.outputs.forEach((o) => this.outputs.push(o));
      } catch (error) {
        console.warn("MIDI access denied:", error);
      }
    },
    /* at beginning of this function:
        create a global vuex variable called like "transition" or something
        enable it to true at the start of this function
        turn it to false at the end of this function
    */
    requestDataDump() {
      // Use transitions only when we request a data dump. This allows knob updates
      // to be instant for real time physical changes.
      this.updateTransition(true);
      // reset ticker for more fluid behavior on quick preset changes
      clearTimeout(this.ticker);
      if (this.accessGranted && this.midiAccess) {
        this.midiAccess.outputs.forEach((output) => {
          output.open().then(() => {
            // send sysex message to request current program data dump
            const hexChannel = parseInt(`0x3${this.channel}`, 16);
            let message = [
              0xf0, // Start of Exclusive (Sysex) message
              0x42, // Manufacturer ID (Korg)
              hexChannel, // midi channel
              0x00,
              0x01,
              0x51, // Command ID (CURRENT PROGRAM DATA DUMP REQUEST)
              0x10,
              0xf7, // End of Exclusive (Sysex) message
            ];
            output.send(message);
          });
        });
      }

      // use sample data when no midi device connected
      if (this.inputs.length === 0 && this.outputs.length === 0) {
        console.log("SAMPLE DATA");
        let testRes = new Uint8Array(Object.values(sampleData));
        console.log("test res", testRes);
        this.prog = parseSysex(testRes);
      }
      // update vuex transition only after css animations have completed
      const vm = this;
      this.ticker = setTimeout(() => vm.updateTransition(false), 1100);
    },
    updateInterface(data) {
      const [signal, signal_name, value] = [data[1], signals[data[1]], data[2]];

      // translate raw midi value based on knob/switch type
      if (twoWaySwitches.has(signal)) {
        const translation = { 0: 0, 127: 1 };
        this.prog[signal_name] = translation[value];
      } else if (threeWaySwitches.has(signal)) {
        const translation = { 0: 0, 64: 1, 127: 2 };
        this.prog[signal_name] = translation[value];
      } else if (fourWaySwitches.has(signal)) {
        const translation = { 0: 0, 42: 1, 84: 2, 127: 3 };
        this.prog[signal_name] = translation[value];
      } else if (signal_name === "portamento") {
        this.prog[signal_name] = value;
      } else {
        this.prog[signal_name] = (value / 127) * 1023;
      }
    },
    toggleModal() {},
  },
};
</script>

<style scoped>
.divider {
  border-right: 1px solid var(--text-primary-color);
}
.mainInterface {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* background-color: var(--background-color-secondary); */
}
.section {
  padding: 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.multiEngine {
  font-family: monospace;
  font-size: 18px;
  margin: auto;
  border: solid 1px var(--text-primary-color);
  width: 200px;
  padding-top: 4px;
  min-height: 25px;
  letter-spacing: 2px;
}
.secTitle {
  font-size: 12px;
  margin-bottom: -7px;
}
.sr {
  margin-bottom: 15px;
}
</style>
