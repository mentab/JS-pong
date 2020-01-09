import { Vec } from './../models/vec.js';

export class Score {
  constructor(pos) {
  	this.pos = pos;
    this.playerScore = 0;
    this.padScore = 0;
  }

  get type() { return "score"; }

  static create() {
    return new Score(new Vec(5, 5));
  }
}

Score.prototype.size = new Vec(5, 5);

Score.prototype.update = function(time, state, keys) {
  return new Score(new Vec(5, 5));
}