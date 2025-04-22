# User
PowerShell ilə Active Directory-də istifadəçi hesabının avtomatik yaradılması + SMTP ilə şifrə göndərilməsi

Skript aşağıdakı 5 funksiyanı yerinə yetirir:
1.	Random (təsadüfi) şifrə yaradır
•	Şifrə kompleksdir və təhlükəsizlik siyasətlərinə uyğundur.
2.	Yeni istifadəçi yaradır (məsələn, Khabib Shahverdiyev)
•	New-ADUser vasitəsilə AD-də tam məlumatlı istifadəçi hesabı yaradılır.
3.	İstifadəçini “IT” adlı qrupa əlavə edir
•	Bu, ona lazım olan resurslara və icazələrə giriş verir.
4.	İlk girişdə şifrəni dəyişmək məcburidir
•	ChangePasswordAtLogon = $true təyin olunur.
5.	Müvəqqəti şifrə e-poçt vasitəsilə göndərilir
•	Send-MailMessage ilə istifadəçinin e-mail ünvanına giriş məlumatları çatdırılır.
