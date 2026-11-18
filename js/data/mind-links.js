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
    { a: 'ch1/surec', b: 'ch8/bol-fethet', why: 'Tasarım tekniği seçimi: kaba kuvvet, azalt-fethet ve böl-fethet bu kararın seçenekleridir.' },
    { a: 'ch1/ebob', b: 'ch3/ozyineli-olmayan', why: 'Öklid algoritması temel işlem ve C(n) bulma alıştırmasının (slayt 58) maddelerinden biridir.' },

    { a: 'ch2/siralama-arama', b: 'ch8/karsilastirma', why: 'Kararlılık ve yerinde olma, beş sıralama algoritmasını karşılaştırırken kullanılan ölçütlerdir.' },
    { a: 'ch2/siralama-arama', b: 'ch4/tanimlar', why: 'Sıralı arama, en iyi / en kötü / ortalama durum analizinin ana örneğidir.' },
    { a: 'ch2/siralama-arama', b: 'ch3/ozyineli-olmayan', why: 'İkili arama her adımda yarıya iner; ikili basamak sayısı örneğindeki gibi log₂n + 1 karşılaştırma yapar.' },
    { a: 'ch2/en-yakin-cift', b: 'ch3/cerceve', why: 'En yakın çiftte temel işlem seçimi: pahalı karekök yerine kare alma.' },
    { a: 'ch2/diger', b: 'ch6/etrafli', why: 'Gezgin satıcı hem graf hem kombinasyonel problemdir; çözüm sayısı n! hızında büyür.' },

    { a: 'ch3/cerceve', b: 'ch5/siniflar', why: 'Büyüme derecesi tablosundaki fonksiyonlar temel verimlilik sınıflarıdır.' },
    { a: 'ch3/tn', b: 'ch5/siniflar', why: 'T(N) tam işlem sayısıdır; sadeleştirme kurallarıyla O(f(N)) karmaşıklığına indirgenir.' },
    { a: 'ch3/ozyineli-olmayan', b: 'ch6/selection', why: 'Seçmeli sıralamanın karşılaştırma sayısı, UniqueElements ile aynı çift toplamdır: n(n−1)/2.' },
    { a: 'ch3/ozyineli', b: 'ch8/bol-fethet', why: 'Böl-fethet algoritmalarının çalışma süresi bir özyineleme ilişkisidir: T(n) = aT(n/b) + f(n).' },
    { a: 'ch3/ozyineli', b: 'ch3/hanoi', why: 'Hanoi, geriye doğru yerine koyma yönteminin üssel sonuç veren örneğidir.' },
    { a: 'ch3/hanoi', b: 'ch6/etrafli', why: 'İkisi de üssel/faktöriyel büyür: 2ⁿ − 1 hamle ve (n−1)!/2 tur.' },
    { a: 'ch3/tn', b: 'ch6/bubble', why: 'İç içe döngüde iç sınır dış değişkene bağlıysa toplam N(N+1)/2 olur (Örnek 4); bubble sort da böyledir.' },

    { a: 'ch4/tanimlar', b: 'ch7/insertion', why: 'Eklemeli sıralamada üç durum farklıdır: sıralı dizide n−1, ters sıralıda n(n−1)/2.' },
    { a: 'ch4/tanimlar', b: 'ch8/quick', why: 'Quick sort\'ta en iyi ve ortalama n log n, ama en kötü durum n²: durum analizinin önemini gösterir.' },
    { a: 'ch4/ortalama', b: 'ch8/quick', why: 'Quick sort\'un ortalama durumu da olasılıkla (ayırma noktası her yerde eşit olası) hesaplanır.' },
    { a: 'ch4/tanimlar', b: 'ch6/selection', why: 'Seçmeli sıralamada durum ayrımı yoktur: temel işlem sayısı yalnızca n\'ye bağlıdır.' },

    { a: 'ch5/notasyonlar', b: 'ch5/limit', why: 'Limit yöntemi, c ve n₀ aramadan O, Ω, Θ ilişkisini belirler.' },
    { a: 'ch5/siniflar', b: 'ch8/karsilastirma', why: 'Θ(n²) ile Θ(n log n) farkı Lab 1\'deki süre tablosunda doğrudan görülür.' },
    { a: 'ch5/limit', b: 'ch8/bol-fethet', why: 'Master teoreminin üç durumu, nᵈ ile n^(log_b a)\'nın büyüme derecesi karşılaştırmasıdır.' },
    { a: 'ch5/siniflar', b: 'ch6/etrafli', why: 'Faktöriyel sınıf, verimlilik sıralamasının en yavaşıdır; TSP kaba kuvveti bu sınıftadır.' },

    { a: 'ch8/bol-fethet', b: 'ch8/merge', why: 'Merge sort: a = 2, b = 2, f(n) = n − 1 → Master teoreminin ikinci durumu.' },
    { a: 'ch8/merge', b: 'ch8/quick', why: 'Merge konuma göre böler ve işi birleştirmede yapar; quick değere göre böler ve işi bölümlemede yapar.' },
    { a: 'ch6/selection', b: 'ch6/bubble', why: 'İkisi de kaba kuvvet, ikisi de n(n−1)/2 karşılaştırma; fark yer değiştirme sayısında.' },
    { a: 'ch7/insertion', b: 'ch8/karsilastirma', why: 'Neredeyse sıralı dizide en hızlı basit algoritma eklemeli sıralamadır.' },
    { a: 'ch6/bubble', b: 'ch6/etrafli', why: 'İkisi de kaba kuvvet tekniğinin örnekleridir: problemin tanımını doğrudan uygular.' },
    { a: 'ch8/karsilastirma', b: 'ch6/lab2', why: 'Lab uygulamasının iki parçası: sıralama süreleri ve kaba kuvvet satış turu.' },

    // Kaba kuvvet ve azalt-fethet
    { a: 'ch2/siralama-arama', b: 'ch6/arama-string', why: 'Sıralı arama ve string işleme 2. haftadaki problem türleridir; burada kaba kuvvetle çözülür.' },
    { a: 'ch4/tanimlar', b: 'ch6/arama-string', why: 'String eşlemede en kötü durum m(n−m+1), ortalama doğal dilde ≈ n: durum analizinin örneği.' },
    { a: 'ch2/en-yakin-cift', b: 'ch6/geometri', why: '2. haftadaki 6 noktalı örnek, kaba kuvvet en yakın çift algoritmasıyla 15 çift denenerek çözülür.' },
    { a: 'ch3/cerceve', b: 'ch6/geometri', why: 'Temel işlem seçimi: pahalı karekök yerine kare alma.' },
    { a: 'ch6/etrafli', b: 'ch7/permutasyon', why: 'TSP ve işe alma için permütasyonlar, sırt çantası için alt kümeler üretilir.' },
    { a: 'ch6/etrafli', b: 'ch6/lab2', why: 'Lab 2 satış turu, etraflı aramanın gezgin satıcı problemine uygulanmasıdır.' },
    { a: 'ch6/dfs', b: 'ch6/bfs', why: 'DFS yığıtla iki sıralama ve geri kenar, BFS kuyrukla tek sıralama ve çapraz kenar üretir.' },
    { a: 'ch6/dfs', b: 'ch7/topolojik', why: 'Topolojik sıralama DFS\'de yığıttan çekilme sırasının tersidir.' },
    { a: 'ch2/diger', b: 'ch6/dfs', why: 'Graf problemleri: DFS ve BFS bağlantılılık ve çevrim gibi özellikleri inceler.' },
    { a: 'ch6/postane', b: 'ch6/geometri', why: 'İkisi de tüm aday çiftleri/noktaları deneyip en iyisini seçen Θ(n²) kaba kuvvet çözümleridir.' },
    { a: 'ch1/ebob', b: 'ch7/azalt', why: 'Öklid algoritması değişken boyutla azaltmanın örneğidir.' },
    { a: 'ch7/azalt', b: 'ch7/insertion', why: 'Eklemeli sıralama bir sabitle (1) azaltmanın örneğidir: A[0..n−2] sıralıysa A[n−1] yerine eklenir.' },
    { a: 'ch7/azalt', b: 'ch7/ikili-arama', why: 'İkili arama sabit oranla (yarıya) azaltmanın örneğidir.' },
    { a: 'ch2/siralama-arama', b: 'ch7/ikili-arama', why: '2. haftadaki 19 arama örneği ikili aramadır; burada analizi yapılır.' },
    { a: 'ch3/ozyineli-olmayan', b: 'ch7/ikili-arama', why: 'İkili basamak sayısı örneği gibi her adımda yarıya inen algoritma: ⌊log₂n⌋ + 1.' },
    { a: 'ch7/ikili-arama', b: 'ch7/lab-af', why: 'Sahte para ve Rus köylüsü de her adımda problemi yarıya indirir: Θ(log n).' },
    { a: 'ch6/selection', b: 'ch7/insertion', why: 'Seçmeli: her durumda n(n−1)/2; eklemeli: sıralı dizide n−1. İkisi de Θ(n²) ortalama.' }
  ];
})(window.OSLab = window.OSLab || {});
