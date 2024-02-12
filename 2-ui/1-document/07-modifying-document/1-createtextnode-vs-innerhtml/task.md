Tingkat kepentingan: 5

---

# createTextNode vs innerHTML vs textContent

Kita memiliki elemen DOM kosong `elem` dan sebuah string `text`.

Di antara 3 perintah ini, mana yang akan melakukan hal yang sama?

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
