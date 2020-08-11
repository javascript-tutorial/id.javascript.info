Metode `date.getDay()` mengembalikan angka dari hari dalam satu minggu, dimulai dari Minggu.

Buat array hari dalam seminggu, sehingga kita bisa mendapatkan nama yang sesuai dengan angkanya:

```js run demo
function getWeekDay(date) {
  let days = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert( getWeekDay(date) ); // JUM
```
