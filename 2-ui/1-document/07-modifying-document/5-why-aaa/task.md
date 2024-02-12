Tingkat kepentingan: 1

---

# Mengapa "aaa" masih ada?

Pada contoh di bawah, panggilan `table.remove()` menghapus tabel dari dokumen.

Tetapi jika anda menjalankannya, anda dapat melihat bahwa teks `"aaa"` masih terlihat.

Mengapa hal itu terjadi?

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // tabel, sebagaimana mestinya

  table.remove();
  // mengapa masih ada "aaa" di dokumen?
</script>
```
