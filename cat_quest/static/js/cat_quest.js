const quest = document.querySelector("#quest");
const missions = JSON.parse(document.querySelector("#missions").textContent);
const score = document.querySelector("#score");
const meter = document.querySelector("#meter");
const route = document.querySelectorAll("#route-list li");
const title = document.querySelector("#mission-title");
const prompt = document.querySelector("#prompt");
const advance = document.querySelector("#continue");
const start = document.querySelector("#start");
const opening = document.querySelector("#opening");
const game = document.querySelector("#game");
const mapScroll = document.querySelector("#map-scroll");
const traveler = document.querySelector("#traveler");
const travelerIcon = traveler.querySelector("svg");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const runner = document.querySelector("#runner");
const challenge = document.querySelector("#challenge");
const runnerTitle = document.querySelector("#runner-title");
const runnerStatus = document.querySelector("#runner-status");
const trackItems = document.querySelector("#track-items");
const runnerCat = document.querySelector("#runner-cat");
const runAction = document.querySelector("#run-action");
const badgeBurst = document.querySelector("#badge-burst");
const results = document.querySelector("#run-results");
const resultTitle = document.querySelector("#result-title");
const resultScore = document.querySelector("#result-score");
const resultDetail = document.querySelector("#result-detail");
const resultError = document.querySelector("#result-error");
const restartButton = document.querySelector("#restart-run");
const obstacleTypes = [["▦", "crate"], ["▔", "barrier"]];
let checkpoint = 0;
let lane = 1;
let wave = 0;
let distance = 0;
let previousFrame = 0;
let frame = null;
let objects = [];
let pose = "";
let poseUntil = 0;
let pendingBadge = false;
let runScore = 0;
let badgeXP = 0;
let waitingForUp = true;

function showScore() {
  score.textContent = `Score: ${runScore} · ${badgeXP} XP`;
}

function setPose(next) {
  pose = next;
  poseUntil = performance.now() + 700;
  runnerCat.dataset.pose = pose;
}

function dodge(next) {
  if (frame !== null) setPose(next);
}

function pressUp() {
  if (game.hidden) {
    startGame();
  } else if (!runner.hidden && waitingForUp) {
    waitingForUp = false;
    runAction.disabled = false;
    toggleRun();
  } else {
    dodge("jump");
  }
}

function move(direction) {
  lane = Math.max(0, Math.min(2, lane + direction));
  runnerCat.style.left = `${(lane + .5) * 100 / 3}%`;
}

function stopRun() {
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null;
  previousFrame = 0;
}

function makeRow(hasBadge, icon, allowFullRow) {
  const openLane = Math.floor(Math.random() * 3);
  const fullRow = !hasBadge && allowFullRow && Math.random() < .55;
  return [0, 1, 2].flatMap(column => {
    if (column === openLane && !fullRow) {
      return hasBadge ? [[column, icon, "badge"]] : [];
    }
    const obstacle = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    return [[column, ...obstacle]];
  });
}

function spawnRow() {
  distance = 0;
  objects = makeRow(wave % 3 === 2, missions[checkpoint][1], wave > 0)
    .map(([column, icon, kind]) => {
      const element = document.createElement("span");
      element.className = `track-item ${kind}`;
      element.textContent = icon;
      return { column, kind, element };
    });
  trackItems.replaceChildren(...objects.map(({ element }) => element));
  paintRow();
}

function paintRow() {
  objects.forEach(({ column, element }) => {
    element.style.left = `${50 + (column - 1) * (14 + 19.333 * distance)}%`;
    element.style.top = `${8 + distance * 72}%`;
    element.style.setProperty("--item-scale", .45 + distance * .55);
  });
}

function celebrateBadge() {
  stopRun();
  setPose("");
  pendingBadge = true;
  const [topic, icon] = missions[checkpoint];
  runnerStatus.textContent = `Badge caught: ${topic}!`;
  badgeBurst.textContent = `✦ ${icon} ✦`;
  badgeBurst.hidden = false;
  saveBadge(reducedMotion.matches ? 200 : 950);
}

async function saveBadge(delay = 0) {
  const stage = checkpoint;
  runAction.disabled = true;
  try {
    const [response] = await Promise.all([
      fetch(quest.dataset.collect, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage }),
      }),
      new Promise(resolve => setTimeout(resolve, delay)),
    ]);
    if (response.status === 409) {
      await loadProgress(true, true);
      return;
    }
    if (!response.ok) throw new Error();
    updateProgress(await response.json(), true);
    runScore += 100;
    showScore();
    showStage({ resume: true, message: `+100 points · ${missions[stage][0]} collected!` });
  } catch {
    runnerStatus.textContent = "Could not save the badge. Select Retry save to continue.";
    runAction.textContent = "Retry save";
    runAction.disabled = false;
  } finally {
    badgeBurst.hidden = true;
  }
}

function showResult(heading, detail) {
  stopRun();
  challenge.hidden = true;
  resultTitle.textContent = heading;
  resultScore.textContent = runScore;
  resultDetail.textContent = detail;
  resultError.textContent = "";
  results.showModal();
}

async function restartRun() {
  restartButton.disabled = true;
  resultError.textContent = "";
  try {
    const response = await fetch(quest.dataset.restart, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ restart: true }),
    });
    if (!response.ok) throw new Error();
    const state = await response.json();
    runScore = 0;
    lane = 1;
    updateProgress(state);
    results.close();
    showStage({ focus: true });
  } catch {
    resultError.textContent = "Could not restart. Try again.";
  } finally {
    restartButton.disabled = false;
  }
}

function tick(now) {
  if (pose && now >= poseUntil) setPose("");
  if (previousFrame) distance = Math.min(1, distance + Math.min(now - previousFrame, 50) / Math.max(1100, 1950 - checkpoint * 125));
  previousFrame = now;
  paintRow();
  if (distance === 1) {
    const caught = objects.find(object => object.column === lane);
    if (caught?.kind === "badge") {
      celebrateBadge();
      return;
    }
    const avoided = (caught?.kind === "crate" && pose === "jump") ||
      (caught?.kind === "barrier" && pose === "slide");
    if (caught && !avoided) {
      showResult("Run over!", caught.kind === "crate" ? "Pip hit a crate." : "Pip hit a barrier.");
      return;
    }
    runScore += avoided ? 20 : 10;
    showScore();
    runnerStatus.textContent = avoided ? "Obstacle cleared! +20 points"
      : wave % 3 === 2 ? "Badge missed! Another one is coming. +10 points" : "Clear lane! +10 points";
    wave += 1;
    spawnRow();
  }
  frame = requestAnimationFrame(tick);
}

function toggleRun() {
  if (pendingBadge) {
    saveBadge();
    return;
  }
  if (frame !== null) {
    stopRun();
    setPose("");
    runAction.textContent = "Resume";
    runnerStatus.textContent = "Run paused.";
  } else {
    runAction.textContent = "Pause";
    runnerStatus.textContent = "";
    frame = requestAnimationFrame(tick);
  }
}

function showRunner(resume, message) {
  stopRun();
  challenge.hidden = true;
  runner.hidden = false;
  const [topic, icon] = missions[checkpoint];
  runnerTitle.textContent = `Catch the ${topic} badge ${icon}`;
  waitingForUp = !resume;
  runnerStatus.textContent = resume ? message : "Press ↑ to start the run.";
  runAction.textContent = resume ? "Pause" : "Run";
  runAction.disabled = waitingForUp;
  setPose("");
  move(0);
  wave = 0;
  spawnRow();
  if (resume) frame = requestAnimationFrame(tick);
}

function updateProgress(state, animate = false) {
  checkpoint = state.checkpoint;
  badgeXP = state.xp;
  showScore();
  meter.value = checkpoint;
  route.forEach((item, index) => {
    item.classList.toggle("done", index < checkpoint || index === missions.length && index === checkpoint);
    item.classList.toggle("active", index === checkpoint);
    item.textContent = `${index < checkpoint ? "✓ " : ""}${missions[index]?.[0] ?? "Finish"}`;
    if (index === checkpoint) item.setAttribute("aria-current", "step");
    else item.removeAttribute("aria-current");
  });
  traveler.classList.toggle("traveling", animate && !reducedMotion.matches);
  traveler.style.left = `${100 * checkpoint / missions.length}%`;
  if (animate && !reducedMotion.matches) {
    travelerIcon.getAnimations().forEach(animation => animation.cancel());
    travelerIcon.animate([
      { transform: "translateY(0)" },
      { transform: "translateY(-9px) rotate(5deg)" },
      { transform: "translateY(0)" },
    ], { duration: 250, iterations: 3, easing: "ease-in-out" });
  }
  const stop = route[checkpoint];
  const offset = stop.getBoundingClientRect().left - mapScroll.getBoundingClientRect().left;
  mapScroll.scrollTo({
    left: mapScroll.scrollLeft + offset + (stop.offsetWidth - mapScroll.clientWidth) / 2,
    behavior: animate && !reducedMotion.matches ? "smooth" : "auto",
  });
}

function showStage({ focus = false, resume = false, message = "" } = {}) {
  stopRun();
  pendingBadge = false;
  runner.hidden = true;
  challenge.hidden = false;
  advance.hidden = true;
  if (checkpoint === missions.length) {
    showResult("Pip shipped it!", "All eight DevOps badges collected.");
  } else {
    showRunner(resume, message);
    if (focus) runnerTitle.focus();
  }
}

async function loadProgress(focus = false, resume = false) {
  advance.hidden = true;
  try {
    const response = await fetch(quest.dataset.progress);
    if (!response.ok) throw new Error();
    updateProgress(await response.json());
    showStage({ focus, resume });
  } catch {
    runner.hidden = true;
    challenge.hidden = false;
    title.textContent = "Could not load progress";
    prompt.textContent = "Check that the academy server is running, then retry.";
    advance.textContent = "Retry";
    advance.onclick = () => loadProgress(true, resume);
    advance.hidden = false;
  }
}

function startGame() {
  if (!game.hidden) return;
  opening.classList.add("entered");
  game.hidden = false;
  title.focus();
  loadProgress(true, true);
}

start.addEventListener("click", pressUp);
results.addEventListener("cancel", event => event.preventDefault());
restartButton.addEventListener("click", restartRun);

runAction.addEventListener("click", toggleRun);
document.querySelector("#move-left").addEventListener("click", () => move(-1));
document.querySelector("#move-right").addEventListener("click", () => move(1));
document.querySelector("#jump").addEventListener("click", pressUp);
document.querySelector("#slide").addEventListener("click", () => dodge("slide"));
const track = document.querySelector(".track");
let swipeStart = null;
track.addEventListener("pointerdown", event => {
  swipeStart = event.clientX;
  track.setPointerCapture(event.pointerId);
});
track.addEventListener("pointerup", event => {
  if (swipeStart !== null && Math.abs(event.clientX - swipeStart) >= 24) {
    move(event.clientX < swipeStart ? -1 : 1);
  }
  swipeStart = null;
});
track.addEventListener("pointercancel", () => { swipeStart = null; });
document.addEventListener("keydown", event => {
  if (results.open || event.altKey || event.ctrlKey || event.metaKey) return;
  if (game.hidden && event.key === "ArrowUp") {
    event.preventDefault();
    if (!event.repeat) pressUp();
    return;
  }
  if (runner.hidden) return;
  const directions = {
    ArrowLeft: () => move(-1),
    ArrowRight: () => move(1),
    ArrowUp: pressUp,
    ArrowDown: () => dodge("slide"),
  };
  if (!Object.hasOwn(directions, event.key)) return;
  event.preventDefault();
  if (!event.repeat) directions[event.key]();
});
