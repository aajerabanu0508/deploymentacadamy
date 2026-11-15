(() => {
  const data = JSON.parse(document.getElementById('topic-data').textContent);
  const $ = id => document.getElementById(id);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const modes = Object.keys(data.modes);
  let mode = modes[0], running = false, generation = 0;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  function say(message) {
    $('speech').textContent = message;
    $('speech').classList.remove('pop');
    void $('speech').offsetWidth;
    $('speech').classList.add('pop');
  }
  function log(message) {
    const line = document.createElement('div');
    line.className = 'log';
    line.textContent = '$ ' + message;
    $('logs').appendChild(line);
    $('logs').scrollTop = $('logs').scrollHeight;
  }
  function draw() {
    $('modes').replaceChildren();
    modes.forEach(name => {
      const button = document.createElement('button');
      button.className = 'mode' + (mode === name ? ' selected' : '');
      button.textContent = name;
      button.addEventListener('click', () => { if (!running) { mode = name; reset(); } });
      $('modes').appendChild(button);
    });
    $('pipeline').replaceChildren();
    data.modes[mode].forEach(stage => {
      const card = document.createElement('article');
      card.className = 'stage';
      const icon = document.createElement('div'); icon.className = 'stage-icon'; icon.textContent = stage[0];
      const title = document.createElement('h3'); title.textContent = stage[1];
      const desc = document.createElement('p'); desc.textContent = stage[2];
      const status = document.createElement('span'); status.className = 'stage-state'; status.textContent = 'Waiting';
      card.append(icon, title, desc, status);
      $('pipeline').appendChild(card);
    });
  }
  function reset() {
    generation++;
    running = false;
    $('start').disabled = false;
    $('start').textContent = '🚀 Start Animation';
    $('success').classList.add('hidden');
    $('cat').className = 'cat';
    $('fill').style.width = '0%'; $('percent').textContent = '0%';
    $('progressTitle').textContent = 'Ready to start';
    $('detailTitle').textContent = 'Ready to learn';
    $('detailText').textContent = 'Click Start Animation to see each stage in order.';
    $('logs').replaceChildren(); log('Waiting for classroom simulation...');
    say('Hello Students! 👋 Let’s explore ' + data.title + ' together!');
    draw();
  }
  function confetti() {
    if (reduceMotion) return;
    const colors = ['#22d3ee','#a78bfa','#4ade80','#facc15','#fb7185'];
    for (let i = 0; i < 65; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti';
      piece.style.left = Math.random()*100 + 'vw';
      piece.style.width = '8px'; piece.style.height = '12px';
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = Math.random() + 's';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4500);
    }
  }
  async function run() {
    if (running) return;
    reset(); running = true;
    const token = generation;
    $('start').disabled = true;
    $('start').textContent = '⏳ Animation running...';
    const stages = data.modes[mode], cards = [...$('pipeline').children];
    for (let i = 0; i < stages.length; i++) {
      if (token !== generation) return;
      const [icon,title,summary,command,explanation] = stages[i];
      cards[i].classList.add('active');
      cards[i].querySelector('.stage-state').textContent = 'Running...';
      $('cat').classList.remove('walk'); void $('cat').offsetWidth; $('cat').classList.add('walk');
      say(icon + ' ' + summary + ' — Meow!');
      $('detailTitle').textContent = title;
      $('detailText').textContent = explanation;
      log(command);
      const pct = Math.round((i+1)/stages.length*100);
      $('fill').style.width = pct + '%'; $('percent').textContent = pct + '%';
      $('progressTitle').textContent = title;
      await sleep(reduceMotion ? 120 : 1550);
      if (token !== generation) return;
      cards[i].classList.remove('active'); cards[i].classList.add('done');
      cards[i].querySelector('.stage-state').textContent = '✓ Done';
    }
    running = false;
    $('cat').className = 'cat celebrate';
    say('🎉 Meow! You completed the ' + data.title + ' lesson!');
    log('Simulation completed — no commands were executed.');
    $('progressTitle').textContent = 'Lesson complete';
    $('start').disabled = false;
    $('start').textContent = '🔄 Replay Animation';
    $('success').classList.remove('hidden');
    confetti();
    $('success').scrollIntoView({behavior:reduceMotion?'instant':'smooth',block:'center'});
  }
  $('start').addEventListener('click',run);
  $('reset').addEventListener('click',reset);
  $('replay').addEventListener('click',run);
  reset();
})();
