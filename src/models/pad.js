import { WIDTH, HEIGHT, SCALE } from '../consts/consts.js';
import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const padSpeed = 15;
const padHeight = 4;
const padWidth = 1;

export class Pad {
  constructor(pos) {
  	this.pos = pos;
  }

  get type() { return "pad"; }

  static create(pos) {
  	return new Pad(pos.plus(new Vec(WIDTH/SCALE-(padWidth), HEIGHT/2/SCALE-(padHeight/2))));
  }
}

Pad.prototype.size = new Vec(1, padHeight);

Pad.prototype.update = function(time, state) {
  return new Pad(this.pos);
}