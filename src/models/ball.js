import { WIDTH, HEIGHT, SCALE } from '../consts/consts.js';
import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const size = .5;
const createPos = new Vec(WIDTH / 2 - size / 2, HEIGHT / 2 - size / 2);
const createSpeed = new Vec(14, getRandomY());
const createSpeedRevertY = new Vec(-14, getRandomY());

export class Ball {
  constructor(pos, speed) {
  	this.pos = pos;
  	this.speed = speed;
  }

  get type() { return "ball"; }

  static create() {
  	return new Ball(createPos, createSpeed);
  }
}

Ball.prototype.size = new Vec(size, size);

Ball.prototype.update = function(time, state, keys) {
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
    state.ball.pos = createPos;
    state.ball.speed = createSpeed;
  } else if (direction === 'left') {
    state.score.padScore++;
    state.ball.pos = createPos;
    state.ball.speed = createSpeedRevertY;
  } else {
    state.ball.speed = new Vec(this.speed.x * -1.1, getRandomY());
  }

  if (state.score.playerScore >= 10) {
    status = 'won';
  }

  if (state.score.padScore >= 10) {
    status = 'lost';
  }

  return new State(level, actors, status);
}

function getRandomY() {
  return Math.random() * 20 - 10;
}