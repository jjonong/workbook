/* DB 모델링: 엔티티 설계 편집기 · ERD 미리보기 · 구조 검사 · DDL 내보내기 */
(function () {
  'use strict';
  var esc = WB.esc;
  var TYPES = ['VARCHAR2', 'NUMBER', 'CHAR', 'DATE', 'NVARCHAR2'];
  function blankAttr() { return { n: '', pk: false, fk: '', type: 'VARCHAR2', len: '', nul: false, def: '' }; }
  function blank() { return { ents: [{ id: 'e1', name: '', attrs: [blankAttr(), blankAttr()] }] }; }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function init(p, saved) {
    if (saved && typeof saved === 'object' && Array.isArray(saved.ents)) return saved;
    return p.start ? clone(p.start) : blank();
  }
  function norm(s) { return String(s || '').replace(/[\s_\-·()]/g, '').toLowerCase(); }
  function ent(d, id) { for (var i = 0; i < d.ents.length; i++) if (d.ents[i].id === id) return d.ents[i]; return null; }
  function entLabel(e) { return (e && e.name.trim()) || '이름 없는 엔티티'; }

  // ---------- 편집기 HTML ----------
  function fkOptions(d, self, cur) {
    return '<option value="">-</option>' + d.ents.filter(function (e) { return e.id !== self.id || true; }).map(function (e) {
      return '<option value="' + e.id + '"' + (cur === e.id ? ' selected' : '') + '>' + esc(entLabel(e)) + (e.id === self.id ? ' (자기 자신)' : '') + '</option>';
    }).join('');
  }
  function attrRow(d, e, a, i) {
    return '<tr data-ai="' + i + '">' +
      '<td><input class="erd-in" data-f="n" value="' + esc(a.n) + '" placeholder="속성명" aria-label="속성명"></td>' +
      '<td class="c"><input type="checkbox" data-f="pk"' + (a.pk ? ' checked' : '') + ' aria-label="PK"></td>' +
      '<td><select data-f="fk" aria-label="FK 참조">' + fkOptions(d, e, a.fk) + '</select></td>' +
      '<td><select data-f="type" aria-label="타입">' + TYPES.map(function (t) { return '<option' + (a.type === t ? ' selected' : '') + '>' + t + '</option>'; }).join('') + '</select></td>' +
      '<td><input class="erd-in sm" data-f="len" value="' + esc(a.len) + '" placeholder="길이" aria-label="길이"></td>' +
      '<td class="c"><input type="checkbox" data-f="nul"' + (a.nul ? ' checked' : '') + ' aria-label="NULL 허용"></td>' +
      '<td><input class="erd-in sm" data-f="def" value="' + esc(a.def) + '" placeholder="-" aria-label="기본값"></td>' +
      '<td><button type="button" class="erd-x" data-eact="delattr" aria-label="속성 삭제">✕</button></td></tr>';
  }
  function entHtml(d, e) {
    return '<section class="erd-ent" data-eid="' + e.id + '"><div class="erd-eh"><input class="erd-in erd-en" data-f="ename" value="' + esc(e.name) + '" placeholder="엔티티명 (예: 회원)" aria-label="엔티티명">' +
      '<button type="button" class="erd-x" data-eact="delent" aria-label="엔티티 삭제">엔티티 삭제</button></div>' +
      '<div class="erd-tw"><table class="erd-t"><thead><tr><th>속성명</th><th>PK</th><th>FK 참조</th><th>타입</th><th>길이</th><th>NULL</th><th>기본값</th><th></th></tr></thead><tbody>' +
      e.attrs.map(function (a, i) { return attrRow(d, e, a, i); }).join('') + '</tbody></table></div>' +
      '<button type="button" class="btn small ghost" data-eact="addattr">+ 속성 추가</button></section>';
  }
  function editorInner(d) {
    return '<div class="erd-ents">' + d.ents.map(function (e) { return entHtml(d, e); }).join('') + '</div>' +
      '<div class="erd-bar"><button type="button" class="btn small" data-eact="addent">+ 엔티티 추가</button>' +
      '<span class="erd-help">FK 참조에서 부모 엔티티를 고르면 관계선이 생겨요. FK가 PK에도 포함되면 식별 관계(실선)예요.</span>' +
      '<button type="button" class="btn small ghost" data-eact="reset">처음 상태로</button></div>';
  }
  function editorHtml(n, d) {
    return '<div class="erd" data-dn="' + n + '"><div class="erd-edit" id="ded-' + n + '">' + editorInner(d) + '</div>' +
      '<div class="erd-prev-w"><div class="res-label">ERD 미리보기 · 입력하면 바로 바뀌어요</div><div class="erd-prev" id="dprev-' + n + '"></div></div></div>';
  }
  function refreshFk(root, d) {
    root.querySelectorAll('.erd-ent').forEach(function (sec) {
      var e = ent(d, sec.dataset.eid); if (!e) return;
      sec.querySelectorAll('select[data-f="fk"]').forEach(function (s) { var tr = s.closest('tr'), a = e.attrs[+tr.dataset.ai]; s.innerHTML = fkOptions(d, e, a.fk); });
    });
  }
  // 편집 이벤트. 반환값: 'struct'(다시 그려야 함) | 'name' | 'val'
  function applyInput(d, el) {
    var sec = el.closest('.erd-ent'); if (!sec) return null;
    var e = ent(d, sec.dataset.eid); if (!e) return null;
    var f = el.dataset.f;
    if (f === 'ename') { e.name = el.value; return 'name'; }
    var tr = el.closest('tr'); if (!tr) return null;
    var a = e.attrs[+tr.dataset.ai]; if (!a) return null;
    if (f === 'pk' || f === 'nul') a[f] = el.checked;
    else a[f] = el.value;
    if (f === 'pk' && a.pk) { a.nul = false; var nc = tr.querySelector('[data-f="nul"]'); if (nc) nc.checked = false; }
    if (f === 'fk' && a.fk) {
      var par = ent(d, a.fk), pk = par && par.attrs.filter(function (x) { return x.pk && x.n.trim(); });
      if (pk && pk.length) {
        var used = e.attrs.filter(function (x) { return x !== a && x.fk === a.fk; }).map(function (x) { return norm(x.n); });
        var pick = pk.filter(function (x) { return used.indexOf(norm(x.n)) < 0; })[0] || pk[0];
        if (!a.n.trim()) { a.n = pick.n; tr.querySelector('[data-f="n"]').value = a.n; }
        if (!a.len) { a.type = pick.type; a.len = pick.len; tr.querySelector('[data-f="type"]').value = a.type; tr.querySelector('[data-f="len"]').value = a.len; }
      }
    }
    return 'val';
  }
  function applyAct(d, btn) {
    var act = btn.dataset.eact, sec = btn.closest('.erd-ent'), e = sec ? ent(d, sec.dataset.eid) : null;
    if (act === 'addent') { var id = 'e1'; for (var k = 1; ent(d, 'e' + k); k++) id = 'e' + (k + 1); d.ents.push({ id: id, name: '', attrs: [blankAttr(), blankAttr()] }); return true; }
    if (act === 'delent' && e) { d.ents = d.ents.filter(function (x) { return x !== e; }); d.ents.forEach(function (x) { x.attrs.forEach(function (a) { if (a.fk === e.id) a.fk = ''; }); }); return true; }
    if (act === 'addattr' && e) { e.attrs.push(blankAttr()); return true; }
    if (act === 'delattr' && e) { var i = +btn.closest('tr').dataset.ai; e.attrs.splice(i, 1); return true; }
    return false;
  }

  // ---------- 관계 계산 ----------
  function rels(d) {
    var out = [];
    d.ents.forEach(function (c) {
      var groups = {};
      c.attrs.forEach(function (a) { if (a.fk && ent(d, a.fk) && a.n.trim()) (groups[a.fk] = groups[a.fk] || []).push(a); });
      Object.keys(groups).forEach(function (pid) {
        var g = groups[pid];
        out.push({ parent: ent(d, pid), child: c, attrs: g, ident: g.some(function (a) { return a.pk; }), opt: g.every(function (a) { return a.nul; }) });
      });
    });
    return out;
  }

  // ---------- mermaid ----------
  var mmP = null;
  function loadMermaid() {
    if (mmP) return mmP;
    mmP = new Promise(function (res, rej) {
      if (window.mermaid) return res(window.mermaid);
      var s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
      s.onload = function () {
        var dark = document.documentElement.getAttribute('data-theme') === 'dark' || (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
        window.mermaid.initialize({ startOnLoad: false, theme: dark ? 'dark' : 'default', securityLevel: 'strict', er: { useMaxWidth: false } });
        res(window.mermaid);
      };
      s.onerror = function () { mmP = null; rej(new Error('load')); };
      document.head.appendChild(s);
    });
    return mmP;
  }
  function mmName(s) { return String(s).trim().replace(/["{}\[\]:|]/g, '').replace(/\s+/g, '_') || '?'; }
  function mermaidSrc(d) {
    var lines = ['erDiagram'], ents = d.ents.filter(function (e) { return e.name.trim() || e.attrs.some(function (a) { return a.n.trim(); }); });
    if (!ents.length) return null;
    rels(d).forEach(function (r) { lines.push('  ' + r.parent.id + ' ' + (r.opt ? '|o' : '||') + (r.ident ? '--' : '..') + 'o{ ' + r.child.id + ' : ""'); });
    ents.forEach(function (e) {
      lines.push('  ' + e.id + '["' + mmName(entLabel(e)).replace(/_/g, ' ') + '"] {');
      e.attrs.forEach(function (a) {
        if (!a.n.trim()) return;
        var t = (a.type || 'VARCHAR2') + (a.len ? '(' + String(a.len).replace(/[^0-9]/g, '_').replace(/_+$/, '') + ')' : '');
        var keys = [a.pk ? 'PK' : '', a.fk ? 'FK' : ''].filter(Boolean).join(',');
        var cm = [a.nul ? 'NULL' : '', a.def ? '기본값 ' + String(a.def).replace(/"/g, '') : ''].filter(Boolean).join(', ');
        lines.push('    ' + t.replace(/\(_?\)/, '') + ' ' + mmName(a.n) + (keys ? ' ' + keys : '') + (cm ? ' "' + cm + '"' : ''));
      });
      if (!e.attrs.some(function (a) { return a.n.trim(); })) lines.push('    _ _');
      lines.push('  }');
    });
    return lines.join('\n');
  }
  function fallbackHtml(d) {
    return '<div class="erd-fb">' + d.ents.map(function (e) {
      return '<div class="erd-fbe"><b>' + esc(entLabel(e)) + '</b><ul>' + e.attrs.filter(function (a) { return a.n.trim(); }).map(function (a) {
        return '<li>' + (a.pk ? '<span class="erd-k">PK</span>' : '') + (a.fk ? '<span class="erd-k fk">FK</span>' : '') + esc(a.n) + '</li>';
      }).join('') + '</ul></div>';
    }).join('') + '</div>' + (rels(d).length ? '<div class="erd-rl">' + rels(d).map(function (r) { return esc(entLabel(r.parent)) + ' 1 ─ N ' + esc(entLabel(r.child)) + (r.ident ? ' (식별)' : ' (비식별)'); }).join(' · ') + '</div>' : '');
  }
  var rseq = 0;
  function render(el, d) {
    if (!el) return Promise.resolve();
    var src = mermaidSrc(d);
    if (!src) { el.innerHTML = '<p class="erd-empty">엔티티명이나 속성명을 입력하면 여기에 ERD가 그려져요.</p>'; return Promise.resolve(); }
    var my = ++rseq; el.dataset.seq = my;
    return loadMermaid().then(function (mm) {
      return mm.render('dmm-' + my, src).then(function (r) { if (el.dataset.seq == my) el.innerHTML = r.svg; });
    }).catch(function () {
      ['dmm-' + my, 'ddmm-' + my].forEach(function (id) { var j = document.getElementById(id); if (j && !el.contains(j)) j.remove(); });
      if (el.dataset.seq == my) el.innerHTML = fallbackHtml(d) + '<p class="erd-empty">그림 ERD를 그리지 못해 목록으로 보여 드려요. 이름에 특수문자가 있는지 확인해 보세요.</p>';
    });
  }

  // ---------- 구조 검사 ----------
  function findEnt(d, syns) {
    var ns = syns.map(norm), best = null;
    d.ents.forEach(function (e) { var en = norm(e.name); if (!en) return; if (ns.indexOf(en) >= 0 && !best) best = e; });
    if (best) return best;
    d.ents.forEach(function (e) { var en = norm(e.name); if (!en || best) return; if (ns.some(function (s) { return s.length >= 2 && en.indexOf(s) >= 0; })) best = e; });
    return best;
  }
  function attrMatch(a, syns) { var an = norm(a.n); if (!an) return false; return syns.some(function (s) { s = norm(s); return an === s || (s.length >= 2 && an.indexOf(s) >= 0); }); }
  function findAttr(e, syns) { if (!e) return null; for (var i = 0; i < e.attrs.length; i++) if (attrMatch(e.attrs[i], syns)) return e.attrs[i]; return null; }
  function check(p, d) {
    return (p.checks || []).map(function (c) {
      var k = c[0], ok = false, e;
      if (k === 'ent') ok = !!findEnt(d, c[1]);
      else if (k === 'noent') ok = !findEnt(d, c[1]);
      else if (k === 'pk') {
        e = findEnt(d, c[1]);
        if (e) { var pks = e.attrs.filter(function (a) { return a.pk && a.n.trim(); }); ok = pks.length === c[2].length && c[2].every(function (g) { return pks.some(function (a) { return attrMatch(a, g); }); }); }
      }
      else if (k === 'fk') {
        e = findEnt(d, c[1]); var par = findEnt(d, c[2]);
        ok = !!(e && par && e.attrs.some(function (a) { return a.fk === par.id; }));
      }
      else if (k === 'ident' || k === 'nonident') {
        e = findEnt(d, c[1]); var pr = findEnt(d, c[2]);
        if (e && pr) { var fa = e.attrs.filter(function (a) { return a.fk === pr.id; }); ok = fa.length > 0 && (k === 'ident' ? fa.some(function (a) { return a.pk; }) : fa.every(function (a) { return !a.pk; })); }
      }
      else if (k === 'pknot') { e = findEnt(d, c[1]); ok = !!e && !e.attrs.some(function (a) { return a.pk && attrMatch(a, c[2]); }); }
      else if (k === 'has') ok = !!findAttr(findEnt(d, c[1]), c[2]);
      else if (k === 'not') { e = findEnt(d, c[1]); ok = !!e && !findAttr(e, c[2]); }
      else if (k === 'null') { var at = findAttr(findEnt(d, c[1]), c[2]); ok = !!at && at.nul === c[3]; }
      else if (k === 'nents') ok = d.ents.filter(function (x) { return x.name.trim(); }).length >= c[1];
      return { ok: ok, label: c[c.length - 1] };
    });
  }
  function checkHtml(res) {
    var pass = res.filter(function (r) { return r.ok; }).length;
    return '<div class="erd-chk"><div class="res-label">구조 검사 ' + pass + '/' + res.length + '</div><ul>' + res.map(function (r) {
      return '<li class="' + (r.ok ? 'ok' : 'no') + '"><span>' + (r.ok ? '✓' : '✗') + '</span>' + r.label + '</li>';
    }).join('') + '</ul><p class="jnote">이름은 비슷한 낱말까지 찾아서 비교해요. 이름이 많이 달라 ✗가 나왔다면 ‘Claude에게 채점받기’로 설계 자체를 판단받아 보세요.</p></div>';
  }

  // ---------- DDL ----------
  function colName(s) { return String(s).trim().replace(/\s+/g, '_'); }
  function ddl(d) {
    var order = [], seen = {}, ents = d.ents.filter(function (e) { return e.name.trim(); });
    function visit(e, stack) {
      if (seen[e.id]) return; if (stack[e.id]) return; stack[e.id] = 1;
      e.attrs.forEach(function (a) { var p = a.fk && ent(d, a.fk); if (p && p !== e && p.name.trim()) visit(p, stack); });
      seen[e.id] = 1; order.push(e);
    }
    ents.forEach(function (e) { visit(e, {}); });
    var warn = [], made = {}, alters = [];
    var sql = order.map(function (e) {
      made[e.id] = 1;
      var tn = colName(e.name), cols = e.attrs.filter(function (a) { return a.n.trim(); });
      var defs = cols.map(function (a) {
        var t = a.type || 'VARCHAR2', len = String(a.len || '').trim();
        if ((t === 'VARCHAR2' || t === 'NVARCHAR2') && !len) { len = '100'; }
        var ty = t + (len && t !== 'DATE' ? '(' + len + ')' : '');
        var dv = String(a.def || '').trim();
        if (dv) dv = /^(sysdate|systimestamp|null|-?\d+(\.\d+)?)$/i.test(dv) || /^'.*'$/.test(dv) ? dv : "'" + dv.replace(/'/g, "''") + "'";
        return '  ' + colName(a.n) + ' ' + ty + (dv ? ' DEFAULT ' + dv : '') + (a.nul && !a.pk ? '' : ' NOT NULL');
      });
      var pk = cols.filter(function (a) { return a.pk; });
      if (pk.length) defs.push('  CONSTRAINT PK_' + tn + ' PRIMARY KEY (' + pk.map(function (a) { return colName(a.n); }).join(', ') + ')');
      else warn.push(e.name + '에 PK가 없어요.');
      var groups = {};
      cols.forEach(function (a) { if (a.fk && ent(d, a.fk)) (groups[a.fk] = groups[a.fk] || []).push(a); });
      Object.keys(groups).forEach(function (pid) {
        var p = ent(d, pid), ppk = p.attrs.filter(function (a) { return a.pk && a.n.trim(); }), g = groups[pid];
        if (!ppk.length) { warn.push(e.name + ' → ' + entLabel(p) + ': 부모에 PK가 없어서 FK를 만들 수 없어요.'); return; }
        var refs = g.map(function (a, i) { var same = ppk.filter(function (x) { return norm(x.n) === norm(a.n); })[0]; return colName((same || ppk[i] || ppk[0]).n); });
        if (g.length !== ppk.length) warn.push(e.name + ' → ' + entLabel(p) + ': 부모 PK는 ' + ppk.length + '개인데 FK 속성은 ' + g.length + '개예요.');
        var fkc = 'CONSTRAINT FK_' + tn + '_' + colName(p.name || p.id) + (p === e ? '_SELF' : '') + ' FOREIGN KEY (' + g.map(function (a) { return colName(a.n); }).join(', ') + ') REFERENCES ' + colName(p.name || p.id) + ' (' + refs.join(', ') + ')';
        if (made[p.id]) defs.push('  ' + fkc); else alters.push('ALTER TABLE ' + tn + ' ADD ' + fkc + ';');
      });
      return 'CREATE TABLE ' + tn + ' (\n' + defs.join(',\n') + '\n);';
    }).join('\n\n');
    if (alters.length) sql += '\n\n-- 서로 참조하는 테이블은 둘 다 만든 뒤에 FK를 추가해요\n' + alters.join('\n');
    return { sql: sql, warn: warn };
  }

  // ---------- 글로 바꾸기 (Claude 채점, 정답 표시용) ----------
  function toText(d) {
    return d.ents.filter(function (e) { return e.name.trim() || e.attrs.some(function (a) { return a.n.trim(); }); }).map(function (e) {
      var cols = e.attrs.filter(function (a) { return a.n.trim(); });
      var pk = cols.filter(function (a) { return a.pk; }), rest = cols.filter(function (a) { return !a.pk; });
      function one(a) { var p = a.fk && ent(d, a.fk); return a.n.trim() + (p ? ' FK→' + entLabel(p) : '') + (a.nul ? ' (NULL)' : ''); }
      return entLabel(e) + '(' + pk.map(one).join(', ') + ' | ' + rest.map(one).join(', ') + ')';
    }).join('\n');
  }

  WB.erd = { init: init, editorHtml: editorHtml, editorInner: editorInner, applyInput: applyInput, applyAct: applyAct, refreshFk: refreshFk, render: render, check: check, checkHtml: checkHtml, ddl: ddl, toText: toText, clone: clone };
})();
