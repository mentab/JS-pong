import { WIDTH, HEIGHT, MARGIN } from '../consts/consts.js';
import { Vec } from './../models/vec.js';
import { State } from './../models/state.js';
import { Ball } from './../models/ball.js';


export class Score {
  constructor(playerScore, padScore) {
  	this.pos = new Vec(WIDTH / 2, MARGIN);
    this.playerScore = playerScore;
    this.padScore = padScore;
  }

  get type() { return "score"; }

  get value() { return `${this.playerScore} - ${this.padScore}`; }

  static create() {
    return new Score(0, 0);
  }
}

Score.prototype.update = function(time, state, keys) {
  return new Score(this.playerScore, this.padScore);
}