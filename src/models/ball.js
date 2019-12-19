import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const ballSpeed = 4;

export class Ball {
  constructor(pos) {
  	this.pos = pos;
  }

  get type() { return "ball"; }

  static create(pos) {
  	return new Ball(pos.plus(new Vec(0, 0)));
  }
}

Ball.prototype.size = new Vec(0, 0);

Ball.prototype.update = function(time, state) {
  return new Ball(new Vec(0, 0));
}

Ball.prototype.collide = function(state) {

}