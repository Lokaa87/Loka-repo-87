let chat = JSON.parse(localStorage.getItem("chat") || "[]");
let vault = JSON.parse(localStorage.getItem("vault") || "[]");
let currentTheme = localStorage.getItem("theme") || "girly";

window.addEventListener('load', () => {
  applyTheme(currentTheme);
});

function check() {
  let p = document.getElementById("pass").value;
  if (p === "Love you bestie") {
    document.getElementById("login").style.display = "none";
    load();
  } else {
    alert("Wrong 💔 Try again!");
    document.getElementById("pass").value = "";
    createSparkles(window.innerWidth / 2, window.innerHeight / 2, "❌");
  }
}

function load() {
  document.getElementById("loading").style.display = "flex";
  let i = 0;
  let dots = setInterval(() => {
    document.getElementById("dots").innerText = "💖".repeat((i++) % 5 + 1);
  }, 500);

  setTimeout(() => {
    clearInterval(dots);
    document.getElementById("loading").style.display = "none";
    document.getElementById("app").style.display = "block";
    render();
    renderVault();
    startBackgroundMusic();
    startHeartAnimation();
  }, 2500);
}

function switchTheme(theme) {
  currentTheme = theme;
  localStorage.setItem("theme", theme);
  applyTheme(theme);
  
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  document.querySelector(`[data-theme="${theme}"]`).classList.add("active");
  
  createSparkles(window.innerWidth / 2, window.innerHeight / 2, "✨");
}

function applyTheme(theme) {
  document.body.className = "";
  if (theme !== "girly") {
    document.body.classList.add(theme);
  }
}

function compat(event) {
  const compatMessages = [
    "💞 99% — emotional + logical balance = strongest friendship type.",
    "💕 100% — You two are literally soulmates but platonically!",
    "💖 98% — Therapy session + gossip hour = you two.",
    "💗 99.9% — If friendship was a sport, you'd be Olympic medalists.",
    "💓 100% — Malak + Salma = the duo that the universe planned for."
  ];
  const msg = compatMessages[Math.floor(Math.random() * compatMessages.length)];
  document.getElementById("compat").innerText = msg;
  createSparkles(event.clientX, event.clientY, "💗");
}

function quiz(event) {
  const quizItems = [
    "Malak overthinks texts 😭",
    "Salma gives tough love 💅",
    "Both disappear and return like nothing happened 👻",
    "Gossip queens unlocked 👀",
    "Emotional support system active 💖",
    "Makes terrible jokes at 2am 😂",
    "Shares snacks without asking 🍕",
    "Knows all the secrets 🤫",
    "Would fight someone for the other 💪",
    "Has matching energy 🔥"
  ];
  const item = quizItems[Math.floor(Math.random() * quizItems.length)];
  document.getElementById("quiz").innerText = item;
  createSparkles(event.clientX, event.clientY, "🎲");
}

function send() {
  let m = document.getElementById("msg").value.trim();
  if (!m) return;
  
  chat.push({
    text: m,
    time: new Date().toLocaleTimeString()
  });
  localStorage.setItem("chat", JSON.stringify(chat));
  document.getElementById("msg").value = "";
  render();
  
  setTimeout(() => {
    document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
  }, 100);
}

function render() {
  document.getElementById("chat").innerHTML = chat
    .map((c, idx) => `
      <div class='msg'>
        <span style='color: var(--primary); font-weight: bold;'>💬 Message ${idx + 1}</span>
        <p>${c.text}</p>
        <div class='msg-time'>${c.time}</div>
      </div>
    `).join("");
}

function clearChat(event) {
  if (confirm("Clear all chat messages? 💔")) {
    chat = [];
    localStorage.setItem("chat", JSON.stringify(chat));
    render();
    createSparkles(event.clientX, event.clientY, "🗑️");
  }
}

function voice(event) {
  let t = document.getElementById("msg").value.trim();
  if (!t) {
    alert("Write a message first!");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(t);
  speechSynthesis.speak(utterance);
  createSparkles(event.clientX, event.clientY, "🎤");
}

function saveMsg(event) {
  let n = document.getElementById("name").value.trim();
  let t = document.getElementById("text").value.trim();
  
  if (!n || !t) {
    alert("Fill in both fields!");
    return;
  }
  
  if (n.toLowerCase() !== "malak" && n.toLowerCase() !== "salma") {
    alert("Enter 'Malak' or 'Salma'");
    return;
  }
  
  vault.push({
    n: n.charAt(0).toUpperCase() + n.slice(1),
    t: t,
    date: new Date().toLocaleString()
  });
  
  localStorage.setItem("vault", JSON.stringify(vault));
  document.getElementById("name").value = "";
  document.getElementById("text").value = "";
  renderVault();
  createSparkles(event.clientX, event.clientY, "💌");
}

function renderVault() {
  document.getElementById("vault").innerHTML = vault
    .map((v, idx) => `
      <div class='vault-msg'>
        <div class='vault-msg-name'>💌 ${v.n}</div>
        <div class='vault-msg-text'>${v.t}</div>
        <div class='vault-msg-date'>${v.date}</div>
      </div>
    `).join("");
}

function startHeartAnimation() {
  setInterval(() => {
    let h = document.createElement("div");
    h.className = "heart";
    const hearts = ["💖", "💕", "💗", "💓", "💝", "✨"];
    h.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (1 + Math.random() * 1.5) + "em";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 8000);
  }, 400);
}

function createSparkles(x, y, emoji) {
  if (!x || !y) return;
  for (let i = 0; i < 5; i++) {
    let sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.innerHTML = emoji;
    sparkle.style.left = (x + (Math.random() * 30 - 15)) + "px";
    sparkle.style.top = (y + (Math.random() * 30 - 15)) + "px";
    sparkle.style.fontSize = "1.5em";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
}

function startBackgroundMusic() {
  const audio = document.getElementById("bgMusic");
  if(audio) {
    audio.volume = 0.2;
    audio.play().catch(() => console.log("Music autoplay blocked"));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector(`[data-theme="${currentTheme}"]`)?.classList.add("active");
});