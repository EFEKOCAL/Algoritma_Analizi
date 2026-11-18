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
      slide: 'Kaba Kuvvet 1–40 · Lab 2',
      topics: [
        ['Kaba kuvvet, seçimli sıralama', ['selection']],
        ['Kabarcık sıralama, Mystery/Secret/Enigma', ['bubble', 'arama-string']],
        ['Sıralı arama, kaba kuvvet string eşleme', ['arama-string']],
        ['En yakın çift, konveks gövde', ['geometri']],
        ['Etraflı arama: gezgin satıcı, sırt çantası, işe alma', ['etrafli']],
        ['DFS: önce derinlik arama', ['dfs']],
        ['BFS: önce genişlik arama, DFS ile karşılaştırma', ['bfs']],
        ['Lab: postane, 6 şehirde satış turu', ['postane', 'lab2']]
      ],
      concepts: ['kaba kuvvet', 'n(n−1)/2', 'gözcü (sentinel)', 'string eşleme O(nm)', 'Öklid mesafesi', 'konveks gövde', 'etraflı arama', 'Hamilton devresi', '(n−1)!/2', '2ⁿ alt küme', 'n! atama', 'DFS / yığıt', 'BFS / kuyruk', 'ağaç, geri, çapraz kenar', 'Θ(|V|²), Θ(|V|+|E|)']
    },
    ch7: {
      slide: 'Azalt ve Fethet 1–25',
      topics: [
        ['Azalt-fethet ve üç tipi, aⁿ, Öklid', ['azalt']],
        ['Eklemeli sıralama', ['insertion']],
        ['Topolojik sıralama: DFS ve kaynak silme', ['topolojik']],
        ['Permütasyon (Johnson–Trotter) ve alt küme üretme', ['permutasyon']],
        ['İkili arama', ['ikili-arama']],
        ['Lab: sahte para, Rus köylüsü çarpımı', ['lab-af']]
      ],
      concepts: ['bir sabitle azalt', 'sabit oranla azalt', 'değişken boyutla azalt', 'eklemeli sıralama', 'yönlü graf (digraph)', 'DAG', 'kaynak silme', 'hareketli eleman', 'bit dizisi', 'ikili arama', '⌊log₂n⌋ + 1', 'sahte para', 'Rus köylüsü']
    },
    ch8: {
      slide: 'Böl Fethet 1–28 · Lab 1',
      topics: [
        ['Böl-fethet ve Master teoremi', ['bol-fethet']],
        ['Birleştirmeli sıralama', ['merge']],
        ['Çabuk sıralama', ['quick']],
        ['Beş algoritmanın karşılaştırması, Lab 1', ['karsilastirma']]
      ],
      concepts: ['T(n) = aT(n/b) + f(n)', 'Master teoremi', 'merge', 'pivot', 'Hoare bölümlemesi', 'n log₂n']
    }
  };
})(window.OSLab = window.OSLab || {});
