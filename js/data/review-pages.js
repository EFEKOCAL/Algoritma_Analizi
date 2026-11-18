/*
 * review-pages.js — Hızlı Tekrar'ın sayfa planı: hangi başlıklar aynı ekranda gösterilir.
 *
 *   { l: '<bölüm>/<ders>', secs: ['Başlık 1', 'Başlık 2'] }      → bu başlıklar tek sayfada
 *   { l: '<bölüm>/<ders>', secs: ['Başlık'], range: [0, 4] }    → başlığın 0–3. blokları (bölme)
 *
 * '' adlı başlık, dersin ilk başlığından önceki bloklardır. Planda hiç geçmeyen ders tek sayfa olur;
 * planda unutulan bilgi review-view.js tarafından sona eklenir.
 */
(function (OSLab) {
  'use strict';

  OSLab.reviewPages = {
    pages: [
      { l: 'ch1/ebob', secs: ['Problem', '1. Euclid algoritması', 'Euclid algoritması sonlanır mı?'] },
      { l: 'ch1/ebob', secs: ['2. Ardışık tamsayı kontrolü', '3. Asal çarpanlara ayırma (okul yöntemi)', 'Üç yöntemin karşılaştırması'] },

      { l: 'ch1/surec', secs: ['Sürecin adımları', 'Problemin anlaşılması', 'Donanımın yetenekleri: RAM modeli'] },
      { l: 'ch1/surec', secs: ['Kesin mi, yaklaşık mı?', 'Tasarım tekniği ve veri yapıları', 'Açıklama, doğruluk, analiz, kodlama'] },

      { l: 'ch2/siralama-arama', secs: ['Sıralama problemi', 'İki önemli özellik'] },
      { l: 'ch2/siralama-arama', secs: ['Arama problemi', 'İkili arama örneği (slayt 27)'] },

      { l: 'ch3/cerceve', secs: ['Neye bakılır?', 'Girdi büyüklüğünün ölçülmesi', 'Çalışma zamanı ölçü birimi'] },
      { l: 'ch3/cerceve', secs: ['T(n) ≈ c_op · C(n)', 'Büyüme derecesi'] },

      { l: 'ch3/tn', secs: ['Performans neyle ölçülür?', 'Üç algoritma: 1 + 2 + … + n', 'Satır satır sayma: ortalama fonksiyonu'] },
      { l: 'ch3/tn', secs: ['Döngü kalıpları', 'Örnek 10: Faktöriyel'] },

      { l: 'ch3/ozyineli-olmayan', secs: ['5 adımlı genel plan', 'Sık kullanılan toplam formülleri'] },
      { l: 'ch3/ozyineli-olmayan', secs: ['Örnek 1: En büyük elemanı bulma', 'Örnek 2: Dizi elemanlarının eşsizliği'] },
      { l: 'ch3/ozyineli-olmayan', secs: ['Örnek 3: n×n matris çarpımı', 'Örnek 4: Onluk sayının ikili basamak sayısı'] },

      { l: 'ch3/ozyineli', secs: ['n! örneği', 'Geriye doğru yerine koyma', 'Özyinelemeli analizin 5 adımlı planı'] },
      { l: 'ch3/ozyineli', secs: ['Çözümlü örnekler', 'Örnek: küplerin toplamı'] },

      { l: 'ch5/notasyonlar', secs: ['Üç notasyon', 'Big Oh: tanım ve ispat'] },
      { l: 'ch5/notasyonlar', secs: ['Big Omega: tanım ve ispat', 'Big Theta: tanım ve ispat'] },

      { l: 'ch5/siniflar', secs: ['Asimptotik özellikler', 'Sadeleştirme kuralları', 'T(N) → O(f(N)) örnekleri'] },
      { l: 'ch5/siniflar', secs: ['Temel verimlilik sınıfları', 'Saniyeye çevirince', 'Veri yapısı işlemleri'] },

      { l: 'ch5/limit', secs: ['Neden limit?', 'İki araç', 'Çözümlü örnekler (slayt 74–76)'] },
      { l: 'ch5/limit', secs: ['Alıştırma çözümleri (slayt 59, 78–82)'] },

      { l: 'ch8/merge', secs: ['Algoritma'] },
      { l: 'ch8/merge', secs: ['Analiz'] },

      { l: 'ch8/quick', secs: ['Merge sort\'tan farkı'] },
      { l: 'ch8/quick', secs: ['Analiz'] },

      { l: 'ch6/arama-string', secs: ['Alıştırma: bu algoritmalar ne yapıyor?'] },
      { l: 'ch6/arama-string', secs: ['Sıralı arama (gözcülü)', 'Kaba kuvvet string eşleme'] },

      { l: 'ch6/etrafli', secs: ['Etraflı arama', 'Gezgin satıcı problemi'] },
      { l: 'ch6/etrafli', secs: ['Sırt çantası problemi'] },
      { l: 'ch6/etrafli', secs: ['İşe alma (atama) problemi'] },

      { l: 'ch6/dfs', secs: ['Graf gezme', 'DFS nasıl çalışır?'] },
      { l: 'ch6/dfs', secs: ['DFS ormanı ve kenar türleri', 'Etkinlik ve kullanım'] },

      { l: 'ch6/bfs', secs: ['BFS nasıl çalışır?'] },
      { l: 'ch6/bfs', secs: ['BFS ormanı', 'Etkinlik ve DFS\'den farkları'] },

      { l: 'ch7/topolojik', secs: ['Problem', 'Yönlü grafta DFS kenarları'] },
      { l: 'ch7/topolojik', secs: ['Örnek: ders sırası'] },

      { l: 'ch7/permutasyon', secs: ['Asgari değişiklik ile permütasyon', 'Johnson–Trotter algoritması'] },
      { l: 'ch7/permutasyon', secs: ['Alt küme üretme'] },

      { l: 'ch7/lab-af', secs: ['Sahte para problemi'] },
      { l: 'ch7/lab-af', secs: ['Rus köylüsü çarpımı'] },

      { l: 'ch6/lab2', secs: ['Problem', 'Kaba kuvvet tasarımı'] },
      { l: 'ch6/lab2', secs: ['İki yorum, iki cevap'] }
    ]
  };
})(window.OSLab = window.OSLab || {});
