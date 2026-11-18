/*
 * lessons-ch1.js — 1. hafta: Algoritma ve ilgili temel kavramlar (algoritma_analizi_H1_H2_.pdf, s. 1–20).
 */
(function (OSLab) {
  'use strict';

  OSLab.lessons = OSLab.lessons || { chapters: [] };

  OSLab.lessons.chapters.push({
    id: 'ch1',
    num: 1,
    title: 'Algoritma ve Temel Kavramlar',
    en: 'Algorithms: basic concepts',
    source: 'algoritma_analizi_H1_H2_.pdf (s. 1–20)',
    objectives: [
      'Algoritmayı tanımlamak ve iyi bir algoritmanın özelliklerini saymak',
      'EBOB problemini üç farklı algoritmayla çözmek: Euclid, ardışık tamsayı kontrolü, asal çarpanlar',
      'Euclid algoritmasının neden sonlandığını açıklamak',
      'Ardışık tamsayı algoritmasının girdi 0 olduğunda neden bozulduğunu söylemek',
      'Eratosthenes eleme algoritmasını elle uygulamak',
      'Algoritma tasarım ve analiz sürecinin adımlarını sıralamak'
    ],
    lessons: [
      {
        id: 'algoritma',
        title: 'Algoritma Nedir?',
        en: 'What is an algorithm?',
        src: 'H1-H2 s. 2–6',
        minutes: 6,
        blocks: [
          { t: 'h', text: 'Tanım' },
          { t: 'def', term: 'Algoritma', en: 'Algorithm', html: 'Bir problemin çözümü için izlenen <b>sıralı ve anlaşılır buyruklar</b>. Girdileri çıktılara dönüştüren sıralı hesaplama adımlarıdır; tanımlanmış bir problemin çözümünde kullanılan araçtır.' },
          { t: 'p', html: 'Algoritmanın hedefi: <b>sonlu bir zaman içinde</b>, <b>belirli girdilerle</b>, <b>istenen çıktıyı</b> elde etmek.' },
          { t: 'dg', id: 'algo-io' },
          { t: 'h', text: 'İyi bir algoritmanın özellikleri' },
          { t: 'list', items: [
            '<b>Birden fazla biçimde sunulabilmeli</b> (sözde kod, akış diyagramı, kelimelerle)',
            '<b>Net ve anlaşılır</b> olmalı: her adım tek anlamlı',
            '<b>Etkin ve faydalı</b> olmalı',
            '<b>Sonlu</b> veya sonlandırılabilir olmalı',
            'Geliştirildiği problem için <b>doğru</b> olmalı'
          ] },
          { t: 'note', kind: 'exam', html: 'Sınavda "bir algoritmanın taşıması gereken özellikler" sorulursa beş maddeyi say: <b>çok biçimli sunum, açıklık, etkinlik, sonluluk, doğruluk</b>.' },
          { t: 'h', text: 'Tarihçe' },
          { t: 'compare', cols: [
            { title: 'El Harezmi (9. yy)', items: ['Algoritma ve cebir kavramlarının "babası"', '0 sayısını ve x bilinmeyenini ilk kullanan kişi', '"Algoritma" sözcüğü onun adından gelir'] },
            { title: 'Euclid (Öklid)', items: ['En büyük ortak böleni bulmak için geliştirdiği yöntem', 'Bilinen ilk algoritmalardan biri kabul edilir'] }
          ] }
        ],
        checks: [
          { q: 'Bir algoritmanın taşıması gereken beş özellik nedir?', a: 'Birden fazla biçimde sunulabilme, net ve anlaşılır olma, etkin ve faydalı olma, sonlu (sonlandırılabilir) olma, problem için doğru olma.' },
          { q: 'Algoritmanın hedefi hangi üç şartla ifade edilir?', a: 'Sonlu bir zaman içinde, belirli girdilerle, istenen çıktıyı elde etmek.' }
        ]
      },
      {
        id: 'ebob',
        title: 'EBOB: Üç Farklı Algoritma',
        en: 'Greatest common divisor',
        src: 'H1-H2 s. 7–12',
        minutes: 10,
        lab: { preset: { module: 'growth', tab: 'loops' } },
        blocks: [
          { t: 'h', text: 'Problem' },
          { t: 'def', term: 'EBOB (gcd)', en: 'Greatest common divisor', html: 'İki negatif olmayan tamsayıyı (ikisi birden 0 değil) <b>kalansız bölen en büyük sayı</b>. gcd(m, n) = ?' },
          { t: 'p', html: 'Aynı problem için birden fazla algoritma yazılabilir. Slaytlar üç yöntem verir ve bunları karşılaştırmayı ister: algoritma seçimi, <b>girdinin tanımı</b> ve <b>etkinlik</b> burada önem kazanır.' },
          { t: 'h', text: '1. Euclid algoritması' },
          { t: 'p', html: '<code>m mod n</code> sıfır olana kadar <b>gcd(m, n) = gcd(n, m mod n)</b> eşitliğini uygula. Örnek: gcd(60, 24) = gcd(24, 12) = gcd(12, 0) = <b>12</b>.' },
          { t: 'codex', title: 'Euclid(m, n)', rows: [
            ['while n ≠ 0 do', 'Adım 1: n = 0 ise m sonuçtur, dur.'],
            ['    r ← m mod n', 'Adım 2: m\'yi n\'ye böl, kalanı r\'ye ata.'],
            ['    m ← n\n    n ← r', 'Adım 3: m = n, n = r yap ve Adım 1\'e dön.'],
            ['return m', 'n sıfır olduğunda m EBOB\'dur.']
          ] },
          { t: 'dg', id: 'euclid' },
          { t: 'h', text: 'Euclid algoritması sonlanır mı?' },
          { t: 'p', html: 'Evet. <b>n her iterasyonda küçülür</b> (m mod n &lt; n). İki pozitif sayının bölümünden negatif kalan çıkmaz, dolayısıyla n 0\'dan küçük olamaz. Er ya da geç n = 0 olur ve algoritma durur.' },
          { t: 'note', kind: 'exam', html: '"Euclid algoritmasının sonu var mı?" sorusunun cevabı üç parçadır: <b>n her adımda azalır</b>, <b>negatif olamaz</b>, <b>bu yüzden sıfıra ulaşır</b>.' },
          { t: 'h', text: '2. Ardışık tamsayı kontrolü' },
          { t: 'p', html: 'EBOB, m ve n\'nin küçüğünden büyük olamaz. Bu yüzden <b>t = min(m, n)</b>\'den başlanır; t ikisini de bölüyorsa sonuçtur, bölmüyorsa t bir azaltılır.' },
          { t: 'list', ordered: true, items: [
            'min{m, n} değerini t\'ye ata.',
            'm / t işlemini yap. Kalan 0 ise Adım 3\'e, değilse Adım 4\'e git.',
            'n / t işlemini yap. Kalan 0 ise <b>t\'yi döndür</b>; değilse Adım 4\'e git.',
            't değerini 1 azalt, Adım 2\'ye git.'
          ] },
          { t: 'note', kind: 'warn', html: '<b>Değerlerden biri 0 ise doğru çalışmaz.</b> Neden? t = min(m, 0) = 0 olur ve Adım 2\'de <b>0\'a bölme</b> yapılır. Euclid ise gcd(m, 0) = m sonucunu doğrudan verir. Ders: algoritmanın <b>girdileri kesin ve dikkatli belirlenmelidir</b>.' },
          { t: 'h', text: '3. Asal çarpanlara ayırma (okul yöntemi)' },
          { t: 'list', ordered: true, items: [
            'm\'nin asal çarpanlarını bul.',
            'n\'nin asal çarpanlarını bul.',
            'Ortak asal çarpanları belirle.',
            'Ortak asal çarpanları çarp: sonuç EBOB.'
          ] },
          { t: 'p', html: 'Örnek: 60 = 2·2·3·5, 24 = 2·2·2·3 → ortak: 2·2·3 = <b>12</b>.' },
          { t: 'note', kind: 'info', html: 'Bu yöntemin işlem karmaşıklığı <b>Euclid\'den fazladır</b>. Üstelik "asal çarpanları bul" adımı kendi başına bir problemdir; algoritması açıkça verilmemiştir. Bu yüzden slaytlarda "tam bir algoritma sayılmaz" vurgusu yapılır. Asal sayıları üretmek için Eratosthenes eleme algoritması kullanılabilir.' },
          { t: 'h', text: 'Üç yöntemin karşılaştırması' },
          { t: 'table', head: ['Yöntem', 'Fikir', 'gcd(60, 24) için', 'Zayıf yanı'], rows: [
            ['Euclid', 'gcd(m,n) = gcd(n, m mod n)', '2 bölme', '—'],
            ['Ardışık tamsayı', 't = min\'den aşağı say', 't = 24, 23, …, 12 → 13 deneme', 'Girdi 0 ise çalışmaz, yavaş'],
            ['Asal çarpanlar', 'Ortak asal çarpanların çarpımı', '2·2·3', 'Çarpanlara ayırma adımı belirsiz, daha karmaşık']
          ] }
        ],
        checks: [
          { q: 'gcd(60, 24)\'ü Euclid algoritmasıyla adım adım bulun.', a: 'gcd(60, 24) → 60 mod 24 = 12 → gcd(24, 12) → 24 mod 12 = 0 → gcd(12, 0) = 12.' },
          { q: 'Euclid algoritması neden her zaman sonlanır?', a: 'n her iterasyonda kesin olarak küçülür (m mod n < n) ve negatif olamaz; bu yüzden sonlu adımda 0 olur ve algoritma durur.' },
          { q: 'Ardışık tamsayı kontrol algoritması m veya n sıfırken neden çalışmaz?', a: 't = min(m, n) = 0 olur ve m / t işleminde sıfıra bölme oluşur. Bu, girdi alanının kesin tanımlanması gerektiğini gösterir.' },
          { q: 'Asal çarpanlara ayırma yönteminin Euclid\'e göre dezavantajı nedir?', a: 'İşlem karmaşıklığı daha fazladır ve asal çarpanlara ayırma adımının kendisi için açık bir algoritma verilmemiştir.' }
        ]
      },
      {
        id: 'eratosthenes',
        title: 'Eratosthenes\'in Eleme Algoritması',
        en: 'Sieve of Eratosthenes',
        src: 'H1-H2 s. 12–14',
        minutes: 5,
        blocks: [
          { t: 'h', text: 'Fikir' },
          { t: 'p', html: '2 ile n arasındaki <b>asal sayıları</b> bulmak için kullanılır. Listeye 2..n yazılır; her turda henüz elenmemiş en küçük sayının <b>katları</b> elenir.' },
          { t: 'list', items: [
            '1. iterasyonda <b>2\'nin</b> katları elenir',
            '2. iterasyonda <b>3\'ün</b> katları elenir',
            '3. iterasyonda <b>5\'in</b> katları elenir (4 zaten 2 ile elendiği için atlanır)',
            'Kalanlar asal sayılardır'
          ] },
          { t: 'dg', id: 'sieve' },
          { t: 'note', kind: 'extra', html: 'Elemeye p\'nin katları için <b>p²</b>\'den başlamak yeterlidir (daha küçük katlar önceki asallarla elenmiştir). Bu yüzden <b>p² &gt; n</b> olduğunda durulabilir: n = 50 için 7² = 49 son eleme turudur.' }
        ],
        checks: [
          { q: '2..30 arasında Eratosthenes eleme algoritması kaç tur eleme yapar ve hangi sayılar kalır?', a: '2, 3 ve 5\'in katları elenir (7² = 49 > 30 olduğu için 7 turu gerekmez). Kalanlar: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.' }
        ]
      },
      {
        id: 'surec',
        title: 'Algoritma Tasarım ve Analiz Süreci',
        en: 'Algorithm design and analysis process',
        src: 'H1-H2 s. 15–20',
        minutes: 7,
        blocks: [
          { t: 'h', text: 'Sürecin adımları' },
          { t: 'p', html: 'Slayttaki akış şeması (s. 15): problemi anla → hesaplama aracına, kesin/yaklaşık çözüme ve tasarım tekniğine karar ver → algoritmayı tasarla → doğruluğunu ispatla → analiz et → kodla. Sorun çıkan her adımdan geri dönülür.' },
          { t: 'dg', id: 'design-process' },
          { t: 'h', text: 'Problemin anlaşılması' },
          { t: 'list', items: [
            'Problem <b>net bir şekilde</b> ifade edilmeli',
            'Anlaşılmayan hususlar için sorular sorulmalı',
            'Gerekirse küçük örnekler <b>elle işlenmeli</b>',
            '<b>İstisnai durumlar</b> düşünülmeli (ör. EBOB\'da 0 girdisi)'
          ] },
          { t: 'h', text: 'Donanımın yetenekleri: RAM modeli' },
          { t: 'def', term: 'RAM modeli', en: 'Random-access machine', html: 'Birçok temel algoritmanın denendiği soyut makine: komutlar <b>birer birer, sırayla</b> yürütülür ve her temel işlem sabit sürer. Bu dersteki analizler bu modele göre yapılır.' },
          { t: 'h', text: 'Kesin mi, yaklaşık mı?' },
          { t: 'compare', cols: [
            { title: 'Kesin algoritma (exact)', items: ['Tam sonuca ulaşılır', 'Ör. EBOB, sıralama'] },
            { title: 'Yaklaşık algoritma (approximation)', items: ['Doğrusal olmayan denklemler, karekök gibi kesin çözülemeyen problemler', 'Kesin çözüm çok uzun sürüyor ya da çok karmaşıksa yaklaşık sonuç kabul edilir'] }
          ] },
          { t: 'h', text: 'Tasarım tekniği ve veri yapıları' },
          { t: 'def', term: 'Algoritma tasarım tekniği', en: 'Design technique', html: 'Çözüm için kullanılabilecek <b>genel algoritmik yaklaşım</b>; çeşitli hesaplama problemlerinde uygulanabilir olmalıdır. Ör. kaba kuvvet, azalt-fethet, böl-fethet.' },
          { t: 'p', html: 'Algoritma tasarlanırken <b>veri yapısı</b> da seçilir: bellek kullanımı, veri türü ve donanım bu seçimi etkiler.' },
          { t: 'h', text: 'Açıklama, doğruluk, analiz, kodlama' },
          { t: 'table', head: ['Adım', 'İçerik'], rows: [
            ['Açıklama yöntemleri', 'Akış diyagramı, sözde kod, kelimelerle anlatım'],
            ['Doğruluğun kanıtlanması', 'Denemeler, istisnalar, ispatlar'],
            ['Analiz', 'Doğruluk en önemli unsurdur; ardından etkinlik (zaman ve bellek) ve basitlik'],
            ['Kodlama', 'Belirlenen özelliklerin ve veri yapılarının uygulanabileceği bir dil seçilir']
          ] },
          { t: 'note', kind: 'exam', html: 'Analizde öncelik sırası: <b>önce doğruluk</b>, sonra etkinlik (zaman, bellek), sonra basitlik. Yanlış sonuç veren hızlı algoritma işe yaramaz.' }
        ],
        checks: [
          { q: 'Algoritma tasarım ve analiz sürecinin adımlarını sırasıyla yazın.', a: 'Problemi anla → hesaplama aracı, kesin/yaklaşık çözüm ve tasarım tekniği seçimi → algoritmayı tasarla → doğruluğunu ispatla → analiz et → kodla. Gerektiğinde önceki adımlara dönülür.' },
          { q: 'Hangi durumlarda yaklaşık algoritma tercih edilir?', a: 'Problem kesin çözülemiyorsa (doğrusal olmayan denklem, karekök) ya da kesin sonuç çok uzun işlem süresi veya karmaşık işlemler gerektiriyorsa.' }
        ]
      }
    ]
  });
})(window.OSLab = window.OSLab || {});
