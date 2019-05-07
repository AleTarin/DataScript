const semanticCube = [
  [ /* int */
    [ /* int */
      0, /* '+ PLUS' */
      0, /* '- MINUS' */
      0, /* '* TIMES' */
      0, /* '/ DIVIDE' */  
      0, /* '% REST' */
      0, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      3, /* '> GREATER' */
      3, /* '>= GREATER_EQUAL' */
      3, /* '< LESSER' */
      3, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ /* float */
      1, /* '+ PLUS' */
      1, /* '- MINUS' */
      1, /* '* TIMES' */
      1, /* '/ DIVIDE' */  
      1, /* '% REST' */
      0, /* = ASSIGN */,
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      3, /* '> GREATER' */
      3, /* '>= GREATER_EQUAL' */
      3, /* '< LESSER' */
      3, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // string
      2, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // bool
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // null
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // NaN
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      3, /* '> GREATER' */
      3, /* '>= GREATER_EQUAL' */
      3, /* '< LESSER' */
      3, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
  ],
  [ /* float */
    [ // int
      1, /* '+ PLUS' */
      1, /* '- MINUS' */
      1, /* '* TIMES' */
      1, /* '/ DIVIDE' */  
      1, /* '% REST' */
      1, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      3, /* '> GREATER' */
      3, /* '>= GREATER_EQUAL' */
      3, /* '< LESSER' */
      3, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // float
      1, /* '+ PLUS' */
      1, /* '- MINUS' */
      1, /* '* TIMES' */
      1, /* '/ DIVIDE' */  
      1, /* '% REST' */
      1, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      3, /* '> GREATER' */
      3, /* '>= GREATER_EQUAL' */
      3, /* '< LESSER' */
      3, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // string 
      2, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // bool
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      1, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // null 
      6, /* '= ASSIGN' */
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      1, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // NaN 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      1, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      3, /* '> GREATER' */
      3, /* '>= GREATER_EQUAL' */
      3, /* '< LESSER' */
      3, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
  ],
  [ /* string */
    [ // int
      2, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      2, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // float
      2, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      2, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // string 
      2, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      2, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // bool 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      2, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // null 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      4, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // NaN 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
  ],
  [ /* bool */
    [ // int
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // float
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // string 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // bool 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      3, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      3, /* '&& AND' */
      3, /* '|| OR'*/
    ],
    [ // null 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      4, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ //  NaN 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
  ],
  [ /* null */
    [ // int
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // float
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // bool 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // null 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      4, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ //  NaN 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ]
  ],
  [ // NaN
    [ // int
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      3, /* '> GREATER' */
      3, /* '>= GREATER_EQUAL' */
      3, /* '< LESSER' */
      3, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // float
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      3, /* '> GREATER' */
      3, /* '>= GREATER_EQUAL' */
      3, /* '< LESSER' */
      3, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // string 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // bool 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      6, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ // null 
      6, /* '+ PLUS' */
      6, /* '- MINUS' */
      6, /* '* TIMES' */
      6, /* '/ DIVIDE' */  
      6, /* '% REST' */
      4, /* = ASSIGN */
      3, /* '=== DEEP_EQUAL' */
      3, /* '== EQUAL' */
      3, /* '!== DEEP_DIFF' */
      3, /* '!= DIFF' */
      6, /* '> GREATER' */
      6, /* '>= GREATER_EQUAL' */
      6, /* '< LESSER' */
      6, /* '<= LESSER_EQUAL' */
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
    [ //  NaN 
      6, /* '+ PLUS' 0*/ 
      6, /* '- MINUS' 1*/
      6, /* '* TIMES' 2*/ 
      6, /* '/ DIVIDE' 3*/  
      6, /* '% REST' 4*/
      6, /* = ASSIGN 5*/
      3, /* '=== DEEP_EQUAL' 6*/ 
      3, /* '== EQUAL' 7*/ 
      3, /* '!== DEEP_DIFF' 8 */
      3, /* '!= DIFF' 9*/
      6, /* '> GREATER' 10*/
      6, /* '>= GREATER_EQUAL' 11*/
      6, /* '< LESSER'  12*/
      6, /* '<= LESSER_EQUAL' 13*/
      6, /* '&& AND' */
      6, /* '|| OR'*/
    ],
  ]
]
const operatations = {
  "+": 0, /* '+ PLUS' */
  "-": 1, /* '- MINUS' */
  "*": 2, /* '* TIMES' */
  "/": 3, /* '/ DIVIDE' */  
  "%": 4, /* '% REST' */
  "=": 5 /* Assign */,
  "===": 6, /* '=== DEEP_EQUAL' */
  "==":  7, /* '== EQUAL' */
  "!==": 8, /* '!== DEEP_DIFF' */
  "!=":  9, /* '!= DIFF' */
  ">":   10, /* '> GREATER' */
  ">=":  11, /* '>= GREATER_EQUAL' */
  "<":   12, /* '< LESSER' */
  "<=":  13, /* '<= LESSER_EQUAL' */
  "&&":  14,
  "||":  15,
  
  "GOTO": 16,
  "GOTOF": 17,

  "ENDPROC": 18,
  "RETURN": 19,
  "ERA": 20,
  "GOSUB": 21,
  "PARAMETER": 22,
  "VER": 23,

  "STDEV": 30,
  "MAX": 31,
  "MIN": 32,
  "RANGE": 33,
  "VARIANCE": 34,
  "MEAN": 35,
  "SETPARAM":39,
  "SETVECTOR":40,
  "MEAN": 41,
  "NORMALPDF": 42,
  "NORMALCDF": 43,
  "BINOMIALPDF": 44,
  "BINOMIALCDF": 45,
  "UNIFORMPDF": 46,
  "UNIFORMCDF": 47,
  "PRINT": 51,
  "READLINE": 52,
};
const types  = {
  "int": 0 , 
  "float": 1, 
  "string": 2, 
  "bool": 3, 
  "null": 4,   
  "NaN": 5, 
  "x": 6,
  "void": 7
};

const findCube = (t1=4, t2=4, op) => semanticCube[t1][t2][op];
const findOp = op => operatations[op];
const findType = t => types[t];
exports.findCube = findCube;
exports.findOp = findOp
exports.findType = findType;

