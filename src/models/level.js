import { Player } from './../models/player.js';
import { Pad } from './../models/pad.js';
import { Ball } from './../models/ball.js';
import { Vec } from './../models/vec.js';

export class Level {
  constructor() {
    this.startActors = [];
    this.startActors.push(Player.create(new Vec(0, 0)));
    this.startActors.push(Pad.create(new Vec(0, 0)));
    this.startActors.push(Ball.create(new Vec(0, 0)));
  }
}

Level.prototype.touches = function(pos, size, type) {
  let xStart = Math.floor(pos.x);
  let xEnd = Math.ceil(pos.x + size.x);
  let yStart = Math.floor(pos.y);
  let yEnd = Math.ceil(pos.y + size.y);

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      let here = isOutside ? "wall" : this.rows[y][x];
      if (here == type) return true;
    }
  }
  return false;
};