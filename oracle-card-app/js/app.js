/* ───────────────────────── Lumina Oracle · app logic ───────────────────────── */
(() => {
  'use strict';

  /* ── storage ── */
  const LS_PROFILE = 'lumina.profile';
  const LS_ENTRIES = 'lumina.entries';

  const load = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  };
  const save = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  let profile = load(LS_PROFILE, null);
  let entries = load(LS_ENTRIES, {}); // { 'YYYY-MM-DD': {cardId, intention, reflection, clarityId} }

  /* ── helpers ── */
  const $ = (sel) => document.querySelector(sel);
  const todayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // FNV-1a string hash → 32-bit uint; same seed + same day = same card all day
  const hash = (str) => {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  };

  const cardForDay = (dateKey) =>
    DECK[hash(`${profile.seed}·${dateKey}`) % DECK.length];

  const entryFor = (dateKey) => entries[dateKey] || {};
  const setEntry = (dateKey, patch) => {
    entries[dateKey] = { ...entryFor(dateKey), ...patch };
    save(LS_ENTRIES, entries);
  };

  const vibrate = (pattern) => { if (navigator.vibrate) navigator.vibrate(pattern); };

  /* ── moon phase ── */
  const MOON_PHASES = [
    { name: 'New Moon', icon: '🌑', guide: 'A blank page in the sky. Plant intentions, begin quietly, and rest in the dark — what you whisper now takes root unseen.' },
    { name: 'Waxing Crescent', icon: '🌒', guide: 'The first sliver of momentum. Take small, faithful actions toward what you set in motion at the new moon.' },
    { name: 'First Quarter', icon: '🌓', guide: 'Half-light, decision time. Obstacles appear so you can choose: commit deeper or course-correct. Act.' },
    { name: 'Waxing Gibbous', icon: '🌔', guide: 'Almost full. Refine, adjust, and trust the build — this is the patient edit before the reveal.' },
    { name: 'Full Moon', icon: '🌕', guide: 'Full illumination. Celebrate what has bloomed, release what peaked, and let the light show you what was hidden.' },
    { name: 'Waning Gibbous', icon: '🌖', guide: 'The exhale begins. Share what you harvested — gratitude, lessons, abundance — and teach what you learned.' },
    { name: 'Last Quarter', icon: '🌗', guide: 'Half-dark, release point. Forgive, declutter, and cut the cords that the full moon revealed.' },
    { name: 'Waning Crescent', icon: '🌘', guide: 'The deep rest before renewal. Surrender, dream, and keep your world small — a new cycle is already forming.' },
  ];
  const moonPhase = (date = new Date()) => {
    const synodic = 29.53058867;
    const knownNew = Date.UTC(2000, 0, 6, 18, 14); // reference new moon
    const age = (((date.getTime() - knownNew) / 86400000) % synodic + synodic) % synodic;
    return MOON_PHASES[Math.floor((age / synodic) * 8 + 0.5) % 8];
  };

  /* ── starfield ── */
  const buildStars = () => {
    const wrap = $('#stars');
    const n = Math.min(110, Math.floor(window.innerWidth / 4));
    for (let i = 0; i < n; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 2.2 + 0.6;
      s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;--tw:${2.5 + Math.random() * 4}s;--td:${Math.random() * 5}s;`;
      wrap.appendChild(s);
    }
  };

  const burstSparkles = (x, y) => {
    for (let i = 0; i < 14; i++) {
      const sp = document.createElement('div');
      sp.className = 'sparkle';
      sp.textContent = Math.random() > 0.5 ? '✦' : '✧';
      const ang = (Math.PI * 2 * i) / 14 + Math.random() * 0.5;
      const dist = 60 + Math.random() * 90;
      sp.style.cssText = `left:${x}px;top:${y}px;font-size:${10 + Math.random() * 14}px;--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist}px;`;
      document.body.appendChild(sp);
      setTimeout(() => sp.remove(), 1200);
    }
  };

  /* ── views / nav ── */
  const showView = (name) => {
    document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.view === name));
    $(`#view-${name}`).classList.add('active');
    if (name === 'journal') renderJournal();
    if (name === 'moon') renderMoonView();
    window.scrollTo({ top: 0 });
  };

  document.querySelectorAll('.nav-btn').forEach((b) =>
    b.addEventListener('click', () => { vibrate(8); showView(b.dataset.view); }));

  /* ── today view ── */
  const renderToday = () => {
    const h = new Date().getHours();
    const part = h < 5 ? 'night wanderer' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
    const name = profile.name ? `, ${profile.name}` : '';
    $('#greeting').textContent = h < 5 ? `Hello, ${profile.name || 'night wanderer'}` : `Good ${part}${name}`;
    $('#today-date').textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

    const phase = moonPhase();
    $('#moon-chip').innerHTML = `<span>${phase.icon}</span><span>${phase.name}</span>`;

    const key = todayKey();
    const entry = entryFor(key);
    const card = cardForDay(key);
    fillCardFront($('#daily-card'), card);

    if (entry.intention) showIntention(entry.intention);
    if (entry.revealed) revealCard(card, false);
    if (entry.reflection) $('#reflection-input').value = entry.reflection;
    if (entry.clarityId) showClarity(DECK.find((c) => c.id === entry.clarityId), false);
  };

  const fillCardFront = (cardEl, card) => {
    const el = ELEMENTS[card.element];
    const front = cardEl.querySelector('.card-front');
    front.style.background = el.hue;
    cardEl.querySelector('.card-element').textContent = `${el.glyph} ${el.label}`;
    cardEl.querySelector('.card-glyph').textContent = card.glyph;
    cardEl.querySelector('.card-name').textContent = card.name;
    cardEl.querySelector('.card-keywords').textContent = card.keywords.join(' · ');
  };

  const revealCard = (card, animate = true) => {
    const cardEl = $('#daily-card');
    cardEl.classList.add('flipped');
    $('#reveal-hint').classList.add('hidden');
    $('#card-message').textContent = card.message;
    $('#card-shadow').textContent = card.shadow;
    $('#card-affirmation').textContent = `“${card.affirmation}”`;
    $('#card-prompt').textContent = card.prompt;
    if (animate) {
      vibrate([12, 60, 24]);
      const r = cardEl.getBoundingClientRect();
      setTimeout(() => burstSparkles(r.left + r.width / 2, r.top + r.height / 2), 480);
      setTimeout(() => $('#reading').classList.remove('hidden'), 650);
      setEntry(todayKey(), { cardId: card.id, revealed: true, revealedAt: Date.now() });
    } else {
      $('#reading').classList.remove('hidden');
    }
  };

  $('#daily-card').addEventListener('click', () => {
    if ($('#daily-card').classList.contains('flipped')) return;
    revealCard(cardForDay(todayKey()));
  });
  $('#daily-card').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $('#daily-card').click(); }
  });

  /* intention */
  const showIntention = (text) => {
    $('#intention-input').parentElement.classList.add('hidden');
    $('.intention-label').textContent = 'Today’s intention';
    const disp = $('#intention-display');
    disp.textContent = `“${text}”`;
    disp.classList.remove('hidden');
  };
  $('#intention-save').addEventListener('click', () => {
    const text = $('#intention-input').value.trim();
    if (!text) return;
    setEntry(todayKey(), { intention: text });
    vibrate(10);
    showIntention(text);
  });
  $('#intention-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('#intention-save').click(); });

  /* reflection */
  $('#reflection-save').addEventListener('click', () => {
    const text = $('#reflection-input').value.trim();
    setEntry(todayKey(), { reflection: text });
    vibrate(10);
    const note = $('#reflection-saved');
    note.classList.remove('hidden');
    setTimeout(() => note.classList.add('hidden'), 2200);
  });

  /* clarity card — a second, spontaneous draw to clarify the daily message */
  const showClarity = (card, animate = true) => {
    const box = $('#clarity-result');
    box.innerHTML = `
      <h4>${card.glyph} Clarity · ${card.name}</h4>
      <p>${card.message}</p>`;
    box.classList.remove('hidden');
    $('#clarity-btn').disabled = true;
    $('#clarity-btn').style.opacity = 0.45;
    if (animate) { vibrate([10, 40, 10]); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  };
  $('#clarity-btn').addEventListener('click', () => {
    const daily = cardForDay(todayKey());
    let pick;
    do { pick = DECK[Math.floor(Math.random() * DECK.length)]; } while (pick.id === daily.id);
    setEntry(todayKey(), { clarityId: pick.id });
    showClarity(pick);
  });

  /* share */
  $('#share-btn').addEventListener('click', async () => {
    const card = cardForDay(todayKey());
    const text = `🔮 My Lumina Oracle card today is ${card.glyph} ${card.name} — ${card.keywords.join(', ')}.\n\n“${card.affirmation}”`;
    try {
      if (navigator.share) await navigator.share({ title: 'Lumina Oracle', text });
      else {
        await navigator.clipboard.writeText(text);
        $('#share-btn').textContent = '✓ Copied';
        setTimeout(() => ($('#share-btn').textContent = '↗ Share'), 1800);
      }
    } catch { /* user dismissed share sheet */ }
  });

  /* ── deck view ── */
  let deckFilter = 'all';
  const renderFilters = () => {
    const row = $('#element-filters');
    const opts = [['all', '✦ All'], ...Object.entries(ELEMENTS).map(([k, v]) => [k, `${v.glyph} ${v.label}`])];
    row.innerHTML = '';
    opts.forEach(([key, label]) => {
      const chip = document.createElement('button');
      chip.className = `chip${deckFilter === key ? ' active' : ''}`;
      chip.textContent = label;
      chip.addEventListener('click', () => { deckFilter = key; renderFilters(); renderDeck(); });
      row.appendChild(chip);
    });
  };
  const renderDeck = () => {
    const grid = $('#deck-grid');
    grid.innerHTML = '';
    DECK.filter((c) => deckFilter === 'all' || c.element === deckFilter).forEach((card) => {
      const tile = document.createElement('div');
      tile.className = 'deck-tile';
      tile.style.background = ELEMENTS[card.element].hue;
      tile.innerHTML = `<div class="tile-glyph">${card.glyph}</div><div class="tile-name">${card.name}</div>`;
      tile.addEventListener('click', () => openCardModal(card));
      grid.appendChild(tile);
    });
  };

  const openCardModal = (card, dateLabel) => {
    const el = ELEMENTS[card.element];
    $('#modal-body').innerHTML = `
      ${dateLabel ? `<p class="modal-element">${dateLabel}</p>` : ''}
      <div class="modal-glyph">${card.glyph}</div>
      <h3 class="modal-name">${card.name}</h3>
      <p class="modal-element">${el.glyph} ${el.label} · ${card.keywords.join(' · ')}</p>
      <div class="modal-section"><h4>✶ Message</h4><p>${card.message}</p></div>
      <div class="modal-section"><h4>☾ Shadow whisper</h4><p>${card.shadow}</p></div>
      <div class="modal-section"><h4>♡ Affirmation</h4><p>“${card.affirmation}”</p></div>
      <div class="modal-section"><h4>✎ Journal prompt</h4><p>${card.prompt}</p></div>`;
    $('#card-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    $('#card-modal').classList.add('hidden');
    document.body.style.overflow = '';
  };
  $('#modal-close').addEventListener('click', closeModal);
  $('#card-modal').addEventListener('click', (e) => { if (e.target.id === 'card-modal') closeModal(); });

  /* ── journal view ── */
  const computeStreak = () => {
    let streak = 0;
    const d = new Date();
    for (;;) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (entries[key]?.revealed) { streak++; d.setDate(d.getDate() - 1); }
      else if (streak === 0 && key === todayKey()) { d.setDate(d.getDate() - 1); } // today not pulled yet doesn't break it
      else break;
    }
    return streak;
  };

  const renderJournal = () => {
    const keys = Object.keys(entries).filter((k) => entries[k].revealed).sort().reverse();
    $('#streak-count').textContent = computeStreak();
    $('#total-pulls').textContent = keys.length;
    $('#total-notes').textContent = keys.filter((k) => entries[k].reflection).length;

    const list = $('#journal-list');
    list.innerHTML = '';
    if (!keys.length) {
      list.innerHTML = `<div class="journal-empty">Your journal is waiting for its first page.<br/>Pull today’s card and write a reflection ✦</div>`;
      return;
    }
    keys.forEach((key) => {
      const entry = entries[key];
      const card = DECK.find((c) => c.id === entry.cardId);
      if (!card) return;
      const row = document.createElement('div');
      row.className = 'journal-entry';
      const date = new Date(`${key}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      row.innerHTML = `
        <div class="je-date">${date}</div>
        <div class="je-card">${card.glyph} ${card.name}</div>
        ${entry.intention ? `<div class="je-snippet">Intention: “${entry.intention}”</div>` : ''}
        ${entry.reflection ? `<div class="je-snippet">${entry.reflection.length > 110 ? entry.reflection.slice(0, 110) + '…' : entry.reflection}</div>` : ''}`;
      row.addEventListener('click', () => openCardModal(card, date));
      list.appendChild(row);
    });
  };

  /* ── moon & settings view ── */
  const renderMoonView = () => {
    const phase = moonPhase();
    $('#moon-big').textContent = phase.icon;
    $('#moon-name').textContent = phase.name;
    $('#moon-guidance').textContent = phase.guide;
    $('#settings-name').value = profile.name || '';
  };
  $('#settings-name-save').addEventListener('click', () => {
    profile.name = $('#settings-name').value.trim();
    save(LS_PROFILE, profile);
    vibrate(10);
    renderToday();
  });
  $('#reset-btn').addEventListener('click', () => {
    if (!confirm('This erases your journal, streak, and profile on this device. Continue?')) return;
    localStorage.removeItem(LS_PROFILE);
    localStorage.removeItem(LS_ENTRIES);
    location.reload();
  });

  /* ── onboarding / boot ── */
  const boot = () => {
    buildStars();
    if (!profile) {
      $('#onboarding').classList.remove('hidden');
      $('#begin-btn').addEventListener('click', () => {
        profile = {
          name: $('#name-input').value.trim(),
          seed: Math.floor(Math.random() * 0xffffffff).toString(36),
          created: Date.now(),
        };
        save(LS_PROFILE, profile);
        vibrate([10, 50, 16]);
        $('#onboarding').classList.add('hidden');
        startApp();
      });
    } else {
      startApp();
    }
  };

  const startApp = () => {
    $('#app').classList.remove('hidden');
    renderToday();
    renderFilters();
    renderDeck();
  };

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  boot();
})();
