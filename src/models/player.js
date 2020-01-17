import { HEIGHT, MARGIN } from '../consts/consts.js';
import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const playerYSpeed = 25;
const playerHeight = 3;
const playerWidth = .5;

export class Player {
  constructor(pos) {
    this.pos = pos;
  }

  get type() { return "player"; }

  static create() {
    return new Player(new Vec(MARGIN, HEIGHT / 2 - playerHeight / 2));
  }
}

Player.prototype.size = new Vec(playerWidth, playerHeight);

Player.prototype.update = function(time, state, keys) {
  let ySpeed = 0;
  if (keys.ArrowUp) ySpeed -= playerYSpeed;
  if (keys.ArrowDown) ySpeed += playerYSpeed;
  let pos = this.pos;
  let newPos = pos.plus(new Vec(0, ySpeed * time));
  let outsideDirection = state.level.touches(newPos, this.size);
  if (outsideDirection === 'top' || outsideDirection === 'bottom') return this;
  return new Player(newPos);
}