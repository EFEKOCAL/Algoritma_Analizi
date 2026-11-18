/*
 * lessons-ch6.js — Vize: Kaba Kuvvet Algoritmaları (Kaba Kuvvet Algoritmaları.pdf, tamamı) ve Lab 2.
 */
(function (OSLab) {
  'use strict';

  OSLab.lessons = OSLab.lessons || { chapters: [] };
  const LAB = (algo) => ({ preset: { module: 'sorting', algo } });

  OSLab.lessons.chapters.push({
    id: 'ch6',
    num: 6,
    title: 'Kaba Kuvvet Algoritmaları',
    en: 'Brute force',
    source: 'Kaba Kuvvet Algoritmaları.pdf · Lab 2',
    objectives: [
      'Kaba kuvvet yaklaşımını tanımlamak ve örneklerini saymak',
      'Seçmeli ve kabarcık sıralamayı elle izlemek, karşılaştırma sayılarını toplam formülüyle çıkarmak',
      'Gözcülü sıralı aramayı ve kaba kuvvet string eşlemeyi analiz etmek',
      'En yakın çift ve konveks gövde problemlerini kaba kuvvetle çözmek',
      'Etraflı aramayı TSP, sırt çantası ve işe alma problemlerine uygulamak',
      'DFS ve BFS ile bir grafı elle gezmek, yığıt/kuyruk sıralarını ve kenar türlerini yazmak',
      'Lab problemleri (postane, 6 şehirde satış turu) için kaba kuvvet çözümü tasarlamak'
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
        id: 'arama-string',
        title: 'Sıralı Arama ve String Eşleme',
        en: 'Sequential search, brute-force string matching',
        src: 'Kaba Kuvvet s. 10–15',
        minutes: 11,
        blocks: [
          { t: 'h', text: 'Alıştırma: bu algoritmalar ne yapıyor?' },
          { t: 'p', html: 'Slayt 10\'daki üç algoritma kaba kuvvet analizi pratiği içindir. Her biri için: ne hesaplar, temel işlemi ne, kaç kez yapılır, verimlilik sınıfı ne, daha iyisi var mı?' },
          { t: 'solve', title: 'Mystery(n)', q: '<code>S ← 0; for i ← 1 to n do S ← S + i * i; return S</code>', a: 'a) <b>1² + 2² + … + n²</b> toplamını hesaplar. b) Temel işlem: <b>çarpma</b> (i·i). c) <b>n</b> kez. d) <b>Θ(n)</b>. e) Kapalı formül <b>n(n+1)(2n+1)/6</b> ile sabit sayıda işlemde: <b>Θ(1)</b>.' },
          { t: 'solve', title: 'Secret(A[0..n−1])', q: '<code>minval ← A[0]; maxval ← A[0]; for i ← 1 to n−1: if A[i] &lt; minval then minval ← A[i]; if A[i] &gt; maxval then maxval ← A[i]; return maxval − minval</code>', a: 'a) Dizinin <b>açıklığını</b> (en büyük − en küçük) hesaplar. b) Temel işlem: <b>karşılaştırma</b>. c) Her turda 2 → <b>2(n − 1)</b>. d) <b>Θ(n)</b>. e) Elemanları ikişer ikişer alıp önce kendi aralarında, sonra küçüğü min ile büyüğü max ile karşılaştırarak ≈ <b>3n/2</b> karşılaştırmaya inilir; sınıf yine Θ(n) (her elemana en az bir kez bakmak gerekir).' },
          { t: 'solve', title: 'Enigma(A[0..n−1, 0..n−1])', q: '<code>for i ← 0 to n−2 do for j ← i+1 to n−1 do if A[i,j] ≠ A[j,i] return false; return true</code>', a: 'a) Matrisin <b>simetrik</b> olup olmadığını denetler. b) Temel işlem: <b>A[i,j] ≠ A[j,i] karşılaştırması</b>. c) En kötü durumda (matris simetrikse) Σᵢ₌₀ⁿ⁻² (n−1−i) = <b>n(n−1)/2</b>. d) <b>Θ(n²)</b>. e) Köşegenin üstündeki her elemana bakmak zorunlu olduğundan daha iyisi yok.' },
          { t: 'h', text: 'Sıralı arama (gözcülü)' },
          { t: 'p', html: 'Aranan eleman dizi elemanlarıyla <b>tek tek</b> karşılaştırılır; varsa <b>ilk</b> bulunduğu indis döner. Slayt 12\'deki sürüm bir hile kullanır: aranan değer dizinin <b>sonuna eklenir</b> (gözcü, sentinel). Böylece döngüde "dizi bitti mi?" kontrolüne gerek kalmaz.' },
          { t: 'codex', title: 'SequentialSearch2(A[0..n], K)', rows: [
            ['A[n] ← K', '<b>Gözcü</b>: K mutlaka bulunacak, döngü kesin durur'],
            ['i ← 0\nwhile A[i] ≠ K do\n    i ← i + 1', 'Yalnızca <b>A[i] ≠ K</b> karşılaştırması: i &lt; n kontrolü yok'],
            ['if i < n return i\nelse return −1', 'Gözcüde durduysa K dizide yoktur']
          ] },
          { t: 'p', html: 'Verimlilik değişmez (en kötü n + 1, Θ(n)); kazanç, her turdaki <b>ikinci karşılaştırmanın</b> ortadan kalkmasıdır.' },
          { t: 'h', text: 'Kaba kuvvet string eşleme' },
          { t: 'p', html: 'n uzunluğundaki <b>T</b> metninde m uzunluğundaki <b>P</b> örüntüsü aranır. Örüntü metnin başına hizalanır; karakterler soldan sağa karşılaştırılır. Uyumsuzluk çıkınca örüntü <b>bir karakter sağa kaydırılır</b>. Son deneme konumu n − m\'dir.' },
          { t: 'codex', title: 'BruteForceStringMatch(T[0..n−1], P[0..m−1])', rows: [
            ['for i ← 0 to n − m do', 'n − m + 1 hizalama'],
            ['    j ← 0\n    while j < m and P[j] = T[i + j] do\n        j ← j + 1', '<b>Temel işlem: P[j] = T[i+j]</b> karşılaştırması'],
            ['    if j = m return i', 'Tüm karakterler eşleşti'],
            ['return −1', '']
          ] },
          { t: 'dg', id: 'string-match' },
          { t: 'table', head: ['Durum', 'Ne olur?', 'Karşılaştırma'], rows: [
            ['En kötü', 'Her hizalamada uyumsuzluk <b>son karakterde</b> çıkar ya da örüntü hiç bulunmaz', 'm(n − m + 1) → <b>O(nm)</b>'],
            ['Ortalama (doğal dil)', 'Uyumsuzluk genellikle ilk birkaç karakterde yakalanır', '≈ <b>Θ(n)</b>']
          ] },
          { t: 'solve', title: 'Slayt 15', q: '1000 adet 0\'dan oluşan metinde <b>00001</b>, <b>10000</b> ve <b>01000</b> örüntüleri için kaç karşılaştırma yapılır?', a: 'Her örüntüde m = 5, hizalama sayısı n − m + 1 = 996 ve hiçbiri bulunmaz.<br><b>00001</b>: her hizalamada ilk 4 karakter eşleşir, 5.\'de uyumsuzluk → 5 karşılaştırma × 996 = <b>4980</b> (en kötü durum).<br><b>10000</b>: ilk karakterde uyumsuzluk → 1 × 996 = <b>996</b>.<br><b>01000</b>: ilk karakter eşleşir, ikincide uyumsuzluk → 2 × 996 = <b>1992</b>.' }
        ],
        checks: [
          { q: 'Gözcülü sıralı aramada gözcünün işlevi nedir?', a: 'Aranan K dizinin sonuna eklenir; döngü mutlaka durur ve her turda "i < n" kontrolü yapılmaz. Sınıf değişmez (Θ(n)), karşılaştırma sayısı azalır.' },
          { q: 'Kaba kuvvet string eşlemede en kötü durum karşılaştırma sayısı nedir?', a: 'm(n − m + 1) → O(nm): her hizalamada uyumsuzluk son karakterde çıkar.' },
          { q: 'Secret algoritması ne hesaplar, kaç karşılaştırma yapar?', a: 'Dizinin en büyük ile en küçük elemanının farkını (açıklık) hesaplar; 2(n−1) karşılaştırma, Θ(n).' }
        ]
      },
      {
        id: 'geometri',
        title: 'En Yakın Çift ve Konveks Gövde',
        en: 'Closest pair and convex hull by brute force',
        src: 'Kaba Kuvvet s. 16–19',
        minutes: 9,
        blocks: [
          { t: 'h', text: 'En yakın çift (kaba kuvvet)' },
          { t: 'p', html: 'n nokta içinde birbirine en yakın iki noktayı bulmak. Kaba kuvvet çözümü <b>her nokta çiftinin</b> Öklid mesafesini hesaplar ve en küçüğünü tutar.' },
          { t: 'codex', title: 'BruteForceClosestPair(P)', rows: [
            ['d ← ∞', ''],
            ['for i ← 1 to n − 1 do\n  for j ← i + 1 to n do', 'Her çift bir kez: n(n−1)/2 çift'],
            ['    d ← min(d, sqrt((xᵢ−xⱼ)² + (yᵢ−yⱼ)²))', 'Karekök yerine kareler karşılaştırılabilir'],
            ['return d', '']
          ] },
          { t: 'note', kind: 'exam', html: '<b>Temel işlem karekök değil, kare almadır.</b> Karekök karmaşık bir işlemdir; karesi büyük olan sayının karekökü de büyük olduğundan, mesafelerin <b>kareleri</b> karşılaştırılır.' },
          { t: 'code', text: 'C(n) = Σᵢ₌₁ⁿ⁻¹ Σⱼ₌ᵢ₊₁ⁿ 2 = 2 Σᵢ₌₁ⁿ⁻¹ (n − i)\n     = 2[(n−1) + (n−2) + … + 1] = (n − 1)n ∈ Θ(n²)' },
          { t: 'p', html: 'Her çift için <b>2 kare alma</b> (Δx² ve Δy²) yapıldığı için toplam n(n−1). 2. haftadaki A–F örneğinde 15 çift incelenmiş, en yakın çift B–E bulunmuştu.' },
          { t: 'h', text: 'Konveks (dışbükey) gövde' },
          { t: 'def', term: 'Konveks gövde', en: 'Convex hull', html: 'Bir nokta kümesindeki <b>tüm noktaları içine alan en küçük konveks çokgen</b>. Konveks küme: içindeki herhangi iki noktayı birleştiren doğru parçası tamamen kümenin içinde kalır. Gövdenin köşeleri kümenin "uç noktalarıdır".' },
          { t: 'list', items: [
            'Küme <b>2 noktadan</b> oluşuyorsa: iki nokta arasındaki doğru parçası',
            'Küme <b>3 noktadan</b> oluşuyorsa: köşeleri bu noktalar olan üçgen; aynı doğru üzerindeyseler en uzak iki nokta arasındaki doğru parçası',
            'Genel durum: aşağıdaki kaba kuvvet fikri'
          ] },
          { t: 'dg', id: 'convex' },
          { t: 'note', kind: 'extra', html: '<b>Kaba kuvvet fikri (ödev için):</b> pᵢ ve pⱼ noktalarından geçen doğru <code>ax + by = c</code> (a = yⱼ − yᵢ, b = xᵢ − xⱼ, c = xᵢyⱼ − yᵢxⱼ). Diğer tüm noktalar için <code>ax + by − c</code> işaretine bak: hepsi <b>aynı taraftaysa</b> (hepsi ≥ 0 ya da hepsi ≤ 0) pᵢpⱼ gövdenin bir kenarıdır. n(n−1)/2 çift × (n − 2) nokta → <b>O(n³)</b>.' }
        ],
        checks: [
          { q: 'Kaba kuvvet en yakın çift algoritmasının karşılaştırma/temel işlem sayısı nedir?', a: 'C(n) = Σ Σ 2 = (n−1)n ∈ Θ(n²).' },
          { q: 'Konveks gövdeyi kaba kuvvetle bulurken bir doğru parçasının gövde kenarı olduğu nasıl anlaşılır? Karmaşıklık?', a: 'Diğer tüm noktalar o doğrunun aynı tarafında kalıyorsa (ax + by − c işaretleri aynı) kenardır. Her çift için n−2 nokta denetlenir: O(n³).' }
        ]
      },
      {
        id: 'etrafli',
        title: 'Etraflı Arama: TSP, Sırt Çantası, İşe Alma',
        en: 'Exhaustive search',
        src: 'Kaba Kuvvet s. 20–24',
        minutes: 13,
        lab: { preset: { module: 'tsp', graph: 'slide' } },
        blocks: [
          { t: 'h', text: 'Etraflı arama' },
          { t: 'def', term: 'Etraflı arama', en: 'Exhaustive search', html: 'Kombinasyonel çözümler içinden belirli bir özelliğe sahip olanı (en kısa, en değerli, en ucuz) bulmak için kullanılan <b>kaba kuvvet</b> çözümü: <b>her ihtimal denenir</b>.' },
          { t: 'list', ordered: true, items: [
            'Tüm olası çözümleri sistematik olarak üret (permütasyon, alt küme…).',
            'Kısıtları sağlamayanları ele.',
            'Her birinin maliyetini hesapla, <b>en iyisini</b> sakla.'
          ] },
          { t: 'h', text: 'Gezgin satıcı problemi' },
          { t: 'def', term: 'Gezgin satıcı (TSP)', en: 'Traveling salesman', html: 'Aralarındaki mesafeler bilinen şehirleri <b>her birinden bir kez geçerek</b> dolaşıp <b>başladığı şehre en kısa yoldan dönen</b> turu bulmak. Graf diliyle: ağırlıklı grafta en kısa <b>Hamilton devresi</b>.' },
          { t: 'dg', id: 'tsp-slide' },
          { t: 'p', html: 'Başlangıç sabitlenince (n − 1)! sıralama, her tur iki yönde aynı olduğundan <b>(n − 1)!/2</b> farklı tur → <b>Θ(n!)</b>. n = 20 için ≈ 6·10¹⁶ tur.' },
          { t: 'h', text: 'Sırt çantası problemi' },
          { t: 'def', term: 'Sırt çantası', en: 'Knapsack', html: 'Ağırlıkları w₁…wₙ ve değerleri v₁…vₙ olan n nesne ile kapasitesi W olan çanta: <b>çantaya sığan</b> (toplam ağırlık ≤ W) ve <b>değeri en yüksek</b> nesne alt kümesini bulmak. Hikâye: hırsız neyi çalacağına karar veriyor.' },
          { t: 'dg', id: 'knapsack' },
          { t: 'p', html: 'n nesnenin <b>2ⁿ</b> alt kümesi vardır; her birinin ağırlığı ve değeri hesaplanır → <b>Ω(2ⁿ)</b>.' },
          { t: 'h', text: 'İşe alma (atama) problemi' },
          { t: 'def', term: 'İşe alma', en: 'Assignment problem', html: 'n aday n pozisyona başvuruyor; her aday her pozisyon için farklı maaş istiyor (C[i, j]). <b>Her pozisyona 1 kişi</b>, <b>her aday işe alınacak</b>, <b>toplam maaş en az</b> olacak.' },
          { t: 'dg', id: 'assignment' },
          { t: 'p', html: 'Her atama bir <b>permütasyondur</b> ⟨j₁, …, jₙ⟩ (i. kişi jᵢ. işe). n! permütasyon denenir → <b>Θ(n!)</b>.' },
          { t: 'note', kind: 'exam', html: 'Üç problem, üç sayma: TSP <b>(n−1)!/2</b> tur, sırt çantası <b>2ⁿ</b> alt küme, işe alma <b>n!</b> permütasyon. Etraflı arama yalnızca çok küçük n için uygulanabilir.' }
        ],
        checks: [
          { q: 'Sırt çantası örneğinde (W = 10; w = 7, 3, 4, 5; v = 42, 12, 40, 25) en iyi seçim nedir?', a: '{3, 4} nesneleri: ağırlık 4 + 5 = 9 ≤ 10, değer 40 + 25 = $65. 16 alt kümenin hepsi denenir.' },
          { q: 'Etraflı aramada TSP, sırt çantası ve işe alma için incelenen çözüm sayıları nedir?', a: 'TSP: (n−1)!/2 tur; sırt çantası: 2ⁿ alt küme; işe alma: n! permütasyon.' },
          { q: 'Slayttaki işe alma matrisinde en ucuz atama nedir?', a: '⟨2, 1, 3, 4⟩: 1. kişi 2. işe (2), 2. kişi 1. işe (6), 3. kişi 3. işe (1), 4. kişi 4. işe (4) → toplam 13.' }
        ]
      },
      {
        id: 'dfs',
        title: 'Önce Derinlik Arama (DFS)',
        en: 'Depth-first search',
        src: 'Kaba Kuvvet s. 26–32',
        minutes: 11,
        blocks: [
          { t: 'h', text: 'Graf gezme' },
          { t: 'p', html: 'Bir grafın <b>tüm düğümlerini ve kenarlarını sistematik olarak</b> gezen iki önemli algoritma: <b>DFS</b> (Depth First Search, önce derinlik) ve <b>BFS</b> (Breadth First Search, önce genişlik). Yapay zekâ ve yöneylem araştırması algoritmalarında kullanılırlar; bağlantılılık ve çevrim gibi temel graf özelliklerini incelemede çok etkilidirler.' },
          { t: 'h', text: 'DFS nasıl çalışır?' },
          { t: 'list', items: [
            'İstenen bir düğümden başlar, onu <b>"ziyaret edildi"</b> olarak işaretler.',
            'Her adımda bulunduğu düğümün <b>ziyaret edilmemiş bir komşusuna</b> geçer. Birden fazla komşu varsa belirlenen kurala göre (alfabetik, en yakın…).',
            'Tüm komşuları ziyaret edilmiş bir düğüme gelince (<b>dead end</b>, çıkmaz) bir önceki düğüme <b>geri döner</b> ve oradan devam etmeyi dener.',
            'Başlangıç düğümüne dönünce durur. Ziyaret edilmemiş düğüm kaldıysa oradan <b>yeniden başlatılır</b>.'
          ] },
          { t: 'def', term: 'Yığıt (stack)', html: 'DFS\'yi izlemek için uygundur: düğüme <b>ilk kez</b> erişildiğinde yığıta <b>itilir (push)</b>; düğüm <b>çıkmaz</b> olduğunda yığıttan <b>çekilir (pop)</b>.' },
          { t: 'dg', id: 'dfs' },
          { t: 'h', text: 'DFS ormanı ve kenar türleri' },
          { t: 'compare', cols: [
            { title: 'Ağaç kenarı (tree edge)', items: ['Ziyaret edilmemiş bir düğüme erişirken kullanılan kenar', 'Erişilen düğüm, erişildiği düğümün <b>çocuğu</b> olur', 'Bu kenarlar <b>DFS ormanını</b> oluşturur'] },
            { title: 'Geri kenar (back edge)', items: ['DFS ormanında bir düğümden ebeveyni dışındaki bir <b>atasına</b> giden kenar', 'Slaytta kesikli çizgi', 'Varsa graf <b>çevrimseldir</b>'] }
          ] },
          { t: 'h', text: 'Etkinlik ve kullanım' },
          { t: 'table', head: ['Gösterim', 'DFS etkinliği'], rows: [
            ['Bitişiklik matrisi', 'Θ(|V|²)'],
            ['Bitişiklik listesi', 'Θ(|V| + |E|)']
          ] },
          { t: 'list', items: [
            'DFS\'de <b>iki düğüm sıralaması</b> vardır: ilk erişim sırası (push) ve çıkmaz olma sırası (pop).',
            'Algoritma durduğunda <b>tüm düğümler ziyaret edildiyse</b> graf <b>bağlantılıdır</b>.',
            'Bir <b>geri kenar</b> bulunduysa graf <b>çevrimseldir</b>.',
            'Ayrım noktalarını bulmada da kullanılır.'
          ] },
          { t: 'note', kind: 'info', html: 'Sözde kodun yalınlığı DFS\'nin basit olduğunu göstermez: gücü, bitişiklik matrisi ya da listesi üzerindeki hareketlerinde anlaşılır ve etkinliği bu veri yapısına bağlıdır.' }
        ],
        checks: [
          { q: 'Slayttaki grafta alfabetik DFS\'de düğümlerin yığıta itilme ve çekilme sıraları nedir?', a: 'İtilme: a1 c2 d3 f4 b5 e6 g7 h8 i9 j10. Çekilme: d1 e2 b3 f4 c5 a6 j7 i8 h9 g10.' },
          { q: 'DFS hangi veri yapısıyla izlenir? Etkinliği nedir?', a: 'Yığıt (stack). Bitişiklik matrisiyle Θ(|V|²), bitişiklik listesiyle Θ(|V| + |E|).' },
          { q: 'DFS ormanında geri kenar bulunması ne anlama gelir?', a: 'Grafta çevrim vardır (graf çevrimseldir).' }
        ]
      },
      {
        id: 'bfs',
        title: 'Önce Genişlik Arama (BFS)',
        en: 'Breadth-first search',
        src: 'Kaba Kuvvet s. 33–40',
        minutes: 10,
        blocks: [
          { t: 'h', text: 'BFS nasıl çalışır?' },
          { t: 'p', html: 'DFS <b>"cesurca"</b> ilerler (başlangıçtan olabildiğince uzağa gitmeye çalışır); BFS <b>dikkatli</b> ilerler. Önce başlangıç düğümüne <b>bitişik tüm düğümleri</b>, sonra <b>iki kenar uzaklıktakileri</b>, ve bağlı tüm düğümler bitene kadar katman katman gezer.' },
          { t: 'def', term: 'Kuyruk (queue)', html: 'BFS\'yi izlemek için uygundur: başlangıç düğümü eklenerek kuyruk başlatılır; her ziyaret edilmemiş komşu <b>"ziyaret edildi"</b> diye işaretlenip kuyruğa eklenir; <b>ilk eklenen ilk çıkar</b> (FIFO).' },
          { t: 'dg', id: 'bfs' },
          { t: 'h', text: 'BFS ormanı' },
          { t: 'compare', cols: [
            { title: 'Ağaç kenarı', items: ['Ziyaret edilmemiş komşuya erişilen kenar', 'BFS ormanını oluşturur'] },
            { title: 'Çapraz kenar (cross edge)', items: ['Ağaçta olmayan, zaten ziyaret edilmiş bir düğüme giden kenar', 'Slaytta kesikli çizgi'] }
          ] },
          { t: 'h', text: 'Etkinlik ve DFS\'den farkları' },
          { t: 'list', items: [
            'Etkinliği DFS gibidir: bitişiklik matrisi <b>Θ(|V|²)</b>, bitişiklik listesi <b>Θ(|V| + |E|)</b>.',
            'Kuyruğun FIFO özelliği nedeniyle <b>tek tip</b> düğüm sıralaması verir (ekleme sırası = çıkarma sırası).',
            'Bağlantılılık ve çevrimselliği denetlemede kullanılır.',
            '<b>DFS ile yapılamayan:</b> verilen iki düğüm arasındaki <b>en az kenarlı yolu</b> bulur.'
          ] },
          { t: 'note', kind: 'warn', html: 'Slayt 38 "BFS\'de bir <b>geri</b> ayrıt bulunduysa graf çevrimseldir" diyor; BFS ormanında geri kenar değil <b>çapraz kenar</b> oluşur. Doğrusu: BFS\'de bir <b>çapraz kenar</b> bulunduysa graf çevrimseldir.' },
          { t: 'table', head: ['', 'DFS', 'BFS'], rows: [
            ['Veri yapısı', 'Yığıt (stack)', 'Kuyruk (queue)'],
            ['Düğüm sıralaması', 'İki farklı sıralama', 'Tek sıralama'],
            ['Kenar türleri', 'Ağaç ve geri kenar', 'Ağaç ve çapraz kenar'],
            ['Uygulama', 'Bağlantılılık, çevrimsellik, ayrım noktaları', 'Bağlantılılık, çevrimsellik, en az kenarlı yol'],
            ['Bitişiklik matrisi', 'Θ(|V|²)', 'Θ(|V|²)'],
            ['Bitişiklik listesi', 'Θ(|V| + |E|)', 'Θ(|V| + |E|)']
          ] }
        ],
        checks: [
          { q: 'Slayttaki grafta alfabetik BFS\'de kuyruğa eklenme sırası nedir?', a: 'a1 c2 d3 e4 f5 b6 g7 h8 j9 i10.' },
          { q: 'BFS\'nin DFS ile yapılamayan uygulaması nedir?', a: 'İki düğüm arasındaki en az kenardan oluşan yolu bulmak.' },
          { q: 'DFS ve BFS\'yi veri yapısı, sıralama sayısı ve kenar türleri açısından karşılaştırın.', a: 'DFS: yığıt, iki sıralama (push/pop), ağaç ve geri kenar. BFS: kuyruk, tek sıralama, ağaç ve çapraz kenar.' }
        ]
      },
      {
        id: 'postane',
        title: 'Lab: Postane Problemi',
        en: 'Lab: post office location',
        src: 'Kaba Kuvvet s. 25',
        minutes: 7,
        blocks: [
          { t: 'h', text: 'Problem' },
          { t: 'list', ordered: true, items: [
            'Düz bir yol üzerinde n köy var, konumları x₁ &lt; x₂ &lt; … &lt; xₙ. Bu köylerden birine postane kurulacak. <b>Tüm köyler için optimum uzaklıkta</b> postanenin hangi köye kurulacağını bulan kaba kuvvet algoritmasını yazın.',
            'Postanenin <b>belirtilen bir köye en uzak</b> olacak şekilde kurulmasını sağlayan algoritmayı yazın.'
          ] },
          { t: 'dg', id: 'postane' },
          { t: 'h', text: 'Kaba kuvvet çözümü' },
          { t: 'codex', title: 'Postane(x[1..n])', rows: [
            ['best ← ∞', ''],
            ['for i ← 1 to n do', 'Her köy aday'],
            ['    cost ← 0\n    for j ← 1 to n do\n        cost ← cost + |xᵢ − xⱼ|', 'Temel işlem: |xᵢ − xⱼ| hesaplaması'],
            ['    if cost < best\n        best ← cost; k ← i', ''],
            ['return k', 'n² işlem → <b>Θ(n²)</b>']
          ] },
          { t: 'note', kind: 'info', html: '"Optimum uzaklık" iki türlü yorumlanabilir: <b>toplam uzaklığı</b> en aza indirmek (yukarıdaki kod; sonuç ortanca köydür) ya da <b>en uzak köyün uzaklığını</b> en aza indirmek (cost yerine max alınır; sonuç orta noktaya en yakın köydür). Raporda hangisini seçtiğini belirt. Şekil ikisini de hesaplar.' },
          { t: 'p', html: '<b>2. kısım:</b> belirtilen köy xₖ ise her köyün |xᵢ − xₖ| uzaklığı hesaplanır, en büyüğü seçilir: n işlem, <b>Θ(n)</b>. Köyler sıralı olduğundan cevap her zaman <b>x₁ ya da xₙ</b>\'dir.' }
        ],
        checks: [
          { q: 'Postane problemi (toplam uzaklık) için kaba kuvvet algoritmasının karmaşıklığı nedir?', a: 'Her aday köy için n uzaklık toplanır: n·n → Θ(n²).' },
          { q: 'Postaneyi belirtilen bir köye en uzak kurmak için hangi köyler aday olabilir?', a: 'Yalnızca uç köyler x₁ ve xₙ; kaba kuvvetle tüm köylere bakmak Θ(n).' }
        ]
      },
      {
        id: 'lab2',
        title: 'Lab 2: 6 Şehirde Satış Turu',
        en: 'Lab 2: brute-force tour',
        src: 'Lab Uygulaması 2',
        minutes: 10,
        lab: { preset: { module: 'tsp', mode: 'path', k: 4 } },
        blocks: [
          { t: 'h', text: 'Problem' },
          { t: 'p', html: 'Bir satıcı aşağıdaki 6 şehirden birinden yola çıkarak <b>4 şehirlik</b> bir satış turu yapacak. <b>Gittiği şehre bir daha gitmeyecek, geçtiği yoldan bir daha geçmeyecek.</b> Hangi şehirden çıkıp hangi şehirleri dolaşarak <b>minimum yol</b> kat edeceğini bulan kaba kuvvet çözümü yazılacak.' },
          { t: 'dg', id: 'lab2-graph' },
          { t: 'note', kind: 'info', html: 'Graf <b>tam değil</b>: her şehir çifti arasında yol yok (ör. A–C, A–D). Kaba kuvvet çözümü, ardışık iki şehri arasında kenar olmayan sıralamaları <b>geçersiz</b> sayıp eler.' },
          { t: 'h', text: 'Kaba kuvvet tasarımı' },
          { t: 'codex', title: 'EnKisaTur(şehirler, k = 4)', rows: [
            ['best ← ∞', ''],
            ['for her başlangıç s (6 seçenek)', 'Başlangıç şehri de denenir'],
            ['  for s\'den başlayan, tekrar etmeyen\n      her k şehirlik sıralama', '6·5·4·3 = <b>360</b> sıralı seçim'],
            ['    if ardışık her çift arasında yol var\n      L ← yolların toplamı\n      if L < best  best ← L; enİyi ← sıralama', 'Temel işlem: bir sıralamanın uzunluğunu hesaplamak'],
            ['return enİyi, best', '']
          ] },
          { t: 'h', text: 'İki yorum, iki cevap' },
          { t: 'p', html: 'Ödev metni "tur" diyor ama dönüşten söz etmiyor. İki yorumun ikisini de raporda göstermek güvenli olur:' },
          { t: 'table', head: ['Yorum', 'Geçerli sıralama', 'En kısa', 'Uzunluk'], rows: [
            ['<b>Yol</b>: 4 şehir, 3 yol, başlangıca dönmeden', '62', 'B → F → E → C (ya da tersi)', '1 + 2 + 3 = <b>6</b>'],
            ['<b>Tur</b>: 4 şehir, 4 yol, başlangıca dönerek', '24 (6 farklı devre)', 'B → F → E → C → B', '1 + 2 + 3 + 5 = <b>11</b>']
          ] },
          { t: 'note', kind: 'exam', html: 'Kontrol için: 6 şehrin tamamını dolaşan Hamilton devresi bu grafta yalnızca bir tanedir: A → B → C → D → E → F → A = 9 + 5 + 8 + 7 + 2 + 4 = <b>35</b>. Laboratuvarın <b>Gezgin Satıcı</b> modülü bu üç senaryoyu da çalıştırır, her sıralamayı tek tek gösterir.' }
        ],
        checks: [
          { q: '6 şehirden 4 şehirlik sıralı seçim sayısı kaçtır?', a: '6·5·4·3 = 360 (P(6,4)).' },
          { q: 'Lab 2 grafında başlangıca dönmeden 4 şehirlik en kısa yol hangisidir?', a: 'B → F → E → C: 1 + 2 + 3 = 6 (ters yönü C → E → F → B de aynı).' },
          { q: 'Kaba kuvvet çözümünde kenarı olmayan şehir çiftleri nasıl ele alınır?', a: 'O sıralama geçersiz sayılır ve maliyeti hesaplanmadan elenir (ya da mesafe ∞ kabul edilir).' }
        ]
      }
    ]
  });
})(window.OSLab = window.OSLab || {});
