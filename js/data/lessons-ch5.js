/*
 * lessons-ch5.js — 5. hafta: Algoritma asimptotik yaklaşımlar.
 * Kaynaklar: H1-H2 s. 59–82, Algoritma Performansı s. 7–15.
 */
(function (OSLab) {
  'use strict';

  OSLab.lessons = OSLab.lessons || { chapters: [] };

  OSLab.lessons.chapters.push({
    id: 'ch5',
    num: 5,
    title: 'Asimptotik Yaklaşımlar',
    en: 'Asymptotic notations',
    source: 'H1-H2 s. 59–82, Algoritma Performansı s. 7–15',
    objectives: [
      'O, Ω ve Θ notasyonlarını tanım (c, n₀) üzerinden yazmak',
      'Bir fonksiyonun O, Ω veya Θ sınıfında olduğunu c ve n₀ bularak ispatlamak',
      'Asimptotik özellikleri ve sadeleştirme kurallarını uygulamak',
      'Temel verimlilik sınıflarını hızlıdan yavaşa sıralamak',
      'İki fonksiyonun büyüme derecesini limit yöntemiyle (L\'Hôpital, Stirling) karşılaştırmak'
    ],
    lessons: [
      {
        id: 'notasyonlar',
        title: 'O, Ω ve Θ Notasyonları',
        en: 'Big-Oh, Big-Omega, Big-Theta',
        src: 'H1-H2 s. 60–69',
        minutes: 12,
        lab: { preset: { module: 'growth', tab: 'bound' } },
        blocks: [
          { t: 'h', text: 'Üç notasyon' },
          { t: 'p', html: 'Verimlilik değerlendirmesinde büyüme derecesi, temel işlemin gerçekleşme sayısıyla ilgilidir. Büyüme derecesini karşılaştırmak için üç notasyon kullanılır. Hepsinde fikir aynı: <b>sabit katsayılar</b> ve <b>küçük n değerleri</b> önemsizdir, n → ∞ iken davranışa bakılır.' },
          { t: 'table', head: ['Notasyon', 'Kümenin içeriği', 'Sezgi'], rows: [
            ['<b>O(g(n))</b> Big Oh', 'g(n) ile <b>aynı veya daha düşük</b> büyüme derecesindeki fonksiyonların tümü', 't(n) ≤ g(n) gibi: <b>üst sınır</b>'],
            ['<b>Ω(g(n))</b> Big Omega', 'g(n) ile <b>aynı veya daha büyük</b> büyüme derecesindeki fonksiyonların tümü', 't(n) ≥ g(n) gibi: <b>alt sınır</b>'],
            ['<b>Θ(g(n))</b> Big Theta', 'g(n) ile <b>aynı</b> büyüme derecesindeki fonksiyonların tümü', 't(n) = g(n) gibi: <b>sıkı sınır</b>']
          ] },
          { t: 'dg', id: 'bounds' },
          { t: 'h', text: 'Big Oh: tanım ve ispat' },
          { t: 'def', term: 't(n) ∈ O(g(n))', html: 'Pozitif bir <b>c</b> sabiti ve negatif olmayan bir <b>n₀</b> tamsayısı vardır ki <b>her n ≥ n₀ için t(n) ≤ c·g(n)</b>. Yani t(n), büyük n değerleri için <b>üstten</b> sabit çarpanlı g(n) ile sınırlanır.' },
          { t: 'p', html: 'Örnekler: n ∈ O(n²), 100n + 5 ∈ O(n²), ½n(n−1) ∈ O(n²). Ama n³ ∉ O(n²), 0,00001n³ ∉ O(n²), n⁴ + n + 1 ∉ O(n²).' },
          { t: 'code', text: 'İspat: 100n + 5 ∈ O(n²)\n  100n + 5 ≤ 100n + n   (n ≥ 5 için 5 ≤ n)\n           = 101n\n           ≤ 101n²     (n ≥ 1 için)\n  → c = 101, n₀ = 5 alınabilir.' },
          { t: 'note', kind: 'info', html: 'c ve n₀ <b>tek değildir</b>. Aynı ispat c = 105, n₀ = 1 ile de yapılabilir: 100n + 5 ≤ 100n² + 5n² = 105n². Sınavda geçerli <b>bir</b> çift bulmak yeterlidir.' },
          { t: 'h', text: 'Big Omega: tanım ve ispat' },
          { t: 'def', term: 't(n) ∈ Ω(g(n))', html: 'Pozitif c ve negatif olmayan n₀ vardır ki <b>her n ≥ n₀ için t(n) ≥ c·g(n)</b>. Yani t(n) <b>alttan</b> sabit çarpanlı g(n) ile sınırlanır.' },
          { t: 'p', html: 'Örnekler: n³ ∈ Ω(n²), ½n(n−1) ∈ Ω(n²), ama 100n + 5 ∉ Ω(n²).' },
          { t: 'code', text: 'İspat: n³ ∈ Ω(n²)\n  n³ ≥ n²   (her n ≥ 0 için)\n  → c = 1, n₀ = 0 alınabilir.' },
          { t: 'h', text: 'Big Theta: tanım ve ispat' },
          { t: 'def', term: 't(n) ∈ Θ(g(n))', html: 'Pozitif c₁, c₂ ve negatif olmayan n₀ vardır ki <b>her n ≥ n₀ için c₂·g(n) ≤ t(n) ≤ c₁·g(n)</b>. t(n) hem alttan hem üstten sınırlanır. Örnek: a &gt; 0 ise an² + bn + c ∈ Θ(n²).' },
          { t: 'code', text: 'İspat: ½n(n − 1) ∈ Θ(n²)\n Üst: ½n(n−1) = ½n² − ½n ≤ ½n²            (n ≥ 0)\n Alt: ½n² − ½n ≥ ½n² − ½n·½n = ¼n²         (n ≥ 2)\n → c₂ = ¼, c₁ = ½, n₀ = 2' },
          { t: 'note', kind: 'exam', html: 'Θ = O ∩ Ω. Θ ispatında <b>iki eşitsizlik</b> yazılır ve ikisi için ortak bir n₀ (büyük olanı) seçilir.' }
        ],
        checks: [
          { q: 't(n) ∈ O(g(n)) tanımını yazın.', a: 'Pozitif bir c sabiti ve negatif olmayan bir n₀ tamsayısı vardır ki her n ≥ n₀ için t(n) ≤ c·g(n).' },
          { q: '100n + 5 ∈ O(n²) olduğunu ispatlayın.', a: 'n ≥ 5 için 100n + 5 ≤ 100n + n = 101n ≤ 101n². c = 101, n₀ = 5.' },
          { q: 'n³ ∈ Ω(n²) ispatı için c ve n₀ ne alınabilir?', a: 'n ≥ 0 için n³ ≥ n²; c = 1, n₀ = 0.' },
          { q: '½n(n−1) ∈ Θ(n²) ispatındaki sabitler nelerdir?', a: 'n ≥ 2 için ¼n² ≤ ½n(n−1) ≤ ½n²; c₂ = ¼, c₁ = ½, n₀ = 2.' },
          { q: '100n + 5 ∈ Ω(n²) doğru mudur?', a: 'Hayır. n büyüdükçe 100n + 5 / n² → 0 olur; hiçbir pozitif c için tüm büyük n\'lerde 100n + 5 ≥ c·n² sağlanamaz.' }
        ]
      },
      {
        id: 'siniflar',
        title: 'Özellikler, Sadeleştirme ve Verimlilik Sınıfları',
        en: 'Properties and efficiency classes',
        src: 'H1-H2 s. 70, 77; Performans s. 7–15',
        minutes: 10,
        lab: { preset: { module: 'growth', tab: 'table' } },
        blocks: [
          { t: 'h', text: 'Asimptotik özellikler' },
          { t: 'list', items: [
            'f(n) ∈ O(f(n))',
            'f(n) ∈ O(g(n)) ⟺ g(n) ∈ Ω(f(n))',
            'f(n) ∈ O(g(n)) ve g(n) ∈ O(h(n)) ise f(n) ∈ O(h(n))  (geçişlilik)',
            'f₁(n) ∈ O(g₁(n)) ve f₂(n) ∈ O(g₂(n)) ise <b>f₁(n) + f₂(n) ∈ O(max{g₁(n), g₂(n)})</b>'
          ] },
          { t: 'note', kind: 'exam', html: 'Son özelliğin anlamı: algoritma <b>ardışık iki parçadan</b> oluşuyorsa genel verimliliği <b>daha yavaş olan parça</b> belirler. Ör. önce sırala (n log n), sonra tara (n) → O(n log n).' },
          { t: 'h', text: 'Sadeleştirme kuralları' },
          { t: 'p', html: 'Mümkünse tek terime indir: <b>en hızlı büyüyen terim</b> toplam süreyi belirler, <b>sabit katsayılar atılır</b>.' },
          { t: 'table', head: ['İfade', 'Sonuç', 'Not'], rows: [
            ['O(aNᵏ + bNᵏ⁻¹ + … + yN + z)', 'O(Nᵏ)', 'En büyük dereceli terim kalır'],
            ['O(N) + O(N)', '= 2·O(N) ≈ O(N)', 'Sabit atılır'],
            ['O(N) + O(M)', '≈ O(N)', 'N &gt; M ise'],
            ['O(N) · O(N)', '= O(N²)', 'İç içe döngü'],
            ['O(N) + O(log N)', '≈ O(N)', 'O(N) &gt; O(log N)'],
            ['O(N) · O(log N)', '≈ O(N log N)', '']
          ] },
          { t: 'h', text: 'T(N) → O(f(N)) örnekleri' },
          { t: 'table', head: ['Çalışma süresi T(N)', 'Asimptotik karmaşıklık'], rows: [
            ['4N log N', 'O(N log N)'],
            ['7N² log N + 5N² + N', 'O(N² log N)'],
            ['10N³ + N² + 40N + 800', 'O(N³)'],
            ['2ᴺ + 1000N', 'O(2ᴺ)']
          ] },
          { t: 'h', text: 'Temel verimlilik sınıfları' },
          { t: 'dg', id: 'classes' },
          { t: 'h', text: 'Saniyeye çevirince' },
          { t: 'p', html: 'Bir işlem 10 ns sürseydi (Performans s. 14):' },
          { t: 'table', head: ['N', 'O(1)', 'O(log N)', 'O(N)', 'O(N²)'], rows: [
            ['1000', '10 ns', '100 ns', '10 µs', '10 ms'],
            ['1 milyon', '10 ns', '200 ns', '10 ms', '3 saat'],
            ['1 milyar', '10 ns', '300 ns', '10 sn', '300 yıl']
          ] },
          { t: 'h', text: 'Veri yapısı işlemleri' },
          { t: 'table', head: ['Yapı', 'Ekleme', 'Silme', 'Arama'], rows: [
            ['Sırasız dizi', 'O(1)', 'O(n)', 'O(n)'],
            ['Sıralı dizi', 'O(log₂n + n)', 'O(log₂n + n)', 'O(log₂n)'],
            ['Bağlantılı liste', 'O(n)', 'O(n)', 'O(n)'],
            ['İkili arama ağacı', 'O(log₂n)', 'O(log₂n)', 'O(log₂n)']
          ] },
          { t: 'note', kind: 'info', html: 'Sıralı dizide ekleme/silmede log₂n yerini <b>ikili aramayla</b> bulmanın, n ise elemanları <b>kaydırmanın</b> maliyetidir. Bu tablodaki ikili arama ağacı değerleri <b>dengeli</b> ağaç içindir; dengesiz ağaçta en kötü durum O(n)\'dir.' }
        ],
        checks: [
          { q: '7N² log N + 5N² + N ifadesinin asimptotik karmaşıklığı nedir?', a: 'O(N² log N): en hızlı büyüyen terim 7N² log N, sabit katsayı atılır.' },
          { q: 'Bir algoritma önce O(n²) sonra O(n) çalışan iki parçadan oluşuyorsa toplam karmaşıklık nedir? Hangi özellik?', a: 'O(max{n², n}) = O(n²). f₁ + f₂ ∈ O(max{g₁, g₂}) özelliği.' },
          { q: 'Verimlilik sınıflarını hızlıdan yavaşa sıralayın.', a: '1 < log n < n < n log n < n² < n³ < 2ⁿ < n!' }
        ]
      },
      {
        id: 'limit',
        title: 'Limit Yöntemiyle Karşılaştırma',
        en: 'Using limits for comparing orders of growth',
        src: 'H1-H2 s. 71–82',
        minutes: 14,
        lab: { preset: { module: 'growth', tab: 'limit' } },
        blocks: [
          { t: 'h', text: 'Neden limit?' },
          { t: 'p', html: 'O, Ω ve Θ tanımları birbirinden bağımsız olduğundan iki fonksiyonu karşılaştırmak için pek kullanılmaz (c ve n₀ aramak gerekir). Bunun yerine iki fonksiyonun <b>oranının n → ∞ iken limiti</b> alınır:' },
          { t: 'table', head: ['lim t(n)/g(n)', 'Anlamı', 'Sonuç'], rows: [
            ['<b>0</b>', 't(n)\'nin büyüme derecesi &lt; g(n)\'ninki', 't(n) ∈ O(g(n))'],
            ['<b>c &gt; 0</b> (sabit)', 'Büyüme dereceleri eşit', 't(n) ∈ Θ(g(n)) (dolayısıyla O ve Ω da)'],
            ['<b>∞</b>', 't(n)\'nin büyüme derecesi &gt; g(n)\'ninki', 't(n) ∈ Ω(g(n))']
          ] },
          { t: 'note', kind: 'exam', html: 'İlk iki durum → <b>O</b>; ikinci durum → <b>Θ</b>; son iki durum → <b>Ω</b>.' },
          { t: 'h', text: 'İki araç' },
          { t: 'def', term: 'L\'Hôpital kuralı', html: 'lim f(n) = lim g(n) = ∞ ve türevler varsa: <b>lim f(n)/g(n) = lim f′(n)/g′(n)</b>.' },
          { t: 'def', term: 'Stirling formülü', html: 'Büyük n için <b>n! ≈ √(2πn) · (n/e)ⁿ</b>. Faktöriyelli limitlerde kullanılır.' },
          { t: 'h', text: 'Çözümlü örnekler (slayt 74–76)' },
          { t: 'dg', id: 'limits' },
          { t: 'h', text: 'Alıştırma çözümleri (slayt 59, 78–82)' },
          { t: 'solve', title: 'Slayt 78', q: 'n(n+1)/2 için doğru mu? a) ∈ O(n³) b) ∈ O(n²) c) ∈ Θ(n³) d) ∈ Ω(n)', a: 'n(n+1)/2 ≈ ½n², yani Θ(n²). a) <b>Doğru</b> (n² ≤ n³). b) <b>Doğru</b>. c) <b>Yanlış</b> (lim ½n²/n³ = 0, daha yavaş büyür). d) <b>Doğru</b> (n² ≥ n).' },
          { t: 'solve', title: 'Slayt 79–80', q: 'Θ sınıflarını bulun: a) (n²+1)¹⁰  b) √(10n² + 7n + 3)  c) 2n lg(n+2)² + (n+2)² lg(n/2)  d) 2ⁿ⁺¹ + 3ⁿ⁻¹', a: 'a) lim (n²+1)¹⁰ / n²⁰ = lim (1 + 1/n²)¹⁰ = 1 → <b>Θ(n²⁰)</b>.<br>b) lim √(10n²+7n+3)/n = lim √(10 + 7/n + 3/n²) = √10 → <b>Θ(n)</b>.<br>c) 2n·2lg(n+2) ∈ Θ(n lg n), (n+2)²(lg n − 1) ∈ Θ(n² lg n); toplam → <b>Θ(n² lg n)</b>.<br>d) 2·2ⁿ + ⅓·3ⁿ ∈ Θ(2ⁿ) + Θ(3ⁿ) → <b>Θ(3ⁿ)</b>.' },
          { t: 'solve', title: 'Slayt 59', q: 'Büyüme derecesini karşılaştırın: a) n(n+1) ve 2000n²  b) 100n² ve 0,01n³  c) log₂n ve ln n  d) log₂²n ve log₂n²  e) 2ⁿ⁻¹ ve 2ⁿ  f) (n−1)! ve n!', a: 'a) Limit = 1/2000 → <b>eşit</b>. b) Limit 0 → 100n² <b>daha küçük</b>. c) log₂n = ln n / ln 2 → <b>eşit</b>. d) log₂n² = 2log₂n; log₂²n / 2log₂n → ∞ → log₂²n <b>daha büyük</b>. e) 2ⁿ⁻¹ = ½·2ⁿ → <b>eşit</b>. f) (n−1)!/n! = 1/n → 0 → (n−1)! <b>daha küçük</b>.' },
          { t: 'solve', title: 'Slayt 82', q: 'Büyüme derecesine göre sıralayın: (n−2)!, 5lg(n+100)¹⁰, 2²ⁿ, 0,001n⁴ + 3n³ + 1, ln²n, ∛n, 3ⁿ', a: '5lg(n+100)¹⁰ = 50 lg(n+100) ∈ Θ(log n) &lt; ln²n &lt; ∛n &lt; 0,001n⁴ + 3n³ + 1 ∈ Θ(n⁴) &lt; 3ⁿ &lt; 2²ⁿ = 4ⁿ &lt; (n−2)!' }
        ],
        checks: [
          { q: 'lim t(n)/g(n) = c > 0 ise ne söylenir?', a: 'Büyüme dereceleri eşittir: t(n) ∈ Θ(g(n)).' },
          { q: 'log₂n ve √n\'nin büyüme derecesini karşılaştırın.', a: 'L\'Hôpital: lim log₂n/√n = lim (log₂e / n) / (1/(2√n)) = 2log₂e · lim 1/√n = 0. log₂n daha yavaş büyür.' },
          { q: 'n! ve 2ⁿ\'i karşılaştırın.', a: 'Stirling: n!/2ⁿ ≈ √(2πn)·(n/2e)ⁿ → ∞. n! daha hızlı büyür: n! ∈ Ω(2ⁿ).' },
          { q: '½n(n−1) ve n²\'yi limitle karşılaştırın.', a: 'lim ½n(n−1)/n² = ½ lim (1 − 1/n) = ½ → sabit; eşit büyüme derecesi, ½n(n−1) ∈ Θ(n²).' }
        ]
      }
    ]
  });
})(window.OSLab = window.OSLab || {});
