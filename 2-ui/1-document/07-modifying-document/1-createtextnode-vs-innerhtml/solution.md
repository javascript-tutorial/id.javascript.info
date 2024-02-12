Jawabannya: **1 dan 3**.

Kedua perintah tersebut mengakibatkan penambahan `text` 'sebagai teks' ke dalam `elem`

Berikut adalah contohnya:

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = "<b>text</b>";

  elem1.append(document.createTextNode(text));
  elem2.innerHTML = text;
  elem3.textContent = text;
</script>
```
