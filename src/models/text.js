import { Vec } from './../models/vec.js';
import consts from './../models/consts.js';

export class Text {
  constructor(text) {
  	this.pos = new Vec(consts.width / 2, consts.height / 2);
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
  if (state.status === 'won') newText = "WON";
  if (state.status === 'lost') newText = "LOST";
  return new Text(newText);
}