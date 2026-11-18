/*
 * lessons-ch2.js — 2. hafta: Önemli algoritmik problem türleri, problem anlama (H1-H2 s. 21–34).
 */
(function (OSLab) {
  'use strict';

  OSLab.lessons = OSLab.lessons || { chapters: [] };

  OSLab.lessons.chapters.push({
    id: 'ch2',
    num: 2,
    title: 'Problem Türleri',
    en: 'Important problem types',
    source: 'algoritma_analizi_H1_H2_.pdf (s. 21–34)',
    objectives: [
      'Yedi önemli problem türünü saymak ve her birine örnek vermek',
      'Sıralama anahtarı, kararlılık (stabilite) ve yerinde sıralama kavramlarını açıklamak',
      'İkili aramayı sıralı bir dizide elle uygulamak',
      'En yakın çift problemini kaba kuvvetle çözmek ve temel işlemi doğru seçmek'
    ],
    lessons: [
      {
        id: 'turler',
        title: 'Yedi Problem Türü',
        en: 'Important problem types',
        src: 'H1-H2 s. 21',
        minutes: 4,
        blocks: [
          { t: 'h', text: 'Liste' },
          { t: 'p', html: 'Slaytlar algoritmaların uğraştığı problemleri yedi gruba ayırır. Her grubun ayrıntısı sonraki derslerde.' },
          { t: 'dg', id: 'problem-types' },
          { t: 'note', kind: 'exam', html: 'Ezber: <b>S</b>ıralama, <b>A</b>rama, <b>S</b>tring, <b>G</b>raf, <b>K</b>ombinasyonel, <b>G</b>eometrik, <b>N</b>ümerik.' }
        ],
        checks: [
          { q: 'Önemli problem türlerini sayınız.', a: 'Sıralama, arama, string işleme, graf problemleri, kombinasyonel problemler, geometrik problemler, nümerik problemler.' }
        ]
      },
      {
        id: 'siralama-arama',
        title: 'Sıralama ve Arama Problemleri',
        en: 'Sorting and searching',
        src: 'H1-H2 s. 22–27',
        minutes: 9,
        lab: { preset: { module: 'sorting' } },
        blocks: [
          { t: 'h', text: 'Sıralama problemi' },
          { t: 'def', term: 'Sıralama', en: 'Sorting', html: 'Girdi: n sayıdan oluşan dizi ⟨a₁, a₂, …, aₙ⟩. Çıktı: girdinin <b>a′₁ ≤ a′₂ ≤ … ≤ a′ₙ</b> olacak şekilde yeniden düzenlenmesi.' },
          { t: 'list', items: [
            '<b>Neden sıralama?</b> Aramayı kolaylaştırır (ikili arama yalnızca sıralı dizide çalışır) ve birçok algoritmanın alt yordamıdır.',
            '<b>Sıralama anahtarı:</b> Kaydın sıralamayı yönlendirmek için seçilen parçası. Ör. başarı listesi isme, numaraya ya da nota göre sıralanabilir.',
            'Örnek algoritmalar: Selection, Bubble, Insertion, Merge, Heap sort…',
            'Karmaşıklık genellikle yapılan <b>karşılaştırma sayısıyla</b> değerlendirilir.'
          ] },
          { t: 'h', text: 'İki önemli özellik' },
          { t: 'def', term: 'Kararlılık (stabilite)', en: 'Stable sort', html: 'Dizide eşit iki eleman sıralamadan önce i ve j konumlarında (i &lt; j) ise, sıralamadan sonraki konumları i′ ve j′ için de <b>i′ &lt; j′</b> oluyorsa algoritma kararlıdır. Eşitler <b>göreli sıralarını korur</b>.' },
          { t: 'dg', id: 'stability' },
          { t: 'def', term: 'Yerinde (in-place)', en: 'In-place', html: '<b>Fazladan bellek gerektirmeyen</b> sıralama. İstisna olarak küçük bellek birimleri (dizinin tamamı kadar değil, <b>bir değişken kadar</b>) kullanılabilir. Merge sort ek dizi kullandığı için yerinde değildir.' },
          { t: 'h', text: 'Arama problemi' },
          { t: 'p', html: 'Verilen bir değeri (arama anahtarı) veri kümesi içinde bulmak. Örnekler: <b>sıralı arama</b> (sequential), <b>ikili arama</b> (binary).' },
          { t: 'note', kind: 'info', html: '<b>Her durum için ideal arama algoritması yoktur:</b> kimi hızlıdır ama fazla bellek ister, kimi (ikili arama) yalnızca sıralı verilerde çalışır.' },
          { t: 'note', kind: 'warn', html: 'Slayt 25\'te "Sıralama algoritması örnekleri: sıralı arama, ikili arama" yazıyor; doğrusu <b>arama algoritması örnekleri</b>.' },
          { t: 'h', text: 'İkili arama örneği (slayt 27)' },
          { t: 'p', html: 'Sıralı dizide 19 aranıyor: her adımda aralığın ortası ile karşılaştırılır, aranan değer hangi yarıdaysa o yarıyla devam edilir.' },
          { t: 'dg', id: 'binsearch' }
        ],
        checks: [
          { q: 'Kararlı (stable) sıralama ne demektir?', a: 'Eşit anahtarlı iki elemanın sıralamadan önceki göreli sırası (i < j) sıralamadan sonra da korunuyorsa (i′ < j′) algoritma kararlıdır.' },
          { q: 'Yerinde (in-place) sıralama nedir? Merge sort yerinde midir?', a: 'Dizinin boyutuyla orantılı ek bellek kullanmayan, en fazla birkaç değişkenlik ek alanla çalışan sıralamadır. Merge sort yardımcı diziler kullandığı için yerinde değildir.' },
          { q: 'İkili arama hangi ön koşulu ister?', a: 'Dizinin sıralı olmasını.' }
        ]
      },
      {
        id: 'diger',
        title: 'String, Graf, Kombinasyonel, Geometrik, Nümerik',
        en: 'Other problem types',
        src: 'H1-H2 s. 28–32',
        minutes: 8,
        blocks: [
          { t: 'h', text: 'String işleme' },
          { t: 'def', term: 'String', html: 'Bir alfabedeki karakterlerden oluşan dizi: alfabetik, nümerik ve özel karakterler olabilir. Örnek problemler: metinde "www" ifadesini aramak, @ karakterini aramak, derleyiciler.' },
          { t: 'p', html: '<b>Metin arama</b> (slayt 34) tasarımında problem anlama soruları sorulur: <b>büyük/küçük harf duyarlı mı?</b> <b>Tam uyum mu, ek almış hali de mi</b> sayılacak?' },
          { t: 'h', text: 'Graf problemleri' },
          { t: 'def', term: 'Graf', en: 'Graph', html: 'Birbirine <b>kenar</b> (sınır) adı verilen hatlarla bağlı noktalar (düğüm) grubu.' },
          { t: 'list', items: [
            'Gerçek hayat modelleri: WWW, haberleşme ağları, proje planlaması',
            'Örnek problemler: <b>en kısa yol</b>, <b>topolojik sıralama</b>, gezgin satıcı'
          ] },
          { t: 'h', text: 'Kombinasyonel problemler' },
          { t: 'p', html: 'Çeşitli kısıtları sağlayan kombinasyonel çözümü bulmak: <b>maksimum değer, minimum maliyet</b>. Sorunlar:' },
          { t: 'list', items: [
            'Çözüm sayısı probleme göre <b>çok hızlı büyür</b> (ör. n! permütasyon)',
            'Bu tip problemleri kabul edilebilir sürede çözebilecek <b>bilinen bir algoritma yoktur</b>'
          ] },
          { t: 'note', kind: 'exam', html: 'Gezgin satıcı problemi hem <b>graf</b> hem <b>kombinasyonel</b> problemdir. 7. haftada kaba kuvvetle çözülecek.' },
          { t: 'h', text: 'Geometrik problemler' },
          { t: 'p', html: 'Nokta, doğru, çokgen gibi geometrik nesnelerle ilgilenir. Uygulama alanları: robotik, bilgisayar grafikleri, tomografi. En bilinenleri: <b>en yakın çift</b> (closest pair) ve <b>dışbükey gövde</b> (convex hull).' },
          { t: 'h', text: 'Nümerik problemler' },
          { t: 'p', html: 'Sürekli matematiksel nesnelerle ilgilenir; yaklaşık çözüme ulaşılmış problemler kesin sonuca yaklaştırılmaya çalışılır. Örnek: denklem ve denklem sistemi çözümü, belirli integraller.' }
        ],
        checks: [
          { q: 'Kombinasyonel problemlerin iki temel zorluğu nedir?', a: 'Kombinasyonel çözümlerin sayısı problem boyutuyla çok hızlı büyür ve bu tür problemleri kabul edilebilir sürede çözen bilinen bir algoritma yoktur.' },
          { q: 'En bilinen iki geometrik problem hangileridir?', a: 'En yakın çift (closest pair) ve dışbükey gövde (convex hull).' }
        ]
      },
      {
        id: 'en-yakin-cift',
        title: 'Örnek: En Yakın Çift Problemi',
        en: 'Closest pair',
        src: 'H1-H2 s. 33',
        minutes: 6,
        blocks: [
          { t: 'h', text: 'Problem' },
          { t: 'p', html: 'Verilen nokta kümesi içinde <b>birbirine en yakın iki noktayı</b> bulmak. İki nokta arası (Öklid) mesafe:' },
          { t: 'code', text: 'd(Pi, Pj) = √( (xi − xj)² + (yi − yj)² )' },
          { t: 'p', html: 'Kaba kuvvet çözümü: her nokta çiftinin mesafesini hesapla, en küçüğünü tut. n nokta için <b>n(n−1)/2</b> çift vardır → Θ(n²).' },
          { t: 'dg', id: 'closest-pair' },
          { t: 'note', kind: 'exam', html: '<b>Temel işlem olarak karekök seçilmemeli</b>: karekök pahalı bir işlemdir. Karesi büyük olan sayının karekökü de büyük olduğundan, karşılaştırma <b>mesafenin karesi</b> üzerinden yapılabilir. Karekök yalnızca en sonda bir kez alınır.' }
        ],
        checks: [
          { q: 'Tablodaki 6 nokta için kaç mesafe hesaplanır? En yakın çift hangisidir?', a: '6·5/2 = 15 çift. En yakın çift B(2,5) ve E(4,6): (2−4)² + (5−6)² = 5 → d = √5 ≈ 2,24.' },
          { q: 'En yakın çift probleminde temel işlem olarak neden karekök değil kare alma seçilir?', a: 'Karekök hesaplaması pahalıdır; karekök monoton artan olduğu için kareleri karşılaştırmak aynı sonucu verir.' }
        ]
      }
    ]
  });
})(window.OSLab = window.OSLab || {});
