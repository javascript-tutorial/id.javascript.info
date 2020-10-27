Ada banyak cara untuk melakukan ini.

Ini adalah salah satu caranya:

```js
// 1. The table with `id="age-table"` (1. tabel dengan `id="age-table"`).
let table = document.getElementById('age-table')

// 2. All label elements inside that table (2. Semua elemen label di dalam tabel).
table.getElementsByTagName('label')
// or 
document.querySelectorAll('#age-table label')

// 3. The first td in that table (with the word "Age") (3. elemen td pertama pada tabel (dengan kata "Age")).
table.rows[0].cells[0]
// or
table.getElementsByTagName('td')[0]
// or
table.querySelector('td')

// 4. The form with the name "search" (Formulir dengan nama "search").
// assuming there's only one element with name="search" in the document (mengasumsikan hanya ada satu elemen dengan nama="search" di dalam dokumen).
let form = document.getElementsByName('search')[0]
// or, form specifically (atau, khususnya formulir).
document.querySelector('form[name="search"]')

// 5. The first input in that form (elemen input pertama pada formulir).
form.getElementsByTagName('input')[0]
// or
form.querySelector('input')

// 6. The last input in that form (elemen input terakhir pada formulir).
let inputs = form.querySelectorAll('input') // find all inputs (mencari semua elemen input).
inputs[inputs.length-1] // take the last one (mengambil elemen input terakhir).
```
