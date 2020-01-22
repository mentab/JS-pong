import consts from './../models/consts.js';

export class CanvasDisplay {
  constructor(parent, level) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = consts.width * consts.scale;
    this.canvas.height = consts.height * consts.scale;
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
  this.cx.moveTo(consts.width / 2 * consts.scale, 0);
  this.cx.lineTo(consts.width / 2 * consts.scale, consts.height * consts.scale);
  this.cx.stroke();
};

CanvasDisplay.prototype.drawActors = function(actors) {
  for (let actor of actors) {
    let x = actor.pos.x * consts.scale;
    let y = actor.pos.y * consts.scale;
    if (actor.type != "score" && actor.type != "text") {
      let width = actor.size.x * consts.scale;
      let height = actor.size.y * consts.scale;
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