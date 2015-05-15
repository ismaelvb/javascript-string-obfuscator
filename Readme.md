# Javascript String Obfuscator

Use this module to convert strings to the equivalent Javascript expression that evaluate to the same strings.
The generated expressions only use characters from the list [(){}\[\]+!]
These syntatic characters are enough to create some words. The available characters are abcdefijlnorstuO<space>[]

# example

You can use it directly after import to convert a string.

obf = require("javascript-string-obfuscator");

console.log(obf("obfuscator"));

// ((\[\]+{})\[+!+\[\]\]+(\[\]+{})\[!+\[\]+!+\[\]\]+(\[\]+!\[\])[+\[\]]+(\[\]+\[\]\[\[\]\])\[+\[\]\]+(\[\]+!\[\])[!+\[\]+!+\[\]+!+\[\]\]+(\[\]+!\[\]+{})\[+!+\[\]+\[+\[\]\]\]+(\[\]+!\[\])\[+!+\[\]\]+(\[\]+!+!\[\])\[+\[\]\]+(\[\]+{})\[+!+\[\]\]+(\[\]+!+!\[\])\[+!+\[\]\])


Licenced under MIT licence, free of charge.

(c) 2015 - Ismael Vilas Boas
