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
  return new Ball(newPos, newSpeed);
}

Ball.prototype.collide = function(state, direction) {
  let { level, actors, status } = state;

  if (direction === 'top' || direction === 'bottom') {
    state.ball.speed = new Vec(this.speed.x, this.speed.y * -1);
  } else if (direction === 'right') {
    state.score.playerScore++;
    state.ball.pos = new Vec(WIDTH / 2 - size / 2, HEIGHT / 2 - size / 2);
    state.ball.speed = new Vec(8, getRandomArbitrary(-10, 10));
  } else if (direction === 'left') {
    state.score.padScore++;
    // TODO deduplicate this code
    state.ball.pos = new Vec(WIDTH / 2 - size / 2, HEIGHT / 2 - size / 2);
    state.ball.speed = new Vec(-8, getRandomArbitrary(-10, 10));
  } else {
    state.ball.speed = new Vec(this.speed.x * -1, this.speed.y);
  }

  return new State(level, actors, status);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}