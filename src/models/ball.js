import { WIDTH, HEIGHT, SCALE } from '../consts/consts.js';
import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

export class Ball {
  constructor(pos, speed) {
  	this.pos = pos;
  	this.speed = speed;
  }

  get type() { return "ball"; }

  static create(pos, speed) {
    let createPos = new Vec(WIDTH / 2 - .5, HEIGHT / 2 - .5);
    let createSpeed = new Vec(4, 3);
  	return new Ball(createPos, createSpeed);
  }
}

Ball.prototype.size = new Vec(1, 1);

Ball.prototype.update = function(time, state) {
  let xSpeed = time * this.speed.x;
  let ySpeed = time * this.speed.y;
  let newPos = new Vec(this.pos.x + xSpeed, this.pos.y + ySpeed);
  let newSpeed = new Vec(this.speed.x, this.speed.y);
  return new Ball(newPos, newSpeed);
}

Ball.prototype.collide = function(state) {
  let { level, actors, status } = state;
  let xSpeed = state.ball.speed.x * -1;
  let ySpeed = state.ball.speed.y;
  let pos = this.pos;
  let movedY = pos.plus(new Vec(0, ySpeed));
  if (state.level.isOutside(movedY, this.size)) {
     ySpeed = state.ball.speed.y * -1;
  }
  state.ball.speed = new Vec(xSpeed, ySpeed);
  return new State(level, actors, status);
}