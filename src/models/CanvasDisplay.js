import { WIDTH, HEIGHT, SCALE } from '../consts/consts.js';

export class CanvasDisplay {
  constructor(parent, level) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = WIDTH * SCALE;
    this.canvas.height = HEIGHT * SCALE;
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext("2d");
    this.cx.fillStyle = "rgb(255, 255, 255)";
    this.cx.textBaseline = 'middle';
    this.cx.textAlign = "center";
  }

  clear() {
    this.canvas.remove();
  }
}

CanvasDisplay.prototype.syncState = function(state) {
  this.clearDisplay(state.status);
  this.drawActors(state.actors);
};

CanvasDisplay.prototype.clearDisplay = function(status) {
  this.cx.fillStyle = "rgb(0, 0, 0)";
  this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.cx.strokeStyle = "rgb(255, 255, 255)";
  this.cx.beginPath();
  this.cx.setLineDash([5, 15]);
  this.cx.moveTo(WIDTH / 2 * SCALE, 0);
  this.cx.lineTo(WIDTH / 2 * SCALE, HEIGHT * SCALE);
  this.cx.stroke();
};

CanvasDisplay.prototype.drawActors = function(actors) {
  for (let actor of actors) {
    let x = actor.pos.x * SCALE;
    let y = actor.pos.y * SCALE;
    if (actor.type != "score" && actor.type != "text") {
      let width = actor.size.x * SCALE;
      let height = actor.size.y * SCALE;
      this.drawActor(x, y, width, height);
    } else {
      let value = actor.value;
      this.drawText(value, x, y);
    }
  }
};

CanvasDisplay.prototype.drawActor = function(x, y, width, height) {
  this.cx.fillStyle = "rgb(255, 255, 255)";
  this.cx.fillRect(x, y, width, height);
};

CanvasDisplay.prototype.drawText = function(value, x, y) {
  this.cx.fillStyle = "rgb(255, 255, 255)";
  this.cx.font = "20px abstract";
  this.cx.fillText(value, x, y);
  this.cx.restore();
};

document.fonts.load('20px abstract').then(CanvasDisplay.drawText);