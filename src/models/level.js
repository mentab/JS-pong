import { Player } from './../models/player.js';
import { Pad } from './../models/pad.js';
import { Ball } from './../models/ball.js';
import { Vec } from './../models/vec.js';
import { Score } from './../models/score.js';
import { Text } from './../models/text.js';
import consts from './../models/consts.js';

export class Level {
  constructor() {
    this.startActors = [];
    this.startActors.push(Score.create());
    this.startActors.push(Text.create());
    this.startActors.push(Player.create());
    this.startActors.push(Pad.create());
    this.startActors.push(Ball.create());
  }
}

Level.prototype.touches = function(pos, size) {
  let xStart = Math.floor(pos.x);
  let xEnd = Math.ceil(pos.x + size.x);
  let yStart = Math.floor(pos.y);
  let yEnd = Math.ceil(pos.y + size.y);

  let direction = false;

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      if (x < 0) direction = 'left';
      if (x >= consts.width) direction = 'right';
      if (y < 0) direction = 'top';
      if (y >= consts.height) direction = 'bottom';
    }
  }

  return direction;
};