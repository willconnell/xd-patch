<template>
  <button @click="requestDataDump" style="cursor: pointer">
    Trigger Data Dump
  </button>
</template>

<script>
export default {
  data() {
    return {
      accessGranted: false,
      midiAccess: null,
      channel: 0, // todo: make user configurable
    };
  },
  mounted() {
    this.requestMidiAccess();
  },
  methods: {
    async requestMidiAccess() {
      try {
        // Request access to MIDI devices
        this.midiAccess = await navigator.requestMIDIAccess({
          sysex: true,
        });
        this.accessGranted = true;

        // TODO: user selectable input
        this.midiAccess.inputs.forEach((input) => {
          input.open().then(() => {
            input.onmidimessage = function (e) {
              if (e.data[0] != 0xf8) {
                console.log("on midi message", e);
              }
            };
          });
        });
      } catch (error) {
        console.warn("MIDI access denied:", error);
      }
    },
    requestDataDump() {
      if (this.accessGranted && this.midiAccess) {
        this.midiAccess.outputs.forEach((output) => {
          output.open().then(() => {
            const hexChannel = parseInt(`0x3${this.channel}`, 16);
            // send sysex message to request current program data dump
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
    },
  },
};
</script>
