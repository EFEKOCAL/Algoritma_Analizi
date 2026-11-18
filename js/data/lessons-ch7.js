/*
 * lessons-ch7.js — 7. hafta: Algoritmalar ve veri yapıları → Lab 2: kaba kuvvetle gezgin satıcı.
 * Kaynaklar: Kaba Kuvvet s. 20–21, Lab Uygulaması 2.
 */
(function (OSLab) {
  'use strict';

  OSLab.lessons = OSLab.lessons || { chapters: [] };

  OSLab.lessons.chapters.push({
    id: 'ch7',
    num: 7,
    title: 'Kaba Kuvvet ve Gezgin Satıcı',
    en: 'Exhaustive search and TSP (Lab 2)',
    source: 'Kaba Kuvvet s. 20–21 · Lab Uygulaması 2',
    objectives: [
      'Etraflı aramayı (exhaustive search) tanımlamak',
      'Gezgin satıcı problemini graf ve Hamilton devresi terimleriyle ifade etmek',
      'n şehir için denenmesi gereken tur sayısını hesaplamak',
      'Küçük bir örnekte tüm turları listeleyip en kısasını bulmak',
      'Lab 2\'deki 6 şehirlik graf için kaba kuvvet çözümünü tasarlamak'
    ],
    lessons: [
      {
        id: 'etrafli',
        title: 'Etraflı Arama ve Gezgin Satıcı',
        en: 'Exhaustive search, traveling salesman',
        src: 'Kaba Kuvvet s. 20–21',
        minutes: 9,
        lab: { preset: { module: 'tsp', mode: 'cycle', k: 4 } },
        blocks: [
          { t: 'h', text: 'Etraflı arama' },
          { t: 'def', term: 'Etraflı arama', en: 'Exhaustive search', html: 'Kombinasyonel çözümler içinden belirli bir özelliğe sahip olanı (ör. en kısa, en ucuz) bulmak için kullanılan <b>kaba kuvvet</b> çözümü: <b>her ihtimal denenir</b>, en iyisi tutulur.' },
          { t: 'list', ordered: true, items: [
            'Tüm olası çözümleri sistematik olarak üret (permütasyon, alt küme…).',
            'Kısıtları sağlamayanları ele (ör. yol yoksa).',
            'Her birinin maliyetini hesapla, <b>en iyisini</b> sakla.'
          ] },
          { t: 'p', html: 'Örnek problemler: <b>gezgin satıcı</b> (traveling salesman), <b>sırt çantası</b> (knapsack), <b>işe alma</b> (assignment).' },
          { t: 'h', text: 'Gezgin satıcı problemi' },
          { t: 'def', term: 'Gezgin satıcı (TSP)', en: 'Traveling salesman', html: 'Aralarındaki mesafeler bilinen n şehri, <b>her şehirden bir kez geçerek</b> dolaşıp <b>başladığı şehre en kısa yoldan dönen</b> turu bulmak. Graf diliyle: ağırlıklı grafta <b>en kısa Hamilton devresi</b> (Hamiltonian circuit).' },
          { t: 'dg', id: 'tsp-slide' },
          { t: 'h', text: 'Kaç tur denenir?' },
          { t: 'p', html: 'Başlangıç şehri sabitlenince kalan n − 1 şehrin her sıralaması bir turdur: <b>(n − 1)!</b> tur. Her tur iki yönde aynı uzunluktadır (a→b→d→c→a ile a→c→d→b→a), bu yüzden farklı tur sayısı <b>(n − 1)!/2</b>.' },
          { t: 'table', head: ['n', '(n−1)!/2 farklı tur', 'Yorum'], rows: [
            ['4', '3', 'Slayttaki örnek: 6 sıralama, 3 farklı tur'],
            ['6', '60', 'Lab 2\'deki şehir sayısı'],
            ['10', '181.440', 'Hâlâ hızlı'],
            ['20', '≈ 6·10¹⁶', 'Saniyede 10⁹ tur ile ≈ 2 yıl'],
            ['30', '≈ 4·10³⁰', 'Pratikte imkânsız']
          ] },
          { t: 'note', kind: 'exam', html: 'Etraflı arama TSP için <b>Θ(n!)</b> zaman alır. Yalnızca çok küçük n için uygulanabilir; kombinasyonel problemlerin "çözüm sayısı çok hızlı büyür" sorununun (2. hafta) somut örneği budur.' }
        ],
        checks: [
          { q: 'Etraflı arama nedir?', a: 'Kombinasyonel çözümlerin tamamını sistematik olarak üretip kısıtları sağlayanlar içinden en iyisini seçen kaba kuvvet yöntemi.' },
          { q: 'n şehirli TSP için kaba kuvvetle kaç farklı tur incelenir?', a: 'Başlangıç sabitlenince (n−1)! sıralama; yönler aynı olduğu için (n−1)!/2 farklı tur. Θ(n!).' },
          { q: 'Slayttaki 4 şehirlik örnekte en kısa tur ve uzunluğu nedir?', a: 'a→b→d→c→a (veya ters yönü a→c→d→b→a): 2 + 3 + 1 + 5 = 11.' }
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
