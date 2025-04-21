function Generate-RandomPassword {
    Add-Type -AssemblyName System.Web
    return [System.Web.Security.Membership]::GeneratePassword(12, 3)
}

$UserName = "khabib"
$FullName = "Khabib Shahverdiyev"
$Email = "khabibshv@gmail.com"
$Password = Generate-RandomPassword
$OU = "OU=Users,DC=mazarina,DC=local"
$GroupName = "IT"

New-ADUser `
    -Name $FullName `
    -SamAccountName $UserName `
    -UserPrincipalName "$UserName@mazarina.local" `
    -Path $OU `
    -AccountPassword (ConvertTo-SecureString $Password -AsPlainText -Force) `
    -Enabled $true `
    -ChangePasswordAtLogon $true `
    -GivenName "Khabib" `
    -Surname "Shahverdiyev" `
    -DisplayName $FullName

Add-ADGroupMember -Identity $GroupName -Members $UserName

Send-MailMessage `
    -To $Email `
    -From "admin@mazarina.local" `
    -Subject "Yeni istifadəçi hesabınız" `
    -Body "Salam $FullName, sizin istifadəçi hesabınız yaradıldı. İstifadəçi adı: $UserName, Müvəqqəti şifrə: $Password. Zəhmət olmasa ilk girişdə dəyişin." `
    -SmtpServer "smtp.mazarina.local"
