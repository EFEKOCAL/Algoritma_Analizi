# Algoritma Analizi Lab

Algoritma Analizi ve Tasarımı dersinin vize konularını **önce teori, sonra laboratuvar** düzeninde çalıştıran tek sayfalık web uygulaması. Saf HTML, CSS ve JavaScript ile yazıldı; kurulum ya da dış kütüphane gerektirmez.

**Canlı site:** https://efekocal.github.io/Algoritma_Analizi/

## Kapsam (vize)

Vize: **algoritma_analizi_H1_H2**, **Algoritma Performansı**, **Kaba Kuvvet Algoritmaları** ve **Azalt ve Fethet Algoritmaları** PDF'leri.

| Bölüm | Konu | Kaynak |
|---|---|---|
| H1 | Algoritma, EBOB (Euclid, ardışık tamsayı, asal çarpanlar), Eratosthenes, tasarım ve analiz süreci | H1_H2 s. 1–20 |
| H2 | Problem türleri: sıralama (kararlılık, yerinde), arama, string, graf, kombinasyonel, geometrik, nümerik | H1_H2 s. 21–34 |
| H3 | Analiz çerçevesi, temel işlem, T(N) sayma, döngü örnekleri, özyinelemesiz analiz | H1_H2, Algoritma Performansı |
| H4 | En iyi / en kötü / ortalama durum, sıralı aramanın C_avg türetmesi | H1_H2 s. 43–48 |
| H5 | O, Ω, Θ, sadeleştirme, verimlilik sınıfları, limit yöntemi | H1_H2 s. 60–82, Performans |
| H6 | Kaba kuvvet: selection, bubble, gözcülü arama, string eşleme, en yakın çift, konveks gövde, etraflı arama (TSP, sırt çantası, işe alma), DFS, BFS, lab (postane, Lab 2) | Kaba Kuvvet (tamamı) |
| H7 | Azalt-fethet: üç tip, aⁿ, insertion, topolojik sıralama, Johnson–Trotter, alt küme, ikili arama, lab (sahte para, Rus köylüsü) | Azalt ve Fethet (tamamı) |
| B8 | Böl-fethet: Master teoremi, merge, quick, Lab 1 karşılaştırması — **vize dışı** | Böl Fethet |

H3'teki "Özyinelemeli Algoritmaların Analizi" ve "Hanoi Kuleleri" dersleri de **vize dışı** etiketlidir (Özyinelemeli Analiz PDF'i). Kapsam `js/data/exam-scope.js` dosyasından değiştirilebilir.

## Ders notları

Ders notları İşletim Sistemleri sitesindeki öğrenme döngüsünü izler: tek ekranlık kartlar, okumadan önce düşün sorusu, etkileşimli şekiller, kendini yokla soruları, ardından ilgili laboratuvar. Her bölümün sonunda karışık tekrar, **Hızlı Tekrar** (konu konu tek sayfa), **Zihin Haritası** ve **Hocanın Soruları** (slayt alıştırmaları ve lab soruları, model cevaplı, aralıklı tekrarla) bulunur.

Slaytlardaki hatalar kartlarda ayrıca işaretlenir, örneğin:

- Böl-Fethet s. 15'teki karşılaştırma tablosunda Merge ve Quick sort'un en kötü durumları yer değiştirmiş (doğrusu: Merge O(n log n), Quick O(n²)).
- Bubble sort'un en iyi durumu O(n) yalnızca bayraklı (erken çıkışlı) sürümde geçerlidir; slayttaki sözde kod her durumda n(n−1)/2 karşılaştırma yapar.
- H1_H2 s. 45: en iyi durum için "maksimum" değil "minimum" karşılaştırma.

## Laboratuvarlar

| # | Modül | İçerik |
|---|---|---|
| L1 | **Sıralama Laboratuvarı** | Beş algoritmayı slayttaki sözde kodla adım adım izleme (karşılaştırma / yer değiştirme sayaçları, rastgele, sıralı, ters sıralı, slayt dizisi) · aynı girdide beşinin karşılaştırması · **Lab 1 süre ölçümü**: 10 → 1.000.000 eleman, 5 tekrar, ortalama ms, süre sınırı aşan O(n²) testlerinin atlanması, log-log grafik, CSV kopyalama |
| L2 | **Büyüme Derecesi** | Büyüme tablosu ve log ölçekli grafik · döngü sayacı (Performans örnek 1–9) · c ve n₀ ile O / Ω / Θ tanımını sınama · limit yöntemiyle karşılaştırma (slayt alıştırmaları) |
| L3 | **Gezgin Satıcı** | Lab 2 grafı ve slayt örneği üzerinde etraflı arama: her sıralama tek tek denenir, kenarı olmayanlar elenir. Kipler: 4 şehirlik yol, 4 şehirlik devre, Hamilton devresi |

Her modülün sağ alt köşesinde **Bilgi & Sınav paneli** vardır (`I` tuşu).

## Kullanım

- **Online:** canlı site bağlantısını aç.
- **Yerelde:** depoyu indir ve `index.html` dosyasına çift tıkla. Sunucu gerekmez.

İlerleme yalnızca tarayıcının localStorage'ında saklanır.

## Hocanın yeni sorularını eklemek

`js/data/teacher-questions.js` dosyasında listenin sonuna yeni bir nesne eklemek yeterli; dosyanın başında şablon var. Hoca bir konuyu vize dışı bırakırsa `js/data/exam-scope.js` dosyasına eklenir.

## Dosya yapısı

```
index.html, style.css (tema), algo.css (şekil ve lab stilleri)
js/app.js                 yönlendirme, menü, Bilgi & Sınav paneli
js/algos.js               sıralama algoritmaları: adım izleri ve hızlı sürümler
js/data/lessons-ch*.js    haftalık ders notları
js/data/*.js              hoca soruları, bölüm girişleri, tekrar planı, zihin haritası
js/views/learn-view.js    ders kartları, tekrar, hoca soruları
js/views/diagrams*.js     etkileşimli şekiller (diagrams-algo2.js: kaba kuvvet ve azalt-fethet)
js/views/sorting-view.js  L1 · growth-view.js L2 · tsp-view.js L3
```
