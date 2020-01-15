import { WIDTH, HEIGHT } from '../consts/consts.js';
import { Vec } from './../models/vec.js';


export class Text {
  constructor(text) {
  	this.pos = new Vec(WIDTH / 2, HEIGHT / 2);
    this.text = text;
  }

  get type() { return "text"; }

  get value() { return this.text; }

  static create() {
    return new Text('');
  }
}

Text.prototype.update = function(time, state, keys) {
  let newText = '';
  if (state.status === 'won') newText = "You WON";
  if (state.status === 'lost') newText = "You LOST";
  return new Text(newText);
}