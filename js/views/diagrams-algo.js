/*
 * diagrams-algo.js — Ders notlarındaki etkileşimli şekiller (Algoritma Analizi).
 * diagrams.js motoruna register() ile eklenir. Türler: explorer, stepper, tabs, custom.
 * Ortak parçalar (dizi kutuları, oynatıcı, graf çizimi) laboratuvarlar tarafından da kullanılır:
 *   OSLab.algoUI = { arrayRow, codePanel, player, graphSvg }
 */
(function (OSLab) {
  'use strict';

  const reg = (id, def) => OSLab.diagrams.register(id, def);
  const A = OSLab.algos;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fig = (id, inner, cap, cls) => `<figure class="dg ax${cls ? ' ' + cls : ''}" data-dg="${id}">${inner}<figcaption class="dg-caption">${cap || ''}</figcaption></figure>`;
  const b = (k, title, sub, cls) => `<div class="dg-b${cls ? ' ' + cls : ''}" data-k="${k}"><b>${title}</b>${sub ? `<small>${sub}</small>` : ''}</div>`;
  const ar = (d) => `<div class="dg-ar dg-ar-${d || 'right'}">${{ down: '↓', up: '↑', left: '←' }[d] || '→'}</div>`;

  /* =============================================================== ortak parçalar */

  // Dizi kutuları: mark = { indis: 'cmp' | 'swap' | ... }
  function arrayRow(arr, mark, opts) {
    const o = opts || {};
    const max = Math.max(...arr, 1);
    return `<div class="ax-arr${o.bars ? ' ax-bars' : ''}">${arr.map((v, i) => {
      const m = (mark && mark[i]) || '';
      return `<div class="ax-cell ${m ? 'm-' + m : ''}">${o.bars ? `<i style="height:${Math.max(6, (v / max) * 100)}%"></i>` : ''}<b>${v}</b>${o.index !== false ? `<small>${i}</small>` : ''}</div>`;
    }).join('')}</div>`;
  }

  function codePanel(lines, active) {
    return `<pre class="ax-code">${lines.map((ln, i) => `<span class="${i === active && i > 0 ? 'on' : ''}">${esc(ln)}</span>`).join('\n')}</pre>`;
  }

  const LEGEND = {
    cmp: 'karşılaştırılan', swap: 'yer değiştiren', min: 'şimdiki en küçük', key: 'eklenen (v)', pivot: 'pivot', done: 'yerinde', range: 'işlenen parça', write: 'yazılan'
  };
  const legend = (keys) => `<div class="ax-legend">${keys.map((k) => `<span><i class="m-${k}"></i>${LEGEND[k]}</span>`).join('')}</div>`;

  // Genel oynatıcı: frames() → [{ html, text }]. Kontroller data-x ile (ders akışının data-act'ine karışmaz).
  function player(id, cfg) {
    return {
      kind: 'custom',
      render() {
        return fig(id, `${cfg.top ? `<div class="ax-top">${cfg.top()}</div>` : ''}<div class="ax-stage"></div>
          <div class="dg-ctrl"><button class="btn btn-sm" type="button" data-x="prev">◀ Geri</button><span class="dg-count"></span><button class="btn btn-sm btn-primary" type="button" data-x="next">İleri ▶</button><button class="btn btn-sm btn-ghost" type="button" data-x="play">⏵ Otomatik</button><button class="btn btn-sm btn-ghost" type="button" data-x="end" title="Sona git">⏭</button><button class="btn btn-sm btn-ghost" type="button" data-x="reset" title="Başa al">↺</button></div>`, '', cfg.cls);
      },
      init(el) {
        let frames = cfg.frames(el);
        let i = 0;
        let timer = 0;
        const stage = el.querySelector('.ax-stage');
        const cap = el.querySelector('.dg-caption');
        const count = el.querySelector('.dg-count');
        const playBtn = el.querySelector('[data-x="play"]');
        const draw = () => {
          const f = frames[i];
          stage.innerHTML = f.html;
          cap.innerHTML = f.text || '';
          count.textContent = `${i + 1} / ${frames.length}`;
          el.querySelector('[data-x="prev"]').disabled = i === 0;
          el.querySelector('[data-x="next"]').disabled = i === frames.length - 1;
        };
        const stop = () => { clearInterval(timer); timer = 0; playBtn.textContent = '⏵ Otomatik'; };
        el.querySelector('.dg-ctrl').addEventListener('click', (ev) => {
          const x = ev.target.closest('[data-x]');
          if (!x) return;
          const a = x.dataset.x;
          if (a === 'next' && i < frames.length - 1) { i++; stop(); }
          if (a === 'prev' && i > 0) { i--; stop(); }
          if (a === 'reset') { i = 0; stop(); }
          if (a === 'end') { i = frames.length - 1; stop(); }
          if (a === 'play') {
            if (timer) stop();
            else {
              if (i >= frames.length - 1) i = 0;
              playBtn.textContent = '⏸ Durdur';
              timer = setInterval(() => {
                if (!el.isConnected || i >= frames.length - 1) { stop(); return; }
                i++;
                draw();
              }, cfg.speed || 900);
            }
          }
          draw();
        });
        const top = el.querySelector('.ax-top');
        if (top && cfg.onInput) {
          top.addEventListener('change', () => { stop(); frames = cfg.frames(el); i = 0; draw(); });
          top.addEventListener('click', (ev) => {
            const p = ev.target.closest('[data-preset]');
            if (!p) return;
            cfg.onInput(el, p.dataset.preset);
            stop(); frames = cfg.frames(el); i = 0; draw();
          });
        }
        draw();
      }
    };
  }

  // Ağırlıklı graf (SVG). g = { nodes: [{id,x,y}], edges: [[u,v,w]] }, hl = kenar listesi ['A-B', ...]
  function graphSvg(g, hl, opts) {
    const o = opts || {};
    const pos = Object.fromEntries(g.nodes.map((n) => [n.id, n]));
    const on = new Set((hl || []).flatMap((e) => [e, e.split('-').reverse().join('-')]));
    const order = o.order || [];
    const W = o.w || 440;
    const H = o.h || 220;
    const edges = g.edges.map(([u, v, w]) => {
      const p = pos[u]; const q = pos[v];
      const mx = (p.x + q.x) / 2; const my = (p.y + q.y) / 2;
      const hit = on.has(`${u}-${v}`);
      return `<g class="gx-e${hit ? ' on' : ''}"><line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}"/><rect x="${mx - 11}" y="${my - 10}" width="22" height="18" rx="5"/><text x="${mx}" y="${my + 4}">${w}</text></g>`;
    }).join('');
    const nodes = g.nodes.map((n) => {
      const k = order.indexOf(n.id);
      return `<g class="gx-n${k >= 0 ? ' on' : ''}${k === 0 ? ' start' : ''}"><circle cx="${n.x}" cy="${n.y}" r="17"/><text x="${n.x}" y="${n.y + 5}">${n.id}</text>${k >= 0 ? `<text class="gx-ord" x="${n.x + 16}" y="${n.y - 14}">${k + 1}</text>` : ''}</g>`;
    }).join('');
    return `<svg class="gx" viewBox="0 0 ${W} ${H}" role="img" aria-label="Ağırlıklı graf">${edges}${nodes}</svg>`;
  }

  OSLab.algoUI = { arrayRow, codePanel, player, graphSvg, legend };

  /* =============================================================== 1. hafta */

  reg('algo-io', {
    kind: 'explorer',
    hint: 'Bir kutuya tıkla.',
    html: `<div class="dg-row">${b('in', 'Girdi', 'belirli, tanımlı girdi alanı')}${ar()}${b('alg', 'Algoritma', 'sıralı, anlaşılır, sonlu adımlar', 'dg-os')}${ar()}${b('out', 'Çıktı', 'istenen sonuç')}</div>`,
    info: {
      in: '<b>Girdi</b>: algoritma <b>belirli girdilerle</b> çalışır. Girdi alanı kesin tanımlanmalıdır: EBOB\'da "iki negatif olmayan tamsayı, ikisi birden 0 değil".',
      alg: '<b>Algoritma</b>: girdileri çıktılara dönüştüren <b>sıralı hesaplama adımları</b>. Her adım net olmalı ve algoritma <b>sonlu bir zamanda</b> durmalıdır.',
      out: '<b>Çıktı</b>: problem için <b>doğru</b> sonuç. Algoritmanın hedefi istenen çıktıyı sonlu zamanda elde etmektir.'
    }
  });

  reg('euclid', {
    kind: 'custom',
    render() {
      return fig('euclid', `<div class="ax-top"><label>m <input type="number" min="0" max="100000" value="60" data-in="m"></label><label>n <input type="number" min="0" max="100000" value="24" data-in="n"></label><span class="ax-presets"><button type="button" class="btn btn-sm btn-ghost" data-p="60,24">60, 24</button><button type="button" class="btn btn-sm btn-ghost" data-p="31415,14142">31415, 14142</button><button type="button" class="btn btn-sm btn-ghost" data-p="12,0">12, 0</button></span></div><div class="ax-stage"></div>`, 'm ve n\'yi değiştir: iki algoritmanın kaç adım attığını karşılaştır.');
    },
    init(el) {
      const st = el.querySelector('.ax-stage');
      const val = (k) => Math.max(0, Math.min(100000, parseInt(el.querySelector(`[data-in="${k}"]`).value, 10) || 0));
      const draw = () => {
        const m = val('m'); const n = val('n');
        if (m === 0 && n === 0) { st.innerHTML = '<p class="hint">gcd(0, 0) tanımsızdır: en az biri pozitif olmalı.</p>'; return; }
        const e = A.euclidSteps(m, n);
        const c = A.consecutiveSteps(m, n);
        st.innerHTML = `<div class="ax-duo">
          <div><h5>Euclid</h5><table class="ax-t"><thead><tr><th>m</th><th>n</th><th>m mod n</th></tr></thead><tbody>${e.steps.map((s) => `<tr><td>${s.m}</td><td>${s.n}</td><td>${s.r}</td></tr>`).join('')}<tr class="ax-res"><td colspan="3">n = 0 → gcd = <b>${e.gcd}</b></td></tr></tbody></table>
            <p class="ax-k"><b>${e.steps.length}</b> bölme (mod) işlemi</p></div>
          <div><h5>Ardışık tamsayı kontrolü</h5>${c.broken
            ? '<p class="ax-bad"><b>Çalışmaz:</b> t = min(m, n) = 0 → m / 0 sıfıra bölme!</p><p class="hint">Euclid ise gcd(m, 0) = m sonucunu ilk adımda verir.</p>'
            : `<p>t = min(${m}, ${n}) = ${Math.min(m, n)}'den başlayıp aşağı sayar…</p><p class="ax-k"><b>${c.tries}</b> deneme → gcd = <b>${c.gcd}</b></p><p class="hint">Her denemede 1–2 bölme yapılır. Euclid\'den ${Math.round(c.tries / Math.max(1, e.steps.length))} kat kadar fazla adım.</p>`}</div>
        </div>`;
      };
      el.querySelector('.ax-top').addEventListener('input', draw);
      el.querySelector('.ax-top').addEventListener('click', (ev) => {
        const p = ev.target.closest('[data-p]');
        if (!p) return;
        const [m, n] = p.dataset.p.split(',');
        el.querySelector('[data-in="m"]').value = m;
        el.querySelector('[data-in="n"]').value = n;
        draw();
      });
      draw();
    }
  });

  reg('sieve', player('sieve', {
    speed: 1300,
    frames() {
      const N = 50;
      const state = Array(N + 1).fill('');
      const grid = (hlP) => `<div class="ax-sieve">${Array.from({ length: N - 1 }, (_, k) => k + 2).map((v) => `<span class="${state[v]}${v === hlP ? ' p' : ''}">${v}</span>`).join('')}</div>`;
      const fr = [{ html: grid(), text: '2\'den 50\'ye kadar tüm sayılar yazıldı. Henüz hiçbiri elenmedi.' }];
      for (let p = 2; p * p <= N; p++) {
        if (state[p] === 'x') continue;
        state[p] = 'prime';
        const crossed = [];
        for (let q = p * p; q <= N; q += p) if (state[q] !== 'x') { state[q] = 'x'; crossed.push(q); }
        fr.push({ html: grid(p), text: `<b>${p}</b> asal. Katları ${p}² = ${p * p}'den başlayarak elendi: ${crossed.join(', ')}${crossed.length ? '' : '(yeni eleme yok)'}.` });
      }
      for (let v = 2; v <= N; v++) if (state[v] !== 'x') state[v] = 'prime';
      fr.push({ html: grid(), text: `8² = 64 &gt; 50 olduğundan durulur. Kalanlar asal: <b>${Array.from({ length: N - 1 }, (_, k) => k + 2).filter((v) => state[v] === 'prime').join(', ')}</b>` });
      return fr;
    }
  }));

  reg('design-process', {
    kind: 'explorer',
    hint: 'Sürecin bir adımına tıkla.',
    html: `<div class="dg-col ax-flow">${[
      ['p1', 'Problemi anla', 'Understand the problem'],
      ['p2', 'Karar ver', 'hesaplama aracı · kesin / yaklaşık · tasarım tekniği'],
      ['p3', 'Algoritmayı tasarla', 'Design an algorithm'],
      ['p4', 'Doğruluğunu ispatla', 'Prove correctness'],
      ['p5', 'Algoritmayı analiz et', 'Analyze the algorithm'],
      ['p6', 'Kodla', 'Code the algorithm']
    ].map(([k, t, s], i) => `${i ? ar('down') : ''}${b(k, t, s, 'dg-w70')}`).join('')}</div>`,
    info: {
      p1: '<b>Problemi anla</b>: net ifade et, belirsiz noktaları sor, küçük örnekleri elle çöz, istisnai durumları (ör. 0 girdisi) düşün.',
      p2: '<b>Karar ver</b>: donanımın yetenekleri (RAM modeli), <b>kesin mi yaklaşık mı</b> çözüm, hangi <b>tasarım tekniği</b> ve hangi <b>veri yapısı</b>.',
      p3: '<b>Tasarla</b> ve açıkla: akış diyagramı, sözde kod ya da kelimelerle.',
      p4: '<b>Doğruluk</b>: denemeler, istisnalar, ispatlar. Hata varsa tasarıma geri dönülür.',
      p5: '<b>Analiz</b>: doğruluk en önemli unsur; ardından zaman ve bellek verimliliği, basitlik. Yetersizse tasarıma ya da karar adımına dönülür.',
      p6: '<b>Kodla</b>: belirlenen özellikleri ve veri yapılarını uygulayabilen bir dil seç.'
    }
  });

  /* =============================================================== 2. hafta */

  reg('problem-types', {
    kind: 'explorer',
    hint: 'Bir problem türüne tıkla.',
    html: `<div class="ax-chips">${[['s', 'Sıralama'], ['a', 'Arama'], ['str', 'String işleme'], ['g', 'Graf'], ['k', 'Kombinasyonel'], ['geo', 'Geometrik'], ['num', 'Nümerik']].map(([k, t]) => b(k, t)).join('')}</div>`,
    info: {
      s: '<b>Sıralama</b>: listeyi artan sırada düzenlemek. Aramayı kolaylaştırır, birçok algoritmanın alt yordamıdır. Örnek: selection, bubble, insertion, merge, heap sort.',
      a: '<b>Arama</b>: bir değeri veri kümesinde bulmak. Sıralı arama, ikili arama. Her durum için ideal algoritma yoktur.',
      str: '<b>String işleme</b>: karakter dizileriyle çalışmak: metinde "www" ya da "@" aramak, derleyiciler.',
      g: '<b>Graf</b>: kenarlarla bağlı düğümler. WWW, haberleşme ağları, proje planlaması. En kısa yol, topolojik sıralama.',
      k: '<b>Kombinasyonel</b>: kısıtları sağlayan en iyi kombinasyonu bulmak (maks. değer, min. maliyet). Çözüm sayısı patlar; gezgin satıcı bunun örneğidir.',
      geo: '<b>Geometrik</b>: nokta, doğru, çokgen. Robotik, grafik, tomografi. En yakın çift, dışbükey gövde.',
      num: '<b>Nümerik</b>: sürekli matematik: denklem sistemleri, belirli integraller; yaklaşık çözümü kesine yaklaştırmak.'
    }
  });

  const recs = (arr) => `<div class="ax-recs">${arr.map(([n, g, tag]) => `<span class="ax-rec t${tag}"><b>${g}</b>${n}</span>`).join('')}</div>`;
  reg('stability', {
    kind: 'tabs',
    panes: [
      { label: 'Girdi', html: recs([['Ali', 70, 1], ['Can', 85, 2], ['Ayşe', 70, 3], ['Ece', 85, 4]]), text: 'Kayıtlar nota göre (anahtar) sıralanacak. Ali ve Ayşe\'nin notu eşit (70); Ali önce geliyor.' },
      { label: 'Kararlı sıralama', html: recs([['Ali', 70, 1], ['Ayşe', 70, 3], ['Can', 85, 2], ['Ece', 85, 4]]), text: '<b>Kararlı</b>: eşit notlular girdideki sıralarını korudu (Ali Ayşe\'den, Can Ece\'den önce). Insertion, bubble, merge sort böyledir.' },
      { label: 'Kararsız sıralama', html: recs([['Ayşe', 70, 3], ['Ali', 70, 1], ['Can', 85, 2], ['Ece', 85, 4]]), text: '<b>Kararsız</b>: sonuç yine nota göre doğru, ama Ayşe Ali\'nin önüne geçti. Selection ve quick sort uzak yer değiştirmeler yüzünden bunu yapabilir.' }
    ]
  });

  reg('binsearch', player('binsearch', {
    speed: 1500,
    frames() {
      const arr = [1, 2, 3, 5, 6, 7, 8, 10, 12, 13, 15, 16, 18, 19, 20, 22];
      const K = 19;
      let l = 0; let r = arr.length - 1;
      const fr = [];
      const mk = (m, found) => { const o = {}; arr.forEach((_, i) => { if (i < l || i > r) o[i] = 'out'; else o[i] = 'range'; }); if (m !== undefined) o[m] = found ? 'done' : 'cmp'; return o; };
      fr.push({ html: arrayRow(arr, mk()), text: `Sıralı dizide <b>K = ${K}</b> aranıyor. Arama aralığı tüm dizi: [${l}..${r}].` });
      let n = 0;
      while (l <= r) {
        const m = Math.floor((l + r) / 2);
        n++;
        if (arr[m] === K) { fr.push({ html: arrayRow(arr, mk(m, true)), text: `${n}. karşılaştırma: orta A[${m}] = ${arr[m]} = K → <b>bulundu</b>. 16 elemanda ${n} karşılaştırma (en fazla ⌊log₂16⌋ + 1 = 5).` }); break; }
        fr.push({ html: arrayRow(arr, mk(m)), text: `${n}. karşılaştırma: orta A[${m}] = ${arr[m]}. K ${K < arr[m] ? '&lt;' : '&gt;'} ${arr[m]} → ${K < arr[m] ? 'sol' : 'sağ'} yarıda devam.` });
        if (K < arr[m]) r = m - 1; else l = m + 1;
      }
      return fr;
    }
  }));

  const PTS = [['A', 3, 2], ['B', 2, 5], ['C', 5, -3], ['D', -2, 0], ['E', 4, 6], ['F', 0, -4]];
  reg('closest-pair', {
    kind: 'custom',
    render() {
      const sx = (x) => 30 + (x + 3) * 26; const sy = (y) => 190 - (y + 5) * 15;
      const pairs = [];
      for (let i = 0; i < PTS.length; i++) for (let j = i + 1; j < PTS.length; j++) {
        const [a, ax, ay] = PTS[i]; const [c, cx, cy] = PTS[j];
        pairs.push({ k: a + c, d2: (ax - cx) ** 2 + (ay - cy) ** 2, a: PTS[i], c: PTS[j] });
      }
      const min = Math.min(...pairs.map((p) => p.d2));
      const svg = `<svg class="gx ax-plane" viewBox="0 0 270 200"><line class="ax-axis" x1="${sx(-3)}" y1="${sy(0)}" x2="${sx(6.5)}" y2="${sy(0)}"/><line class="ax-axis" x1="${sx(0)}" y1="${sy(-5)}" x2="${sx(0)}" y2="${sy(7)}"/>
        ${pairs.map((p) => `<line class="ax-pl" data-pl="${p.k}" x1="${sx(p.a[1])}" y1="${sy(p.a[2])}" x2="${sx(p.c[1])}" y2="${sy(p.c[2])}"/>`).join('')}
        ${PTS.map(([n, x, y]) => `<g class="gx-n"><circle cx="${sx(x)}" cy="${sy(y)}" r="9"/><text x="${sx(x)}" y="${sy(y) + 4}">${n}</text></g>`).join('')}</svg>`;
      const table = `<div class="ax-scroll"><table class="ax-t ax-click"><thead><tr><th>Çift</th><th>(Δx)² + (Δy)²</th><th>d</th></tr></thead><tbody>${pairs.map((p) => `<tr data-k="${p.k}" class="${p.d2 === min ? 'ax-min' : ''}"><td>${p.k[0]}–${p.k[1]}</td><td>${p.d2}</td><td>${Math.sqrt(p.d2).toFixed(2)}</td></tr>`).join('')}</tbody></table></div>`;
      return fig('closest-pair', `<div class="ax-duo"><div>${svg}<table class="ax-t ax-mini"><tbody>${PTS.map(([n, x, y]) => `<tr><td>${n}</td><td>(${x}, ${y})</td></tr>`).join('')}</tbody></table></div>${table}</div>`, `15 çiftin hepsi hesaplandı. En küçük kare mesafe <b>${min}</b>: <b>B–E</b>, d = √5 ≈ 2,24. Bir satıra tıkla, çift çizilsin.`);
    },
    init(el) {
      const pick = (k) => {
        el.querySelectorAll('[data-pl]').forEach((l) => l.classList.toggle('on', l.dataset.pl === k));
        el.querySelectorAll('tr[data-k]').forEach((r) => r.classList.toggle('sel', r.dataset.k === k));
      };
      el.addEventListener('click', (ev) => { const r = ev.target.closest('tr[data-k]'); if (r) pick(r.dataset.k); });
      pick('BE');
    }
  });

  /* =============================================================== 3. hafta */

  const abcCounts = (rows) => `<table class="ax-t"><tbody>${rows.map(([k, v]) => `<tr><td>${k}</td><td><b>${v}</b></td></tr>`).join('')}</tbody></table>`;
  reg('tn-abc', {
    kind: 'tabs',
    panes: [
      { label: 'Algoritma A', html: `<div class="ax-duo">${codePanel(['sum = 0', 'for i = 1 to n', '    sum = sum + i'])}${abcCounts([['Atama', 'n + 1'], ['Toplama', 'n'], ['Toplam', '2n + 1 → O(n)']])}</div>`, text: 'Tek döngü: sum = 0 bir kez, döngüde her turda bir atama ve bir toplama. T(n) = 2n + 1.' },
      { label: 'Algoritma B', html: `<div class="ax-duo">${codePanel(['sum = 0', 'for i = 1 to n', '  for j = 1 to i', '      sum = sum + 1'])}${abcCounts([['Atama', '1 + n(n+1)/2'], ['Toplama', 'n(n+1)/2'], ['Toplam', 'n² + n + 1 → O(n²)']])}</div>`, text: 'İç döngü i kez döner: 1 + 2 + … + n = n(n+1)/2 tur. Çalışma süresi açısından en fazla zamanı B harcar.' },
      { label: 'Algoritma C', html: `<div class="ax-duo">${codePanel(['sum = n * (n + 1) / 2'])}${abcCounts([['Atama', '1'], ['Toplama', '1'], ['Çarpma', '1'], ['Bölme', '1'], ['Toplam', '4 → O(1)']])}</div>`, text: 'Kapalı formül: n ne olursa olsun 4 işlem. Aynı problem, üç farklı büyüme derecesi.' },
      { label: 'Grafik', html: `<svg class="ax-chart" viewBox="0 0 300 160"><line class="ax-axis" x1="30" y1="140" x2="290" y2="140"/><line class="ax-axis" x1="30" y1="10" x2="30" y2="140"/>
        <polyline class="ax-c c2" points="${[1, 2, 3, 4, 5].map((n) => `${30 + (n - 1) * 62},${140 - (n * n + n + 1) * 4}`).join(' ')}"/>
        <polyline class="ax-c c1" points="${[1, 2, 3, 4, 5].map((n) => `${30 + (n - 1) * 62},${140 - (2 * n + 1) * 4}`).join(' ')}"/>
        <polyline class="ax-c c0" points="${[1, 2, 3, 4, 5].map((n) => `${30 + (n - 1) * 62},${140 - 4 * 4}`).join(' ')}"/>
        <text x="240" y="22" class="ax-lbl c2">B: n²+n+1</text><text x="240" y="92" class="ax-lbl c1">A: 2n+1</text><text x="240" y="118" class="ax-lbl c0">C: 4</text>
        ${[1, 2, 3, 4, 5].map((n) => `<text x="${30 + (n - 1) * 62}" y="154" class="ax-tick">${n}</text>`).join('')}</svg>`, text: 'Toplam işlem sayılarının grafiği (slayt 5): n = 5\'te B 31, A 11, C 4 işlem.' }
    ]
  });

  const LOOPS = [
    { t: '1: Tek döngü', code: ['for (i = 1; i <= N; i++)', '    myfunc();'], f: 'Σᵢ₌₁ᴺ 1 = N', o: 'O(N)', run: (N) => { let c = 0; for (let i = 1; i <= N; i++) c++; return c; } },
    { t: '2: i *= 2', code: ['for (i = 1; i <= N; i *= 2)', '    myfunc();'], f: 'Σ (i = 1,2,4,…) 1 = ⌊log₂N⌋ + 1', o: 'O(log₂N)', run: (N) => { let c = 0; for (let i = 1; i <= N; i *= 2) c++; return c; } },
    { t: '3: İç içe N·M', code: ['for (i = 1; i <= N; i++)', '  for (j = 1; j <= M; j++)', '      myfunc();'], f: 'Σᵢ Σⱼ 1 = N·M', o: 'O(NM) ≈ O(N²)', run: (N, M) => N * M },
    { t: '4: j ≤ i', code: ['for (i = 1; i <= N; i++)', '  for (j = 1; j <= i; j++)', '      myfunc();'], f: 'Σᵢ i = N(N+1)/2', o: 'O(N²)', run: (N) => { let c = 0; for (let i = 1; i <= N; i++) for (let j = 1; j <= i; j++) c++; return c; } },
    { t: '5: Üç döngü', code: ['for (i = 1; i <= N; i++)', '  for (j = 1; j <= M; j++)', '    for (k = 1; k <= L; k++)', '        myfunc();'], f: 'N·M·L', o: 'O(NML) ≈ O(N³)', run: (N, M, L) => N * M * L },
    { t: '6: Ard arda', code: ['for (i = 1; i <= N; i++) myfunc();', 'for (i = 1; i <= N; i *= 2) myfunc();'], f: 'N + ⌊log₂N⌋ + 1', o: 'O(N + log₂N) ≈ O(N)', run: (N) => { let c = N; for (let i = 1; i <= N; i *= 2) c++; return c; } },
    { t: '7: Ard arda + iç içe', code: ['for (i = 1; i <= N; i++)', '  for (j = 1; j <= i; j++) myfunc();', 'for (i = 1; i <= N; i++)', '  for (j = 1; j <= M; j++) myfunc();'], f: 'N(N+1)/2 + N·M', o: 'O(N²/2 + N/2) + O(N²) ≈ O(N²)', run: (N, M) => N * (N + 1) / 2 + N * M },
    { t: '8: Dış N, iç ×2', code: ['for (i = 1; i <= N; i++)', '  for (j = 1; j <= M; j *= 2)', '      myfunc();'], f: 'N·(⌊log₂M⌋ + 1)', o: 'O(N log₂M)', run: (N, M) => { let c = 0; for (let j = 1; j <= M; j *= 2) c++; return N * c; } },
    { t: '9: N² ve N³', code: ['for (i = 1; i <= N*N; i++)', '  for (j = 1; j <= N*N*N; j++)', '      myfunc();'], f: 'N²·N³ = N⁵', o: 'O(N⁵)', run: (N) => N ** 5 }
  ];
  reg('loops', {
    kind: 'custom',
    render() {
      return fig('loops', `<div class="dg-tabs">${LOOPS.map((l, i) => `<button type="button" class="dg-tab${i ? '' : ' active'}" data-l="${i}">${l.t}</button>`).join('')}</div>
        <div class="ax-top"><label>N <input type="number" min="1" max="2000" value="16" data-in="N"></label><label>M <input type="number" min="1" max="2000" value="16" data-in="M"></label><label>L <input type="number" min="1" max="200" value="4" data-in="L"></label></div>
        <div class="ax-stage"></div>`, '');
    },
    init(el) {
      let cur = 0;
      const st = el.querySelector('.ax-stage');
      const v = (k) => Math.max(1, parseInt(el.querySelector(`[data-in="${k}"]`).value, 10) || 1);
      const draw = () => {
        const l = LOOPS[cur];
        const N = v('N'); const M = v('M'); const L = v('L');
        const n = l.run(N, M, L);
        st.innerHTML = `<div class="ax-duo">${codePanel(l.code)}<div><div class="ax-formula">${l.f}</div><p class="ax-k">N = ${N}${/M/.test(l.f) ? `, M = ${M}` : ''}${/L/.test(l.f) ? `, L = ${L}` : ''} için myfunc() <b>${n.toLocaleString('tr-TR')}</b> kez çağrılır.</p><p class="ax-o">Karmaşıklık: <b>${l.o}</b></p></div></div>`;
        el.querySelector('.dg-caption').innerHTML = 'Sayı, döngüler tarayıcıda gerçekten çalıştırılarak bulunur. N\'yi iki katına çıkar ve sayının nasıl değiştiğine bak.';
      };
      el.querySelector('.dg-tabs').addEventListener('click', (ev) => {
        const t = ev.target.closest('[data-l]');
        if (!t) return;
        cur = Number(t.dataset.l);
        el.querySelectorAll('[data-l]').forEach((x) => x.classList.toggle('active', x === t));
        draw();
      });
      el.querySelector('.ax-top').addEventListener('input', draw);
      draw();
    }
  });

  const REC = [
    { label: 'x(n−1) + 5', eq: 'x(n) = x(n−1) + 5,  x(1) = 0', steps: 'x(n) = x(n−1) + 5\n     = [x(n−2) + 5] + 5 = x(n−2) + 5·2\n     = [x(n−3) + 5] + 5·2 = x(n−3) + 5·3\n     = … = x(n−i) + 5·i\n     = x(1) + 5·(n−1) = 5(n − 1)', closed: (n) => 5 * (n - 1), rec: (n) => (n === 1 ? 0 : null), f: (n, x) => x(n - 1) + 5, base: 1, res: '5(n − 1) ∈ Θ(n)' },
    { label: '3x(n−1)', eq: 'x(n) = 3x(n−1),  x(1) = 4', steps: 'x(n) = 3x(n−1)\n     = 3[3x(n−2)] = 3²x(n−2)\n     = 3²[3x(n−3)] = 3³x(n−3)\n     = … = 3ⁱx(n−i)\n     = 3ⁿ⁻¹x(1) = 4·3ⁿ⁻¹', closed: (n) => 4 * 3 ** (n - 1), rec: (n) => (n === 1 ? 4 : null), f: (n, x) => 3 * x(n - 1), base: 1, res: '4·3ⁿ⁻¹ ∈ Θ(3ⁿ)' },
    { label: 'x(n−1) + n', eq: 'x(n) = x(n−1) + n,  x(0) = 0', steps: 'x(n) = x(n−1) + n\n     = [x(n−2) + (n−1)] + n\n     = [x(n−3) + (n−2)] + (n−1) + n\n     = … = x(n−i) + (n−i+1) + … + n\n     = x(0) + 1 + 2 + … + n = n(n+1)/2', closed: (n) => n * (n + 1) / 2, rec: (n) => (n === 0 ? 0 : null), f: (n, x) => x(n - 1) + n, base: 0, res: 'n(n+1)/2 ∈ Θ(n²)' },
    { label: 'x(n/2) + n', eq: 'x(n) = x(n/2) + n,  x(1) = 1   (n = 2ᵏ)', steps: 'x(2ᵏ) = x(2ᵏ⁻¹) + 2ᵏ\n      = x(2ᵏ⁻²) + 2ᵏ⁻¹ + 2ᵏ\n      = … = x(2ᵏ⁻ⁱ) + 2ᵏ⁻ⁱ⁺¹ + … + 2ᵏ\n      = x(1) + 2¹ + 2² + … + 2ᵏ = 2ᵏ⁺¹ − 1\n      = 2n − 1', closed: (n) => 2 * n - 1, rec: (n) => (n === 1 ? 1 : null), f: (n, x) => x(n / 2) + n, base: 1, pow: 2, res: '2n − 1 ∈ Θ(n)' },
    { label: 'x(n/3) + 1', eq: 'x(n) = x(n/3) + 1,  x(1) = 1   (n = 3ᵏ)', steps: 'x(3ᵏ) = x(3ᵏ⁻¹) + 1\n      = x(3ᵏ⁻²) + 2\n      = … = x(3ᵏ⁻ⁱ) + i\n      = x(1) + k = 1 + log₃n', closed: (n) => 1 + Math.round(Math.log(n) / Math.log(3)), rec: (n) => (n === 1 ? 1 : null), f: (n, x) => x(n / 3) + 1, base: 1, pow: 3, res: '1 + log₃n ∈ Θ(log n)' }
  ];
  reg('recurrences', {
    kind: 'tabs',
    panes: REC.map((r) => {
      const x = (n) => (n === r.base ? r.rec(n) : r.f(n, x));
      const ns = r.pow ? [1, r.pow, r.pow ** 2, r.pow ** 3, r.pow ** 4] : [r.base + 1, r.base + 2, r.base + 3, 5, 8];
      return {
        label: r.label,
        html: `<div class="ax-duo"><pre class="ax-code ax-plain">${esc(r.eq)}\n\n${esc(r.steps)}</pre><table class="ax-t"><thead><tr><th>n</th><th>özyinelemeyle</th><th>kapalı formül</th></tr></thead><tbody>${ns.map((n) => `<tr><td>${n}</td><td>${x(n)}</td><td>${r.closed(n)}</td></tr>`).join('')}</tbody></table></div>`,
        text: `Sonuç: <b>${r.res}</b>. Tablo, özyinelemeyi doğrudan hesaplayıp kapalı formülle karşılaştırır: iki sütun aynıysa çözüm doğrudur.`
      };
    })
  });

  reg('hanoi', player('hanoi', {
    speed: 800,
    top: () => '<label>Disk sayısı n <select data-in="n"><option>1</option><option>2</option><option selected>3</option><option>4</option><option>5</option></select></label>',
    onInput: () => {},
    frames(el) {
      const n = Number(el.querySelector('[data-in="n"]').value);
      const pegs = [Array.from({ length: n }, (_, i) => n - i), [], []];
      const moves = [];
      (function h(k, from, to, via) { if (k === 0) return; h(k - 1, from, via, to); moves.push([from, to]); h(k - 1, via, to, from); })(n, 0, 2, 1);
      const draw = (hl) => `<div class="ax-hanoi">${pegs.map((p, i) => `<div class="ax-peg${hl && (hl[0] === i || hl[1] === i) ? ' on' : ''}"><div class="ax-rod"></div>${p.map((d) => `<div class="ax-disk" style="width:${24 + d * 18}%;--h:${(d * 47) % 360}"></div>`).reverse().join('')}<span>Ç${i + 1}</span></div>`).join('')}</div>`;
      const fr = [{ html: draw(), text: `${n} disk Ç1'de. Hedef: hepsini Ç3'e taşımak. Gereken hamle: 2ⁿ − 1 = <b>${2 ** n - 1}</b>.` }];
      moves.forEach(([f, t], k) => {
        const d = pegs[f].pop();
        pegs[t].push(d);
        fr.push({ html: draw([f, t]), text: `Hamle ${k + 1} / ${moves.length}: disk ${d}, Ç${f + 1} → Ç${t + 1}${d === n ? ' <b>(en büyük disk: ortadaki adım)</b>' : ''}` });
      });
      return fr;
    }
  }));

  /* =============================================================== 4. hafta */

  reg('seqsearch', player('seqsearch', {
    speed: 900,
    top: () => '<label>Aranan K <select data-in="k"><option value="89">89 (ilk eleman: en iyi)</option><option value="29" selected>29 (ortada)</option><option value="17">17 (son eleman)</option><option value="50">50 (yok: en kötü)</option></select></label>',
    onInput: () => {},
    frames(el) {
      const arr = [89, 45, 68, 90, 29, 34, 17];
      const K = Number(el.querySelector('[data-in="k"]').value);
      const fr = [{ html: arrayRow(arr, {}), text: `K = ${K} aranıyor. Temel işlem: A[i] ≠ K karşılaştırması.` }];
      for (let i = 0; i < arr.length; i++) {
        const hit = arr[i] === K;
        const m = {}; for (let j = 0; j < i; j++) m[j] = 'out'; m[i] = hit ? 'done' : 'cmp';
        fr.push({ html: arrayRow(arr, m), text: `${i + 1}. karşılaştırma: A[${i}] = ${arr[i]} ${hit ? '= K → <b>bulundu</b>, i = ' + i + ' döner.' : '≠ K'}` });
        if (hit) return fr;
      }
      const m = {}; arr.forEach((_, j) => { m[j] = 'out'; });
      fr.push({ html: arrayRow(arr, m), text: `Dizi bitti: <b>−1</b> döner. n = ${arr.length} karşılaştırma yapıldı: <b>en kötü durum</b> C_worst = n.` });
      return fr;
    }
  }));

  reg('avg-p', {
    kind: 'custom',
    render() {
      return fig('avg-p', `<div class="ax-top"><label>n <input type="number" min="1" max="1000" value="100" data-in="n"></label><label>p (başarı olasılığı) <input type="range" min="0" max="1" step="0.05" value="1" data-in="p"> <b data-out="p">1</b></label></div><div class="ax-stage"></div>`, 'p\'yi değiştir: C_avg en iyi (1) ile en kötü (n) arasında nerede duruyor?');
    },
    init(el) {
      const st = el.querySelector('.ax-stage');
      const draw = () => {
        const n = Math.max(1, parseInt(el.querySelector('[data-in="n"]').value, 10) || 1);
        const p = Number(el.querySelector('[data-in="p"]').value);
        el.querySelector('[data-out="p"]').textContent = p.toFixed(2);
        const avg = p * (n + 1) / 2 + n * (1 - p);
        const bar = (lbl, v, cls) => `<div class="ax-hbar ${cls}"><span>${lbl}</span><div><i style="width:${(v / n) * 100}%"></i></div><b>${Number.isInteger(v) ? v : v.toFixed(2)}</b></div>`;
        st.innerHTML = `${bar('C_best', 1, 'c0')}${bar('C_avg', avg, 'c1')}${bar('C_worst', n, 'c2')}<p class="ax-formula">C_avg = p(n+1)/2 + n(1−p) = ${p.toFixed(2)}·${n + 1}/2 + ${n}·${(1 - p).toFixed(2)} = <b>${avg.toFixed(2)}</b></p>`;
      };
      el.querySelector('.ax-top').addEventListener('input', draw);
      draw();
    }
  });

  /* =============================================================== 5. hafta */

  const boundSvg = (kind) => {
    const P = (f) => Array.from({ length: 41 }, (_, k) => { const x = k / 40; return `${30 + x * 250},${150 - f(x) * 130}`; }).join(' ');
    const t = (x) => 0.18 + 0.55 * x * x + 0.06 * Math.sin(x * 9);
    const up = (x) => 0.32 + 0.62 * x * x;
    const lo = (x) => 0.08 + 0.45 * x * x;
    const n0 = 30 + 0.22 * 250;
    return `<svg class="ax-chart" viewBox="0 0 300 165"><line class="ax-axis" x1="30" y1="150" x2="290" y2="150"/><line class="ax-axis" x1="30" y1="10" x2="30" y2="150"/>
      <line class="ax-n0" x1="${n0}" y1="12" x2="${n0}" y2="150"/><text class="ax-tick" x="${n0}" y="162">n₀</text><text class="ax-tick" x="282" y="162">n</text>
      ${kind !== 'omega' ? `<polyline class="ax-c c2" points="${P(up)}"/><text class="ax-lbl c2" x="236" y="${150 - up(0.95) * 130}">${kind === 'theta' ? 'c₁g(n)' : 'cg(n)'}</text>` : ''}
      ${kind !== 'oh' ? `<polyline class="ax-c c0" points="${P(lo)}"/><text class="ax-lbl c0" x="250" y="${150 - lo(1) * 130 + 14}">${kind === 'theta' ? 'c₂g(n)' : 'cg(n)'}</text>` : ''}
      <polyline class="ax-c c1" points="${P(t)}"/><text class="ax-lbl c1" x="262" y="${150 - t(1) * 130 + 4}">t(n)</text>
      <text class="ax-tick" x="45" y="24">n₀\'dan önce önemsiz</text></svg>`;
  };
  reg('bounds', {
    kind: 'tabs',
    panes: [
      { label: 'O: üst sınır', html: boundSvg('oh'), text: '<b>t(n) ∈ O(g(n))</b>: n₀\'dan sonra t(n) her zaman <b>c·g(n)\'nin altında</b>. Soldaki bölge önemsizdir (doesn\'t matter).' },
      { label: 'Ω: alt sınır', html: boundSvg('omega'), text: '<b>t(n) ∈ Ω(g(n))</b>: n₀\'dan sonra t(n) her zaman <b>c·g(n)\'nin üstünde</b>.' },
      { label: 'Θ: sıkı sınır', html: boundSvg('theta'), text: '<b>t(n) ∈ Θ(g(n))</b>: n₀\'dan sonra t(n), <b>c₂·g(n) ile c₁·g(n) arasında</b> sıkışmış.' }
    ]
  });

  const CLASSES = [
    ['c1', '1', 'Sabit', 'Dizinin ilk elemanına erişmek, kapalı formül (Algoritma C)'],
    ['clog', 'log n', 'Logaritmik', 'İkili arama; her adımda problemi sabit oranla küçültenler'],
    ['cn', 'n', 'Doğrusal', 'Sıralı arama, en büyük eleman'],
    ['cnlog', 'n log n', 'Doğrusal-logaritmik', 'Merge sort, quick sort (ortalama): böl-fethet'],
    ['cn2', 'n²', 'Kare', 'İç içe iki döngü: selection, bubble, insertion'],
    ['cn3', 'n³', 'Küp', 'İç içe üç döngü: tanımla matris çarpımı'],
    ['c2n', '2ⁿ', 'Üstel', 'Bir kümenin tüm alt kümeleri, Hanoi kuleleri'],
    ['cfact', 'n!', 'Faktöriyel', 'Tüm permütasyonlar: kaba kuvvet gezgin satıcı']
  ];
  reg('classes', {
    kind: 'explorer',
    hint: 'Hızlıdan yavaşa sıralı. Bir sınıfa tıkla: tipik algoritması ve n = 10⁶ için işlem sayısı.',
    html: `<div class="dg-col ax-classes">${CLASSES.map(([k, f, n], i) => `<div class="dg-b ax-cls" data-k="${k}" style="--w:${18 + i * 11}%"><b>${f}</b><small>${n}</small></div>`).join('')}</div>`,
    info: Object.fromEntries(CLASSES.map(([k, f, n, ex]) => {
      const N = 1e6;
      const ops = { c1: '1', clog: '≈ 20', cn: '10⁶', cnlog: '≈ 2·10⁷', cn2: '10¹²', cn3: '10¹⁸', c2n: '≈ 10³⁰¹⁰³⁰', cfact: '≈ 10⁵⁵⁶⁵⁷⁰⁹' }[k];
      return [k, `<b>${n} — ${f}</b>: ${ex}. n = ${N.toLocaleString('tr-TR')} için ≈ <b>${ops}</b> işlem.`];
    }))
  });

  reg('limits', {
    kind: 'tabs',
    panes: [
      { label: '½n(n−1) ve n²', html: '<pre class="ax-code ax-plain">lim ½n(n−1) / n² = ½ lim (n² − n) / n²\n                 = ½ lim (1 − 1/n) = ½</pre>', text: 'Limit <b>sabit (½)</b> → eşit büyüme derecesi: <b>½n(n−1) ∈ Θ(n²)</b>.' },
      { label: 'log₂n ve √n', html: '<pre class="ax-code ax-plain">lim log₂n / √n  = lim (log₂n)′ / (√n)′          (L\'Hôpital)\n               = lim (log₂e · 1/n) / (1 / 2√n)\n               = 2 log₂e · lim 1/√n = 0</pre>', text: 'Limit <b>0</b> → log₂n\'nin büyüme derecesi daha küçük: log₂n ∈ O(√n).' },
      { label: 'n! ve 2ⁿ', html: '<pre class="ax-code ax-plain">lim n! / 2ⁿ = lim √(2πn)·(n/e)ⁿ / 2ⁿ             (Stirling)\n            = lim √(2πn) · nⁿ / (2ⁿeⁿ)\n            = lim √(2πn) · (n / 2e)ⁿ = ∞</pre>', text: 'Limit <b>∞</b> → n! daha hızlı büyür: <b>n! ∈ Ω(2ⁿ)</b>.' }
    ]
  });

  /* =============================================================== 6. hafta: sıralama */

  const MARKS = { selection: ['min', 'cmp', 'swap', 'done'], bubble: ['cmp', 'swap', 'done'], insertion: ['key', 'cmp', 'write', 'done'], merge: ['range', 'write', 'done'], quick: ['pivot', 'cmp', 'key', 'swap', 'done'] };
  function sortPlayer(id, algo, input) {
    return player(id, {
      speed: 850,
      frames() {
        const s = A.SORTS[algo];
        return s.trace(input).map((f) => ({
          html: `<div class="ax-sort">${arrayRow(f.a, f.mark)}<div class="ax-sortside">${codePanel(A.CODE[algo], f.line)}<div class="ax-counters"><span>Karşılaştırma <b>${f.cmp}</b></span><span>${algo === 'merge' || algo === 'insertion' ? 'Yazma' : 'Yer değiştirme'} <b>${f.swp}</b></span></div></div>${legend(MARKS[algo])}</div>`,
          text: f.text
        }));
      }
    });
  }
  reg('sort-selection', sortPlayer('sort-selection', 'selection', [89, 45, 68, 90, 29, 34, 17]));
  reg('sort-bubble', sortPlayer('sort-bubble', 'bubble', [89, 45, 68, 90, 29, 34, 17]));
  reg('sort-insertion', sortPlayer('sort-insertion', 'insertion', [89, 45, 68, 90, 29, 34]));
  reg('sort-quick', sortPlayer('sort-quick', 'quick', [5, 3, 1, 9, 8, 2, 4, 7]));

  const grp = (k, parts, cls) => `<div class="ax-mrow" data-k="${k}">${parts.map((p) => `<span class="ax-mg ${cls || ''}">${p.join(' ')}</span>`).join('')}</div>`;
  reg('merge-tree', {
    kind: 'stepper',
    intro: 'Slayt 10\'daki örnek: 8 3 2 9 7 1 5 4. İleri\'ye bas: önce bölünme, sonra birleşme.',
    html: `<div class="ax-mtree">${grp('r0', [[8, 3, 2, 9, 7, 1, 5, 4]])}${grp('r1', [[8, 3, 2, 9], [7, 1, 5, 4]], 'sp')}${grp('r2', [[8, 3], [2, 9], [7, 1], [5, 4]], 'sp')}${grp('r3', [[8], [3], [2], [9], [7], [1], [5], [4]], 'sp')}${grp('r4', [[3, 8], [2, 9], [1, 7], [4, 5]], 'mg')}${grp('r5', [[2, 3, 8, 9], [1, 4, 5, 7]], 'mg')}${grp('r6', [[1, 2, 3, 4, 5, 7, 8, 9]], 'mg')}</div>`,
    steps: [
      { on: ['r1'], text: '<b>Böl:</b> 8 elemanlı dizi ⌊n/2⌋ = 4\'erli iki diziye (B ve C) bölünür.' },
      { on: ['r2'], text: '<b>Böl:</b> her yarı yine ikiye bölünür.' },
      { on: ['r3'], text: '<b>Temel durum:</b> tek elemanlı diziler zaten sıralıdır.' },
      { on: ['r4'], text: '<b>Birleştir:</b> [8]+[3] → [3 8] (1 karşılaştırma), [2]+[9] → [2 9], [7]+[1] → [1 7], [5]+[4] → [4 5].' },
      { on: ['r5'], text: '<b>Birleştir:</b> [3 8]+[2 9]: 2, 3, 8 sırayla yazılır, B boşalınca 9 karşılaştırmasız kopyalanır.' },
      { on: ['r6'], text: '<b>Birleştir:</b> son birleştirme. Ağacın yüksekliği log₂8 = 3; her seviyede en fazla n − 1 karşılaştırma → n log₂n civarı.' }
    ]
  });

  reg('master', {
    kind: 'custom',
    render() {
      return fig('master', `<div class="ax-top"><span class="ax-formula">T(n) = <input type="number" min="1" max="64" value="2" data-in="a"> T(n / <input type="number" min="2" max="16" value="2" data-in="b">) + Θ(n^<input type="number" min="0" max="6" step="0.5" value="1" data-in="d">)</span>
        <span class="ax-presets"><button type="button" class="btn btn-sm btn-ghost" data-p="2,2,1">Merge sort</button><button type="button" class="btn btn-sm btn-ghost" data-p="2,2,0">n sayının toplamı</button><button type="button" class="btn btn-sm btn-ghost" data-p="4,2,1">4T(n/2)+n</button><button type="button" class="btn btn-sm btn-ghost" data-p="4,2,2">4T(n/2)+n²</button><button type="button" class="btn btn-sm btn-ghost" data-p="4,2,3">4T(n/2)+n³</button></span></div><div class="ax-stage"></div>`, 'a, b ve d\'yi değiştir ya da bir örnek seç.');
    },
    init(el) {
      const st = el.querySelector('.ax-stage');
      const v = (k) => Number(el.querySelector(`[data-in="${k}"]`).value);
      const draw = () => {
        const a = v('a'); const b2 = v('b'); const d = v('d');
        const bd = b2 ** d;
        const lg = Math.log(a) / Math.log(b2);
        const eq = Math.abs(a - bd) < 1e-9;
        const [cas, res] = eq ? ['a = bᵈ', `Θ(n${d === 1 ? '' : '^' + d} log n)`] : a < bd ? ['a &lt; bᵈ', `Θ(n${d === 1 ? '' : '^' + d})`] : ['a &gt; bᵈ', `Θ(n^log_${b2} ${a}) = Θ(n^${Number.isInteger(lg) ? lg : lg.toFixed(3)})`];
        st.innerHTML = `<div class="ax-master"><div class="${!eq && a < bd ? 'on' : ''}">a &lt; bᵈ<br><b>Θ(nᵈ)</b></div><div class="${eq ? 'on' : ''}">a = bᵈ<br><b>Θ(nᵈ log n)</b></div><div class="${!eq && a > bd ? 'on' : ''}">a &gt; bᵈ<br><b>Θ(n^log_b a)</b></div></div>
          <p class="ax-k">a = ${a}, bᵈ = ${b2}^${d} = ${Number.isInteger(bd) ? bd : bd.toFixed(3)} → <b>${cas}</b> → T(n) ∈ <b>${res}</b></p>`;
      };
      el.querySelector('.ax-top').addEventListener('input', draw);
      el.querySelector('.ax-top').addEventListener('click', (ev) => {
        const p = ev.target.closest('[data-p]');
        if (!p) return;
        const [a, b2, d] = p.dataset.p.split(',');
        el.querySelector('[data-in="a"]').value = a;
        el.querySelector('[data-in="b"]').value = b2;
        el.querySelector('[data-in="d"]').value = d;
        draw();
      });
      draw();
    }
  });

  /* =============================================================== 7. hafta: gezgin satıcı */

  const SLIDE_G = { nodes: [{ id: 'a', x: 70, y: 40 }, { id: 'b', x: 250, y: 40 }, { id: 'c', x: 70, y: 180 }, { id: 'd', x: 250, y: 180 }], edges: [['a', 'b', 2], ['a', 'c', 5], ['a', 'd', 7], ['b', 'c', 8], ['b', 'd', 3], ['c', 'd', 1]] };
  OSLab.algoUI.SLIDE_G = SLIDE_G;
  reg('tsp-slide', {
    kind: 'custom',
    render() {
      const w = (u, v) => SLIDE_G.edges.find(([x, y]) => (x === u && y === v) || (x === v && y === u))[2];
      const tours = A.permutationsOf(['b', 'c', 'd'], 3).map((p) => {
        const t = ['a', ...p, 'a'];
        const parts = t.slice(1).map((v, i) => w(t[i], v));
        return { t, parts, L: parts.reduce((s, x) => s + x, 0) };
      });
      const min = Math.min(...tours.map((x) => x.L));
      return fig('tsp-slide', `<div class="ax-duo"><div class="ax-g"></div><table class="ax-t ax-click"><thead><tr><th>Tur</th><th>Uzunluk</th></tr></thead><tbody>${tours.map((x, i) => `<tr data-k="${i}" data-path="${x.t.join(',')}" class="${x.L === min ? 'ax-min' : ''}"><td>${x.t.join(' → ')}</td><td>${x.parts.join(' + ')} = <b>${x.L}</b>${x.L === min ? ' ✓' : ''}</td></tr>`).join('')}</tbody></table></div>`, 'a sabit, kalan 3 şehrin 3! = 6 sıralaması. Her tur iki kez görünür (ters yön): 3 farklı tur. En kısa: <b>11</b>. Bir satıra tıkla.');
    },
    init(el) {
      const g = el.querySelector('.ax-g');
      const pick = (row) => {
        const p = row.dataset.path.split(',');
        g.innerHTML = graphSvg(SLIDE_G, p.slice(1).map((v, i) => `${p[i]}-${v}`), { w: 320, h: 220, order: p.slice(0, -1) });
        el.querySelectorAll('tr[data-k]').forEach((r) => r.classList.toggle('sel', r === row));
      };
      el.addEventListener('click', (ev) => { const r = ev.target.closest('tr[data-k]'); if (r) pick(r); });
      pick(el.querySelector('tr.ax-min'));
    }
  });

  const LAB2_G = { nodes: [{ id: 'A', x: 50, y: 110 }, { id: 'B', x: 170, y: 45 }, { id: 'C', x: 310, y: 45 }, { id: 'D', x: 420, y: 110 }, { id: 'E', x: 310, y: 175 }, { id: 'F', x: 170, y: 175 }], edges: [['A', 'B', 9], ['A', 'F', 4], ['B', 'F', 1], ['B', 'C', 5], ['B', 'E', 3], ['C', 'E', 3], ['C', 'D', 8], ['E', 'D', 7], ['F', 'E', 2]] };
  OSLab.algoUI.LAB2_G = LAB2_G;
  reg('lab2-graph', {
    kind: 'tabs',
    panes: [
      { label: 'Graf', html: graphSvg(LAB2_G, [], { w: 470, h: 220 }), text: 'Lab 2\'deki 6 şehir ve aralarındaki yollar (9 kenar).' },
      { label: 'En kısa yol (dönüşsüz)', html: graphSvg(LAB2_G, ['B-F', 'F-E', 'E-C'], { w: 470, h: 220, order: ['B', 'F', 'E', 'C'] }), text: '<b>B → F → E → C</b> = 1 + 2 + 3 = <b>6</b>. 360 sıralı seçimden 62\'si geçerli yol.' },
      { label: 'En kısa devre (dönüşlü)', html: graphSvg(LAB2_G, ['B-F', 'F-E', 'E-C', 'C-B'], { w: 470, h: 220, order: ['B', 'F', 'E', 'C'] }), text: '<b>B → F → E → C → B</b> = 1 + 2 + 3 + 5 = <b>11</b>.' }
    ]
  });
})(window.OSLab = window.OSLab || {});
