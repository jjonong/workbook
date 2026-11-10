/* JAVA 실습 문제 · 기록 저장/불러오기 · Java 연습장 · Claude 채점 */
(function () {
  'use strict';
  var $ = WB.$, $$ = WB.$$, esc = WB.esc, mark = WB.mark, buildToc = WB.buildToc, b64 = WB.b64, unb64 = WB.unb64,
      pipe = WB.pipe, whenStr = WB.whenStr, plainDownload = WB.plainDownload;

  // ---------- Java 문법 색칠 ----------
  var JKW = Object.create(null);
  ('abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if ' +
   'implements import instanceof int interface long native new package private protected public return short static strictfp super switch ' +
   'synchronized this throw throws transient try void volatile while var yield record sealed permits non-sealed module requires exports opens true false null')
    .split(' ').forEach(function (w) { JKW[w] = 1; });
  var JTOK = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(@\w+)|\b(\d[\d_]*\.?\d*[LlFfDd]?)\b|([A-Za-z_][\w-]*)/g;
  function hx(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function hlJava(code) {
    var out = '', pos = 0, m;
    JTOK.lastIndex = 0;
    while ((m = JTOK.exec(code))) {
      out += hx(code.slice(pos, m.index)); pos = JTOK.lastIndex;
      var t = m[0], e = hx(t);
      if (m[1]) out += '<span class="hl-com">' + e + '</span>';
      else if (m[2]) out += '<span class="hl-str">' + e + '</span>';
      else if (m[3]) out += '<span class="hl-fn">' + e + '</span>';
      else if (m[4]) out += '<span class="hl-num">' + e + '</span>';
      else if (JKW[t]) out += '<span class="hl-kw">' + e + '</span>';
      else if (t.indexOf('-') >= 0) out += t.split('-').map(function (p) { return JKW[p] ? '<span class="hl-kw">' + p + '</span>' : hx(p); }).join('-');
      else out += e;
    }
    return out + hx(code.slice(pos));
  }

  // ---------- JAVA: 실습 문제 & 핵심 정리 ----------
  var JKEY = 'javawb:v1';
  var JS = { ch: 1, lv: 0, a: {}, st: {}, wrong: {}, wf: 'open', ws: 'recent' };
  try { var jraw = localStorage.getItem(JKEY); if (jraw) { var jo = JSON.parse(jraw); if (jo && typeof jo === 'object') { JS.ch = jo.ch || 1; JS.lv = jo.lv || 0; JS.a = jo.a || {}; JS.st = jo.st || {}; JS.wrong = jo.wrong || {}; JS.wf = jo.wf || 'open'; JS.ws = jo.ws || 'recent'; } } } catch (e) {}
  var jsaveT;
  function jsave() { clearTimeout(jsaveT); jsaveT = setTimeout(function () { try { localStorage.setItem(JKEY, JSON.stringify(JS)); } catch (e) {} }, 250); }
  var JLV = { 1: '기초', 2: '응용', 3: '심화' };
  var JMODE = { mc: '객관식 · 자동 채점', out: '출력 결과 · 자동 채점', self: '직접 작성 · 스스로 채점' };
  var JSTL = { ok: '정답', bad: '오답', seen: '답만 확인', draft: '작성 중' };
  var JP = WJX.problems, JCH = WJX.chapters;
  // 문제 데이터에는 코드가 일반 텍스트로 들어 있어요. 화면에 그릴 때 색을 입혀요.
  var JFEAT = {}, JDF = {};
  var JREC_STOP = { public: 1, static: 1, void: 1, int: 1, class: 1, new: 1, return: 1, String: 1, System: 1, out: 1, println: 1, print: 1, main: 1, args: 1, Main: 1, i: 1, j: 1, n: 1, a: 1, b: 1, s: 1, x: 1, y: 1, p: 1, e: 1, c: 1, t: 1, k: 1, v: 1 };
  JP.forEach(function (p) {
    // 연관 문제 추천용 특징: 코드·답안에 쓰인 식별자와 키워드, 문제 글의 <code> 안 낱말
    var f = {}, src = (p.code || '') + '\n' + (p.t === 'self' ? p.answer : '') + '\n' + (String(p.q).match(/<code>[\s\S]*?<\/code>/g) || []).join(' ').replace(/<[^>]+>/g, ' ');
    (src.match(/[A-Za-z_][\w]*/g) || []).forEach(function (w) { if (w.length > 1 && !JREC_STOP[w]) f[w] = 1; });
    (p.kw || []).forEach(function (k) { (String(k).match(/[A-Za-z_][\w.]*/g) || []).forEach(function (w) { if (!JREC_STOP[w]) f[w] = 1; }); });
    JFEAT[p.n] = f; Object.keys(f).forEach(function (w) { JDF[w] = (JDF[w] || 0) + 1; });
    p.code = p.code ? hlJava(p.code) : '';
    if (p.t === 'self') p.answer = hlJava(p.answer);
  });
  var jbyN = {}; JP.forEach(function (p) { jbyN[p.n] = p; });
  function jOfCh(ch) { return JP.filter(function (p) { return p.ch === ch; }); }
  function jSetSt(n, st) {
    var prev = JS.st[n];
    if (st) JS.st[n] = st; else delete JS.st[n];
    if (st === 'bad') { var w = JS.wrong[n] || (JS.wrong[n] = { c: 0 }); w.c++; w.t = new Date().toISOString(); delete w.ok; }
    if (st === 'ok' && JS.wrong[n] && prev !== 'ok') JS.wrong[n].ok = new Date().toISOString();
    jsave(); jRefresh(); jShowRec(n, st === 'bad'); jWrongMarks(n); var s = $('#jq-' + n + ' .status'); if (s) { s.dataset.st = st || ''; s.textContent = st ? JSTL[st] : ''; } }
  function jNorm(s) { return String(s || '').replace(/\r/g, '').split('\n').map(function (l) { return l.replace(/\s+$/, ''); }).join('\n').replace(/^\n+|\n+$/g, ''); }
  function jFlat(s) { return String(s || '').replace(/\s+/g, ''); }

  function jRefresh() {
    jWrongBadge();
    var ok = 0, done = 0;
    JP.forEach(function (p) { var s = JS.st[p.n]; if (s === 'ok') ok++; if (s === 'ok' || s === 'bad') done++; });
    $('#jst-ok').textContent = ok; $('#jst-done').textContent = done; $('#jst-total').textContent = '푼 문제 / ' + JP.length;
    $$('#jdots .dot').forEach(function (d) { var s = JS.st[d.dataset.jn] || ''; d.dataset.st = s; });
    JCH.forEach(function (c) {
      var ps = jOfCh(c.no), k = { ok: 0, bad: 0, seen: 0 };
      ps.forEach(function (p) { var s = JS.st[p.n]; if (k[s] != null) k[s]++; });
      var g = $('#jdg-' + c.no); if (!g) return;
      $('.dg-c', g).textContent = (k.ok + k.bad) + '/' + ps.length;
      $('.dg-bar', g).innerHTML = ['ok', 'bad', 'seen'].map(function (t) { return k[t] ? '<i class="b-' + t + '" style="width:' + (k[t] / ps.length * 100) + '%"></i>' : ''; }).join('');
      var sb = $('#jstages [data-jstage="' + c.no + '"] .sc'); if (sb) sb.textContent = (k.ok + k.bad) + '/' + ps.length;
    });
  }

  function jBuildRail() {
    var h = '';
    JCH.forEach(function (c) {
      var dots = jOfCh(c.no).map(function (p) { return '<button type="button" class="dot" data-jn="' + p.n + '" title="' + p.n + '번 · ' + JLV[p.lv] + '" aria-label="' + p.n + '번 문제로 이동"></button>'; }).join('');
      h += '<details class="dgrp" id="jdg-' + c.no + '"' + (c.no === JS.ch ? ' open' : '') + '><summary><span class="dg-n">' + c.no + '장</span><span class="dg-t">' + esc(c.short) + '</span><span class="dg-c"></span><span class="dg-bar"></span></summary><div class="dots">' + dots + '</div></details>';
    });
    $('#jdots').innerHTML = h;
    $('#jstages').innerHTML = JCH.map(function (c) { return '<li><button type="button" data-jstage="' + c.no + '"><span class="sn">' + c.no + '</span>' + esc(c.short) + '<span class="sc"></span></button></li>'; }).join('');
    $('#jdots').addEventListener('click', function (e) { var b = e.target.closest('.dot'); if (b) jGoto(+b.dataset.jn); });
    $('#jstages').addEventListener('click', function (e) { var b = e.target.closest('[data-jstage]'); if (b) { jShow(+b.dataset.jstage); window.scrollTo({ top: 0 }); } });
    $('#jdg-open').addEventListener('click', function () { $$('#jdots details').forEach(function (d) { d.open = true; }); });
    $('#jdg-close').addEventListener('click', function () { $$('#jdots details').forEach(function (d) { d.open = false; }); });
    $('#jclear').addEventListener('click', function () { $('#jclear-confirm').hidden = false; });
    $('#jclear-no').addEventListener('click', function () { $('#jclear-confirm').hidden = true; });
    $('#jclear-yes').addEventListener('click', function () { JS.a = {}; JS.st = {}; JS.wrong = {}; jsave(); $('#jclear-confirm').hidden = true; jShow(JS.ch); jRefresh(); });
    if (window.matchMedia('(max-width: 960px)').matches) { $('#jpanel-progress').classList.remove('open'); $('#jpanel-data').classList.remove('open'); }
  }

  function jCard(p) {
    var st = JS.st[p.n] || '', saved = JS.a[p.n];
    var h = '<article class="card" id="jq-' + p.n + '" data-jn="' + p.n + '">' +
      '<div class="card-h"><span class="pnum">' + p.n + '</span><span class="mode' + (p.t === 'self' ? '' : ' auto') + '">' + JMODE[p.t] + '</span>' +
      '<span class="lv-chip"><i class="lvdot lv' + p.lv + '"></i>' + JLV[p.lv] + '</span>' +
      '<span class="status" data-st="' + st + '">' + (st ? JSTL[st] : '') + '</span></div>' +
      '<div class="q">' + p.q + (p.kind ? jSpec(p) : (p.code ? '<pre class="code"><code>' + p.code + '</code></pre>' : '')) + '</div>';
    if (p.t === 'mc') {
      h += '<div class="choices" role="radiogroup" aria-label="' + p.n + '번 보기">' + p.choices.map(function (c, i) {
        return '<label class="choice"><input type="radio" name="jc-' + p.n + '" value="' + i + '"' + (saved === i ? ' checked' : '') + '><span><b class="cno">' + '①②③④⑤'[i] + '</b> ' + c + '</span></label>';
      }).join('') + '</div>';
      h += '<div class="actions"><button class="btn primary" type="button" data-jact="grade">채점하기</button><button class="btn ghost" type="button" data-jact="reveal">정답 보기</button></div>';
    } else {
      var gut = p.t === 'out' ? '출력&gt;' : 'Java&gt;';
      var ph = p.t === 'out' ? '실행했을 때 화면에 나오는 결과를 그대로 써 보세요 (줄바꿈 포함)' : (JKPH[p.kind] || '코드나 답을 써 보세요');
      h += '<div class="editor"><span class="gut" aria-hidden="true">' + gut + '</span><textarea id="jans-' + p.n + '" data-jn="' + p.n + '" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="' + p.n + '번 답안" placeholder="' + ph + '">' + esc(typeof saved === 'string' ? saved : '') + '</textarea></div>';
      h += '<div class="actions">' + (p.t === 'out'
        ? '<button class="btn primary" type="button" data-jact="grade">채점하기 <kbd>Ctrl+Enter</kbd></button><button class="btn ghost" type="button" data-jact="reveal">정답 보기</button>'
        : '<button class="btn primary" type="button" data-jact="reveal">정답 확인</button>' +
          '<button class="btn" type="button" data-jact="aigrade" title="Claude가 내 코드를 읽고 채점해요">Claude에게 채점받기</button>' +
          (p.kind ? '<button class="btn ghost" type="button" data-jact="myrun" title="내 코드에 사용 예를 붙여 Java 연습장에서 실행해요">연습장에서 실행</button>' : '')) + '</div>';
    }
    h += '<div class="out" id="jout-' + p.n + '"></div><div class="sol" id="jsol-' + p.n + '" hidden></div></article>';
    return h;
  }

  function jSol(p, userText) {
    var h = '<h4>정답과 해설</h4>';
    if (p.t === 'mc') h += '<div class="exp"><p><b>정답: ' + '①②③④⑤'[p.ans] + '</b></p><p>' + p.exp + '</p></div>';
    else if (p.t === 'out') h += '<pre class="code">' + esc(p.ans) + '</pre>' + (p.exp ? '<div class="exp"><p>' + p.exp + '</p></div>' : '');
    else {
      var flat = jFlat(userText).toLowerCase();
      h += '<pre class="code"><code>' + p.answer + '</code></pre>';
      if (p.kw && p.kw.length) h += '<div><div class="res-label">핵심 키워드' + (flat ? ' · 내 답에 들어간 것은 진하게 표시돼요' : '') + '</div><div class="kw">' + p.kw.map(function (k) {
        var hit = flat && flat.indexOf(jFlat(k).toLowerCase()) >= 0;
        return '<span class="' + (flat ? (hit ? 'hit' : 'miss') : '') + '">' + esc(k) + '</span>';
      }).join('') + '</div></div>';
      h += '<div class="exp"><p>' + p.exp + '</p></div>';
      h += '<div class="selfmark"><span>내 답은?</span><button class="btn small" type="button" data-jact="markok">맞았어요</button><button class="btn small" type="button" data-jact="markbad">틀렸어요</button></div>';
    }
    if (p.code || p.kind) h += '<div class="actions" style="padding-left:0"><button class="btn small ghost" type="button" data-jact="toscratch">' + (p.kind ? '모범 답안을 Java 연습장에서 실행해 보기' : '이 코드를 Java 연습장에서 바꿔 보기') + '</button></div>';
    return h;
  }

  var JKPH = { b: 'main 안에 들어갈 문장을 써 보세요', m: 'static 메서드를 써 보세요 (main은 쓰지 않아도 돼요)', c: '클래스·인터페이스 선언을 써 보세요 (main은 쓰지 않아도 돼요)' };
  function jSpec(p) {
    var h = '';
    if (p.code) h += '<div class="res-label jspec-l">사용 예</div><pre class="code"><code>' + p.code + '</code></pre>';
    if (p.demo != null) h += '<div class="res-label jspec-l">' + (p.code ? '위 사용 예를 실행하면' : '실행 결과') + '</div><pre class="code jdemo">' + esc(p.demo) + '</pre>';
    return h;
  }
  function jText(html) { var d = document.createElement('div'); d.innerHTML = html; return d.textContent; }
  var JIMPORTS = ['java.util', 'java.util.function', 'java.util.concurrent', 'java.util.concurrent.atomic', 'java.util.concurrent.locks', 'java.time', 'java.time.format', 'java.time.temporal', 'java.text', 'java.math', 'java.util.regex', 'java.lang.annotation', 'java.lang.reflect'];
  function jInd(t, n) { var sp = new Array(n + 1).join(' '); return t.split('\n').map(function (l) { return l ? sp + l : l; }).join('\n'); }
  // 답안 + 사용 예를 실행 가능한 프로그램 하나로 합친다 (채점 검증에 쓴 것과 같은 방식)
  function jProgram(p, code) {
    code = code.replace(/\s+$/, '');
    if (/class\s+Main\b/.test(code)) return code;
    var use = p.code ? jText(p.code) : '';
    var imp = JIMPORTS.map(function (x) { return 'import ' + x + '.*;'; }).join('\n') + '\n\n';
    var head = 'public class Main {\n', main = '    public static void main(String[] args) throws Exception {\n';
    if (p.kind === 'b') return imp + head + main + jInd(code, 8) + '\n    }\n}';
    if (p.kind === 'm') return imp + head + jInd(code, 4) + '\n\n' + main + jInd(use, 8) + '\n    }\n}';
    return imp + code + '\n\n' + head + main + jInd(use, 8) + '\n    }\n}';
  }

  // ---------- JAVA: Claude 채점 (sample capability) ----------
  var jSampleP = null, jGradeCtl = {};
  function jGetSample() { return WB.getSample(); } // claude.ai의 Claude, 또는 내가 넣은 API 키
  function jAiGrade(p, btn) {
    var mine = $('#jans-' + p.n).value;
    JS.a[p.n] = mine; jsave();
    if (!mine.trim()) { jVerdict(p.n, 'info', '답을 먼저 써 주세요', '코드를 쓴 뒤 채점받기를 눌러요.'); return; }
    if (jGradeCtl[p.n]) jGradeCtl[p.n].abort();
    var my = jGradeCtl[p.n] = new AbortController();
    btn.disabled = true;
    jVerdict(p.n, 'info', 'Claude가 채점하는 중…', '코드를 읽고 문제 조건과 실행 결과를 따져 보고 있어요.');
    var task = [
      'You are grading a Korean student\'s Java 21 practice answer. Decide whether the STUDENT CODE correctly solves the TASK.',
      'Rules:',
      '- Read the task requirements carefully, including restrictions such as "without StringBuilder" or "use a for loop".',
      p.kind ? '- The student code is placed ' + ({ b: 'inside main()', m: 'as static members of class Main, then the USAGE runs in main()', c: 'before class Main, then the USAGE runs in main()' })[p.kind] + '. All of java.util, java.time, java.text, java.math, java.util.concurrent(.*), java.util.function, java.util.regex, java.lang.annotation, java.lang.reflect are imported.' : '- This is a written/self-check question; judge the content against the model answer.',
      '- Mentally compile and run it. Any compile error, wrong output, crash, infinite loop, or violated restriction means it is not a PASS.',
      '- Different but correct approaches, variable names, formatting or style are fine and must PASS.',
      '- PARTIAL means mostly right with a small bug or a missed edge case.',
      'Answer in exactly this format and nothing else:',
      'VERDICT: <PASS | PARTIAL | FAIL>',
      '---FEEDBACK---',
      '<2 to 4 short sentences IN KOREAN (해요체). Say what is right, and for PARTIAL/FAIL point to the exact problem (quote the line) and a hint to fix it. Do NOT paste the full model answer.>',
      '',
      'TASK:', jText(p.q),
      p.code ? 'USAGE:\n' + jText(p.code) : '',
      p.demo != null ? 'EXPECTED OUTPUT:\n' + p.demo : '',
      'MODEL ANSWER (for reference only):\n' + jText(p.answer),
      'STUDENT CODE:\n<<<\n' + mine + '\n>>>'
    ].filter(Boolean).join('\n');
    jGetSample().then(function (sample) {
      if (!sample) { jVerdict(p.n, 'info', '여기서는 Claude 채점을 쓸 수 없어요', WB.NO_CLAUDE + ' 지금은 ‘정답 확인’으로 모범 답안과 비교해 보세요.'); return; }
      return sample(task, { signal: my.signal, modelTier: 'default', cache: false }).then(function (res) {
        if (my !== jGradeCtl[p.n]) return;
        var t = res.text || '', m = /VERDICT:\s*(PASS|PARTIAL|FAIL)/.exec(t), v = m ? m[1] : 'PARTIAL';
        var fi = t.indexOf('---FEEDBACK---'), fb = (fi >= 0 ? t.slice(fi + 14) : t.replace(/VERDICT:.*\n?/, '')).trim();
        var note = '<span class="jnote" style="display:block;margin-top:4px">Claude가 코드를 읽고 판단한 결과예요. 실제로 실행한 채점은 아니에요.</span>';
        if (v === 'PASS') { jVerdict(p.n, 'ok', '정답이에요', esc(fb) + note); jSetSt(p.n, 'ok'); }
        else if (v === 'FAIL') { jVerdict(p.n, 'bad', '아직 아니에요', esc(fb) + note); jSetSt(p.n, 'bad'); }
        else { jVerdict(p.n, 'info', '거의 맞았어요', esc(fb) + note); }
      });
    }).catch(function (e) {
      if (my !== jGradeCtl[p.n] || (e && e.code === 'cancelled')) return;
      var c = e && e.code;
      jVerdict(p.n, 'bad', '채점하지 못했어요', c === 'not_granted' ? '권한을 허용하지 않아서 Claude를 쓸 수 없어요. ‘정답 확인’으로 비교해 보세요.' : (WB.claudeErrText(e) || '잠시 뒤 다시 시도해 주세요.'));
    }).then(function () { if (my === jGradeCtl[p.n]) btn.disabled = false; });
  }

  function jShow(ch) {
    if (!JCH.some(function (c) { return c.no === ch; })) ch = 1;
    JS.ch = ch; jsave();
    var c = JCH.filter(function (x) { return x.no === ch; })[0], all = jOfCh(ch);
    var cnt = { 0: all.length, 1: 0, 2: 0, 3: 0 }; all.forEach(function (p) { cnt[p.lv]++; });
    var list = JS.lv ? all.filter(function (p) { return p.lv === JS.lv; }) : all;
    var h = '<label class="stage-pick">장 고르기<select id="jstage-select">' + JCH.map(function (x) { return '<option value="' + x.no + '"' + (x.no === ch ? ' selected' : '') + '>' + x.no + '장 ' + esc(x.short) + '</option>'; }).join('') + '</select></label>';
    h += '<div class="stage-head"><div class="eyebrow">JAVA · ' + ch + '장 · ' + all.length + '문제</div><h2>' + esc(c.title) + '</h2>' +
      '<a href="#java" class="concept-link" data-jconcept="' + ch + '">이 장의 개념 정리 보기 →</a></div>';
    h += '<div class="lvbar"><span class="lvbar-l">난이도</span>' + [0, 1, 2, 3].map(function (l) {
      return '<button type="button" class="lvbtn" data-jlevel="' + l + '" aria-pressed="' + (JS.lv === l) + '">' + (l ? '<i class="lvdot lv' + l + '"></i>' + JLV[l] : '전체') + ' <span>' + cnt[l] + '</span></button>';
    }).join('') + '</div>';
    h += list.length ? '<div class="cards">' + list.map(jCard).join('') + '</div>' : '<div class="empty-lv">이 장에는 이 난이도의 문제가 없어요.</div>';
    var prev = JCH.filter(function (x) { return x.no === ch - 1; })[0], next = JCH.filter(function (x) { return x.no === ch + 1; })[0];
    h += '<div class="pager">' + (prev ? '<button class="btn" type="button" data-jgo="' + prev.no + '">← ' + prev.no + '장 ' + esc(prev.short) + '</button>' : '<span></span>') +
      (next ? '<button class="btn" type="button" data-jgo="' + next.no + '">' + next.no + '장 ' + esc(next.short) + ' →</button>' : '') + '</div>';
    $('#jstage-view').innerHTML = h;
    $$('#jstages [data-jstage]').forEach(function (b) { b.setAttribute('aria-current', +b.dataset.jstage === ch ? 'true' : 'false'); });
    $$('#jdots details').forEach(function (d) { d.classList.toggle('cur', d.id === 'jdg-' + ch); });
    $$('#jdots .dot').forEach(function (d) { var p = jbyN[d.dataset.jn]; d.classList.toggle('dim', !!(JS.lv && p.ch === ch && p.lv !== JS.lv)); });
    jRefresh();
  }

  function jGoto(n) {
    var p = jbyN[n]; if (!p) return;
    if (location.hash !== '#jproblems') location.hash = 'jproblems';
    if (JS.lv && p.lv !== JS.lv) JS.lv = 0;
    jShow(p.ch);
    setTimeout(function () { var el = $('#jq-' + n); if (el) { el.scrollIntoView({ block: 'start' }); el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); } }, 60);
  }

  function jVerdict(n, cls, title, msg) { $('#jout-' + n).innerHTML = '<div class="verdict ' + cls + '"><b>' + title + '</b><span>' + msg + '</span></div>'; }
  function jReveal(p, text) { var s = $('#jsol-' + p.n); s.innerHTML = jSol(p, text); s.hidden = false; }

  function jGrade(p) {
    var card = $('#jq-' + p.n);
    if (p.t === 'mc') {
      var sel = $('input[name="jc-' + p.n + '"]:checked', card);
      if (!sel) { jVerdict(p.n, 'info', '보기를 골라 주세요', '하나를 고른 뒤 채점하기를 눌러요.'); return; }
      var v = +sel.value; JS.a[p.n] = v;
      $$('.choice', card).forEach(function (l, i) { l.classList.toggle('right', i === p.ans); l.classList.toggle('wrong', i === v && v !== p.ans); });
      if (v === p.ans) { jVerdict(p.n, 'ok', '정답이에요', '해설도 확인해 보세요.'); jSetSt(p.n, 'ok'); }
      else { jVerdict(p.n, 'bad', '오답이에요', '정답은 ' + '①②③④⑤'[p.ans] + '번이에요.'); jSetSt(p.n, 'bad'); }
      jReveal(p);
      return;
    }
    var ta = $('#jans-' + p.n), u = ta.value;
    JS.a[p.n] = u; jsave();
    if (!u.trim()) { jVerdict(p.n, 'info', '답을 먼저 써 주세요', '실행 결과를 화면에 나오는 그대로, 한 줄씩 써요.'); return; }
    var a = jNorm(u), b = jNorm(p.ans);
    if (a === b) { jVerdict(p.n, 'ok', '정답이에요', '출력 결과가 정확히 같아요.'); jSetSt(p.n, 'ok'); }
    else if (jFlat(a) === jFlat(b)) { jVerdict(p.n, 'ok', '정답이에요', '값은 모두 맞고 띄어쓰기나 줄바꿈만 조금 달라요.'); jSetSt(p.n, 'ok'); }
    else {
      var ul = a.split('\n'), al = b.split('\n'), i = 0;
      while (i < Math.max(ul.length, al.length) && ul[i] === al[i]) i++;
      var why = i >= ul.length ? (i + 1) + '번째 줄부터 출력이 더 있어요.' : (i >= al.length ? '출력이 ' + al.length + '줄에서 끝나야 해요.' : (i + 1) + '번째 줄이 달라요. 내 답: <code>' + esc(ul[i]) + '</code>');
      jVerdict(p.n, 'bad', '오답이에요', why); jSetSt(p.n, 'bad');
    }
    jReveal(p, u);
  }

  function jInitEvents() {
    [$('#view-jproblems'), $('#view-jwrong')].forEach(function (view) {
    view.addEventListener('click', function (e) {
      var lb = e.target.closest('[data-jlevel]'); if (lb) { JS.lv = +lb.dataset.jlevel; jsave(); jShow(JS.ch); return; }
      var gb = e.target.closest('[data-jgo]'); if (gb) { jShow(+gb.dataset.jgo); window.scrollTo({ top: 0 }); return; }
      var cl = e.target.closest('[data-jconcept]'); if (cl) { e.preventDefault(); var ch = cl.dataset.jconcept; location.hash = 'java'; setTimeout(function () { var t = document.getElementById('j-ch-' + ch); if (t) t.scrollIntoView({ block: 'start' }); }, 80); return; }
      var b = e.target.closest('[data-jact]'); if (!b) return;
      var card = b.closest('.card'), p = jbyN[card.dataset.jn], act = b.dataset.jact;
      if (act === 'grade') jGrade(p);
      else if (act === 'reveal') {
        var text = p.t === 'mc' ? '' : $('#jans-' + p.n).value;
        if (p.t !== 'mc') { JS.a[p.n] = text; }
        if (p.t === 'mc') $$('.choice', card).forEach(function (l, i) { l.classList.toggle('right', i === p.ans); });
        jReveal(p, text);
        if (JS.st[p.n] !== 'ok' && JS.st[p.n] !== 'bad') jSetSt(p.n, 'seen');
        if (p.t === 'self') jVerdict(p.n, 'info', '스스로 채점해요', '모범 답안과 키워드를 보고 아래에서 맞았는지 골라 주세요.');
      }
      else if (act === 'toscratch') {
        if (!jScratchOpen) return;
        if (p.kind) jScratchOpen(jProgram(p, jText(p.answer)));
        else { var pre = $('.q pre.code', card); if (pre) jScratchOpen(pre.textContent.replace(/\n+$/, '')); }
      }
      else if (act === 'myrun') {
        var mine = $('#jans-' + p.n).value;
        if (!mine.trim()) { jVerdict(p.n, 'info', '코드를 먼저 써 주세요', '쓴 코드에 사용 예를 붙여서 연습장에서 실행해 줘요.'); return; }
        if (jScratchOpen) jScratchOpen(jProgram(p, mine), true);
      }
      else if (act === 'aigrade') jAiGrade(p, b);
      else if (act === 'markok') { jSetSt(p.n, 'ok'); jVerdict(p.n, 'ok', '맞았어요로 기록했어요', '다음 문제로 넘어가 보세요.'); }
      else if (act === 'markbad') { jSetSt(p.n, 'bad'); jVerdict(p.n, 'bad', '틀렸어요로 기록했어요', '해설을 다시 읽고 개념 정리 탭도 확인해 보세요.'); }
    });
    view.addEventListener('input', function (e) {
      var ta = e.target.closest('textarea[data-jn]'); if (!ta) return;
      var n = +ta.dataset.jn; JS.a[n] = ta.value;
      if (!JS.st[n] && ta.value.trim()) jSetSt(n, 'draft'); else if (JS.st[n] === 'draft' && !ta.value.trim()) jSetSt(n, null); else jsave();
    });
    view.addEventListener('change', function (e) {
      if (e.target.id === 'jstage-select') { jShow(+e.target.value); window.scrollTo({ top: 0 }); return; }
      var r = e.target.closest('input[type="radio"][name^="jc-"]'); if (r) { var n = +r.name.slice(3); JS.a[n] = +r.value; if (!JS.st[n]) jSetSt(n, 'draft'); else jsave(); }
    });
    view.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { var ta = e.target.closest('textarea[data-jn]'); if (ta) { e.preventDefault(); var p = jbyN[ta.dataset.jn]; if (p.t === 'out') jGrade(p); else $('#jq-' + p.n + ' [data-jact="reveal"]').click(); } }
    });
    });
  }

  function jWireSearch(doc, q, cntEl) {
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
      if (!cnt) doc.insertAdjacentHTML('afterbegin', '<p class="empty-search">‘' + esc(q.value) + '’와(과) 맞는 항목이 없어요. 다른 낱말이나 클래스 이름으로 찾아보세요.</p>');
      cntEl.textContent = cnt ? cnt + '개' : '';
    });
  }

  // ---------- 연관 문제 추천 ----------
  Object.keys(JS.st).forEach(function (k) { if (JS.st[k] === 'bad' && !JS.wrong[k]) JS.wrong[k] = { c: 1, t: null }; });
  function jIdf(w) { return Math.log(JP.length / (JDF[w] || 1)); }
  function jRelated(n, k) {
    var me = JFEAT[n] || {}, src = jbyN[n], out = [];
    JP.forEach(function (p) {
      if (p.n === n) return;
      var f = JFEAT[p.n], shared = Object.keys(me).filter(function (w) { return f[w]; });
      var sc = shared.reduce(function (t, w) { return t + Math.min(jIdf(w), 4); }, 0);
      if (p.ch === src.ch) sc += 2.5;
      if (sc <= 2) return;
      if (p.lv === src.lv) sc += .6; else if (p.lv < src.lv) sc += .3;
      if (p.t === src.t) sc += .4;
      var st = JS.st[p.n]; if (st === 'ok') sc -= 3; else if (st === 'bad') sc -= .5;
      shared.sort(function (a, b) { return jIdf(b) - jIdf(a); });
      out.push({ n: p.n, sc: sc, why: shared.filter(function (w) { return JDF[w] > 1; }).slice(0, 3), sub: p.ch === src.ch });
    });
    out.sort(function (a, b) { return b.sc - a.sc || a.n - b.n; });
    return out.slice(0, k || 3);
  }
  function jRecText(p) {
    if (p.t !== 'out') return WB.snippet(p.q, 64);
    var lines = jText(p.code).split('\n').map(function (l) { return l.trim(); }).filter(function (l) {
      return l && !/^(public\s+)?(static\s+)?(class\s+Main|void\s+main|public static void main)|^[{}]+$|^import\s/.test(l);
    });
    return '출력 결과 맞히기 · ' + (lines && lines.length ? lines[0].slice(0, 56) : '코드 실행 결과');
  }
  // 틀린 문제 → Claude가 만든 새 객관식 문제로 다시 연습 (claude.ai에서만)
  function jGenPrompt(n) {
    var p = jbyN[n], c = JCH.filter(function (x) { return x.no === p.ch; })[0], mine = JS.a[n];
    var model = p.t === 'mc' ? '정답 보기: ' + jText(p.choices[p.ans]) : p.t === 'out' ? 'Correct output:\n' + p.ans : jText(p.answer || '');
    var studentSaid = p.t === 'mc' ? (typeof mine === 'number' && p.choices[mine] != null ? 'Student picked: ' + jText(p.choices[mine]) : '') : (typeof mine === 'string' && mine.trim() ? 'Student wrote:\n' + mine.slice(0, 1500) : '');
    return [
      'You write ONE new short multiple-choice Java practice question for a Korean beginner (교재: 자바의 정석) who just got a question wrong.',
      'Goal: practice the same concept the student missed, in a DIFFERENT situation than the original (different code, values or example). Same level or a little easier.',
      'Rules:',
      '- Exactly 4 choices, exactly one correct. Wrong choices should be the mistakes a beginner would really make.',
      '- If you include code, keep it under 15 lines, valid Java 17, and if you ask for its output, trace it carefully: the correct choice MUST be the exact output.',
      '- Korean, polite 해요체. Put code only in "code" (plain text, no Markdown fences), not in "question".',
      'Reply with ONLY this JSON:',
      '{"question": "...", "code": "" , "choices": ["...", "...", "...", "..."], "answer": 0, "explain": "왜 그 보기가 답인지 1-3문장(해요체)"}',
      '',
      'CHAPTER: ' + p.ch + '장 ' + (c ? c.title : ''),
      'ORIGINAL QUESTION: ' + jText(p.q).slice(0, 800),
      p.code ? 'ORIGINAL CODE:\n' + jText(p.code).slice(0, 1500) : '',
      p.t === 'mc' ? 'ORIGINAL CHOICES: ' + p.choices.map(function (x, i) { return (i + 1) + ') ' + jText(x); }).join(' / ') : '',
      'MODEL ANSWER: ' + model.slice(0, 1500),
      studentSaid
    ].filter(Boolean).join('\n');
  }
  function jMakeGen(n, body) { WB.mcMake(body, jGenPrompt(n), 'Claude가 방금 틀린 개념으로 객관식 문제를 만들고 있어요.'); }
  function jGenAct(body, gc, act) { WB.mcAct(body, gc, act); }
  WB.genHandlers.java = { make: jMakeGen, act: jGenAct };
  function jShowRec(n, on) {
    var card = $('#jq-' + n); if (!card) return;
    var box = card.querySelector('.rec');
    if (!on) { if (box) box.remove(); return; }
    if (box) return;
    var list = jRelated(n, 3);
    box = document.createElement('div'); box.className = 'rec'; card.appendChild(box);
    var sim = list.length ? WB.recHtml(list.map(function (r) { var p = jbyN[r.n]; return { n: r.n, lv: p.lv, lvName: JLV[p.lv], text: (p.ch !== jbyN[n].ch ? p.ch + '장 · ' : '') + jRecText(p), why: r.why, sub: false }; }), 'data-jrecgo').replace(/^<div class="rec-h">[^<]*<\/div>/, '') : '';
    box.innerHTML = WB.genBoxHtml('java', n, sim);
  }
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-jrecgo]'); if (b) jGoto(+b.dataset.jrecgo); });

  // ---------- 오답노트 ----------
  function jWrongList() { return Object.keys(JS.wrong).map(Number).filter(function (n) { return jbyN[n]; }); }
  function jFixed(n) { return JS.st[n] === 'ok'; }
  function jWrongBadge() {
    var open = jWrongList().filter(function (n) { return !jFixed(n); }).length, b = $('#jwrong-n');
    if (b) { b.textContent = open || ''; b.hidden = !open; }
  }
  function jWrongCounts() {
    var all = jWrongList(), fixed = all.filter(jFixed).length;
    var set = function (k, v) { var el = $('#jwn-cnt-' + k); if (el) el.textContent = v; };
    set('open', all.length - fixed); set('fixed', fixed); set('all', all.length);
  }
  function jWrongMarks(n) {
    var it = document.querySelector('.wn-item[data-jwn="' + n + '"]'); if (!it) return;
    var w = JS.wrong[n] || {}; it.classList.toggle('fixed', jFixed(n));
    var c = it.querySelector('.wn-c'); if (c) c.textContent = '틀린 횟수 ' + (w.c || 1) + '번';
    var t = it.querySelector('.wn-t'); if (t) t.textContent = w.t ? '마지막 ' + WB.shortDate(w.t) : '';
    jWrongCounts();
  }
  function jRenderWrong() {
    var v = $('#jwrong-view'); if (!v) return;
    $('#jstage-view').innerHTML = ''; // 같은 문제 카드가 두 곳에 생기지 않게
    var all = jWrongList(), fixed = all.filter(jFixed);
    var list = JS.wf === 'fixed' ? fixed : JS.wf === 'all' ? all : all.filter(function (n) { return !jFixed(n); });
    if (JS.ws === 'chapter') list.sort(function (a, b) { return jbyN[a].ch - jbyN[b].ch || a - b; });
    else list.sort(function (a, b) { return String((JS.wrong[b] || {}).t || '').localeCompare(String((JS.wrong[a] || {}).t || '')) || a - b; });
    var h = '<div class="stage-head"><div class="eyebrow">JAVA · 오답노트</div><h2>오답노트</h2>' +
      '<p class="wn-sub">채점에서 틀렸거나 ‘틀렸어요’를 고른 문제가 자동으로 모여요. 여기서 바로 다시 풀 수 있고, 맞히면 ‘다시 맞힘’으로 옮겨져요.</p></div>';
    h += '<div class="lvbar wn-bar" role="group" aria-label="오답 보기">' +
      [['open', '아직 못 맞힘', all.length - fixed.length], ['fixed', '다시 맞힘', fixed.length], ['all', '전체', all.length]].map(function (x) {
        return '<button type="button" class="lvbtn" data-jwf="' + x[0] + '" aria-pressed="' + (JS.wf === x[0]) + '">' + x[1] + ' <span id="jwn-cnt-' + x[0] + '">' + x[2] + '</span></button>';
      }).join('') +
      '<label class="wn-sort">정렬 <select id="jwn-sort"><option value="recent"' + (JS.ws === 'recent' ? ' selected' : '') + '>최근 틀린 순</option><option value="chapter"' + (JS.ws === 'chapter' ? ' selected' : '') + '>장 순서</option></select></label></div>';
    if (!all.length) h += '<div class="empty-lv">아직 틀린 문제가 없어요. 실습 문제를 풀다가 틀리면 여기에 모여요.</div>';
    else if (!list.length) h += '<div class="empty-lv">' + (JS.wf === 'open' ? '못 맞힌 문제를 모두 다시 맞혔어요. 잘했어요!' : '아직 다시 맞힌 문제가 없어요.') + '</div>';
    else {
      var lastCh = -1;
      h += '<div class="cards">';
      list.forEach(function (n) {
        var p = jbyN[n], c = JCH.filter(function (x) { return x.no === p.ch; })[0], w = JS.wrong[n] || {};
        if (JS.ws === 'chapter' && p.ch !== lastCh) { h += '<h3 class="sub-h wn-grp">' + esc(c.title) + '</h3>'; lastCh = p.ch; }
        h += '<div class="wn-item' + (jFixed(n) ? ' fixed' : '') + '" data-jwn="' + n + '"><div class="wn-meta">' +
          '<span class="wn-where">' + p.ch + '장 · ' + esc(c.short) + '</span><span class="wn-c">틀린 횟수 ' + (w.c || 1) + '번</span><span class="wn-t">' + (w.t ? '마지막 ' + WB.shortDate(w.t) : '') + '</span>' +
          '<span class="wn-ok">다시 맞힘</span><button type="button" class="wn-rm" data-jwnrm="' + n + '">오답노트에서 빼기</button></div>' + jCard(p) + '</div>';
      });
      h += '</div>';
    }
    v.innerHTML = h;
  }
  document.addEventListener('click', function (e) {
    var f = e.target.closest('[data-jwf]'); if (f) { JS.wf = f.dataset.jwf; jsave(); jRenderWrong(); return; }
    var rm = e.target.closest('[data-jwnrm]'); if (rm) { var n = +rm.dataset.jwnrm; delete JS.wrong[n]; jsave(); var it = rm.closest('.wn-item'); if (it) it.remove(); jWrongCounts(); jWrongBadge(); }
  });
  document.addEventListener('change', function (e) { if (e.target.id === 'jwn-sort') { JS.ws = e.target.value; jsave(); jRenderWrong(); } });
  WB.onView = function (v) {
    if (v === 'jwrong') jRenderWrong();
    else if (v === 'jproblems' && !$('#jstage-view').children.length) jShow(JS.ch);
  };

  function initJava() {
    $('#doc-jcheat').innerHTML = WJX.cheat;
    buildToc($('#doc-jcheat'), $('#toc-jcheat'), 'h1, h2');
    jWireSearch($('#doc-jcheat'), $('#jcheat-q'), $('#jcheat-cnt'));
    jBuildRail(); jInitEvents(); jInitSync(); jShow(JS.ch); initJScratch();
  }

  // ---------- JAVA: 기록 저장·불러오기 ----------
  function jMsg(t) { $('#jsync-msg').textContent = t; }
  function jPack() { return { app: 'java-workbook', v: 1, savedAt: new Date().toISOString(), total: JP.length, a: JS.a, st: JS.st, wrong: JS.wrong, ch: JS.ch, lv: JS.lv }; }
  function jCount(o) { var a = o.a || {}; return Object.keys(o.st || {}).filter(function (k) { return o.st[k] !== 'draft'; }).length + ' 문제 기록, 답 ' + Object.keys(a).filter(function (k) { return typeof a[k] === 'number' || String(a[k] || '').trim(); }).length + '개'; }
  function jMakeCode() {
    var raw = new TextEncoder().encode(JSON.stringify(jPack()));
    if (window.CompressionStream) return pipe(raw, new CompressionStream('deflate-raw')).then(function (z) { return 'JAVAWB1z.' + b64(z); }).catch(function () { return 'JAVAWB1.' + b64(raw); });
    return Promise.resolve('JAVAWB1.' + b64(raw));
  }
  function jReadCode(text) {
    text = (text || '').trim();
    if (text.charAt(0) === '{') return Promise.resolve(JSON.parse(text));
    var m = /^JAVAWB1(z?)\.([A-Za-z0-9_-]+)$/.exec(text.replace(/\s+/g, ''));
    if (!m) return Promise.reject(new Error('form'));
    var bytes = unb64(m[2]);
    var p = m[1] ? (window.DecompressionStream ? pipe(bytes, new DecompressionStream('deflate-raw')) : Promise.reject(new Error('old'))) : Promise.resolve(bytes);
    return p.then(function (u) { return JSON.parse(new TextDecoder().decode(u)); });
  }
  function jApply(o) {
    if (!o || o.app !== 'java-workbook' || typeof o.st !== 'object') throw new Error('form');
    var a = {}, st = {};
    Object.keys(o.a || {}).forEach(function (k) { if (jbyN[k]) a[k] = o.a[k]; });
    Object.keys(o.st || {}).forEach(function (k) { if (jbyN[k] && JSTL[o.st[k]]) st[k] = o.st[k]; });
    JS.a = a; JS.st = st; JS.ch = o.ch || 1; JS.lv = o.lv || 0;
    JS.wrong = {}; Object.keys(o.wrong || {}).forEach(function (k) { if (jbyN[k]) JS.wrong[k] = o.wrong[k]; });
    Object.keys(st).forEach(function (k) { if (st[k] === 'bad' && !JS.wrong[k]) JS.wrong[k] = { c: 1, t: null }; });
    try { localStorage.setItem(JKEY, JSON.stringify(JS)); } catch (e) {}
    jShow(JS.ch); jRefresh(); if (location.hash === '#jwrong') jRenderWrong();
    jMsg('불러왔어요. ' + jCount(JS) + (o.savedAt ? ' (' + whenStr(o.savedAt) + ' 저장)' : '') + '.');
  }
  function jConfirm(o) {
    if (!o || o.app !== 'java-workbook') { jMsg(o && o.app === 'sql-workbook' ? '이건 SQL 기록이에요. SQL 탭의 "기록 저장·불러오기"에서 불러와 주세요.' : '자바 워크북 기록이 아니에요.'); return; }
    var mine = Object.keys(JS.st).length + Object.keys(JS.a).length;
    if (!mine) return jApply(o);
    jBox('', '불러오면 이 기기의 지금 자바 기록(' + jCount(JS) + ')이 불러온 기록(' + jCount(o) + ')으로 바뀌어요.', [['바꾸기', function () { jApply(o); jHide(); }], ['취소', jHide]], true);
  }
  function jBox(text, msg, acts, noText) {
    $('#jsync-box').hidden = false; $('#jsync-text').hidden = !!noText; if (!noText) $('#jsync-text').value = text;
    jMsg(msg || '');
    var row = $('#jsync-box-act'); row.innerHTML = '';
    acts.forEach(function (x, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'btn small' + (i ? ' ghost' : ''); b.textContent = x[0]; b.addEventListener('click', x[1]); row.appendChild(b); });
  }
  function jHide() { $('#jsync-box').hidden = true; }
  function jFileName() { var d = new Date(), z = function (n) { return (n < 10 ? '0' : '') + n; }; return 'java-workbook-record-' + d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + '-' + z(d.getHours()) + z(d.getMinutes()) + '.json'; }
  function jInitSync() {
    $('#jsync-save').addEventListener('click', function () {
      var text = JSON.stringify(jPack(), null, 1), name = jFileName();
      jHide();
      (WB.downloads() || Promise.resolve(null)).then(function (dl) {
        if (dl) return dl.save({ filename: name, data: text }).then(function () { jMsg('파일로 저장했어요. 다른 기기에서 "파일 불러오기"로 열면 돼요.'); }, function (e) {
          if (e && e.code === 'declined') jMsg('저장을 취소했어요.');
          else jBox(text, '이 화면에서는 파일 저장이 안 돼요. 대신 "코드 만들기"를 써 주세요.', [['닫기', jHide]], true);
        });
        if (plainDownload(name, text)) jMsg('파일로 저장했어요. 다운로드 폴더를 확인하고, 다른 기기에서 "파일 불러오기"로 열면 돼요.');
        else jMsg('이 화면에서는 파일 저장이 안 돼요. "코드 만들기"를 써 주세요.');
      });
    });
    $('#jto-sync').addEventListener('click', function () { var p = $('#jpanel-sync'); p.classList.add('open'); p.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); });
    $('#jsync-load').addEventListener('click', function () { $('#jsync-file').value = ''; $('#jsync-file').click(); });
    $('#jsync-file').addEventListener('change', function () {
      var f = this.files && this.files[0]; if (!f) return;
      f.text().then(jReadCode).then(jConfirm).catch(function () { jMsg('이 파일은 자바 워크북 기록이 아니에요. "파일로 저장"으로 만든 파일을 골라 주세요.'); });
    });
    $('#jsync-code').addEventListener('click', function () {
      jMakeCode().then(function (code) {
        var copy = function () {
          var ta = $('#jsync-text'); ta.focus(); ta.select();
          var ok = function () { jMsg('복사했어요. 메신저나 메모로 다른 기기에 보낸 뒤, 거기서 "코드 붙여넣기"에 붙여 넣으세요.'); };
          var manual = function () { try { document.execCommand('copy') ? ok() : jMsg('위 코드를 직접 복사해 주세요.'); } catch (e) { jMsg('위 코드를 직접 복사해 주세요.'); } };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code).then(ok, manual); else manual();
        };
        jBox(code, '내 자바 기록(' + jCount(JS) + ')을 담은 코드예요. 복사해서 다른 기기로 보내세요.', [['복사하기', copy], ['닫기', jHide]]);
        $('#jsync-text').readOnly = true;
      });
    });
    $('#jsync-paste').addEventListener('click', function () {
      jBox('', '다른 기기에서 만든 코드를 아래에 붙여 넣고 "불러오기"를 누르세요.', [['불러오기', function () {
        jReadCode($('#jsync-text').value).then(jConfirm).catch(function () { jMsg('코드를 읽지 못했어요. "JAVAWB1"로 시작하는 코드 전체를 빠짐없이 붙여 넣었는지 확인해 주세요.'); });
      }], ['닫기', jHide]]);
      $('#jsync-text').readOnly = false; $('#jsync-text').focus();
    });
  }


  // ---------- JAVA: 자유 연습장 (draggable button, Claude가 실행 결과를 예측) ----------
  var jScratchPlace = null, jScratchOpen = null;
  function initJScratch() {
    var fab = $('#jfab'), box = $('#jscratch'), ta = $('#jscratch-code'), out = $('#jscratch-out'), runBtn = $('#jscratch-run');
    if (!fab) return;
    var FKEY = 'javawb:fab', DKEY = 'javawb:scratch', SZ = 56, M = 12, pos = null, ctl = null;
    try { pos = JSON.parse(localStorage.getItem(FKEY) || 'null'); } catch (e) {}
    try { ta.value = localStorage.getItem(DKEY) || ''; } catch (e) {}
    function vw() { return document.documentElement.clientWidth; }
    function vh() { return window.innerHeight; }
    function topMin() { var t = $('.top'); return t ? Math.max(M, t.getBoundingClientRect().bottom + 8) : M; }
    function place() {
      var x, y;
      if (pos && typeof pos.rx === 'number') { x = pos.rx * (vw() - SZ); y = pos.ry * (vh() - SZ); }
      else { x = vw() - SZ - 20; y = vh() - SZ - 24; }
      x = Math.max(M, Math.min(vw() - SZ - M, x)); y = Math.max(topMin(), Math.min(vh() - SZ - M, y));
      fab.style.left = x + 'px'; fab.style.top = y + 'px';
      if (!box.hidden) placeBox();
    }
    function placeBox() {
      var r = fab.getBoundingClientRect(), W2 = vw(), H2 = vh(), w = Math.min(560, W2 - 2 * M);
      var above = r.top - topMin() - 10, below = H2 - r.bottom - M - 10;
      var up = above >= below, room = up ? above : below, h = Math.max(260, Math.min(680, room));
      var left = (r.left + SZ / 2 > W2 / 2) ? r.right - w : r.left;
      left = Math.max(M, Math.min(W2 - w - M, left));
      var top = up ? r.top - 10 - h : r.bottom + 10;
      top = Math.max(topMin(), Math.min(H2 - h - M, top));
      box.style.left = left + 'px'; box.style.top = top + 'px'; box.style.width = w + 'px'; box.style.height = h + 'px';
    }
    function setOpen(open) {
      box.hidden = !open; fab.setAttribute('aria-expanded', String(open));
      fab.title = open ? 'Java 연습장 닫기 (끌어서 옮길 수 있어요)' : 'Java 연습장 열기 (끌어서 옮길 수 있어요)';
      if (open) { placeBox(); setTimeout(function () { ta.focus(); }, 0); }
    }
    jScratchPlace = function (isJava) { if (isJava) place(); else if (!box.hidden) setOpen(false); };
    jScratchOpen = function (code, run) {
      ta.value = code; try { localStorage.setItem(DKEY, code); } catch (e) {}
      out.innerHTML = ''; setOpen(true); ta.scrollTop = 0; ta.setSelectionRange(0, 0);
      if (run) runBtn.click();
    };
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
        pos = { rx: r.left / Math.max(1, vw() - SZ), ry: r.top / Math.max(1, vh() - SZ) };
        try { localStorage.setItem(FKEY, JSON.stringify(pos)); } catch (er) {}
      } else if (!cancel) setOpen(box.hidden);
    }
    fab.addEventListener('pointerup', function (e) { endDrag(e, false); });
    fab.addEventListener('pointercancel', function (e) { endDrag(e, true); });
    fab.addEventListener('click', function (e) { if (e.detail === 0) setOpen(box.hidden); });
    fab.addEventListener('keydown', function (e) {
      var k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key]; if (!k || !e.altKey) return;
      e.preventDefault(); var r = fab.getBoundingClientRect();
      pos = { rx: Math.max(0, Math.min(1, (r.left + k[0] * 40) / (vw() - SZ))), ry: Math.max(0, Math.min(1, (r.top + k[1] * 40) / (vh() - SZ))) };
      try { localStorage.setItem(FKEY, JSON.stringify(pos)); } catch (er) {} place();
    });
    $('#jscratch-close').addEventListener('click', function () { setOpen(false); fab.focus(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden && box.contains(document.activeElement)) { setOpen(false); fab.focus(); } });
    window.addEventListener('resize', function () { if (document.documentElement.classList.contains('cat-java')) place(); });
    var dT = null;
    ta.addEventListener('input', function () { clearTimeout(dT); dT = setTimeout(function () { try { localStorage.setItem(DKEY, ta.value); } catch (e) {} }, 300); });
    ta.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runBtn.click(); }
      if (e.key === 'Tab' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault(); var a = ta.selectionStart, b = ta.selectionEnd;
        ta.value = ta.value.slice(0, a) + '    ' + ta.value.slice(b); ta.selectionStart = ta.selectionEnd = a + 4;
      }
    });
    var EX = 'public class Main {\n    public static void main(String[] args) {\n        String name = "자바";\n        for (int i = 1; i <= 3; i++) {\n            System.out.println(i + "번째 " + name);\n        }\n    }\n}';
    $('#jscratch-ex').addEventListener('click', function () { jScratchOpen(EX); ta.focus(); });
    $('#jscratch-clear').addEventListener('click', function () { if (ctl) ctl.abort(); ta.value = ''; out.innerHTML = ''; try { localStorage.removeItem(DKEY); } catch (e) {} ta.focus(); });

    var NOTE = '<p class="jnote">실제 JVM이 아니라 <b>Claude가 코드를 읽고 예측한 결과</b>예요. 대부분 정확하지만 쓰레드 순서·난수·현재 시각처럼 실행마다 달라지는 부분은 예시일 뿐이고, 드물게 틀릴 수 있어요.</p>';
    function prompt(code) {
      return [
        'You are acting as the Java 21 compiler (javac) and JVM for a Korean student\'s practice pad. Predict EXACTLY what happens when the code below is compiled and run.',
        'Rules:',
        '- If the code has no top-level class with a main method, treat it as statements wrapped in `public class Main { public static void main(String[] args) throws Exception { ... } }` (import lines at the top stay outside).',
        '- java.lang is imported automatically; other packages (java.util, java.time, ...) must be imported or fully qualified, otherwise it is a compile error.',
        '- Standard input is empty. args is an empty array. The default charset is UTF-8.',
        '- Trace the program carefully step by step in your head before answering: integer overflow, integer division, char arithmetic, float/double printing (Java\'s shortest repr, e.g. 0.30000000000000004, 1.0E10), String pool ==, Integer cache, HashMap/HashSet iteration order, exception stack traces.',
        '- If compilation fails, list the javac errors like `Main.java:LINE: error: MESSAGE` (line numbers counted in the code as given), in javac\'s English wording, and nothing runs.',
        '- If an uncaught exception occurs, print the stdout produced before it, then the stack trace header as the JVM prints it to stderr, e.g. `Exception in thread "main" java.lang.ArithmeticException: / by zero` followed by `\\tat Main.main(Main.java)`.',
        '- If the output depends on thread scheduling, randomness or the current time, give one plausible output and say so in NOTE.',
        '- If the program would not terminate or would print more than 200 lines, show the first 200 lines and say so in NOTE.',
        'Answer in exactly this format and nothing else:',
        'STATUS: <one of OK | COMPILE_ERROR | RUNTIME_ERROR>',
        '---OUTPUT---',
        '<exact console output, stdout then stderr, no code fences>',
        '---NOTE---',
        '<one or two short sentences IN KOREAN (해요체) explaining the key reason for this result or the error and how to fix it; leave empty if nothing notable>',
        '',
        'Code:',
        '<<<JAVA',
        code,
        'JAVA>>>'
      ].join('\n');
    }
    function parse(t) {
      var m = /STATUS:\s*(OK|COMPILE_ERROR|RUNTIME_ERROR)/.exec(t), st = m ? m[1] : 'OK';
      var oi = t.indexOf('---OUTPUT---'), ni = t.indexOf('---NOTE---');
      var o = oi >= 0 ? t.slice(oi + 12, ni > oi ? ni : t.length) : (ni >= 0 ? t.slice(0, ni) : t);
      var note = ni >= 0 ? t.slice(ni + 10).trim() : '';
      o = o.replace(/^\n/, '').replace(/\s+$/, '').replace(/^```[a-z]*\n?|\n?```$/g, '');
      return { st: st, out: o, note: note };
    }
    var STL = { OK: ['ok', '실행 완료'], COMPILE_ERROR: ['bad', '컴파일 에러'], RUNTIME_ERROR: ['bad', '실행 중 예외 발생'] };
    function render(r, pending) {
      var s = STL[r.st] || STL.OK;
      out.innerHTML = '<div class="jres-h"><span class="jpill ' + (pending ? 'wait' : s[0]) + '">' + (pending ? '예측 중…' : s[1]) + '</span><span class="jres-by">Claude 예측</span></div>' +
        '<pre class="jcon' + (r.st === 'OK' ? '' : ' err') + '">' + (r.out ? esc(r.out) : '<span class="jdim">' + (pending ? '' : '(출력 없음)') + '</span>') + '</pre>' +
        (r.note ? '<p class="jwhy">' + esc(r.note) + '</p>' : '') + NOTE;
    }
    function msg(t, err) { out.innerHTML = '<div class="msg' + (err ? ' err' : '') + '">' + t + '</div>'; }
    runBtn.addEventListener('click', function () {
      var code = ta.value.replace(/\s+$/, '');
      if (!code.trim()) { msg('실행할 Java 코드를 먼저 써 주세요. ‘예시 넣기’로 시작해 봐도 좋아요.'); return; }
      if (code.length > 12000) { msg('코드가 너무 길어요. 12,000자 이하로 줄여 주세요.', true); return; }
      if (ctl) ctl.abort();
      var my = ctl = new AbortController();
      runBtn.disabled = true; msg('Claude에 연결하는 중…');
      jGetSample().then(function (sample) {
        if (!sample) {
          msg('이 연습장은 ' + WB.NO_CLAUDE + '\n브라우저 안에는 Java를 실행할 환경이 없어서 Claude가 결과를 예측해 줘요. 실습 문제의 출력 정답은 미리 Java 21로 실제 실행해서 확인해 두었어요.', true);
          return;
        }
        render({ st: 'OK', out: '', note: '' }, true);
        return sample(prompt(code), {
          signal: my.signal, modelTier: 'default', cache: false,
          onText: function (ev) { if (my !== ctl) return; var r = parse(ev.text || ''); if (ev.text && ev.text.indexOf('---OUTPUT---') >= 0) render(r, true); }
        }).then(function (res) {
          if (my !== ctl) return;
          render(parse(res.text || ''), false);
          if (res.truncated) out.insertAdjacentHTML('beforeend', '<p class="jnote">답이 길어서 중간에 잘렸어요.</p>');
        });
      }).catch(function (e) {
        if (my !== ctl || (e && (e.code === 'cancelled' || e.name === 'AbortError'))) return;
        var c = e && e.code;
        if (c === 'not_granted') msg('권한을 허용하지 않아서 실행할 수 없어요. 페이지의 권한 메뉴에서 허용하면 다시 쓸 수 있어요.', true);
        else if (c === 'rate_limited') msg('요청이 많아서 잠시 쉬어야 해요. 조금 뒤에 다시 실행해 주세요.', true);
        else msg((WB.claudeErrText(e) || '실행 결과를 받지 못했어요. 잠시 뒤 다시 시도해 주세요.') + (e && e.message ? '\n(' + esc(e.message) + ')' : ''), true);
      }).then(function () { if (my === ctl) runBtn.disabled = false; });
    });
    place();
  }

  WB.initJava = initJava;
  WB.onCategory = function (isJava) { if (jScratchPlace) jScratchPlace(isJava); };
})();
