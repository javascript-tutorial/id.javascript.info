# Konsol pengembang

Yang namanya kode selalu rentan error. Mudah sekali bagimu bikin error... Benar kan? Kamu *tidak akan pernah* luput dari error, itu karena kamu manusia, bukan [robot](https://en.wikipedia.org/wiki/Bender_(Futurama)).

Tapi di dalam peramban, error tidak terlihat ke pengguna secara default. Jadi, kalau ada yang salah di script, itu tidak kelihatan mata kita dan kita sudah memperbaiki itu.

Supaya bisa melihat error dan memperoleh informasi berfaedah lainnya dari script, "tools pengembang" ditanamkan di dalam peramban.

Kebanyakan pengembang memakai Chrome atau Firefox untuk pengembangan karena tools pengembangan yang mereka punya paling mantap. Peramban lain punya juga koq, ada with special features, but are usually playing "catch-up" to Chrome or Firefox. So most developers have a "favorite" browser and switch to others if a problem is browser-specific.

Tools pengembang mengandung faedah; mereka punya banyak fitur. Untuk memulainya, kita akan belajar cara membuka mereka, mencari error, dan menjalankan perintah JavaScript.

## Google Chrome

Open the page [bug.html](bug.html).

There's an error in the JavaScript code on it. It's hidden from a regular visitor's eyes, so let's open developer tools to see it.

Press `key:F12` or, if you're on Mac, then `key:Cmd+Opt+J`.

The developer tools will open on the Console tab by default.

It looks somewhat like this:

![chrome](chrome.png)

The exact look of developer tools depends on your version of Chrome. It changes from time to time but should be similar.

- Here we can see the red-colored error message. In this case, the script contains an unknown "lalala" command.
- On the right, there is a clickable link to the source `bug.html:12` with the line number where the error has occurred.

Below the error message, there is a blue `>` symbol. It marks a "command line" where we can type JavaScript commands. Press `key:Enter` to run them (`key:Shift+Enter` to input multi-line commands).

Now we can see errors, and that's enough for a start. We'll come back to developer tools later and cover debugging more in-depth in the chapter <info:debugging-chrome>.


## Firefox, Edge, and others

Most other browsers use `key:F12` to open developer tools.

The look & feel of them is quite similar. Once you know how to use one of these tools (you can start with Chrome), you can easily switch to another.

## Safari

Safari (Mac browser, not supported by Windows/Linux) is a little bit special here. We need to enable the "Develop menu" first.

Open Preferences and go to the "Advanced" pane. There's a checkbox at the bottom:

![safari](safari.png)

Now `key:Cmd+Opt+C` can toggle the console. Also, note that the new top menu item named "Develop" has appeared. It has many commands and options.

## Multi-line input

Usually, when we put a line of code into the console, and then press `key:Enter`, it executes.

To insert multiple lines, press `key:Shift+Enter`.

## Summary

- Developer tools allow us to see errors, run commands, examine variables, and much more.
- They can be opened with `key:F12` for most browsers on Windows. Chrome for Mac needs `key:Cmd+Opt+J`, Safari: `key:Cmd+Opt+C` (need to enable first).

Now we have the environment ready. In the next section, we'll get down to JavaScript.
