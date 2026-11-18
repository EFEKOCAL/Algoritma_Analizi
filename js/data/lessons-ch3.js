/*
 * lessons-ch3.js — 3. hafta: Algoritma etkinliği ve analiz yöntemleri.
 * Kaynaklar: H1-H2 s. 35–42 ve 49–59, Algoritma Performansı.pdf, Özyinelemeli Algoritmaların Matematiksel Analizi.pdf
 */
(function (OSLab) {
  'use strict';

  OSLab.lessons = OSLab.lessons || { chapters: [] };

  OSLab.lessons.chapters.push({
    id: 'ch3',
    num: 3,
    title: 'Etkinlik ve Analiz Yöntemleri',
    en: 'Efficiency and analysis methods',
    source: 'H1-H2, Algoritma Performansı, Özyinelemeli Analiz',
    objectives: [
      'Analiz çerçevesinin dört öğesini saymak',
      'Girdi büyüklüğünü ve temel işlemi doğru seçmek',
      'T(n) ≈ c_op·C(n) formülüyle hızlı bilgisayar ve büyük girdi sorularını çözmek',
      'Bir kod parçasının toplam işlem sayısını T(N) olarak satır satır saymak',
      'İç içe, ard arda ve logaritmik döngülerin karmaşıklığını toplam sembolüyle bulmak',
      'Özyinelemeli olmayan algoritmalar için 5 adımlı analiz planını uygulamak',
      'Özyineleme ilişkisi kurup geriye doğru yerine koyma ile çözmek',
      'Hanoi kuleleri hamle sayısının 2ⁿ − 1 olduğunu göstermek'
    ],
    lessons: [
      {
        id: 'cerceve',
        title: 'Analiz Çerçevesi ve Temel İşlem',
        en: 'Analysis framework',
        src: 'H1-H2 s. 35–42',
        minutes: 9,
        lab: { preset: { module: 'growth', tab: 'table' } },
        blocks: [
          { t: 'h', text: 'Neye bakılır?' },
          { t: 'list', items: [
            '<b>Doğruluk</b> (correctness)',
            '<b>Zaman verimliliği</b> (time efficiency): algoritma ne kadar hızlı çalışır',
            '<b>Bellek alanı verimliliği</b> (space efficiency): ne kadar ek bellek ister. Gelişen donanımla artık çok önemli sayılmıyor.',
            '<b>Uygunluk, en iyilik</b> (optimality)'
          ] },
          { t: 'p', html: 'Analiz çerçevesinin dört öğesi: <b>girdi büyüklüğünün ölçülmesi</b>, <b>çalışma zamanı ölçü biriminin belirlenmesi</b>, <b>büyüme derecesi</b>, <b>en kötü / en iyi / ortalama durum</b> değerlendirmeleri.' },
          { t: 'h', text: 'Girdi büyüklüğünün ölçülmesi' },
          { t: 'p', html: 'Tüm algoritmalar büyük girdide daha uzun çalışır. Bu yüzden algoritmaya girilen veriyi gösteren <b>n</b> değeri seçilmelidir.' },
          { t: 'table', head: ['Problem', 'n nedir?'], rows: [
            ['Arama, sıralama, eleman sayma', 'Kolay: dizideki eleman sayısı'],
            ['İki matrisin çarpımı', 'Belirsiz: matrisin derecesi mi, eleman sayısı mı?'],
            ['Yazım hatası denetleyen program', 'Belirsiz: karakter sayısı mı, kelime sayısı mı?'],
            ['Onluk sayının ikili basamak sayısı', 'Sayının büyüklüğü n (ya da bit sayısı b = ⌊log₂n⌋+1)']
          ] },
          { t: 'h', text: 'Çalışma zamanı ölçü birimi' },
          { t: 'p', html: 'Saniye iyi bir ölçü değildir; çalışma süresi <b>bilgisayarın hızına</b>, <b>programın kalitesine</b> ve <b>derleyiciye</b> bağlıdır. Dış etkenlerden bağımsız bir ölçü gerekir:' },
          { t: 'compare', cols: [
            { title: 'Tüm işlemleri saymak', items: ['Algoritmadaki her işlemin kaç kez yapıldığını sayar', 'Zor ve gereksiz'] },
            { title: 'Temel işlemi saymak ✓', items: ['Algoritmanın <b>temel işlemi</b> belirlenir', 'Yalnızca onun kaç kez yapıldığı sayılır'] }
          ] },
          { t: 'def', term: 'Temel işlem', en: 'Basic operation', html: 'Algoritma çalışırken <b>en çok gerçekleştirilen</b> işlem; genellikle <b>en iç döngüdeki</b> işlemdir. Sıralamada <b>karşılaştırma</b>; matematiksel işlemlerde genellikle dört işlem (en uzunu bölme, sonra çarpma, toplama ve çıkarma).' },
          { t: 'h', text: 'T(n) ≈ c_op · C(n)' },
          { t: 'table', head: ['Sembol', 'Anlamı'], rows: [
            ['c_op', 'Temel işlemin o bilgisayardaki çalışma süresi'],
            ['C(n)', 'Temel işlemin gerçekleşme sayısı'],
            ['T(n)', 'Programın çalışma süresi ≈ c_op · C(n) (yaklaşık, tahmini bir değer)']
          ] },
          { t: 'solve', title: 'Slayt 41', q: 'Program 10 kat hızlı bir bilgisayarda çalıştırılırsa ne kadar hızlı sonuç alınır? C(n) = ½·n(n−1) ise girdi iki katına çıkınca çalışma süresi ne kadar artar?', a: '<b>10 kat hızlı</b>: c_op 10\'da birine iner, T(n) de 10 kat azalır.<br><b>Girdi 2 katı</b>: C(n) = ½n(n−1) = ½n² − ½n ≈ ½n². T(2n)/T(n) ≈ c_op·½(2n)² / (c_op·½n²) = <b>4</b>. c_op sadeleşir: sonucu bilgisayarın hızı değil, <b>büyüme derecesi</b> belirler.' },
          { t: 'h', text: 'Büyüme derecesi' },
          { t: 'p', html: 'Küçük girdilerle bir algoritmanın etkinliğini değerlendirmek sağlıklı değildir; fark <b>büyük n</b>\'de ortaya çıkar. Slayt 42\'deki tablo:' },
          { t: 'table', head: ['n', 'log₂n', 'n', 'n·log₂n', 'n²', 'n³', '2ⁿ', 'n!'], rows: [
            ['10', '3,3', '10¹', '3,3·10¹', '10²', '10³', '10³', '3,6·10⁶'],
            ['10²', '6,6', '10²', '6,6·10²', '10⁴', '10⁶', '1,3·10³⁰', '9,3·10¹⁵⁷'],
            ['10³', '10', '10³', '1,0·10⁴', '10⁶', '10⁹', '', ''],
            ['10⁴', '13', '10⁴', '1,3·10⁵', '10⁸', '10¹²', '', ''],
            ['10⁵', '17', '10⁵', '1,7·10⁶', '10¹⁰', '10¹⁵', '', ''],
            ['10⁶', '20', '10⁶', '2,0·10⁷', '10¹²', '10¹⁸', '', '']
          ] },
          { t: 'note', kind: 'exam', html: '2ⁿ ve n! sütunlarının boş kalması tesadüf değil: n = 100 için 2¹⁰⁰ ≈ 1,3·10³⁰ işlem bile pratikte <b>hiçbir bilgisayarın bitiremeyeceği</b> kadar büyüktür.' }
        ],
        checks: [
          { q: 'Çalışma süresini saniyeyle ölçmek neden uygun değildir?', a: 'Süre bilgisayarın hızına, programın kalitesine ve derleyiciye bağlıdır. Bu dış etkenlerden bağımsız olmak için temel işlemin kaç kez yapıldığı sayılır.' },
          { q: 'C(n) = n(n−1)/2 olan bir algoritmada girdi 2 katına çıkarsa süre kaç katına çıkar?', a: 'Yaklaşık 4 katına: T(2n)/T(n) ≈ ½(2n)² / ½n² = 4.' },
          { q: 'Sıralama algoritmalarında temel işlem genellikle hangisidir?', a: 'Anahtar karşılaştırması.' }
        ]
      },
      {
        id: 'tn',
        title: 'T(N) Hesaplama ve Döngü Örnekleri',
        en: 'Counting operations',
        src: 'Algoritma Performansı s. 1–25',
        minutes: 12,
        lab: { preset: { module: 'growth', tab: 'loops' } },
        blocks: [
          { t: 'h', text: 'Performans neyle ölçülür?' },
          { t: 'p', html: 'Performans metrikleri: <b>gerekli bellek alanı</b> ve <b>çalışma süresi</b>. Çalışma süresi en çok kullanılan standarttır: ölçülebilir, karşılaştırması kolaydır ve <b>girdi sayısının bir fonksiyonudur</b>. Süre milisaniye olarak değil, problemin boyutuna (N) bağlı bir <b>f(N)</b> fonksiyonuyla ifade edilir.' },
          { t: 'h', text: 'Üç algoritma: 1 + 2 + … + n' },
          { t: 'dg', id: 'tn-abc' },
          { t: 'note', kind: 'info', html: 'T(N) <b>çalışma süresidir</b> (tam işlem sayısı). O(f(N)) ise <b>asimptotik karmaşıklıktır</b>: N büyürken T(N)\'nin nasıl değiştiğini gösterir, kaç milisaniye süreceğini göstermez.' },
          { t: 'h', text: 'Satır satır sayma: ortalama fonksiyonu' },
          { t: 'codex', title: 'float Avg(int A[], int N)  →  T(N) = 3N + 7', rows: [
            ['float ort, tot = 0;\nint i;', '<code>tot=0</code>: 1 kez'],
            ['for (i = 0; i < N; i++)', '<code>i=0</code>: 1 · <code>i&lt;N</code>: <b>N+1</b> (son kontrol yanlış çıkar) · <code>i++</code>: N'],
            ['    tot = tot + A[i];', 'N kez'],
            ['if (N > 0)', '1 kez'],
            ['    ort = (float)tot / N;', 'tür dönüşümü 1 + bölme 1'],
            ['return ort;', '1 kez · <b>Toplam: 1+1+(N+1)+N+N+1+1+1+1 = 3N + 7</b>']
          ] },
          { t: 'note', kind: 'exam', html: 'Döngü koşulu gövdeden <b>1 kez fazla</b> çalışır (N+1): son kontrolde koşul yanlış çıkar ve döngüden çıkılır. Sınavda en sık kaçırılan nokta budur.' },
          { t: 'h', text: 'Döngü kalıpları' },
          { t: 'p', html: 'Aşağıdaki örneklerde soru hep aynı: <code>myfunc()</code> kaç kez çağrılır? Her kalıba tıkla.' },
          { t: 'dg', id: 'loops' },
          { t: 'note', kind: 'exam', html: 'Kurallar: <b>iç içe</b> döngülerin sayıları <b>çarpılır</b>; <b>ard arda</b> döngülerinki <b>toplanır</b> ve büyük olan kalır; sayaç <b>2 ile çarpılıyor/bölünüyorsa</b> döngü <b>log₂N</b> kez döner.' },
          { t: 'h', text: 'Örnek 10: Faktöriyel' },
          { t: 'compare', cols: [
            { title: 'İteratif', items: ['<code>fact = 1; for (i = 2; i &lt;= n; i++) fact *= i;</code>', 'n − 1 çarpma → <b>O(N)</b>'] },
            { title: 'Rekürsif', items: ['<code>return n * factorial(n − 1);</code>', 'Her çağrıda 1 çarpma, n − 1 çağrı → <b>O(N)</b>'] }
          ] },
          { t: 'p', html: 'İki çözümün karmaşıklığı aynıdır. Rekürsif çözümün analizi 5. derste özyineleme ilişkisiyle yapılır.' }
        ],
        checks: [
          { q: '<code>for (i = 1; i &lt;= N; i *= 2) myfunc();</code> döngüsünde myfunc kaç kez çağrılır?', a: 'i = 1, 2, 4, …, 2ᵏ ≤ N → ⌊log₂N⌋ + 1 kez; O(log₂N).' },
          { q: '<code>for i = 1..N { for j = 1..i myfunc(); }</code> kaç çağrı yapar?', a: '1 + 2 + … + N = N(N+1)/2 → O(N²).' },
          { q: '<code>for i = 1..N { for j = 1; j ≤ M; j *= 2 myfunc(); }</code> karmaşıklığı nedir?', a: 'Dış döngü N, iç döngü log₂M → N·log₂M → O(N log M).' },
          { q: '<code>for (i = 1; i &lt;= N*N; i++) for (j = 1; j &lt;= N*N*N; j++) myfunc();</code> karmaşıklığı?', a: 'N²·N³ = N⁵ → O(N⁵).' },
          { q: 'Bir döngünün koşul ifadesi, döngü gövdesinden neden bir fazla çalışır?', a: 'Son kontrolde koşul yanlış çıkar ve döngüden çıkılır; bu kontrol de sayılır (N kez gövde, N+1 kez koşul).' }
        ]
      },
      {
        id: 'ozyineli-olmayan',
        title: 'Özyinelemeli Olmayan Algoritmaların Analizi',
        en: 'Nonrecursive algorithms',
        src: 'H1-H2 s. 49–59',
        minutes: 12,
        blocks: [
          { t: 'h', text: '5 adımlı genel plan' },
          { t: 'list', ordered: true, items: [
            'Girdi büyüklüğünü gösteren parametreyi belirle.',
            'Algoritmanın <b>temel işlemini</b> belirle.',
            'Temel işlemin sayısı yalnızca n\'ye mi bağlı? Başka parametrelere de bağlıysa <b>en kötü, en iyi, ortalama</b> durumları ayrı incele.',
            'Temel işlemin kaç kez yapıldığını bir <b>toplam (Σ) formülüyle</b> yaz.',
            'Toplam formülünü <b>büyüme derecesini</b> gösterecek forma dönüştür (kapalı form, sonra Θ).'
          ] },
          { t: 'h', text: 'Sık kullanılan toplam formülleri' },
          { t: 'table', head: ['Toplam', 'Sonuç'], rows: [
            ['Σᵢ₌ₗᵘ 1', 'u − l + 1  (Σᵢ₌₁ⁿ 1 = n)'],
            ['Σᵢ₌₁ⁿ i = 1 + 2 + … + n', 'n(n+1)/2 ≈ ½n²'],
            ['Σᵢ₌₁ⁿ i²', 'n(n+1)(2n+1)/6 ≈ ⅓n³'],
            ['Σᵢ₌₁ⁿ iᵏ', '≈ nᵏ⁺¹/(k+1)'],
            ['Σᵢ₌₀ⁿ aⁱ', '(aⁿ⁺¹ − 1)/(a − 1), a ≠ 1;  Σ 2ⁱ = 2ⁿ⁺¹ − 1'],
            ['Σᵢ₌₁ⁿ 1/i', '≈ ln n + γ (γ ≈ 0,5772)'],
            ['Σᵢ₌₁ⁿ lg i', '≈ n lg n'],
            ['Σ c·aᵢ  /  Σ (aᵢ ± bᵢ)', 'c·Σ aᵢ  /  Σ aᵢ ± Σ bᵢ']
          ] },
          { t: 'h', text: 'Örnek 1: En büyük elemanı bulma' },
          { t: 'codex', title: 'MaxElement(A[0..n−1])', rows: [
            ['maxval ← A[0]', ''],
            ['for i ← 1 to n − 1 do', 'Döngü n − 1 tur döner'],
            ['    if A[i] > maxval', '<b>Temel işlem: karşılaştırma</b>, her turda 1 kez. (Atama her turda yapılmaz, temel işlem olamaz.)'],
            ['        maxval ← A[i]', ''],
            ['return maxval', '<b>C(n) = Σᵢ₌₁ⁿ⁻¹ 1 = n − 1 ∈ Θ(n)</b>']
          ] },
          { t: 'p', html: 'Tüm elemanlar her zaman karşılaştırıldığı için en iyi / en kötü / ortalama durum ayrımı <b>yoktur</b>.' },
          { t: 'h', text: 'Örnek 2: Dizi elemanlarının eşsizliği' },
          { t: 'codex', title: 'UniqueElements(A[0..n−1])', rows: [
            ['for i ← 0 to n − 2 do', ''],
            ['    for j ← i + 1 to n − 1 do', 'İç döngü her i için (n − 1 − i) tur'],
            ['        if A[i] = A[j] return false', '<b>Temel işlem: karşılaştırma</b>'],
            ['return true', '']
          ] },
          { t: 'p', html: 'Karşılaştırma sayısı yalnızca n\'ye değil, <b>eşit eleman olup olmamasına</b> da bağlıdır: eşit çift erken bulunursa algoritma durur. Bu yüzden <b>en kötü duruma</b> göre incelenir. En kötü durum: dizide eşit eleman <b>yoksa</b> ya da eşit olanlar <b>son iki eleman</b> ise.' },
          { t: 'code', text: 'C_worst(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌ᵢ₊₁ⁿ⁻¹ 1 = Σᵢ₌₀ⁿ⁻² (n − 1 − i)\n           = (n−1) + (n−2) + … + 1 = (n − 1)n / 2 ≈ ½n² ∈ Θ(n²)' },
          { t: 'h', text: 'Örnek 3: n×n matris çarpımı' },
          { t: 'codex', title: 'MatrixMultiplication(A, B)', rows: [
            ['for i ← 0 to n − 1 do\n  for j ← 0 to n − 1 do', ''],
            ['    C[i,j] ← 0.0\n    for k ← 0 to n − 1 do', 'En iç döngü n tur'],
            ['      C[i,j] ← C[i,j] + A[i,k]·B[k,j]', 'Toplama ve çarpma her turda 1 kez; birini seçmek yeterli: <b>çarpma</b>'],
            ['return C', '<b>M(n) = Σᵢ Σⱼ Σₖ 1 = Σᵢ Σⱼ n = Σᵢ n² = n³</b>']
          ] },
          { t: 'p', html: 'Girdi büyüklüğü matrisin <b>derecesi n</b>. Tüm elemanlar için işlem yapıldığından durum ayrımı gerekmez.' },
          { t: 'h', text: 'Örnek 4: Onluk sayının ikili basamak sayısı' },
          { t: 'codex', title: 'Binary(n)', rows: [
            ['count ← 1', ''],
            ['while n > 1 do', '<b>Temel işlem: bu karşılaştırma.</b> Döngünün içinde değil; gövdenin çalışıp çalışmayacağını belirler, bu yüzden gövdeden <b>1 fazla</b> yapılır.'],
            ['    count ← count + 1\n    n ← ⌊n/2⌋', 'n her turda yarıya iner'],
            ['return count', 'Karşılaştırma <b>⌊log₂n⌋ + 1</b> kez → Θ(log n)']
          ] },
          { t: 'note', kind: 'info', html: 'Bu tür "yarıya bölerek ilerleyen" algoritmaların incelenmesi <b>özyinelemeli</b> yazıldığında daha sağlıklı yapılır (bkz. sonraki ders).' }
        ],
        checks: [
          { q: 'Özyinelemeli olmayan algoritma analizinin 5 adımını sayın.', a: '1) Girdi büyüklüğü parametresi, 2) temel işlem, 3) sayı başka parametreye bağlıysa en kötü/iyi/ortalama durum, 4) temel işlem sayısının toplam formülü, 5) toplamın büyüme derecesine dönüştürülmesi.' },
          { q: 'UniqueElements algoritmasının en kötü durumdaki karşılaştırma sayısı nedir?', a: 'Σᵢ₌₀ⁿ⁻² (n−1−i) = n(n−1)/2 ∈ Θ(n²).' },
          { q: 'MaxElement algoritmasında neden atama değil karşılaştırma temel işlemdir?', a: 'Karşılaştırma her turda yapılır; atama yalnızca daha büyük eleman bulunduğunda yapılır.' },
          { q: 'n×n matris çarpımında çarpma sayısı M(n) kaçtır?', a: 'M(n) = Σ Σ Σ 1 = n³.' }
        ]
      },
      {
        id: 'ozyineli',
        title: 'Özyinelemeli Algoritmaların Analizi',
        en: 'Recursive algorithms',
        src: 'Özyinelemeli Analiz s. 1–13',
        minutes: 12,
        blocks: [
          { t: 'h', text: 'n! örneği' },
          { t: 'codex', title: 'F(n): n! değerini özyinelemeli hesaplar', rows: [
            ['if n = 0 return 1', 'Durma koşulu: çarpma yok'],
            ['else return F(n − 1) · n', 'F(n−1) için M(n−1) çarpma, sonucu n ile çarpmak için 1 çarpma']
          ] },
          { t: 'p', html: 'Temel işlem <b>çarpma</b>, M(n) = çarpma sayısı:' },
          { t: 'code', text: 'M(n) = M(n − 1) + 1   (n > 0)\nM(0) = 0             (çağrılar n = 0\'da durur, çarpma yapılmaz)' },
          { t: 'def', term: 'Özyineleme ilişkisi', en: 'Recurrence relation', html: 'M(n)\'yi doğrudan n\'nin fonksiyonu olarak değil, <b>(n−1)\'deki değerine bağlı olarak dolaylı</b> tanımlayan denklem. Bu ilişkiyi sağlayan birden çok seri olabilir; birini belirlemek için <b>başlangıç koşulu</b> gerekir. Başlangıç koşulu, özyinelemeyi bitiren satır (<code>if n = 0 return 1</code>) incelenerek bulunur.' },
          { t: 'h', text: 'Geriye doğru yerine koyma' },
          { t: 'p', html: '<b>Backward substitution</b>: M(n−1)\'i kendi formülüyle değiştir, örüntüyü bul, başlangıç koşuluna kadar götür.' },
          { t: 'code', text: 'M(n) = M(n−1) + 1\n     = [M(n−2) + 1] + 1 = M(n−2) + 2\n     = [M(n−3) + 1] + 2 = M(n−3) + 3\n     = …\n     = M(n−i) + i                     (örüntü)\n     = M(n−n) + n = M(0) + n = n      (i = n)' },
          { t: 'h', text: 'Özyinelemeli analizin 5 adımlı planı' },
          { t: 'list', ordered: true, items: [
            'Girdi büyüklüğü parametresini belirle.',
            'Temel işlemi belirle.',
            'Aynı büyüklükteki girdilerde sayı değişiyorsa en kötü, en iyi, ortalama durumu incele.',
            'Temel işlemin sayısını bir <b>özyineleme ilişkisi</b> ve başlangıç koşuluyla yaz.',
            'Özyinelemeyi <b>çöz</b> ve büyüme derecesini bul.'
          ] },
          { t: 'note', kind: 'exam', html: 'Özyinelemeli olmayan planla tek fark 4. ve 5. adımdadır: <b>toplam formülü</b> yerine <b>özyineleme ilişkisi</b> kurulur ve çözülür.' },
          { t: 'h', text: 'Çözümlü örnekler' },
          { t: 'dg', id: 'recurrences' },
          { t: 'h', text: 'Örnek: küplerin toplamı' },
          { t: 'codex', title: 'S(n) = 1³ + 2³ + … + n³', rows: [
            ['if n = 1 return 1', ''],
            ['else return S(n − 1) + n * n * n', 'Her çağrıda 2 çarpma']
          ] },
          { t: 'code', text: 'M(n) = M(n−1) + 2,  M(1) = 0\nM(n) = M(n−i) + 2i = M(1) + 2(n−1) = 2(n − 1) ∈ Θ(n)' }
        ],
        checks: [
          { q: 'x(n) = x(n−1) + 5, x(1) = 0 özyinelemesini çözün.', a: 'x(n) = x(n−i) + 5i; i = n−1 → x(1) + 5(n−1) = 5(n−1).' },
          { q: 'x(n) = 3x(n−1), x(1) = 4 özyinelemesini çözün.', a: 'x(n) = 3ⁱ x(n−i); i = n−1 → 3ⁿ⁻¹ x(1) = 4·3ⁿ⁻¹.' },
          { q: 'x(n) = x(n−1) + n, x(0) = 0 özyinelemesini çözün.', a: 'x(n) = x(0) + 1 + 2 + … + n = n(n+1)/2.' },
          { q: 'x(n) = x(n/2) + n, x(1) = 1 (n = 2ᵏ) özyinelemesini çözün.', a: 'x(2ᵏ) = x(1) + 2¹ + 2² + … + 2ᵏ = 1 + 2 + … + 2ᵏ = 2ᵏ⁺¹ − 1 = 2n − 1.' },
          { q: 'x(n) = x(n/3) + 1, x(1) = 1 (n = 3ᵏ) özyinelemesini çözün.', a: 'x(3ᵏ) = x(3ᵏ⁻ⁱ) + i; i = k → x(1) + k = 1 + log₃n.' },
          { q: 'Özyinelemeli faktöriyelde M(n) ilişkisi ve başlangıç koşulu nedir? Çözümü?', a: 'M(n) = M(n−1) + 1, M(0) = 0. Geriye doğru yerine koymayla M(n) = n.' }
        ]
      },
      {
        id: 'hanoi',
        title: 'Hanoi Kuleleri',
        en: 'Tower of Hanoi',
        src: 'Özyinelemeli Analiz s. 14–17',
        minutes: 7,
        blocks: [
          { t: 'h', text: 'Bulmaca' },
          { t: 'list', items: [
            'Farklı büyüklüklerde n disk 1. çubukta büyükten küçüğe dizili',
            'Hepsi 3. çubuğa <b>aynı sırayla</b> taşınacak',
            'Her seferinde <b>bir disk</b> hareket ettirilir',
            '<b>Büyük disk küçük diskin üzerine gelemez</b>'
          ] },
          { t: 'h', text: 'Özyinelemeli çözüm' },
          { t: 'list', ordered: true, items: [
            'Önce n − 1 disk Ç1\'den Ç2\'ye özyinelemeli taşınır (Ç3 yardımcı).',
            'En büyük (n.) disk Ç1\'den Ç3\'e taşınır.',
            'Son olarak n − 1 disk Ç2\'den Ç3\'e özyinelemeli taşınır (Ç1 yardımcı).',
            'n = 1 ise tek hamleyle biter.'
          ] },
          { t: 'dg', id: 'hanoi' },
          { t: 'h', text: 'Hamle sayısı' },
          { t: 'p', html: 'Girdi büyüklüğü disk sayısı n, temel işlem bir disk hamlesi:' },
          { t: 'code', text: 'M(n) = M(n−1) + 1 + M(n−1) = 2M(n−1) + 1   (n > 1)\nM(1) = 1' },
          { t: 'code', text: 'M(n) = 2M(n−1) + 1\n     = 2[2M(n−2) + 1] + 1 = 2²M(n−2) + 2 + 1\n     = 2²[2M(n−3) + 1] + 2 + 1 = 2³M(n−3) + 2² + 2 + 1\n     = …\n     = 2ⁱM(n−i) + 2ⁱ⁻¹ + … + 2 + 1 = 2ⁱM(n−i) + 2ⁱ − 1\n i = n−1:  2ⁿ⁻¹M(1) + 2ⁿ⁻¹ − 1 = 2ⁿ − 1' },
          { t: 'note', kind: 'exam', html: '<b>M(n) = 2ⁿ − 1 ∈ Θ(2ⁿ)</b>: büyüme derecesi <b>üsseldir</b>. Büyük n için çok uzun sürer; ama bu, algoritmanın <b>kötü olduğunu göstermez</b>: problemin kendisi en az 2ⁿ − 1 hamle gerektirir.' }
        ],
        checks: [
          { q: 'Hanoi kuleleri için özyineleme ilişkisi ve çözümü nedir?', a: 'M(n) = 2M(n−1) + 1, M(1) = 1. Geriye doğru yerine koymayla M(n) = 2ⁿ − 1 ∈ Θ(2ⁿ).' },
          { q: '4 diskli Hanoi kaç hamlede çözülür?', a: '2⁴ − 1 = 15 hamle.' }
        ]
      }
    ]
  });
})(window.OSLab = window.OSLab || {});
