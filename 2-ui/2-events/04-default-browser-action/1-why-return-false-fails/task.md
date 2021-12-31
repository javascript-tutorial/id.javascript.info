importance: 3

---

# Mengapa "return false" tidak berfungsi?

Kenapa pada kode dibawah `return false` tidak berfungsi sama sekali?

```html autorun run
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">browser akan membuka w3.org</a>
```

_browser_ akan mengikuti URL yang di klik, tapi kita tidak mau hal itu terjadi.

Bagaimana cara memperbaikinya?
