/*
 * algos.js — Derste geçen algoritmaların iki hali:
 *   1) trace(): her karşılaştırma / yer değiştirme için bir "kare" üreten, slaytlardaki sözde kodun
 *      birebir karşılığı. Laboratuvardaki adım adım izleme ve ders şekilleri bunu oynatır.
 *   2) run(): süre ölçümü için hiçbir kayıt tutmayan hızlı sürüm (Int32Array üzerinde, yerinde).
 *
 * Kare biçimi: { a: [...dizi], mark: { indis: 'cmp'|'swap'|'min'|'key'|'pivot'|'done'|'range'|'write' },
 *               text: 'açıklama', cmp: karşılaştırma sayısı, swp: yer değiştirme / yazma sayısı,
 *               line: sözde kodda vurgulanacak satır }
 */
(function (OSLab) {
  'use strict';

  /* ------------------------------------------------------------ kayıt yardımcısı */

  function recorder(input) {
    const a = input.slice();
    const frames = [];
    const st = { cmp: 0, swp: 0 };
    const done = new Set();
    const push = (mark, text, line, extra) => {
      const m = {};
      done.forEach((i) => { m[i] = 'done'; });
      Object.assign(m, mark || {});
      frames.push(Object.assign({ a: a.slice(), mark: m, text, cmp: st.cmp, swp: st.swp, line }, extra || {}));
    };
    return { a, frames, st, done, push };
  }

  /* ------------------------------------------------------------ sözde kodlar (slaytlardaki gibi) */

  const CODE = {
    selection: [
      'ALGORITHM SelectionSort(A[0..n−1])',
      'for i ← 0 to n − 2 do',
      '    min ← i',
      '    for j ← i + 1 to n − 1 do',
      '        if A[j] < A[min]  min ← j',
      '    swap A[i] and A[min]'
    ],
    bubble: [
      'ALGORITHM BubbleSort(A[0..n−1])',
      'for i ← 0 to n − 2 do',
      '    for j ← 0 to n − 2 − i do',
      '        if A[j + 1] < A[j]',
      '            swap A[j] and A[j + 1]'
    ],
    insertion: [
      'ALGORITHM InsertionSort(A[0..n−1])',
      'for i ← 1 to n − 1 do',
      '    v ← A[i];  j ← i − 1',
      '    while j ≥ 0 and A[j] > v do',
      '        A[j + 1] ← A[j];  j ← j − 1',
      '    A[j + 1] ← v'
    ],
    merge: [
      'ALGORITHM Mergesort(A[0..n−1])',
      'if n > 1',
      '  B ← A[0..⌊n/2⌋−1];  C ← A[⌊n/2⌋..n−1]',
      '  Mergesort(B);  Mergesort(C)',
      '  Merge(B, C, A):',
      '    B[i] ≤ C[j] ise A[k] ← B[i], değilse C[j]',
      '    biri boşalınca kalanı A\'ya kopyala'
    ],
    quick: [
      'ALGORITHM Quicksort(A[l..r])',
      'if l < r',
      '  s ← HoarePartition(A[l..r]), p ← A[l]',
      '    i→ A[i] ≥ p olana,  j← A[j] ≤ p olana',
      '    i < j ise swap(A[i], A[j])',
      '    i ≥ j olunca swap(A[l], A[j])',
      '  Quicksort(A[l..s−1])',
      '  Quicksort(A[s+1..r])'
    ]
  };

  /* ------------------------------------------------------------ adım adım izler */

  function traceSelection(input) {
    const R = recorder(input);
    const { a, st, done, push } = R;
    const n = a.length;
    push({}, 'Başlangıç dizisi. Her turda sıralanmamış kısmın en küçüğü bulunup başa konacak.', 0);
    for (let i = 0; i <= n - 2; i++) {
      let min = i;
      push({ [i]: 'min' }, `i = ${i}: min ← ${i} (A[${i}] = ${a[i]}). Şimdi i+1'den sona kadar daha küçüğü aranır.`, 2);
      for (let j = i + 1; j <= n - 1; j++) {
        st.cmp++;
        const less = a[j] < a[min];
        push({ [min]: 'min', [j]: 'cmp' }, `A[${j}] = ${a[j]} < A[min] = ${a[min]} ? ${less ? '<b>Evet</b>, min ← ' + j : 'Hayır'}`, 4);
        if (less) min = j;
      }
      if (min !== i) {
        [a[i], a[min]] = [a[min], a[i]];
        st.swp++;
        push({ [i]: 'swap', [min]: 'swap' }, `swap A[${i}] ↔ A[${min}]: en küçük eleman (${a[i]}) ${i}. sıraya yerleşti.`, 5);
      } else {
        push({ [i]: 'swap' }, `En küçük zaten A[${i}] = ${a[i]}; yer değiştirme kendisiyle olur.`, 5);
      }
      done.add(i);
    }
    done.add(n - 1);
    push({}, `Sıralandı. Karşılaştırma sayısı her girdide aynıdır: n(n−1)/2 = ${n * (n - 1) / 2}.`, 0, { end: true });
    return R.frames;
  }

  function traceBubble(input, opts) {
    const early = opts && opts.early;
    const R = recorder(input);
    const { a, st, done, push } = R;
    const n = a.length;
    push({}, `Başlangıç dizisi. Komşu elemanlar karşılaştırılır; büyük olan sağa "kabarcık" gibi çıkar.${early ? ' (İyileştirilmiş sürüm: bir turda hiç yer değiştirme olmazsa durur.)' : ''}`, 0);
    for (let i = 0; i <= n - 2; i++) {
      let swapped = false;
      for (let j = 0; j <= n - 2 - i; j++) {
        st.cmp++;
        const sw = a[j + 1] < a[j];
        push({ [j]: 'cmp', [j + 1]: 'cmp' }, `i = ${i}, j = ${j}: A[${j + 1}] = ${a[j + 1]} < A[${j}] = ${a[j]} ? ${sw ? '<b>Evet</b> → yer değiştir' : 'Hayır'}`, 3);
        if (sw) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          st.swp++;
          swapped = true;
          push({ [j]: 'swap', [j + 1]: 'swap' }, `swap: ${a[j + 1]} sağa geçti.`, 4);
        }
      }
      done.add(n - 1 - i);
      if (early && !swapped) {
        for (let k = 0; k < n; k++) done.add(k);
        push({}, `Bu turda hiç yer değiştirme olmadı → dizi sıralı, erken çıkış. (En iyi durum O(n) ancak bu iyileştirmeyle mümkündür.)`, 0, { end: true });
        return R.frames;
      }
      push({}, `i = ${i} turu bitti: en büyük ${i + 1} eleman yerine oturdu.`, 1);
    }
    done.add(0);
    push({}, `Sıralandı. ${st.cmp} karşılaştırma, ${st.swp} yer değiştirme.`, 0, { end: true });
    return R.frames;
  }

  function traceInsertion(input) {
    const R = recorder(input);
    const { a, st, push } = R;
    const n = a.length;
    push({ 0: 'done' }, 'Başlangıç. Tek elemanlı A[0] kendi başına sıralıdır; her turda bir sonraki eleman sıralı kısma eklenir.', 0);
    const sortedUpTo = (k) => { const m = {}; for (let x = 0; x <= k; x++) m[x] = 'done'; return m; };
    for (let i = 1; i <= n - 1; i++) {
      const v = a[i];
      let j = i - 1;
      push(Object.assign(sortedUpTo(i - 1), { [i]: 'key' }), `i = ${i}: v ← A[${i}] = ${v}. Sıralı kısımda (0..${i - 1}) yeri aranır.`, 2);
      while (j >= 0) {
        st.cmp++;
        const gt = a[j] > v;
        push(Object.assign(sortedUpTo(i - 1), { [j]: 'cmp', [j + 1]: 'key' }), `A[${j}] = ${a[j]} > v = ${v} ? ${gt ? '<b>Evet</b> → A[' + j + '] bir sağa kayar' : 'Hayır → yer bulundu'}`, 3);
        if (!gt) break;
        a[j + 1] = a[j];
        st.swp++;
        a[j] = v; // görselde boşluk yerine v gösterilir
        push(Object.assign(sortedUpTo(i), { [j]: 'key', [j + 1]: 'write' }), `A[${j + 1}] ← ${a[j + 1]}`, 4);
        j--;
      }
      a[j + 1] = v;
      push(sortedUpTo(i), `A[${j + 1}] ← v = ${v}. Artık ilk ${i + 1} eleman sıralı.`, 5);
    }
    push(sortedUpTo(n - 1), `Sıralandı. ${st.cmp} karşılaştırma (en iyi n−1 = ${n - 1}, en kötü n(n−1)/2 = ${n * (n - 1) / 2}).`, 0, { end: true });
    return R.frames;
  }

  function traceMerge(input) {
    const R = recorder(input);
    const { a, st, push } = R;
    const n = a.length;
    const rangeMark = (l, r, extra) => { const m = {}; for (let x = l; x <= r; x++) m[x] = 'range'; return Object.assign(m, extra || {}); };
    push({}, 'Başlangıç. Dizi tek elemanlı parçalara kadar ikiye bölünür, sonra sıralı parçalar birleştirilir.', 0);
    function sort(l, r, depth) {
      if (l >= r) return;
      const m = Math.floor((l + r + 1) / 2); // B = A[l..m−1] (⌊n/2⌋ eleman), C = A[m..r]
      push(rangeMark(l, r), `Böl: [${a.slice(l, r + 1).join(', ')}] → B = [${a.slice(l, m).join(', ')}], C = [${a.slice(m, r + 1).join(', ')}]`, 2, { depth });
      sort(l, m - 1, depth + 1);
      sort(m, r, depth + 1);
      const B = a.slice(l, m);
      const C = a.slice(m, r + 1);
      let i = 0;
      let j = 0;
      let k = l;
      while (i < B.length && j < C.length) {
        st.cmp++;
        if (B[i] <= C[j]) {
          a[k] = B[i];
          push(rangeMark(l, r, { [k]: 'write' }), `Birleştir: B[i] = ${B[i]} ≤ C[j] = ${C[j]} → A[${k}] ← ${B[i]}`, 5, { depth });
          i++;
        } else {
          a[k] = C[j];
          push(rangeMark(l, r, { [k]: 'write' }), `Birleştir: B[i] = ${B[i]} > C[j] = ${C[j]} → A[${k}] ← ${C[j]}`, 5, { depth });
          j++;
        }
        st.swp++;
        k++;
      }
      while (i < B.length) { a[k] = B[i++]; st.swp++; k++; }
      while (j < C.length) { a[k] = C[j++]; st.swp++; k++; }
      push(rangeMark(l, r), `Birleşti: [${a.slice(l, r + 1).join(', ')}]${B.length && C.length ? ' (bir dizi boşalınca kalan elemanlar karşılaştırmasız kopyalandı)' : ''}`, 6, { depth });
    }
    sort(0, n - 1, 0);
    const all = {}; for (let x = 0; x < n; x++) all[x] = 'done';
    push(all, `Sıralandı. ${st.cmp} karşılaştırma. En kötü durum: n·log₂n − n + 1.`, 0, { end: true });
    return R.frames;
  }

  // Hoare bölümlemesi (slayt: HoarePartition, pivot = ilk eleman)
  function traceQuick(input) {
    const R = recorder(input);
    const { a, st, done, push } = R;
    const n = a.length;
    push({}, 'Başlangıç. Pivot (mihenk) olarak alt dizinin ilk elemanı seçilir; küçükler sola, büyükler sağa atılır.', 0);
    function partition(l, r) {
      const p = a[l];
      let i = l;
      let j = r + 1;
      push({ [l]: 'pivot' }, `Bölümle A[${l}..${r}]: p ← A[${l}] = ${p}`, 2);
      for (;;) {
        do {
          i++;
          if (i > r) break;
          st.cmp++;
          push({ [l]: 'pivot', [i]: 'cmp' }, `i → ${i}: A[${i}] = ${a[i]} ≥ p = ${p} ? ${a[i] >= p ? '<b>Evet</b>, i durur' : 'Hayır, devam'}`, 3);
        } while (a[i] < p);
        do {
          j--;
          st.cmp++;
          push({ [l]: 'pivot', [j]: 'cmp', ...(i <= r ? { [i]: 'key' } : {}) }, `j → ${j}: A[${j}] = ${a[j]} ≤ p = ${p} ? ${a[j] <= p ? '<b>Evet</b>, j durur' : 'Hayır, devam'}`, 3);
        } while (a[j] > p);
        if (i >= j) break;
        [a[i], a[j]] = [a[j], a[i]];
        st.swp++;
        push({ [l]: 'pivot', [i]: 'swap', [j]: 'swap' }, `i = ${i} < j = ${j} → swap(A[${i}], A[${j}])`, 4);
      }
      [a[l], a[j]] = [a[j], a[l]];
      st.swp++;
      done.add(j);
      push({ [j]: 'pivot' }, `i ≥ j → swap(A[${l}], A[${j}]): pivot ${p} son yerine (${j}) oturdu. Solu ≤ ${p}, sağı ≥ ${p}.`, 5);
      return j;
    }
    function sort(l, r) {
      if (l < r) {
        const s = partition(l, r);
        sort(l, s - 1);
        sort(s + 1, r);
      } else if (l === r) done.add(l);
    }
    sort(0, n - 1);
    for (let x = 0; x < n; x++) done.add(x);
    push({}, `Sıralandı. ${st.cmp} karşılaştırma, ${st.swp} yer değiştirme.`, 0, { end: true });
    return R.frames;
  }

  /* ------------------------------------------------------------ hızlı sürümler (süre ölçümü) */

  function runSelection(a) {
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) if (a[j] < a[min]) min = j;
      const t = a[i]; a[i] = a[min]; a[min] = t;
    }
  }
  function runBubble(a) {
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        if (a[j + 1] < a[j]) { const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; }
      }
    }
  }
  function runInsertion(a) {
    const n = a.length;
    for (let i = 1; i < n; i++) {
      const v = a[i];
      let j = i - 1;
      while (j >= 0 && a[j] > v) { a[j + 1] = a[j]; j--; }
      a[j + 1] = v;
    }
  }
  function runMerge(a) {
    const n = a.length;
    const tmp = new Int32Array(n);
    function sort(l, r) {
      if (r - l < 1) return;
      const m = (l + r + 1) >> 1;
      sort(l, m - 1);
      sort(m, r);
      let i = l; let j = m; let k = l;
      while (i < m && j <= r) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
      while (i < m) tmp[k++] = a[i++];
      while (j <= r) tmp[k++] = a[j++];
      for (k = l; k <= r; k++) a[k] = tmp[k];
    }
    sort(0, n - 1);
  }
  function runQuick(a) {
    // Hoare bölümlemesi, pivot = ilk eleman. Özyineleme derinliği taşmasın diye küçük parçadan ilerlenir.
    function partition(l, r) {
      const p = a[l];
      let i = l; let j = r + 1;
      for (;;) {
        do { i++; } while (i <= r && a[i] < p);
        do { j--; } while (a[j] > p);
        if (i >= j) break;
        const t = a[i]; a[i] = a[j]; a[j] = t;
      }
      const t = a[l]; a[l] = a[j]; a[j] = t;
      return j;
    }
    function sort(l, r) {
      while (l < r) {
        const s = partition(l, r);
        if (s - l < r - s) { sort(l, s - 1); l = s + 1; } else { sort(s + 1, r); r = s - 1; }
      }
    }
    sort(0, a.length - 1);
  }

  const SORTS = {
    insertion: { id: 'insertion', name: 'Insertion Sort', tr: 'Eklemeli Sıralama', trace: traceInsertion, run: runInsertion, best: 'Θ(n)', avg: 'Θ(n²)', worst: 'Θ(n²)', bestCase: 'sıralı dizi', worstCase: 'ters sıralı dizi', technique: 'Azalt-Fethet', order: 2, color: '#38bdf8' },
    selection: { id: 'selection', name: 'Selection Sort', tr: 'Seçmeli Sıralama', trace: traceSelection, run: runSelection, best: 'Θ(n²)', avg: 'Θ(n²)', worst: 'Θ(n²)', bestCase: 'yok, her girdide aynı', worstCase: 'yok, her girdide aynı', technique: 'Kaba Kuvvet', order: 2, color: '#a78bfa' },
    bubble: { id: 'bubble', name: 'Bubble Sort', tr: 'Kabarcık Sıralama', trace: traceBubble, run: runBubble, best: 'Θ(n²) (bayraklı sürüm: Θ(n))', avg: 'Θ(n²)', worst: 'Θ(n²)', bestCase: 'sıralı dizi (yalnızca bayraklı sürümde fark eder)', worstCase: 'ters sıralı dizi', technique: 'Kaba Kuvvet', order: 2, color: '#f472b6' },
    merge: { id: 'merge', name: 'Merge Sort', tr: 'Birleştirmeli Sıralama', trace: traceMerge, run: runMerge, best: 'Θ(n log n)', avg: 'Θ(n log n)', worst: 'Θ(n log n)', bestCase: '—', worstCase: 'birleştirmede diziler son karşılaştırmaya kadar boşalmaz', technique: 'Böl-Fethet', order: 1, color: '#34d399' },
    quick: { id: 'quick', name: 'Quick Sort', tr: 'Hızlı (Çabuk) Sıralama', trace: traceQuick, run: runQuick, best: 'Θ(n log n)', avg: 'Θ(n log n)', worst: 'Θ(n²)', bestCase: 'her bölümleme tam ortadan', worstCase: 'sıralı/ters sıralı dizi, pivot hep uçta kalır', technique: 'Böl-Fethet', order: 1, color: '#fbbf24' }
  };
  const SORT_ORDER = ['insertion', 'selection', 'bubble', 'merge', 'quick'];

  /* ------------------------------------------------------------ diğer küçük algoritmalar */

  // Euclid: adımlar
  function euclidSteps(m, n) {
    const steps = [];
    while (n !== 0) {
      steps.push({ m, n, r: m % n });
      [m, n] = [n, m % n];
    }
    return { gcd: m, steps };
  }
  // Ardışık tamsayı kontrolü: kaç deneme yapılır
  function consecutiveSteps(m, n) {
    if (m === 0 || n === 0) return { gcd: null, tries: 0, broken: true };
    let t = Math.min(m, n);
    let tries = 0;
    for (;;) {
      tries++;
      if (m % t === 0 && n % t === 0) return { gcd: t, tries };
      t--;
    }
  }

  // Gezgin satıcı / k şehirlik yol: tüm sıralı seçimleri üretir
  function permutationsOf(items, k) {
    const out = [];
    const used = new Array(items.length).fill(false);
    const cur = [];
    (function rec() {
      if (cur.length === k) { out.push(cur.slice()); return; }
      for (let i = 0; i < items.length; i++) {
        if (used[i]) continue;
        used[i] = true; cur.push(items[i]); rec(); cur.pop(); used[i] = false;
      }
    })();
    return out;
  }

  const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };

  OSLab.algos = { SORTS, SORT_ORDER, CODE, euclidSteps, consecutiveSteps, permutationsOf, fact };
})(window.OSLab = window.OSLab || {});
