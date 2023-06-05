const signals = {
  0x27: "vco1Level",
  0x05: "portamento",
  0x06: "voiceModeType",
  0x10: "ampEGAttack",
  0x11: "ampEGDecay",
  0x12: "ampEGSustain",
  0x13: "ampEGRelease",
  0x14: "egAttack",
  0x15: "egDecay",
  0x16: "egInt",
  0x17: "egTarget", // (vv=0,64,127)
  0x18: "lfoRate",
  0x1a: "lfoInt",
  0x1b: "voiceModeDepth",
  0x1c: "modFxTime",
  0x1d: "modFxDepth",
  0x20: "Bank Select (LSB) vv=0~4",
  0x21: "multiLevel",
  0x22: "vco1Pitch",
  0x23: "vco2Pitch",
  0x24: "vco1Shape",
  0x25: "vco2Shape",
  0x27: "vco1Level", // using this for testing
  0x28: "vco2Level",
  0x29: "crossModDepth",
  0x2b: "cutoff",
  0x2c: "resonance",
  0x30: "vco1Octave", // (vv=0,42,84,127)
  0x31: "vco2Octave",
  0x32: "vco1Wave", // (vv=0,64,127)
  0x33: "vco2Wave",
  0x35: "multiType", // (vv=0,64,127)
  0x36: "multiShape",
  0x38: "lfoTarget",
  0x39: "lfoWave",
  0x3a: "lfoMode",
  0x3b: "voiceModeDepth", // no display?
  0x3f: "LSB VALUE                   ",
  0x40: "Hold1 (vv=0,127)                            ",
  0x50: "sync", // 0, 127
  0x51: "ring",
  0x53: "cutoffKeyTrack",
  0x54: "cutoffDrive",
  // fixme: configure effects
  0x58: "MOD FX TYPE (vv=0,38,64,84,127)        *2-12", // SPECIAL CASE
  0x59: "DELAY SUB TYPE                         *2-13",
  // 0x : '(vv=:0,7,13,20,26,32, 39,45,52,58,64,',
  // 0x : '71,77,84,90,96,103,109,116,127)',
  0x5a: "REVERB SUB TYPE                        *2-14",
  // 0x : '(vv=0,8,15,22,29,36,43,50,57,64,72,79,',
  // 0x : '86,93,100,107,117,127',
  0x5c: "modFxIO",
  0x5d: "delayIO",
  0x5e: "reverbIO",
  0x60: "MOD FX SUB TYPE                             ",
  // 0x : 'CHORUS(vv=0,16,32,48,64,80,96,127)     *2-18',
  // 0x : 'ENSEMBLE(vv=0,64,127)                  *2-19',
  // 0x : 'PHASER(vv=0,16,32,48,64,80,96,127)     *2-20',
  // 0x : 'FLANGER(vv=0,16,32,48,64,80,96,127)    *2-21',
  // 0x : 'USER(vv=0,8,16,24,32,40,48,56,64,72,80,',
  // 0x : '88,96,104,112,128)',
  0x62: "NRPN (LSB)                               *3 ",
  0x63: "NRPN (MSB)                               *3 ",
  0x67: "multiString", // multi sub type
  // 0x : 'NOISE(vv=0,42,84,127)                  *2-22',
  // 0x : 'VPM(vv=0,8,16,24,32,40,48,56,64,72,80,',
  // 0x : '88,96,104,112,127)              *2-23',
  // 0x : 'USER(vv=0,8,16,24,32,40,48,56,64,72,80,*2-24',
  // 0x : '88,96,104,112,127)',
  0x68: "MULTI SHIFT SHAPE           ",
  0x69: "delayTime",
  0x6a: "delayDepth",
  0x6b: "DELAY DRY WET               ",
  0x6c: "reverbTime",
  0x6d: "reverbDepth",
  0x6e: "REVERB DRY WET               ",
};

const twoWaySwitches = new Set([0x40, 0x50, 0x51, 0x5c, 0x5d, 0x5e]);
const threeWaySwitches = new Set([
  0x17, 0x32, 0x33, 0x35, 0x38, 0x39, 0x3a, 0x53, 0x54,
]);
const fourWaySwitches = new Set([0x30, 0x31]);

const multiSubTypes = {
  // noise
  0: { 0: "HIGH", 42: "LOW", 84: "PEAK", 127: "DECIM" },
  // vpm
  1: {
    0: "SINE 1",
    8: "SINE 2",
    16: "SINE 3",
    24: "SINE 4",
    32: "SAW 1",
    40: "SAW 2",
    48: "SQUARE 1",
    56: "SQUARE 2",
    64: "FAT 1",
    72: "FAT 2",
    80: "AIR 1",
    88: "AIR 2",
    96: "DECAY 1",
    104: "DECAY 2",
    112: "CREEP",
    127: "THROAT",
  },
  // user
  2: {
    0: "USER 1",
    8: "USER 2",
    16: "USER 3",
    24: "USER 4",
    32: "USER 5",
    40: "USER 6",
    48: "USER 7",
    56: "USER 8",
    64: "USER 9",
    72: "USER 10",
    80: "USER 11",
    88: "USER 12",
    96: "USER 13",
    104: "USER 14",
    112: "USER 15",
    127: "USER 16",
  },
};

export {
  signals,
  twoWaySwitches,
  threeWaySwitches,
  fourWaySwitches,
  multiSubTypes,
};

/*
+--------+---------+-------------+-----------------------------------------------------+
| Status | Second  |   Third     |           Description                               |
| [Hex]  | [H] [D] | [H]   [D]   |                                                     |
+--------+---------+-------------+-----------------------------------------------------+
|   8n   | kk (kk) | 40    (64)  | Note Off                                            |
|   9n   | kk (kk) | vv    (vv)  | Note On  vv=1~127                                   |
|   Bn   | 00 (00) | vv    (vv)  | Bank Select (MSB) vv=0                      *1-1    |
|   Bn   | 01 (01) | vv    (vv)  | Modulation1 (Joystick, +Y, vv=0~127)        *1-2    |
|   Bn   | 02 (02) | vv    (vv)  | Modulation2 (Joystick, -Y, vv=0~127)        *1-2    |
|   Bn   | 05 (05) | vv    (vv)  | Portamento Time (vv=0~127)                  *1-2    |
|   Bn   | 06 (06) | vv    (vv)  | Data Entry (MSB)                         *3 *1-2    |
|   Bn   | 10 (16) | vv    (vv)  | AMP EG ATTACK (vv=0~127)                    *1-2*1-4|
|   Bn   | 11 (17) | vv    (vv)  | AMP EG DECAY (vv=0~127)                     *1-2*1-4|
|   Bn   | 12 (18) | vv    (vv)  | AMP EG SUSTAIN (vv=0~127)                   *1-2*1-4|
|   Bn   | 13 (19) | vv    (vv)  | AMP EG RELEASE (vv=0~127)                   *1-2*1-4|
|   Bn   | 14 (20) | vv    (vv)  | EG ATTACK (vv=0~127)                        *1-2*1-4|
|   Bn   | 15 (21) | vv    (vv)  | EG DECAY (vv=0~127)                         *1-2*1-4|
|   Bn   | 16 (22) | vv    (vv)  | EG INT (vv=0~127)                           *1-2*1-4|
|   Bn   | 17 (23) | vv    (vv)  | EG TARGET (vv=0,64,127)                *2-01*1-2    |
|   Bn   | 18 (24) | vv    (vv)  | LFO RATE (vv=0~127)                         *1-2*1-4|
|   Bn   | 1a (26) | vv    (vv)  | LFO INT (vv=0~127)                          *1-2*1-4|
|   Bn   | 1b (27) | vv    (vv)  | VOICE MODE DEPTH (vv=0~127)                 *1-2*1-4|
|   Bn   | 1c (28) | vv    (vv)  | MOD FX TIME (vv=0~127)                      *1-2*1-4|
|   Bn   | 1d (29) | vv    (vv)  | MOD FX DEPTH (vv=0~127)                     *1-2*1-4|
|   Bn   | 20 (32) | vv    (vv)  | Bank Select (LSB) vv=0~4                    *1-1    |
|   Bn   | 21 (33) | vv    (vv)  | MULTI LEVEL (vv=0~127)                      *1-2*1-4|
|   Bn   | 22 (34) | vv    (vv)  | VCO 1 PITCH (vv=0~127)                      *1-2*1-4|
|   Bn   | 23 (35) | vv    (vv)  | VCO 2 PITCH (vv=0~127)                      *1-2*1-4|
|   Bn   | 24 (36) | vv    (vv)  | VCO 1 SHAPE (vv=0~127)                      *1-2*1-4|
|   Bn   | 25 (37) | vv    (vv)  | VCO 2 SHAPE (vv=0~127)                      *1-2*1-4|
|   Bn   | 27 (39) | vv    (vv)  | VCO 1 LEVEL (vv=0~127)                      *1-2*1-4|
|   Bn   | 28 (40) | vv    (vv)  | VCO 2 LEVEL (vv=0~127)                      *1-2*1-4|
|   Bn   | 29 (41) | vv    (vv)  | CROSS MOD DEPTH (vv=0~127)                  *1-2*1-4|
|   Bn   | 2b (43) | vv    (vv)  | CUTOFF (vv=0~127)                           *1-2*1-4|
|   Bn   | 2c (44) | vv    (vv)  | RESONANCE (vv=0~127)                        *1-2*1-4|
|   Bn   | 30 (48) | vv    (vv)  | VCO 1 OCTAVE (vv=0,42,84,127)          *2-02*1-2    |
|   Bn   | 31 (49) | vv    (vv)  | VCO 2 OCTAVE (vv=0,42,84,127)          *2-02*1-2    |
|   Bn   | 32 (50) | vv    (vv)  | VCO 1 WAVE (vv=0,64,127)               *2-03*1-2    |
|   Bn   | 33 (51) | vv    (vv)  | VCO 2 WAVE (vv=0,64,127)               *2-03*1-2    |
|   Bn   | 35 (53) | vv    (vv)  | MULTI TYPE (vv=0,64,127)               *2-04*1-2    |
|   Bn   | 36 (54) | vv    (vv)  | MULTI SHAPE (vv=0~127)                      *1-2*1-4|
|   Bn   | 38 (56) | vv    (vv)  | LFO TARGET (vv=0,64,127)               *2-05*1-2    |
|   Bn   | 39 (57) | vv    (vv)  | LFO WAVE (vv=0,64,127)                 *2-06*1-2    |
|   Bn   | 3a (58) | vv    (vv)  | LFO MODE (vv=0,64,127)                 *2-07*1-2    |
|   Bn   | 3b (59) | vv    (vv)  | VOICE MODE DEPTH (vv=0~127) no display      *1-2    |
|   Bn   | 3f (63) | vv    (vv)  | LSB VALUE (vv=0~127)                        *1-2*1-4|
|   Bn   | 40 (64) | vv    (vv)  | Hold1 (vv=0,127)                            *1-2    |
|   Bn   | 50 (80) | vv    (vv)  | SYNC (vv=0,127)                        *2-08*1-2    |
|   Bn   | 51 (81) | vv    (vv)  | RING (vv=0,127)                        *2-09*1-2    |
|   Bn   | 53 (83) | vv    (vv)  | CUTOFF KEYTRACK (vv=0,64,127)          *2-10*1-2    |
|   Bn   | 54 (84) | vv    (vv)  | CUTOFF DRIVE (vv=0,64,127)             *2-11*1-2    |
|   Bn   | 58 (88) | vv    (vv)  | MOD FX TYPE (vv=0,38,64,84,127)        *2-12*1-2    |
|   Bn   | 59 (89) | vv    (vv)  | DELAY SUB TYPE                         *2-13*1-2    |
|        |         |             | (vv=:0,7,13,20,26,32, 39,45,52,58,64,               |
|        |         |             |      71,77,84,90,96,103,109,116,127)                |
|   Bn   | 5a (90) | vv    (vv)  | REVERB SUB TYPE                        *2-14*1-2    |
|        |         |             | (vv=0,8,15,22,29,36,43,50,57,64,72,79,              |
|        |         |             |     86,93,100,107,117,127                           |
|   Bn   | 5c (92) | vv    (vv)  | MOD FX ON-OFF (vv=0,127)               *2-15*1-2    |
|   Bn   | 5d (93) | vv    (vv)  | DELAY ON-OFF (vv=0,127)                *2-16*1-2    |
|   Bn   | 5e (94) | vv    (vv)  | REVERB ON-OFF (vv=0,127)               *2-17*1-2    |
|   Bn   | 60 (96) | vv    (vv)  | MOD FX SUB TYPE                             *1-2    |
|        |         |             | CHORUS(vv=0,16,32,48,64,80,96,127)     *2-18        |
|        |         |             | ENSEMBLE(vv=0,64,127)                  *2-19        |
|        |         |             | PHASER(vv=0,16,32,48,64,80,96,127)     *2-20        |
|        |         |             | FLANGER(vv=0,16,32,48,64,80,96,127)    *2-21        |
|        |         |             | USER(vv=0,8,16,24,32,40,48,56,64,72,80,             |
|        |         |             |         88,96,104,112,128)                          |
|   Bn   | 62 (98) | vv    (vv)  | NRPN (LSB)                               *3 *1-2    |
|   Bn   | 63 (99) | vv    (vv)  | NRPN (MSB)                               *3 *1-2    |
|   Bn   | 67 (103)| vv    (vv)  | MULTI SUB TYPE SELECT                       *1-2    |
|        |         |             | NOISE(vv=0,42,84,127)                  *2-22        |
|        |         |             | VPM(vv=0,8,16,24,32,40,48,56,64,72,80,              |
|        |         |             |        88,96,104,112,127)              *2-23        |
|        |         |             | USER(vv=0,8,16,24,32,40,48,56,64,72,80,*2-24        |
|        |         |             |         88,96,104,112,127)                          |
|   Bn   | 68 (104)| vv    (vv)  | MULTI SHIFT SHAPE (vv=0~127)                *1-2*1-4|
|   Bn   | 69 (105)| vv    (vv)  | DELAY TIME (vv=0~127)                       *1-2*1-4|
|   Bn   | 6a (106)| vv    (vv)  | DELAY DEPTH (vv=0~127)                      *1-2*1-4|
|   Bn   | 6b (107)| vv    (vv)  | DELAY DRY WET (vv=0~127)                    *1-2*1-4|
|   Bn   | 6c (108)| vv    (vv)  | REVERB TIME (vv=0~127)                      *1-2*1-4|
|   Bn   | 6d (109)| vv    (vv)  | REVERB DEPTH (vv=0~127)                     *1-2*1-4|
|   Bn   | 6e (110)| vv    (vv)  | REVERB DRY WET (vv=0~127)                    *1-2*1-4|
|   Bn   | 76 (118)| vv    (vv)  | CV IN1 (vv=0~127)                           *1-2*1-5|
|   Bn   | 77 (119)| vv    (vv)  | CV IN2 (vv=0~127)                           *1-2*1-5|
|   Cn   | pp (pp) | --    (--)  | Program Change (pp=0~99)                    *1-1    |
|   En   | bb (bb) | bb    (bb)  | Pitch Bender Change                         *1-3    |
+--------+---------+-------------+-----------------------------------------------------+
*/
