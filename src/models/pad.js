import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const padSpeed = 4;

export class Pad {
  constructor(pos) {
  	this.pos = pos;
  }

  get type() { return "pad"; }

  static create(pos) {
  	return new Pad(pos.plus(new Vec(0, 0)));
  }
}

Pad.prototype.size = new Vec(0, 0);

Pad.prototype.update = function(time, state) {
  return new Pad(new Vec(0, 0));
}