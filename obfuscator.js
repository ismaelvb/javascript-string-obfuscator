// This module provides a regular mean to convert strings to
// Javascript Expressions that evaluate on the same strings.
// the expressions generated only use characters from the list 
//      (){}[]~-+! 
// in JS these syntatic characters are enough to create words.
// the available characters are abcdefijlnorstuNO<space>[]-
// inspired by http://stackoverflow.com/questions/7202157
// licenced under MIT license, free of charge.
// (c) 2015 - Ismael Vilas Boas

module.exports = (function(){

  // shorthand for array.slice
  var slice = Array.prototype.slice

  // core concatenation character
  ,   concat = "+"

  // emoty string
  ,   empty = ""
  
  //  concats a list of strings joining them with "+" and adds parenthesis around it
  ,   parenthesis = function(){return "(" + slice.call(arguments).join(concat) + ")"}
  
  //  converts a number in a javascript valid expression that evaluates to the number
  ,   digit = function(digit){
          // wrap with digit concatenation only if the current digit is not the first (idx > 0)
          var wrapper = function(str, idx){return idx ? "[" + str + "]" : str};
          // separate by digits and merge the expression for each digit
          return wrapper((empty + digit).split(empty).map(function(n,i){
              return wrapper( 
                  // join the expression that increments, n times
                  new Array( +n + 1 ).join(1).split(empty)
                    .map(function(){return '-~'}).join(empty) +
                (n > 0 ? empty : concat ) + "[]"
              ,i);
            }).join(concat),1);
          }

  // translates an object in format { character : [baseKeyword, relevantIndex]}
  // into {character: <valid Javascript expression that evaluates to the character>}
  ,   translator = function(t){
        var r = {};
        for(var key in t){
          r[key]= t[key][0] + digit(t[key][1]);
        }
        return r;
      }
  // wraps a set of strings given into their valid concatenated JavaScript expression
  ,   stringWrapper = function(){
        var args = slice.call(arguments);
        args.unshift(str);
        return parenthesis.apply(this,args)
      }
  // core string prefix expression
  ,   str = "[]"

  // core false expression
  ,   cfalse = "![]"

  // core true expression 
  ,   ctrue = "!+" + cfalse

  // core object expression
  ,   cobject = "{}"

  // core undefined expression
  ,   cundefined = "[][[]]"

  // core NaN expression
  ,   cnan = "-" + cobject

  // core minus 1
  ,   cneg = "~" + str

  // word "false"
  ,   wfalse = stringWrapper(cfalse)

  // word "true"
  ,   wtrue = stringWrapper(ctrue)
  
  // word "[object Object]"
  ,   wobject = stringWrapper(cobject)

  // word "NaN"
  ,   wnan = stringWrapper(cnan,str)

  // word "-1"
  ,   wneg = stringWrapper(cneg)

  // word "undefined"
  ,   wundefined = stringWrapper(cundefined)

  // word "falseundefined"
  ,   wfalseundefined = stringWrapper(cfalse,cundefined)

  // word "false[object Object]"
  ,   wfalseobject = stringWrapper(cfalse,cobject)

  // word "true[object Object]"
  ,   wtrueobject = stringWrapper(ctrue,cobject)

  // main translation object {character: "<expression that generates character>"}
  ,   characterDictionary = translator({
      /*char : [keyword         , index ] */
        a    : [wfalse          , 1     ],
        b    : [wobject         , 2     ],
        c    : [wfalseobject    , 10    ],
        d    : [wundefined      , 2     ],
        e    : [wtrue           , 3     ],
        f    : [wfalse          , 0     ],
        //g    :  (not available)
        //h    :  (not available)
        i    : [wfalseundefined , 10    ],
        j    : [wobject         , 3     ],
        //k    :  (not available)
        l    : [wfalse          , 2     ],
        //m    :  (not available) 
        n    : [wundefined      , 1     ],
        o    : [wobject         , 1     ],
        //p    :  (not available) 
        //q    :  (not available) 
        r    : [wtrue           , 1     ],
        s    : [wfalse          , 3     ],
        t    : [wtrue           , 0     ],
        u    : [wundefined      , 0     ],
        //v    :  (not available) 
        //w    :  (not available)
        //x    :  (not available)
        //y    :  (not available) 
        //z    :  (not available)
        N    : [wnan            , 0     ],
        O    : [wtrueobject     , 12    ],
        ' '  : [wtrueobject     , 11    ],
        '['  : [wobject         , 0     ],
        ']'  : [wobject         , 14    ],
        '-'  : [wneg            , 0     ]
      })

  // translates a single character to its javascript string equivalent expression
  ,   singleChar = function(character){
      // Tries to translate: digit | regular character | lowercase | throw exception
        return /\d/.test(character) && digit(character)
          || characterDictionary[character] 
          || characterDictionary[character.toLowerCase()] 
          || !function(){throw("'" + character + "' is not translatable")}()
      }
  ;   

  // converts a given string into a valid Javascript expression that evaluates to it
  return function(a){
    // split string by characters, converts them and joins with concat operator
    return a.split(empty).map(singleChar).join(concat);
  }
})();