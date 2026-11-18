/*
 * lessons-ch7.js — Vize: Azalt ve Fethet Algoritmaları (Azalt ve Fethet Algoritmaları.pdf, tamamı).
 */
(function (OSLab) {
  'use strict';

  OSLab.lessons = OSLab.lessons || { chapters: [] };
  const LAB = (algo) => ({ preset: { module: 'sorting', algo } });

  OSLab.lessons.chapters.push({
    id: 'ch7',
    num: 7,
    title: 'Azalt ve Fethet',
    en: 'Decrease and conquer',
    source: 'Azalt ve Fethet Algoritmaları.pdf',
    objectives: [
      'Azalt-fethetin üç tipini (sabitle, sabit oranla, değişken boyutla) örnekleriyle açıklamak',
      'aⁿ\'yi iki farklı azaltma ile hesaplamak',
      'Eklemeli sıralamayı izlemek ve en iyi / en kötü / ortalama durumlarını bulmak',
      'Topolojik sıralamayı DFS ve kaynak silme yöntemleriyle yapmak',
      'Permütasyonları (Johnson–Trotter) ve alt kümeleri (bit dizileri) üretmek',
      'İkili aramayı uygulamak ve C_worst(n) = ⌊log₂n⌋ + 1 olduğunu göstermek',
      'Sahte para ve Rus köylüsü çarpımı problemlerini çözmek'
    ],
    lessons: [
      {
        id: 'azalt',
        title: 'Azalt ve Fethet: Üç Tür',
        en: 'Decrease and conquer',
        src: 'Azalt ve Fethet s. 1–5',
        minutes: 9,
        blocks: [
          { t: 'h', text: 'Fikir' },
          { t: 'list', ordered: true, items: [
            'Problemi <b>daha küçük bir örneğine</b> çevir.',
            'Küçük örneği <b>çöz</b>.',
            'Çözümü asıl probleme <b>genişlet</b>.'
          ] },
          { t: 'p', html: 'Böl-fethetten farkı: problem birkaç alt probleme <b>bölünmez</b>; yalnızca <b>tek bir</b> küçük örneğe indirgenir.' },
          { t: 'h', text: 'Üç tip' },
          { t: 'table', head: ['Tip', 'Azaltma', 'Örnekler'], rows: [
            ['<b>Bir sabitle azalt</b>', 'Genellikle 1: n → n − 1', 'Eklemeli sıralama, topolojik sıralama, permütasyon ve alt küme üretme'],
            ['<b>Sabit bir oranla azalt</b>', 'Genellikle yarıya: n → n/2', 'İkili arama, sahte para, Rus köylüsü çarpımı'],
            ['<b>Değişken boyutla azalt</b>', 'Her adımda farklı miktar', 'Öklid algoritması: gcd(m, n) = gcd(n, m mod n)']
          ] },
          { t: 'h', text: 'Örnek: aⁿ hesaplama' },
          { t: 'compare', cols: [
            { title: 'Bir sabitle (1) azalt', items: ['aⁿ = aⁿ⁻¹ · a', 'f(n) = f(n − 1)·a, n &gt; 0; f(0) = 1', '<b>n − 1</b> çarpma (kaba kuvvetle aynı) → Θ(n)'] },
            { title: 'Yarıya azalt', items: ['n çiftse aⁿ = (a^(n/2))²', 'n tekse aⁿ = (a^((n−1)/2))² · a', 'Her adımda n yarıya iner → <b>Θ(log n)</b> çarpma'] }
          ] },
          { t: 'dg', id: 'power' },
          { t: 'h', text: 'Değişken boyutla azaltma: Öklid' },
          { t: 'p', html: '<b>gcd(m, n) = gcd(n, m mod n)</b>. Her adımda problemin ne kadar küçüleceği girdiye bağlıdır (1. haftadaki Euclid algoritması). Örnek: gcd(60, 24) → gcd(24, 12) → gcd(12, 0) = 12.' }
        ],
        checks: [
          { q: 'Azalt-fethetin üç tipini birer örnekle yazın.', a: 'Bir sabitle azalt (eklemeli sıralama, topolojik sıralama), sabit oranla azalt (ikili arama), değişken boyutla azalt (Öklid algoritması).' },
          { q: 'a¹⁰ yarıya azaltma yöntemiyle nasıl hesaplanır, kaç çarpma yapılır?', a: 'a¹⁰ = (a⁵)², a⁵ = (a²)²·a, a² = (a¹)², a¹ = (a⁰)²·a. Kare almalar ve tek adımlardaki çarpmalarla ≈ 2·log₂n çarpma: Θ(log n). Sabitle azaltmada 9 çarpma gerekir.' }
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
        id: 'topolojik',
        title: 'Topolojik Sıralama',
        en: 'Topological sorting',
        src: 'Azalt ve Fethet s. 9–16',
        minutes: 11,
        blocks: [
          { t: 'h', text: 'Problem' },
          { t: 'def', term: 'Topolojik sıralama', en: 'Topological sort', html: '<b>Önkoşul, gereklilik</b> gibi kısıtlar doğrultusunda yapılması gereken sıralama: yönlü grafın her (u → v) kenarı için u, sıralamada v\'den <b>önce</b> gelir.' },
          { t: 'compare', cols: [
            { title: 'Yönlü graf (digraph)', items: ['Tüm kenar yönleri belirli', 'Komşuluk matrisi <b>simetrik olmak zorunda değil</b>', 'Bir kenarın yalnızca bir karşı düğümü (hedefi) vardır'] },
            { title: 'Yönsüz graf', items: ['Kenarlar iki yönlü', 'Komşuluk matrisi simetrik'] }
          ] },
          { t: 'h', text: 'Yönlü grafta DFS kenarları' },
          { t: 'table', head: ['Kenar türü', 'Anlamı', 'Slayt örneği'], rows: [
            ['Ağaç (tree)', 'Yeni düğüme erişilen kenar', 'ab, bc, de'],
            ['Geri (back)', 'Bir atasına giden kenar', 'ba'],
            ['İleri (forward)', 'Ağaçtaki bir torununa giden kenar', 'ac'],
            ['Çapraz (cross)', 'Diğer kenarlar', 'dc']
          ] },
          { t: 'def', term: 'DAG', en: 'Directed acyclic graph', html: '<b>Yönlü çevrimsiz graf</b>: yönlü dairesel çevrim (aynı düğümle başlayıp biten yol, ör. a → b → a) içermez. <b>Topolojik sıralama yalnızca DAG\'da mümkündür.</b> DFS\'de geri kenar çıkarsa graf DAG değildir.' },
          { t: 'h', text: 'Örnek: ders sırası' },
          { t: 'p', html: 'Öğrenci 5 ders alacak, bazıları önkoşullu, bir dönemde yalnızca bir ders: C1 (–), C2 (–), C3 (C1, C2), C4 (C3), C5 (C3, C4). Hangi sırayla almalı?' },
          { t: 'dg', id: 'topo' },
          { t: 'compare', cols: [
            { title: '1. DFS çözümü', items: ['DFS yap, düğümlerin <b>yığıttan çekilme (pop)</b> sırasını yaz', 'Bu sırayı <b>ters çevir</b>', 'Örnek: pop C5, C4, C3, C1, C2 → <b>C2, C1, C3, C4, C5</b>'] },
            { title: '2. Kaynak silme (azalt-fethet)', items: ['Her adımda <b>kendisine gelen kenarı olmayan</b> (kaynak) bir düğümü seç', 'Onu ve kenarlarını grafdan <b>sil</b> (problem bir küçülür)', 'Örnek: <b>C1, C2, C3, C4, C5</b>'] }
          ] },
          { t: 'note', kind: 'exam', html: 'İki yöntem farklı ama geçerli sıralamalar verebilir; topolojik sıralama <b>tek değildir</b>. Kaynak silmede kaynak kalmıyorsa graf çevrim içerir.' }
        ],
        checks: [
          { q: 'Topolojik sıralama hangi graflarda yapılabilir?', a: 'Yalnızca yönlü çevrimsiz graflarda (DAG).' },
          { q: 'DFS ile topolojik sıralama nasıl elde edilir?', a: 'DFS sırasında düğümlerin çıkmaz olup yığıttan çekilme sırası kaydedilir; bu sıranın tersi topolojik sıralamadır.' },
          { q: 'Kaynak silme yöntemi neden azalt-fethet örneğidir?', a: 'Her adımda gelen kenarı olmayan bir düğüm silinir; problem bir düğüm küçülür (bir sabitle azaltma).' }
        ]
      },
      {
        id: 'permutasyon',
        title: 'Permütasyon ve Alt Küme Üretme',
        en: 'Generating permutations and subsets',
        src: 'Azalt ve Fethet s. 17–20',
        minutes: 9,
        blocks: [
          { t: 'h', text: 'Asgari değişiklik ile permütasyon' },
          { t: 'p', html: '{1, …, n}\'nin n! permütasyonunu üretmek için azalt-fethet: (n − 1) elemanın permütasyonları üretilir, sonra n, her birine <b>tüm olası konumlara</b> eklenir. Ekleme yönü her seferinde değiştirilirse ardışık iki permütasyon yalnızca <b>komşu iki elemanın yer değiştirmesiyle</b> farklılaşır (minimal change requirement).' },
          { t: 'code', text: 'başla                              1\n2\'yi 1\'e sağdan sola ekle         12   21\n3\'ü 12\'ye sağdan sola ekle         123  132  312\n3\'ü 21\'e soldan sağa ekle          321  231  213' },
          { t: 'h', text: 'Johnson–Trotter algoritması' },
          { t: 'p', html: 'Aynı sırayı ara permütasyonları saklamadan üretir. Her elemanın üstünde bir <b>ok</b> vardır. Bir eleman, okunun gösterdiği komşusundan <b>büyükse hareketlidir</b> (mobile).' },
          { t: 'codex', title: 'JohnsonTrotter(n)', rows: [
            ['ilk permütasyon: ←1 ←2 … ←n', 'Tüm oklar sola'],
            ['while son permütasyonda hareketli eleman var do', ''],
            ['    k ← en büyük hareketli eleman', ''],
            ['    k\'yı okunun gösterdiği komşuyla yer değiştir', 'Komşu yer değişimi'],
            ['    k\'dan büyük tüm elemanların okunu ters çevir\n    yeni permütasyonu listeye ekle', '']
          ] },
          { t: 'dg', id: 'jt' },
          { t: 'h', text: 'Alt küme üretme' },
          { t: 'p', html: 'n elemanlı kümenin <b>2ⁿ</b> alt kümesi vardır. Azalt-fethet: {a₁, …, aₙ₋₁}\'in tüm alt kümelerini yaz; sonra bu kümeleri <b>aₙ eklenerek</b> bir kez daha yaz.' },
          { t: 'table', head: ['n', 'Alt kümeler'], rows: [
            ['0', '∅'],
            ['1', '∅, {a₁}'],
            ['2', '∅, {a₁}, {a₂}, {a₁, a₂}'],
            ['3', '∅, {a₁}, {a₂}, {a₁, a₂}, {a₃}, {a₁, a₃}, {a₂, a₃}, {a₁, a₂, a₃}']
          ] },
          { t: 'p', html: '<b>Bit dizileri</b> ile: n bitlik her dizi bir alt kümedir; i. bit 1 ise aᵢ kümededir. 000 … 111 sayılarını saymak tüm alt kümeleri verir.' },
          { t: 'dg', id: 'subsets' }
        ],
        checks: [
          { q: '{1, 2, 3} için asgari değişiklik yöntemiyle permütasyonları sırasıyla yazın.', a: '123, 132, 312, 321, 231, 213.' },
          { q: 'Johnson–Trotter\'da "hareketli eleman" ne demektir?', a: 'Okunun gösterdiği komşu elemandan büyük olan eleman.' },
          { q: '3 elemanlı kümede 101 bit dizisi hangi alt kümedir?', a: '{a₁, a₃} (slayttaki sıralamada bitler a₁ a₂ a₃\'e karşılık gelir).' }
        ]
      },
      {
        id: 'ikili-arama',
        title: 'İkili Arama',
        en: 'Binary search',
        src: 'Azalt ve Fethet s. 21–24',
        minutes: 8,
        blocks: [
          { t: 'h', text: 'Sabit oranla azaltma' },
          { t: 'p', html: 'Sabit oranla azaltan algoritmalar genellikle <b>logaritmik zamanlı</b> ve çok etkindir; azaltma oranı genellikle 2\'dir. En bilinen örnek ikili arama.' },
          { t: 'h', text: 'Algoritma' },
          { t: 'p', html: '<b>Sıralı</b> dizide K aranır: ortadaki A[m] ile karşılaştırılır. Eşitse bulunmuştur; K &lt; A[m] ise <b>ilk yarıda</b>, K &gt; A[m] ise <b>ikinci yarıda</b> devam edilir.' },
          { t: 'codex', title: 'BinarySearch(A[0..n−1], K)', rows: [
            ['l ← 0;  r ← n − 1', 'Arama aralığı'],
            ['while l ≤ r do\n    m ← ⌊(l + r)/2⌋', ''],
            ['    if K = A[m] return m', '<b>Temel işlem: K ile A[m] karşılaştırması</b>'],
            ['    else if K < A[m]  r ← m − 1\n    else l ← m + 1', 'Aralık yarıya iner'],
            ['return −1', '']
          ] },
          { t: 'dg', id: 'binsearch70' },
          { t: 'h', text: 'Analiz' },
          { t: 'p', html: 'En kötü durum: K\'nın dizide <b>bulunmaması</b> (ya da son karşılaştırmada bulunması). Her karşılaştırmadan sonra aralık en az yarıya iner:' },
          { t: 'code', text: 'C_worst(n) = C_worst(⌊n/2⌋) + 1   (n > 1),   C_worst(1) = 1\n\nn = 2ᵏ için:  C_worst(2ᵏ) = C_worst(2ᵏ⁻¹) + 1 = … = C_worst(1) + k = k + 1\nC_worst(n) = ⌊log₂n⌋ + 1 ∈ Θ(log n)' },
          { t: 'p', html: 'Örnek: n = 1.000.000 için en fazla <b>20</b> karşılaştırma; sıralı arama ise 1.000.000 karşılaştırma yapabilir. Ödev: ikili aramanın özyinelemeli sürümünü yazıp inceleyin (aralık parametre olarak geçilir, aynı özyineleme ilişkisi çıkar).' }
        ],
        checks: [
          { q: '[3, 14, 27, 31, 39, 42, 55, 70, 74, 81, 85, 93, 98] dizisinde K = 70 aranırken hangi elemanlarla karşılaştırılır?', a: '1) m = 6, A[6] = 55 < 70 → sağ. 2) m = 9, A[9] = 81 > 70 → sol. 3) m = 7, A[7] = 70 → bulundu. 3 karşılaştırma.' },
          { q: 'İkili aramanın en kötü durum özyinelemesi ve çözümü nedir?', a: 'C_worst(n) = C_worst(⌊n/2⌋) + 1, C_worst(1) = 1 → ⌊log₂n⌋ + 1 ∈ Θ(log n).' }
        ]
      },
      {
        id: 'lab-af',
        title: 'Lab: Sahte Para ve Rus Köylüsü Çarpımı',
        en: 'Lab: fake coin, Russian peasant multiplication',
        src: 'Azalt ve Fethet s. 25',
        minutes: 8,
        blocks: [
          { t: 'h', text: 'Sahte para problemi' },
          { t: 'p', html: 'Eldeki n paradan <b>biri sahte</b> (diğerlerinden hafif). Bir terazi ile en az kaç tartımda bulunur?' },
          { t: 'list', items: [
            'Paraları iki eşit gruba ayır (n tekse bir para dışarıda kalır), iki grubu tart.',
            'Eşitse dışarıdaki para sahtedir; değilse <b>hafif gruptaki</b> paralarla devam et.',
            'Her tartımda problem <b>yarıya</b> iner: sabit oranla azalt.'
          ] },
          { t: 'code', text: 'W(n) = W(⌊n/2⌋) + 1,  W(1) = 0   →   W(n) = ⌊log₂n⌋ ∈ Θ(log n)' },
          { t: 'dg', id: 'fakecoin' },
          { t: 'note', kind: 'extra', html: 'Paralar <b>üç</b> gruba bölünürse (iki grup tartılır, üçüncüsü dışarıda) her tartımda problem üçte birine iner: ≈ <b>log₃n</b> tartım. Bu daha iyidir; ör. 9 parada 2 tartım yeter.' },
          { t: 'h', text: 'Rus köylüsü çarpımı' },
          { t: 'p', html: 'n · m çarpımı, n\'yi yarıya indirip m\'yi ikiye katlayarak hesaplanır:' },
          { t: 'code', text: 'n çiftse:  n · m = (n/2) · 2m\nn tekse:   n · m = ((n − 1)/2) · 2m + m\nn = 1 ise: 1 · m = m   (dur)' },
          { t: 'p', html: 'Uygulama: n\'yi 1 olana kadar yarıya böl (tam bölme), m\'yi ikiyle çarp; <b>n\'nin tek olduğu satırlardaki m değerlerini topla</b>. Yalnızca ikiye bölme, ikiyle çarpma ve toplama kullanılır; donanımda bit kaydırmayla yapılabilir.' },
          { t: 'dg', id: 'russian' }
        ],
        checks: [
          { q: '50 · 65 çarpımını Rus köylüsü yöntemiyle hesaplayın.', a: 'n: 50, 25, 12, 6, 3, 1; m: 65, 130, 260, 520, 1040, 2080. n tek olan satırlar: 25 → 130, 3 → 1040, 1 → 2080. Toplam 130 + 1040 + 2080 = 3250.' },
          { q: '16 paradan biri sahte (hafif). İkiye bölme yöntemiyle en fazla kaç tartım gerekir?', a: 'W(16) = log₂16 = 4 tartım (16 → 8 → 4 → 2 → 1).' }
        ]
      },
    ]
  });
})(window.OSLab = window.OSLab || {});
