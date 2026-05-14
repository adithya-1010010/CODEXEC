// ── THEME TOGGLE ──────────────────────────────────────────────────
function applyLight() {
  document.body.classList.add('light-mode');
  document.getElementById('theme-toggle').classList.add('light-on');
  document.getElementById('theme-label').textContent = 'LIGHT';
  document.getElementById('icon-moon').style.display = 'none';
  document.getElementById('icon-sun').style.display  = 'block';
}
function applyDark() {
  document.body.classList.remove('light-mode');
  document.getElementById('theme-toggle').classList.remove('light-on');
  document.getElementById('theme-label').textContent = 'DARK';
  document.getElementById('icon-moon').style.display = 'block';
  document.getElementById('icon-sun').style.display  = 'none';
}
function toggleTheme() {
  if (document.body.classList.contains('light-mode')) {
    applyDark();  try { localStorage.setItem('cx_theme', 'dark');  } catch(e) {}
  } else {
    applyLight(); try { localStorage.setItem('cx_theme', 'light'); } catch(e) {}
  }
}
try { if (localStorage.getItem('cx_theme') === 'light') applyLight(); } catch(e) {}

// ── AVATAR ────────────────────────────────────────────────────────
function handleAvatarUpload(e) {
  const file = e.target.files[0]; if (!file) return;
  const r = new FileReader();
  r.onload = function(ev) {
    setAvatar(ev.target.result);
    try { localStorage.setItem('cx_avatar', ev.target.result); } catch(e) {}
  };
  r.readAsDataURL(file);
}
function setAvatar(src) {
  const img = document.getElementById('avatar-img');
  const def = document.getElementById('avatar-default');
  img.src = src; img.style.display = 'block'; def.style.display = 'none';
  document.getElementById('nav-avatar-img').innerHTML = '<img src="' + src + '" alt="avatar">';
}
try { const a = localStorage.getItem('cx_avatar'); if (a) setAvatar(a); } catch(e) {}

// ── HEATMAP ───────────────────────────────────────────────────────
(function() {
  const DAYS   = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
  const LEVELS = [2, 3, 4, 1, 3, 0, 4];
  const INFO   = [
    ['Poor',      'No activity recorded.'],
    ['Average',   'Light usage — a few resources accessed.'],
    ['Good',      'Decent session — some lessons completed.'],
    ['Very Good', 'Solid progress made.'],
    ['Excellent', 'High engagement — great day!']
  ];
  const tip = document.getElementById('hmap-tooltip');
  const con = document.getElementById('heatmap-week');

  DAYS.forEach(function(day, i) {
    const lvl  = LEVELS[i];
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:6px;flex:1;';

    const cell = document.createElement('div');
    cell.className = 'hmap-cell hmap-' + lvl;
    cell.style.cssText = 'width:100%;aspect-ratio:1;border-radius:3px;cursor:pointer;transition:transform .15s,box-shadow .15s;';
    cell.onmouseenter = function() {
      cell.style.transform = 'scale(1.12)';
      cell.style.boxShadow = '0 0 8px rgba(232,74,26,0.35)';
      tip.innerHTML = '<b style="color:var(--accent)">' + day + '</b><br>' + INFO[lvl][0] + '<br><span style="color:var(--ink-muted);font-size:0.6rem;">' + INFO[lvl][1] + '</span>';
      tip.style.display = 'block';
    };
    cell.onmousemove  = function(e) { tip.style.left = (e.clientX + 14) + 'px'; tip.style.top = (e.clientY - 10) + 'px'; };
    cell.onmouseleave = function() { cell.style.transform = ''; cell.style.boxShadow = ''; tip.style.display = 'none'; };

    const lbl = document.createElement('div');
    lbl.textContent = day;
    lbl.style.cssText = 'font-size:0.58rem;letter-spacing:0.1em;color:var(--ink-muted);';

    wrap.append(cell, lbl);
    con.appendChild(wrap);
  });
})();

// ── NAV SEARCH ────────────────────────────────────────────────────
const NAV_PAGES = [
  {icon:'🗺️', label:'World Map',      tag:'PAGE',   href:'map.html'},
  {icon:'🏝️', label:'HTML Island',    tag:'ISLAND', href:'html-island.html'},
  {icon:'💎', label:'CSS Island',     tag:'ISLAND', href:'css-island.html'},
  {icon:'⚡', label:'JS Island',      tag:'ISLAND', href:'js-island.html'},
  {icon:'📚', label:'Current Lesson', tag:'PAGE',   href:'lesson.html'},
  {icon:'👤', label:'Profile',        tag:'PAGE',   href:'profile.html'},
  {icon:'⚙️', label:'Settings',       tag:'PAGE',   href:'settings.html'},
  {icon:'ℹ️', label:'About Us',       tag:'PAGE',   href:'about.html'},
];
function navSearch(q) {
  const box = document.getElementById('search-results');
  if (!q.trim()) { box.classList.remove('open'); return; }
  const m = NAV_PAGES.filter(p => p.label.toLowerCase().includes(q.toLowerCase()));
  box.innerHTML = m.length
    ? m.map(p => `<div class="search-result-item" onclick="location.href='${p.href}'"><span class="search-result-icon">${p.icon}</span><span class="search-result-label">${p.label}</span><span class="search-result-tag">${p.tag}</span></div>`).join('')
    : '<div class="search-empty">No results found</div>';
  box.classList.add('open');
}
function closeSearch() { document.getElementById('search-results').classList.remove('open'); }

// Load saved username
      const savedName = localStorage.getItem("cx_username");
      if (savedName)
        document.getElementById("profile-name-display").textContent = savedName;

//bio update in profile
      const profilebio = localStorage.getItem("cx_Bio");
      if (profilebio) {
        var showBio = (document.getElementById("profileBio").innerText =
          profilebio);
      }
