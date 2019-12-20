import { WIDTH, HEIGHT, SCALE } from '../consts/consts.js';
import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const ballXSpeed = 4;
const ballYSpeed = 3;

export class Ball {
  constructor(pos, speed) {
  	this.pos = pos;
  	this.speed = speed;
  }

  get type() { return "ball"; }

  static create(pos, speed) {
  	return new Ball(pos.plus(new Vec(WIDTH / 2 - .5, HEIGHT / 2 - .5)), speed);
  }
}

// TODO modify speed func instead of two func
Ball.prototype.revertXDirection = function() {
	this.xDirection *= -1;
}

Ball.prototype.revertYDirection = function() {
	this.yDirection *= -1;
}

Ball.prototype.size = new Vec(1, 1);

Ball.prototype.update = function(time, state) {
  let xSpeed = (this.xDirection > 0 ? 1 : -1) * time * ballXSpeed;
  let ySpeed = time * ballYSpeed;
  let newPos = new Vec(this.pos.x + xSpeed, this.pos.y + ySpeed);
  return new Ball(newPos, this.xDirection);
}

Ball.prototype.collide = function(state) {
  let { level, actors, status } = state;
  state.ball.revertXDirection();
  let pos = this.pos;
  let movedY = pos.plus(new Vec(0, ballYSpeed * time));
  if (state.level.isOutside(movedY, this.size)) {
     state.ball.revertYDirection();
  }
  return new State(level, actors, status);
}