import { WIDTH, HEIGHT, MARGIN } from '../consts/consts.js';
import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const padYSpeed = 20;
const padHeight = 5;
const padWidth = .5;

export class Pad {
  constructor(pos) {
  	this.pos = pos;
  }

  get type() { return "pad"; }

  static create() {
  	return new Pad(new Vec(WIDTH - padWidth - MARGIN, HEIGHT / 2 - padHeight / 2));
  }
}

Pad.prototype.size = new Vec(padWidth, padHeight);

Pad.prototype.update = function(time, state) {
  let ySpeed = 0;
  if (state.ball.pos.y < (this.pos.y + padHeight / 4)) ySpeed = -1 * padYSpeed;
  if (state.ball.pos.y > (this.pos.y + padHeight * 2 / 4)) ySpeed = 1 * padYSpeed;
  let newPos = new Vec(this.pos.x, this.pos.y + ySpeed * time);
  if (state.level.isOutsideY(newPos, this.size)) return this;
  else return new Pad(newPos);
}