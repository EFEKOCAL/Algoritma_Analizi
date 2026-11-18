/*
 * mind-links.js — Zihin haritasındaki konu ilişkileri. a ve b ders anahtarlarıdır ('<bölüm>/<ders>');
 * ilişki iki yönlüdür. why: iki konuyu bağlayan tek cümle.
 */
(function (OSLab) {
  'use strict';

  OSLab.mindLinks = [
    { a: 'ch1/ebob', b: 'ch1/surec', why: 'Ardışık tamsayı algoritması 0 girdisinde bozulur: problem anlama aşamasında istisnai durumlar düşünülmelidir.' },
    { a: 'ch1/ebob', b: 'ch1/eratosthenes', why: 'Asal çarpanlara ayırma yöntemi asal sayılara ihtiyaç duyar; Eratosthenes eleği bunları üretir.' },
    { a: 'ch1/algoritma', b: 'ch1/surec', why: 'Sonluluk ve doğruluk özellikleri, süreçteki "doğruluğu ispatla" adımında kontrol edilir.' },
    { a: 'ch1/surec', b: 'ch3/cerceve', why: 'Süreçteki "analiz et" adımı, analiz çerçevesiyle (girdi büyüklüğü, temel işlem, büyüme derecesi) yapılır.' },
    { a: 'ch1/surec', b: 'ch6/bol-fethet', why: 'Tasarım tekniği seçimi: kaba kuvvet, azalt-fethet ve böl-fethet bu kararın seçenekleridir.' },
    { a: 'ch1/ebob', b: 'ch3/ozyineli-olmayan', why: 'Öklid algoritması temel işlem ve C(n) bulma alıştırmasının (slayt 58) maddelerinden biridir.' },

    { a: 'ch2/siralama-arama', b: 'ch6/karsilastirma', why: 'Kararlılık ve yerinde olma, beş sıralama algoritmasını karşılaştırırken kullanılan ölçütlerdir.' },
    { a: 'ch2/siralama-arama', b: 'ch4/tanimlar', why: 'Sıralı arama, en iyi / en kötü / ortalama durum analizinin ana örneğidir.' },
    { a: 'ch2/siralama-arama', b: 'ch3/ozyineli-olmayan', why: 'İkili arama her adımda yarıya iner; ikili basamak sayısı örneğindeki gibi log₂n + 1 karşılaştırma yapar.' },
    { a: 'ch2/en-yakin-cift', b: 'ch3/cerceve', why: 'En yakın çiftte temel işlem seçimi: pahalı karekök yerine kare alma.' },
    { a: 'ch2/diger', b: 'ch7/etrafli', why: 'Gezgin satıcı hem graf hem kombinasyonel problemdir; çözüm sayısı n! hızında büyür.' },

    { a: 'ch3/cerceve', b: 'ch5/siniflar', why: 'Büyüme derecesi tablosundaki fonksiyonlar temel verimlilik sınıflarıdır.' },
    { a: 'ch3/tn', b: 'ch5/siniflar', why: 'T(N) tam işlem sayısıdır; sadeleştirme kurallarıyla O(f(N)) karmaşıklığına indirgenir.' },
    { a: 'ch3/ozyineli-olmayan', b: 'ch6/selection', why: 'Seçmeli sıralamanın karşılaştırma sayısı, UniqueElements ile aynı çift toplamdır: n(n−1)/2.' },
    { a: 'ch3/ozyineli', b: 'ch6/bol-fethet', why: 'Böl-fethet algoritmalarının çalışma süresi bir özyineleme ilişkisidir: T(n) = aT(n/b) + f(n).' },
    { a: 'ch3/ozyineli', b: 'ch3/hanoi', why: 'Hanoi, geriye doğru yerine koyma yönteminin üssel sonuç veren örneğidir.' },
    { a: 'ch3/hanoi', b: 'ch7/etrafli', why: 'İkisi de üssel/faktöriyel büyür: 2ⁿ − 1 hamle ve (n−1)!/2 tur.' },
    { a: 'ch3/tn', b: 'ch6/bubble', why: 'İç içe döngüde iç sınır dış değişkene bağlıysa toplam N(N+1)/2 olur (Örnek 4); bubble sort da böyledir.' },

    { a: 'ch4/tanimlar', b: 'ch6/insertion', why: 'Eklemeli sıralamada üç durum farklıdır: sıralı dizide n−1, ters sıralıda n(n−1)/2.' },
    { a: 'ch4/tanimlar', b: 'ch6/quick', why: 'Quick sort\'ta en iyi ve ortalama n log n, ama en kötü durum n²: durum analizinin önemini gösterir.' },
    { a: 'ch4/ortalama', b: 'ch6/quick', why: 'Quick sort\'un ortalama durumu da olasılıkla (ayırma noktası her yerde eşit olası) hesaplanır.' },
    { a: 'ch4/tanimlar', b: 'ch6/selection', why: 'Seçmeli sıralamada durum ayrımı yoktur: temel işlem sayısı yalnızca n\'ye bağlıdır.' },

    { a: 'ch5/notasyonlar', b: 'ch5/limit', why: 'Limit yöntemi, c ve n₀ aramadan O, Ω, Θ ilişkisini belirler.' },
    { a: 'ch5/siniflar', b: 'ch6/karsilastirma', why: 'Θ(n²) ile Θ(n log n) farkı Lab 1\'deki süre tablosunda doğrudan görülür.' },
    { a: 'ch5/limit', b: 'ch6/bol-fethet', why: 'Master teoreminin üç durumu, nᵈ ile n^(log_b a)\'nın büyüme derecesi karşılaştırmasıdır.' },
    { a: 'ch5/siniflar', b: 'ch7/etrafli', why: 'Faktöriyel sınıf, verimlilik sıralamasının en yavaşıdır; TSP kaba kuvveti bu sınıftadır.' },

    { a: 'ch6/bol-fethet', b: 'ch6/merge', why: 'Merge sort: a = 2, b = 2, f(n) = n − 1 → Master teoreminin ikinci durumu.' },
    { a: 'ch6/merge', b: 'ch6/quick', why: 'Merge konuma göre böler ve işi birleştirmede yapar; quick değere göre böler ve işi bölümlemede yapar.' },
    { a: 'ch6/selection', b: 'ch6/bubble', why: 'İkisi de kaba kuvvet, ikisi de n(n−1)/2 karşılaştırma; fark yer değiştirme sayısında.' },
    { a: 'ch6/insertion', b: 'ch6/karsilastirma', why: 'Neredeyse sıralı dizide en hızlı basit algoritma eklemeli sıralamadır.' },
    { a: 'ch6/bubble', b: 'ch7/etrafli', why: 'İkisi de kaba kuvvet tekniğinin örnekleridir: problemin tanımını doğrudan uygular.' },
    { a: 'ch6/karsilastirma', b: 'ch7/lab2', why: 'Lab uygulamasının iki parçası: sıralama süreleri ve kaba kuvvet satış turu.' }
  ];
})(window.OSLab = window.OSLab || {});
