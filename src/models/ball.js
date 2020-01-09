import { WIDTH, HEIGHT, SCALE } from '../consts/consts.js';
import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const size = .5;

export class Ball {
  constructor(pos, speed) {
  	this.pos = pos;
  	this.speed = speed;
  }

  get type() { return "ball"; }

  static create() {
    let createPos = new Vec(WIDTH / 2 - size / 2, HEIGHT / 2 - size / 2);
    let createSpeed = new Vec(8, getRandomArbitrary(-10, 10));
  	return new Ball(createPos, createSpeed);
  }
}

Ball.prototype.size = new Vec(size, size);

Ball.prototype.update = function(time, state) {
  let xSpeed = time * this.speed.x;
  let ySpeed = time * this.speed.y;
  let newPos = new Vec(this.pos.x + xSpeed, this.pos.y + ySpeed);
  let newSpeed = new Vec(this.speed.x, this.speed.y);
  if (state.level.isOutsideY(newPos, this.size)) {
    newSpeed = new Vec(this.speed.x, this.speed.y * -1);
  }
  if (state.level.isOutsideX(newPos, this.size)) return Ball.create();
  else return new Ball(newPos, newSpeed);
}

Ball.prototype.collide = function(state) {
  let { level, actors, status } = state;
  let xSpeed = this.speed.x * -1.2;
  let ySpeed = getRandomArbitrary(-10, 10);
  let pos = this.pos;
  state.ball.speed = new Vec(xSpeed, ySpeed);
  return new State(level, actors, status);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}