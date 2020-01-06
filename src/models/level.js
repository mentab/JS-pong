import { WIDTH, HEIGHT } from '../consts/consts.js';
import { Player } from './../models/player.js';
import { Pad } from './../models/pad.js';
import { Ball } from './../models/ball.js';
import { Vec } from './../models/vec.js';

export class Level {
  constructor() {
    this.startActors = [];
    this.startActors.push(Player.create());
    this.startActors.push(Pad.create());
    this.startActors.push(Ball.create());
  }
}

Level.prototype.isOutside = function(pos, size) {
  let yStart = Math.floor(pos.y);
  let yEnd = Math.ceil(pos.y + size.y);
  for (let y = yStart; y < yEnd; y++) {
      let isOutside = y < 0 || y >= HEIGHT;
      if (isOutside) return true;
  }
  return false;
};