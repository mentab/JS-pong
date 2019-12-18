export class State {
  constructor(actors, status) {
    this.actors = actors;
    this.status = status;
  }

  static start() {
    return new State(actors, "playing");
  }

  get ball() {
    return this.actors.find(a => a.type == "ball");
  }
}

State.prototype.update = function(time, keys) {
  let actors = this.actors.map(actor => actor.update(time, this, keys));
  let newState = new State(actors, this.status);

  if (newState.status != "playing") return newState;

  let ball = newState.ball;

  for (let actor of actors) {
    if (actor != ball && overlap(actor, ball)) {
      newState = ball.collide(newState);
    }
  }
  return newState;
};

function overlap(actor1, actor2) {
  return actor1.pos.x + actor1.size.x > actor2.pos.x &&
         actor1.pos.x < actor2.pos.x + actor2.size.x &&
         actor1.pos.y + actor1.size.y > actor2.pos.y &&
         actor1.pos.y < actor2.pos.y + actor2.size.y;
}