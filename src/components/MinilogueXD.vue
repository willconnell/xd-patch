<template>
  <button @click="requestDataDump" style="cursor: pointer">
    Trigger Data Dump
  </button>
  <v-btn>Test</v-btn>

  <v-row>
    <v-col>
      <div style="width: 300px; text-align: left">
        Inputs Deteced:
        <ul v-for="device in inputs" :key="device">
          <li style="">{{ device.name }}</li>
        </ul>
      </div>
    </v-col>
    <v-col>
      <div style="width: 300px; text-align: left">
        Outputs Deteced:
        <ul v-for="device in outputs" :key="device">
          <li style="">{{ device.name }}</li>
        </ul>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      accessGranted: false,
      midiAccess: null,
      channel: 0, // todo: make user configurable
      inputs: [],
      outputs: [],
    };
  },
  mounted() {
    this.requestMidiAccess();
  },
  methods: {
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
              if (e.data[0] === 0xf0) {
                console.log("sysex response", e);
                vm.parseSysex(e.data);
              } else if (e.data[0] != 0xf8) {
                console.log("non clock non sysex", e);
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
            console.log("output", output);
            this.outputs.push(output);
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
    parseSysex(sysexResponse) {
      const header = sysexResponse.slice(0, 7);
      const data = sysexResponse.slice(7, sysexResponse.length);

      function isDataDump(header) {
        const currentProgramDataDump = [
          0xf0, 0x42, 0x30, 0x00, 0x01, 0x51, 0x40,
        ];
        return header.every((val, i) => val === currentProgramDataDump[i]);
      }

      console.log("is dd", isDataDump(header));

      console.log("printing data");
      for (let i = 0; i < 20; i++) {
        console.log(data[i].toString(16));
      }

      // function isDataDump(header) {
      //   return;
      // }

      // console.log("e === h", expected == header);

      // for (let i = 0; i < 7; i++) {
      //   console.log(expected[i] === header[i]);
      // }

      // // Function to convert a single byte to a decimal value
      // function convertByteToDecimal(byte) {
      //   return byte & 0x7f;
      // }

      // // Function to convert a CC number to its corresponding label
      // function getCCLabel(ccNumber) {
      //   // Replace the switch cases with the appropriate labels according to the documentation
      //   switch (ccNumber) {
      //     case 0x3f:
      //       return "Lower 3 bits";
      //     case 0x06:
      //       return "Upper 7 bits";
      //     // Add more cases for other CC numbers
      //     default:
      //       return "Unknown CC";
      //   }
      // }

      // // Function to convert a voice mode value to its corresponding label
      // function getVoiceModeLabel(voiceModeValue) {
      //   // Replace the switch cases with the appropriate labels according to the documentation
      //   switch (voiceModeValue) {
      //     case 0x00:
      //       return "ARP LATCH";
      //     case 0x01:
      //       return "ARP";
      //     case 0x02:
      //       return "CHORD";
      //     // Add more cases for other voice mode values
      //     default:
      //       return "Unknown voice mode";
      //   }
      // }

      // // Function to convert a micro tuning value to its corresponding label
      // function getMicroTuningLabel(microTuningValue) {
      //   // Replace the switch cases with the appropriate labels according to the documentation
      //   switch (microTuningValue) {
      //     case 0x00:
      //       return "Equal Temp";
      //     case 0x01:
      //       return "Pure Major";
      //     case 0x02:
      //       return "Pure Minor";
      //     // Add more cases for other micro tuning values
      //     default:
      //       return "Unknown micro tuning";
      //   }
      // }

      // // Parse the SysEx response
      // // Replace the parsing logic based on the actual SysEx format and data structure

      // // Example parsing of CC #63 (0x3F)
      // const lower3Bits = convertByteToDecimal(sysexResponse[3]);
      // const cc63Label = getCCLabel(0x3f);

      // // Example parsing of CC #6 (0x06)
      // const upper7Bits = convertByteToDecimal(sysexResponse[4]);
      // const cc6Label = getCCLabel(0x06);

      // // Example parsing of voice mode value
      // const voiceModeValue = sysexResponse[5];
      // const voiceModeLabel = getVoiceModeLabel(voiceModeValue);

      // // Example parsing of micro tuning value
      // const microTuningValue = sysexResponse[6];
      // const microTuningLabel = getMicroTuningLabel(microTuningValue);

      // // Output the parsed values and labels
      // console.log(`${cc63Label}: ${lower3Bits}`);
      // console.log(`${cc6Label}: ${upper7Bits}`);
      // console.log(`Voice Mode: ${voiceModeLabel}`);
      // console.log(`Micro Tuning: ${microTuningLabel}`);
    },
  },
};
</script>
