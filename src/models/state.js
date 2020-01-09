export class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level) {
    return new State(level, level.startActors, "playing");
  }

  get ball() {
    return this.actors.find(a => a.type == "ball");
  }

  get pad() {
    return this.actors.find(a => a.type == "pad");
  }

  get player() {
    return this.actors.find(a => a.type == "player");
  }
}

State.prototype.update = function(time, keys) {
  let actors = this.actors.map(actor => actor.update(time, this, keys));
  let newState = new State(this.level, actors, this.status);

  if (newState.status != "playing") return newState;

  let ball = newState.ball;
  let pad = newState.pad;
  let player = newState.player;

  if (overlap(pad, ball) || overlap(player, ball)) newState = ball.collide(newState);

  return newState;
};

function overlap(actor1, actor2) {
  return actor1.pos.x + actor1.size.x > actor2.pos.x &&
         actor1.pos.x < actor2.pos.x + actor2.size.x &&
         actor1.pos.y + actor1.size.y > actor2.pos.y &&
         actor1.pos.y < actor2.pos.y + actor2.size.y;
}