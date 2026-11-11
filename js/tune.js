/* SQL 튜닝(친절한 SQL 튜닝): 실습 문제 · 핵심 정리 · 오답노트 · 기록 저장/불러오기 · Claude 채점 */
(function () {
  'use strict';
  var $ = WB.$, $$ = WB.$$, esc = WB.esc, mark = WB.mark, buildToc = WB.buildToc, b64 = WB.b64, unb64 = WB.unb64,
      pipe = WB.pipe, plainDownload = WB.plainDownload;

  var DKEY = 'tunewb:v1';
  var DS = { ch: 1, lv: 0, a: {}, st: {}, wrong: {}, wf: 'open', ws: 'recent' };
  try { var draw = localStorage.getItem(DKEY); if (draw) { var dobj = JSON.parse(draw); if (dobj && typeof dobj === 'object') { DS.ch = dobj.ch || 1; DS.lv = dobj.lv || 0; DS.a = dobj.a || {}; DS.st = dobj.st || {}; DS.wrong = dobj.wrong || {}; DS.wf = dobj.wf || 'open'; DS.ws = dobj.ws || 'recent'; } } } catch (e) {}
  var dsaveT;
  function dsave() { clearTimeout(dsaveT); dsaveT = setTimeout(function () { try { localStorage.setItem(DKEY, JSON.stringify(DS)); } catch (e) {} }, 250); }
  var DLV = { 1: '기초', 2: '응용', 3: '심화' };
  var DMODE = { mc: '객관식 · 자동 채점', self: '서술·SQL · 스스로 채점' };
  var DSTL = { ok: '정답', bad: '오답', seen: '답만 확인', draft: '작성 중' };
  var DP = WTU.problems, DCH = WTU.chapters;
  var dbyN = {}; DP.forEach(function (p) { dbyN[p.n] = p; });
  function chL(n) { return n === 8 ? '부록' : n + '장'; }
  function dOfCh(ch) { return DP.filter(function (p) { return p.ch === ch; }); }
  function dText(html) { var d = document.createElement('div'); d.innerHTML = html; return d.textContent; }
  function dFlat(s) { return String(s || '').replace(/\s+/g, ''); }

  // ---------- 연관 문제 추천용 낱말 ----------
  var DSTOP = { 'the': 1 };
  var DFEAT = {}, DDF = {};
  DP.forEach(function (p) {
    var f = {}, src = dText(p.q) + ' ' + (p.kw || []).join(' ');
    (src.match(/[가-힣A-Za-z]{2,}/g) || []).forEach(function (w) { if (!DSTOP[w] && !/^(다음|중|것|무엇|설명|옳은|틀린|알맞은|가장|해요|있어요|무엇인가요|고르세요|어떤|아닌|해당|하는|있는|되는|이다|에서|으로|하고|보기)$/.test(w)) f[w] = 1; });
    DFEAT[p.n] = f; Object.keys(f).forEach(function (w) { DDF[w] = (DDF[w] || 0) + 1; });
  });
  function dIdf(w) { return Math.log(DP.length / (DDF[w] || 1)); }
  function dRelated(n, k) {
    var me = DFEAT[n] || {}, src = dbyN[n], out = [];
    DP.forEach(function (p) {
      if (p.n === n) return;
      var f = DFEAT[p.n], shared = Object.keys(me).filter(function (w) { return f[w]; });
      var sc = shared.reduce(function (t, w) { return t + Math.min(dIdf(w), 4); }, 0);
      if (p.ch === src.ch) sc += 1;
      if (DS.st[p.n] === 'ok') sc -= 2;
      if (sc < 3) return;
      shared.sort(function (a, b) { return dIdf(b) - dIdf(a); });
      out.push({ n: p.n, sc: sc, why: shared.filter(function (w) { return DDF[w] > 1; }).slice(0, 3) });
    });
    out.sort(function (a, b) { return b.sc - a.sc || a.n - b.n; });
    return out.slice(0, k || 3);
  }
  // 틀린 문제 → Claude가 만든 새 객관식 문제로 다시 연습
  function dGenPrompt(n) {
    var p = dbyN[n], c = DCH.filter(function (x) { return x.no === p.ch; })[0], mine = DS.a[n];
    var model = p.t === 'mc' ? 'Correct choice: ' + dText(p.choices[p.ans]) : dText(p.answer || '');
    var said = p.t === 'mc' ? (typeof mine === 'number' && p.choices[mine] != null ? 'Student picked: ' + dText(p.choices[mine]) : '') : (typeof mine === 'string' && mine.trim() ? 'Student wrote:\n' + mine.slice(0, 1500) : '');
    return [
      'You write ONE new short multiple-choice practice question on ORACLE SQL TUNING for a Korean learner who just got a question wrong. The course follows the book 친절한 SQL 튜닝(조시형): SQL 처리 과정과 I/O, 인덱스 기본, 인덱스 튜닝, 조인 튜닝(NL·소트 머지·해시·서브쿼리 조인), 소트 튜닝, DML 튜닝(Direct Path, 파티션, Lock), 옵티마이저, 실행계획·트레이스.',
      'Goal: practice the same concept the student missed, in a DIFFERENT situation than the original (different tables, columns, indexes or execution plan). Same level or a little easier.',
      'Rules:',
      '- Exactly 4 choices, exactly one clearly correct by standard Oracle behavior. Wrong choices should be mistakes a beginner would really make.',
      '- If you show SQL, an index definition or an execution plan, put it in "code" as plain text, not in "question".',
      '- Use the same Korean terms as the original question. Korean, polite 해요체.',
      'Reply with ONLY this JSON:',
      '{"question": "...", "code": "", "choices": ["...", "...", "...", "..."], "answer": 0, "explain": "왜 그 보기가 답인지 1-3문장(해요체)"}',
      '',
      'CHAPTER: ' + p.ch + '장 ' + (c ? c.title : ''),
      'ORIGINAL QUESTION: ' + dText(p.q).slice(0, 800),
      p.code ? 'MATERIAL:\n' + String(p.code).slice(0, 1200) : '',
      p.t === 'mc' ? 'ORIGINAL CHOICES: ' + p.choices.map(function (x, i) { return (i + 1) + ') ' + dText(x); }).join(' / ') : '',
      'MODEL ANSWER: ' + model.slice(0, 1500),
      p.exp ? 'EXPLANATION: ' + dText(p.exp).slice(0, 600) : '',
      said
    ].filter(Boolean).join('\n');
  }
  WB.genHandlers.tune = {
    make: function (n, body) { WB.mcMake(body, dGenPrompt(n), 'Claude가 방금 틀린 개념으로 객관식 문제를 만들고 있어요.'); },
    act: function (body, gc, act) { WB.mcAct(body, gc, act); }
  };
  function dShowRec(n, on) {
    var card = $('#tq-' + n); if (!card) return;
    var box = card.querySelector('.rec');
    if (!on) { if (box) box.remove(); return; }
    if (box) return;
    var list = dRelated(n, 3);
    box = document.createElement('div'); box.className = 'rec'; card.appendChild(box);
    var sim = list.length ? WB.recHtml(list.map(function (r) { var p = dbyN[r.n]; return { n: r.n, lv: p.lv, lvName: DLV[p.lv], text: (p.ch !== dbyN[n].ch ? chL(p.ch) + ' · ' : '') + WB.snippet(p.q, 64), why: r.why, sub: false }; }), 'data-trecgo').replace(/^<div class="rec-h">[^<]*<\/div>/, '') : '';
    box.innerHTML = WB.genBoxHtml('tune', n, sim);
  }
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-trecgo]'); if (b) dGoto(+b.dataset.trecgo); });

  // ---------- 상태 ----------
  function dSetSt(n, st) {
    var prev = DS.st[n];
    if (st) DS.st[n] = st; else delete DS.st[n];
    if (st === 'bad') { var w = DS.wrong[n] || (DS.wrong[n] = { c: 0 }); w.c++; w.t = new Date().toISOString(); delete w.ok; }
    if (st === 'ok' && DS.wrong[n] && prev !== 'ok') DS.wrong[n].ok = new Date().toISOString();
    dsave(); dRefresh(); dShowRec(n, st === 'bad'); dWrongMarks(n);
    var s = $('#tq-' + n + ' .status'); if (s) { s.dataset.st = st || ''; s.textContent = st ? DSTL[st] : ''; }
  }
  function dRefresh() {
    dWrongBadge();
    var ok = 0, done = 0;
    DP.forEach(function (p) { var s = DS.st[p.n]; if (s === 'ok') ok++; if (s === 'ok' || s === 'bad') done++; });
    $('#tst-ok').textContent = ok; $('#tst-done').textContent = done; $('#tst-total').textContent = '푼 문제 / ' + DP.length;
    $$('#tdots .dot').forEach(function (d) { d.dataset.st = DS.st[d.dataset.tn] || ''; });
    DCH.forEach(function (c) {
      var ps = dOfCh(c.no), k = { ok: 0, bad: 0, seen: 0 };
      ps.forEach(function (p) { var s = DS.st[p.n]; if (k[s] != null) k[s]++; });
      var g = $('#tdg-' + c.no); if (!g) return;
      $('.dg-c', g).textContent = (k.ok + k.bad) + '/' + ps.length;
      $('.dg-bar', g).innerHTML = ['ok', 'bad', 'seen'].map(function (t) { return k[t] ? '<i class="b-' + t + '" style="width:' + (k[t] / ps.length * 100) + '%"></i>' : ''; }).join('');
      var sb = $('#tstages [data-tstage="' + c.no + '"] .sc'); if (sb) sb.textContent = (k.ok + k.bad) + '/' + ps.length;
    });
  }

  function dBuildRail() {
    var h = '';
    DCH.forEach(function (c) {
      var dots = dOfCh(c.no).map(function (p) { return '<button type="button" class="dot" data-tn="' + p.n + '" title="' + p.n + '번 · ' + DLV[p.lv] + '" aria-label="' + p.n + '번 문제로 이동"></button>'; }).join('');
      h += '<details class="dgrp" id="tdg-' + c.no + '"' + (c.no === DS.ch ? ' open' : '') + '><summary><span class="dg-n">' + chL(c.no) + '</span><span class="dg-t">' + esc(c.short) + '</span><span class="dg-c"></span><span class="dg-bar"></span></summary><div class="dots">' + dots + '</div></details>';
    });
    $('#tdots').innerHTML = h;
    $('#tstages').innerHTML = DCH.map(function (c) { return '<li><button type="button" data-tstage="' + c.no + '"><span class="sn">' + c.no + '</span>' + esc(c.short) + '<span class="sc"></span></button></li>'; }).join('');
    $('#tdots').addEventListener('click', function (e) { var b = e.target.closest('.dot'); if (b) dGoto(+b.dataset.tn); });
    $('#tstages').addEventListener('click', function (e) { var b = e.target.closest('[data-tstage]'); if (b) { dShow(+b.dataset.tstage); window.scrollTo({ top: 0 }); } });
    $('#tdg-open').addEventListener('click', function () { $$('#tdots details').forEach(function (d) { d.open = true; }); });
    $('#tdg-close').addEventListener('click', function () { $$('#tdots details').forEach(function (d) { d.open = false; }); });
    $('#tclear').addEventListener('click', function () { $('#tclear-confirm').hidden = false; });
    $('#tclear-no').addEventListener('click', function () { $('#tclear-confirm').hidden = true; });
    $('#tclear-yes').addEventListener('click', function () { DS.a = {}; DS.st = {}; DS.wrong = {}; dsave(); $('#tclear-confirm').hidden = true; dShow(DS.ch); dRefresh(); });
    if (window.matchMedia('(max-width: 960px)').matches) { $('#tpanel-progress').classList.remove('open'); $('#tpanel-data').classList.remove('open'); }
  }

  // ---------- 문제 카드 ----------
  function dCard(p) {
    var st = DS.st[p.n] || '', saved = DS.a[p.n];
    var h = '<article class="card" id="tq-' + p.n + '" data-tn="' + p.n + '">' +
      '<div class="card-h"><span class="pnum">' + p.n + '</span><span class="mode' + (p.t === 'self' ? '' : ' auto') + '">' + DMODE[p.t] + '</span>' +
      '<span class="lv-chip"><i class="lvdot lv' + p.lv + '"></i>' + DLV[p.lv] + '</span>' +
      '<span class="status" data-st="' + st + '">' + (st ? DSTL[st] : '') + '</span></div>' +
      '<div class="q">' + p.q + (p.code ? '<pre class="code"><code>' + esc(p.code) + '</code></pre>' : '') + '</div>';
    if (p.t === 'mc') {
      h += '<div class="choices" role="radiogroup" aria-label="' + p.n + '번 보기">' + p.choices.map(function (c, i) {
        return '<label class="choice"><input type="radio" name="tc-' + p.n + '" value="' + i + '"' + (saved === i ? ' checked' : '') + '><span><b class="cno">' + '①②③④⑤'[i] + '</b> ' + c + '</span></label>';
      }).join('') + '</div>';
      h += '<div class="actions"><button class="btn primary" type="button" data-tact="grade">채점하기</button><button class="btn ghost" type="button" data-tact="reveal">정답 보기</button></div>';
    } else {
      h += '<div class="editor"><span class="gut" aria-hidden="true">답&gt;</span><textarea id="tans-' + p.n + '" data-tn="' + p.n + '" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="' + p.n + '번 답안" placeholder="' + esc(p.ph || '생각한 답을 자유롭게 써 보세요. SQL, 인덱스 구성(예: 고객_X1: 고객번호 + 거래일자), 힌트, 설명 모두 좋아요.') + '">' + esc(typeof saved === 'string' ? saved : '') + '</textarea></div>';
      h += '<div class="actions"><button class="btn primary" type="button" data-tact="reveal">정답 확인 <kbd>Ctrl+Enter</kbd></button>' +
        '<button class="btn" type="button" data-tact="aigrade" title="Claude가 내 답을 읽고 채점해요">Claude에게 채점받기</button></div>';
    }
    h += '<div class="out" id="tout-' + p.n + '"></div><div class="sol" id="tsol-' + p.n + '" hidden></div></article>';
    return h;
  }
  function dSol(p, userText) {
    var h = '<h4>정답과 해설</h4>';
    if (p.t === 'mc') h += '<div class="exp"><p><b>정답: ' + '①②③④⑤'[p.ans] + '</b></p><p>' + p.exp + '</p></div>';
    else {
      var flat = dFlat(userText).toLowerCase();
      h += '<pre class="code dans">' + esc(p.answer) + '</pre>';
      if (p.kw && p.kw.length) h += '<div><div class="res-label">핵심 키워드' + (flat ? ' · 내 답에 들어간 것은 진하게 표시돼요' : '') + '</div><div class="kw">' + p.kw.map(function (k) {
        var hit = flat && flat.indexOf(dFlat(k).toLowerCase()) >= 0;
        return '<span class="' + (flat ? (hit ? 'hit' : 'miss') : '') + '">' + esc(k) + '</span>';
      }).join('') + '</div></div>';
      if (p.exp) h += '<div class="exp"><p>' + p.exp + '</p></div>';
      h += '<div class="selfmark"><span>내 답은?</span><button class="btn small" type="button" data-tact="markok">맞았어요</button><button class="btn small" type="button" data-tact="markbad">틀렸어요</button></div>';
    }
    return h;
  }

  function dShow(ch) {
    if (!DCH.some(function (c) { return c.no === ch; })) ch = 1;
    DS.ch = ch; dsave();
    var c = DCH.filter(function (x) { return x.no === ch; })[0], all = dOfCh(ch);
    var cnt = { 0: all.length, 1: 0, 2: 0, 3: 0 }; all.forEach(function (p) { cnt[p.lv]++; });
    var list = DS.lv ? all.filter(function (p) { return p.lv === DS.lv; }) : all;
    var h = '<label class="stage-pick">장 고르기<select id="tstage-select">' + DCH.map(function (x) { return '<option value="' + x.no + '"' + (x.no === ch ? ' selected' : '') + '>' + chL(x.no) + ' ' + esc(x.short) + '</option>'; }).join('') + '</select></label>';
    h += '<div class="stage-head"><div class="eyebrow">SQL 튜닝 · ' + chL(ch) + ' · ' + all.length + '문제</div><h2>' + esc(c.title) + '</h2>' +
      '<a href="#tune" class="concept-link" data-tconcept="' + ch + '">이 장의 개념 정리 보기 →</a></div>';
    h += '<div class="lvbar"><span class="lvbar-l">난이도</span>' + [0, 1, 2, 3].map(function (l) {
      return '<button type="button" class="lvbtn" data-tlevel="' + l + '" aria-pressed="' + (DS.lv === l) + '">' + (l ? '<i class="lvdot lv' + l + '"></i>' + DLV[l] : '전체') + ' <span>' + cnt[l] + '</span></button>';
    }).join('') + '</div>';
    h += list.length ? '<div class="cards">' + list.map(dCard).join('') + '</div>' : '<div class="empty-lv">이 장에는 이 난이도의 문제가 없어요.</div>';
    var prev = DCH.filter(function (x) { return x.no === ch - 1; })[0], next = DCH.filter(function (x) { return x.no === ch + 1; })[0];
    h += '<div class="pager">' + (prev ? '<button class="btn" type="button" data-tgo="' + prev.no + '">← ' + chL(prev.no) + ' ' + esc(prev.short) + '</button>' : '<span></span>') +
      (next ? '<button class="btn" type="button" data-tgo="' + next.no + '">' + chL(next.no) + ' ' + esc(next.short) + ' →</button>' : '') + '</div>';
    $('#tstage-view').innerHTML = h;
    $$('#tstages [data-tstage]').forEach(function (b) { b.setAttribute('aria-current', +b.dataset.tstage === ch ? 'true' : 'false'); });
    $$('#tdots details').forEach(function (d) { d.classList.toggle('cur', d.id === 'tdg-' + ch); });
    $$('#tdots .dot').forEach(function (d) { var p = dbyN[d.dataset.tn]; d.classList.toggle('dim', !!(DS.lv && p.ch === ch && p.lv !== DS.lv)); });
    dRefresh();
  }
  function dGoto(n) {
    var p = dbyN[n]; if (!p) return;
    if (location.hash !== '#tproblems') location.hash = 'tproblems';
    if (DS.lv && p.lv !== DS.lv) DS.lv = 0;
    dShow(p.ch);
    setTimeout(function () { var el = $('#tq-' + n); if (el) { el.scrollIntoView({ block: 'start' }); el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); } }, 60);
  }
  function dVerdict(n, cls, title, msg) { $('#tout-' + n).innerHTML = '<div class="verdict ' + cls + '"><b>' + title + '</b><span>' + msg + '</span></div>'; }
  function dReveal(p, text) { var s = $('#tsol-' + p.n); s.innerHTML = dSol(p, text); s.hidden = false; }

  function dGrade(p) {
    var card = $('#tq-' + p.n);
    var sel = $('input[name="tc-' + p.n + '"]:checked', card);
    if (!sel) { dVerdict(p.n, 'info', '보기를 골라 주세요', '하나를 고른 뒤 채점하기를 눌러요.'); return; }
    var v = +sel.value; DS.a[p.n] = v;
    $$('.choice', card).forEach(function (l, i) { l.classList.toggle('right', i === p.ans); l.classList.toggle('wrong', i === v && v !== p.ans); });
    if (v === p.ans) { dVerdict(p.n, 'ok', '정답이에요', '해설도 확인해 보세요.'); dSetSt(p.n, 'ok'); }
    else { dVerdict(p.n, 'bad', '오답이에요', '정답은 ' + '①②③④⑤'[p.ans] + '번이에요.'); dSetSt(p.n, 'bad'); }
    dReveal(p);
  }

  // ---------- Claude 채점 (sample capability) ----------
  var dSampleP = null, dGradeCtl = {};
  function dGetSample() { return WB.getSample(); } // claude.ai의 Claude, 또는 내가 넣은 API 키
  function dAiGrade(p, btn) {
    var mine = $('#tans-' + p.n).value;
    DS.a[p.n] = mine; dsave();
    if (!mine.trim()) { dVerdict(p.n, 'info', '답을 먼저 써 주세요', '답을 쓴 뒤 채점받기를 눌러요.'); return; }
    if (dGradeCtl[p.n]) dGradeCtl[p.n].abort();
    var my = dGradeCtl[p.n] = new AbortController();
    btn.disabled = true;
    dVerdict(p.n, 'info', 'Claude가 채점하는 중…', '답을 읽고 문제의 요구사항과 비교하고 있어요.');
    var task = [
      'You are grading a Korean student\'s answer to an Oracle SQL tuning practice question (indexes, execution plans, joins, sorts, DML, optimizer).',
      'Rules:',
      '- Judge whether the STUDENT ANSWER satisfies what the TASK asks. Use the MODEL ANSWER and KEY POINTS as reference, not as the only acceptable wording.',
      '- Different but valid SQL, hints, index designs or wording are fine and must PASS if they are technically correct for Oracle.',
      '- For rewrite/index-design tasks, check that the result is the same and the tuning idea is right (access path, column order, hint, sort avoidance). A missing key point the task explicitly asks for is not a PASS.',
      '- PARTIAL means mostly right but one important point is missing or slightly wrong.',
      'Answer in exactly this format and nothing else:',
      'VERDICT: <PASS | PARTIAL | FAIL>',
      '---FEEDBACK---',
      '<2 to 4 short sentences IN KOREAN (해요체). Say what is right, and for PARTIAL/FAIL point to the exact gap and a hint to fix it. Do NOT paste the full model answer.>',
      '',
      'TASK:', dText(p.q) + (p.code ? '\n' + p.code : ''),
      'MODEL ANSWER (for reference only):\n' + p.answer,
      p.kw && p.kw.length ? 'KEY POINTS: ' + p.kw.join(', ') : '',
      'STUDENT ANSWER:\n<<<\n' + mine + '\n>>>'
    ].filter(Boolean).join('\n');
    dGetSample().then(function (sample) {
      if (!sample) { dVerdict(p.n, 'info', '여기서는 Claude 채점을 쓸 수 없어요', WB.NO_CLAUDE + ' 지금은 ‘정답 확인’으로 모범 답안과 비교해 보세요.'); return; }
      return sample(task, { signal: my.signal, modelTier: 'default', cache: false }).then(function (res) {
        if (my !== dGradeCtl[p.n]) return;
        var t = res.text || '', m = /VERDICT:\s*(PASS|PARTIAL|FAIL)/.exec(t), v = m ? m[1] : 'PARTIAL';
        var fi = t.indexOf('---FEEDBACK---'), fb = (fi >= 0 ? t.slice(fi + 14) : t.replace(/VERDICT:.*\n?/, '')).trim();
        var note = '<span class="jnote" style="display:block;margin-top:4px">Claude가 답을 읽고 판단한 결과예요. 모범 답안과 비교도 해 보세요.</span>';
        if (v === 'PASS') { dVerdict(p.n, 'ok', '정답이에요', esc(fb) + note); dSetSt(p.n, 'ok'); }
        else if (v === 'FAIL') { dVerdict(p.n, 'bad', '아직 아니에요', esc(fb) + note); dSetSt(p.n, 'bad'); }
        else { dVerdict(p.n, 'info', '거의 맞았어요', esc(fb) + note); }
      });
    }).catch(function (e) {
      if (my !== dGradeCtl[p.n] || (e && e.code === 'cancelled')) return;
      var c = e && e.code;
      dVerdict(p.n, 'bad', '채점하지 못했어요', c === 'not_granted' ? '권한을 허용하지 않아서 Claude를 쓸 수 없어요. ‘정답 확인’으로 비교해 보세요.' : (WB.claudeErrText(e) || '잠시 뒤 다시 시도해 주세요.'));
    }).then(function () { if (my === dGradeCtl[p.n]) btn.disabled = false; });
  }

  function dInitEvents() {
    [$('#view-tproblems'), $('#view-twrong')].forEach(function (view) {
      view.addEventListener('click', function (e) {
        var lb = e.target.closest('[data-tlevel]'); if (lb) { DS.lv = +lb.dataset.tlevel; dsave(); dShow(DS.ch); return; }
        var gb = e.target.closest('[data-tgo]'); if (gb) { dShow(+gb.dataset.tgo); window.scrollTo({ top: 0 }); return; }
        var cl = e.target.closest('[data-tconcept]'); if (cl) { e.preventDefault(); var ch = cl.dataset.tconcept; location.hash = 'tune'; setTimeout(function () { var t = document.getElementById('t-ch-' + ch); if (t) t.scrollIntoView({ block: 'start' }); }, 80); return; }
        var b = e.target.closest('[data-tact]'); if (!b) return;
        var card = b.closest('.card'), p = dbyN[card.dataset.tn], act = b.dataset.tact;
        if (act === 'grade') dGrade(p);
        else if (act === 'reveal') {
          var text = p.t === 'mc' ? '' : $('#tans-' + p.n).value;
          if (p.t !== 'mc') { DS.a[p.n] = text; }
          if (p.t === 'mc') $$('.choice', card).forEach(function (l, i) { l.classList.toggle('right', i === p.ans); });
          dReveal(p, text);
          if (DS.st[p.n] !== 'ok' && DS.st[p.n] !== 'bad') dSetSt(p.n, 'seen');
          if (p.t === 'self') dVerdict(p.n, 'info', '스스로 채점해요', '모범 답안과 키워드를 보고 아래에서 맞았는지 골라 주세요.');
        }
        else if (act === 'aigrade') dAiGrade(p, b);
        else if (act === 'markok') { dSetSt(p.n, 'ok'); dVerdict(p.n, 'ok', '맞았어요로 기록했어요', '다음 문제로 넘어가 보세요.'); }
        else if (act === 'markbad') { dSetSt(p.n, 'bad'); dVerdict(p.n, 'bad', '틀렸어요로 기록했어요', '해설을 다시 읽고 개념 정리 탭도 확인해 보세요.'); }
      });
      view.addEventListener('input', function (e) {
        var ta = e.target.closest('textarea[data-tn]'); if (!ta) return;
        var n = +ta.dataset.tn; DS.a[n] = ta.value;
        if (!DS.st[n] && ta.value.trim()) dSetSt(n, 'draft'); else if (DS.st[n] === 'draft' && !ta.value.trim()) dSetSt(n, null); else dsave();
      });
      view.addEventListener('change', function (e) {
        if (e.target.id === 'tstage-select') { dShow(+e.target.value); window.scrollTo({ top: 0 }); return; }
        var r = e.target.closest('input[type="radio"][name^="tc-"]'); if (r) { var n = +r.name.slice(3); DS.a[n] = +r.value; if (!DS.st[n]) dSetSt(n, 'draft'); else dsave(); }
      });
      view.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { var ta = e.target.closest('textarea[data-tn]'); if (ta) { e.preventDefault(); $('#tq-' + ta.dataset.tn + ' [data-tact="reveal"]').click(); } }
      });
    });
  }

  // ---------- 핵심 정리 검색 ----------
  function dWireSearch(doc, q, cntEl) {
    var rows = $$('tr', doc).filter(function (r) { return r.parentNode.tagName === 'TBODY'; });
    rows.forEach(function (r) { r.dataset.text = r.textContent.toLowerCase(); });
    q.addEventListener('input', function () {
      var t = q.value.trim().toLowerCase(), cnt = 0;
      $$('mark', doc).forEach(function (m) { m.replaceWith(document.createTextNode(m.textContent)); });
      doc.normalize();
      var e0 = $('.empty-search', doc); if (e0) e0.remove();
      if (!t) { $$('.hide', doc).forEach(function (x) { x.classList.remove('hide'); }); cntEl.textContent = ''; return; }
      var terms = t.split(/\s+/);
      rows.forEach(function (r) { var ok = terms.every(function (w) { return r.dataset.text.indexOf(w) >= 0; }); r.classList.toggle('hide', !ok); if (ok) { cnt++; mark(r, terms); } });
      $$('.tw', doc).forEach(function (tw) { tw.classList.toggle('hide', !$$('tbody tr', tw).some(function (r) { return !r.classList.contains('hide'); })); });
      $$('h2', doc).forEach(function (h2) { var el = h2.nextElementSibling, any = false; while (el && el.tagName !== 'H2' && el.tagName !== 'H1') { if (el.classList.contains('tw') && !el.classList.contains('hide')) any = true; el = el.nextElementSibling; } h2.classList.toggle('hide', !any); });
      $$('h1, p', doc).forEach(function (x) { x.classList.add('hide'); });
      if (!cnt) doc.insertAdjacentHTML('afterbegin', '<p class="empty-search">‘' + esc(q.value) + '’와(과) 맞는 항목이 없어요. 다른 낱말로 찾아보세요.</p>');
      cntEl.textContent = cnt ? cnt + '개' : '';
    });
  }

  // ---------- 오답노트 ----------
  Object.keys(DS.st).forEach(function (k) { if (DS.st[k] === 'bad' && !DS.wrong[k]) DS.wrong[k] = { c: 1, t: null }; });
  function dWrongList() { return Object.keys(DS.wrong).map(Number).filter(function (n) { return dbyN[n]; }); }
  function dFixed(n) { return DS.st[n] === 'ok'; }
  function dWrongBadge() {
    var open = dWrongList().filter(function (n) { return !dFixed(n); }).length, b = $('#twrong-n');
    if (b) { b.textContent = open || ''; b.hidden = !open; }
  }
  function dWrongCounts() {
    var all = dWrongList(), fixed = all.filter(dFixed).length;
    var set = function (k, v) { var el = $('#twn-cnt-' + k); if (el) el.textContent = v; };
    set('open', all.length - fixed); set('fixed', fixed); set('all', all.length);
  }
  function dWrongMarks(n) {
    var it = document.querySelector('.wn-item[data-twn="' + n + '"]'); if (!it) return;
    var w = DS.wrong[n] || {}; it.classList.toggle('fixed', dFixed(n));
    var c = it.querySelector('.wn-c'); if (c) c.textContent = '틀린 횟수 ' + (w.c || 1) + '번';
    var t = it.querySelector('.wn-t'); if (t) t.textContent = w.t ? '마지막 ' + WB.shortDate(w.t) : '';
    dWrongCounts();
  }
  function dRenderWrong() {
    var v = $('#twrong-view'); if (!v) return;
    $('#tstage-view').innerHTML = ''; // 같은 문제 카드가 두 곳에 생기지 않게
    var all = dWrongList(), fixed = all.filter(dFixed);
    var list = DS.wf === 'fixed' ? fixed : DS.wf === 'all' ? all : all.filter(function (n) { return !dFixed(n); });
    if (DS.ws === 'chapter') list.sort(function (a, b) { return dbyN[a].ch - dbyN[b].ch || a - b; });
    else list.sort(function (a, b) { return String((DS.wrong[b] || {}).t || '').localeCompare(String((DS.wrong[a] || {}).t || '')) || a - b; });
    var h = '<div class="stage-head"><div class="eyebrow">SQL 튜닝 · 오답노트</div><h2>오답노트</h2>' +
      '<p class="wn-sub">채점에서 틀렸거나 ‘틀렸어요’를 고른 문제가 자동으로 모여요. 여기서 바로 다시 풀 수 있고, 맞히면 ‘다시 맞힘’으로 옮겨져요.</p></div>';
    h += '<div class="lvbar wn-bar" role="group" aria-label="오답 보기">' +
      [['open', '아직 못 맞힘', all.length - fixed.length], ['fixed', '다시 맞힘', fixed.length], ['all', '전체', all.length]].map(function (x) {
        return '<button type="button" class="lvbtn" data-twf="' + x[0] + '" aria-pressed="' + (DS.wf === x[0]) + '">' + x[1] + ' <span id="twn-cnt-' + x[0] + '">' + x[2] + '</span></button>';
      }).join('') +
      '<label class="wn-sort">정렬 <select id="twn-sort"><option value="recent"' + (DS.ws === 'recent' ? ' selected' : '') + '>최근 틀린 순</option><option value="chapter"' + (DS.ws === 'chapter' ? ' selected' : '') + '>장 순서</option></select></label></div>';
    if (!all.length) h += '<div class="empty-lv">아직 틀린 문제가 없어요. 실습 문제를 풀다가 틀리면 여기에 모여요.</div>';
    else if (!list.length) h += '<div class="empty-lv">' + (DS.wf === 'open' ? '못 맞힌 문제를 모두 다시 맞혔어요. 잘했어요!' : '아직 다시 맞힌 문제가 없어요.') + '</div>';
    else {
      var lastCh = -1;
      h += '<div class="cards">';
      list.forEach(function (n) {
        var p = dbyN[n], c = DCH.filter(function (x) { return x.no === p.ch; })[0], w = DS.wrong[n] || {};
        if (DS.ws === 'chapter' && p.ch !== lastCh) { h += '<h3 class="sub-h wn-grp">' + esc(c.title) + '</h3>'; lastCh = p.ch; }
        h += '<div class="wn-item' + (dFixed(n) ? ' fixed' : '') + '" data-twn="' + n + '"><div class="wn-meta">' +
          '<span class="wn-where">' + chL(p.ch) + ' · ' + esc(c.short) + '</span><span class="wn-c">틀린 횟수 ' + (w.c || 1) + '번</span><span class="wn-t">' + (w.t ? '마지막 ' + WB.shortDate(w.t) : '') + '</span>' +
          '<span class="wn-ok">다시 맞힘</span><button type="button" class="wn-rm" data-twnrm="' + n + '">오답노트에서 빼기</button></div>' + dCard(p) + '</div>';
      });
      h += '</div>';
    }
    v.innerHTML = h;
  }
  document.addEventListener('click', function (e) {
    var f = e.target.closest('[data-twf]'); if (f) { DS.wf = f.dataset.twf; dsave(); dRenderWrong(); return; }
    var rm = e.target.closest('[data-twnrm]'); if (rm) { var n = +rm.dataset.twnrm; delete DS.wrong[n]; dsave(); var it = rm.closest('.wn-item'); if (it) it.remove(); dWrongCounts(); dWrongBadge(); }
  });
  document.addEventListener('change', function (e) { if (e.target.id === 'twn-sort') { DS.ws = e.target.value; dsave(); dRenderWrong(); } });
  var prevOnView = WB.onView;
  WB.onView = function (v) {
    if (prevOnView) prevOnView(v);
    if (v === 'twrong') dRenderWrong();
    else if (v === 'tproblems' && !$('#tstage-view').children.length) dShow(DS.ch);
  };

  // ---------- 기록 저장·불러오기 ----------
  function dMsg(t) { $('#tsync-msg').textContent = t; }
  function dPack() { return { app: 'tune-workbook', v: 1, savedAt: new Date().toISOString(), total: DP.length, a: DS.a, st: DS.st, wrong: DS.wrong, ch: DS.ch, lv: DS.lv }; }
  function dCount(o) { var a = o.a || {}; return Object.keys(o.st || {}).filter(function (k) { return o.st[k] !== 'draft'; }).length + ' 문제 기록, 답 ' + Object.keys(a).filter(function (k) { return typeof a[k] === 'number' || String(a[k] || '').trim(); }).length + '개'; }
  function dMakeCode() {
    var raw = new TextEncoder().encode(JSON.stringify(dPack()));
    if (window.CompressionStream) return pipe(raw, new CompressionStream('deflate-raw')).then(function (z) { return 'TUWB1z.' + b64(z); }).catch(function () { return 'TUWB1.' + b64(raw); });
    return Promise.resolve('TUWB1.' + b64(raw));
  }
  function dReadCode(text) {
    text = (text || '').trim();
    if (text.charAt(0) === '{') return Promise.resolve(JSON.parse(text));
    var m = /^TUWB1(z?)\.([A-Za-z0-9_-]+)$/.exec(text.replace(/\s+/g, ''));
    if (!m) return Promise.reject(new Error('form'));
    var bytes = unb64(m[2]);
    var pr = m[1] ? (window.DecompressionStream ? pipe(bytes, new DecompressionStream('deflate-raw')) : Promise.reject(new Error('old'))) : Promise.resolve(bytes);
    return pr.then(function (u) { return JSON.parse(new TextDecoder().decode(u)); });
  }
  function dApply(o) {
    if (!o || o.app !== 'tune-workbook' || typeof o.st !== 'object') throw new Error('form');
    var a = {}, st = {};
    Object.keys(o.a || {}).forEach(function (k) { if (dbyN[k]) a[k] = o.a[k]; });
    Object.keys(o.st || {}).forEach(function (k) { if (dbyN[k] && DSTL[o.st[k]]) st[k] = o.st[k]; });
    DS.a = a; DS.st = st; DS.ch = o.ch || 1; DS.lv = o.lv || 0;
    DS.wrong = {}; Object.keys(o.wrong || {}).forEach(function (k) { if (dbyN[k]) DS.wrong[k] = o.wrong[k]; });
    Object.keys(st).forEach(function (k) { if (st[k] === 'bad' && !DS.wrong[k]) DS.wrong[k] = { c: 1, t: null }; });
    dsave(); dMsg('불러왔어요. ' + dCount(DS) + '이 들어왔어요.');
    dShow(DS.ch); dRefresh(); if (location.hash === '#twrong') dRenderWrong();
  }
  function dConfirm(o) {
    if (!o || o.app !== 'tune-workbook') { dMsg('이 파일은 SQL 튜닝 워크북 기록이 아니에요. "파일로 저장"으로 만든 파일을 골라 주세요.'); return; }
    var empty = !Object.keys(DS.st).length && !Object.keys(DS.a).length;
    if (empty) { dApply(o); return; }
    dBox('', '불러오면 이 기기의 지금 SQL 튜닝 기록(' + dCount(DS) + ')이 불러온 기록(' + dCount(o) + ')으로 바뀌어요.', [['바꾸기', function () { dApply(o); dHide(); }], ['취소', dHide]], true);
  }
  function dBox(text, msg, acts, noText) {
    var box = $('#tsync-box'), ta = $('#tsync-text'), row = $('#tsync-box-act');
    box.hidden = false; ta.hidden = !!noText; ta.value = text || ''; dMsg(msg); row.innerHTML = '';
    acts.forEach(function (x, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'btn small' + (i ? ' ghost' : ''); b.textContent = x[0]; b.addEventListener('click', x[1]); row.appendChild(b); });
  }
  function dHide() { $('#tsync-box').hidden = true; }
  function dFileName() { var d = new Date(), z = function (n) { return (n < 10 ? '0' : '') + n; }; return 'tune-workbook-record-' + d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + '-' + z(d.getHours()) + z(d.getMinutes()) + '.json'; }
  function dInitSync() {
    $('#tsync-save').addEventListener('click', function () {
      var text = JSON.stringify(dPack(), null, 1), name = dFileName();
      dHide();
      (WB.downloads() || Promise.resolve(null)).then(function (dl) {
        if (dl) return dl.save({ filename: name, data: text }).then(function () { dMsg('파일로 저장했어요. 다른 기기에서 "파일 불러오기"로 열면 돼요.'); }, function (e) {
          if (e && e.code === 'declined') dMsg('저장을 취소했어요.');
          else dBox(text, '이 화면에서는 파일 저장이 안 돼요. 대신 "코드 만들기"를 써 주세요.', [['닫기', dHide]], true);
        });
        if (plainDownload(name, text)) dMsg('파일로 저장했어요. 다운로드 폴더를 확인하고, 다른 기기에서 "파일 불러오기"로 열면 돼요.');
        else dMsg('이 화면에서는 파일 저장이 안 돼요. "코드 만들기"를 써 주세요.');
      });
    });
    $('#tto-sync').addEventListener('click', function () { var p = $('#tpanel-sync'); p.classList.add('open'); p.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); });
    $('#tsync-load').addEventListener('click', function () { $('#tsync-file').value = ''; $('#tsync-file').click(); });
    $('#tsync-file').addEventListener('change', function () {
      var f = this.files && this.files[0]; if (!f) return;
      f.text().then(dReadCode).then(dConfirm).catch(function () { dMsg('이 파일은 SQL 튜닝 워크북 기록이 아니에요. "파일로 저장"으로 만든 파일을 골라 주세요.'); });
    });
    $('#tsync-code').addEventListener('click', function () {
      dMakeCode().then(function (code) {
        var copy = function () {
          var ta = $('#tsync-text'); ta.focus(); ta.select();
          var ok = function () { dMsg('복사했어요. 메신저나 메모로 다른 기기에 보낸 뒤, 거기서 "코드 붙여넣기"에 붙여 넣으세요.'); };
          var manual = function () { try { document.execCommand('copy') ? ok() : dMsg('위 코드를 직접 복사해 주세요.'); } catch (e) { dMsg('위 코드를 직접 복사해 주세요.'); } };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code).then(ok, manual); else manual();
        };
        dBox(code, '내 SQL 튜닝 기록(' + dCount(DS) + ')을 담은 코드예요. 복사해서 다른 기기로 보내세요.', [['복사하기', copy], ['닫기', dHide]]);
        $('#tsync-text').readOnly = true;
      });
    });
    $('#tsync-paste').addEventListener('click', function () {
      dBox('', '다른 기기에서 만든 코드를 아래에 붙여 넣고 "불러오기"를 누르세요.', [['불러오기', function () {
        dReadCode($('#tsync-text').value).then(dConfirm).catch(function () { dMsg('코드를 읽지 못했어요. "TUWB1"로 시작하는 코드 전체를 빠짐없이 붙여 넣었는지 확인해 주세요.'); });
      }], ['닫기', dHide]]);
      $('#tsync-text').readOnly = false; $('#tsync-text').focus();
    });
  }

  function initTune() {
    $('#doc-tune').innerHTML = WTU.concepts;
    buildToc($('#doc-tune'), $('#toc-tune'), 'h1, h2');
    $('#doc-tcheat').innerHTML = WTU.cheat;
    buildToc($('#doc-tcheat'), $('#toc-tcheat'), 'h1, h2');
    dWireSearch($('#doc-tcheat'), $('#tcheat-q'), $('#tcheat-cnt'));
    dBuildRail(); dInitEvents(); dInitSync(); dShow(DS.ch);
  }
  WB.initTune = initTune;
})();
