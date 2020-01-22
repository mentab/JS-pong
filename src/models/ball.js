import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';
import { Level } from './../models/level.js';
import consts from './../models/consts.js';

const ballSize = .4;
const createPos = new Vec(consts.width / 2 - ballSize / 2, consts.height / 2 - ballSize / 2);
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

Ball.prototype.size = new Vec(ballSize, ballSize);

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
    onCollide(state.ball, new Vec(this.speed.x, this.speed.y * -1));
  } else if (direction === 'right') {
    onCollide(state.ball, createSpeed, createPos, state.score.playerScore);
    state.score.playerScore++;
  } else if (direction === 'left') {
    onCollide(state.ball, createSpeedRevertY, createPos, state.score.padScore);
    state.score.padScore++;
  } else {
    onCollide(state.ball, new Vec(this.speed.x * -1.1, getRandomY()));
  }

  if (state.score.playerScore >= 10) status = 'won';
  if (state.score.padScore >= 10) status = 'lost';

  return new State(level, actors, status);
}

function getRandomY() {
  return Math.random() * 20 - 10;
}

function onCollide(ball, speed, pos) {
  if (speed) ball.speed = speed;
  if (pos) ball.pos = pos;
}