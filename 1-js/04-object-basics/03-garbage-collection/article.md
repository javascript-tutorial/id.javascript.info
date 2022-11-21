# Pengumpulan sampah (_Garbage collection_)

Manajemen memori di JavaScript dilakukan secara otomatis dan tak terlihat oleh kita. Kita membuat _primitive_, objek, fungsi... Semua yang membutuhkan memori.

Apa yang terjadi ketika sesuatu yang telah kita buat tersebut sudah tidak diperlukan? Bagaimana _engine_ JavaScript menemukan dan membersihkannya?

## Keterjangkauan (_Reachability_)

Konsep utama manajemen memori di JavaScript ialah *keterjangkauan*.

Sederhananya, sebuah nilai yang "terjangkau" adalah mereka yang masih dapat diakses atau dapat digunakan. Mereka dapat dipastikan tersimpan di memori.

1. Ada sekumpulan nilai-nilai yang terjangkau secara inheren, yang tak dapat dihapus untuk alasan yang jelas.

    Contohnya:

    - Variabel lokal dan parameter-parameter dari fungsi (yang di eksekusi) saat ini.
    - Variabel-variabel dan parameter-parameter dari fungsi-fungsi lain yang terkait dengan rantai panggilan bersarang saat ini.
    - Variabel-variabel global.
    - (ada beberapa hal lain, yang internal juga)

    Nilai-nilai tadi disebut *roots*.

2. Nilai lainnya dianggap terjangkau jika dapat dijangkau dari sebuah _root_ melalui sebuah rujukkan atau rantai rujukkan.

    Contoh, jika terdapat sebuah objek didalam global variabel, dan objek tersebut memiliki sebuah properti yang mereferensi objek lain, objek itu dianggap dapat dijangkau. Dan referensinya juga bisa dijangkau. Contoh lengkap dibawah ini.

Ada sebuah _background process_ di _engine_ JavaScript yang disebut [garbage collector](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)). Ia mengamati seluruh objek dan menyingkirkan semua yang sudah tak terjangkau.

## Contoh Sederhana

Berikut adalah contoh paling sederhana:

```js
// user memiliki rujukkan terhadap objek
let user = {
  name: "John"
};
```

![](memory-user-john.svg)

Tanda panah disini menggambarkan sebuah rujukkan objek. Variabel global `"user"` merujuk objek `{name: "John"}` (kita sebut John supaya singkat). _Property_ `"name"` dari objek John menyimpan sebuah _primitive_, jadi itu disematkan di dalam objek.

Jika nilai dari `user` ditimpa, maka rujukkannya hilang:

```js
user = null;
```

![](memory-user-john-lost.svg)

Sekarang John menjadi tak terjangkau. Tak ada cara untuk mengaksesnya, tak ada rujukkan terhadapnya. _Garbage collector_ akan membuang data tersebut and membebaskan memori.

## Dua rujukkan

Sekarang bayangkan kita menyalin rujukkan dari `user` ke `admin`:

```js
// user memiliki rujukkan terhadap objek
let user = {
  name: "John"
};

*!*
let admin = user;
*/!*
```

![](memory-user-john-admin.svg)

Sekarang jika kita melakukan hal yang sama:
```js
user = null;
```

<<<<<<< HEAD
...Maka objek "John" tersebut masih bisa dijangkau lewat variabel global `admin`, jadi masih ada di memori. Jika kita menimpa `admin` juga, barulah dapat dihilangkan.
=======
...Then the object is still reachable via `admin` global variable, so it must stay in memory. If we overwrite `admin` too, then it can be removed.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

## Objek-objek yang saling terkait

Sekarang contoh yang lebih kompleks. Keluarga:

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```

Fungsi `marry` "mengawinkan" dua objek dengan memberikan keduanya rujukkan satu sama lain dan mengembalikan sebuah objek baru yang berisikan kedua objek tersebut.

Hasil struktur memorinya ialah :

![](family.svg)

Disini, semua objek terjangkau.

Sekarang mari hapus dua rujukkan:

```js
delete family.father;
delete family.mother.husband;
```

![](family-delete-refs.svg)

Tak cukup hanya dengan menghapus salah satu dari dua rujukkan tersebut, karena semua objek masih bisa dijangkau.

Tetapi jika kita menghapus keduanya, maka dapat kita lihat bahwa John tak lagi memiliki objek yang merujukkannya:

![](family-no-father.svg)

Rujukkan keluar (_outgoing reference_) tidak masalah. Hanya rujukkan masuk (_incoming reference_) yang dapat membuat sebuah objek terjangkau. Jadi, sekarang John tak terjangkau dan akan dihapus dari memori bersama semua datanya yang juga tak dapat diakses.

Setelah _garbage collection_:

![](family-no-father-2.svg)

## Pulau tak terjangkau

Mungkin saja satu kumpulan (pulau) objek yang saling tertaut menjadi tak terjangkau dan dihapus dari memori.

Objeknya sama seperti diatas. Kemudian:

```js
family = null;
```

Gambaran _in-memory_-nya menjadi:

![](family-no-family.svg)

Contoh ini menunjukkan bagaimana pentingnya konsep keterjangkauan (_reachability_).

Sudah jelas bahwa John dan Ann masih tertaut, keduanya memiliki rujukkan masuk. Tapi itu saja tak cukup.

Objek `"family"` diatas telah menjadi tak terhubung dengan _root_, tak ada lagi rujukkan terhadapnya, sehingga keseluruhan pulau kumpulan objek tersebut menjadi tak terjangkau dan akan dihapus.

## Algoritma internal

Algoritma _garbage collection_ dasar disebut _"mark-and-sweep"_.

Langkah _"garbage collection"_ berikut dilakukan secara teratur:

- _Garbage collector_ mengambil objek _roots_ dan "menandai" (_marks_ / mengingat) mereka.
- Kemudian ia mendatangi dan "menandai" semua rujukkannya.
- Kemudian ia mendatangi objek yang telah ditandai tersebut dan menandai rujukkan *mereka*. Semua objek yang telah dikunjungi akan diingat, agar nantinya tidak mengunjungi objek yang sama dua kali.
- ...Dan seterusnya sampai semua rujukkan yang dapat dijangkau (dari _roots_) telah dikunjungi.
- Semua objek kecuali yang ditandai akan dihapus.

Contohnya, semisal kita memiliki struktur objek seperti berikut:

![](garbage-collection-1.svg)

Dapat kita lihat dengan jelas "pulau tak terjangkau" di sisi kanan. Sekarang mari kita lihat bagaimana _"mark-and-sweep" garbage collector_ berurusan dengannya.

Langkah pertama menandai _roots_-nya:

![](garbage-collection-2.svg)

<<<<<<< HEAD
Kemudian rujukkannya ditandai:

![](garbage-collection-3.svg)

...Dan kemudian rujukkan dalamnya juga, jika masih ada:
=======
Then we follow their references and mark referenced objects:

![](garbage-collection-3.svg)

...And continue to follow further references, while possible:
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

![](garbage-collection-4.svg)

Sekarang objek-objek yang tak dapat dikunjungi selama proses berlangsung dianggap tak terjangkau (_unreachable_) dan akan dihapus:

![](garbage-collection-5.svg)

Kita juga bisa membayangkan proses tersebut sebagai menumpahkan ember cat dari _roots_, yang mengalir ke semua rujukkan dan menandai semua objek yang terjangkau. Yang tidak tertandai akan dihapus.

<<<<<<< HEAD
Itu merupakan konsep dari bagaimana cara kerja _garbage collection_. _Engines_ JavaScript menerapkan banyak optimisasi untuk membuatnya berjalan lebih cepat dan tanpa mempengaruhi eksekusi.
=======
That's the concept of how garbage collection works. JavaScript engines apply many optimizations to make it run faster and not introduce any delays into the code execution.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

Beberapa optimisasi:

<<<<<<< HEAD
- **Generational collection** -- objek-objek dibagi kedalam dua set: "yang baru" dan "yang lama". Kebanyakan objek muncul, melakukan tugasnya dan mati dengan cepat, mereka dapat dibersihkan secara agresif. Mereka yang bertahan cukup lama, akan menjadi "yang lama" dan tak akan sering diperiksa.
- **Incremental collection** -- Jika terdapat banyak objek-objek, dan kita mencoba menapaki sambil menandai keseluruhan set objek sekaligus, itu dapat memakan waktu dan menimbulkan keterlambatan yang terlihat dalam eksekusi. Jadi _engine_ akan mencoba untuk memecah proses _garbage collection_ menjadi bagian-bagian kecil. Kemudian bagian-bagian kecil tersebut akan dieksekusi satu-persatu, secara terpisah. Itu memerlukan pencatatan ekstra diantara mereka untuk melacak perubahan, tetapi jadinya kta hanya mengalami keterlambatan kecil yang banyak daripada satuan yang besar.
- **Idle-time collection** -- _garbage collector_ akan mencoba untuk jalan hanya ketika _CPU_ sedang _idle_, untuk mengurangi kemungkinan efek pada eksekusi.
=======
- **Generational collection** -- objects are split into two sets: "new ones" and "old ones". In typical code, many objects have a short life span: they appear, do their job and die fast, so it makes sense to track new objects and clear the memory from them if that's the case. Those that survive for long enough, become "old" and are examined less often.
- **Incremental collection** -- if there are many objects, and we try to walk and mark the whole object set at once, it may take some time and introduce visible delays in the execution. So the engine splits the whole set of existing objects into multiple parts. And then clear these parts one after another. There are many small garbage collections instead of a total one. That requires some extra bookkeeping between them to track changes, but we get many tiny delays instead of a big one.
- **Idle-time collection** -- the garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

Terdapat optimisasi-optimisasi dan tipe-tipe lain dari algoritma _garbage collection_. Sebesar apapun keinginan untuk menjelaskannya disini, harus kutahan, karena _engines_ yang berbeda mengimplementasikan teknik dan _tweaks_ yang berbeda pula. Dan, yang lebih penting, hal-hal tersebut akan berubah seiring dengan pengembangan _engine_, jadi mempelajarinya lebih dalam "di awal", tanpa kebutuhan yang berarti mungkin akan sia-sia. Kecuali, tentu saja, jika itu merupakan murni masalah ketertarikan, maka ada beberapa tautan untukmu dibawah.

## Ringkasan

Hal utama yang perlu diketahui:

<<<<<<< HEAD
- Pengumpulan sampah (_Garbage collection_) dilakukan secara otomatis. Kita tidak bisa memaksa ataupun mencegahnya.
- Objek-objek dipertahankan dalam memori selagi mereka terjangkau (_reachable_).
- Menjadi yang dirujuk tidak sama dengan menjadi terjangkau (dari sebuah _root_): sekumpulan objek yang saling terkait dapat menjadi tak terjangkau sebagai keseluruhan.
=======
- Garbage collection is performed automatically. We cannot force or prevent it.
- Objects are retained in memory while they are reachable.
- Being referenced is not the same as being reachable (from a root): a pack of interlinked objects can become unreachable as a whole, as we've seen in the example above.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

_Engine_ modern mengimplementasikan algoritma  _garbage collection_ canggih (_advance_).

Buku "The Garbage Collection Handbook: The Art of Automatic Memory Management" (R. Jones et al) mencakup beberapanya.

<<<<<<< HEAD
Jika kamu familiar dengan pemrograman _low-level_, informasi mendalam tentang _garbage collector_ V8 terdapat pada artikel [A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

[V8 blog](https://v8.dev/) juga mempublikasikan artikel-artikel tentang ubahan-ubahan dalam manajemen memori dari waktu ke waktu. Tentu saja, untuk belajar proses _garbage collection_, kamu lebih baik mempersiapkan diri dengan belajar tentang _internals_ V8 secara umum dan membaca blog [Vyacheslav Egorov](http://mrale.ph) yang merupakan salah seorang _engineer_ V8. Saya bilang: "V8", karena merupakan yang paling komprehensif di _cover_ oleh artikel-artikel di internet. Untuk _engine_ lainnya, pendekatannya kebanyakan mirip-mirip, tetapi _garbage collection_ berbeda dalam banyak aspek.

Pengetahuan mendalam mengenai _engines_ itu bagus ketika membutuhkan optimisasi _low-level_. Tapi akan lebih bijak untuk merencanakan itu sebagai langkah selanjutnya setelah kamu akrab dengan bahasanya (JavaScript).  
=======
If you are familiar with low-level programming, more detailed information about V8's garbage collector is in the article [A tour of V8: Garbage Collection](https://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

The [V8 blog](https://v8.dev/) also publishes articles about changes in memory management from time to time. Naturally, to learn more about garbage collection, you'd better prepare by learning about V8 internals in general and read the blog of [Vyacheslav Egorov](https://mrale.ph) who worked as one of the V8 engineers. I'm saying: "V8", because it is best covered by articles on the internet. For other engines, many approaches are similar, but garbage collection differs in many aspects.

In-depth knowledge of engines is good when you need low-level optimizations. It would be wise to plan that as the next step after you're familiar with the language.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0
