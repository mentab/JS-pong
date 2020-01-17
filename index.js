import { CanvasDisplay } from './src/models/CanvasDisplay.js';
import { State } from './src/models/state.js';
import { Level } from './src/models/level.js';

function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  down.unregister = () => {
    window.removeEventListener("keydown", track);
    window.removeEventListener("keyup", track);
  };
  return down;
}

function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runGame(Display) {
  let display = new Display(document.body);
  let state = State.start(new Level());
  let ending = 1;
  let running = "pausing";

  return new Promise(resolve => {
    function escHandler(event) {
      if (event.key != "Escape") return;
      event.preventDefault();
      running = "yes";
      runAnimation(frame);
      window.removeEventListener("keydown", escHandler);
    }
    window.addEventListener("keydown", escHandler);
    let arrowKeys = trackKeys(["ArrowUp", "ArrowDown"]);

    function frame(time) {
      if (running == "no") return false;
      if (running == "pausing") running = "no";

      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        arrowKeys.unregister();
        resolve(state.status);
        runGame(CanvasDisplay);
        return false;
      }
    }
    runAnimation(frame);
  });
}

runGame(CanvasDisplay);