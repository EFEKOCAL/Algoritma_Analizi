/*
 * chapter-outlines.js — Bölümlerin giriş sayfası: haftanın konu listesi (slayt sırasıyla) ve
 * öğrenilecek temel kavramlar. Her konu, onu anlatan derslere bağlanır.
 */
(function (OSLab) {
  'use strict';

  OSLab.chapterOutlines = {
    ch1: {
      slide: 'H1-H2 1–20',
      topics: [
        ['Algoritma nedir, hedefi, özellikleri', ['algoritma']],
        ['Algoritmanın tarihçesi: El Harezmi, Euclid', ['algoritma']],
        ['EBOB: Euclid algoritması ve sonlanması', ['ebob']],
        ['EBOB: ardışık tamsayı kontrolü, asal çarpanlar', ['ebob']],
        ['Eratosthenes\'in eleme algoritması', ['eratosthenes']],
        ['Algoritma tasarım ve analiz süreci', ['surec']]
      ],
      concepts: ['algoritma', 'sonluluk', 'doğruluk', 'EBOB / gcd', 'Euclid algoritması', 'gcd(m,n) = gcd(n, m mod n)', 'ardışık tamsayı kontrolü', 'asal çarpanlar', 'Eratosthenes eleği', 'RAM modeli', 'kesin / yaklaşık algoritma', 'tasarım tekniği', 'sözde kod']
    },
    ch2: {
      slide: 'H1-H2 21–34',
      topics: [
        ['Önemli problem türleri', ['turler']],
        ['Sıralama: anahtar, kararlılık, yerinde', ['siralama-arama']],
        ['Arama ve ikili arama örneği', ['siralama-arama']],
        ['String işleme, graf, kombinasyonel', ['diger']],
        ['Geometrik ve nümerik problemler', ['diger']],
        ['En yakın çift ve metin arama örnekleri', ['en-yakin-cift', 'diger']]
      ],
      concepts: ['sıralama anahtarı', 'kararlı (stable)', 'yerinde (in-place)', 'sıralı arama', 'ikili arama', 'string', 'graf', 'en kısa yol', 'topolojik sıralama', 'kombinasyonel patlama', 'en yakın çift', 'dışbükey gövde', 'Öklid mesafesi']
    },
    ch3: {
      slide: 'H1-H2 35–59 · Performans · Özyinelemeli',
      topics: [
        ['Analiz çerçevesi, girdi büyüklüğü', ['cerceve']],
        ['Ölçü birimi: temel işlem, T(n) ≈ c_op·C(n)', ['cerceve']],
        ['Büyüme derecesi tablosu', ['cerceve']],
        ['T(N) hesaplama, döngü örnekleri 1–10', ['tn']],
        ['Özyinelemeli olmayan algoritmaların analizi', ['ozyineli-olmayan']],
        ['Özyinelemeli algoritmaların analizi', ['ozyineli']],
        ['Hanoi kuleleri', ['hanoi']]
      ],
      concepts: ['girdi büyüklüğü n', 'temel işlem', 'C(n)', 'c_op', 'T(n)', 'büyüme derecesi', 'iç içe döngü', 'logaritmik döngü', 'toplam formülleri', 'özyineleme ilişkisi', 'başlangıç koşulu', 'geriye doğru yerine koyma', 'Hanoi: 2ⁿ − 1']
    },
    ch4: {
      slide: 'H1-H2 43–48',
      topics: [
        ['En kötü, en iyi, ortalama durum tanımları', ['tanimlar']],
        ['Sıralı arama: C_worst ve C_best', ['tanimlar']],
        ['Ortalama durum türetmesi', ['ortalama']],
        ['İndis listesi veren arama alıştırması', ['ortalama']]
      ],
      concepts: ['en kötü durum', 'en iyi durum', 'ortalama durum', 'üst sınır', 'olasılık p', 'C_avg = p(n+1)/2 + n(1−p)', 'sıralı arama']
    },
    ch5: {
      slide: 'H1-H2 60–82 · Performans 7–15',
      topics: [
        ['O, Ω, Θ tanımları ve ispatlar', ['notasyonlar']],
        ['Asimptotik özellikler, sadeleştirme kuralları', ['siniflar']],
        ['Verimlilik sınıfları, çalışma süresi örnekleri', ['siniflar']],
        ['Limit yöntemi, L\'Hôpital, Stirling', ['limit']],
        ['Alıştırmalar', ['limit']]
      ],
      concepts: ['Big Oh O', 'Big Omega Ω', 'Big Theta Θ', 'c ve n₀', 'üst / alt / sıkı sınır', 'O(max{g₁, g₂})', 'sabit, log, doğrusal, n log n, kare, küp, üstel, faktöriyel', 'limit yöntemi', 'L\'Hôpital', 'Stirling']
    },
    ch6: {
      slide: 'Kaba Kuvvet · Azalt-Fethet · Böl-Fethet · Lab 1',
      topics: [
        ['Seçmeli sıralama (kaba kuvvet)', ['selection']],
        ['Kabarcık sıralama (kaba kuvvet)', ['bubble']],
        ['Eklemeli sıralama (azalt-fethet)', ['insertion']],
        ['Böl-fethet ve Master teoremi', ['bol-fethet']],
        ['Birleştirmeli sıralama', ['merge']],
        ['Çabuk sıralama', ['quick']],
        ['Karşılaştırma ve Lab 1', ['karsilastirma']]
      ],
      concepts: ['kaba kuvvet', 'azalt-fethet', 'böl-fethet', 'T(n) = aT(n/b) + f(n)', 'Master teoremi', 'pivot (mihenk)', 'Hoare bölümlemesi', 'birleştirme (merge)', 'kararlılık', 'yerinde', 'n(n−1)/2', 'n log₂n']
    },
    ch7: {
      slide: 'Kaba Kuvvet 20–21 · Lab 2',
      topics: [
        ['Etraflı arama', ['etrafli']],
        ['Gezgin satıcı problemi, tur sayısı', ['etrafli']],
        ['Lab 2: 6 şehirde 4 şehirlik tur', ['lab2']]
      ],
      concepts: ['etraflı arama', 'gezgin satıcı (TSP)', 'Hamilton devresi', '(n−1)!/2', 'permütasyon', 'Θ(n!)']
    }
  };
})(window.OSLab = window.OSLab || {});
