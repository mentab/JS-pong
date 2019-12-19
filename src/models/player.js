import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';

const playerSpeed = 4;

export class Player {
  constructor(pos) {
    this.pos = pos;
  }

  get type() { return "player"; }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, 0)));
  }
}

Player.prototype.size = new Vec(0, 0);

Player.prototype.update = function(time, state, keys) {
  return new Player(new Vec(0, 0));
}