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

Level.prototype.isOutsideY = function(pos, size) {
  let yStart = Math.floor(pos.y);
  let yEnd = Math.ceil(pos.y + size.y);
  for (let y = yStart; y < yEnd; y++) {
      let isOutside = y < 0 || y >= HEIGHT;
      if (isOutside) return true;
  }
  return false;
};

Level.prototype.isOutsideX = function(pos, size) {
  let xStart = Math.floor(pos.x);
  let xEnd = Math.ceil(pos.x + size.x);
  for (let x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= WIDTH;
      if (isOutside) return true;
  }
  return false;
};