function parseSysex(sysexResponse) {
  console.log("called parse sysex");
  const header = sysexResponse.slice(0, 7);
  const data = sysexResponse.slice(7, sysexResponse.length);
  let headerString = "header: ";
  if (isDataDump(header)) headerString += "is data dump";
  else headerString += "not data dump";
  console.log(headerString);

  const converted = convertSysex(data);
  const program = createProgramObj(converted);
  console.log("program obj", program);
  return program;
}

function convertSysex(input) {
  let output = [];
  for (let i = 0; i < input.length; i += 8) {
    let chunk = input.slice(i, i + 8);
    let mask = 1;
    let leftShift = 7;
    for (let j = 1; j < 8; j++) {
      output.push(chunk[j] | ((chunk[0] & mask) << leftShift));
      mask <<= 1;
      leftShift -= 1;
    }
  }
  return new Uint8Array(output);
}

function isDataDump(header) {
  const currentProgramDataDump = [0xf0, 0x42, 0x30, 0x00, 0x01, 0x51, 0x40];
  return header.every((val, i) => val === currentProgramDataDump[i]);
}

function createProgramObj(converted) {
  const dataview = new DataView(converted.buffer);
  const decoder = new TextDecoder("utf-8");
  const program = {};

  program.prog = decoder.decode(converted.subarray(0, 4));
  program.progName = decoder.decode(converted.subarray(4, 16));
  program.octave = dataview.getInt8(16);
  program.portamento = dataview.getInt8(17);
  program.keyTrig = dataview.getInt8(18);
  program.voiceModeDepth = dataview.getInt16(19, true); // little endian
  program.voiceModeType = dataview.getInt8(21);
  program.vco1Wave = dataview.getInt8(22);
  program.vco1Octave = dataview.getInt8(23);
  program.vco1Pitch = dataview.getInt16(24, true);
  program.vco1Shape = dataview.getInt16(26, true);
  program.vco2Wave = dataview.getInt8(28);
  program.vco2Octave = dataview.getInt8(29);
  program.vco2Pitch = dataview.getInt16(30, true);
  program.vco2Shape = dataview.getInt16(32, true);
  program.sync = dataview.getInt8(34);
  program.ring = dataview.getInt8(35);
  program.crossModDepth = dataview.getInt16(36, true);
  program.multiType = dataview.getInt8(38);
  program.selectNoise = dataview.getInt8(39);
  program.selectVPM = dataview.getInt8(40);
  program.selectUser = dataview.getInt8(41);
  program.shapeNoise = dataview.getInt16(42, true);
  program.shapeVPM = dataview.getInt16(44, true);
  program.shapeUser = dataview.getInt16(46, true);
  program.shiftShapeNoise = dataview.getInt16(48, true);
  program.shiftShapeVPM = dataview.getInt16(50, true);
  program.shiftShapeUser = dataview.getInt16(52, true);
  program.vco1Level = dataview.getInt16(54, true);
  program.vco2Level = dataview.getInt16(56, true);
  program.multiLevel = dataview.getInt16(58, true);
  program.cutoff = dataview.getInt16(60, true);
  program.resonance = dataview.getInt16(62, true);
  program.cutoffDrive = dataview.getInt8(64);
  program.cutoffKeyTrack = dataview.getInt8(65);
  program.ampEGAttack = dataview.getInt16(66, true);
  program.ampEGDecay = dataview.getInt16(68, true);
  program.ampEGSustain = dataview.getInt16(70, true);
  program.ampEGRelease = dataview.getInt16(72, true);
  program.egAttack = dataview.getInt16(74, true);
  program.egDecay = dataview.getInt16(76, true);
  program.egInt = dataview.getInt16(78, true);
  program.egTarget = dataview.getInt8(80); // 0~2=CUTOFF, PITCH2, PITCH
  program.lfoWave = dataview.getInt8(81);
  program.lfoMode = dataview.getInt8(82); // 0~2=1-SHOT,NORMAL,BPM
  program.lfoRate = dataview.getInt16(83, true);
  program.lfoInt = dataview.getInt16(85, true);
  program.lfoTarget = dataview.getInt8(87); // 0~2=CUTOFF,SHAPE,PITCH
  program.modFxIO = dataview.getInt8(88);
  program.modFxType = dataview.getInt8(89);
  program.modFxChorus = dataview.getInt8(90);
  program.modFxEnsemble = dataview.getInt8(91);
  program.modFxPhaser = dataview.getInt8(92);
  program.modFxFlanger = dataview.getInt8(93);
  program.modFxUser = dataview.getInt8(94);
  program.modFxTime = dataview.getInt16(95, true);
  program.modFxDepth = dataview.getInt16(97, true);
  program.delayIO = dataview.getInt8(99);
  program.delaySubTye = dataview.getInt8(100);
  program.delayTime = dataview.getInt16(101, true);
  program.delayDepth = dataview.getInt16(103, true);
  program.reverbIO = dataview.getInt8(105);
  program.reverbSubType = dataview.getInt8(106);
  program.reverbTime = dataview.getInt16(107, true);
  program.reverbDepth = dataview.getInt16(109, true);
  program.bendRangePlus = dataview.getInt8(111);
  program.bendRangeMinus = dataview.getInt8(112);
  program.joystickAssignPlus = dataview.getInt8(113);
  program.joystickRangePlus = dataview.getInt8(114);
  program.joystickAssignMinus = dataview.getInt8(115);
  program.joystickRangeMinus = dataview.getInt8(116);
  program.cvInMode = dataview.getInt8(117);
  program.cvIn1AssignPlus = dataview.getInt8(118);
  program.cvIn1RangePlus = dataview.getInt8(119);
  program.cvIn2AssignMinus = dataview.getInt8(120);
  program.cvIn2RangeMinus = dataview.getInt8(121);
  program.microTuning = dataview.getInt8(122);
  program.scaleKey = dataview.getInt8(123);
  program.programTuning = dataview.getInt8(124);
  program.lfoKeySync = dataview.getInt8(125);
  program.lfoVoiceSync = dataview.getInt8(126);
  program.lfoTargetOsc = dataview.getInt8(127);
  program.cutoffVelocity = dataview.getInt8(128);
  program.ampVelocity = dataview.getInt8(129);
  program.multiOctave = dataview.getInt8(130);
  program.multiRouting = dataview.getInt8(131);
  program.egLegato = dataview.getInt8(132);
  program.portamentoMode = dataview.getInt8(133);
  program.portamentoBpmSync = dataview.getInt8(134);
  program.programLevel = dataview.getInt8(135);
  program.vpmParam1 = dataview.getInt8(136); // feedback
  program.vpmParam2 = dataview.getInt8(137); // noise depth
  program.vpmParam3 = dataview.getInt8(138); // shapemodeint
  program.vpmParam4 = dataview.getInt8(139); // mod attack
  program.vpmParam5 = dataview.getInt8(140); // mod decay
  program.vpmParam6 = dataview.getInt8(141); // modkeytrack
  program.userParam1 = dataview.getInt8(142);
  program.userParam2 = dataview.getInt8(143);
  program.userParam3 = dataview.getInt8(144);
  program.userParam4 = dataview.getInt8(145);
  program.userParam5 = dataview.getInt8(146);
  program.userParam6 = dataview.getInt8(147);

  return program;
}

export default parseSysex;
