/*
 * info-content.js — "Bilgi & Sınav Paneli" içeriği (modül başına teori + sınav soruları).
 * preset: soruyu laboratuvarda açmak için { module, ... }
 */
(function (OSLab) {
  'use strict';

  OSLab.info = {
    learn: {
      theory: [
        { id: 'how', title: 'Bu site nasıl kullanılır?', html: '<p>Önce <b>Ders</b> bölümünü hafta sırasıyla oku: her ders tek ekranlık kartlardan oluşur, sonunda "Kendini yokla" soruları vardır. Ardından ilgili <b>laboratuvarda</b> kavramı canlı dene. Sınava yakın <b>Hızlı Tekrar</b> ve <b>Hocanın Soruları</b> ile tekrar et.</p><p>Kapsam: haftalık plandaki 1–7. hafta konuları ve lab uygulamalarında istenen beş sıralama algoritması ile kaba kuvvet gezgin satıcı.</p>' },
        { id: 'formulas', title: 'Formül kartı', kind: 'algo', html: `<div class="formula">Σ i (1..n)      = n(n+1)/2
Σ i² (1..n)     = n(n+1)(2n+1)/6
Σ 2ⁱ (0..n)     = 2ⁿ⁺¹ − 1
Sıralı arama    C_avg = p(n+1)/2 + n(1−p)
Hanoi           M(n) = 2ⁿ − 1
Master          T(n) = aT(n/b) + Θ(nᵈ)
  a &lt; bᵈ → Θ(nᵈ)   a = bᵈ → Θ(nᵈ log n)   a &gt; bᵈ → Θ(n^log_b a)
Selection/Bubble C = n(n−1)/2
Insertion       best n−1, worst n(n−1)/2, avg ≈ n²/4
Merge           C_worst = n log₂n − n + 1
Quick           best n log₂n, worst (n+1)(n+2)/2 − 3
TSP             (n−1)!/2 farklı tur</div>` }
      ],
      exam: []
    },
    sorting: {
      theory: [
        { id: 'model', title: 'Laboratuvar modeli', html: '<p>Adım adım izleme, slaytlardaki sözde kodu <b>birebir</b> uygular: her karşılaştırma ve yer değiştirme bir adımdır. Sayaçlar temel işlemi (karşılaştırma) ve yer değiştirme/yazma sayısını gösterir.</p><p>Quick sort, slayttaki <b>HoarePartition</b> ile çalışır: pivot alt dizinin ilk elemanıdır.</p><p class="note"><b>Süre ölçümü</b> sekmesi Lab 1 ödevini tarayıcıda yapar: her boyut için 5 tekrar, ortalama ms. O(n²) algoritmalar için tahmini süre sınırı aşarsa test çalıştırılmaz ve tabloda belirtilir.</p>' },
        { id: 'cases', title: 'Hangi girdi hangi durumu üretir?', kind: 'algo', html: '<ul><li><b>Sıralı dizi:</b> insertion en iyi (n−1), quick en kötü (pivot hep en küçük).</li><li><b>Ters sıralı dizi:</b> insertion ve bubble en kötü (her karşılaştırma yer değiştirir), quick yine en kötü.</li><li><b>Rastgele:</b> ortalama durum.</li><li><b>Selection</b> ve <b>merge</b> girdiden neredeyse etkilenmez.</li></ul>' }
      ],
      exam: [
        { topic: 'Insertion', q: '45, 89, 68, 90, 29, 34 (i=2 öncesi) dizisinde insertion sort i = 2 adımında kaç karşılaştırma yapar?', a: 'v = 68. A[1] = 89 > 68 → kaydır (1). A[0] = 45 > 68? Hayır (2). Toplam 2 karşılaştırma; dizi 45 68 89 90 29 34 olur.', preset: { module: 'sorting', algo: 'insertion', input: 'slide' } },
        { topic: 'Quick', q: 'Sıralı 10 elemanlı dizide (pivot ilk eleman) quick sort kaç karşılaştırma yapar?', a: 'En kötü durum: her bölümleme uçta kalır. Laboratuvarda "Sıralı" girdiyle çalıştırıp sayacı gözle; Θ(n²) davranışı görülür.', preset: { module: 'sorting', algo: 'quick', input: 'sorted' } },
        { topic: 'Selection', q: 'Selection sort\'ta karşılaştırma sayısı girdinin sıralı ya da ters sıralı olmasıyla değişir mi?', a: 'Hayır. Her zaman n(n−1)/2. Sıralı ve ters sıralı girdilerle çalıştırıp karşılaştır.', preset: { module: 'sorting', algo: 'selection', input: 'reversed' } }
      ]
    },
    growth: {
      theory: [
        { id: 'loops', title: 'Döngü sayma kuralları', html: '<ul><li>Tek döngü 1..N: <b>N</b></li><li>Sayaç ×2: <b>⌊log₂N⌋ + 1</b></li><li>İç içe: sayılar <b>çarpılır</b></li><li>İç sınır dış değişkene bağlı (j ≤ i): <b>N(N+1)/2</b></li><li>Ard arda: sayılar <b>toplanır</b>, büyük olan kalır</li></ul>' },
        { id: 'limit', title: 'Limit yöntemi', kind: 'algo', html: '<p>lim t(n)/g(n): <b>0</b> → t küçük (O), <b>c &gt; 0</b> → eşit (Θ), <b>∞</b> → t büyük (Ω). Laboratuvardaki limit aracı oranı n büyüdükçe sayısal olarak hesaplar; bu bir ispat değil, sezgi içindir.</p>' }
      ],
      exam: [
        { topic: 'Döngü', q: 'for (i=1; i<=N; i++) for (j=1; j<=M; j*=2) myfunc(); karmaşıklığı nedir?', a: 'N·(⌊log₂M⌋+1) → O(N log M).', preset: { module: 'growth', tab: 'loops' } },
        { topic: 'Limit', q: 'log₂n ve √n hangisi daha hızlı büyür?', a: '√n. lim log₂n/√n = 0 (L\'Hôpital).', preset: { module: 'growth', tab: 'limit' } }
      ]
    },
    tsp: {
      theory: [
        { id: 'how', title: 'Kaba kuvvet nasıl çalışıyor?', html: '<p>Seçilen kipteki tüm sıralamalar üretilir: <b>yol</b> (k şehir, dönüş yok), <b>tur</b> (k şehir, başlangıca dönüş) ya da <b>tüm şehirler</b> (Hamilton devresi). Ardışık iki şehir arasında kenar yoksa sıralama geçersizdir. Geçerli olanların uzunluğu hesaplanır, en kısa tutulur.</p><p>Sıralı seçim sayısı P(n, k) = n!/(n−k)!. 6 şehir, k = 4 → 360.</p>' }
      ],
      exam: [
        { topic: 'Lab 2', q: 'Lab 2 grafında 4 şehirlik en kısa yol (dönüşsüz) nedir?', a: 'B → F → E → C = 1 + 2 + 3 = 6.', preset: { module: 'tsp', mode: 'path', k: 4 } },
        { topic: 'Lab 2', q: 'Aynı grafta 4 şehirlik en kısa devre (başlangıca dönerek) nedir?', a: 'B → F → E → C → B = 11.', preset: { module: 'tsp', mode: 'cycle', k: 4 } },
        { topic: 'Slayt', q: 'Slayttaki 4 şehirlik TSP örneğinde en kısa tur?', a: 'a→b→d→c→a = 11.', preset: { module: 'tsp', graph: 'slide' } }
      ]
    }
  };
})(window.OSLab = window.OSLab || {});
