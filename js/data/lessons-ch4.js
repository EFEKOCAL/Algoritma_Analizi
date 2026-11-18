/*
 * lessons-ch4.js — 4. hafta: Durum değerlendirmeleri (H1-H2 s. 43–48, 58).
 */
(function (OSLab) {
  'use strict';

  OSLab.lessons = OSLab.lessons || { chapters: [] };

  OSLab.lessons.chapters.push({
    id: 'ch4',
    num: 4,
    title: 'Durum Değerlendirmeleri',
    en: 'Worst, best and average case',
    source: 'algoritma_analizi_H1_H2_.pdf (s. 43–48)',
    objectives: [
      'En kötü, en iyi ve ortalama durumu tanımlamak',
      'Sıralı arama için C_worst, C_best ve C_avg değerlerini bulmak',
      'Ortalama durum formülünü p olasılığıyla türetmek',
      'Ortalamanın "en iyi ile en kötünün ortalaması" olmadığını açıklamak',
      'Hangi algoritmalarda durum ayrımı gerektiğini söylemek'
    ],
    lessons: [
      {
        id: 'tanimlar',
        title: 'En İyi, En Kötü, Ortalama Durum',
        en: 'Case analysis',
        src: 'H1-H2 s. 43–46',
        minutes: 8,
        blocks: [
          { t: 'h', text: 'Neden üç durum?' },
          { t: 'p', html: 'Bazı algoritmalarda temel işlemin sayısı yalnızca n\'ye değil, <b>girdinin kendisine</b> de bağlıdır. Aynı büyüklükteki iki dizide sıralı arama birinde 1, diğerinde n karşılaştırma yapabilir. Bu yüzden üç ayrı değer verilir.' },
          { t: 'table', head: ['Durum', 'Tanım', 'Ne söyler?'], rows: [
            ['<b>En kötü</b> (worst)', 'n boyutundaki girdiler üzerinde <b>en yüksek</b> değer', 'Çalışma zamanının <b>üst sınırı</b>: hiçbir girdi daha uzun sürmez'],
            ['<b>En iyi</b> (best)', 'n boyutundaki girdiler üzerinde <b>en düşük</b> değer', 'En kötü durum kadar önemli bir bilgi vermez'],
            ['<b>Ortalama</b> (average)', 'Tipik / rastgele bir girdi için beklenen değer', 'Algoritmanın pratikteki davranışı']
          ] },
          { t: 'note', kind: 'exam', html: 'Ortalama durum <b>en kötü ile en iyinin ortalaması değildir</b>. Girdiler hakkında bir <b>olasılık dağılımı</b> varsayılır ve temel işlem sayısının <b>beklenen değeri</b> hesaplanır.' },
          { t: 'h', text: 'Sıralı arama' },
          { t: 'codex', title: 'SequentialSearch(A[0..n−1], K)', rows: [
            ['i ← 0', ''],
            ['while i < n and A[i] ≠ K do', '<b>Temel işlem: A[i] ≠ K karşılaştırması</b>'],
            ['    i ← i + 1', ''],
            ['if i < n return i\nelse return −1', 'Bulursa ilk indisi, bulamazsa −1 döndürür']
          ] },
          { t: 'dg', id: 'seqsearch' },
          { t: 'compare', cols: [
            { title: 'En kötü durum', items: ['Aranan değer dizide <b>yok</b> (ya da son elemanda)', 'n karşılaştırma: <b>C_worst(n) = n</b>'] },
            { title: 'En iyi durum', items: ['Aranan değer <b>ilk elemanda</b>', '1 karşılaştırma: <b>C_best(n) = 1</b>'] }
          ] },
          { t: 'note', kind: 'warn', html: 'Slayt 45 en iyi durum için "n boyutunda girdi için <b>maksimum</b> sayıda karşılaştırma" diyor; doğrusu <b>minimum</b>. (Satır en kötü durum slaytından kopyalanmış.)' },
          { t: 'note', kind: 'info', html: 'En iyi durum ve en kötü durum <b>tek başına yeterli değildir</b>: algoritmanın tipik ya da rastgele bir girdi karşısındaki davranışını söylemezler. Bunun için ortalama durum gerekir.' }
        ],
        checks: [
          { q: 'Sıralı aramada en kötü ve en iyi durum nedir? Karşılaştırma sayıları?', a: 'En kötü: aranan yok ya da son elemanda → C_worst(n) = n. En iyi: aranan ilk elemanda → C_best(n) = 1.' },
          { q: 'Ortalama durum, en iyi ve en kötü durumun ortalaması mıdır?', a: 'Hayır. Girdiler üzerinde bir olasılık dağılımı varsayılarak temel işlem sayısının beklenen değeri hesaplanır.' },
          { q: 'En kötü durum analizi bize ne garanti eder?', a: 'Çalışma süresinin üst sınırını: n boyutundaki hiçbir girdi için algoritma bundan daha fazla temel işlem yapmaz.' }
        ]
      },
      {
        id: 'ortalama',
        title: 'Sıralı Aramanın Ortalama Durumu',
        en: 'Average case of sequential search',
        src: 'H1-H2 s. 46–48',
        minutes: 8,
        blocks: [
          { t: 'h', text: 'Varsayımlar' },
          { t: 'list', items: [
            'Başarılı bir aramanın olasılığı <b>p</b> (0 ≤ p ≤ 1)',
            'Aranan ilk kez i. konumda bulunuyorsa, bunun olasılığı her i için aynıdır: <b>p/n</b>. Bu durumda i karşılaştırma yapılır.',
            'Bulunamama olasılığı <b>1 − p</b>; bu durumda n karşılaştırma yapılır.'
          ] },
          { t: 'h', text: 'Türetme' },
          { t: 'code', text: 'C_avg(n) = [1·p/n + 2·p/n + … + i·p/n + … + n·p/n] + n·(1 − p)\n         = (p/n)·[1 + 2 + … + n] + n(1 − p)\n         = (p/n)·n(n + 1)/2 + n(1 − p)\n         = p(n + 1)/2 + n(1 − p)' },
          { t: 'dg', id: 'avg-p' },
          { t: 'table', head: ['p', 'Anlamı', 'C_avg(n)'], rows: [
            ['1', 'Arama her zaman başarılı', '(n + 1)/2: ortalama olarak dizinin <b>yarısına kadar</b> bakılır'],
            ['0', 'Arama her zaman başarısız', 'n: her eleman kontrol edilir'],
            ['½', 'Yarı yarıya', '(n+1)/4 + n/2 ≈ 3n/4']
          ] },
          { t: 'note', kind: 'exam', html: 'Sınav formülü: <b>C_avg(n) = p(n+1)/2 + n(1−p)</b>. p = 1 için <b>(n+1)/2</b>, p = 0 için <b>n</b>.' },
          { t: 'h', text: 'Durum ayrımı ne zaman gerekmez?' },
          { t: 'p', html: 'Temel işlem sayısı <b>yalnızca n\'ye bağlıysa</b> üç durum aynıdır: en büyük elemanı bulma (n − 1), matris çarpımı (n³), seçmeli sıralama (n(n−1)/2). Sayı girdinin içeriğine bağlıysa ayrım gerekir: sıralı arama, eşsiz elemanlar, eklemeli sıralama, hızlı sıralama.' },
          { t: 'solve', title: 'Slayt 58 alıştırması', q: 'Sıralı aramanın, aranan değerin geçtiği <b>tüm indislerin listesini</b> veren sürümünü tasarlayın ve klasik sıralı aramayla karşılaştırın (C(n), en iyi, en kötü).', a: 'Tüm geçişleri bulmak için dizinin <b>sonuna kadar</b> bakmak zorunludur: <code>for i ← 0 to n−1: if A[i] = K then listeye i ekle</code>. Karşılaştırma sayısı her girdide <b>C(n) = n</b>; en iyi = en kötü = ortalama = n, Θ(n). Klasik sürümde ise en iyi durum 1, ortalama (p=1) (n+1)/2, en kötü n idi. Yani yeni sürüm aynı sınıfta (Θ(n)) ama erken çıkış imkânı olmadığından ortalamada yaklaşık 2 kat fazla karşılaştırma yapar.' }
        ],
        checks: [
          { q: 'Sıralı aramada C_avg(n) formülünü yazın ve p = 1 için hesaplayın.', a: 'C_avg(n) = p(n+1)/2 + n(1−p). p = 1 → (n+1)/2.' },
          { q: 'Bir aramada i. konumda bulma olasılığı neden p/n alınır?', a: 'Başarılı arama olasılığı p, n konum arasında eşit dağıtılır: her konum için p/n.' },
          { q: 'Hangi algoritmalarda en iyi/en kötü/ortalama ayrımı yapılmaz? Bir örnek verin.', a: 'Temel işlem sayısı yalnızca n\'ye bağlı olanlarda; ör. en büyük elemanı bulma (her zaman n−1 karşılaştırma) veya matris çarpımı (n³).' }
        ]
      }
    ]
  });
})(window.OSLab = window.OSLab || {});
