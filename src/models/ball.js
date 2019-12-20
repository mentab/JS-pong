import { WIDTH, HEIGHT, SCALE } from '../consts/consts.js';
import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const ballSpeed = 4;

export class Ball {
  constructor(pos) {
  	this.pos = pos;
  }

  get type() { return "ball"; }

  static create(pos) {
  	return new Ball(pos.plus(new Vec(WIDTH/2/SCALE-.5, HEIGHT/2/SCALE-.5)));
  }
}

Ball.prototype.size = new Vec(1, 1);

Ball.prototype.update = function(time, state) {
  return new Ball(this.pos);
}

Ball.prototype.collide = function(state) {
  return new State(state.level, state.actors, state.status);
}