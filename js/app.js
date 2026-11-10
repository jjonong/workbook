/* 공통 화면(라우팅, 테마, 기록) + SQL 실습 문제·SQL 연습장 */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // ---------- storage (per-viewer convenience) ----------
  var KEY = 'sqlwb:v3', TOTAL = W.total;
  var S = { ans: {}, st: {}, stage: 0, level: 0, wrong: {}, wf: 'open', ws: 'recent' };
  try {
    var raw = localStorage.getItem(KEY), v2 = raw ? null : localStorage.getItem('sqlwb:v2');
    if (raw) { var p = JSON.parse(raw); S.ans = p.ans || {}; S.st = p.st || {}; S.stage = p.stage || 0; S.level = p.level || 0; S.wrong = p.wrong || {}; S.wf = p.wf || 'open'; S.ws = p.ws || 'recent'; }
    else if (v2) {
      // carry answers over from the previous numbering (before more problems were added to each chapter)
      var q = JSON.parse(v2); S.level = q.level || 0; S.stage = q.stage || 0;
      Object.keys(q.ans || {}).forEach(function (k) { if (W.v2Map[k]) S.ans[W.v2Map[k]] = q.ans[k]; });
      Object.keys(q.st || {}).forEach(function (k) { if (W.v2Map[k]) S.st[W.v2Map[k]] = q.st[k]; });
      localStorage.setItem(KEY, JSON.stringify(S));
    }
    else {
      // carry answers over from the earlier numbering (1~111) to the new chapter-based numbering
      var old = localStorage.getItem('sqlwb:v1');
      if (old) { var o = JSON.parse(old);
        Object.keys(o.ans || {}).forEach(function (k) { if (W.oldMap[k]) S.ans[W.oldMap[k]] = o.ans[k]; });
        Object.keys(o.st || {}).forEach(function (k) { if (W.oldMap[k]) S.st[W.oldMap[k]] = o.st[k]; });
        localStorage.setItem(KEY, JSON.stringify(S)); }
    }
  } catch (e) {}
  var saveT = null;
  // 오답노트를 만들기 전에 틀린 문제도 오답노트에 넣어 둬요
  Object.keys(S.st).forEach(function (k) { if (S.st[k] === 'bad' && !S.wrong[k]) S.wrong[k] = { c: 1, t: null }; });
  function save() { clearTimeout(saveT); saveT = setTimeout(function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }, 250); }

  var ANS = {}; W.answers.forEach(function (a) { ANS[a.n] = a; });
  var STAGES = W.stages;
  STAGES.forEach(function (c) { c.items = []; c.subs.forEach(function (sb) { c.items = c.items.concat(sb.items); }); });
  var LV_NAME = { 1: '초급', 2: '중급', 3: '고급' }, LV_OF = {}, LV_COUNT = { 1: 0, 2: 0, 3: 0 };
  STAGES.forEach(function (c) { c.items.forEach(function (it) { LV_OF[it.n] = it.lv; LV_COUNT[it.lv]++; }); });
  function lvOk(lv) { return !S.level || S.level === lv; }
  var STAGE_OF = {};
  STAGES.forEach(function (s, i) { s.items.forEach(function (it) { STAGE_OF[it.n] = i; }); });

  // ---------- engine ----------
  var engine = null, engineErr = null, waiters = [];
  function setPill(state, text) { var p = $('#engine-pill'); p.dataset.ready = state; $('#engine-text').textContent = text; }
  function bootEngine() {
    var sc = document.createElement('script');
    sc.src = 'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-asm.js';
    sc.onload = function () {
      window.initSqlJs().then(function (SQL) {
        engine = OraLite.create(SQL, W.data);
        setPill('1', '실행기 준비됨');
        waiters.splice(0).forEach(function (f) { f(); });
      }).catch(function (e) { engineErr = e; setPill('err', '실행기를 불러오지 못했어요'); });
    };
    sc.onerror = function () { engineErr = new Error('load'); setPill('err', '실행기를 불러오지 못했어요'); };
    document.head.appendChild(sc);
  }
  function withEngine(fn, out) {
    if (engine) return fn();
    if (engineErr) { out.innerHTML = '<div class="verdict bad"><b>실행 불가</b><span>SQL 실행기를 불러오지 못했어요. 인터넷 연결을 확인하고 새로고침해 보세요. 정답·해설은 그대로 볼 수 있어요.</span></div>'; return; }
    out.innerHTML = '<div class="verdict info"><b>잠시만요</b><span>실행기를 불러오는 중이에요. 준비되면 바로 실행할게요.</span></div>';
    waiters.push(fn);
  }

  // ---------- free SQL scratchpad (draggable button) ----------
  function initScratch() {
    var fab = $('#fab'), box = $('#scratch'), ta = $('#scratch-sql'), out = $('#scratch-out');
    var FKEY = 'sqlwb:fab2', DKEY = 'sqlwb:scratch', SZ = 56, M = 12;
    var pos = null;
    try { pos = JSON.parse(localStorage.getItem(FKEY) || 'null'); } catch (e) {}
    try { ta.value = localStorage.getItem(DKEY) || ''; } catch (e) {}
    function vw() { return document.documentElement.clientWidth; }
    function vh() { return window.innerHeight; }
    function topMin() { var t = $('.top'); return t ? Math.max(M, t.getBoundingClientRect().bottom + 8) : M; }
    function place() {
      var x, y;
      if (pos && typeof pos.rx === 'number') { x = pos.rx * (vw() - SZ); y = pos.ry * (vh() - SZ); }
      else { x = vw() - SZ - 20; y = topMin() + 4; }
      x = Math.max(M, Math.min(vw() - SZ - M, x)); y = Math.max(topMin(), Math.min(vh() - SZ - M, y));
      fab.style.left = x + 'px'; fab.style.top = y + 'px';
      if (!box.hidden) placeBox();
    }
    function placeBox() {
      var r = fab.getBoundingClientRect(), W2 = vw(), H2 = vh(), w = Math.min(460, W2 - 2 * M);
      var above = r.top - topMin() - 10, below = H2 - r.bottom - M - 10;
      var up = above >= below, room = up ? above : below, h = Math.max(240, Math.min(600, room));
      var left = (r.left + SZ / 2 > W2 / 2) ? r.right - w : r.left;
      left = Math.max(M, Math.min(W2 - w - M, left));
      var top = up ? r.top - 10 - h : r.bottom + 10;
      top = Math.max(topMin(), Math.min(H2 - h - M, top));
      box.style.left = left + 'px'; box.style.top = top + 'px'; box.style.width = w + 'px'; box.style.height = h + 'px';
    }
    function setOpen(open) {
      box.hidden = !open; fab.setAttribute('aria-expanded', String(open));
      fab.title = open ? 'SQL 연습장 닫기 (끌어서 옮길 수 있어요)' : 'SQL 연습장 열기 (끌어서 옮길 수 있어요)';
      if (open) { placeBox(); setTimeout(function () { ta.focus(); }, 0); }
    }
    // drag vs click
    var drag = null;
    fab.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      var r = fab.getBoundingClientRect();
      drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: e.clientX - r.left, oy: e.clientY - r.top, moved: false };
      fab.setPointerCapture(e.pointerId);
    });
    fab.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.moved && Math.abs(e.clientX - drag.sx) + Math.abs(e.clientY - drag.sy) < 6) return;
      drag.moved = true; fab.classList.add('dragging');
      var x = Math.max(M, Math.min(vw() - SZ - M, e.clientX - drag.ox)), y = Math.max(topMin(), Math.min(vh() - SZ - M, e.clientY - drag.oy));
      fab.style.left = x + 'px'; fab.style.top = y + 'px';
      if (!box.hidden) placeBox();
    });
    function endDrag(e, cancel) {
      if (!drag || e.pointerId !== drag.id) return;
      var moved = drag.moved; drag = null; fab.classList.remove('dragging');
      if (moved) {
        var r = fab.getBoundingClientRect();
        pos = { rx: (r.left) / Math.max(1, vw() - SZ), ry: (r.top) / Math.max(1, vh() - SZ) };
        try { localStorage.setItem(FKEY, JSON.stringify(pos)); } catch (er) {}
      } else if (!cancel) setOpen(box.hidden);
    }
    fab.addEventListener('pointerup', function (e) { endDrag(e, false); });
    fab.addEventListener('pointercancel', function (e) { endDrag(e, true); });
    fab.addEventListener('click', function (e) { if (e.detail === 0) setOpen(box.hidden); }); // keyboard (Enter/Space)
    fab.addEventListener('keydown', function (e) {
      var k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key]; if (!k || !e.altKey) return;
      e.preventDefault(); var r = fab.getBoundingClientRect();
      pos = { rx: Math.max(0, Math.min(1, (r.left + k[0] * 40) / (vw() - SZ))), ry: Math.max(0, Math.min(1, (r.top + k[1] * 40) / (vh() - SZ))) };
      try { localStorage.setItem(FKEY, JSON.stringify(pos)); } catch (er) {} place();
    });
    $('#scratch-close').addEventListener('click', function () { setOpen(false); fab.focus(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden && box.contains(document.activeElement)) { setOpen(false); fab.focus(); } });
    window.addEventListener('resize', place);
    var dT = null;
    ta.addEventListener('input', function () { clearTimeout(dT); dT = setTimeout(function () { try { localStorage.setItem(DKEY, ta.value); } catch (e) {} }, 300); });
    ta.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); $('#scratch-run').click(); }
      if (e.key === 'Tab' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault(); var a = ta.selectionStart, b = ta.selectionEnd;
        ta.value = ta.value.slice(0, a) + '  ' + ta.value.slice(b); ta.selectionStart = ta.selectionEnd = a + 2;
      }
    });
    $('#scratch-run').addEventListener('click', function () {
      var text = ta.value.trim();
      if (!text) { out.innerHTML = '<div class="msg">실행할 SQL을 먼저 써 주세요.</div>'; return; }
      withEngine(function () { out.innerHTML = runOutput(engine.run(text)); out.scrollTop = 0; }, out);
    });
    $('#scratch-clear').addEventListener('click', function () { ta.value = ''; out.innerHTML = ''; try { localStorage.removeItem(DKEY); } catch (e) {} ta.focus(); });
    $('#scratch-reset').addEventListener('click', function () {
      withEngine(function () { engine.reset(); out.innerHTML = '<div class="msg">실습 데이터를 처음 상태로 되돌렸어요. 직접 만든 테이블과 바꾼 데이터가 모두 사라졌어요.</div>'; }, out);
    });
    place();
  }
  // ---------- light / dark toggle (follows the system until the viewer picks one) ----------
  function initTheme() {
    var root = document.documentElement, btn = $('#theme-btn'), mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    function isDark() { var t = root.getAttribute('data-theme'); return t ? t === 'dark' : !!(mq && mq.matches); }
    function sync() {
      var d = isDark(); document.body.classList.toggle('is-dark', d);
      var label = d ? '라이트 모드로 바꾸기' : '다크 모드로 바꾸기'; btn.setAttribute('aria-label', label); btn.title = label;
    }
    btn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark'; root.setAttribute('data-theme', next);
      try { localStorage.setItem('sqlwb:theme', next); } catch (e) {}
      sync();
    });
    if (mq) { var on = function () { if (!root.getAttribute('data-theme')) sync(); }; if (mq.addEventListener) mq.addEventListener('change', on); else if (mq.addListener) mq.addListener(on); }
    sync();
  }

  // ---------- rendering helpers ----------
  var KW = 'SELECT FROM WHERE AND OR NOT IN IS NULL AS ON JOIN LEFT RIGHT OUTER INNER FULL CROSS GROUP BY ORDER HAVING DISTINCT ALL ANY SOME EXISTS BETWEEN LIKE ESCAPE UNION INTERSECT MINUS EXCEPT CASE WHEN THEN ELSE END INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE VIEW INDEX SEQUENCE SYNONYM PUBLIC ALTER ADD MODIFY DROP RENAME TO TRUNCATE COMMENT COLUMN CONSTRAINT PRIMARY KEY FOREIGN REFERENCES UNIQUE CHECK DEFAULT CASCADE CONSTRAINTS COMMIT ROLLBACK SAVEPOINT GRANT REVOKE ROLE WITH OPTION ADMIN READ ONLY REPLACE ASC DESC OVER PARTITION PIVOT FOR ROLLUP CUBE START INCREMENT MAXVALUE MINVALUE NOCYCLE CYCLE NOCACHE CACHE TRIGGER BEFORE AFTER EACH ROW BEGIN DISABLE ENABLE NUMBER VARCHAR2 CHAR DATE IDENTIFIED USER NULLS FIRST LAST ROWNUM ROWID LEVEL DESCRIBE'.split(' ');
  var KWS = {}; KW.forEach(function (k) { KWS[k] = 1; });
  function hl(code) {
    var re = /(--[^\n]*)|('(?:''|[^'])*')|("[^"]*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w$#]*)(\s*\()?|([\s\S])/g, m, out = '';
    while ((m = re.exec(code))) {
      if (m[1]) out += '<span class="hl-com">' + esc(m[1]) + '</span>';
      else if (m[2]) out += '<span class="hl-str">' + esc(m[2]) + '</span>';
      else if (m[3]) out += esc(m[3]);
      else if (m[4]) out += '<span class="hl-num">' + m[4] + '</span>';
      else if (m[5]) {
        var up = m[5].toUpperCase();
        if (m[6] && !KWS[up]) out += '<span class="hl-fn">' + esc(m[5]) + '</span>' + esc(m[6]);
        else if (KWS[up]) out += '<span class="hl-kw">' + esc(m[5]) + '</span>' + (m[6] ? esc(m[6]) : '');
        else out += esc(m[5]) + (m[6] ? esc(m[6]) : '');
      } else out += esc(m[7]);
    }
    return out;
  }
  function codeBlock(sql) {
    return '<div class="code-wrap"><pre class="code"><code>' + hl(sql) + '</code></pre><button class="btn small ghost copy" type="button" data-copy>복사</button></div>';
  }
  function resultTable(r) {
    var cols = r.columns, rows = r.display || r.rows.map(function (x) { return x.map(OraLite.displayValue); });
    var raw = r.rows;
    var MAX = 200;
    var h = '<div class="res-label"><b>' + rows.length + '행</b>' + (rows.length > MAX ? '<span>앞의 ' + MAX + '행만 보여요</span>' : '') + '</div>';
    if (!cols.length) return h;
    h += '<div class="tw res-scroll"><table class="res"><thead><tr>' + cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>';
    rows.slice(0, MAX).forEach(function (row, i) {
      h += '<tr>' + row.map(function (v, j) {
        if (v == null) return '<td class="null">(null)</td>';
        var isNum = typeof raw[i][j] === 'number' && !/^\d{4}-\d{2}-\d{2}/.test(v);
        return '<td' + (isNum ? ' class="n"' : '') + '>' + esc(v) + '</td>';
      }).join('') + '</tr>';
    });
    if (!rows.length) h += '<tr><td class="null" colspan="' + cols.length + '">선택된 행이 없어요</td></tr>';
    return h + '</tbody></table></div>';
  }
  function runOutput(results) {
    var h = '';
    results.forEach(function (x, i) {
      var last = i === results.length - 1;
      if (!x.ok) { h += '<div class="msg err">' + (results.length > 1 ? '<span class="stmt">' + esc(x.sql.split('\n')[0].slice(0, 60)) + '</span>\n' : '') + esc(x.error) + '</div>'; return; }
      if (x.result.kind === 'msg') h += '<div class="msg">' + (results.length > 1 ? '<span class="stmt">' + esc(x.sql.split('\n')[0].slice(0, 60)) + ' → </span>' : '') + esc(x.result.text) + '</div>';
      else if (last || results.length === 1) h += resultTable(x.result);
      else h += '<div class="msg"><span class="stmt">' + esc(x.sql.split('\n')[0].slice(0, 60)) + ' → </span>' + x.result.rows.length + '행 조회</div>';
    });
    return h;
  }

  // ---------- status ----------
  function statusOf(n) { var s = S.st[n]; if (s) return s; return (S.ans[n] || '').trim() ? 'draft' : ''; }
  var ST_LABEL = { ok: '정답', bad: '다시 풀기', seen: '답 확인함', draft: '작성 중', '': '' };
  function refreshStats() {
    wrongBadge();
    var ok = 0, done = 0;
    for (var n = 1; n <= TOTAL; n++) { var s = statusOf(n); if (s === 'ok') ok++; if (s === 'ok' || s === 'bad' || s === 'seen') done++; }
    $('#st-ok').textContent = ok; $('#st-done').textContent = done;
    $$('#dots .dot').forEach(function (d) { var n = +d.dataset.n; d.dataset.st = statusOf(n); d.classList.toggle('dim', !lvOk(LV_OF[n])); d.title = n + '번 · ' + LV_NAME[LV_OF[n]] + (ST_LABEL[d.dataset.st] ? ' · ' + ST_LABEL[d.dataset.st] : ''); });
    $$('#dots .dgrp').forEach(function (g) {
      var items = STAGES[+g.dataset.stage].items.filter(function (it) { return lvOk(it.lv); }), c = { ok: 0, bad: 0, seen: 0 };
      items.forEach(function (it) { var x = statusOf(it.n); if (c[x] !== undefined) c[x]++; });
      var t = items.length || 1;
      g.querySelector('.dg-c').textContent = items.length ? c.ok + '/' + items.length : '-';
      g.querySelector('.dg-bar').innerHTML = ['ok', 'bad', 'seen'].map(function (k) { return c[k] ? '<i class="b-' + k + '" style="width:' + (c[k] * 100 / t) + '%"></i>' : ''; }).join('');
      g.title = '맞힘 ' + c.ok + ' · 다시 풀기 ' + c.bad + ' · 답 확인 ' + c.seen + ' / ' + items.length + '문제';
    });
    $$('#stages button').forEach(function (b) {
      var items = STAGES[+b.dataset.stage].items.filter(function (it) { return lvOk(it.lv); }), c = items.filter(function (it) { return statusOf(it.n) === 'ok'; }).length;
      b.querySelector('.sc').textContent = items.length ? c + '/' + items.length : '-';
    });
  }
  function setStatus(n, st) {
    var prev = S.st[n];
    if (st) S.st[n] = st; else delete S.st[n];
    if (st === 'bad') { var w = S.wrong[n] || (S.wrong[n] = { c: 0 }); w.c++; w.t = new Date().toISOString(); delete w.ok; }
    if (st === 'ok' && S.wrong[n] && prev !== 'ok') S.wrong[n].ok = new Date().toISOString();
    save();
    showRec(n, st === 'bad');
    wrongMarks(n);
    var card = $('#p-' + n);
    if (card) { var el = card.querySelector('.status'); var s = statusOf(n); el.dataset.st = s; el.textContent = ST_LABEL[s]; }
    refreshStats();
  }

  // ---------- move records between devices (file or code; nothing leaves the browser otherwise) ----------
  function whenStr(iso) { var d = new Date(iso); if (isNaN(d)) return ''; var z = function (n) { return (n < 10 ? '0' : '') + n; }; return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate()) + ' ' + z(d.getHours()) + ':' + z(d.getMinutes()); }
  function syncMsg(t) { $('#sync-msg').textContent = t; }
  function packRecord() { return { app: 'sql-workbook', v: 3, savedAt: new Date().toISOString(), total: TOTAL, ans: S.ans, st: S.st, wrong: S.wrong, stage: S.stage, level: S.level }; }
  function countOf(o) { return Object.keys(o.st || {}).length + ' 문제 기록, 답 ' + Object.keys(o.ans || {}).filter(function (k) { return (o.ans[k] || '').trim(); }).length + '개'; }
  function b64(bytes) { var s = ''; for (var i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function unb64(t) { t = t.replace(/-/g, '+').replace(/_/g, '/'); while (t.length % 4) t += '='; var s = atob(t), u = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
  function pipe(bytes, stream) { return new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer().then(function (b) { return new Uint8Array(b); }); }
  function makeCode() {
    var raw = new TextEncoder().encode(JSON.stringify(packRecord()));
    if (window.CompressionStream) return pipe(raw, new CompressionStream('deflate-raw')).then(function (z) { return 'SQLWB1z.' + b64(z); }).catch(function () { return 'SQLWB1.' + b64(raw); });
    return Promise.resolve('SQLWB1.' + b64(raw));
  }
  function readCode(text) {
    text = (text || '').trim();
    if (text.charAt(0) === '{') return Promise.resolve(JSON.parse(text));
    var m = /^SQLWB1(z?)\.([A-Za-z0-9_-]+)$/.exec(text.replace(/\s+/g, ''));
    if (!m) return Promise.reject(new Error('form'));
    var bytes = unb64(m[2]);
    var p = m[1] ? (window.DecompressionStream ? pipe(bytes, new DecompressionStream('deflate-raw')) : Promise.reject(new Error('old'))) : Promise.resolve(bytes);
    return p.then(function (u) { return JSON.parse(new TextDecoder().decode(u)); });
  }
  function applyRecord(o) {
    if (!o || o.app !== 'sql-workbook' || typeof o.st !== 'object') throw new Error('form');
    var ans = o.ans || {}, st = o.st || {};
    if (o.v === 2 || !o.v) { var a2 = {}, s2 = {}; Object.keys(ans).forEach(function (k) { if (W.v2Map[k]) a2[W.v2Map[k]] = ans[k]; }); Object.keys(st).forEach(function (k) { if (W.v2Map[k]) s2[W.v2Map[k]] = st[k]; }); ans = a2; st = s2; }
    S.ans = ans; S.st = st; S.stage = Math.min(STAGES.length - 1, o.stage || 0); S.level = o.level || 0;
    S.wrong = (o.v === 3 && o.wrong && typeof o.wrong === 'object') ? o.wrong : {};
    Object.keys(S.st).forEach(function (k) { if (S.st[k] === 'bad' && !S.wrong[k]) S.wrong[k] = { c: 1, t: null }; });
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
    showStage(S.stage); refreshStats(); if (location.hash === '#wrong') renderWrong();
    syncMsg('불러왔어요. ' + countOf(S) + (o.savedAt ? ' (' + whenStr(o.savedAt) + ' 저장)' : '') + '.');
  }
  function confirmApply(o) {
    var mine = Object.keys(S.st).length + Object.keys(S.ans).length;
    if (!mine) return applyRecord(o);
    showBox('', '불러오면 이 기기의 지금 기록(' + countOf(S) + ')이 불러온 기록(' + countOf(o) + ')으로 바뀌어요.', [['바꾸기', function () { applyRecord(o); hideBox(); }], ['취소', hideBox]], true);
  }
  function showBox(text, msg, acts, noText) {
    $('#sync-box').hidden = false; $('#sync-text').hidden = !!noText; if (!noText) $('#sync-text').value = text;
    syncMsg(msg || '');
    var row = $('#sync-box-act'); row.innerHTML = '';
    acts.forEach(function (a, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'btn small' + (i ? ' ghost' : ''); b.textContent = a[0]; b.addEventListener('click', a[1]); row.appendChild(b); });
  }
  function hideBox() { $('#sync-box').hidden = true; }
  function fileName() { var d = new Date(), z = function (n) { return (n < 10 ? '0' : '') + n; }; return 'sql-workbook-record-' + d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + '-' + z(d.getHours()) + z(d.getMinutes()) + '.json'; }
  function plainDownload(name, text) {
    try { var url = URL.createObjectURL(new Blob([text], { type: 'application/json' })), a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 4000); return true; } catch (e) { return false; }
  }
  var downloadsP = null;
  function initSync() {
    if (window.claude && typeof window.claude.use === 'function') downloadsP = window.claude.use('downloads').catch(function () { return null; });
    $('#sync-save').addEventListener('click', function () {
      var text = JSON.stringify(packRecord(), null, 1), name = fileName();
      hideBox();
      (downloadsP || Promise.resolve(null)).then(function (dl) {
        if (dl) return dl.save({ filename: name, data: text }).then(function () { syncMsg('파일로 저장했어요. 다른 기기에서 "파일 불러오기"로 열면 돼요.'); }, function (e) {
          if (e && e.code === 'declined') syncMsg('저장을 취소했어요.');
          else showBox(text, '이 화면에서는 파일 저장이 안 돼요. 대신 아래 "코드 만들기"를 써 주세요.', [['닫기', hideBox]], true);
        });
        if (plainDownload(name, text)) syncMsg('파일로 저장했어요. 다운로드 폴더를 확인하고, 다른 기기에서 "파일 불러오기"로 열면 돼요.');
        else syncMsg('이 화면에서는 파일 저장이 안 돼요. "코드 만들기"를 써 주세요.');
      });
    });
    $('#to-sync').addEventListener('click', function () { var p = $('#panel-sync'); p.classList.add('open'); p.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); });
    $('#sync-load').addEventListener('click', function () { $('#sync-file').value = ''; $('#sync-file').click(); });
    $('#sync-file').addEventListener('change', function () {
      var f = this.files && this.files[0]; if (!f) return;
      f.text().then(readCode).then(confirmApply).catch(function () { syncMsg('이 파일은 워크북 기록이 아니에요. "파일로 저장"으로 만든 파일을 골라 주세요.'); });
    });
    $('#sync-code').addEventListener('click', function () {
      makeCode().then(function (code) {
        var copy = function () {
          var ta = $('#sync-text'); ta.focus(); ta.select();
          var ok = function () { syncMsg('복사했어요. 메신저나 메모로 다른 기기에 보낸 뒤, 거기서 "코드 붙여넣기"에 붙여 넣으세요.'); };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code).then(ok, function () { try { document.execCommand('copy') ? ok() : syncMsg('위 코드를 길게 눌러(또는 Ctrl+C) 직접 복사해 주세요.'); } catch (e) { syncMsg('위 코드를 직접 복사해 주세요.'); } });
          else { try { document.execCommand('copy') ? ok() : syncMsg('위 코드를 직접 복사해 주세요.'); } catch (e) { syncMsg('위 코드를 직접 복사해 주세요.'); } }
        };
        showBox(code, '내 기록(' + countOf(S) + ')을 담은 코드예요. 복사해서 다른 기기로 보내세요.', [['복사하기', copy], ['닫기', hideBox]]);
        $('#sync-text').readOnly = true;
      });
    });
    $('#sync-paste').addEventListener('click', function () {
      showBox('', '다른 기기에서 만든 코드를 아래에 붙여 넣고 "불러오기"를 누르세요.', [['불러오기', function () {
        readCode($('#sync-text').value).then(confirmApply).catch(function () { syncMsg('코드를 읽지 못했어요. "SQLWB1"로 시작하는 코드 전체를 빠짐없이 붙여 넣었는지 확인해 주세요.'); });
      }], ['닫기', hideBox]]);
      $('#sync-text').readOnly = false; $('#sync-text').focus();
    });
  }

  // ---------- rail ----------
  function buildRail() {
    var dots = '';
    $('#st-total').textContent = '푼 문제 / ' + TOTAL;
    STAGES.forEach(function (s, i) {
      dots += '<details class="dgrp" data-stage="' + i + '"><summary><span class="dg-n">' + s.label + '</span><span class="dg-t">' + esc(s.short) + '</span><span class="dg-c"></span><i class="dg-bar"></i></summary><div class="dots">' +
        s.subs.map(function (sb) { return '<span class="dsub">' + esc(sb.title) + '</span>' + sb.items.map(function (it) { return '<button type="button" class="dot" data-n="' + it.n + '" aria-label="' + it.n + '번 문제로 가기">' + it.n + '</button>'; }).join(''); }).join('') + '</div></details>';
    });
    $('#dots').innerHTML = dots;
    $('#dg-open').addEventListener('click', function () { $$('#dots .dgrp').forEach(function (d) { d.open = true; }); });
    $('#dg-close').addEventListener('click', function () { $$('#dots .dgrp').forEach(function (d) { d.open = false; }); });
    $('#stages').innerHTML = STAGES.map(function (s, i) {
      var sep = (s.kind !== 'chapter' && (i === 0 || STAGES[i - 1].kind === 'chapter')) ? '<li class="sep">더 풀어 보기</li>' : '';
      return sep + '<li><button type="button" data-stage="' + i + '"><span class="sn">' + s.label + '</span><span>' + esc(s.short) + '</span><span class="sc"></span></button></li>';
    }).join('');
    var sch = '';
    ['S_EMP', 'S_DEPT', 'S_REGION', 'S_CUSTOMER', 'SALGRADE'].forEach(function (t) {
      var tb = W.data[t];
      sch += '<details><summary>' + t + ' <span>' + tb.rows.length + '행 · ' + W.tableKo[t] + '</span></summary><ul>' +
        tb.cols.map(function (c) { return '<li><b>' + c.n + '</b> ' + c.t + (c.nn ? ' NOT NULL' : '') + '</li>'; }).join('') + '</ul></details>';
    });
    $('#schema').innerHTML = sch;
    $('#dots').addEventListener('click', function (e) { var b = e.target.closest('.dot'); if (b) gotoProblem(+b.dataset.n); });
    $('#stages').addEventListener('click', function (e) { var b = e.target.closest('[data-stage]'); if (b) { showStage(+b.dataset.stage); window.scrollTo({ top: 0 }); } });
    $$('.rail .collapsible h3').forEach(function (h) { h.addEventListener('click', function () { h.parentNode.classList.toggle('open'); }); });
    if (window.matchMedia('(max-width: 960px)').matches) { $('#panel-progress').classList.remove('open'); $('#panel-stages').classList.remove('open'); $('#panel-schema').classList.remove('open'); $('#panel-db').classList.remove('open'); }
    else { $('#panel-schema').classList.add('open'); $('#panel-db').classList.add('open'); }
    $('#reset-db').addEventListener('click', function () {
      if (engine) { engine.reset(); $('#reset-msg').textContent = '처음 상태로 되돌렸어요. 직접 만든 테이블과 바꾼 데이터가 모두 사라졌어요.'; }
    });
    $('#clear-progress').addEventListener('click', function () { $('#clear-confirm').hidden = false; });
    initSync();
    $('#clear-no').addEventListener('click', function () { $('#clear-confirm').hidden = true; });
    $('#clear-yes').addEventListener('click', function () { S.ans = {}; S.st = {}; S.wrong = {}; save(); $('#clear-confirm').hidden = true; showStage(S.stage); refreshStats(); });
  }

  // ---------- stage view ----------
  function showStage(i) {
    i = Math.max(0, Math.min(STAGES.length - 1, i)); S.stage = i; save();
    var s = STAGES[i];
    var h = '<div class="lvbar" role="group" aria-label="난이도"><span class="lvbar-l">난이도</span>' + [0, 1, 2, 3].map(function (l) {
      return '<button type="button" class="lvbtn" data-level="' + l + '" aria-pressed="' + (S.level === l) + '">' + (l ? '<i class="lvdot lv' + l + '"></i>' : '') + (l ? LV_NAME[l] : '전체') + ' <span>' + (l ? LV_COUNT[l] : TOTAL) + '</span></button>';
    }).join('') + '</div>';
    h += '<label class="stage-pick" for="stage-select">장 고르기<select id="stage-select">' + STAGES.map(function (x, k) { return '<option value="' + k + '"' + (k === i ? ' selected' : '') + '>' + x.label + ' ' + esc(x.short) + ' (' + x.items[0].n + '~' + x.items[x.items.length - 1].n + '번)</option>'; }).join('') + '</select></label>';
    var shown = s.items.filter(function (it) { return lvOk(it.lv); }).length;
    h += '<div class="stage-head"><div class="eyebrow">' + (s.kind === 'chapter' ? '교안 ' + s.label : s.short) + ' · ' + s.items[0].n + '~' + s.items[s.items.length - 1].n + '번 · ' + (S.level ? LV_NAME[S.level] + ' ' + shown + '문제 / 전체 ' + s.items.length + '문제' : s.items.length + '문제') + '</div><h2>' + esc(s.title) + '</h2>' +
      (s.kind === 'chapter' ? '<a class="concept-link" href="#concepts" data-concept="' + s.no + '">' + s.no + '장 개념 정리 보기 →</a>' : '') + '</div>';
    if (!shown) h += '<p class="empty-lv">이 ' + (s.kind === 'chapter' ? '장' : '구역') + '에는 ' + LV_NAME[S.level] + ' 문제가 없어요. 다른 장을 고르거나 난이도를 바꿔 보세요.</p>';
    s.subs.forEach(function (sb) {
      var its = sb.items.filter(function (it) { return lvOk(it.lv); });
      if (!its.length) return;
      h += '<section class="sub">';
      if (s.subs.length > 1) h += '<h3 class="sub-h">' + esc(sb.title) + ' <span>' + (sb.from === sb.to ? sb.from + '번' : sb.from + '~' + sb.to + '번') + '</span></h3>';
      sb.before.forEach(function (nt) { h += '<div class="stage-note">' + nt + '</div>'; });
      h += '<div class="cards">' + its.map(cardHtml).join('') + '</div>';
      sb.after.forEach(function (nt) { h += '<div class="stage-note" style="margin-top:16px">' + nt + '</div>'; });
      h += '</section>';
    });
    h += '<div class="pager">' + (i > 0 ? '<button class="btn" type="button" data-go="' + (i - 1) + '">← ' + STAGES[i - 1].label + ' ' + esc(STAGES[i - 1].short) + '</button>' : '<span></span>') +
      (i < STAGES.length - 1 ? '<button class="btn primary" type="button" data-go="' + (i + 1) + '">' + STAGES[i + 1].label + ' ' + esc(STAGES[i + 1].short) + ' →</button>' : '') + '</div>';
    var v = $('#stage-view'); v.innerHTML = h;
    $$('#stages button').forEach(function (b) { b.setAttribute('aria-current', +b.dataset.stage === i ? 'true' : 'false'); });
    $$('#dots .dgrp').forEach(function (g) { var cur = +g.dataset.stage === i; g.classList.toggle('cur', cur); if (cur) g.open = true; });
    $$('textarea', v).forEach(function (ta) { ta.value = S.ans[ta.dataset.n] || ''; fit(ta); });
  }
  function cardHtml(it) {
    var a = ANS[it.n] || { mode: 'self' }, st = statusOf(it.n);
    return '<article class="card" id="p-' + it.n + '" data-n="' + it.n + '">' +
      '<div class="card-h"><span class="pnum">' + it.n + '번</span><span class="lv-chip lv' + it.lv + '"><i class="lvdot lv' + it.lv + '"></i>' + LV_NAME[it.lv] + '</span><span class="mode ' + (a.mode === 'auto' ? 'auto' : '') + '">' + (a.mode === 'auto' ? '자동 채점' : '직접 확인') + '</span>' +
      '<span class="status" data-st="' + st + '">' + ST_LABEL[st] + '</span></div>' +
      '<div class="q">' + it.html + '</div>' +
      '<div class="editor"><span class="gut" aria-hidden="true">SQL&gt;</span><textarea id="ans-' + it.n + '" data-n="' + it.n + '" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="' + it.n + '번 답안" placeholder="' + (a.mode === 'auto' ? 'SQL을 쓰고 채점하기를 눌러 보세요' : '답이나 SQL을 써 보세요') + '"></textarea></div>' +
      '<div class="actions">' +
        '<button class="btn" type="button" data-act="run">실행 <kbd>Ctrl+Enter</kbd></button>' +
        (a.mode === 'auto' ? '<button class="btn primary" type="button" data-act="grade">채점하기</button>' : '<button class="btn primary" type="button" data-act="check">정답 확인</button>') +
        '<button class="btn ghost" type="button" data-act="reveal">정답·해설</button>' +
      '</div>' +
      '<div class="out" aria-live="polite"></div>' +
      '<div class="sol" hidden></div>' +
    '</article>';
  }
  function fit(ta) { ta.style.height = 'auto'; ta.style.height = Math.max(96, Math.min(420, ta.scrollHeight + 2)) + 'px'; }

  var modelCache = {};
  function modelResult(n) {
    if (modelCache[n]) return modelCache[n];
    var a = ANS[n], r = engine.query((a.setup ? a.setup + ';\n' : '') + (a.check || a.sql), true);
    modelCache[n] = r; return r;
  }
  function solHtml(n, withKw) {
    var a = ANS[n], card = $('#p-' + n), mine = (S.ans[n] || '');
    var h = '<h4>모범 답안</h4>' + codeBlock(a.sql) + '<h4>해설</h4><div class="exp">' + a.exp + '</div>';
    if (a.mode === 'auto') h += '<div class="expected"><button class="btn small" type="button" data-act="expected">정답 결과 보기</button></div>';
    if (withKw && a.kw && a.kw.length) {
      var U = mine.toUpperCase().replace(/\s+/g, ' ');
      var chips = a.kw.map(function (k) {
        var alts = k.split('|'), hit = alts.some(function (x) { return U.indexOf(x.toUpperCase().replace(/\s+/g, ' ')) >= 0; });
        return '<span class="' + (hit ? 'hit' : 'miss') + '">' + (hit ? '✓ ' : '') + esc(alts[0]) + '</span>';
      }).join('');
      h = '<h4>내 답에 들어 있는 핵심 키워드</h4><div class="kw">' + chips + '</div>' + h;
    }
    if (a.mode !== 'auto') h += '<div class="selfmark"><span>모범 답안과 비교해 보니</span><button class="btn small" type="button" data-act="mark-ok">맞았어요</button><button class="btn small" type="button" data-act="mark-bad">다시 풀래요</button></div>';
    return h;
  }

  function onCardClick(e) {
    var btn = e.target.closest('button'); if (!btn) return;
    var card = e.target.closest('.card'); if (!card) return;
    var n = +card.dataset.n, a = ANS[n], out = card.querySelector('.out'), sol = card.querySelector('.sol');
    var text = card.querySelector('textarea').value;
    if (btn.hasAttribute('data-copy')) {
      var code = btn.parentNode.querySelector('code').textContent;
      var done = function () { btn.textContent = '복사됨'; setTimeout(function () { btn.textContent = '복사'; }, 1400); };
      try { navigator.clipboard.writeText(code).then(done, function () { selectText(btn.parentNode.querySelector('code')); }); } catch (er) { selectText(btn.parentNode.querySelector('code')); }
      return;
    }
    var act = btn.dataset.act;
    if (act === 'run') {
      if (!text.trim()) { out.innerHTML = '<div class="verdict info"><b>비어 있어요</b><span>SQL을 먼저 써 주세요.</span></div>'; return; }
      withEngine(function () { out.innerHTML = (a.setup ? '<div class="msg">이 문제는 문제에 적힌 상태의 테이블을 새로 만들어 두고 실행해요.</div>' : '') + runOutput(a.setup ? engine.runIsolated(a.setup, text) : engine.run(text)); }, out);
    }
    if (act === 'grade') {
      if (!text.trim()) { out.innerHTML = '<div class="verdict info"><b>비어 있어요</b><span>SQL을 먼저 써 주세요.</span></div>'; return; }
      withEngine(function () { grade(n, text, out); }, out);
    }
    if (act === 'check') {
      sol.innerHTML = solHtml(n, true); sol.hidden = false;
      if (!statusOf(n) || statusOf(n) === 'draft') setStatus(n, 'seen');
    }
    if (act === 'reveal') {
      if (!sol.hidden) { sol.hidden = true; return; }
      sol.innerHTML = solHtml(n, a.mode !== 'auto'); sol.hidden = false;
      var s = statusOf(n); if (s !== 'ok' && s !== 'bad') setStatus(n, 'seen');
    }
    if (act === 'expected') {
      var box = btn.parentNode;
      withEngine(function () { var r = modelResult(n); box.innerHTML = '<h4 style="margin-bottom:8px">정답 결과</h4>' + (r.ok ? resultTable(r.result) : '<div class="msg err">' + esc(r.error) + '</div>'); }, box);
    }
    if (act === 'mark-ok') { setStatus(n, 'ok'); btn.parentNode.innerHTML = '<span style="color:var(--ok);font-weight:600">맞힌 문제로 기록했어요.</span>'; }
    if (act === 'mark-bad') { setStatus(n, 'bad'); btn.parentNode.innerHTML = '<span style="color:var(--bad);font-weight:600">다시 풀 문제로 기록했어요. 진행 상황에 빨간색으로 표시돼요.</span>'; }
  }
  function selectText(el) { try { var r = document.createRange(); r.selectNodeContents(el); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); } catch (e) {} }

  function grade(n, text, out) {
    var a = ANS[n], mine = engine.query((a.setup ? a.setup + ';\n' : '') + text, true), model = modelResult(n);
    if (!model.ok) { out.innerHTML = '<div class="verdict info"><b>채점 불가</b><span>정답 쿼리를 실행하지 못했어요: ' + esc(model.error) + '</span></div>'; return; }
    if (!mine) { out.innerHTML = ''; return; }
    if (!mine.ok) {
      out.innerHTML = '<div class="verdict bad"><b>오류</b><span>' + esc(mine.error) + '</span></div>';
      setStatus(n, 'bad'); return;
    }
    if (mine.result.kind !== 'rows') { out.innerHTML = '<div class="verdict info"><b>확인</b><span>마지막 문장이 SELECT여야 결과를 비교할 수 있어요.</span></div>'; return; }
    var c = OraLite.compare(mine.result, model.result, { order: a.order });
    var h = c.ok
      ? '<div class="verdict ok"><b>정답이에요</b><span>' + (a.order && a.order.length ? '정렬 순서까지 맞아요. ' : '') + (c.extra > 0 ? '요구하지 않은 컬럼 ' + c.extra + '개는 빼고 비교했어요.' : '결과가 모범 답안과 같아요.') + '</span></div>'
      : '<div class="verdict bad"><b>아직이에요</b><span>' + esc(c.msg) + '</span></div>';
    out.innerHTML = h + resultTable(mine.result);
    setStatus(n, c.ok ? 'ok' : 'bad');
  }

  function gotoProblem(n) {
    var i = STAGE_OF[n]; if (i == null) return;
    if (!lvOk(LV_OF[n])) { S.level = 0; save(); showStage(i); refreshStats(); }
    var moved = location.hash !== '#problems';
    if (moved) location.hash = 'problems';
    if (i !== S.stage || !$('#p-' + n)) showStage(i);
    var go = function () {
      var c = $('#p-' + n); if (!c) return;
      c.scrollIntoView({ behavior: moved ? 'auto' : 'smooth', block: 'start' });
      c.classList.remove('flash'); void c.offsetWidth; c.classList.add('flash');
    };
    if (moved) setTimeout(go, 80); else go();
  }

  // textarea events
  document.addEventListener('input', function (e) {
    var ta = e.target; if (!ta.matches || !ta.matches('.card textarea')) return;
    var n = +ta.dataset.n; S.ans[n] = ta.value; save(); fit(ta);
    var s = S.st[n]; if (!s) { var el = ta.closest('.card').querySelector('.status'); var ns = statusOf(n); el.dataset.st = ns; el.textContent = ST_LABEL[ns]; refreshStatsSoon(); }
  });
  var rsT = null; function refreshStatsSoon() { clearTimeout(rsT); rsT = setTimeout(refreshStats, 300); }
  document.addEventListener('keydown', function (e) {
    var ta = e.target; if (!ta.matches || !ta.matches('.card textarea')) return;
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); ta.closest('.card').querySelector('[data-act="run"]').click(); }
    if (e.key === 'Tab' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault(); var s = ta.selectionStart, en = ta.selectionEnd;
      ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(en); ta.selectionStart = ta.selectionEnd = s + 2;
      ta.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  // ---------- docs ----------
  function buildToc(docEl, tocEl, levels) {
    var heads = $$(levels, docEl), h = '';
    heads.forEach(function (hd) {
      if (hd.tagName === 'H1') { if (/-ch-/.test(hd.id)) h += '<div class="grp">' + esc(hd.textContent) + '</div>'; }
      else h += '<a href="#' + docEl.id.replace('doc-', '') + '" data-target="' + hd.id + '">' + esc(hd.textContent) + '</a>';
    });
    tocEl.innerHTML = h;
    tocEl.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-target]'); if (!a) return; e.preventDefault();
      var t = document.getElementById(a.dataset.target); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.matchMedia('(max-width: 960px)').matches) tocEl.classList.remove('open');
    });
    // highlight current section
    if ('IntersectionObserver' in window) {
      var links = {}; $$('a[data-target]', tocEl).forEach(function (a) { links[a.dataset.target] = a; });
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { if (en.isIntersecting && links[en.target.id]) { $$('a.on', tocEl).forEach(function (x) { x.classList.remove('on'); }); links[en.target.id].classList.add('on'); } });
      }, { rootMargin: '-80px 0px -70% 0px' });
      heads.forEach(function (hd) { if (hd.tagName !== 'H1') io.observe(hd); });
    }
  }
  function buildDocs() {
    $('#doc-concepts').innerHTML = W.concepts;
    $('#doc-cheat').innerHTML = W.cheat;
    buildToc($('#doc-concepts'), $('#toc-concepts'), 'h1, h2');
    buildToc($('#doc-cheat'), $('#toc-cheat'), 'h1, h2');
    $('#doc-java').innerHTML = WJ;
    buildToc($('#doc-java'), $('#toc-java'), 'h1, h2');
    $$('.toggle-toc').forEach(function (b) { b.addEventListener('click', function () { var t = document.getElementById(b.dataset.toc); t.classList.toggle('open'); b.textContent = t.classList.contains('open') ? '목차 닫기' : '목차 보기'; }); });
    $$('[data-goto]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); location.hash = a.dataset.goto; window.scrollTo({ top: 0 }); }); });
    // cheat sheet search
    var q = $('#cheat-q'), doc = $('#doc-cheat');
    var rows = $$('tr', doc).filter(function (r) { return r.parentNode.tagName === 'TBODY'; });
    rows.forEach(function (r) { r.dataset.text = r.textContent.toLowerCase(); });
    var blocks = $$('p, li, pre', doc).filter(function (b) { return !b.closest('table'); });
    blocks.forEach(function (b) { b.dataset.text = b.textContent.toLowerCase(); });
    q.addEventListener('input', function () {
      var t = q.value.trim().toLowerCase(), cnt = 0;
      $$('mark', doc).forEach(function (m) { m.replaceWith(document.createTextNode(m.textContent)); });
      doc.normalize();
      if (!t) { $$('.hide', doc).forEach(function (x) { x.classList.remove('hide'); }); $('#cheat-cnt').textContent = ''; var e0 = $('.empty-search', doc); if (e0) e0.remove(); return; }
      var terms = t.split(/\s+/);
      function match(s) { return terms.every(function (w) { return s.indexOf(w) >= 0; }); }
      rows.forEach(function (r) { var ok = match(r.dataset.text); r.classList.toggle('hide', !ok); if (ok) { cnt++; mark(r, terms); } });
      blocks.forEach(function (b) { var ok = match(b.dataset.text); b.classList.toggle('hide', !ok); if (ok) { cnt++; mark(b, terms); } });
      // hide tables with no visible rows, and sections with nothing visible
      $$('.tw', doc).forEach(function (tw) { var vis = $$('tbody tr', tw).some(function (r) { return !r.classList.contains('hide'); }); tw.classList.toggle('hide', !vis); });
      $$('h2', doc).forEach(function (h2) {
        var el = h2.nextElementSibling, any = false;
        while (el && el.tagName !== 'H2') { if (!el.classList.contains('hide') && el.tagName !== 'H3' && el.tagName !== 'H1' && (el.tagName !== 'UL' || $$('li', el).some(function (li) { return !li.classList.contains('hide'); }))) any = true; el = el.nextElementSibling; }
        h2.classList.toggle('hide', !any);
      });
      $$('h1, ul, ol', doc).forEach(function (x) { if (x.tagName === 'H1') x.classList.add('hide'); else x.classList.toggle('hide', !$$('li', x).some(function (li) { return !li.classList.contains('hide'); })); });
      var e1 = $('.empty-search', doc); if (e1) e1.remove();
      if (!cnt) doc.insertAdjacentHTML('afterbegin', '<p class="empty-search">‘' + esc(q.value) + '’와(과) 맞는 항목이 없어요. 다른 낱말이나 함수 이름으로 찾아보세요.</p>');
      $('#cheat-cnt').textContent = cnt ? cnt + '개' : '';
    });
  }
  function mark(el, terms) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var s = node.nodeValue, low = s.toLowerCase(), best = -1, len = 0;
      terms.forEach(function (w) { var i = low.indexOf(w); if (i >= 0 && (best < 0 || i < best)) { best = i; len = w.length; } });
      if (best < 0 || !node.parentNode) return;
      var m = document.createElement('mark'); var mid = node.splitText(best); mid.splitText(len);
      m.textContent = mid.nodeValue; mid.parentNode.replaceChild(m, mid);
    });
  }


  // ---------- 연관 문제 추천 ----------
  // 정답 SQL에 쓰인 키워드·함수와 같은 소단원 여부로 비슷한 문제를 골라요
  var ITEM = {}, SUB_OF = {}, FEAT = {}, DF = {}, NPROB = 0;
  STAGES.forEach(function (s, i) { s.subs.forEach(function (sb, j) { sb.items.forEach(function (it) { ITEM[it.n] = it; SUB_OF[it.n] = i + '.' + j; }); }); });
  var REC_STOP = { SELECT: 1, FROM: 1, WHERE: 1, AND: 1, OR: 1, AS: 1, ON: 1, BY: 1, IS: 1, NOT: 1, IN: 1, INTO: 1, VALUES: 1, SET: 1, TABLE: 1, TO: 1, ALL: 1 };
  Object.keys(ITEM).forEach(function (n) {
    var a = ANS[n] || {}, f = {}, src = ((a.sql || '') + ' ' + (a.check || '')).toUpperCase();
    (src.match(/[A-Z_][A-Z0-9_]*/g) || []).forEach(function (w) { if (KWS[w] && !REC_STOP[w]) f[w] = 1; });
    var fx = src.match(/([A-Z_][A-Z0-9_]*)\s*\(/g) || []; fx.forEach(function (x) { var w = x.replace(/\s*\($/, ''); if (!REC_STOP[w]) f[w] = 1; });
    (a.kw || []).forEach(function (k) { var w = k.split('|')[0].toUpperCase().trim(); if (w && !REC_STOP[w]) f[w] = 1; });
    if (f.GROUP && src.indexOf('GROUP BY') >= 0) { f['GROUP BY'] = 1; delete f.GROUP; }
    if (f.ORDER && src.indexOf('ORDER BY') >= 0) { f['ORDER BY'] = 1; delete f.ORDER; }
    FEAT[n] = f; NPROB++;
    Object.keys(f).forEach(function (w) { DF[w] = (DF[w] || 0) + 1; });
  });
  function idf(w) { return Math.log(NPROB / (DF[w] || 1)); }
  var snipEl = document.createElement('div');
  function snippet(html, len) { snipEl.innerHTML = String(html).replace(/<(br|\/p|\/li|\/div)[^>]*>/gi, ' $&'); var t = snipEl.textContent.replace(/\s+/g, ' ').trim(); return t.length > len ? t.slice(0, len - 1) + '…' : t; }
  function related(n, k) {
    var me = FEAT[n] || {}, lv = LV_OF[n], out = [];
    Object.keys(ITEM).forEach(function (m) {
      m = +m; if (m === n) return;
      var f = FEAT[m], shared = Object.keys(me).filter(function (w) { return f[w]; });
      var sc = shared.reduce(function (t, w) { return t + idf(w); }, 0);
      if (SUB_OF[m] === SUB_OF[n]) sc += 2.5; else if (STAGE_OF[m] === STAGE_OF[n]) sc += 1;
      if (sc <= 1) return;
      if (LV_OF[m] === lv) sc += .6; else if (LV_OF[m] < lv) sc += .3;
      if ((ANS[m] || {}).mode === 'auto') sc += .5;
      var st = S.st[m]; if (st === 'ok') sc -= 3; else if (st === 'bad') sc -= .5;
      shared.sort(function (a, b) { return idf(b) - idf(a); });
      out.push({ n: m, sc: sc, why: shared.slice(0, 3), sub: SUB_OF[m] === SUB_OF[n] });
    });
    out.sort(function (a, b) { return b.sc - a.sc || a.n - b.n; });
    return out.slice(0, k || 3);
  }
  function recHtml(list, attr) {
    return '<div class="rec-h">비슷한 문제로 한 번 더 연습해 보세요</div><div class="rec-list">' + list.map(function (r) {
      return '<button type="button" class="rec-i" ' + attr + '="' + r.n + '"><span class="rec-n">' + r.n + '번</span><i class="lvdot lv' + r.lv + '" title="' + r.lvName + '"></i>' +
        '<span class="rec-t">' + esc(r.text) + '</span><span class="rec-why">' + (r.why.length ? r.why.map(function (w) { return '<code>' + esc(w) + '</code>'; }).join('') : '') + (r.sub ? '<em>같은 소단원</em>' : '') + '</span></button>';
    }).join('') + '</div>';
  }
  function showRec(n, on) {
    var card = $('#p-' + n); if (!card) return;
    var box = card.querySelector('.rec');
    if (!on) { if (box) box.remove(); return; }
    var list = related(n, 3); if (!list.length) return;
    if (!box) { box = document.createElement('div'); box.className = 'rec'; card.appendChild(box); }
    box.innerHTML = recHtml(list.map(function (r) { return { n: r.n, lv: LV_OF[r.n], lvName: LV_NAME[LV_OF[r.n]], text: snippet(ITEM[r.n].html, 70), why: r.why, sub: r.sub }; }), 'data-recgo');
  }
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-recgo]'); if (b) gotoProblem(+b.dataset.recgo); });

  // ---------- 오답노트 ----------
  function wrongList() { return Object.keys(S.wrong).map(Number).filter(function (n) { return ITEM[n]; }); }
  function isFixed(n) { return S.st[n] === 'ok'; }
  function wrongBadge() {
    var open = wrongList().filter(function (n) { return !isFixed(n); }).length, b = $('#wrong-n');
    if (b) { b.textContent = open || ''; b.hidden = !open; }
  }
  function shortDate(iso) { var d = new Date(iso); if (!iso || isNaN(d)) return ''; return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
  function wrongMarks(n) {
    var it = document.querySelector('.wn-item[data-wn="' + n + '"]'); if (!it) return;
    var w = S.wrong[n] || {}; it.classList.toggle('fixed', isFixed(n));
    var c = it.querySelector('.wn-c'); if (c) c.textContent = '틀린 횟수 ' + (w.c || 1) + '번';
    var t = it.querySelector('.wn-t'); if (t) t.textContent = w.t ? '마지막 ' + shortDate(w.t) : '';
    wrongCounts();
  }
  function wrongCounts() {
    var all = wrongList(), fixed = all.filter(isFixed).length;
    var set = function (k, v) { var el = $('#wn-cnt-' + k); if (el) el.textContent = v; };
    set('open', all.length - fixed); set('fixed', fixed); set('all', all.length);
  }
  function renderWrong() {
    var v = $('#wrong-view'); if (!v) return;
    $('#stage-view').innerHTML = ''; // 같은 문제 카드가 두 곳에 생기지 않게
    var all = wrongList(), fixed = all.filter(isFixed);
    var list = S.wf === 'fixed' ? fixed : S.wf === 'all' ? all : all.filter(function (n) { return !isFixed(n); });
    if (S.ws === 'chapter') list.sort(function (a, b) { return a - b; });
    else list.sort(function (a, b) { return String((S.wrong[b] || {}).t || '').localeCompare(String((S.wrong[a] || {}).t || '')) || a - b; });
    var h = '<div class="stage-head"><div class="eyebrow">SQL · 오답노트</div><h2>오답노트</h2>' +
      '<p class="wn-sub">채점에서 틀렸거나 ‘다시 풀래요’를 고른 문제가 자동으로 모여요. 여기서 바로 다시 풀 수 있고, 맞히면 ‘다시 맞힘’으로 옮겨져요.</p></div>';
    h += '<div class="lvbar wn-bar" role="group" aria-label="오답 보기">' +
      [['open', '아직 못 맞힘', all.length - fixed.length], ['fixed', '다시 맞힘', fixed.length], ['all', '전체', all.length]].map(function (x) {
        return '<button type="button" class="lvbtn" data-wf="' + x[0] + '" aria-pressed="' + (S.wf === x[0]) + '">' + x[1] + ' <span id="wn-cnt-' + x[0] + '">' + x[2] + '</span></button>';
      }).join('') +
      '<label class="wn-sort">정렬 <select id="wn-sort"><option value="recent"' + (S.ws === 'recent' ? ' selected' : '') + '>최근 틀린 순</option><option value="chapter"' + (S.ws === 'chapter' ? ' selected' : '') + '>장 순서</option></select></label></div>';
    if (!all.length) h += '<div class="empty-lv">아직 틀린 문제가 없어요. 실습 문제를 풀다가 틀리면 여기에 모여요.</div>';
    else if (!list.length) h += '<div class="empty-lv">' + (S.wf === 'open' ? '못 맞힌 문제를 모두 다시 맞혔어요. 잘했어요!' : '아직 다시 맞힌 문제가 없어요.') + '</div>';
    else {
      var lastStage = -1;
      h += '<div class="cards">';
      list.forEach(function (n) {
        var si = STAGE_OF[n], s = STAGES[si], w = S.wrong[n] || {};
        if (S.ws === 'chapter' && si !== lastStage) { h += '<h3 class="sub-h wn-grp">' + esc(s.label + ' ' + s.short) + '</h3>'; lastStage = si; }
        h += '<div class="wn-item' + (isFixed(n) ? ' fixed' : '') + '" data-wn="' + n + '"><div class="wn-meta">' +
          '<span class="wn-where">' + esc(s.label + ' · ' + s.short) + '</span><span class="wn-c">틀린 횟수 ' + (w.c || 1) + '번</span><span class="wn-t">' + (w.t ? '마지막 ' + shortDate(w.t) : '') + '</span>' +
          '<span class="wn-ok">다시 맞힘</span><button type="button" class="wn-rm" data-wnrm="' + n + '">오답노트에서 빼기</button></div>' + cardHtml(ITEM[n]) + '</div>';
      });
      h += '</div>';
    }
    v.innerHTML = h;
    $$('textarea', v).forEach(function (ta) { ta.value = S.ans[ta.dataset.n] || ''; fit(ta); });
  }
  document.addEventListener('click', function (e) {
    var f = e.target.closest('[data-wf]'); if (f) { S.wf = f.dataset.wf; save(); renderWrong(); return; }
    var rm = e.target.closest('[data-wnrm]'); if (rm) { var n = +rm.dataset.wnrm; delete S.wrong[n]; save(); var it = rm.closest('.wn-item'); if (it) it.remove(); wrongCounts(); wrongBadge(); }
  });
  document.addEventListener('change', function (e) { if (e.target.id === 'wn-sort') { S.ws = e.target.value; save(); renderWrong(); } });

  // ---------- routing ----------
  var VIEWS = ['problems', 'concepts', 'cheatsheet', 'wrong', 'jproblems', 'java', 'jcheat', 'jwrong', 'dproblems', 'db', 'dcheat', 'dwrong'];
  var CAT_OF = { jproblems: 'java', java: 'java', jcheat: 'java', jwrong: 'java', dproblems: 'db', db: 'db', dcheat: 'db', dwrong: 'db' };
  var BRAND = {
    sql: ['SQL>', 'SQL 정석 워크북', 'Oracle 실습 · 교안 1~14장'],
    java: ['Java>', 'Java 정석 워크북', '자바의 정석 4판 · 1~13장'],
    db: ['ERD>', 'DB 모델링 워크북', '데이터 모델링 · 1~3장']
  };
  function route() {
    var v = (location.hash || '').slice(1); if (VIEWS.indexOf(v) < 0) v = 'problems';
    VIEWS.forEach(function (x) { $('#view-' + x).hidden = x !== v; });
    $$('.tabs a').forEach(function (a) { if (a.dataset.view === v) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    var cat = CAT_OF[v] || 'sql', isJava = cat === 'java';
    if (v === 'wrong') renderWrong(); else if (v === 'problems' && !$('#stage-view').children.length) showStage(S.stage);
    if (WB.onView) WB.onView(v);
    lastView[cat] = v;
    document.documentElement.classList.toggle('cat-java', isJava);
    document.documentElement.classList.toggle('cat-db', cat === 'db');
    if (WB.onCategory) WB.onCategory(isJava);
    $('#tabs-sql').hidden = cat !== 'sql'; $('#tabs-java').hidden = cat !== 'java'; $('#tabs-db').hidden = cat !== 'db';
    $$('.cat a').forEach(function (a) { if (a.dataset.cat === cat) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); a.setAttribute('href', '#' + lastView[a.dataset.cat]); });
    $('#brand-prompt').textContent = BRAND[cat][0];
    $('#brand-name').textContent = BRAND[cat][1];
    $('#brand-sub').textContent = BRAND[cat][2];
    if (cat !== 'sql') { var sc = $('#scratch'); if (sc && !sc.hidden) { var x = $('#scratch-close'); if (x) x.click(); } }
  }
  var lastView = { sql: 'problems', java: 'jproblems', db: 'dproblems' };
  window.addEventListener('hashchange', function () { route(); window.scrollTo({ top: 0 }); });

  document.addEventListener('click', function (e) { if (e.target.closest('#stage-view') || e.target.closest('#wrong-view')) onCardClick(e); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-concept]'); if (!a) return; e.preventDefault();
    if (location.hash !== '#concepts') { location.hash = 'concepts'; }
    setTimeout(function () { var t = document.getElementById('c-ch-' + a.dataset.concept); if (t) t.scrollIntoView({ block: 'start' }); }, 80);
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-level]'); if (!b) return;
    S.level = +b.dataset.level; save(); showStage(S.stage); refreshStats();
  });
  document.addEventListener('change', function (e) { if (e.target.id === 'stage-select') { showStage(+e.target.value); window.scrollTo({ top: 0 }); } });
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-go]'); if (b) { showStage(+b.dataset.go); window.scrollTo({ top: 0 }); } });

  // java.js 등 다른 파일에서 쓰는 공용 도구
  var WB = window.WB = window.WB || {};
  WB.$ = $; WB.$$ = $$; WB.esc = esc; WB.mark = mark; WB.buildToc = buildToc;
  WB.b64 = b64; WB.unb64 = unb64; WB.pipe = pipe; WB.whenStr = whenStr; WB.plainDownload = plainDownload;
  WB.downloads = function () { return downloadsP; };
  WB.recHtml = recHtml; WB.snippet = snippet; WB.shortDate = shortDate;
  // 모든 스크립트를 읽은 뒤 js/main.js가 부른다
  WB.boot = function () {
    if (WB.initJava) WB.initJava();
    if (WB.initDb) WB.initDb();
    buildRail(); showStage(S.stage); refreshStats(); buildDocs(); route(); initScratch(); initTheme(); bootEngine();
  };
})();
