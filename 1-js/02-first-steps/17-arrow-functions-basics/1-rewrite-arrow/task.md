
# Rewrite with arrow functions

Ganti Expresi Fungsi dengan fungsi panah dalam kode berikut:

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```
