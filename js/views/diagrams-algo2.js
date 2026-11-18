/*
 * diagrams-algo2.js — Kaba Kuvvet (string eşleme, konveks gövde, etraflı arama, DFS/BFS, postane)
 * ve Azalt-Fethet (aⁿ, topolojik sıralama, permütasyon, alt küme, ikili arama, sahte para, Rus köylüsü) şekilleri.
 */
(function (OSLab) {
  'use strict';

  const reg = (id, def) => OSLab.diagrams.register(id, def);
  const { player, arrayRow, codePanel } = OSLab.algoUI;
  const { permutationsOf } = OSLab.algos;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fig = (id, inner, cap) => `<figure class="dg ax" data-dg="${id}">${inner}<figcaption class="dg-caption">${cap || ''}</figcaption></figure>`;

  /* --------------------------------------------------------------- graf çizimi (durumlu) */

  // g = { nodes:[{id,x,y}], edges:[[u,v]] , directed }, st = { n:{id:cls}, e:{'u-v':cls}, lbl:{id:'..'} }
  function drawG(g, st, W, H) {
    const s = st || {};
    const pos = Object.fromEntries(g.nodes.map((n) => [n.id, n]));
    const ecls = (u, v) => (s.e && (s.e[`${u}-${v}`] || (!g.directed && s.e[`${v}-${u}`]))) || '';
    const edges = g.edges.map(([u, v]) => {
      const p = pos[u]; const q = pos[v];
      let x2 = q.x; let y2 = q.y;
      if (g.directed) { const d = Math.hypot(q.x - p.x, q.y - p.y); x2 = q.x - ((q.x - p.x) / d) * 17; y2 = q.y - ((q.y - p.y) / d) * 17; }
      return `<line class="gy-e ${ecls(u, v)}" x1="${p.x}" y1="${p.y}" x2="${x2}" y2="${y2}"${g.directed ? ' marker-end="url(#gy-arrow)"' : ''}/>`;
    }).join('');
    const nodes = g.nodes.map((n) => `<g class="gy-n ${(s.n && s.n[n.id]) || ''}"><circle cx="${n.x}" cy="${n.y}" r="14"/><text x="${n.x}" y="${n.y + 4.5}">${n.id}</text>${s.lbl && s.lbl[n.id] ? `<text class="gy-lbl" x="${n.x + 15}" y="${n.y - 13}">${s.lbl[n.id]}</text>` : ''}</g>`).join('');
    return `<svg class="gx gy" viewBox="0 0 ${W || 420} ${H || 220}"><defs><marker id="gy-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="gy-head"/></marker></defs>${edges}${nodes}</svg>`;
  }

  const TRAV = {
    nodes: [{ id: 'g', x: 25, y: 22 }, { id: 'h', x: 395, y: 22 }, { id: 'j', x: 25, y: 198 }, { id: 'i', x: 395, y: 198 },
      { id: 'a', x: 105, y: 62 }, { id: 'c', x: 165, y: 110 }, { id: 'd', x: 105, y: 158 }, { id: 'e', x: 315, y: 62 }, { id: 'f', x: 255, y: 110 }, { id: 'b', x: 315, y: 158 }],
    edges: [['a', 'c'], ['a', 'd'], ['a', 'e'], ['c', 'd'], ['c', 'f'], ['b', 'e'], ['b', 'f'], ['e', 'f'], ['g', 'h'], ['g', 'j'], ['h', 'i'], ['i', 'j']]
  };
  const adj = (g, v) => g.edges.filter(([x, y]) => x === v || (!g.directed && y === v)).map(([x, y]) => (x === v ? y : x)).sort();
  const box = (title, items) => `<div class="gy-box"><b>${title}</b><div>${items.length ? items.map((x) => `<span>${x}</span>`).join('') : '<em>boş</em>'}</div></div>`;

  reg('dfs', player('dfs', {
    speed: 1100,
    frames() {
      const g = TRAV;
      const n = {}; const e = {}; const lbl = {}; const stack = []; let push = 0; let pop = 0;
      const fr = [];
      const snap = (text) => fr.push({ html: `<div class="gy-wrap">${drawG(g, { n: { ...n }, e: { ...e }, lbl: { ...lbl } })}${box('Yığıt (üst sağda)', stack.map((v) => `${v}<sub>${lbl[v]}</sub>`))}</div>`, text });
      snap('Alfabetik sırayla DFS. Etiketler: <b>itilme sırası, çekilme sırası</b>. Yeşil kalın: ağaç kenarı, kesikli: geri kenar.');
      const visit = (v, parent) => {
        push++; lbl[v] = `${push}`; stack.push(v);
        Object.keys(n).forEach((k) => { if (n[k] === 'cur') n[k] = 'vis'; });
        n[v] = 'cur';
        if (parent) e[`${parent}-${v}`] = 'tree';
        snap(`<b>${v}</b> ilk kez ziyaret edildi → yığıta itildi (${push}).${parent ? ` Ağaç kenarı ${parent}–${v}.` : ' Yeni bir DFS ağacının kökü.'}`);
        for (const w of adj(g, v)) {
          if (!lbl[w]) { visit(w, v); n[v] = 'cur'; } else if (w !== parent && !e[`${v}-${w}`] && !e[`${w}-${v}`] && stack.includes(w)) {
            e[`${v}-${w}`] = 'back';
            snap(`${v}'nin komşusu <b>${w}</b> zaten yığıtta (bir ata) → <b>geri kenar</b> ${v}–${w}: graf çevrimseldir.`);
          }
        }
        pop++; lbl[v] = `${lbl[v]},${pop}`; stack.pop(); n[v] = 'done';
        snap(`<b>${v}</b> çıkmaz (dead end): ziyaret edilmemiş komşusu yok → yığıttan çekildi (${pop}).`);
      };
      g.nodes.map((x) => x.id).sort().forEach((v) => { if (!lbl[v]) visit(v, null); });
      fr.push({ html: fr[fr.length - 1].html, text: 'Bitti. İtilme: a1 c2 d3 f4 b5 e6 g7 h8 i9 j10 · Çekilme: d1 e2 b3 f4 c5 a6 j7 i8 h9 g10. İki ağaç oluştu: graf <b>bağlantılı değil</b>.' });
      return fr;
    }
  }));

  reg('bfs', player('bfs', {
    speed: 1100,
    frames() {
      const g = TRAV;
      const n = {}; const e = {}; const lbl = {}; let cnt = 0; const fr = [];
      let q = [];
      const snap = (text) => fr.push({ html: `<div class="gy-wrap">${drawG(g, { n: { ...n }, e: { ...e }, lbl: { ...lbl } })}${box('Kuyruk (baş solda)', q.map((v) => `${v}<sub>${lbl[v]}</sub>`))}</div>`, text });
      snap('Alfabetik sırayla BFS. Etiket: <b>kuyruğa eklenme sırası</b>. Yeşil kalın: ağaç kenarı, kesikli: çapraz kenar.');
      g.nodes.map((x) => x.id).sort().forEach((s) => {
        if (lbl[s]) return;
        cnt++; lbl[s] = cnt; n[s] = 'vis'; q = [s];
        snap(`<b>${s}</b> kuyruğa eklendi (${cnt}): yeni bir BFS ağacının kökü.`);
        while (q.length) {
          const v = q[0];
          n[v] = 'cur';
          const added = []; const cross = [];
          adj(g, v).forEach((w) => {
            if (!lbl[w]) { cnt++; lbl[w] = cnt; n[w] = 'vis'; e[`${v}-${w}`] = 'tree'; q.push(w); added.push(`${w}(${cnt})`); } else if (!e[`${v}-${w}`] && !e[`${w}-${v}`]) { e[`${v}-${w}`] = 'back'; cross.push(w); }
          });
          snap(`Baştaki <b>${v}</b>: ziyaret edilmemiş komşuları ${added.length ? added.join(', ') + ' kuyruğa eklendi' : 'yok'}.${cross.length ? ` ${cross.map((w) => `${v}–${w}`).join(', ')} <b>çapraz kenar</b>.` : ''}`);
          q.shift(); n[v] = 'done';
        }
      });
      fr.push({ html: fr[fr.length - 1].html, text: 'Bitti. Eklenme sırası: a1 c2 d3 e4 f5 b6 g7 h8 j9 i10. Kuyrukta ekleme ve çıkarma sırası aynıdır: <b>tek sıralama</b>.' });
      return fr;
    }
  }));

  /* --------------------------------------------------------------- string eşleme */

  reg('string-match', player('string-match', {
    speed: 700,
    top: () => '<label>Metin <input type="text" data-in="t" value="NOBODY_NOTICED_HIM" maxlength="40" style="width:210px"></label><label>Örüntü <input type="text" data-in="p" value="NOT" maxlength="10" style="width:90px"></label><span class="ax-presets"><button type="button" class="btn btn-sm btn-ghost" data-preset="a">NOT</button><button type="button" class="btn btn-sm btn-ghost" data-preset="b">0000…0 / 00001</button></span>',
    onInput: (el, p) => {
      el.querySelector('[data-in="t"]').value = p === 'a' ? 'NOBODY_NOTICED_HIM' : '0'.repeat(20);
      el.querySelector('[data-in="p"]').value = p === 'a' ? 'NOT' : '00001';
    },
    frames(el) {
      const T = el.querySelector('[data-in="t"]').value || 'A';
      const P = el.querySelector('[data-in="p"]').value || 'A';
      const n = T.length; const m = P.length;
      const fr = [];
      let total = 0;
      const row = (i, j, ok) => `<div class="sm-grid" style="--n:${n}">${[...T].map((c) => `<span class="sm-t">${esc(c)}</span>`).join('')}${[...T].map((_, k) => {
        const pj = k - i;
        if (pj < 0 || pj >= m) return '<span></span>';
        const cls = pj < j ? 'ok' : pj === j ? (ok ? 'ok' : 'bad') : 'idle';
        return `<span class="sm-p ${cls}">${esc(P[pj])}</span>`;
      }).join('')}</div>`;
      if (m > n) return [{ html: '<p class="hint">Örüntü metinden uzun.</p>', text: '' }];
      for (let i = 0; i <= n - m; i++) {
        let j = 0;
        while (j < m) { total++; if (P[j] !== T[i + j]) break; j++; }
        if (j === m) {
          fr.push({ html: row(i, m - 1, true), text: `Hizalama i = ${i}: tüm ${m} karakter eşleşti → <b>bulundu</b>, i = ${i} döner. Toplam ${total} karşılaştırma.` });
          return fr;
        }
        fr.push({ html: row(i, j, false), text: `Hizalama i = ${i}: ${j} karakter eşleşti, ${j + 1}. karşılaştırmada uyumsuzluk (${esc(P[j])} ≠ ${esc(T[i + j])}) → bir sağa kaydır. Toplam ${total}.` });
      }
      fr.push({ html: fr.length ? fr[fr.length - 1].html : '', text: `Örüntü bulunamadı: ${n - m + 1} hizalama, toplam <b>${total}</b> karşılaştırma (en kötü sınır m(n−m+1) = ${m * (n - m + 1)}).` });
      return fr;
    }
  }));

  /* --------------------------------------------------------------- konveks gövde */

  const CPTS = [[60, 170], [150, 205], [250, 175], [285, 85], [210, 25], [90, 40], [30, 110], [130, 95], [190, 130], [215, 80]];
  reg('convex', player('convex', {
    speed: 500,
    frames() {
      const N = CPTS.length;
      const hull = [];
      const fr = [];
      const draw = (i, j, ok) => `<svg class="gx" viewBox="0 0 320 230">${hull.map(([a, b2]) => `<line class="cv-hull" x1="${CPTS[a][0]}" y1="${CPTS[a][1]}" x2="${CPTS[b2][0]}" y2="${CPTS[b2][1]}"/>`).join('')}${i !== undefined ? `<line class="cv-try ${ok ? 'ok' : 'bad'}" x1="${CPTS[i][0]}" y1="${CPTS[i][1]}" x2="${CPTS[j][0]}" y2="${CPTS[j][1]}"/>` : ''}${CPTS.map(([x, y], k) => `<g class="gy-n"><circle cx="${x}" cy="${y}" r="9"/><text x="${x}" y="${y + 4}">${k + 1}</text></g>`).join('')}</svg>`;
      fr.push({ html: draw(), text: `${N} nokta. Her çift (n(n−1)/2 = ${N * (N - 1) / 2}) için diğer noktaların doğrunun aynı tarafında olup olmadığına bakılacak.` });
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const [x1, y1] = CPTS[i]; const [x2, y2] = CPTS[j];
        const a = y2 - y1; const b = x1 - x2; const c = x1 * y2 - y1 * x2;
        let pos = 0; let neg = 0;
        CPTS.forEach(([x, y], k) => { if (k === i || k === j) return; const s = a * x + b * y - c; if (s > 0) pos++; else if (s < 0) neg++; });
        const ok = pos === 0 || neg === 0;
        if (ok) hull.push([i, j]);
        fr.push({ html: draw(i, j, ok), text: `p${i + 1}–p${j + 1}: doğrunun bir yanında ${pos}, diğer yanında ${neg} nokta → ${ok ? '<b>hepsi aynı tarafta: gövde kenarı</b>' : 'iki tarafta da nokta var, kenar değil'}.` });
      }
      fr.push({ html: draw(), text: `Bitti: ${hull.length} kenar bulundu. ${N * (N - 1) / 2} çift × ${N - 2} nokta denetimi → O(n³).` });
      return fr;
    }
  }));

  /* --------------------------------------------------------------- sırt çantası ve işe alma */

  reg('knapsack', {
    kind: 'custom',
    render() {
      const W = 10; const w = [7, 3, 4, 5]; const v = [42, 12, 40, 25];
      const rows = [];
      for (let mask = 0; mask < 16; mask++) {
        const idx = [0, 1, 2, 3].filter((k) => mask & (1 << k));
        const tw = idx.reduce((s, k) => s + w[k], 0); const tv = idx.reduce((s, k) => s + v[k], 0);
        rows.push({ set: idx.length ? `{${idx.map((k) => k + 1).join(', ')}}` : '∅', tw, tv, ok: tw <= W, size: idx.length, idx });
      }
      rows.sort((a, b2) => a.size - b2.size || a.set.localeCompare(b2.set));
      const best = Math.max(...rows.filter((r) => r.ok).map((r) => r.tv));
      return fig('knapsack', `<div class="ax-duo"><div class="ks-items">${w.map((x, k) => `<div class="ks-item"><b>Nesne ${k + 1}</b><span>w = ${x}</span><span>v = $${v[k]}</span></div>`).join('')}<div class="ks-item ks-bag"><b>Çanta</b><span>W = ${W}</span></div></div>
        <div class="ax-scroll"><table class="ax-t"><thead><tr><th>Alt küme</th><th>Ağırlık</th><th>Değer</th></tr></thead><tbody>${rows.map((r) => `<tr class="${r.ok && r.tv === best ? 'ax-min' : ''}${r.ok ? '' : ' ts-bad'}"><td>${r.set}</td><td>${r.tw}</td><td>${r.ok ? `$${r.tv}` : 'sığmaz'}</td></tr>`).join('')}</tbody></table></div></div>`, `2⁴ = 16 alt kümenin hepsi denendi. Sığanlar içinde en değerli: <b>{3, 4}</b>, ağırlık 9, değer <b>$${best}</b>.`);
    },
    init() {}
  });

  const C = [[9, 2, 7, 8], [6, 4, 3, 7], [5, 8, 1, 8], [7, 6, 9, 4]];
  reg('assignment', {
    kind: 'custom',
    render() {
      const perms = permutationsOf([1, 2, 3, 4], 4).map((p) => ({ p, parts: p.map((j, i) => C[i][j - 1]) }));
      perms.forEach((x) => { x.cost = x.parts.reduce((s, y) => s + y, 0); });
      const best = Math.min(...perms.map((x) => x.cost));
      return fig('assignment', `<div class="ax-duo"><table class="ax-t as-m"><thead><tr><th></th>${[1, 2, 3, 4].map((j) => `<th>İş ${j}</th>`).join('')}</tr></thead><tbody>${C.map((r, i) => `<tr><th>Kişi ${i + 1}</th>${r.map((c, j) => `<td data-c="${i}-${j}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table>
        <div class="ax-scroll"><table class="ax-t ax-click"><thead><tr><th>Atama ⟨j₁ j₂ j₃ j₄⟩</th><th>Maliyet</th></tr></thead><tbody>${perms.map((x, k) => `<tr data-k="${k}" data-p="${x.p.join('')}" class="${x.cost === best ? 'ax-min' : ''}"><td>⟨${x.p.join(', ')}⟩</td><td>${x.parts.join(' + ')} = <b>${x.cost}</b></td></tr>`).join('')}</tbody></table></div></div>`, `4! = 24 permütasyon denendi. En ucuz: <b>⟨2, 1, 3, 4⟩ = 2 + 6 + 1 + 4 = ${best}</b>. Bir satıra tıkla, matriste seçilen hücreler görünsün.`);
    },
    init(el) {
      const pick = (row) => {
        const p = row.dataset.p.split('').map(Number);
        el.querySelectorAll('[data-c]').forEach((td) => { const [i, j] = td.dataset.c.split('-').map(Number); td.classList.toggle('as-on', p[i] === j + 1); });
        el.querySelectorAll('tr[data-k]').forEach((r) => r.classList.toggle('sel', r === row));
      };
      el.addEventListener('click', (ev) => { const r = ev.target.closest('tr[data-k]'); if (r) pick(r); });
      pick(el.querySelector('tr.ax-min'));
    }
  });

  /* --------------------------------------------------------------- postane */

  reg('postane', {
    kind: 'custom',
    render() {
      return fig('postane', '<div class="ax-top"><label>Köy konumları <input type="text" data-in="x" value="1, 3, 4, 9, 15" style="width:200px"></label><label>Belirtilen köy <select data-in="k"></select></label></div><div class="ax-stage"></div>', 'Konumları değiştir: her köy aday olarak denenir.');
    },
    init(el) {
      const st = el.querySelector('.ax-stage');
      const sel = el.querySelector('[data-in="k"]');
      const draw = () => {
        const xs = el.querySelector('[data-in="x"]').value.split(/[\s,;]+/).map(Number).filter(Number.isFinite).sort((a, b2) => a - b2).slice(0, 12);
        if (xs.length < 2) { st.innerHTML = '<p class="hint">En az iki köy gir.</p>'; return; }
        const prevK = Number(sel.value) || 0;
        sel.innerHTML = xs.map((x, i) => `<option value="${i}"${i === prevK ? ' selected' : ''}>x${i + 1} = ${x}</option>`).join('');
        const K = Math.min(prevK, xs.length - 1);
        const rows = xs.map((x) => ({ x, sum: xs.reduce((s, y) => s + Math.abs(x - y), 0), max: Math.max(...xs.map((y) => Math.abs(x - y))), far: Math.abs(x - xs[K]) }));
        const bs = Math.min(...rows.map((r) => r.sum)); const bm = Math.min(...rows.map((r) => r.max)); const bf = Math.max(...rows.map((r) => r.far));
        const lo = xs[0]; const hi = xs[xs.length - 1];
        const X = (x) => 20 + ((x - lo) / Math.max(1, hi - lo)) * 380;
        st.innerHTML = `<svg class="gx" viewBox="0 0 420 60"><line class="ax-axis" x1="10" y1="30" x2="410" y2="30"/>${rows.map((r, i) => `<g class="gy-n ${r.sum === bs ? 'done' : ''}${i === K ? ' cur' : ''}"><circle cx="${X(r.x)}" cy="30" r="10"/><text x="${X(r.x)}" y="34">${i + 1}</text><text class="gy-lbl" x="${X(r.x)}" y="56" text-anchor="middle">${r.x}</text></g>`).join('')}</svg>
          <table class="ax-t"><thead><tr><th>Aday köy</th><th>Toplam uzaklık</th><th>En uzak köye uzaklık</th><th>x${K + 1}'e uzaklık</th></tr></thead><tbody>${rows.map((r, i) => `<tr><td>x${i + 1} = ${r.x}</td><td class="${r.sum === bs ? 'pt-best' : ''}">${r.sum}</td><td class="${r.max === bm ? 'pt-best' : ''}">${r.max}</td><td class="${r.far === bf ? 'pt-best' : ''}">${r.far}</td></tr>`).join('')}</tbody></table>`;
        el.querySelector('.dg-caption').innerHTML = `Toplam uzaklığı en aza indiren köy: <b>${rows.filter((r) => r.sum === bs).map((r) => r.x).join(' ya da ')}</b> (ortanca). En uzak köye uzaklığı en aza indiren: <b>${rows.filter((r) => r.max === bm).map((r) => r.x).join(' ya da ')}</b>. x${K + 1}'e en uzak köy: <b>${rows.filter((r) => r.far === bf).map((r) => r.x).join(', ')}</b>. Her sütun n·n işlemle bulundu.`;
      };
      el.querySelector('.ax-top').addEventListener('input', draw);
      el.querySelector('.ax-top').addEventListener('change', draw);
      draw();
    }
  });

  /* --------------------------------------------------------------- Azalt-Fethet */

  reg('power', {
    kind: 'custom',
    render() {
      return fig('power', '<div class="ax-top"><label>a <input type="number" data-in="a" value="2" min="1" max="9"></label><label>n <input type="number" data-in="n" value="13" min="0" max="60"></label></div><div class="ax-stage"></div>', 'n\'yi büyüt: iki yöntemin çarpma sayıları arasındaki fark açılır.');
    },
    init(el) {
      const st = el.querySelector('.ax-stage');
      const draw = () => {
        const a = Math.max(1, parseInt(el.querySelector('[data-in="a"]').value, 10) || 1);
        const n = Math.max(0, Math.min(60, parseInt(el.querySelector('[data-in="n"]').value, 10) || 0));
        const lines = [];
        let mul = 0;
        const half = (k) => {
          if (k === 0) { lines.push(`a⁰ = 1`); return 1n; }
          const r = half(Math.floor(k / 2));
          if (k % 2 === 0) { mul += 1; lines.push(`a^${k} = (a^${k / 2})²  → 1 çarpma`); return r * r; }
          mul += 2; lines.push(`a^${k} = (a^${(k - 1) / 2})² · a  → 2 çarpma`); return r * r * BigInt(a);
        };
        const val = half(n);
        st.innerHTML = `<div class="ax-duo"><div><h5>Bir sabitle azalt: aⁿ = aⁿ⁻¹ · a</h5><p class="ax-k"><b>${Math.max(0, n - 1)}</b> çarpma (a·a·…·a)</p><p class="hint">f(n) = f(n−1)·a → Θ(n)</p></div>
          <div><h5>Yarıya azalt</h5><pre class="ax-code ax-plain">${lines.map(esc).join('\n')}</pre><p class="ax-k"><b>${mul}</b> çarpma (≈ 2·log₂n) → Θ(log n)</p></div></div>
          <p class="hint">${a}^${n} = ${val.toString().length > 30 ? val.toString().slice(0, 30) + '…' : val}</p>`;
      };
      el.querySelector('.ax-top').addEventListener('input', draw);
      draw();
    }
  });

  const TOPO = { directed: true, nodes: [{ id: 'C1', x: 40, y: 45 }, { id: 'C2', x: 40, y: 175 }, { id: 'C3', x: 150, y: 110 }, { id: 'C4', x: 260, y: 45 }, { id: 'C5', x: 260, y: 175 }], edges: [['C1', 'C3'], ['C2', 'C3'], ['C3', 'C4'], ['C3', 'C5'], ['C4', 'C5']] };
  reg('topo', player('topo', {
    speed: 1500,
    frames() {
      const removed = new Set(); const order = []; const fr = [];
      const g = () => ({ directed: true, nodes: TOPO.nodes, edges: TOPO.edges.filter(([u, v]) => !removed.has(u) && !removed.has(v)) });
      const snap = (src, text) => fr.push({ html: `<div class="gy-wrap">${drawG(g(), { n: Object.fromEntries([...TOPO.nodes.map((x) => [x.id, removed.has(x.id) ? 'gone' : '']), ...src.map((s) => [s, 'cur'])]) }, 300, 220)}${box('Sıralama', order)}</div>`, text });
      snap([], 'Ders grafiği: C1 → C3 ise C1, C3\'ün önkoşuludur. Kaynak silme: her adımda <b>gelen kenarı olmayan</b> bir düğüm silinir.');
      while (removed.size < TOPO.nodes.length) {
        const live = TOPO.nodes.map((x) => x.id).filter((v) => !removed.has(v));
        const srcs = live.filter((v) => !g().edges.some(([, w]) => w === v));
        snap(srcs, `Kaynaklar (gelen kenarı yok): <b>${srcs.join(', ')}</b>. İlki seçilip silinir.`);
        removed.add(srcs[0]); order.push(srcs[0]);
        snap([], `<b>${srcs[0]}</b> ve kenarları silindi. Problem bir düğüm küçüldü.`);
      }
      fr.push({ html: fr[fr.length - 1].html, text: 'Kaynak silme sonucu: <b>C1, C2, C3, C4, C5</b>. DFS çözümü (çekilme sırası C5, C4, C3, C1, C2\'nin tersi): <b>C2, C1, C3, C4, C5</b>. İkisi de geçerli.' });
      return fr;
    }
  }));

  reg('jt', player('jt', {
    speed: 1300,
    top: () => '<label>n <select data-in="n"><option>3</option><option selected>4</option></select></label>',
    onInput: () => {},
    frames(el) {
      const n = Number(el.querySelector('[data-in="n"]').value);
      let p = Array.from({ length: n }, (_, i) => i + 1);
      let dir = Array(n).fill(-1);
      const fr = [];
      const show = (mob, text) => fr.push({ html: `<div class="jt-row">${p.map((x, i) => `<span class="jt-c${i === mob ? ' on' : ''}"><i>${dir[i] < 0 ? '←' : '→'}</i>${x}</span>`).join('')}</div><p class="jt-list">${fr.length >= 0 ? listSoFar.join('  ') : ''}</p>`, text });
      const listSoFar = [p.join('')];
      show(-1, `Başlangıç: ${p.join('')}, tüm oklar sola.`);
      for (;;) {
        let mi = -1;
        p.forEach((x, i) => { const j = i + dir[i]; if (j >= 0 && j < n && p[j] < x && (mi < 0 || x > p[mi])) mi = i; });
        if (mi < 0) break;
        const k = p[mi];
        const j = mi + dir[mi];
        [p[mi], p[j]] = [p[j], p[mi]]; [dir[mi], dir[j]] = [dir[j], dir[mi]];
        p.forEach((x, i) => { if (x > k) dir[i] = -dir[i]; });
        listSoFar.push(p.join(''));
        show(j, `En büyük hareketli eleman <b>${k}</b>, okunun yönündeki komşusuyla yer değiştirdi${k < n ? `; ${k}'dan büyüklerin okları ters çevrildi` : ''} → <b>${p.join('')}</b>`);
      }
      fr.push({ html: fr[fr.length - 1].html, text: `Hareketli eleman kalmadı: ${listSoFar.length} = ${n}! permütasyon üretildi, ardışık her ikisi tek bir komşu yer değişimiyle farklı.` });
      return fr;
    }
  }));

  reg('subsets', {
    kind: 'custom',
    render() {
      const rows = Array.from({ length: 8 }, (_, k) => { const bits = k.toString(2).padStart(3, '0'); const set = [...bits].map((b2, i) => (b2 === '1' ? `a${i + 1}` : null)).filter(Boolean); return [bits, set.length ? `{${set.join(', ')}}` : '∅']; });
      return fig('subsets', `<table class="ax-t sb-t"><thead><tr><th>Bit dizisi</th>${rows.map(([b2]) => `<th>${b2}</th>`).join('')}</tr></thead><tbody><tr><td>Alt küme</td>${rows.map(([, s]) => `<td>${s}</td>`).join('')}</tr></tbody></table>`, 'Bit i = 1 ise aᵢ kümededir. 0\'dan 2ⁿ − 1\'e saymak tüm alt kümeleri üretir (n = 3: 8 alt küme).');
    },
    init() {}
  });

  reg('binsearch70', player('binsearch70', {
    speed: 1500,
    top: () => '<label>K <select data-in="k"><option selected>70</option><option>31</option><option>98</option><option>50</option></select></label>',
    onInput: () => {},
    frames(el) {
      const arr = [3, 14, 27, 31, 39, 42, 55, 70, 74, 81, 85, 93, 98];
      const K = Number(el.querySelector('[data-in="k"]').value);
      let l = 0; let r = arr.length - 1; let c = 0;
      const mk = (m, found) => { const o = {}; arr.forEach((_, i) => { o[i] = i < l || i > r ? 'out' : 'range'; }); if (m !== undefined) o[m] = found ? 'done' : 'cmp'; return o; };
      const fr = [{ html: arrayRow(arr, mk()), text: `K = ${K}. l = 0, r = 12.` }];
      while (l <= r) {
        const m = Math.floor((l + r) / 2); c++;
        if (arr[m] === K) { fr.push({ html: arrayRow(arr, mk(m, true)), text: `İterasyon ${c}: l = ${l}, r = ${r}, m = ${m}. A[${m}] = ${arr[m]} = K → <b>bulundu</b>. ${c} karşılaştırma (en kötü ⌊log₂13⌋ + 1 = 4).` }); return fr; }
        fr.push({ html: arrayRow(arr, mk(m)), text: `İterasyon ${c}: l = ${l}, r = ${r}, m = ⌊(${l}+${r})/2⌋ = ${m}. A[${m}] = ${arr[m]} ${K < arr[m] ? '&gt;' : '&lt;'} K → ${K < arr[m] ? 'r ← m − 1' : 'l ← m + 1'}.` });
        if (K < arr[m]) r = m - 1; else l = m + 1;
      }
      fr.push({ html: arrayRow(arr, mk()), text: `l &gt; r: K dizide yok, −1 döner. ${c} karşılaştırma (en kötü durum).` });
      return fr;
    }
  }));

  reg('fakecoin', player('fakecoin', {
    speed: 1500,
    top: () => '<label>Para sayısı <select data-in="n"><option>8</option><option selected>16</option><option>13</option><option>32</option></select></label>',
    onInput: () => {},
    frames(el) {
      const n = Number(el.querySelector('[data-in="n"]').value);
      const fake = Math.floor(Math.random() * n);
      let cand = Array.from({ length: n }, (_, i) => i);
      const fr = [];
      const draw = (L, R, out) => `<div class="fc-row">${Array.from({ length: n }, (_, i) => `<span class="fc ${L && L.includes(i) ? 'l' : R && R.includes(i) ? 'r' : out === i ? 'o' : cand.includes(i) ? '' : 'x'}">${i + 1}</span>`).join('')}</div>`;
      fr.push({ html: draw(), text: `${n} para, biri sahte (hafif). Her tartımda adaylar ikiye bölünür.` });
      let w = 0;
      while (cand.length > 1) {
        w++;
        const h = Math.floor(cand.length / 2);
        const L = cand.slice(0, h); const R = cand.slice(h, 2 * h); const out = cand.length % 2 ? cand[cand.length - 1] : undefined;
        const res = L.includes(fake) ? 'sol hafif' : R.includes(fake) ? 'sağ hafif' : 'eşit';
        fr.push({ html: draw(L, R, out), text: `Tartım ${w}: ${L.length}'e ${R.length} para${out !== undefined ? `, ${out + 1}. para dışarıda` : ''} → <b>${res}</b>.` });
        cand = res === 'sol hafif' ? L : res === 'sağ hafif' ? R : [out];
      }
      fr.push({ html: draw(), text: `Sahte para: <b>${cand[0] + 1}</b>. ${w} tartım (en kötü ⌊log₂${n}⌋ = ${Math.floor(Math.log2(n))}).` });
      return fr;
    }
  }));

  reg('russian', {
    kind: 'custom',
    render() {
      return fig('russian', '<div class="ax-top"><label>n <input type="number" data-in="n" value="50" min="1" max="100000"></label><label>m <input type="number" data-in="m" value="65" min="1" max="100000"></label></div><div class="ax-stage"></div>', 'Slayt 25\'teki örnek: 50 · 65.');
    },
    init(el) {
      const st = el.querySelector('.ax-stage');
      const draw = () => {
        let n = Math.max(1, parseInt(el.querySelector('[data-in="n"]').value, 10) || 1);
        let m = Math.max(1, parseInt(el.querySelector('[data-in="m"]').value, 10) || 1);
        const n0 = n; const m0 = m;
        const rows = []; let sum = 0;
        while (n >= 1) { const odd = n % 2 === 1; if (odd) sum += m; rows.push([n, m, odd]); if (n === 1) break; n = Math.floor(n / 2); m *= 2; }
        st.innerHTML = `<table class="ax-t ru-t"><thead><tr><th>n</th><th>m</th><th>Toplanacak (n tek)</th></tr></thead><tbody>${rows.map(([a, b2, odd]) => `<tr class="${odd ? 'ax-min' : ''}"><td>${a}</td><td>${b2}</td><td>${odd ? `+${b2}` : ''}</td></tr>`).join('')}</tbody></table>
          <p class="ax-k">${n0} · ${m0} = ${rows.filter((r) => r[2]).map((r) => r[1]).join(' + ')} = <b>${sum}</b> ${sum === n0 * m0 ? '✓' : ''}</p><p class="hint">${rows.length - 1} yarıya bölme adımı ≈ log₂n → Θ(log n).</p>`;
      };
      el.querySelector('.ax-top').addEventListener('input', draw);
      draw();
    }
  });
})(window.OSLab = window.OSLab || {});
