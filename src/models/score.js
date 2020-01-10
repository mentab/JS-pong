import { WIDTH, HEIGHT, MARGIN } from '../consts/consts.js';
import { Vec } from './../models/vec.js';

export class Score {
  constructor(pos) {
  	this.pos = pos;
    this.playerScore = 0;
    this.padScore = 0;
  }

  get type() { return "score"; }

  get value() { return `${this.playerScore} - ${this.padScore}`; }

  static create() {
    return new Score(new Vec(WIDTH / 2, MARGIN));
  }
}

Score.prototype.update = function(time, state, keys) {
  return new Score(new Vec(WIDTH / 2, MARGIN));
}