import { Vec } from './../models/vec.js';
import consts from './../models/consts.js';

export class Score {
  constructor(playerScore, padScore) {
  	this.pos = new Vec(consts.width / 2, consts.margin * 2);
    this.playerScore = playerScore;
    this.padScore = padScore;
  }

  get type() { return "score"; }

  get value() { return `${this.playerScore}   ${this.padScore}`; }

  static create() {
    return new Score(0, 0);
  }
}

Score.prototype.update = function(time, state, keys) {
  return new Score(this.playerScore, this.padScore);
}