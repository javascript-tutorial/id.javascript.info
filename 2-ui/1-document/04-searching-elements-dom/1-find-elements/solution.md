Ada banyak cara untuk melakukannya.

Ini adalah salah satu caranya:

```js
// 1. tabel dengan `id="age-table"`.
let table = document.getElementById('age-table')

// 2. Semua elemen label di dalam tabel.
table.getElementsByTagName('label')
// or 
document.querySelectorAll('#age-table label')

// 3. elemen td pertama pada tabel (dengan kata "Age").
table.rows[0].cells[0]
// atau
table.getElementsByTagName('td')[0]
// atau
table.querySelector('td')

// 4. Formulir dengan nama "search".
// mengasumsikan hanya ada satu elemen dengan nama="search" di dalam dokumen.
let form = document.getElementsByName('search')[0]
// atau, khususnya formulir.
document.querySelector('form[name="search"]')

// 5. Elemen input pertama pada formulir.
form.getElementsByTagName('input')[0]
// atau
form.querySelector('input')

// 6. Elemen input terakhir pada formulir.
let inputs = form.querySelectorAll('input') // mencari semua elemen input.
inputs[inputs.length-1] // mengambil elemen input terakhir.
```
