#Uzmanın profilinden randevu seçimi

kullanıcı - uzmanın profiline git
sistem - uzmanın profil sayfasını görüntüle - lokasyon ve bilgiler - yetkinlikleri - takvimi - mesaj ilet

kullanıcı - yapılacak işlemi veya işlemleri seç - [kesim, boya, manikür, ağda, kaş şekillendirme, fön, perma, röfle]
sistem - seçilen işlemlere ortalama timeCost belirle

kullanıcı - istenen randevu saatini seç
kullanıcı - istek gönder
sistem - bir engel yoksa uzmana bildirim gönder (uygulama içi bildirim -> telefona)

uzman - kabul ederse
uzman - tahmini bitiş saati belirle
uzman - kullanıcıya gönderilmek istenen bir mesaj varsa ekle
sistem - ayrılan zaman dilimini database'de güncelle
sistem - istenen zamanın ayrıldığını uzmana bildir
sistem - istenen zamanın ayrıldığını kullanıcıya bildir

uzman - reddederse
sistem - "alternatif zamana yönlendirmek ister misin?" diye sor
uzman - evet seçerse - alternatif zaman seçtir
sistem - uzmana reddetme gerekçesini sor
_ o zaman diliminde müsait olmayacağım
_ bir önceki rezervasyon sarkacak
_ vs.
_ other
sistem - kullanıcıya istenen zamanın müsait olmadığı bildirimini gönder
sistem - gerekçe ve alternatif zaman dilimini bildir ve onay iste
uzman - hayır seçerse
sistem - kullanıcıya randevunun kabul edilmediğini bildir

kullanıcı - zaman dilimi uygunsa kabul et
sistem - uzmana zaman aralığının kabul edildiğini bildirim gönder
kullanıcı - zaman dilimi uygun değilse reddet ve farklı bir zaman dilimi seçip ilet
uzman - kabul ederse
uzman - tahmini bitiş saati belirle
.
.
.

---

database - rezerve zamanlar
backend - tüm zamanlar - rezerve zamanlar
