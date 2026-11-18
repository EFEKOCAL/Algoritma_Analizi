/*
 * lessons-ch6.js — 6. hafta: Algoritmalar ve veri yapıları → Lab 1'deki beş sıralama algoritması.
 * Kaynaklar: Kaba Kuvvet (s. 2–9), Azalt ve Fethet (s. 6–8), Böl Fethet (s. 2–18), Lab Uygulaması 1.
 */
(function (OSLab) {
  'use strict';

  OSLab.lessons = OSLab.lessons || { chapters: [] };
  const LAB = (algo) => ({ preset: { module: 'sorting', algo } });

  OSLab.lessons.chapters.push({
    id: 'ch6',
    num: 6,
    title: 'Sıralama Algoritmaları',
    en: 'Sorting algorithms (Lab 1)',
    source: 'Kaba Kuvvet, Azalt-Fethet, Böl-Fethet PDF\'leri · Lab 1',
    objectives: [
      'Selection, Bubble, Insertion, Merge ve Quick sort\'u bir dizi üzerinde elle izlemek',
      'Her birinin sözde kodunu yazmak ve temel işlemini belirlemek',
      'Karşılaştırma sayısını toplam formülü veya özyinelemeyle çıkarmak',
      'En iyi, en kötü ve ortalama durumları ve bunlara yol açan girdileri söylemek',
      'Master teoremini uygulamak',
      'Beş algoritmayı karmaşıklık, kararlılık ve yerinde olma açısından karşılaştırmak'
    ],
    lessons: [
      {
        id: 'selection',
        title: 'Seçmeli Sıralama (Selection Sort)',
        en: 'Brute force: selection sort',
        src: 'Kaba Kuvvet s. 2–6',
        minutes: 9,
        lab: LAB('selection'),
        blocks: [
          { t: 'h', text: 'Kaba kuvvet yaklaşımı' },
          { t: 'def', term: 'Kaba kuvvet', en: 'Brute force', html: 'Bir problemi çözmek için <b>en basit</b> yaklaşım. Genellikle doğrudan problemin tanımına dayanır ve uygulaması en kolay çözümdür. Örnekler: aⁿ\'yi n−1 çarpmayla hesaplamak, n!, iki matrisin tanımla çarpımı, dizide sıralı arama.' },
          { t: 'h', text: 'Algoritma' },
          { t: 'p', html: 'Dizideki <b>en küçük eleman bulunur</b> ve 1. sıradaki elemanla yer değiştirir. Arama ikinci elemandan başlanarak tekrarlanır; bulunan en küçük 2. sıraya konur. Bu, sondan bir önceki elemana kadar sürer. <b>i. iterasyondan sonra dizinin en küçük i elemanı, artan sırada ilk i konumdadır.</b>' },
          { t: 'codex', title: 'SelectionSort(A[0..n−1])', rows: [
            ['for i ← 0 to n − 2 do', 'n − 1 tur'],
            ['    min ← i', ''],
            ['    for j ← i + 1 to n − 1 do\n        if A[j] < A[min]  min ← j', '<b>Temel işlem: A[j] &lt; A[min]</b>'],
            ['    swap A[i] and A[min]', 'Her turda tam 1 yer değiştirme → toplam n − 1']
          ] },
          { t: 'dg', id: 'sort-selection' },
          { t: 'h', text: 'Analiz' },
          { t: 'code', text: 'C(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌ᵢ₊₁ⁿ⁻¹ 1 = Σᵢ₌₀ⁿ⁻² [(n−1) − (i+1) + 1] = Σᵢ₌₀ⁿ⁻² (n − 1 − i)\n     = (n − 1)n / 2 ∈ Θ(n²)' },
          { t: 'note', kind: 'exam', html: 'Karşılaştırma sayısı <b>girdiye bağlı değildir</b>: sıralı, ters sıralı, rastgele, hepsinde n(n−1)/2. Bu yüzden en iyi = en kötü = ortalama = <b>Θ(n²)</b>. Ama yer değiştirme sayısı yalnızca <b>n − 1</b>\'dir (Θ(n)); bu, seçmeli sıralamanın tek güçlü yanıdır.' },
          { t: 'note', kind: 'info', html: 'Seçmeli sıralama <b>yerindedir</b> ama <b>kararlı değildir</b>: uzak bir yer değiştirme, eşit iki elemanın sırasını bozabilir (ör. [5ᵃ, 5ᵇ, 2] → [2, 5ᵇ, 5ᵃ]).' }
        ],
        checks: [
          { q: '89, 45, 68, 90, 29 dizisini seçmeli sıralamayla adım adım sıralayın.', a: 'i=0: min 29 → 29 | 45 68 90 89. i=1: min 45 (yerinde) → 29 45 | 68 90 89. i=2: min 68 (yerinde). i=3: min 89 → 29 45 68 89 90.' },
          { q: 'Seçmeli sıralamanın karşılaştırma sayısını toplam formülüyle bulun.', a: 'C(n) = Σᵢ₌₀ⁿ⁻² (n−1−i) = n(n−1)/2 ∈ Θ(n²).' },
          { q: 'Seçmeli sıralamanın en iyi durumu neden Θ(n²)\'dir?', a: 'İç döngü dizinin içeriğinden bağımsız olarak her zaman sona kadar çalışır; sıralı dizide bile n(n−1)/2 karşılaştırma yapılır.' }
        ]
      },
      {
        id: 'bubble',
        title: 'Kabarcık Sıralama (Bubble Sort)',
        en: 'Brute force: bubble sort',
        src: 'Kaba Kuvvet s. 7–9',
        minutes: 8,
        lab: LAB('bubble'),
        blocks: [
          { t: 'h', text: 'Algoritma' },
          { t: 'p', html: 'Dizinin <b>komşu elemanları</b> karşılaştırılır; soldaki büyükse yer değiştirir. Her turun sonunda kalanların <b>en büyüğü</b> sona "kabarcık gibi" çıkar. Basit ama verimsiz bir algoritmadır.' },
          { t: 'codex', title: 'BubbleSort(A[0..n−1])', rows: [
            ['for i ← 0 to n − 2 do', 'n − 1 tur'],
            ['    for j ← 0 to n − 2 − i do', 'Son i eleman zaten yerinde, onlara bakılmaz'],
            ['        if A[j + 1] < A[j]', '<b>Temel işlem: karşılaştırma</b>'],
            ['            swap A[j] and A[j + 1]', '']
          ] },
          { t: 'dg', id: 'sort-bubble' },
          { t: 'h', text: 'Analiz' },
          { t: 'code', text: 'C(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌₀ⁿ⁻²⁻ⁱ 1 = Σᵢ₌₀ⁿ⁻² [(n − 2 − i) − 0 + 1] = Σᵢ₌₀ⁿ⁻² (n − 1 − i)\n     = (n − 1)n / 2 ∈ Θ(n²)\n\nS_worst(n) = C(n) = (n − 1)n / 2   (ters sıralı dizide her karşılaştırma yer değiştirir)' },
          { t: 'note', kind: 'warn', html: 'Slaytlardaki karşılaştırma tablosu bubble sort için <b>en iyi O(n)</b> diyor. Bu, slaytta verilen sözde kod için doğru değildir: o kodda iç döngü her zaman çalışır, sıralı dizide de n(n−1)/2 karşılaştırma yapılır. O(n) yalnızca <b>"bu turda hiç yer değiştirme olmadıysa dur"</b> bayrağı eklenen iyileştirilmiş sürümde geçerlidir. Laboratuvarda iki sürümü de deneyebilirsin.' },
          { t: 'note', kind: 'info', html: 'Bubble sort <b>yerinde</b> ve <b>kararlıdır</b>: yalnızca komşular, ve yalnızca kesin büyükse (A[j+1] &lt; A[j]) yer değiştirir; eşitler yer değiştirmez.' }
        ],
        checks: [
          { q: '89, 45, 68, 90, 29 dizisinde bubble sort\'un ilk turundan (i = 0) sonra dizi nasıl olur?', a: '45 89 → 45 68 89 → (89, 90 yerinde) → 90 ile 29 yer değiştirir: 45 68 89 29 90. En büyük (90) sona yerleşti.' },
          { q: 'Bubble sort\'un en kötü durumunda kaç yer değiştirme yapılır?', a: 'Ters sıralı dizide her karşılaştırma yer değiştirmeyle sonuçlanır: n(n−1)/2.' },
          { q: 'Bubble sort\'un en iyi durumu ne zaman O(n) olur?', a: 'Yalnızca bir turda hiç yer değiştirme olmadığında duran (bayraklı) sürümde ve dizi zaten sıralıysa: tek tur, n−1 karşılaştırma.' }
        ]
      },
      {
        id: 'insertion',
        title: 'Eklemeli Sıralama (Insertion Sort)',
        en: 'Decrease and conquer: insertion sort',
        src: 'Azalt ve Fethet s. 6–8',
        minutes: 9,
        lab: LAB('insertion'),
        blocks: [
          { t: 'h', text: 'Azalt-fethet fikri' },
          { t: 'p', html: 'Problemi <b>bir küçük</b> örneğine çevir, onu çöz, çözümü genişlet: A[0..n−2] sıralıysa, A[n−1]\'i sıralı kısımda <b>doğru yerine eklemek</b> yeterlidir. Eklemeli sıralama "bir sabitle (1) azalt" türünün örneğidir.' },
          { t: 'h', text: 'Algoritma' },
          { t: 'p', html: 'İlk iterasyon dizinin ikinci elemanını alır; birinciden küçükse yer değiştirir. İkinci iterasyon üçüncü elemanı önceki ikisine göre uygun yere yerleştirir. <b>i. iterasyondan sonra ilk i+1 eleman kendi aralarında sıralıdır</b> (ama henüz son yerlerinde olmayabilirler; seçmeli sıralamadan farkı budur).' },
          { t: 'codex', title: 'InsertionSort(A[0..n−1])', rows: [
            ['for i ← 1 to n − 1 do', 'for döngüsü n − 1 kez çalışır'],
            ['    v ← A[i]\n    j ← i − 1', 'Eklenecek eleman v'],
            ['    while j ≥ 0 and A[j] > v do', '<b>Temel işlem: A[j] &gt; v</b>'],
            ['        A[j + 1] ← A[j]\n        j ← j − 1', 'v\'den büyükler bir sağa kayar'],
            ['    A[j + 1] ← v', 'v boşalan yere yazılır']
          ] },
          { t: 'dg', id: 'sort-insertion' },
          { t: 'h', text: 'Analiz: üç durum farklı' },
          { t: 'table', head: ['Durum', 'Girdi', 'Karşılaştırma'], rows: [
            ['En kötü', '<b>Ters sıralı</b> dizi: her eleman en başa kadar kayar', 'C_worst(n) = Σᵢ₌₁ⁿ⁻¹ Σⱼ₌₀ⁱ⁻¹ 1 = Σᵢ₌₁ⁿ⁻¹ i = (n−1)n/2 ∈ Θ(n²)'],
            ['En iyi', '<b>Sıralı</b> dizi: her turda tek karşılaştırma', 'C_best(n) = Σᵢ₌₁ⁿ⁻¹ 1 = n − 1 ∈ Θ(n)'],
            ['Ortalama', 'Dağınık (rastgele) dizi', 'C_avg(n) ≈ n²/4 ∈ Θ(n²)']
          ] },
          { t: 'note', kind: 'exam', html: 'Eklemeli sıralama <b>neredeyse sıralı</b> dizilerde çok hızlıdır (en iyi durum n − 1). Ortalamada bubble ve selection\'ın yaklaşık yarısı kadar karşılaştırma yapar (n²/4). Yerinde ve kararlıdır.' }
        ],
        checks: [
          { q: '89, 45, 68, 90, 29, 34 dizisini eklemeli sıralamayla sıralayın.', a: 'i=1: 45 89 | 68 90 29 34. i=2: 45 68 89 | 90 29 34. i=3: 45 68 89 90 | 29 34. i=4: 29 45 68 89 90 | 34. i=5: 29 34 45 68 89 90.' },
          { q: 'Eklemeli sıralamanın en iyi ve en kötü durumları hangi girdilerde oluşur?', a: 'En iyi: dizi zaten sıralı → n−1 karşılaştırma, Θ(n). En kötü: dizi ters sıralı → n(n−1)/2, Θ(n²).' },
          { q: 'Eklemeli sıralama hangi tasarım tekniğine aittir?', a: 'Azalt-fethet (bir sabitle, 1 azaltarak).' }
        ]
      },
      {
        id: 'bol-fethet',
        title: 'Böl-Fethet ve Master Teoremi',
        en: 'Divide and conquer, Master theorem',
        src: 'Böl Fethet s. 2–6',
        minutes: 9,
        blocks: [
          { t: 'h', text: 'Böl-fethet' },
          { t: 'list', ordered: true, items: [
            'Problem <b>alt problemlere bölünür</b> (genellikle eşit büyüklükte).',
            'Alt problemler (genellikle özyinelemeli) <b>çözülür</b>.',
            'Gerekirse alt problem çözümleri <b>birleştirilir</b>.'
          ] },
          { t: 'p', html: 'En sık kullanılan tasarım tekniklerinden biridir. Her alt problem kendi işlemcisinde çözülebildiği için <b>paralel</b> hesaplamaya uygundur.' },
          { t: 'h', text: 'Genel özyineleme' },
          { t: 'p', html: 'n büyüklüğündeki örnek, her biri <b>n/b</b> büyüklüğünde <b>b</b> örneğe bölünür ve bunların <b>a</b> tanesinin çözülmesi gerekir (a ≥ 1, b &gt; 1). n\'nin b\'nin kuvveti olduğu varsayılırsa:' },
          { t: 'code', text: 'T(n) = a·T(n/b) + f(n)\n\nf(n): bölme ve çözümleri birleştirme için harcanan zaman' },
          { t: 'h', text: 'Master teoremi' },
          { t: 'def', term: 'Master teoremi', html: 'T(n) = aT(n/b) + f(n) ve <b>f(n) ∈ Θ(nᵈ)</b>, d ≥ 0 ise:<br>• a &lt; bᵈ → T(n) ∈ <b>Θ(nᵈ)</b><br>• a = bᵈ → T(n) ∈ <b>Θ(nᵈ log n)</b><br>• a &gt; bᵈ → T(n) ∈ <b>Θ(n^(log_b a))</b>' },
          { t: 'dg', id: 'master' },
          { t: 'h', text: 'Örnekler' },
          { t: 'table', head: ['Özyineleme', 'a, b, d', 'Karşılaştırma', 'Sonuç'], rows: [
            ['n sayının toplamı: A(n) = 2A(n/2) + 1', '2, 2, 0', '2 &gt; 2⁰ = 1', 'Θ(n^(log₂2)) = <b>Θ(n)</b>'],
            ['T(n) = 4T(n/2) + n', '4, 2, 1', '4 &gt; 2¹', '<b>Θ(n²)</b>'],
            ['T(n) = 4T(n/2) + n²', '4, 2, 2', '4 = 2²', '<b>Θ(n² log n)</b>'],
            ['T(n) = 4T(n/2) + n³', '4, 2, 3', '4 &lt; 2³', '<b>Θ(n³)</b>'],
            ['Merge sort: C(n) = 2C(n/2) + n − 1', '2, 2, 1', '2 = 2¹', '<b>Θ(n log n)</b>']
          ] }
        ],
        checks: [
          { q: 'Master teoreminin üç durumunu yazın.', a: 'T(n) = aT(n/b) + f(n), f(n) ∈ Θ(nᵈ): a < bᵈ → Θ(nᵈ); a = bᵈ → Θ(nᵈ log n); a > bᵈ → Θ(n^(log_b a)).' },
          { q: 'T(n) = 4T(n/2) + n² için T(n) nedir?', a: 'a = 4, b = 2, d = 2; a = bᵈ = 4 → Θ(n² log n).' },
          { q: 'T(n) = 2T(n/2) + 1 (n sayının toplamı) çözümü?', a: 'a = 2, b = 2, d = 0; 2 > 2⁰ → Θ(n^(log₂2)) = Θ(n).' }
        ]
      },
      {
        id: 'merge',
        title: 'Birleştirmeli Sıralama (Merge Sort)',
        en: 'Divide and conquer: mergesort',
        src: 'Böl Fethet s. 7–10',
        minutes: 10,
        lab: LAB('merge'),
        blocks: [
          { t: 'h', text: 'Algoritma' },
          { t: 'p', html: 'Diziyi <b>eşit uzunlukta iki diziye böler</b> (eleman sayısı tekse biri bir fazla olur), her yarıyı özyinelemeli sıralar ve <b>sıralı iki yarıyı tek dizide birleştirir</b>. Temel durum: tek elemanlı dizi zaten sıralıdır, fonksiyon hemen döner. Verimlidir ama daha karmaşıktır.' },
          { t: 'codex', title: 'Mergesort(A[0..n−1])', rows: [
            ['if n > 1', 'Temel durum: n = 1'],
            ['    copy A[0..⌊n/2⌋−1] to B[0..⌊n/2⌋−1]\n    copy A[⌊n/2⌋..n−1] to C[0..⌈n/2⌉−1]', '<b>Böl</b> (konuma göre)'],
            ['    Mergesort(B)\n    Mergesort(C)', '<b>Fethet</b>'],
            ['    Merge(B, C, A)', '<b>Birleştir</b>']
          ] },
          { t: 'codex', title: 'Merge(B[0..p−1], C[0..q−1], A[0..p+q−1])', rows: [
            ['i ← 0; j ← 0; k ← 0', 'İki dizinin başlarına işaretçi'],
            ['while i < p and j < q do\n    if B[i] ≤ C[j]\n        A[k] ← B[i]; i ← i + 1\n    else A[k] ← C[j]; j ← j + 1\n    k ← k + 1', '<b>Temel işlem: B[i] ≤ C[j]</b>. Küçük olan A\'ya yazılır. ≤ kullanıldığı için eşitlerde B\'den (soldan) alınır → <b>kararlı</b>'],
            ['if i = p  copy C[j..q−1] to A[k..p+q−1]\nelse      copy B[i..p−1] to A[k..p+q−1]', 'Bir dizi boşalınca kalanlar karşılaştırmasız kopyalanır']
          ] },
          { t: 'dg', id: 'merge-tree' },
          { t: 'h', text: 'Analiz' },
          { t: 'p', html: 'n\'i 2\'nin kuvveti kabul ederek karşılaştırma sayısı:' },
          { t: 'code', text: 'C(n) = 2C(n/2) + C_merge(n),   C(1) = 0\n\nC_merge(n): her adımda bir karşılaştırma yapılır ve bir eleman yerleşir.\n  En kötü durum: iki dizi de son karşılaştırmaya kadar boşalmaz → C_merge(n) = n − 1\n\nC_worst(n) = 2C_worst(n/2) + n − 1  →  Master (a=2, b=2, d=1, a = bᵈ): Θ(n log n)\nTam çözüm: C_worst(n) = n·log₂n − n + 1' },
          { t: 'note', kind: 'exam', html: 'Merge sort\'un en iyi, ortalama ve en kötü durumu <b>Θ(n log n)</b>\'dir. Bedeli: <b>yerinde değildir</b>, B ve C için n kadar <b>ek bellek</b> ister. Kararlıdır.' }
        ],
        checks: [
          { q: '8, 3, 2, 9, 7, 1, 5, 4 dizisinin merge sort bölünme ve birleşme adımlarını yazın.', a: 'Böl: [8 3 2 9] [7 1 5 4] → [8 3] [2 9] [7 1] [5 4] → tek elemanlar. Birleştir: [3 8] [2 9] [1 7] [4 5] → [2 3 8 9] [1 4 5 7] → [1 2 3 4 5 7 8 9].' },
          { q: 'Merge sort için özyineleme ilişkisini kurun ve Master teoremiyle çözün.', a: 'C(n) = 2C(n/2) + (n−1), C(1) = 0. a=2, b=2, d=1, a = bᵈ → Θ(n log n). Tam: n log₂n − n + 1.' },
          { q: 'Birleştirme adımında en kötü durum ne zaman oluşur?', a: 'İki dizinin de son karşılaştırmaya kadar boşalmaması, yani elemanların sırayla iki diziden dönüşümlü gelmesi: n−1 karşılaştırma.' }
        ]
      },
      {
        id: 'quick',
        title: 'Hızlı Sıralama (Quick Sort)',
        en: 'Divide and conquer: quicksort',
        src: 'Böl Fethet s. 11–18',
        minutes: 12,
        lab: LAB('quick'),
        blocks: [
          { t: 'h', text: 'Merge sort\'tan farkı' },
          { t: 'p', html: 'Diziyi alt dizilere <b>konumlarına göre değil, değerlerine göre</b> böler. Bir <b>pivot</b> (mihenk) seçilir; dizi, pivotun solunda ondan <b>küçük/eşit</b>, sağında <b>büyük/eşit</b> elemanlar kalacak şekilde düzenlenir. Pivot böylece <b>son yerine</b> oturur; sol ve sağ parçalar özyinelemeli sıralanır. Birleştirme adımı yoktur.' },
          { t: 'code', text: 'A[0] … A[s−1]   A[s]   A[s+1] … A[n−1]\n  hepsi ≤ A[s]  pivot    hepsi ≥ A[s]' },
          { t: 'codex', title: 'Quicksort(A[l..r])', rows: [
            ['if l < r', ''],
            ['    s ← Partition(A[l..r])', 's: ayırma (split) noktası, pivotun son yeri'],
            ['    Quicksort(A[l..s−1])\n    Quicksort(A[s+1..r])', '']
          ] },
          { t: 'codex', title: 'HoarePartition(A[l..r])', rows: [
            ['p ← A[l]', 'Pivot: ilk eleman'],
            ['i ← l;  j ← r + 1', ''],
            ['repeat\n  repeat i ← i + 1\n  until A[i] ≥ p\n  repeat j ← j − 1\n  until A[j] ≤ p\n  swap(A[i], A[j])\nuntil i ≥ j','i soldan p\'den <b>büyük/eşit</b>, j sağdan <b>küçük/eşit</b> eleman arar; ikisi de durunca yer değiştirirler'],
            ['swap(A[i], A[j])', 'i ≥ j olunca yapılan son (fazla) değişimi geri al'],
            ['swap(A[l], A[j])\nreturn j', 'Pivot j\'ye yerleşir']
          ] },
          { t: 'dg', id: 'sort-quick' },
          { t: 'note', kind: 'info', html: 'Slayt 13–14\'teki tablolu örnek pivotu <b>ortadaki</b> elemandan (indis (l+r)/2) seçer; sözde kod ise <b>ilk</b> elemanı alır. Fikir aynıdır: pivot seçimi yalnızca hangi bölünmelerin oluşacağını değiştirir.' },
          { t: 'h', text: 'Analiz' },
          { t: 'table', head: ['Durum', 'Ne olur?', 'Karşılaştırma'], rows: [
            ['En iyi', 'Tüm bölmeler <b>tam ortadan</b>', 'C_best(n) = 2C_best(n/2) + n, C_best(1) = 0 → <b>n log₂n</b>, Θ(n log n)'],
            ['En kötü', 'Tüm bölmeler <b>uçta</b>: bir alt dizi boş, geri kalan her şey diğerinde. Ör. zaten <b>sıralı</b> dizi + ilk eleman pivot', 'C_worst(n) = (n+1) + n + … + 3 = (n+1)(n+2)/2 − 3 ∈ <b>Θ(n²)</b>'],
            ['Ortalama', 'Rastgele dizi, ayırma noktası her yerde eşit olasılıkla', 'C_avg(n) ≈ 1,39·n log₂n ∈ <b>Θ(n log n)</b>']
          ] },
          { t: 'note', kind: 'exam', html: 'Quick sort\'un tuzağı: en kötü durum <b>Θ(n²)</b> ve bu durum <b>sıralı dizide</b> (ilk eleman pivotken) ortaya çıkar. Pratikte ortalama durumu çok iyi olduğundan genellikle en hızlı sıralamadır. Yerindedir (yalnızca özyineleme yığını), <b>kararlı değildir</b>.' }
        ],
        checks: [
          { q: 'Quick sort ile merge sort\'un bölme biçimi arasındaki fark nedir?', a: 'Merge sort diziyi konumlarına göre (ortadan) böler ve birleştirme adımında iş yapar. Quick sort değerlerine göre (pivottan küçük/büyük) böler; iş bölümleme adımındadır, birleştirme gerekmez.' },
          { q: 'Quick sort\'un en kötü durumu hangi girdide oluşur ve karşılaştırma sayısı nedir?', a: 'Bölümlemeler hep uçta kaldığında, ör. ilk eleman pivot seçilirken zaten sıralı dizide. C_worst(n) = (n+1)(n+2)/2 − 3 ∈ Θ(n²).' },
          { q: 'Quick sort\'un en iyi durum özyinelemesi ve çözümü?', a: 'C_best(n) = 2C_best(n/2) + n, C_best(1) = 0 → n log₂n ∈ Θ(n log n).' }
        ]
      },
      {
        id: 'karsilastirma',
        title: 'Beş Algoritmanın Karşılaştırması',
        en: 'Comparison and Lab 1',
        src: 'Böl Fethet s. 15 · Lab Uygulaması 1',
        minutes: 8,
        lab: { preset: { module: 'sorting', tab: 'bench' } },
        blocks: [
          { t: 'h', text: 'Karşılaştırma tablosu (düzeltilmiş)' },
          { t: 'table', head: ['Algoritma', 'Teknik', 'En iyi', 'Ortalama', 'En kötü', 'Yerinde', 'Kararlı'], rows: [
            ['Insertion', 'Azalt-fethet', 'Θ(n)', 'Θ(n²)', 'Θ(n²)', '✓', '✓'],
            ['Selection', 'Kaba kuvvet', 'Θ(n²)', 'Θ(n²)', 'Θ(n²)', '✓', '✗'],
            ['Bubble', 'Kaba kuvvet', 'Θ(n²)*', 'Θ(n²)', 'Θ(n²)', '✓', '✓'],
            ['Merge', 'Böl-fethet', 'Θ(n log n)', 'Θ(n log n)', '<b>Θ(n log n)</b>', '✗ (n ek bellek)', '✓'],
            ['Quick', 'Böl-fethet', 'Θ(n log n)', 'Θ(n log n)', '<b>Θ(n²)</b>', '✓', '✗']
          ] },
          { t: 'p', html: '* Bayraklı (erken çıkışlı) bubble sort için en iyi durum Θ(n).' },
          { t: 'note', kind: 'warn', html: '<b>Slayt 15\'teki tabloda hata var:</b> Birleştirmeli sıralama için en kötü durum <b>O(n²)</b>, çabuk sıralama için <b>O(n log n)</b> yazılmış. İkisi <b>yer değiştirmiş</b>: merge sort\'un en kötü durumu O(n log n), quick sort\'unki O(n²)\'dir. Aynı slaytların s. 7 ve s. 18\'i de bunu gösterir.' },
          { t: 'h', text: 'Lab 1: ne isteniyor?' },
          { t: 'list', items: [
            'Beş algoritmayı gerçekleştir: Insertion, Selection, Bubble, Merge, Quick.',
            'Rastgele tamsayılarla <b>10, 100, 1.000, 10.000, 100.000, 1.000.000</b> elemanlı diziler oluştur.',
            'Her testi <b>en az 5 kez</b> tekrarla, <b>ortalama</b> süreyi <b>ms</b> cinsinden kaydet.',
            'O(n²) algoritmalar büyük dizilerde çok uzun sürer: <b>makul süre sınırını aşan testleri durdur</b> ve raporda belirt.',
            'Teslim: kaynak kodlar + karşılaştırma tablosu.'
          ] },
          { t: 'note', kind: 'exam', html: 'Beklenen gözlem: n 10 katına çıkınca O(n²) algoritmaların süresi yaklaşık <b>100 katına</b>, O(n log n) algoritmalarınki yaklaşık <b>10–13 katına</b> çıkar. 1.000.000 elemanda O(n²) algoritmalar saatler sürer (≈10¹² karşılaştırma), merge/quick ise birkaç yüz milisaniyede biter. Laboratuvardaki <b>Süre ölçümü</b> sekmesi bu deneyi tarayıcıda yapar.' }
        ],
        checks: [
          { q: 'Hangi sıralama algoritmalarının en kötü durumu Θ(n log n)\'dir?', a: 'Beş algoritma içinde yalnızca merge sort. Quick sort\'un en kötü durumu Θ(n²)\'dir.' },
          { q: 'Beş algoritmadan hangileri kararlı, hangileri yerindedir?', a: 'Kararlı: insertion, bubble, merge. Yerinde: insertion, selection, bubble, quick (merge sort n ek bellek ister).' },
          { q: 'Dizi neredeyse sıralıysa hangi algoritmayı seçersiniz? Hangisinden kaçınırsınız?', a: 'Insertion sort (en iyi duruma yakın, ~Θ(n)). İlk elemanı pivot alan quick sort\'tan kaçınılır; en kötü duruma (Θ(n²)) düşer.' }
        ]
      }
    ]
  });
})(window.OSLab = window.OSLab || {});
