const breathEl = document.getElementById("breath"),
      txt = document.getElementById("breathText"),
      msg = document.getElementById("sessionMsg"),
      btn = document.getElementById("soundToggle"),
      audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");

audio.loop = true;
audio.volume = 0.2;

let idx = 0, timer, bSound = false;
const steps = [
  { t: 4000, p: "Inhale", c: "inhale" },
  { t: 2000, p: "Hold", c: "" },
  { t: 4000, p: "Exhale", c: "exhale" },
  { t: 2000, p: "Hold", c: "" }
];

function cycle() {
  let s = steps[idx];
  breathEl.className = "breath " + s.c;
  txt.textContent = s.p;
  idx = (idx + 1) % steps.length;
  timer = setTimeout(cycle, s.t);
}

function startBreathing() {
  cycle();
}

function stopBreathing() {
  clearTimeout(timer);
  idx = 0;
  breathEl.className = "breath";
  txt.textContent = "";
}

function startTimer() {
  let secs = (+document.getElementById("minInput").value || 1) * 60;
  msg.textContent = "Session running...";
  const id = setInterval(() => {
    if (--secs <= 0) {
      clearInterval(id);
      msg.textContent = "Session complete!";
      track();
    }
  }, 1000);
}

function toggleSound() {
  bSound ? audio.pause() : audio.play();
  bSound = !bSound;
  btn.textContent = bSound ? "Stop Ambient" : "Toggle Ambient";
}

function track() {
  let k = "green_sessions";
  let a = JSON.parse(localStorage[k] || "[]");
  a.push({ when: new Date().toISOString() });
  localStorage[k] = JSON.stringify(a);
}
