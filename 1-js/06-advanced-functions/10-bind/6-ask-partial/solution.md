

1. Funakan fungsi pembungkus, lebih jelasnya gunakanlah fungsi arrow:

    ```js 
    askPassword(() => user.login(true), () => user.login(false)); 
    ```

    Sekarang fungsi `user dapat diambil dari variabel luar dan dijalankan dengan normal.

2. Atau buat sebuah fungsi mini dari `user.login` yang menggunakan `user` sebagai konteksnya dan yang mana mempunyai argumen pertama yang benar:


    ```js 
    askPassword(user.login.bind(user, true), user.login.bind(user, false)); 
    ```
