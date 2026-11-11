/* 내 필기(메모장): 동그란 버튼 → ‘메모장’으로 여는 떠 있는 창. 페이지마다 글자(textarea)와 펜 필기(canvas)를 함께 저장해요.
 * 저장 위치: 이 브라우저 localStorage ('wbnotes:v1' 필기 내용, 'wbnotes:ui' 패널 설정) */
(function () {
  'use strict';
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  var root = document.documentElement;
  var panel = $('#notes'), sheet = $('#nt-sheet'), paper = $('#nt-paper');
  var titleEl = $('#nt-title'), ta = $('#nt-text'), cv = $('#nt-ink'), ctx = cv.getContext('2d');
  var stEl = $('#nt-st'), sel = $('#nt-page'), menu = $('#nt-menu'), moreBtn = $('#nt-more');
  if (!panel) return;

  // ---------- 저장 ----------
  var NKEY = 'wbnotes:v1', UKEY = 'wbnotes:ui';
  var COLORS = [
    { k: 'ink', name: '기본색' }, { k: '#e03e3e', name: '빨강' }, { k: '#2f6fdb', name: '파랑' },
    { k: '#2a9d5c', name: '초록' }, { k: '#f2c230', name: '노랑' }
  ];
  var SIZES = { pen: [1.6, 3, 6], hl: [10, 16, 26], eraser: [8, 16, 30] };
  var D = { cur: null, pages: [] };
  var U = { open: false, mode: 'text', tool: 'pen', color: { pen: 'ink', hl: '#f2c230' }, size: { pen: 1, hl: 1, eraser: 1 } };
  function load(key) { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; } }
  var d0 = load(NKEY); if (d0 && Array.isArray(d0.pages)) D = d0;
  var u0 = load(UKEY); if (u0 && typeof u0 === 'object') { for (var k in u0) if (k in U) U[k] = u0[k]; }
  function uid() { return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function newPage() { return { id: uid(), title: '', text: '', strokes: [], w: 0, upd: Date.now() }; }
  if (!D.pages.length) D.pages.push(newPage());
  function page() { for (var i = 0; i < D.pages.length; i++) if (D.pages[i].id === D.cur) return D.pages[i]; D.cur = D.pages[0].id; return D.pages[0]; }

  var saveT = null;
  function hhmm() { var d = new Date(); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
  function status(t, err) { stEl.textContent = t; stEl.classList.toggle('err', !!err); }
  function save(now) {
    clearTimeout(saveT);
    var run = function () {
      try { localStorage.setItem(NKEY, JSON.stringify(D)); status('자동 저장됨 · ' + hhmm()); }
      catch (e) { status('브라우저 저장 공간이 가득 차서 저장하지 못했어요. ⋮ 메뉴의 ‘모든 필기 파일로 저장’으로 보관한 뒤 안 쓰는 페이지를 지워 주세요.', true); }
    };
    if (now) run(); else saveT = setTimeout(run, 400);
  }
  function touch() { page().upd = Date.now(); save(); }
  function saveUI() { try { localStorage.setItem(UKEY, JSON.stringify(U)); } catch (e) {} }

  // ---------- 페이지 목록 ----------
  function label(p, i) {
    if (p.title.trim()) return p.title.trim();
    var d = new Date(p.upd || Date.now());
    return '제목 없음 ' + (i + 1) + ' (' + (d.getMonth() + 1) + '/' + d.getDate() + ')';
  }
  function fillSelect() {
    sel.innerHTML = '';
    D.pages.forEach(function (p, i) { var o = document.createElement('option'); o.value = p.id; o.textContent = label(p, i); sel.appendChild(o); });
    sel.value = page().id;
  }
  function showPage() {
    var p = page();
    titleEl.value = p.title; ta.value = p.text;
    fillSelect(); layout();
  }
  sel.addEventListener('change', function () { D.cur = sel.value; save(); showPage(); });
  $('#nt-new').addEventListener('click', function () {
    var p = newPage(); p.w = paper.clientWidth; D.pages.push(p); D.cur = p.id; save(); showPage();
    setMode('text'); titleEl.focus();
  });
  titleEl.addEventListener('input', function () {
    page().title = titleEl.value; touch();
    var o = sel.options[sel.selectedIndex]; if (o) o.textContent = label(page(), sel.selectedIndex);
  });
  titleEl.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); ta.focus(); } });
  ta.addEventListener('input', function () { page().text = ta.value; touch(); layout(); });
  ta.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault(); var a = ta.selectionStart, b = ta.selectionEnd;
      ta.setRangeText('    ', a, b, 'end'); ta.dispatchEvent(new Event('input'));
    }
  });

  // ---------- 열기 / 닫기 (지금 보이는 동그란 버튼 옆에 떠요) ----------
  var FABS = ['#fab', '#jfab'];
  function visFab() {
    for (var i = 0; i < FABS.length; i++) { var f = $(FABS[i]); if (f && f.getClientRects().length && getComputedStyle(f).display !== 'none') return f; }
    return null;
  }
  function markFabs() {
    var f = U.open ? visFab() : null;
    FABS.forEach(function (sel) {
      var b = $(sel); if (!b) return;
      var box = $('#' + b.getAttribute('aria-controls'));
      if (b === f) b.setAttribute('aria-expanded', 'true');
      else if (!box || box.hidden) b.setAttribute('aria-expanded', 'false');
    });
  }
  function place() {
    if (!U.open) return;
    var f = visFab(), M = 12, W2 = document.documentElement.clientWidth, H2 = window.innerHeight;
    var t = $('.top'), topMin = t ? Math.max(M, t.getBoundingClientRect().bottom + 8) : M;
    var w = Math.min(440, W2 - 2 * M), left, top, h;
    if (f) {
      var r = f.getBoundingClientRect();
      var above = r.top - topMin - 10, below = H2 - r.bottom - M - 10, up = above >= below;
      h = Math.max(320, Math.min(720, up ? above : below));
      left = (r.left + r.width / 2 > W2 / 2) ? r.right - w : r.left;
      top = up ? r.top - 10 - h : r.bottom + 10;
    } else { h = Math.min(720, H2 - topMin - M); left = W2 - w - M; top = topMin; }
    panel.style.width = w + 'px'; panel.style.height = h + 'px';
    panel.style.left = Math.max(M, Math.min(W2 - w - M, left)) + 'px';
    panel.style.top = Math.max(topMin, Math.min(H2 - h - M, top)) + 'px';
    markFabs(); layout();
  }
  function setOpen(open, quiet) {
    var was = U.open;
    U.open = open; saveUI();
    root.classList.toggle('nt-open', open);
    if (open) { panel.removeAttribute('inert'); place(); requestAnimationFrame(layout); if (!quiet && U.mode !== 'pen') setTimeout(function () { ta.focus({ preventScroll: true }); }, 0); }
    else {
      var f = visFab(); panel.setAttribute('inert', ''); closeMenu(); markFabs();
      if (was && !quiet && f) f.focus();
    }
  }
  $('#nt-close').addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !U.open) return;
    if (!menu.hidden) { closeMenu(); moreBtn.focus(); return; }
    var a = document.activeElement;
    if (panel.contains(a) && a !== ta && a !== titleEl) setOpen(false);
  });
  // 동그란 버튼(app.js·java.js)에서 쓰는 열기·닫기
  WB.notes = {
    open: function () { setOpen(true); },
    close: function (quiet) { if (U.open) setOpen(false, quiet); },
    isOpen: function () { return !!U.open; },
    place: place
  };

  // ---------- 글자 / 펜 모드와 도구 ----------
  function setMode(m) {
    U.mode = m; saveUI();
    $$('[data-ntmode]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.ntmode === m)); });
    $('#nt-pen').hidden = $('#nt-pen2').hidden = m !== 'pen';
    $('#nt-text-tools').hidden = m === 'pen';
    panel.classList.toggle('nt-drawing', m === 'pen');
    titleEl.readOnly = ta.readOnly = m === 'pen';
    if (m === 'pen' && panel.contains(document.activeElement)) document.activeElement.blur();
    syncTools();
  }
  $$('[data-ntmode]').forEach(function (b) { b.addEventListener('click', function () { setMode(b.dataset.ntmode); }); });
  function syncTools() {
    $$('[data-nttool]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.nttool === U.tool)); });
    panel.classList.toggle('nt-erasing', U.tool === 'eraser');
    $('#nt-sep-c').hidden = U.tool === 'eraser';
    var cBox = $('#nt-colors'), sBox = $('#nt-sizes');
    cBox.innerHTML = '';
    if (U.tool !== 'eraser') COLORS.forEach(function (c) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'nt-sw';
      b.style.background = c.k === 'ink' ? 'var(--ink)' : c.k; b.title = c.name; b.setAttribute('aria-label', c.name);
      b.setAttribute('aria-pressed', String(U.color[U.tool] === c.k));
      b.addEventListener('click', function () { U.color[U.tool] = c.k; saveUI(); syncTools(); });
      cBox.appendChild(b);
    });
    sBox.innerHTML = '';
    SIZES[U.tool].forEach(function (s, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'nt-sz';
      var px = [4, 7, 11][i]; b.innerHTML = '<i style="width:' + px + 'px;height:' + px + 'px"></i>';
      b.title = ['가늘게', '보통', '굵게'][i]; b.setAttribute('aria-label', '굵기 ' + b.title);
      b.setAttribute('aria-pressed', String(U.size[U.tool] === i));
      b.addEventListener('click', function () { U.size[U.tool] = i; saveUI(); syncTools(); });
      sBox.appendChild(b);
    });
  }
  $$('[data-nttool]').forEach(function (b) { b.addEventListener('click', function () { U.tool = b.dataset.nttool; saveUI(); syncTools(); }); });

  // ---------- 캔버스 크기와 그리기 ----------
  var K = 1, dpr = 1, paperH = 0;
  function inkBottom(p) {
    var m = 0; p.strokes.forEach(function (s) { for (var i = 1; i < s.p.length; i += 3) if (s.p[i] > m) m = s.p[i]; }); return m;
  }
  function layout() {
    if (!U.open) return;
    var p = page();
    ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px';
    var w = paper.clientWidth; if (!w) return;
    if (!p.w) p.w = w;
    K = w / p.w;
    var h = Math.max(sheet.clientHeight, titleEl.offsetHeight + ta.offsetHeight, inkBottom(p) * K + 240);
    sizeCanvas(w, Math.ceil(h));
  }
  function sizeCanvas(w, h) {
    paperH = h; paper.style.height = h + 'px';
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (h * dpr > 16000) dpr = Math.max(1, 16000 / h);
    cv.style.width = w + 'px'; cv.style.height = h + 'px';
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    render();
  }
  var inkColor = '#17202c';
  function readInk() { inkColor = getComputedStyle(root).getPropertyValue('--ink').trim() || '#17202c'; }
  function colorOf(c) { return c === 'ink' ? inkColor : c; }
  function strokePath(c, s) {
    var p = s.p, n = p.length / 3;
    c.beginPath(); c.moveTo(p[0], p[1]);
    if (n === 1) { c.lineTo(p[0] + 0.01, p[1]); return; }
    for (var i = 1; i < n - 1; i++) {
      var mx = (p[i * 3] + p[i * 3 + 3]) / 2, my = (p[i * 3 + 1] + p[i * 3 + 4]) / 2;
      c.quadraticCurveTo(p[i * 3], p[i * 3 + 1], mx, my);
    }
    c.lineTo(p[(n - 1) * 3], p[(n - 1) * 3 + 1]);
  }
  function penWidth(s, pr) { return s.s * (0.35 + 1.3 * pr); }
  function drawStroke(c, s) {
    c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = colorOf(s.c);
    if (s.t === 'hl') { c.globalAlpha = 0.35; c.lineWidth = s.s; strokePath(c, s); c.stroke(); c.globalAlpha = 1; return; }
    var p = s.p, n = p.length / 3;
    if (n < 3) { c.lineWidth = penWidth(s, p[2]); strokePath(c, s); c.stroke(); return; }
    // 필압에 따라 굵기가 바뀌도록 짧은 곡선 조각으로 나눠 그려요
    var px = p[0], py = p[1];
    for (var i = 1; i < n - 1; i++) {
      var mx = (p[i * 3] + p[i * 3 + 3]) / 2, my = (p[i * 3 + 1] + p[i * 3 + 4]) / 2;
      c.beginPath(); c.moveTo(px, py); c.quadraticCurveTo(p[i * 3], p[i * 3 + 1], mx, my);
      c.lineWidth = penWidth(s, p[i * 3 + 2]); c.stroke(); px = mx; py = my;
    }
    c.beginPath(); c.moveTo(px, py); c.lineTo(p[(n - 1) * 3], p[(n - 1) * 3 + 1]); c.lineWidth = penWidth(s, p[(n - 1) * 3 + 2]); c.stroke();
  }
  function render() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.setTransform(dpr * K, 0, 0, dpr * K, 0, 0);
    var p = page();
    p.strokes.forEach(function (s) { drawStroke(ctx, s); });
    if (cur) drawStroke(ctx, cur);
  }

  // ---------- 되돌리기 ----------
  var hist = {};
  function H() { var p = page(); return hist[p.id] || (hist[p.id] = { u: [], r: [] }); }
  function snapshot() { var h = H(); h.u.push(page().strokes.slice()); if (h.u.length > 80) h.u.shift(); h.r = []; syncUndo(); }
  function undo() { var h = H(); if (!h.u.length) return; h.r.push(page().strokes); page().strokes = h.u.pop(); touch(); layout(); syncUndo(); }
  function redo() { var h = H(); if (!h.r.length) return; h.u.push(page().strokes); page().strokes = h.r.pop(); touch(); layout(); syncUndo(); }
  function syncUndo() { var h = H(); $('#nt-undo').disabled = !h.u.length; $('#nt-redo').disabled = !h.r.length; }
  $('#nt-undo').addEventListener('click', undo);
  $('#nt-redo').addEventListener('click', redo);
  panel.addEventListener('keydown', function (e) {
    if (U.mode !== 'pen' || !(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'z') return;
    e.preventDefault(); if (e.shiftKey) redo(); else undo();
  });

  // ---------- 펜 입력 ----------
  var cur = null, drawing = null, penSeen = false, erased = false, rafT = 0;
  function pt(e) { var r = cv.getBoundingClientRect(); return [Math.round((e.clientX - r.left) / K * 10) / 10, Math.round((e.clientY - r.top) / K * 10) / 10]; }
  function pressure(e) { return e.pointerType === 'pen' ? Math.max(0.1, Math.round((e.pressure || 0.5) * 100) / 100) : 0.5; }
  function segDist(px, py, ax, ay, bx, by) {
    var dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy, t = l ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l)) : 0;
    var x = ax + t * dx - px, y = ay + t * dy - py; return Math.sqrt(x * x + y * y);
  }
  function eraseAt(x, y) {
    var p = page(), r = SIZES.eraser[U.size.eraser] / K, keep = [];
    p.strokes.forEach(function (s) {
      var hit = false, a = s.p, pad = r + (s.t === 'hl' ? s.s / 2 : s.s);
      for (var i = 0; i + 3 < a.length && !hit; i += 3) hit = segDist(x, y, a[i], a[i + 1], a[i + 3], a[i + 4]) <= pad;
      if (a.length === 3) hit = segDist(x, y, a[0], a[1], a[0], a[1]) <= pad;
      if (!hit) keep.push(s);
    });
    if (keep.length !== p.strokes.length) { if (!erased) { snapshot(); erased = true; } p.strokes = keep; render(); }
  }
  cv.addEventListener('pointerdown', function (e) {
    if (U.mode !== 'pen' || e.button !== 0) return;
    if (e.pointerType === 'pen' && !penSeen) { penSeen = true; panel.classList.add('nt-pen-seen'); }
    if (e.pointerType === 'touch' && penSeen) return; // 펜을 쓰는 중이면 손가락은 스크롤 (손바닥 무시)
    e.preventDefault(); cv.setPointerCapture(e.pointerId);
    drawing = e.pointerId; var q = pt(e);
    if (U.tool === 'eraser') { erased = false; eraseAt(q[0], q[1]); return; }
    snapshot();
    cur = { t: U.tool, c: U.color[U.tool], s: SIZES[U.tool][U.size[U.tool]], p: [q[0], q[1], pressure(e)] };
    render();
  });
  cv.addEventListener('pointermove', function (e) {
    if (drawing !== e.pointerId) return;
    var evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e]; if (!evs.length) evs = [e];
    evs.forEach(function (ev) {
      var q = pt(ev);
      if (U.tool === 'eraser') { eraseAt(q[0], q[1]); return; }
      var a = cur.p, lx = a[a.length - 3], ly = a[a.length - 2];
      if (Math.abs(q[0] - lx) + Math.abs(q[1] - ly) < 0.8) return;
      a.push(q[0], q[1], pressure(ev));
    });
    if (cur && !rafT) rafT = requestAnimationFrame(function () { rafT = 0; render(); });
    // 아래쪽 끝 가까이 쓰면 종이를 늘려요
    var y = pt(e)[1] * K; if (y > paperH - 120) sizeCanvas(paper.clientWidth, paperH + 400);
  });
  function endDraw(e) {
    if (drawing !== e.pointerId) return;
    drawing = null;
    if (U.tool === 'eraser') { if (erased) { touch(); layout(); } return; }
    if (cur) { page().strokes.push(cur); cur = null; touch(); layout(); syncUndo(); }
  }
  cv.addEventListener('pointerup', endDraw);
  cv.addEventListener('pointercancel', function (e) { if (drawing === e.pointerId && cur) { cur = null; H().u.pop(); syncUndo(); render(); } drawing = null; });

  // ---------- 지금 위치 넣기 ----------
  var VIEWN = { problems: 'SQL · 실습 문제', concepts: 'SQL · 개념 정리', cheatsheet: 'SQL · 핵심 정리', jproblems: 'JAVA · 실습 문제', java: 'JAVA · 개념 정리', jcheat: 'JAVA · 핵심 정리', dproblems: 'DB 모델링 · 실습 문제', db: 'DB 모델링 · 개념 정리', dcheat: 'DB 모델링 · 핵심 정리', tproblems: 'SQL 튜닝 · 실습 문제', tune: 'SQL 튜닝 · 개념 정리', tcheat: 'SQL 튜닝 · 핵심 정리' };
  $('#nt-where').addEventListener('click', function () {
    var v = (location.hash || '#problems').slice(1).split(/[:/?]/)[0], view = $('#view-' + v);
    var where = VIEWN[v] || '워크북', sub = '';
    if (view) {
      var h2 = $('.stage-head h2', view), on = $('.toc a.on', view);
      sub = (h2 && h2.textContent) || (on && on.textContent) || '';
    }
    var line = '[' + where + (sub ? ' · ' + sub.trim() : '') + ']';
    var a = ta.selectionStart, pre = ta.value.slice(0, a);
    var ins = (pre && !/\n$/.test(pre) ? '\n' : '') + line + '\n';
    ta.focus(); ta.setRangeText(ins, a, ta.selectionEnd, 'end'); ta.dispatchEvent(new Event('input'));
  });

  // ---------- 메뉴: 이미지·파일 저장, 불러오기, 지우기 ----------
  function closeMenu() { menu.hidden = true; moreBtn.setAttribute('aria-expanded', 'false'); resetDanger(); }
  moreBtn.addEventListener('click', function (e) { e.stopPropagation(); if (menu.hidden) { menu.hidden = false; moreBtn.setAttribute('aria-expanded', 'true'); } else closeMenu(); });
  document.addEventListener('pointerdown', function (e) { if (!menu.hidden && !menu.contains(e.target) && e.target !== moreBtn && !moreBtn.contains(e.target)) closeMenu(); });
  var delBtn = $('[data-nt="delete"]', menu), delArmed = false;
  function resetDanger() { delArmed = false; delBtn.textContent = '이 페이지 삭제'; }
  function stamp() { var d = new Date(); return d.getFullYear() + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2); }
  function offer(name, data, okMsg) {
    var dp = window.WB && WB.downloads ? WB.downloads() : null;
    (dp || Promise.resolve(null)).then(function (dl) {
      if (dl) return dl.save({ filename: name, data: data }).then(function () { status(okMsg); }, function (e) {
        if (e && e.code === 'declined') status('저장을 취소했어요.'); else if (!fallback()) status('이 화면에서는 파일을 저장할 수 없어요.', true);
      });
      if (!fallback()) status('이 화면에서는 파일을 저장할 수 없어요.', true);
    });
    function fallback() {
      try {
        var url = URL.createObjectURL(data instanceof Blob ? data : new Blob([data], { type: 'application/json' })), a = document.createElement('a');
        a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 4000); status(okMsg); return true;
      } catch (e) { return false; }
    }
  }
  function wrapLines(c, text, width) {
    var out = [];
    String(text).split('\n').forEach(function (para) {
      if (!para) { out.push(''); return; }
      var line = '', lastSp = -1;
      for (var i = 0; i < para.length; i++) {
        var ch = para[i], test = line + ch;
        if (c.measureText(test).width > width && line) {
          if (ch !== ' ' && lastSp > 0 && /[A-Za-z0-9]/.test(ch)) { out.push(line.slice(0, lastSp)); line = line.slice(lastSp + 1) + ch; }
          else { out.push(line); line = ch === ' ' ? '' : ch; }
          lastSp = line.lastIndexOf(' ');
        } else { line = test; if (ch === ' ') lastSp = line.length - 1; }
      }
      out.push(line);
    });
    return out;
  }
  function exportPng() {
    var w = paper.clientWidth, h = paperH, s = 2, c = document.createElement('canvas'), x = c.getContext('2d');
    c.width = w * s; c.height = h * s; x.scale(s, s);
    var cs = getComputedStyle(root), bg = cs.getPropertyValue('--surface').trim() || '#fff', line = cs.getPropertyValue('--line-2').trim() || '#e7eaf0';
    var body = getComputedStyle(ta), font = body.fontFamily;
    x.fillStyle = bg; x.fillRect(0, 0, w, h);
    var top = titleEl.offsetHeight;
    x.fillStyle = inkColor; x.font = '700 17px ' + font; x.textBaseline = 'alphabetic';
    x.fillText(titleEl.value || label(page(), D.pages.indexOf(page())), 18, 32);
    x.fillStyle = line; x.fillRect(0, top - 1, w, 1);
    for (var y = top + 6 + 27; y < h; y += 28) x.fillRect(0, y, w, 1);
    x.fillStyle = inkColor; x.font = '15px ' + font;
    wrapLines(x, ta.value, w - 36).forEach(function (l, i) { x.fillText(l, 18, top + 6 + i * 28 + 19); });
    x.setTransform(s * K, 0, 0, s * K, 0, 0);
    page().strokes.forEach(function (st) { drawStroke(x, st); });
    c.toBlob(function (blob) {
      if (!blob) { status('이미지를 만들지 못했어요.', true); return; }
      offer('note-' + stamp() + '-' + (D.pages.indexOf(page()) + 1) + '.png', blob, '이미지로 저장했어요.');
    }, 'image/png');
  }
  menu.addEventListener('click', function (e) {
    var b = e.target.closest('[data-nt]'); if (!b) return;
    var act = b.dataset.nt;
    if (act === 'png') { closeMenu(); exportPng(); }
    else if (act === 'export') { closeMenu(); offer('my-notes-' + stamp() + '.json', JSON.stringify({ app: 'workbook-notes', v: 1, saved: new Date().toISOString(), pages: D.pages }), '모든 필기를 파일로 저장했어요. 다른 기기에서 ‘필기 파일 불러오기’로 열면 돼요.'); }
    else if (act === 'import') { closeMenu(); $('#nt-file').click(); }
    else if (act === 'clearink') {
      closeMenu();
      if (!page().strokes.length) { status('지울 펜 필기가 없어요.'); return; }
      snapshot(); page().strokes = []; touch(); layout(); status('펜 필기를 지웠어요. 펜 모드의 되돌리기로 되살릴 수 있어요.');
    }
    else if (act === 'delete') {
      if (!delArmed) { delArmed = true; b.textContent = '정말 삭제할까요? 한 번 더 누르세요'; return; }
      var i = D.pages.indexOf(page()); D.pages.splice(i, 1);
      if (!D.pages.length) D.pages.push(newPage());
      D.cur = D.pages[Math.max(0, i - 1)].id; save(true); closeMenu(); showPage(); status('페이지를 삭제했어요.');
    }
  });
  $('#nt-file').addEventListener('change', function () {
    var f = this.files && this.files[0]; this.value = ''; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      var o; try { o = JSON.parse(r.result); } catch (e) { o = null; }
      if (!o || o.app !== 'workbook-notes' || !Array.isArray(o.pages)) { status('필기 파일이 아니에요. ‘모든 필기 파일로 저장’으로 만든 파일을 골라 주세요.', true); return; }
      var n = 0;
      o.pages.forEach(function (p) {
        if (!p || typeof p.id !== 'string') return;
        var q = { id: p.id, title: String(p.title || ''), text: String(p.text || ''), strokes: Array.isArray(p.strokes) ? p.strokes.filter(function (s) { return s && Array.isArray(s.p) && s.p.length >= 3; }) : [], w: +p.w || 0, upd: +p.upd || Date.now() };
        var i = -1; D.pages.forEach(function (x, j) { if (x.id === q.id) i = j; });
        if (i >= 0) D.pages[i] = q; else D.pages.push(q);
        n++;
      });
      // 비어 있는 기본 페이지는 정리
      D.pages = D.pages.filter(function (p) { return p.title || p.text || p.strokes.length; });
      if (!D.pages.length) D.pages.push(newPage());
      if (o.pages[0] && D.pages.some(function (p) { return p.id === o.pages[0].id; })) D.cur = o.pages[0].id;
      hist = {}; save(true); showPage(); syncUndo(); status(n + '개 페이지를 불러왔어요.');
    };
    r.readAsText(f);
  });

  // ---------- 화면 변화 ----------
  window.addEventListener('resize', function () { if (U.open) place(); });
  // 과목이 바뀌면(SQL↔Java) 보이는 버튼이 달라지니 그 옆으로 옮겨요
  new MutationObserver(function () { readInk(); render(); if (U.open) place(); }).observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  if (window.matchMedia) { var mq = window.matchMedia('(prefers-color-scheme: dark)'); (mq.addEventListener ? mq.addEventListener('change', function () { readInk(); render(); }) : null); }
  window.addEventListener('beforeunload', function () { if (saveT) save(true); });

  readInk(); showPage(); setMode(U.mode === 'pen' ? 'pen' : 'text'); syncUndo();
  // 버튼 위치는 WB.boot()에서 정해지니, 그 뒤에 지난번 열림 상태를 되살려요
  root.classList.remove('nt-open'); panel.setAttribute('inert', '');
  if (U.open) setTimeout(function () { setOpen(true, true); }, 0);
})();
