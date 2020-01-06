import { WIDTH, HEIGHT, SCALE, MARGIN } from '../consts/consts.js';
import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const padYSpeed = 15;
const padHeight = 4;
const padWidth = 1;

export class Pad {
  constructor(pos) {
  	this.pos = pos;
  }

  get type() { return "pad"; }

  static create(pos) {
  	return new Pad(new Vec(WIDTH - padWidth - MARGIN, HEIGHT / 2 - (padHeight / 2)));
  }
}

Pad.prototype.size = new Vec(1, padHeight);

Pad.prototype.update = function(time, state) {
  let ball = state.ball;
  let ySpeed = (ball.pos.y < this.pos.y ? -1 : 1) * time * padYSpeed;
  let newPos = new Vec(this.pos.x, this.pos.y + ySpeed);
  if (state.level.isOutside(newPos, this.size)) return this;
  else return new Pad(newPos);
}