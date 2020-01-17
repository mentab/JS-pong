import { WIDTH, HEIGHT, MARGIN } from '../consts/consts.js';
import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const padYSpeed = 25;
const padHeight = 3;
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
  let pos = this.pos;
  let newPos = pos.plus(new Vec(0, ySpeed * time));
  let outsideDirection = state.level.touches(newPos, this.size);
  if (outsideDirection === 'top' || outsideDirection === 'bottom') return this;
  return new Pad(newPos);
}