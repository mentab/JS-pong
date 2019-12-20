import { WIDTH, HEIGHT, SCALE, MARGIN } from '../consts/consts.js';
import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const playerYSpeed = 15;
const playerHeight = 4;
const playerWidth = 1;

export class Player {
  constructor(pos) {
    this.pos = pos;
  }

  get type() { return "player"; }

  static create(pos) {
    return new Player(pos.plus(new Vec(playerWidth, HEIGHT / 2 - (playerHeight / 2))));
  }
}

Player.prototype.size = new Vec(playerWidth, playerHeight);

Player.prototype.update = function(time, state, keys) {
  let ySpeed = 0;
  if (keys.ArrowUp) ySpeed -= playerYSpeed;
  if (keys.ArrowDown) ySpeed += playerYSpeed;
  let pos = this.pos;
  let movedY = pos.plus(new Vec(0, ySpeed * time));
  if (!state.level.isOutside(movedY, this.size)) {
    pos = movedY;
  }
  return new Player(pos);
}