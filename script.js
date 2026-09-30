/* ============================================================
   TOPOQUEST — Game Logic
   LKPD Informatika Kelas 9 · Topologi Jaringan
   ============================================================ */

// ==================================================
// ⚙️ TUNABLE: Konfigurasi Game
// ==================================================
const GAME_TITLE = "TOPOQUEST";
const SCHOOL_NAME = "SMP Negeri 19 Kota Bekasi";
const FOOTER_TEXT = "LKPD Informatika Kelas 9 · Topologi Jaringan · © 2026 SMP Negeri 19 Kota Bekasi";

const SCORE = {
  level1_correct: 10,
  level1_wrong:   -2,
  level2_success: 15,
  level3_correct: 20,
  level4_attempt: 10,
  level5_filled:  5
};

// ==================================================
// ⚙️ TUNABLE: DATA SOAL (boleh ditambah/dikurangi)
// ==================================================
const DATA = {
  // -------- LEVEL 1: MATCHING TOPOLOGI --------
  level1: [
    { id:"bus",    nama:"Bus",    deskripsi:"Semua perangkat terhubung ke satu kabel utama (backbone)" },
    { id:"star",   nama:"Star",   deskripsi:"Semua perangkat terhubung ke satu titik pusat (switch/hub)" },
    { id:"ring",   nama:"Ring",   deskripsi:"Setiap perangkat terhubung membentuk lingkaran" },
    { id:"mesh",   nama:"Mesh",   deskripsi:"Setiap perangkat terhubung ke banyak perangkat lain" },
    { id:"tree",   nama:"Tree",   deskripsi:"Gabungan Star bertingkat dengan hirarki (pusat → cabang)" },
    { id:"hybrid", nama:"Hybrid", deskripsi:"Gabungan dua atau lebih topologi, paling banyak dipakai di dunia nyata" }
  ],

  // -------- LEVEL 2: TANTANGAN BANGUN --------
  level2: [
    {
      tantangan: "Bangun topologi STAR dengan 4 PC + 1 Switch",
      target: "star",
      slots: [
        { id:"s-center", type:"switch", x:50, y:45, label:"Pusat" },
        { id:"s-top",    type:"pc",     x:50, y:12, label:"PC1" },
        { id:"s-left",   type:"pc",     x:15, y:45, label:"PC2" },
        { id:"s-right",  type:"pc",     x:85, y:45, label:"PC3" },
        { id:"s-bottom", type:"pc",     x:50, y:78, label:"PC4" }
      ],
      links: [
        ["s-center","s-top"], ["s-center","s-left"],
        ["s-center","s-right"], ["s-center","s-bottom"]
      ]
    },
    {
      tantangan: "Bangun topologi RING dengan 4 PC membentuk lingkaran",
      target: "ring",
      slots: [
        { id:"r1", type:"pc", x:50, y:12, label:"PC1" },
        { id:"r2", type:"pc", x:88, y:50, label:"PC2" },
        { id:"r3", type:"pc", x:50, y:88, label:"PC3" },
        { id:"r4", type:"pc", x:12, y:50, label:"PC4" }
      ],
      links: [["r1","r2"], ["r2","r3"], ["r3","r4"], ["r4","r1"]]
    },
    {
      tantangan: "Bangun topologi TREE dengan 2 Switch + 4 PC (hirarki)",
      target: "tree",
      slots: [
        { id:"t-root",  type:"switch", x:50, y:15, label:"Root" },
        { id:"t-l",     type:"switch", x:25, y:50, label:"SW-L" },
        { id:"t-r",     type:"switch", x:75, y:50, label:"SW-R" },
        { id:"t-ll",    type:"pc",     x:10, y:85, label:"PC1" },
        { id:"t-lr",    type:"pc",     x:38, y:85, label:"PC2" },
        { id:"t-rl",    type:"pc",     x:62, y:85, label:"PC3" },
        { id:"t-rr",    type:"pc",     x:90, y:85, label:"PC4" }
      ],
      links: [
        ["t-root","t-l"], ["t-root","t-r"],
        ["t-l","t-ll"], ["t-l","t-lr"],
        ["t-r","t-rl"], ["t-r","t-rr"]
      ]
    }
  ],

  // -------- LEVEL 3: SKENARIO --------
  level3: [
    {
      skenario: "Warnet 'Kencana Net' di Bekasi punya 10 PC. Pemilik ingin jaringan yang murah, mudah diperbaiki jika satu PC rusak, dan tetap jalan walau ada gangguan kecil.",
      pilihan: ["Bus","Star","Mesh","Ring"],
      jawaban: "Star",
      penjelasan: "Star dipilih karena murah, mudah dirawat, dan jika satu kabel PC putus, PC lain tetap jalan."
    },
    {
      skenario: "RT/RW Net di perumahan punya 15 rumah. Ada satu titik pusat di rumah ketua RT, lalu bercabang ke rumah-rumah lewat Access Point.",
      pilihan: ["Bus","Ring","Tree","Star"],
      jawaban: "Tree",
      penjelasan: "Tree/Hybrid cocok untuk jaringan bertingkat seperti perumahan — ada hirarki pusat → cabang."
    },
    {
      skenario: "Minimarket di Jalan Ahmad Yani punya 4 mesin kasir + 1 server. Harus tetap jalan walau satu kasir mati.",
      pilihan: ["Bus","Star","Mesh","Ring"],
      jawaban: "Star",
      penjelasan: "Star memastikan jika satu kasir mati, kasir lain tetap jalan karena terhubung ke switch pusat."
    },
    {
      skenario: "Lab Komputer SMPN 19 Bekasi punya 20 PC. Guru ingin mudah memantau semua PC dari satu titik.",
      pilihan: ["Ring","Mesh","Star","Bus"],
      jawaban: "Star",
      penjelasan: "Star paling praktis untuk lab komputer: murah, mudah dikelola, dan mudah dipantau."
    },
    {
      skenario: "Perumahan ingin memasang CCTV di 6 titik antar blok, lalu diteruskan nirkabel ke pos keamanan.",
      pilihan: ["Bus","Hybrid","Ring","Star"],
      jawaban: "Hybrid",
      penjelasan: "Hybrid menggabungkan kabel antar blok dan nirkabel ke pos — fleksibel sesuai kondisi lapangan."
    }
  ],

  // -------- LEVEL 4: TRADE-OFF --------
  level4: {
    // Aturan: biaya rendah → Bus; sedang → Star/Ring/Tree; tinggi → Mesh
    rules: [
      { biaya:[0,30],   keandalan:[0,40],  topologi:"Bus",    desc:"murah, keandalan rendah, cocok untuk jaringan kecil" },
      { biaya:[30,70],  keandalan:[50,100], topologi:"Star",   desc:"biaya sedang, keandalan & kecepatan tinggi, cocok lab komputer/kantor" },
      { biaya:[30,70],  keandalan:[0,50],  topologi:"Ring",   desc:"biaya sedang, keandalan sedang, cocok industri" },
      { biaya:[60,100], keandalan:[70,100], topologi:"Tree",   desc:"cocok untuk sekolah / gedung bertingkat" },
      { biaya:[70,100], keandalan:[80,100], topologi:"Mesh",   desc:"sangat andal, cocok data center / militer" },
      { biaya:[0,100],  keandalan:[0,100],  topologi:"Hybrid", desc:"gabungan topologi, cocok untuk ISP, kampus, warnet" }
    ]
  },

  // -------- LEVEL 5: EXIT TICKET --------
  level5: {
    q1: "Hari ini saya belajar bahwa...",
    q2: "Bagian tersulit adalah...",
    q3: "Saya ingin tahu lebih dalam tentang..."
  }
};

// ==================================================
// GLOSARIUM DWIBAHASA
// ==================================================
const GLOSSARY = {
  node: "Node (Perangkat)",
  link: "Link (Jalur)",
  switch: "Switch (Colokan Pusat)",
  router: "Router (Pintu ke Internet)",
  ap: "Access Point (Pemancar WiFi)",
  bandwidth: "Bandwidth (Lebar Jalur Data)",
  latency: "Latency (Waktu Tempuh Data)",
  redundancy: "Redundancy (Cadangan Jalur)",
  tradeoff: "Trade-off (Kompromi)"
};

// ==================================================
// STATE GAME
// ==================================================
const GameState = {
  playerName: "",
  score: 0,
  currentLevel: 1,
  maxUnlocked: 1,
  levelsDone: { 1:false, 2:false, 3:false, 4:false, 5:false },
  answers: { l1:[], l2:[], l3:[], l4:[], l5:{ q1:"", q2:"", q3:"", rating:0 } },
  lang: "id",
  dark: false
};

// ==================================================
// UTIL: SIMPAN & LOAD localStorage
// ==================================================
const STORAGE_KEY = "topoquest_state_v1";
const LEADERBOARD_KEY = "topoquest_leaderboard_v1";

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(GameState)); } catch(e) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) Object.assign(GameState, JSON.parse(raw));
  } catch(e) {}
}
function saveScoreToLeaderboard(name, score) {
  try {
    let lb = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
    lb.push({ name, score, date: new Date().toLocaleString("id-ID") });
    lb.sort((a,b) => b.score - a.score);
    lb = lb.slice(0, 5);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb));
  } catch(e) {}
}
function getLeaderboard() {
  try { return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]"); } catch(e) { return []; }
}

// ==================================================
// UTIL: TOAST, MODAL, CONFETTI, BEEP
// ==================================================
function showToast(msg, type = "info", duration = 1800) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = "toast show " + type;
  clearTimeout(showToast._tid);
  showToast._tid = setTimeout(() => t.classList.remove("show"), duration);
}

function showModal(title, bodyHTML, showCancel = false, onOk = null, onCancel = null) {
  const m = document.getElementById("modal");
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = bodyHTML;
  const okBtn = document.getElementById("modalOkBtn");
  const cancelBtn = document.getElementById("modalCancelBtn");
  cancelBtn.hidden = !showCancel;
  m.hidden = false;
  okBtn.onclick = () => { m.hidden = true; onOk && onOk(); };
  cancelBtn.onclick = () => { m.hidden = true; onCancel && onCancel(); };
}

function closeModal() { document.getElementById("modal").hidden = true; }
document.addEventListener("click", (e) => {
  if (e.target.dataset.close === "1") closeModal();
});

// Konfeti
function launchConfetti(count = 60) {
  const colors = ["#1F4E79","#2E75B6","#C55A11","#548235","#FFE08A","#FBE5D6"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti-piece";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = (2 + Math.random() * 2) + "s";
    c.style.animationDelay = (Math.random() * 0.5) + "s";
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4500);
  }
}

// Beep sederhana (Web Audio API)
let _audioCtx = null;
function beep(freq = 440, duration = 120, type = "sine") {
  try {
    _audioCtx = _audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = _audioCtx.createOscillator();
    const gain = _audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0.08;
    osc.connect(gain); gain.connect(_audioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, _audioCtx.currentTime + duration/1000);
    osc.stop(_audioCtx.currentTime + duration/1000);
  } catch(e) {}
}
function beepCorrect() { beep(880, 100); setTimeout(() => beep(1200, 150), 110); }
function beepWrong()   { beep(220, 200, "square"); }
function beepWin()     { [523,659,784,1046].forEach((f,i) => setTimeout(() => beep(f, 180), i*120)); }

// ==================================================
// GENERATOR SVG TOPOLOGI
// ==================================================
function topoSVG(type) {
  const svgStyle = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" width="90" height="80"';
  const node = (x,y,color="#C55A11",r=8) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
  const link = (x1,y1,x2,y2) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2E75B6" stroke-width="2"/>`;

  switch(type) {
    case "bus": {
      let s = `<svg ${svgStyle}>`;
      s += `<line x1="10" y1="50" x2="110" y2="50" stroke="#1F4E79" stroke-width="4"/>`;
      [25,50,75,100].forEach(x => s += link(x,50,x,30) + node(x,30));
      s += `</svg>`;
      return s;
    }
    case "star": {
      let s = `<svg ${svgStyle}>`;
      s += node(60,50,"#1F4E79",10);
      [[20,20],[100,20],[20,80],[100,80]].forEach(([x,y]) => {
        s += link(60,50,x,y) + node(x,y);
      });
      s += `</svg>`;
      return s;
    }
    case "ring": {
      let s = `<svg ${svgStyle}>`;
      const pts = [[60,15],[105,50],[60,85],[15,50]];
      for (let i = 0; i < 4; i++) {
        const [x1,y1] = pts[i], [x2,y2] = pts[(i+1)%4];
        s += link(x1,y1,x2,y2);
      }
      pts.forEach(([x,y]) => s += node(x,y));
      s += `</svg>`;
      return s;
    }
    case "mesh": {
      let s = `<svg ${svgStyle}>`;
      const pts = [[20,20],[100,20],[20,80],[100,80]];
      for (let i = 0; i < 4; i++)
        for (let j = i+1; j < 4; j++) {
          const [x1,y1] = pts[i], [x2,y2] = pts[j];
          s += link(x1,y1,x2,y2);
        }
      pts.forEach(([x,y]) => s += node(x,y));
      s += `</svg>`;
      return s;
    }
    case "tree": {
      let s = `<svg ${svgStyle}>`;
      s += node(60,15,"#1F4E79",9);
      s += link(60,15,30,45) + link(60,15,90,45);
      s += node(30,45,"#2E75B6",7) + node(90,45,"#2E75B6",7);
      [[15,80],[45,80],[75,80],[105,80]].forEach(([x,y],i) => {
        const parent = i < 2 ? [30,45] : [90,45];
        s += link(parent[0],parent[1],x,y) + node(x,y);
      });
      s += `</svg>`;
      return s;
    }
    case "hybrid": {
      let s = `<svg ${svgStyle}>`;
      s += node(60,50,"#1F4E79",10);
      [[15,20],[105,20]].forEach(([x,y]) => {
        s += link(60,50,x,y) + node(x,y,"#2E75B6",7);
      });
      s += link(15,20,15,60) + node(15,60,"#C55A11",6);
      s += link(105,20,105,60) + node(105,60,"#C55A11",6);
      s += link(60,50,60,85) + node(60,85,"#C55A11",6);
      s += `</svg>`;
      return s;
    }
    default: return "";
  }
}

// ==================================================
// NAVIGASI SCREEN
// ==================================================
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById("screen-" + id);
  if (target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateScoreUI() {
  document.getElementById("scoreDisplay").textContent = GameState.score;
  document.getElementById("finalScore") && (document.getElementById("finalScore").textContent = GameState.score);
}

function updateProgressUI() {
  const wrap = document.getElementById("progressWrap");
  const showProgress = GameState.currentLevel > 1 || GameState.maxUnlocked > 1;
  wrap.hidden = !showProgress;
  document.body.classList.toggle("has-progress", showProgress);
  if (!showProgress) return;
  const pct = Math.round(((GameState.currentLevel - 1) / 5) * 100);
  document.getElementById("progressText").textContent = `Level ${GameState.currentLevel} dari 5`;
  document.getElementById("progressPct").textContent = pct + "%";
  document.getElementById("progressFill").style.width = pct + "%";
}

function addScore(pts) {
  GameState.score = Math.max(0, GameState.score + pts);
  updateScoreUI();
  saveState();
}

// ==================================================
// HOME
// ==================================================
document.getElementById("startBtn").addEventListener("click", () => {
  const nameInput = document.getElementById("playerName");
  const name = (nameInput.value || "").trim();
  if (!name) {
    showToast("⚠️ Tulis namamu dulu ya!", "error");
    nameInput.focus();
    return;
  }
  GameState.playerName = name;
  saveState();
  beep(660, 120);
  buildMissionMap();
  showScreen("map");
  updateProgressUI();
});

document.getElementById("howToBtn").addEventListener("click", () => {
  showModal("📖 Cara Bermain TOPOQUEST", `
    <p>Selamat datang di <b>TOPOQUEST</b>! Berikut panduannya:</p>
    <ul>
      <li><b>Level 1:</b> Tarik kartu deskripsi ke gambar topologi yang cocok.</li>
      <li><b>Level 2:</b> Susun komponen jaringan ke slot yang tepat.</li>
      <li><b>Level 3:</b> Pilih topologi yang paling sesuai dengan skenario.</li>
      <li><b>Level 4:</b> Atur slider biaya, keandalan, dan kecepatan.</li>
      <li><b>Level 5:</b> Isi refleksi dan raih badge-mu!</li>
    </ul>
    <p>💡 Gunakan tombol <b>Bantuan</b> di setiap level jika bingung.</p>
  `);
});

document.getElementById("leaderboardBtn").addEventListener("click", () => {
  const lb = getLeaderboard();
  let html = "<p>🏆 <b>Top 5 Skor Tertinggi</b></p>";
  if (lb.length === 0) {
    html += "<p>Belum ada skor. Jadilah yang pertama! 🚀</p>";
  } else {
    html += "<ul>";
    lb.forEach((row, i) => {
      const medal = ["🥇","🥈","🥉","4️⃣","5️⃣"][i] || "•";
      html += `<li>${medal} <b>${row.name}</b> — ${row.score} poin <small>(${row.date})</small></li>`;
    });
    html += "</ul>";
  }
  showModal("🏆 Papan Skor (Leaderboard)", html);
});

// ==================================================
// MISSION MAP
// ==================================================
const MISSIONS = [
  { n:1, name:"KENALI TOPOLOGI",  desc:"Tarik & cocokkan 6 jenis topologi",        icon:"🟦" },
  { n:2, name:"BANGUN JARINGAN",  desc:"Susun komponen jaringan dengan benar",     icon:"🟩" },
  { n:3, name:"PILIH YANG TEPAT", desc:"Pilih topologi sesuai studi kasus nyata",  icon:"🟨" },
  { n:4, name:"UJI TRADE-OFF",    desc:"Atur slider biaya, keandalan, kecepatan",  icon:"🟧" },
  { n:5, name:"REFLEKSI AKHIR",   desc:"Isi exit ticket & raih badge-mu",          icon:"🟪" }
];

function buildMissionMap() {
  const grid = document.getElementById("missionGrid");
  grid.innerHTML = "";
  MISSIONS.forEach(m => {
    const card = document.createElement("div");
    const locked = m.n > GameState.maxUnlocked;
    const done = GameState.levelsDone[m.n];
    card.className = "mission-card" + (locked ? " locked" : "") + (done ? " done" : "");
    card.innerHTML = `
      <span class="mission-num">LEVEL ${m.n}</span>
      <span class="mission-status">${locked ? "🔒" : (done ? "✅" : "▶️")}</span>
      <h3 class="mission-name">${m.icon} ${m.name}</h3>
      <p class="mission-desc">${m.desc}</p>
    `;
    if (!locked) {
      card.addEventListener("click", () => loadLevel(m.n));
    } else {
      card.addEventListener("click", () => showToast("🔒 Selesaikan level sebelumnya dulu!", "error"));
    }
    grid.appendChild(card);
  });
}

// ==================================================
// ROUTER LEVEL
// ==================================================
function loadLevel(n) {
  GameState.currentLevel = n;
  updateProgressUI();
  showScreen("level" + n);
  if (n === 1) initLevel1();
  else if (n === 2) initLevel2();
  else if (n === 3) initLevel3();
  else if (n === 4) initLevel4();
  else if (n === 5) initLevel5();
}

// ==================================================
// LEVEL 1 — MATCHING
// ==================================================
function initLevel1() {
  const descCol = document.getElementById("descColumn");
  const topoCol = document.getElementById("topoColumn");
  descCol.innerHTML = "";
  topoCol.innerHTML = "";
  document.getElementById("l1Next").disabled = true;
  document.getElementById("l1Next").onclick = () => { markLevelDone(1); loadLevel(2); };
  document.getElementById("l1Hint").onclick = () => showModal("💡 Bantuan Level 1",
    "<p>Cocokkan ciri utama dengan gambar topologinya:</p><ul>" +
    "<li><b>Bus:</b> satu kabel utama panjang</li>" +
    "<li><b>Star:</b> semua ke satu titik pusat</li>" +
    "<li><b>Ring:</b> membentuk lingkaran</li>" +
    "<li><b>Mesh:</b> setiap ke setiap</li>" +
    "<li><b>Tree:</b> bertingkat/hirarki</li>" +
    "<li><b>Hybrid:</b> gabungan</li></ul>");

  const shuffledDesc = [...DATA.level1].sort(() => Math.random() - 0.5);
  const shuffledTopo = [...DATA.level1].sort(() => Math.random() - 0.5);

  // Buat kartu deskripsi
  shuffledDesc.forEach(item => {
    const d = document.createElement("div");
    d.className = "desc-card";
    d.draggable = true;
    d.dataset.id = item.id;
    d.textContent = item.deskripsi;
    d.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", item.id);
      d.classList.add("dragging");
    });
    d.addEventListener("dragend", () => d.classList.remove("dragging"));
    descCol.appendChild(d);
  });

  // Buat kartu topologi
  let matchedCount = 0;
  shuffledTopo.forEach(item => {
    const t = document.createElement("div");
    t.className = "topo-card";
    t.dataset.id = item.id;
    t.innerHTML = topoSVG(item.id) + `<span class="topo-label">${item.nama}</span>`;
    t.addEventListener("dragover", e => { e.preventDefault(); t.classList.add("drag-over"); });
    t.addEventListener("dragleave", () => t.classList.remove("drag-over"));
    t.addEventListener("drop", e => {
      e.preventDefault();
      t.classList.remove("drag-over");
      const draggedId = e.dataTransfer.getData("text/plain");
      const draggedEl = descCol.querySelector(`.desc-card[data-id="${draggedId}"]:not(.placed)`);
      if (!draggedEl) return;
      if (draggedId === item.id) {
        // Benar
        t.classList.add("correct");
        draggedEl.classList.add("placed");
        draggedEl.draggable = false;
        addScore(SCORE.level1_correct);
        showToast("✅ Benar! +" + SCORE.level1_correct + " poin", "success");
        beepCorrect();
        matchedCount++;
        GameState.answers.l1.push(item.id);
        saveState();
        if (matchedCount === DATA.level1.length) {
          launchConfetti();
          beepWin();
          document.getElementById("l1Next").disabled = false;
          showToast("🎉 Semua cocok! Lanjut ke Level 2!", "success", 2500);
        }
      } else {
        // Salah
        addScore(SCORE.level1_wrong);
        t.classList.add("wrong");
        setTimeout(() => t.classList.remove("wrong"), 500);
        showToast("❌ Belum cocok. Coba lagi!", "error");
        beepWrong();
      }
    });
    topoCol.appendChild(t);
  });
}

// ==================================================
// LEVEL 2 — BUILD TOPOLOGY
// ==================================================
let l2State = { challengeIdx: 0, filledSlots: {} };

function initLevel2() {
  l2State = { challengeIdx: 0, filledSlots: {} };
  document.getElementById("l2Next").hidden = true;
  document.getElementById("l2Next").onclick = () => { markLevelDone(2); loadLevel(3); };
  document.getElementById("l2Hint").onclick = () => {
    const ch = DATA.level2[l2State.challengeIdx];
    showModal("💡 Bantuan Level 2",
      `<p><b>Tantangan:</b> ${ch.tantangan}</p>
       <p>Drag komponen dari kotak kiri ke slot kosong di kanvas. Cocokkan tipe komponen dengan target!</p>
       <p>Untuk STAR: 1 Switch di tengah, 4 PC di sekeliling.</p>`);
  };
  document.getElementById("l2Reset").onclick = () => {
    l2State.filledSlots = {};
    renderL2Challenge();
  };
  document.getElementById("l2Check").onclick = () => checkL2();
  renderL2Challenge();
}

function renderL2Challenge() {
  const ch = DATA.level2[l2State.challengeIdx];
  document.getElementById("l2Challenge").textContent = ch.tantangan;
  const canvas = document.getElementById("buildCanvas");
  canvas.innerHTML = "";
  // Buat slot
  ch.slots.forEach(slot => {
    const s = document.createElement("div");
    s.className = "drop-slot";
    s.dataset.slotId = slot.id;
    s.dataset.requiredType = slot.type;
    s.style.left = slot.x + "%";
    s.style.top = slot.y + "%";
    s.style.transform = "translate(-50%,-50%)";
    const filledType = l2State.filledSlots[slot.id];
    if (filledType) {
      s.classList.add("filled");
      s.innerHTML = `<span class="slot-icon">${iconFor(filledType)}</span>
        <span class="slot-label">${slot.label}</span>`;
    } else {
      s.innerHTML = `<span>?</span><span class="slot-label">${slot.label}</span>`;
    }
    s.addEventListener("dragover", e => { e.preventDefault(); s.classList.add("drag-over"); });
    s.addEventListener("dragleave", () => s.classList.remove("drag-over"));
    s.addEventListener("drop", e => {
      e.preventDefault();
      s.classList.remove("drag-over");
      const type = e.dataTransfer.getData("text/plain");
      l2State.filledSlots[slot.id] = type;
      renderL2Challenge();
    });
    s.addEventListener("click", () => {
      // Klik untuk hapus
      if (l2State.filledSlots[slot.id]) {
        delete l2State.filledSlots[slot.id];
        renderL2Challenge();
      }
    });
    canvas.appendChild(s);
  });

  // Buat SVG link antar slot
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("style", "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;");
  const svgNS = "http://www.w3.org/2000/svg";
  ch.links.forEach(([a, b]) => {
    const sa = ch.slots.find(x => x.id === a);
    const sb = ch.slots.find(x => x.id === b);
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", sa.x + "%");
    line.setAttribute("y1", sa.y + "%");
    line.setAttribute("x2", sb.x + "%");
    line.setAttribute("y2", sb.y + "%");
    line.setAttribute("stroke", "#2E75B6");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("stroke-dasharray", "4 4");
    svg.appendChild(line);
  });
  canvas.insertBefore(svg, canvas.firstChild);

  // Toolbox: drag handler
  document.querySelectorAll(".tool-item").forEach(t => {
    t.ondragstart = e => e.dataTransfer.setData("text/plain", t.dataset.type);
  });
}

function iconFor(type) {
  return { pc:"💻", switch:"🔀", router:"📡", ap:"📶" }[type] || "❓";
}

function checkL2() {
  const ch = DATA.level2[l2State.challengeIdx];
  let allCorrect = true;
  let filledCount = 0;
  ch.slots.forEach(slot => {
    const filled = l2State.filledSlots[slot.id];
    const el = document.querySelector(`.drop-slot[data-slot-id="${slot.id}"]`);
    if (!filled) { allCorrect = false; return; }
    filledCount++;
    if (filled === slot.type) {
      el.classList.add("correct");
    } else {
      el.classList.add("wrong");
      allCorrect = false;
    }
  });

  if (filledCount < ch.slots.length) {
    showToast("⚠️ Masih ada slot kosong. Isi semua dulu ya!", "error");
    return;
  }

  if (allCorrect) {
    addScore(SCORE.level2_success);
    GameState.answers.l2.push(ch.target);
    saveState();
    beepCorrect();
    launchConfetti(40);
    if (l2State.challengeIdx < DATA.level2.length - 1) {
      showToast("🎉 Benar! +" + SCORE.level2_success + " poin. Lanjut tantangan berikutnya!", "success", 2200);
      setTimeout(() => {
        l2State.challengeIdx++;
        l2State.filledSlots = {};
        renderL2Challenge();
      }, 1200);
    } else {
      beepWin();
      showToast("🏆 Semua tantangan selesai!", "success", 2500);
      document.getElementById("l2Next").hidden = false;
    }
  } else {
    showToast("❌ Ada yang belum tepat. Coba periksa lagi!", "error");
    beepWrong();
    setTimeout(() => {
      document.querySelectorAll(".drop-slot.wrong").forEach(el => el.classList.remove("wrong"));
    }, 900);
  }
}

// ==================================================
// LEVEL 3 — QUIZ
// ==================================================
let l3Index = 0;

function initLevel3() {
  l3Index = 0;
  document.getElementById("l3Next").hidden = true;
  document.getElementById("l3Next").onclick = () => { markLevelDone(3); loadLevel(4); };
  document.getElementById("l3Hint").onclick = () => showModal("💡 Bantuan Level 3",
    "<p>Ingat prinsipnya:</p><ul>" +
    "<li>Butuh <b>murah + mudah dirawat</b> → Star</li>" +
    "<li>Butuh <b>bertingkat / bercabang</b> → Tree</li>" +
    "<li>Butuh <b>gabungan kabel + nirkabel</b> → Hybrid</li>" +
    "<li>Butuh <b>andal super</b> → Mesh (tapi mahal)</li>" +
    "<li><b>Hemat kabel</b> → Bus</li></ul>");
  renderL3();
}

function renderL3() {
  const s = DATA.level3[l3Index];
  document.getElementById("l3Counter").textContent = (l3Index + 1);
  document.getElementById("l3Scenario").textContent = s.skenario;
  const optDiv = document.getElementById("l3Options");
  optDiv.innerHTML = "";
  document.getElementById("l3Explain").hidden = true;
  document.getElementById("l3Next").hidden = true;

  s.pilihan.forEach(p => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = p;
    btn.addEventListener("click", () => answerL3(btn, p, s));
    optDiv.appendChild(btn);
  });
}

function answerL3(btn, choice, s) {
  document.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
  const explain = document.getElementById("l3Explain");
  if (choice === s.jawaban) {
    btn.classList.add("correct");
    addScore(SCORE.level3_correct);
    GameState.answers.l3.push(s.jawaban);
    saveState();
    beepCorrect();
    explain.className = "quiz-explanation";
    explain.innerHTML = `✅ <b>Benar!</b> +${SCORE.level3_correct} poin.<br>${s.penjelasan}`;
  } else {
    btn.classList.add("wrong");
    beepWrong();
    // tandai jawaban benar
    document.querySelectorAll(".quiz-option").forEach(b => {
      if (b.textContent === s.jawaban) b.classList.add("correct");
    });
    explain.className = "quiz-explanation wrong";
    explain.innerHTML = `❌ <b>Belum tepat.</b> Jawaban yang benar: <b>${s.jawaban}</b>.<br>${s.penjelasan}`;
  }
  explain.hidden = false;

  const nextBtn = document.getElementById("l3Next");
  nextBtn.hidden = false;
  if (l3Index < DATA.level3.length - 1) {
    nextBtn.textContent = "Skenario Berikutnya →";
    nextBtn.onclick = () => { l3Index++; renderL3(); };
  } else {
    nextBtn.textContent = "Lanjut ke Level 4 →";
    nextBtn.onclick = () => { markLevelDone(3); loadLevel(4); };
  }
}

// ==================================================
// LEVEL 4 — SLIDER
// ==================================================
function initLevel4() {
  const sc = document.getElementById("sliderCost");
  const sr = document.getElementById("sliderReliability");
  const ss = document.getElementById("sliderSpeed");
  const vc = document.getElementById("valCost");
  const vr = document.getElementById("valReliability");
  const vs = document.getElementById("valSpeed");

  // Reset
  sc.value = 50; sr.value = 50; ss.value = 50;
  vc.textContent = 50; vr.textContent = 50; vs.textContent = 50;

  function update() {
    vc.textContent = sc.value;
    vr.textContent = sr.value;
    vs.textContent = ss.value;
  }
  sc.oninput = sr.oninput = ss.oninput = update;

  let attempts = 0;
  document.getElementById("l4Apply").onclick = () => {
    attempts++;
    const cost = +sc.value, rel = +sr.value, spd = +ss.value;
    const chosen = recommendTopology(cost, rel, spd);
    const resultBox = document.getElementById("l4Result");
    resultBox.innerHTML = `
      <p>Berdasarkan pilihanmu (Biaya: <b>${cost}</b>, Keandalan: <b>${rel}</b>, Kecepatan: <b>${spd}</b>):</p>
      <p style="font-size:18px;margin:10px 0;"><b>🎯 Topologi terbaik: ${chosen.topologi}</b></p>
      <p>Trade-off (Kompromi): ${chosen.desc}.</p>
      ${attempts < 3 ? `<p style="color:#C55A11;font-size:12px;">Percobaan ke-${attempts} dari 3. Coba atur ulang untuk lihat topologi lain!</p>` : ""}
    `;
    addScore(SCORE.level4_attempt);
    beepCorrect();
    GameState.answers.l4 = { cost, rel, spd, topologi: chosen.topologi };
    saveState();
    if (attempts >= 3) {
      document.getElementById("l4Next").hidden = false;
      document.getElementById("l4Apply").disabled = true;
    }
  };

  document.getElementById("l4Next").hidden = true;
  document.getElementById("l4Next").onclick = () => { markLevelDone(4); loadLevel(5); };
  document.getElementById("l4Apply").disabled = false;

  document.getElementById("l4Hint").onclick = () => showModal("💡 Bantuan Level 4",
    "<p>Ingat trade-off tiap topologi:</p><ul>" +
    "<li>💸 <b>Bus</b>: murah, tapi kurang andal</li>" +
    "<li>⚖️ <b>Star</b>: seimbang (paling umum)</li>" +
    "<li>🔗 <b>Ring</b>: hemat, tapi rawan</li>" +
    "<li>💎 <b>Mesh</b>: paling andal, paling mahal</li>" +
    "<li>🌳 <b>Tree</b>: bagus untuk hirarki</li>" +
    "<li>🧬 <b>Hybrid</b>: fleksibel, gabungan</li></ul>");
}

function recommendTopology(cost, rel, spd) {
  // Skor kecocokan sederhana
  const candidates = [
    { topologi:"Bus",    desc:"sangat murah, keandalan rendah, cocok untuk jaringan kecil", cost:10, rel:20, spd:40 },
    { topologi:"Star",   desc:"biaya sedang, keandalan & kecepatan tinggi, cocok lab/kantor", cost:50, rel:80, spd:80 },
    { topologi:"Ring",   desc:"biaya sedang, keandalan sedang, cocok industri khusus", cost:50, rel:50, spd:50 },
    { topologi:"Mesh",   desc:"sangat andal, biaya mahal, cocok data center/militer", cost:90, rel:95, spd:85 },
    { topologi:"Tree",   desc:"cocok untuk sekolah & gedung bertingkat, hirarki", cost:70, rel:75, spd:75 },
    { topologi:"Hybrid", desc:"fleksibel, gabungan kabel & nirkabel, cocok ISP/kampus", cost:60, rel:75, spd:75 }
  ];
  let best = candidates[0], bestScore = Infinity;
  candidates.forEach(c => {
    const d = Math.abs(c.cost - cost) + Math.abs(c.rel - rel) + Math.abs(c.spd - spd);
    if (d < bestScore) { bestScore = d; best = c; }
  });
  return best;
}

// ==================================================
// LEVEL 5 — REFLECTION
// ==================================================
let l5Rating = 0;

function initLevel5() {
  l5Rating = 0;
  document.querySelectorAll(".star").forEach(s => s.classList.remove("active"));
  ["l5q1","l5q2","l5q3"].forEach(id => document.getElementById(id).value = "");

  document.querySelectorAll(".star").forEach(btn => {
    btn.onclick = () => {
      l5Rating = +btn.dataset.value;
      document.querySelectorAll(".star").forEach(b => {
        b.classList.toggle("active", +b.dataset.value <= l5Rating);
      });
      beep(700, 80);
    };
  });

  document.getElementById("l5Hint").onclick = () => showModal("💡 Bantuan Level 5",
    "<p>Tidak ada jawaban salah di sini. Tulis dengan jujur apa yang kamu rasakan dan pelajari. Refleksi membantu kamu belajar lebih baik! 🌟</p>");

  document.getElementById("l5Finish").onclick = () => {
    const q1 = document.getElementById("l5q1").value.trim();
    const q2 = document.getElementById("l5q2").value.trim();
    const q3 = document.getElementById("l5q3").value.trim();
    if (!q1 || !q2 || !q3) {
      showToast("⚠️ Isi semua pertanyaan dulu ya!", "error");
      return;
    }
    if (!l5Rating) {
      showToast("⭐ Jangan lupa beri nilai dirimu (1-4 bintang)!", "error");
      return;
    }
    // hitung skor refleksi
    let filled = 0;
    if (q1) filled++; if (q2) filled++; if (q3) filled++;
    addScore(filled * SCORE.level5_filled);
    GameState.answers.l5 = { q1, q2, q3, rating: l5Rating };
    saveState();

    markLevelDone(5);
    showFinalScreen();
  };
}

// ==================================================
// FINAL SCREEN
// ==================================================
function showFinalScreen() {
  document.getElementById("finalName").textContent = GameState.playerName || "Pemain";
  document.getElementById("finalScore").textContent = GameState.score;
  document.getElementById("finalBadge").textContent = getBadge(GameState.score);
  saveScoreToLeaderboard(GameState.playerName, GameState.score);
  showScreen("final");
  launchConfetti(120);
  beepWin();

  document.getElementById("playAgainBtn").onclick = () => {
    showModal("🔄 Main Lagi?", "<p>Yakin ingin reset semua progress dan mulai dari awal?</p>",
      true,
      () => {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      });
  };

  document.getElementById("downloadAnswersBtn").onclick = downloadAnswersTxt;
  document.getElementById("certificateBtn").onclick = generateCertificate;
}

function getBadge(score) {
  if (score >= 91) return "🏆 Master Jaringan";
  if (score >= 71) return "🧠 Ahli Topologi";
  if (score >= 41) return "🔧 Teknisi Muda";
  return "🌱 Pemula Jaringan";
}

function markLevelDone(n) {
  GameState.levelsDone[n] = true;
  if (GameState.maxUnlocked < n + 1) GameState.maxUnlocked = Math.min(5, n + 1);
  saveState();
}

// ==================================================
// DOWNLOAD ANSWERS (.txt)
// ==================================================
function downloadAnswersTxt() {
  const a = GameState.answers;
  const lines = [
    "==================================================",
    "  HASIL LKPD — TOPOQUEST",
    "  LKPD Informatika Kelas 9 · Topologi Jaringan",
    "  " + SCHOOL_NAME,
    "==================================================",
    "",
    "Nama   : " + (GameState.playerName || "-"),
    "Skor   : " + GameState.score + " poin",
    "Badge  : " + getBadge(GameState.score),
    "Tanggal: " + new Date().toLocaleString("id-ID"),
    "",
    "==================================================",
    "BAGIAN A — Memahami Topologi (Level 1)",
    "==================================================",
    "Topologi yang berhasil dicocokkan: " + (a.l1.join(", ") || "-"),
    "",
    "==================================================",
    "BAGIAN B — Studi Kasus (Level 2 & 3)",
    "==================================================",
    "Tantangan bangun yang selesai: " + (a.l2.join(", ") || "-"),
    "Jawaban skenario (Level 3): " + (a.l3.join(", ") || "-"),
    "Trade-off (Level 4): Biaya=" + (a.l4.cost ?? "-") +
      ", Keandalan=" + (a.l4.rel ?? "-") +
      ", Kecepatan=" + (a.l4.spd ?? "-") +
      " → " + (a.l4.topologi || "-"),
    "",
    "==================================================",
    "BAGIAN C — Exit Ticket (Level 5)",
    "==================================================",
    "1. Hari ini saya belajar bahwa...",
    "   " + (a.l5.q1 || "-"),
    "",
    "2. Bagian tersulit adalah...",
    "   " + (a.l5.q2 || "-"),
    "",
    "3. Saya ingin tahu lebih dalam tentang...",
    "   " + (a.l5.q3 || "-"),
    "",
    "4. Nilai saya hari ini: " + (a.l5.rating || "-") + " dari 4 bintang",
    "",
    "==================================================",
    FOOTER_TEXT,
    "=================================================="
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a2 = document.createElement("a");
  a2.href = url;
  a2.download = "TOPOQUEST_" + (GameState.playerName || "murid").replace(/\s+/g,"_") + ".txt";
  document.body.appendChild(a2);
  a2.click();
  a2.remove();
  URL.revokeObjectURL(url);
  showToast("📥 Jawaban berhasil diunduh!", "success");
}

// ==================================================
// CERTIFICATE (Canvas → PNG)
// ==================================================
function generateCertificate() {
  const c = document.getElementById("certCanvas");
  const ctx = c.getContext("2d");
  // Background
  const grad = ctx.createLinearGradient(0, 0, 900, 600);
  grad.addColorStop(0, "#F7FAFC");
  grad.addColorStop(1, "#DEEAF6");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
  // Border
  ctx.strokeStyle = "#1F4E79";
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 860, 560);
  ctx.strokeStyle = "#C55A11";
  ctx.lineWidth = 2;
  ctx.strokeRect(36, 36, 828, 528);

  // Header
  ctx.fillStyle = "#1F4E79";
  ctx.font = "bold 22px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText(SCHOOL_NAME.toUpperCase(), 450, 100);

  ctx.fillStyle = "#C55A11";
  ctx.font = "bold 48px Georgia, serif";
  ctx.fillText("SERTIFIKAT", 450, 170);

  ctx.fillStyle = "#1F4E79";
  ctx.font = "italic 20px Georgia, serif";
  ctx.fillText("Sertifikat Penghargaan (Certificate of Achievement)", 450, 205);

  ctx.fillStyle = "#212121";
  ctx.font = "16px Georgia, serif";
  ctx.fillText("Diberikan kepada:", 450, 270);

  ctx.fillStyle = "#1F4E79";
  ctx.font = "bold 40px Georgia, serif";
  ctx.fillText(GameState.playerName || "Pemain", 450, 330);
  const nameWidth = ctx.measureText(GameState.playerName || "Pemain").width;
  ctx.beginPath();
  ctx.moveTo(450 - nameWidth/2 - 20, 345);
  ctx.lineTo(450 + nameWidth/2 + 20, 345);
  ctx.strokeStyle = "#C55A11";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#212121";
  ctx.font = "16px Georgia, serif";
  ctx.fillText("Telah berhasil menyelesaikan game edukasi", 450, 385);
  ctx.font = "bold 22px Georgia, serif";
  ctx.fillStyle = "#2E75B6";
  ctx.fillText("TOPOQUEST — Topologi Jaringan", 450, 420);

  ctx.fillStyle = "#548235";
  ctx.font = "bold 28px Georgia, serif";
  ctx.fillText(getBadge(GameState.score), 450, 470);

  ctx.fillStyle = "#212121";
  ctx.font = "16px Georgia, serif";
  ctx.fillText("Skor Akhir: " + GameState.score + " poin", 450, 505);

  ctx.fillStyle = "#595959";
  ctx.font = "13px Georgia, serif";
  ctx.fillText("Diterbitkan pada: " + new Date().toLocaleDateString("id-ID", { day:"numeric", month:"long", year:"numeric" }), 450, 545);

  // Unduh
  const url = c.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = "Sertifikat_TOPOQUEST_" + (GameState.playerName || "murid").replace(/\s+/g,"_") + ".png";
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast("📜 Sertifikat berhasil diunduh!", "success");
}

// ==================================================
// DARK MODE & LANGUAGE
// ==================================================
document.getElementById("darkBtn").addEventListener("click", () => {
  GameState.dark = !GameState.dark;
  document.body.classList.toggle("dark", GameState.dark);
  saveState();
});
document.getElementById("langBtn").addEventListener("click", () => {
  GameState.lang = GameState.lang === "id" ? "en" : "id";
  document.getElementById("langBtn").textContent = GameState.lang === "id" ? "🇮🇩 ID" : "🇬🇧 EN";
  document.getElementById("startBtn").textContent = GameState.lang === "id" ? "▶ MULAI MISI" : "▶ START MISSION";
  saveState();
});

// ==================================================
// EASTER EGG: ketik "TOPO" 3x cepat
// ==================================================
let easterBuffer = "";
let easterLast = 0;
document.addEventListener("keydown", e => {
  const now = Date.now();
  if (now - easterLast > 800) easterBuffer = "";
  easterLast = now;
  easterBuffer += e.key.toUpperCase();
  if (easterBuffer.length > 8) easterBuffer = easterBuffer.slice(-8);
  if ((easterBuffer.match(/TOPO/g) || []).length >= 3) {
    easterBuffer = "";
    showToast("🥚 Easter Egg! Selamat kamu menemukan rahasia! 🎉", "success", 3000);
    launchConfetti(150);
    beepWin();
  }
});

// ==================================================
// INIT
// ==================================================
(function init() {
  loadState();
  updateScoreUI();
  if (GameState.dark) document.body.classList.toggle("dark", true);
  if (GameState.lang === "en") document.getElementById("langBtn").textContent = "🇬🇧 EN";
  if (GameState.playerName) document.getElementById("playerName").value = GameState.playerName;
  buildMissionMap();
  console.log("%c🎮 TOPOQUEST siap!", "color:#1F4E79;font-size:16px;font-weight:bold;");
  console.log("%c⚙️ Semua parameter tunable bisa dicari dengan '⚙️ TUNABLE'", "color:#C55A11;");
})();