<template>Custom Title</template>

<script>
export default {
  mounted() {
    console.log("mounted properly");
    // Request access to MIDI devices
    navigator
      .requestMIDIAccess({
        sysex: true,
        software: false,
      })
      .then(onMIDISuccess, onMIDIFailure);

    function onMIDISuccess(midiAccess) {
      console.log("midi access granted", midiAccess);
      // Get the first MIDI input device
      const inputDevice = midiAccess.inputs.values().next().value;

      // Set up a listener for incoming MIDI messages
      inputDevice.onmidimessage = function (event) {
        // Check if the message is a sysex message
        if (event.data[0] == 0xf0) {
          const sysexData = event.data.slice(1, -1); // Extract the sysex data
          console.log("Received sysex message:", sysexData);
          // Do something with the sysex data
        }
      };
    }

    function onMIDIFailure(error) {
      console.warn("MIDI access denied:", error);
    }
  },
};
</script>
