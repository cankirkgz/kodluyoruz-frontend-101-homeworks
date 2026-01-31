const nameEl = document.getElementById("myName");
let userName = prompt("Adınız nedir?");

if (!userName || !userName.trim()) {
  userName = "Ziyaretçi";
}

nameEl.textContent = userName.trim();

const clockEl = document.getElementById("myClock");

const daysTR = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

function pad2(n) {
  return String(n).padStart(2, "0");
}

function showTime() {
  const now = new Date();

  const h = pad2(now.getHours());
  const m = pad2(now.getMinutes());
  const s = pad2(now.getSeconds());
  const dayName = daysTR[now.getDay()];

  clockEl.textContent = `${h}:${m}:${s} ${dayName}`;
}

showTime();
setInterval(showTime, 1000);