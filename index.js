var obf = require('./obfuscator');

// Word to be processed (first script argument or default "translated")
var word = process.argv[2] || "translated";

// print to console
console.log(
  "console.log(\"" + word + " => \" + " + 
  "(" + obf(word) + ")" 
  + " )"
);
