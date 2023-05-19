class Program {
  constructor() {
    this.program_name = "";
    this.octave = 0;
    this.sub_timbre_enabled = false;
    this.edit_timbre = new TimbreEdit();
    this.timbre_type = new TimbreType();
    this.main_sub_balance = 0;
    this.timbre_position_is_main_over_sub = false;
    this.split_point = 0;
    this.tempo = 0;
    this.arp_target = new ArpTarget();
    this.category = new Category();
    this.amp_velocity = 0;
    this.portamento_mode = false;
    this.program_level = 0;
    this.mod_effect_type = new ModEffectType();
    this.mod_effect_speed = 0;
    this.mod_effect_depth = 0;
    this.mod_effect_chorus = 0;
    this.mod_effect_ensemble = 0;
    this.mod_effect_phaser = 0;
    this.mod_effect_flanger = 0;
    this.mod_effect_user = 0;
    // Skipping microtuning
    // Skipping scale key
    // Skipping program tuning
    // Skipping program transpose
    this.arp_gate_time = 0;
    this.arp_rate = new ArpRate();
    this.delay_reverb_dry_wet = 0;
    this.delay_reverb_type = new DelayReverbType();
    this.delay_reverb_time = 0;
    this.delay_reverb_depth = 0;
    this.reverb_type = new ReverbType();
    this.delay_type = new DelayType();
    this.mod_effect_routing = new TimbreRouting();
    this.delay_reverb_routing = new TimbreRouting();
    this.mod_effect_enabled = false;
    this.delay_reverb_effect_enabled = false;
    this.arpeggiator_mode = new ArpeggiatorMode();
    this.arpeggiator_range = 0;
    this.arpeggiator_type = new ArpeggiatorType();
    // Skipping LIKE UPPER, LIKE LOWER
    this.timbre1 = new TimbreParameters();
  }

  static read(reader) {
    const program = new Program();
    program.program_name = String.fromCharCode(...reader.readBytes(12));
    program.octave = reader.readUint8() - 2;
    program.sub_timbre_enabled = reader.readUint8() > 0;
    program.edit_timbre = TimbreEdit.read(reader);
    program.timbre_type = TimbreType.read(reader);
    program.main_sub_balance = reader.readUint8();
    reader.skip(1);
    program.timbre_position_is_main_over_sub = reader.readUint8() > 0;
    program.split_point = reader.readUint8();
    program.tempo = reader.readUint16();
    program.arp_target = ArpTarget.read(reader);
    reader.skip(2);
    program.category = Category.read(reader);
    reader.skip(7);
    program.amp_velocity = reader.readUint8();
    program.portamento_mode = reader.readUint8() > 0;
    reader.skip(1);
    program.program_level = reader.readUint8();
    program.mod_effect_type = ModEffectType.read(reader);
    program.mod_effect_speed = reader.readUint16();
    program.mod_effect_depth = reader.readUint16();
    program.mod_effect_chorus = reader.readUint8();
    program.mod_effect_ensemble = reader.readUint8();
    program.mod_effect_phaser = reader.readUint8();
    program.mod_effect_flanger = reader.readUint8();
    program.mod_effect_user = reader.readUint8();
    // Skipping microtuning
    // Skipping scale key
    // Skipping program tuning
    // Skipping program transpose
    reader.skip(4);
    program.arp_gate_time = reader.readUint8();
    program.arp_rate = ArpRate.read(reader);
    program.delay_reverb_dry_wet = reader.readUint16();
    reader.skip(3);
    program.delay_reverb_type = DelayReverbType.read(reader);
    program.delay_reverb_time = reader.readUint16();
    program.delay_reverb_depth = reader.readUint16();
    program.reverb_type = ReverbType.read(reader);
    program.delay_type = DelayType.read(reader);
    program.mod_effect_routing = TimbreRouting.read(reader);
    program.delay_reverb_routing = TimbreRouting.read(reader);
    program.mod_effect_enabled = reader.readUint8() > 0;
    program.delay_reverb_effect_enabled = reader.readUint8() > 0;
    program.arpeggiator_mode = ArpeggiatorMode.read(reader);
    program.arpeggiator_range = reader.readUint8();
    program.arpeggiator_type = ArpeggiatorType.read(reader);
    // Skipping LIKE UPPER, LIKE LOWER
    reader.skip(4);
    program.timbre1 = TimbreParameters.read(reader);

    return program;
  }
}

Program.prototype.toJSON = function () {
  return JSON.stringify({
    program_name: this.program_name,
    octave: this.octave,
    sub_timbre_enabled: this.sub_timbre_enabled,
    edit_timbre: this.edit_timbre.toJSON(),
    timbre_type: this.timbre_type.toJSON(),
    main_sub_balance: this.main_sub_balance,
    timbre_position_is_main_over_sub: this.timbre_position_is_main_over_sub,
    split_point: this.split_point,
    tempo: this.tempo,
    arp_target: this.arp_target.toJSON(),
    category: this.category.toJSON(),
    amp_velocity: this.amp_velocity,
    portamento_mode: this.portamento_mode,
    program_level: this.program_level,
    mod_effect_type: this.mod_effect_type.toJSON(),
    mod_effect_speed: this.mod_effect_speed,
    mod_effect_depth: this.mod_effect_depth,
    mod_effect_chorus: this.mod_effect_chorus,
    mod_effect_ensemble: this.mod_effect_ensemble,
    mod_effect_phaser: this.mod_effect_phaser,
    mod_effect_flanger: this.mod_effect_flanger,
    mod_effect_user: this.mod_effect_user,
    arp_gate_time: this.arp_gate_time,
    arp_rate: this.arp_rate.toJSON(),
    delay_reverb_dry_wet: this.delay_reverb_dry_wet,
    delay_reverb_type: this.delay_reverb_type.toJSON(),
    delay_reverb_time: this.delay_reverb_time,
    delay_reverb_depth: this.delay_reverb_depth,
    reverb_type: this.reverb_type.toJSON(),
    delay_type: this.delay_type.toJSON(),
    mod_effect_routing: this.mod_effect_routing.toJSON(),
    delay_reverb_routing: this.delay_reverb_routing.toJSON(),
    mod_effect_enabled: this.mod_effect_enabled,
    delay_reverb_effect_enabled: this.delay_reverb_effect_enabled,
    arpeggiator_mode: this.arpeggiator_mode.toJSON(),
    arpeggiator_range: this.arpeggiator_range,
    arpeggiator_type: this.arpeggiator_type.toJSON(),
    timbre1: this.timbre1.toJSON(),
  });
};
