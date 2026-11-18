/*
 * teacher-questions.js — Hocanın slaytlarındaki alıştırmalar ve lab soruları (model cevaplı).
 *
 * YENİ SORU EKLEMEK İÇİN listenin sonuna şu biçimde bir nesne ekleyin:
 *   {
 *     id: 'h30',                       // benzersiz kimlik (ilerleme kaydı buna bağlı, değiştirmeyin)
 *     set: 'H1-H2 s. 58',              // sorunun geldiği yer
 *     lesson: 'ch3/tn',                // ilgili ders: '<bölüm>/<ders id>'
 *     focus: 'döngü|loop',             // isteğe bağlı: dersin hangi kartlarında uyarı çıksın (düzenli ifade)
 *     q: 'Soru metni',
 *     a: '<p>Model cevap (HTML)</p>',
 *     keys: ['cevapta olması gereken nokta 1', 'nokta 2'],
 *     lab: { label: '...', preset: { module: 'sorting', ... } }   // isteğe bağlı
 *   }
 * "(Ek)" ile işaretli bilgiler slaytlarda yok; genel bilgiden eklendi.
 */
(function (OSLab) {
  'use strict';

  OSLab.teacherQuestions = [
    {
      id: 'h1', set: 'H1-H2 s. 10', lesson: 'ch1/ebob', focus: 'Ardışık tamsayı kontrolü|sıfıra bölme',
      q: 'Ardışık tamsayı kontrol algoritması, Euclid algoritmasından farklı olarak değerlerden biri 0 ise doğru çalışmaz. Neden? Bu durum algoritma tasarımı hakkında ne söyler?',
      a: `<p>Algoritma t ← min{m, n} ile başlar. Değerlerden biri 0 ise <b>t = 0</b> olur ve Adım 2\'deki <b>m / t</b> işlemi <b>sıfıra bölme</b> hatası verir (ya da t hiç azalamayacağı için algoritma sonlanmaz). Oysa gcd(m, 0) = m\'dir ve Euclid bunu ilk adımda döndürür.</p>
<p>Ders: algoritmanın <b>girdi alanı kesin ve dikkatli tanımlanmalıdır</b>; istisnai girdiler problem anlama aşamasında düşünülmelidir.</p>`,
      keys: ['t = min(m, n) = 0 olur', 'Sıfıra bölme oluşur', 'Euclid gcd(m, 0) = m sonucunu verir', 'Girdilerin kesin ve dikkatli belirlenmesi gerekir']
    },
    {
      id: 'h2', set: 'H1-H2 s. 9', lesson: 'ch1/ebob', focus: 'sonlanır|sonu var',
      q: 'Euclid\'in EBOB algoritmasının sonu var mıdır? Gerekçesiyle açıklayın.',
      a: `<p>Evet. Her iterasyonda (m, n) çifti (n, m mod n) olur ve <b>m mod n &lt; n</b> olduğundan ikinci değer <b>kesin olarak azalır</b>. İki pozitif sayının bölümünden negatif kalan çıkmaz, yani değer <b>0\'dan küçük olamaz</b>. Azalan ve alttan sınırlı bir tamsayı dizisi sonlu adımda <b>0\'a ulaşır</b>; bu anda algoritma m\'yi döndürüp durur.</p>`,
      keys: ['n her iterasyonda azalır (m mod n < n)', 'Kalan negatif olamaz', 'Sonlu adımda 0\'a ulaşır ve algoritma durur']
    },
    {
      id: 'h3', set: 'H1-H2 s. 58', lesson: 'ch3/ozyineli-olmayan', focus: 'Temel işlem|temel işlem',
      q: 'Aşağıdaki algoritmaların temel işlemlerini ve gerçekleşme sayılarını C(n) bulun: 1) n elemanın toplamı 2) n! 3) n elemanlı dizinin en büyüğü 4) Öklid EBOB 5) n×n iki matrisin toplanması 6) n×n iki matrisin çarpımı.',
      a: `<table><thead><tr><th>Algoritma</th><th>Temel işlem</th><th>C(n)</th></tr></thead><tbody>
<tr><td>1. n elemanın toplamı</td><td>toplama</td><td>n − 1 ∈ Θ(n)</td></tr>
<tr><td>2. n! (iteratif ya da özyinelemeli)</td><td>çarpma</td><td>n − 1 (ya da M(n)=M(n−1)+1 → n) ∈ Θ(n)</td></tr>
<tr><td>3. En büyük eleman</td><td>karşılaştırma</td><td>n − 1 ∈ Θ(n)</td></tr>
<tr><td>4. Öklid EBOB</td><td>mod (bölme)</td><td>en kötü durumda O(log n) (Ek: n ≤ m için ≈ 5·basamak sayısı); girdiye bağlı</td></tr>
<tr><td>5. Matris toplama</td><td>toplama</td><td>n² ∈ Θ(n²)</td></tr>
<tr><td>6. Matris çarpımı</td><td>çarpma</td><td>n³ ∈ Θ(n³)</td></tr></tbody></table>`,
      keys: ['Toplam: toplama, n−1', 'Faktöriyel: çarpma, n−1 (≈n)', 'En büyük: karşılaştırma, n−1', 'Öklid: mod işlemi, logaritmik, girdiye bağlı', 'Matris toplama: n²', 'Matris çarpımı: çarpma, n³']
    },
    {
      id: 'h4', set: 'H1-H2 s. 58', lesson: 'ch4/ortalama', focus: 'indis listesi|Slayt 58',
      q: 'Sıralı aramanın, aranan verinin yer aldığı indislerin listesini veren (birden fazla kez geçebilir) sürümünü tasarlayıp verimliliğini klasik sıralı aramayla karşılaştırın (C(n), T(n), en kötü, en iyi durumlar).',
      a: `<pre>AllIndices(A[0..n−1], K)
  L ← boş liste
  for i ← 0 to n − 1 do
      if A[i] = K  L'ye i ekle
  return L</pre>
<p>Tüm geçişler istendiği için erken çıkış yoktur: karşılaştırma sayısı her girdide <b>C(n) = n</b>. En iyi = en kötü = ortalama = n, <b>Θ(n)</b>. T(n) ≈ c_op·n.</p>
<p>Klasik sıralı arama: en iyi 1, en kötü n, ortalama (başarılı aramada) (n+1)/2. Her iki algoritma da <b>Θ(n)</b> sınıfındadır, ancak yeni sürüm ortalamada yaklaşık <b>2 kat</b> fazla karşılaştırma yapar ve en iyi durumu yoktur.</p>`,
      keys: ['Dizinin sonuna kadar taranır, erken çıkış yok', 'C(n) = n her durumda', 'Klasik: en iyi 1, en kötü n, ortalama (n+1)/2', 'İkisi de Θ(n)']
    },
    {
      id: 'h5', set: 'H1-H2 s. 59', lesson: 'ch3/cerceve', focus: 'Büyüme derecesi',
      q: 'log₂n, √n, n, n², n³, 2ⁿ fonksiyonları için girdi boyutu 10, 10², 10³, 10⁴ olduğunda değerleri karşılaştırın. n 10 katına çıkınca her biri ne kadar artar?',
      a: `<table><thead><tr><th>n</th><th>log₂n</th><th>√n</th><th>n</th><th>n²</th><th>n³</th><th>2ⁿ</th></tr></thead><tbody>
<tr><td>10</td><td>3,3</td><td>3,2</td><td>10</td><td>10²</td><td>10³</td><td>1024</td></tr>
<tr><td>10²</td><td>6,6</td><td>10</td><td>10²</td><td>10⁴</td><td>10⁶</td><td>1,3·10³⁰</td></tr>
<tr><td>10³</td><td>10</td><td>31,6</td><td>10³</td><td>10⁶</td><td>10⁹</td><td>≈10³⁰¹</td></tr>
<tr><td>10⁴</td><td>13,3</td><td>100</td><td>10⁴</td><td>10⁸</td><td>10¹²</td><td>≈10³⁰¹⁰</td></tr></tbody></table>
<p>n 10 katına çıkınca: log₂n <b>+3,32</b> artar, √n <b>≈3,16 kat</b>, n <b>10 kat</b>, n² <b>100 kat</b>, n³ <b>1000 kat</b>; 2ⁿ ise <b>2⁹ⁿ kat</b> (patlar).</p>`,
      keys: ['log₂n her adımda yalnızca ≈3,3 artar', '√n ≈ 3,16 kat', 'n² 100 kat, n³ 1000 kat', '2ⁿ üssel patlar'],
      lab: { label: 'Büyüme tablosunu laboratuvarda aç', preset: { module: 'growth', tab: 'table' } }
    },
    {
      id: 'h6', set: 'H1-H2 s. 59', lesson: 'ch5/limit', focus: 'Slayt 59',
      q: 'Büyüme derecesi olarak karşılaştırın (eşit, büyük, küçük): a) n(n+1) ve 2000n²  b) 100n² ve 0,01n³  c) log₂n ve ln n  d) log₂²n ve log₂n²  e) 2ⁿ⁻¹ ve 2ⁿ  f) (n−1)! ve n!',
      a: `<ol type="a">
<li>lim n(n+1)/2000n² = 1/2000 → <b>eşit</b></li>
<li>lim 100n²/0,01n³ = 0 → 100n² <b>daha küçük</b></li>
<li>log₂n = ln n / ln 2 → oran sabit → <b>eşit</b></li>
<li>log₂n² = 2log₂n; lim log₂²n / 2log₂n = lim ½log₂n = ∞ → log₂²n <b>daha büyük</b></li>
<li>2ⁿ⁻¹ = ½·2ⁿ → <b>eşit</b></li>
<li>(n−1)!/n! = 1/n → 0 → (n−1)! <b>daha küçük</b></li></ol>`,
      keys: ['a) eşit', 'b) 100n² daha küçük', 'c) eşit (taban değişimi sabit çarpan)', 'd) log₂²n daha büyük', 'e) eşit', 'f) (n−1)! daha küçük'],
      lab: { label: 'Limit karşılaştırıcısında dene', preset: { module: 'growth', tab: 'limit' } }
    },
    {
      id: 'h7', set: 'H1-H2 s. 63', lesson: 'ch5/notasyonlar', focus: 'Big Oh: tanım',
      q: '100n + 5 ∈ O(n²) olduğunu tanımı kullanarak ispatlayın.',
      a: `<p>Tanım: pozitif c ve negatif olmayan n₀ için her n ≥ n₀\'da t(n) ≤ c·g(n) olmalı.</p>
<pre>100n + 5 ≤ 100n + n   (n ≥ 5)
         = 101n
         ≤ 101n²      (n ≥ 1)</pre>
<p>c = 101, n₀ = 5 seçilirse tanım sağlanır. (Başka bir çift: 100n + 5 ≤ 105n², n ≥ 1, c = 105, n₀ = 1.)</p>`,
      keys: ['Tanımı yazar: t(n) ≤ c·g(n), n ≥ n₀', '5 ≤ n kullanılır', 'c = 101, n₀ = 5 (veya geçerli başka bir çift)']
    },
    {
      id: 'h8', set: 'H1-H2 s. 69', lesson: 'ch5/notasyonlar', focus: 'Big Theta',
      q: '½n(n − 1) ∈ Θ(n²) olduğunu ispatlayın.',
      a: `<pre>Üst sınır: ½n(n−1) = ½n² − ½n ≤ ½n²           (n ≥ 0)
Alt sınır: ½n² − ½n ≥ ½n² − ½n·½n = ¼n²        (n ≥ 2 için ½n ≤ ½n·½n)</pre>
<p>c₂ = ¼, c₁ = ½, n₀ = 2 için ¼n² ≤ ½n(n−1) ≤ ½n². Tanım sağlanır.</p>
<p>Limitle kontrol: lim ½n(n−1)/n² = ½ (sabit) → Θ(n²).</p>`,
      keys: ['İki eşitsizlik yazılır (alt ve üst)', 'Üst: c₁ = ½', 'Alt: c₂ = ¼, n ≥ 2', 'n₀ = 2']
    },
    {
      id: 'h9', set: 'H1-H2 s. 78', lesson: 'ch5/limit', focus: 'Slayt 78',
      q: 'Aşağıdaki ifadelerin doğruluğunu değerlendirin: a) n(n+1)/2 ∈ O(n³)  b) n(n+1)/2 ∈ O(n²)  c) n(n+1)/2 ∈ Θ(n³)  d) n(n+1)/2 ∈ Ω(n)',
      a: `<p>n(n+1)/2 ∈ Θ(n²) (lim (n²+n)/2n² = ½).</p><ol type="a"><li><b>Doğru</b>: n² büyüme derecesi n³\'ten küçük, O üst sınırdır.</li><li><b>Doğru</b>: aynı büyüme derecesi.</li><li><b>Yanlış</b>: lim n(n+1)/2n³ = 0; büyüme derecesi daha küçük.</li><li><b>Doğru</b>: lim n(n+1)/2n = ∞; Ω alt sınırdır.</li></ol>`,
      keys: ['n(n+1)/2 ∈ Θ(n²)', 'a doğru', 'b doğru', 'c yanlış', 'd doğru']
    },
    {
      id: 'h10', set: 'H1-H2 s. 79–80', lesson: 'ch5/limit', focus: 'Slayt 79',
      q: 'Θ(g(n)) sınıflarını ispatlayarak gösterin: a) (n²+1)¹⁰  b) √(10n² + 7n + 3)  c) 2n lg(n+2)² + (n+2)² lg(n/2)  d) 2ⁿ⁺¹ + 3ⁿ⁻¹',
      a: `<ol type="a"><li>lim (n²+1)¹⁰/n²⁰ = lim ((n²+1)/n²)¹⁰ = lim (1 + 1/n²)¹⁰ = 1 → <b>Θ(n²⁰)</b></li>
<li>lim √(10n²+7n+3)/n = lim √(10 + 7/n + 3/n²) = √10 → <b>Θ(n)</b></li>
<li>2n·lg(n+2)² = 4n lg(n+2) ∈ Θ(n lg n); (n+2)²·lg(n/2) = (n+2)²(lg n − 1) ∈ Θ(n² lg n). Toplamda büyük olan kalır → <b>Θ(n² lg n)</b></li>
<li>2ⁿ⁺¹ + 3ⁿ⁻¹ = 2·2ⁿ + ⅓·3ⁿ ∈ Θ(2ⁿ) + Θ(3ⁿ) = <b>Θ(3ⁿ)</b></li></ol>`,
      keys: ['a) Θ(n²⁰), limit 1', 'b) Θ(n), limit √10', 'c) Θ(n² lg n)', 'd) Θ(3ⁿ)']
    },
    {
      id: 'h11', set: 'H1-H2 s. 81', lesson: 'ch5/limit', focus: 'Çözümlü örnekler|sıralama',
      q: 'log n, n, n log n, n², n³, 2ⁿ, n! sıralamasının büyüme derecesine göre doğruluğunu limitlerle ispatlayın.',
      a: `<pre>lim log₂n / n        = lim (log₂e / n) / 1 = 0           (L'Hôpital)
lim n / (n log₂n)    = lim 1 / log₂n = 0
lim n log₂n / n²     = lim log₂n / n = 0
lim n² / n³          = lim 1 / n = 0
lim n³ / 2ⁿ          = (L'Hôpital 3 kez) lim 6 / (2ⁿ ln³2) = 0
lim 2ⁿ / n!          = 0   (Stirling: n! ≈ √(2πn)(n/e)ⁿ)</pre>
<p>Her ardışık çiftte limit 0: soldaki fonksiyonun büyüme derecesi daha küçük. Sıralama doğrudur.</p>`,
      keys: ['Her ardışık çift için lim = 0', 'log n / n için L\'Hôpital', 'n³ / 2ⁿ için L\'Hôpital 3 kez', '2ⁿ / n! için Stirling']
    },
    {
      id: 'h12', set: 'H1-H2 s. 82', lesson: 'ch5/limit', focus: 'Slayt 82',
      q: 'Fonksiyonları büyüme derecesine göre sıralayın: (n−2)!, 5lg(n+100)¹⁰, 2²ⁿ, 0,001n⁴ + 3n³ + 1, ln²n, ∛n, 3ⁿ',
      a: `<p><b>5lg(n+100)¹⁰ &lt; ln²n &lt; ∛n &lt; 0,001n⁴ + 3n³ + 1 &lt; 3ⁿ &lt; 2²ⁿ &lt; (n−2)!</b></p>
<ul><li>5lg(n+100)¹⁰ = 50·lg(n+100) ∈ Θ(log n)</li><li>ln²n = (ln n)², log\'un karesi: log n\'den hızlı, her polinomdan yavaş</li><li>∛n = n^(1/3)</li><li>0,001n⁴ + … ∈ Θ(n⁴)</li><li>3ⁿ &lt; 2²ⁿ = 4ⁿ</li><li>(n−2)! her üstelden hızlı büyür</li></ul>`,
      keys: ['5lg(n+100)¹⁰ = Θ(log n) en yavaş', 'ln²n < ∛n', 'Polinom Θ(n⁴)', '3ⁿ < 4ⁿ = 2²ⁿ', '(n−2)! en hızlı']
    },
    {
      id: 'h13', set: 'Özyinelemeli s. 8–12', lesson: 'ch3/ozyineli', focus: 'Çözümlü örnekler',
      q: 'Özyinelemeleri geriye doğru yerine koyma ile çözün: a) x(n) = x(n−1) + 5, x(1) = 0  b) x(n) = 3x(n−1), x(1) = 4  c) x(n) = x(n−1) + n, x(0) = 0  d) x(n) = x(n/2) + n, x(1) = 1 (n = 2ᵏ)  e) x(n) = x(n/3) + 1, x(1) = 1 (n = 3ᵏ)',
      a: `<ol type="a"><li>x(n) = x(n−i) + 5i → i = n−1: x(1) + 5(n−1) = <b>5(n − 1)</b></li>
<li>x(n) = 3ⁱx(n−i) → 3ⁿ⁻¹x(1) = <b>4·3ⁿ⁻¹</b></li>
<li>x(n) = x(n−i) + (n−i+1) + … + n → x(0) + 1 + … + n = <b>n(n+1)/2</b></li>
<li>x(2ᵏ) = x(2ᵏ⁻ⁱ) + 2ᵏ⁻ⁱ⁺¹ + … + 2ᵏ → x(1) + 2 + … + 2ᵏ = 2ᵏ⁺¹ − 1 = <b>2n − 1</b></li>
<li>x(3ᵏ) = x(3ᵏ⁻ⁱ) + i → x(1) + k = <b>1 + log₃n</b></li></ol>`,
      keys: ['Örüntüyü i ile yazar', 'Başlangıç koşuluna götürür (i = n−1, n veya k)', 'a) 5(n−1)', 'b) 4·3ⁿ⁻¹', 'c) n(n+1)/2', 'd) 2n − 1', 'e) 1 + log₃n']
    },
    {
      id: 'h14', set: 'Özyinelemeli s. 13', lesson: 'ch3/ozyineli', focus: 'küplerin',
      q: 'S(n) = 1³ + 2³ + … + n³ için özyinelemeli algoritmayı yazın; özyineleme ilişkisini ve temel işlemin gerçekleşme sayısını bulun.',
      a: `<pre>Algorithm S(n)
  if n = 1 return 1
  else return S(n − 1) + n * n * n</pre>
<p>Temel işlem çarpma; her çağrıda 2 çarpma: <b>M(n) = M(n−1) + 2, M(1) = 0</b>.</p>
<pre>M(n) = M(n−1) + 2 = M(n−2) + 2 + 2 = … = M(n−i) + 2i
i = n−1: M(1) + 2(n−1) = 2(n − 1) ∈ Θ(n)</pre>`,
      keys: ['Özyinelemeli algoritma S(n−1) + n·n·n', 'M(n) = M(n−1) + 2', 'M(1) = 0', 'M(n) = 2(n−1)']
    },
    {
      id: 'h15', set: 'Özyinelemeli s. 14–17', lesson: 'ch3/hanoi', focus: 'Hamle sayısı',
      q: 'Hanoi kuleleri bulmacasının özyinelemeli çözümünü açıklayın; hamle sayısı için özyineleme ilişkisini kurup çözün.',
      a: `<p>n − 1 disk Ç1\'den Ç2\'ye özyinelemeli taşınır, en büyük disk Ç1\'den Ç3\'e taşınır, n − 1 disk Ç2\'den Ç3\'e taşınır. n = 1 ise tek hamle.</p>
<pre>M(n) = 2M(n−1) + 1,  M(1) = 1
     = 2²M(n−2) + 2 + 1 = 2³M(n−3) + 2² + 2 + 1 = …
     = 2ⁱM(n−i) + 2ⁱ − 1
i = n−1: 2ⁿ⁻¹ + 2ⁿ⁻¹ − 1 = 2ⁿ − 1</pre>
<p><b>M(n) = 2ⁿ − 1 ∈ Θ(2ⁿ)</b>, üssel. Büyük n için çok uzun sürer ama bu algoritmanın etkin olmadığını göstermez; problem bu kadar hamle gerektirir.</p>`,
      keys: ['Üç adımlı özyinelemeli çözüm', 'M(n) = 2M(n−1) + 1, M(1) = 1', 'Geriye doğru yerine koyma örüntüsü 2ⁱM(n−i) + 2ⁱ − 1', 'M(n) = 2ⁿ − 1, üssel']
    },
    {
      id: 'h16', set: 'Algoritma Performansı s. 6', lesson: 'ch3/tn', focus: 'Satır satır',
      q: 'Bir dizinin ortalamasını hesaplayan C fonksiyonu (for döngüsünde tot += A[i], sonra N > 0 ise ort = (float)tot / N) için toplam işlem sayısı T(N)\'yi satır satır hesaplayın.',
      a: `<table><thead><tr><th>İşlem</th><th>Tekrar</th></tr></thead><tbody>
<tr><td>tot = 0</td><td>1</td></tr><tr><td>i = 0</td><td>1</td></tr><tr><td>i &lt; N</td><td>N + 1</td></tr><tr><td>i++</td><td>N</td></tr><tr><td>tot = tot + A[i]</td><td>N</td></tr><tr><td>N &gt; 0</td><td>1</td></tr><tr><td>(float) tot</td><td>1</td></tr><tr><td>… / N</td><td>1</td></tr><tr><td>return ort</td><td>1</td></tr></tbody></table>
<p><b>T(N) = 3N + 7</b> → O(N).</p>`,
      keys: ['Döngü koşulu N+1 kez', 'i++ ve gövde N kez', 'Döngü dışı işlemler 1\'er kez', 'T(N) = 3N + 7']
    },
    {
      id: 'h17', set: 'Kaba Kuvvet s. 6–7', lesson: 'ch6/bubble', focus: 'Analiz',
      q: 'Seçmeli ve kabarcık sıralamada temel işlem nedir? Gerçekleşme sayısı formülünü toplam sembolüyle çıkarın.',
      a: `<p>İkisinde de temel işlem <b>anahtar karşılaştırması</b> (A[j] &lt; A[min] ve A[j+1] &lt; A[j]).</p>
<pre>Selection: C(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌ᵢ₊₁ⁿ⁻¹ 1 = Σᵢ₌₀ⁿ⁻² (n − 1 − i) = (n−1)n/2
Bubble:    C(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌₀ⁿ⁻²⁻ⁱ 1 = Σᵢ₌₀ⁿ⁻² (n − 1 − i) = (n−1)n/2</pre>
<p>İkisi de <b>Θ(n²)</b>, girdiden bağımsız. Fark yer değiştirmede: selection n − 1, bubble en kötü durumda n(n−1)/2.</p>`,
      keys: ['Temel işlem karşılaştırma', 'Çift toplam yazılır', 'Sonuç (n−1)n/2', 'Θ(n²)', 'Yer değiştirme farkı (selection n−1)'],
      lab: { label: 'Bubble sort\'u adım adım izle', preset: { module: 'sorting', algo: 'bubble' } }
    },
    {
      id: 'h18', set: 'Böl Fethet s. 6', lesson: 'ch8/bol-fethet', focus: 'Master',
      q: 'Master teoremine göre T(n) = 4T(n/2) + n, T(n) = 4T(n/2) + n², T(n) = 4T(n/2) + n³ için T(n) hangi sınıftadır?',
      a: `<p>a = 4, b = 2 → bᵈ = 2ᵈ.</p><ul>
<li>f(n) = n, d = 1: 4 &gt; 2¹ → Θ(n^(log₂4)) = <b>Θ(n²)</b></li>
<li>f(n) = n², d = 2: 4 = 2² → <b>Θ(n² log n)</b></li>
<li>f(n) = n³, d = 3: 4 &lt; 2³ → <b>Θ(n³)</b></li></ul>`,
      keys: ['a = 4, b = 2 belirlenir', 'n → Θ(n²)', 'n² → Θ(n² log n)', 'n³ → Θ(n³)']
    },
    {
      id: 'h19', set: 'Böl Fethet s. 7', lesson: 'ch8/merge', focus: 'Analiz',
      q: 'Birleştirmeli sıralamanın karşılaştırma sayısı için özyineleme ilişkisini kurun; en kötü durumu Master teoremiyle bulun.',
      a: `<pre>C(n) = 2C(n/2) + C_merge(n),  C(1) = 0</pre>
<p>Birleştirmede her karşılaştırma bir elemanı yerleştirir; en kötü durumda iki dizi de son karşılaştırmaya kadar boşalmaz: <b>C_merge(n) = n − 1</b>.</p>
<pre>C_worst(n) = 2C_worst(n/2) + n − 1</pre>
<p>a = 2, b = 2, d = 1, a = bᵈ → <b>Θ(n log n)</b>. Tam çözüm: C_worst(n) = n log₂n − n + 1.</p>`,
      keys: ['C(n) = 2C(n/2) + C_merge(n)', 'C_merge = n − 1 en kötü', 'a=2, b=2, d=1', 'Θ(n log n)'],
      lab: { label: 'Merge sort\'u adım adım izle', preset: { module: 'sorting', algo: 'merge' } }
    },
    {
      id: 'h20', set: 'Böl Fethet s. 12, 18', lesson: 'ch8/quick', focus: 'Analiz',
      q: 'Çabuk sıralamanın en iyi, en kötü ve ortalama durumlarını açıklayın; en kötü durumun karşılaştırma sayısını çıkarın.',
      a: `<ul><li><b>En iyi:</b> tüm bölümlemeler tam ortadan. C_best(n) = 2C_best(n/2) + n → <b>Θ(n log n)</b>.</li>
<li><b>En kötü:</b> tüm ayırmalar ekstrem: bir alt dizi boş, geri kalan tüm elemanlar diğerinde (ör. sıralı dizi, pivot ilk eleman). Her adımda n+1, n, … karşılaştırma:
<pre>C_worst(n) = (n+1) + n + … + 3 = (n+1)(n+2)/2 − 3 ∈ Θ(n²)</pre></li>
<li><b>Ortalama:</b> rastgele dizide C_avg(n) ≈ 1,39 n log₂n → <b>Θ(n log n)</b>.</li></ul>`,
      keys: ['En iyi: tam ortadan bölme, Θ(n log n)', 'En kötü: bir alt dizi boş', 'Sıralı dizi örneği', '(n+1)(n+2)/2 − 3 ∈ Θ(n²)', 'Ortalama Θ(n log n)'],
      lab: { label: 'Sıralı dizide quick sort\'u izle', preset: { module: 'sorting', algo: 'quick', input: 'sorted' } }
    },
    {
      id: 'h21', set: 'Böl Fethet s. 15', lesson: 'ch8/karsilastirma', focus: 'Karşılaştırma tablosu',
      q: 'Kabarcık, seçmeli, eklemeli, birleştirmeli ve çabuk sıralamanın en iyi, ortalama ve en kötü durum karmaşıklıklarını tablo halinde verin.',
      a: `<table><thead><tr><th></th><th>En iyi</th><th>Ortalama</th><th>En kötü</th></tr></thead><tbody>
<tr><td>Kabarcık</td><td>O(n²) (bayraklı: O(n))</td><td>O(n²)</td><td>O(n²)</td></tr>
<tr><td>Seçmeli</td><td>O(n²)</td><td>O(n²)</td><td>O(n²)</td></tr>
<tr><td>Eklemeli</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td></tr>
<tr><td>Birleştirmeli</td><td>O(n log n)</td><td>O(n log n)</td><td><b>O(n log n)</b></td></tr>
<tr><td>Çabuk</td><td>O(n log n)</td><td>O(n log n)</td><td><b>O(n²)</b></td></tr></tbody></table>
<p>Dikkat: slayttaki tabloda birleştirmeli ve çabuk sıralamanın en kötü durumları yer değiştirmiş yazılmış.</p>`,
      keys: ['Seçmeli her durumda n²', 'Eklemeli en iyi n', 'Birleştirmeli en kötü n log n', 'Çabuk en kötü n²', 'Kabarcık en iyi n yalnızca bayraklı sürümde']
    },
    {
      id: 'h22', set: 'Lab Uygulaması 1', lesson: 'ch8/karsilastirma', focus: 'Lab 1',
      q: 'Lab 1: Beş sıralama algoritmasının 10\'dan 1.000.000\'a kadar rastgele dizilerdeki ortalama çalışma sürelerini ölçtünüz. Hangi sonuçları beklersiniz, O(n²) algoritmalarda büyük boyutlarda ne yapılmalıdır?',
      a: `<ul><li>n 10 katına çıktığında O(n²) algoritmaların (insertion, selection, bubble) süresi yaklaşık <b>100 kat</b>, O(n log n) olanlarınki (merge, quick) yaklaşık <b>10–13 kat</b> artar.</li>
<li>Küçük n\'de (10, 100) farklar ölçüm gürültüsü düzeyindedir; büyük n\'de büyüme derecesi belirleyicidir.</li>
<li>O(n²) algoritmalar arasında genellikle insertion &lt; selection &lt; bubble (insertion ortalamada n²/4 karşılaştırma yapar; bubble en çok yer değiştirmeyi yapar).</li>
<li>10⁶ elemanda O(n²) algoritmalar ≈10¹² işlem ister (saatler). <b>Makul bir süre sınırı</b> konur, aşan testler durdurulur ve raporda "süre sınırı aşıldı" diye belirtilir.</li>
<li>Her ölçüm en az 5 kez tekrarlanıp ortalaması ms cinsinden tabloya yazılır.</li></ul>`,
      keys: ['O(n²): 10 kat n → ≈100 kat süre', 'O(n log n): ≈10–13 kat', 'Büyük n\'de O(n²) testleri süre sınırıyla durdurulur ve raporlanır', '5 tekrar, ortalama, ms'],
      lab: { label: 'Süre ölçümünü tarayıcıda çalıştır', preset: { module: 'sorting', tab: 'bench' } }
    },
    {
      id: 'h23', set: 'Lab Uygulaması 2', lesson: 'ch6/lab2', focus: 'Kaba kuvvet tasarımı|İki yorum',
      q: 'Lab 2: 6 şehirli grafta (A–B 9, A–F 4, B–F 1, B–C 5, B–E 3, C–E 3, C–D 8, E–D 7, F–E 2) bir satıcı herhangi bir şehirden çıkıp 4 şehirlik tur yapacak; aynı şehre ve aynı yola tekrar girmeyecek. Kaba kuvvet çözümünü tasarlayın ve en kısa turu bulun.',
      a: `<p><b>Tasarım:</b> Her başlangıç şehri için, tekrar etmeyen tüm 4 şehirlik sıralamalar üretilir (6·5·4·3 = 360). Ardışık şehirler arasında kenar yoksa sıralama elenir; varsa uzunluk toplanır ve en küçüğü saklanır. Karmaşıklık: P(n, k) sıralama, her biri k adımda → O(n!/(n−k)! · k).</p>
<p><b>Sonuç:</b></p><ul><li>Başlangıca dönmeden (3 yol): 62 geçerli sıralama, en kısa <b>B → F → E → C = 1 + 2 + 3 = 6</b>.</li>
<li>Başlangıca dönerek (4 yol, devre): en kısa <b>B → F → E → C → B = 11</b>.</li></ul>`,
      keys: ['Tüm başlangıçlar ve tekrar etmeyen sıralamalar üretilir', 'Kenarı olmayan sıralamalar elenir', 'En küçük toplam saklanır', 'Yol yorumu: B-F-E-C = 6', 'Devre yorumu: 11'],
      lab: { label: 'Gezgin satıcı laboratuvarında çalıştır', preset: { module: 'tsp', mode: 'path', k: 4 } }
    },
    {
      id: 'h24', set: 'Kaba Kuvvet s. 21', lesson: 'ch6/etrafli', focus: 'Gezgin satıcı',
      q: 'Gezgin satıcı problemini tanımlayın. 4 şehirlik örnekte (a–b 2, a–c 5, a–d 7, b–c 8, b–d 3, c–d 1) etraflı aramayla en kısa turu bulun. n şehir için kaç tur incelenir?',
      a: `<p>Aralarındaki mesafeler bilinen şehirlerin her birinden <b>bir kez geçip başlangıca en kısa yoldan dönen</b> turu bulmak: en kısa <b>Hamilton devresi</b>.</p>
<table><thead><tr><th>Tur</th><th>Uzunluk</th></tr></thead><tbody>
<tr><td>a→b→c→d→a</td><td>2+8+1+7 = 18</td></tr><tr><td>a→b→d→c→a</td><td>2+3+1+5 = <b>11</b> (optimal)</td></tr><tr><td>a→c→b→d→a</td><td>5+8+3+7 = 23</td></tr><tr><td>a→c→d→b→a</td><td>5+1+3+2 = <b>11</b> (optimal, ters yön)</td></tr><tr><td>a→d→b→c→a</td><td>7+3+8+5 = 23</td></tr><tr><td>a→d→c→b→a</td><td>7+1+8+2 = 18</td></tr></tbody></table>
<p>n şehir için (n−1)! sıralama, (n−1)!/2 farklı tur → <b>Θ(n!)</b>.</p>`,
      keys: ['Hamilton devresi tanımı', '6 turun listesi', 'En kısa 11', '(n−1)!/2 tur, Θ(n!)'],
      lab: { label: 'Slayt örneğini laboratuvarda çalıştır', preset: { module: 'tsp', graph: 'slide' } }
    },
    {
      id: 'h25', set: 'Kaba Kuvvet s. 10', lesson: 'ch6/arama-string', focus: 'Mystery|Secret|Enigma',
      q: 'Mystery(n), Secret(A) ve Enigma(A) algoritmaları için: a) ne hesaplar b) temel işlem c) kaç kez yapılır d) verimlilik sınıfı e) daha iyisi önerilebilir mi?',
      a: `<table><thead><tr><th></th><th>Mystery</th><th>Secret</th><th>Enigma</th></tr></thead><tbody>
<tr><td>Ne yapar</td><td>Σ i² = 1² + … + n²</td><td>en büyük − en küçük (açıklık)</td><td>matris simetrik mi?</td></tr>
<tr><td>Temel işlem</td><td>çarpma</td><td>karşılaştırma</td><td>A[i,j] ≠ A[j,i]</td></tr>
<tr><td>Sayı</td><td>n</td><td>2(n − 1)</td><td>en kötü n(n−1)/2</td></tr>
<tr><td>Sınıf</td><td>Θ(n)</td><td>Θ(n)</td><td>Θ(n²)</td></tr>
<tr><td>İyileştirme</td><td>n(n+1)(2n+1)/6 → Θ(1)</td><td>ikili karşılaştırma ≈ 3n/2, sınıf aynı</td><td>yok: tüm üst üçgene bakmak gerekir</td></tr></tbody></table>`,
      keys: ['Mystery: kareler toplamı, çarpma, n, Θ(n), kapalı formül', 'Secret: açıklık, 2(n−1) karşılaştırma, Θ(n)', 'Enigma: simetri denetimi, n(n−1)/2, Θ(n²)']
    },
    {
      id: 'h26', set: 'Kaba Kuvvet s. 13–15', lesson: 'ch6/arama-string', focus: 'Kaba kuvvet string eşleme',
      q: 'Kaba kuvvet string eşleme algoritmasını yazın, en kötü ve ortalama durumunu açıklayın. 1000 adet 0\'dan oluşan metinde 00001, 10000 ve 01000 örüntüleri için kaç karşılaştırma yapılır?',
      a: `<pre>for i ← 0 to n − m do
    j ← 0
    while j &lt; m and P[j] = T[i + j] do j ← j + 1
    if j = m return i
return −1</pre>
<p><b>En kötü:</b> örüntü bulunamaz ve her hizalamada uyumsuzluk son karakterde çıkar: m(n − m + 1) → <b>O(nm)</b>. <b>Ortalama</b> (doğal dil): uyumsuzluk ilk birkaç karakterde yakalanır, ≈ Θ(n).</p>
<p>n = 1000, m = 5, 996 hizalama: <b>00001</b> → 5 × 996 = <b>4980</b>; <b>10000</b> → 1 × 996 = <b>996</b>; <b>01000</b> → 2 × 996 = <b>1992</b>.</p>`,
      keys: ['n − m + 1 hizalama, soldan sağa karşılaştırma', 'En kötü m(n−m+1) = O(nm)', 'Ortalama doğal dilde ≈ Θ(n)', '4980 / 996 / 1992']
    },
    {
      id: 'h27', set: 'Kaba Kuvvet s. 12', lesson: 'ch6/arama-string', focus: 'gözcülü',
      q: 'Sıralı aramanın gözcülü (sentinel) sürümü nasıl çalışır, klasik sürüme göre kazancı nedir?',
      a: '<p>Aranan K dizinin sonuna eklenir (A[n] ← K). Döngü <code>while A[i] ≠ K do i ← i + 1</code> mutlaka durur; böylece her turda yapılan <b>i &lt; n</b> kontrolüne gerek kalmaz. Sonunda i &lt; n ise bulunmuştur, değilse −1. Verimlilik sınıfı aynıdır (en kötü n + 1 karşılaştırma, Θ(n)); kazanç her turdaki ikinci karşılaştırmanın kalkmasıdır.</p>',
      keys: ['K dizinin sonuna eklenir', 'i < n kontrolü kalkar', 'Sınıf değişmez Θ(n)']
    },
    {
      id: 'h28', set: 'Kaba Kuvvet s. 16–17', lesson: 'ch6/geometri', focus: 'En yakın çift',
      q: 'Kaba kuvvet en yakın çift algoritmasını yazın ve analiz edin. Temel işlem olarak neden karekök seçilmez?',
      a: `<pre>d ← ∞
for i ← 1 to n − 1 do
  for j ← i + 1 to n do
    d ← min(d, (xᵢ − xⱼ)² + (yᵢ − yⱼ)²)
return sqrt(d)</pre>
<p>Karekök karmaşık ve pahalıdır; karekök monoton arttığı için kareleri karşılaştırmak yeterlidir. Temel işlem kare alma, çift başına 2: C(n) = Σᵢ₌₁ⁿ⁻¹ Σⱼ₌ᵢ₊₁ⁿ 2 = 2 Σ (n − i) = (n − 1)n ∈ <b>Θ(n²)</b>.</p>`,
      keys: ['Tüm çiftler i < j', 'Kareler karşılaştırılır, karekök yalnızca sonda', 'C(n) = (n−1)n', 'Θ(n²)']
    },
    {
      id: 'h29', set: 'Kaba Kuvvet s. 22–24', lesson: 'ch6/etrafli', focus: 'Sırt çantası|İşe alma',
      q: 'Sırt çantası (W = 10; w = 7, 3, 4, 5; v = 42, 12, 40, 25) ve işe alma (C = [[9,2,7,8],[6,4,3,7],[5,8,1,8],[7,6,9,4]]) problemlerini etraflı aramayla çözün. Kaç çözüm incelenir?',
      a: '<p><b>Sırt çantası:</b> 2⁴ = 16 alt küme incelenir; sığanlar içinde en değerlisi <b>{3, 4}</b>: ağırlık 9, değer <b>$65</b>. Genelde 2ⁿ alt küme → Ω(2ⁿ).</p><p><b>İşe alma:</b> her atama bir permütasyondur; 4! = 24 atama denenir. En ucuz <b>⟨2, 1, 3, 4⟩</b>: 2 + 6 + 1 + 4 = <b>13</b>. Genelde n! → Θ(n!).</p>',
      keys: ['Sırt çantası 16 alt küme', '{3,4} → $65', 'İşe alma 24 permütasyon', '⟨2,1,3,4⟩ = 13', '2ⁿ ve n! karmaşıklıkları']
    },
    {
      id: 'h30', set: 'Kaba Kuvvet s. 27–32', lesson: 'ch6/dfs', focus: 'DFS nasıl|Yığıt',
      q: 'Slayttaki grafı (a–c, a–d, a–e, c–d, c–f, b–e, b–f, e–f, g–h, g–j, h–i, i–j) alfabetik sırayla DFS ile gezin: yığıta itilme ve çekilme sıralarını, ağaç ve geri kenarları yazın.',
      a: '<p><b>İtilme:</b> a1 c2 d3 f4 b5 e6 g7 h8 i9 j10. <b>Çekilme:</b> d1 e2 b3 f4 c5 a6 j7 i8 h9 g10.</p><p><b>Ağaç kenarları:</b> a–c, c–d, c–f, f–b, b–e, g–h, h–i, i–j. <b>Geri kenarlar:</b> d–a, e–a, e–f, j–g. İki DFS ağacı oluştuğu için graf bağlantılı değildir; geri kenar olduğu için çevrimseldir.</p>',
      keys: ['Yığıt kullanılır', 'İtilme sırası a c d f b e g h i j', 'Çekilme sırası d e b f c a j i h g', 'Geri kenarlar çevrim gösterir', 'İki ağaç: bağlantılı değil'],
      focusH: 'DFS nasıl çalışır?'
    },
    {
      id: 'h31', set: 'Kaba Kuvvet s. 33–40', lesson: 'ch6/bfs', focus: 'BFS nasıl|DFS',
      q: 'Aynı grafı BFS ile gezin. BFS ile DFS\'yi veri yapısı, sıralama, kenar türleri, uygulama ve etkinlik açısından karşılaştırın.',
      a: '<p><b>Kuyruğa eklenme:</b> a1 c2 d3 e4 f5 b6 g7 h8 j9 i10. Ağaç kenarları a–c, a–d, a–e, c–f, e–b, g–h, g–j, h–i; çapraz kenarlar c–d, e–f, b–f, i–j.</p><table><thead><tr><th></th><th>DFS</th><th>BFS</th></tr></thead><tbody><tr><td>Veri yapısı</td><td>yığıt</td><td>kuyruk</td></tr><tr><td>Sıralama</td><td>iki (push, pop)</td><td>tek</td></tr><tr><td>Kenarlar</td><td>ağaç, geri</td><td>ağaç, çapraz</td></tr><tr><td>Uygulama</td><td>bağlantılılık, çevrim, ayrım noktaları</td><td>bağlantılılık, çevrim, en az kenarlı yol</td></tr><tr><td>Etkinlik</td><td colspan="2">matris Θ(|V|²), liste Θ(|V|+|E|)</td></tr></tbody></table>',
      keys: ['BFS sırası a c d e f b g h j i', 'Kuyruk / FIFO', 'Ağaç ve çapraz kenar', 'BFS en az kenarlı yolu bulur', 'Θ(|V|²) ve Θ(|V|+|E|)'],
      focusH: 'BFS nasıl çalışır?'
    },
    {
      id: 'h32', set: 'Azalt ve Fethet s. 2–5', lesson: 'ch7/azalt', focus: 'Üç tip',
      q: 'Azalt ve fethet yaklaşımını ve üç tipini açıklayın; aⁿ problemini iki farklı azaltma ile çözün.',
      a: '<p>Problemi daha küçük bir örneğine çevir, onu çöz, çözümü asıl probleme genişlet.</p><ul><li><b>Bir sabitle azalt</b> (genelde 1): eklemeli sıralama, topolojik sıralama, permütasyon/alt küme üretme.</li><li><b>Sabit bir oranla azalt</b> (genelde yarıya): ikili arama.</li><li><b>Değişken boyutla azalt</b>: Öklid, gcd(m, n) = gcd(n, m mod n).</li></ul><p>aⁿ: sabitle azaltma aⁿ = aⁿ⁻¹·a (f(0) = 1) → n − 1 çarpma, Θ(n). Yarıya azaltma: n çiftse (a^(n/2))², tekse (a^((n−1)/2))²·a → Θ(log n).</p>',
      keys: ['Küçült – çöz – genişlet', 'Üç tip ve örnekleri', 'aⁿ = aⁿ⁻¹·a, Θ(n)', 'aⁿ = (a^(n/2))², Θ(log n)']
    },
    {
      id: 'h33', set: 'Azalt ve Fethet s. 9–16', lesson: 'ch7/topolojik', focus: 'Örnek: ders sırası',
      q: 'C1 (–), C2 (–), C3 (C1, C2), C4 (C3), C5 (C3, C4) önkoşullu 5 ders için topolojik sıralamayı DFS ve kaynak silme yöntemleriyle bulun. Hangi graflarda topolojik sıralama yapılabilir?',
      a: '<p><b>DFS:</b> C1\'den başla: C1 → C3 → C4 → C5. Yığıttan çekilme sırası C5, C4, C3, C1, C2; tersi <b>C2, C1, C3, C4, C5</b>.</p><p><b>Kaynak silme:</b> gelen kenarı olmayanı sil: C1, C2, C3, C4, C5 → <b>C1, C2, C3, C4, C5</b>.</p><p>Yalnızca <b>yönlü çevrimsiz graflarda (DAG)</b>. DFS\'de geri kenar çıkarsa ya da kaynak kalmazsa graf çevrimlidir.</p>',
      keys: ['DFS çekilme sırasının tersi', 'C2 C1 C3 C4 C5', 'Kaynak silme C1 C2 C3 C4 C5', 'DAG koşulu']
    },
    {
      id: 'h34', set: 'Azalt ve Fethet s. 17–20', lesson: 'ch7/permutasyon', focus: 'Johnson',
      q: '{1, 2, 3} permütasyonlarını asgari değişiklik yöntemiyle / Johnson–Trotter ile üretin. 3 elemanlı kümenin alt kümelerini bit dizileriyle yazın.',
      a: '<p>Permütasyonlar: <b>123, 132, 312, 321, 231, 213</b>. Johnson–Trotter: en büyük hareketli eleman (okunun gösterdiği komşudan büyük) okunun yönünde yer değiştirir, ondan büyüklerin okları ters çevrilir.</p><p>Alt kümeler: 000 ∅, 001 {a₃}, 010 {a₂}, 011 {a₂, a₃}, 100 {a₁}, 101 {a₁, a₃}, 110 {a₁, a₂}, 111 {a₁, a₂, a₃}: 2³ = 8.</p>',
      keys: ['123 132 312 321 231 213', 'Hareketli eleman tanımı', 'Okların ters çevrilmesi', '8 alt küme bit dizisiyle']
    },
    {
      id: 'h35', set: 'Azalt ve Fethet s. 22–24', lesson: 'ch7/ikili-arama', focus: 'Analiz|Algoritma',
      q: '[3, 14, 27, 31, 39, 42, 55, 70, 74, 81, 85, 93, 98] dizisinde K = 70\'i ikili aramayla arayın. En kötü durum özyinelemesini kurup çözün.',
      a: '<p>l=0, r=12 → m=6, A[6]=55 &lt; 70 → l=7. m=9, A[9]=81 &gt; 70 → r=8. m=7, A[7]=70 → bulundu (3 karşılaştırma).</p><p>En kötü durum (K yok): C_worst(n) = C_worst(⌊n/2⌋) + 1, C_worst(1) = 1. n = 2ᵏ: C(2ᵏ) = C(2ᵏ⁻¹) + 1 = … = C(1) + k = k + 1 → <b>⌊log₂n⌋ + 1 ∈ Θ(log n)</b>.</p>',
      keys: ['m = ⌊(l+r)/2⌋ adımları', '55, 81, 70 ile karşılaştırma', 'C_worst(n) = C_worst(⌊n/2⌋) + 1', '⌊log₂n⌋ + 1']
    },
    {
      id: 'h36', set: 'Azalt ve Fethet s. 25', lesson: 'ch7/lab-af', focus: 'Sahte para|Rus köylüsü',
      q: 'Lab: Sahte para problemini (n paradan biri hafif) azalt-fethet ile çözün ve tartım sayısını bulun. 50 · 65\'i Rus köylüsü yöntemiyle hesaplayın.',
      a: '<p><b>Sahte para:</b> paraları iki eşit gruba ayır (tekse biri dışarıda), tart; hafif grupla devam et, eşitse dışarıdaki sahtedir. W(n) = W(⌊n/2⌋) + 1, W(1) = 0 → <b>⌊log₂n⌋</b> tartım. (Ek: üçe bölmek ≈ log₃n.)</p><p><b>Rus köylüsü:</b> n·m = (n/2)·2m (n çift), ((n−1)/2)·2m + m (n tek).</p><pre>n    m\n50   65\n25   130   +130\n12   260\n6    520\n3    1040  +1040\n1    2080  +2080\n          = 3250</pre>',
      keys: ['İkiye bölüp tartma', 'W(n) = W(n/2) + 1 → log₂n', 'n tek satırlarda m toplanır', '50·65 = 3250']
    },
    {
      id: 'h37', set: 'Kaba Kuvvet s. 25', lesson: 'ch6/postane', focus: 'Kaba kuvvet çözümü',
      q: 'Lab: Düz bir yol üzerindeki n köyden (x₁ < … < xₙ) birine postane kurulacak. Optimum köyü bulan kaba kuvvet algoritmasını yazın. Postaneyi belirtilen bir köye en uzak kurmak için algoritma nedir?',
      a: '<pre>best ← ∞\nfor i ← 1 to n:\n    cost ← Σⱼ |xᵢ − xⱼ|      (ya da max |xᵢ − xⱼ|)\n    if cost &lt; best: best ← cost; k ← i\nreturn k</pre><p>n aday × n uzaklık → <b>Θ(n²)</b>. Toplam uzaklık ölçütünde cevap ortanca köydür. 2. kısım: belirtilen köy xₖ\'ye uzaklıkları hesapla, en büyüğünü seç → Θ(n); cevap x₁ ya da xₙ.</p>',
      keys: ['Her köy aday olarak denenir', 'Toplam ya da en büyük uzaklık', 'Θ(n²)', '2. kısım Θ(n), uç köyler']
    }
  ];
})(window.OSLab = window.OSLab || {});
