/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var compiler = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[2,6],$V1=[1,8],$V2=[2,20],$V3=[1,10],$V4=[2,9],$V5=[1,13],$V6=[1,21],$V7=[10,15,32,50,55,114,115,116,124,126],$V8=[1,27],$V9=[1,28],$Va=[1,29],$Vb=[1,30],$Vc=[15,50,55,114,115,116,124,126],$Vd=[1,38],$Ve=[2,15],$Vf=[1,40],$Vg=[20,23,26,36,48],$Vh=[1,60],$Vi=[2,40],$Vj=[1,59],$Vk=[1,65],$Vl=[1,64],$Vm=[1,61],$Vn=[1,67],$Vo=[1,68],$Vp=[1,85],$Vq=[1,93],$Vr=[1,86],$Vs=[1,80],$Vt=[1,84],$Vu=[1,83],$Vv=[1,87],$Vw=[1,88],$Vx=[1,89],$Vy=[1,90],$Vz=[1,96],$VA=[20,23,36],$VB=[10,12,32],$VC=[20,23,28,36,77,78,79,80,81,82,83,84,85,86,92,93],$VD=[20,23,28,36,77,78,79,80,81,82,83,84,85,86,92,93,99,100,101],$VE=[15,26,27,104,105,106,107],$VF=[15,26,27,34,92,93,104,105,106,107],$VG=[20,23,28,36,77,78,79,80,81,82,83,84,85,86],$VH=[20,28],$VI=[23,36,85,86],$VJ=[23,36],$VK=[20,23,28,36,66,77,78,79,80,81,82,83,84,85,86,92,93,99,100,101],$VL=[1,191];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"program":3,"PROGRAM":4,"p1":5,"p2":6,"COLON":7,"var":8,"modules":9,"MAIN":10,"block-vars":11,"END":12,"p3":13,"EOF":14,"ID":15,"VAR":16,"var-recursive":17,"var-follow":18,"v3":19,"COMMA":20,"v2":21,"var-index":22,"SEMICOLON":23,"new-structure":24,"type":25,"LBRACKET":26,"CTEI":27,"RBRACKET":28,"structures":29,"VECTOR":30,"DATASET":31,"FUNCTION":32,"module1":33,"LPAREN":34,"params":35,"RPAREN":36,"module4":37,"module2":38,"module3":39,"module-type":40,"VOID":41,"params-recursive":42,"INT":43,"FLOAT":44,"BOOL":45,"STRING":46,"block":47,"LBRACE":48,"block-inside":49,"RBRACE":50,"module5":51,"module6":52,"statement":53,"return-statement":54,"RETURN":55,"exp":56,"array":57,"array-item":58,"assignation":59,"condition":60,"cycle":61,"print":62,"read":63,"call":64,"var-cte-exp":65,"ASSIGN":66,"and-or-expression":67,"expression":68,"exp2":69,"expression-recursive":70,"exp1":71,"expression-op":72,"hexp2":73,"and-or-expression-recursive":74,"hexp1":75,"and-or-expression-op":76,"GREATER":77,"GREATER_EQUAL":78,"LESSER":79,"LESSER_EQUAL":80,"DIFF":81,"DEEP_DIFF":82,"EQUAL":83,"DEEP_EQUAL":84,"AND":85,"OR":86,"term":87,"e2":88,"exp-recursive":89,"e1":90,"exp-op":91,"MINUS":92,"PLUS":93,"factor":94,"t2":95,"term-recursive":96,"t1":97,"term-op":98,"TIMES":99,"REST":100,"DIVIDE":101,"factor-op":102,"var-cte":103,"CTEF":104,"CTES":105,"TRUE":106,"FALSE":107,"call1":108,"call2":109,"call-exp":110,"call5":111,"call3":112,"call4":113,"READLINE":114,"PRINT":115,"IF":116,"cond1":117,"condition-else":118,"cond2":119,"cond3":120,"ELSE":121,"cycle-for":122,"cycle-while":123,"FOREACH":124,"IN":125,"WHILE":126,"while1":127,"while2":128,"while3":129,"$accept":0,"$end":1},
terminals_: {2:"error",4:"PROGRAM",7:"COLON",10:"MAIN",12:"END",14:"EOF",15:"ID",16:"VAR",20:"COMMA",23:"SEMICOLON",26:"LBRACKET",27:"CTEI",28:"RBRACKET",30:"VECTOR",31:"DATASET",32:"FUNCTION",34:"LPAREN",36:"RPAREN",41:"VOID",43:"INT",44:"FLOAT",45:"BOOL",46:"STRING",48:"LBRACE",50:"RBRACE",55:"RETURN",66:"ASSIGN",77:"GREATER",78:"GREATER_EQUAL",79:"LESSER",80:"LESSER_EQUAL",81:"DIFF",82:"DEEP_DIFF",83:"EQUAL",84:"DEEP_EQUAL",85:"AND",86:"OR",92:"MINUS",93:"PLUS",99:"TIMES",100:"REST",101:"DIVIDE",104:"CTEF",105:"CTES",106:"TRUE",107:"FALSE",114:"READLINE",115:"PRINT",116:"IF",121:"ELSE",124:"FOREACH",125:"IN",126:"WHILE"},
productions_: [0,[3,11],[5,0],[6,1],[13,0],[8,3],[8,0],[17,1],[17,3],[17,0],[18,5],[18,4],[21,1],[19,1],[22,4],[22,0],[24,1],[29,1],[29,1],[9,9],[9,0],[33,1],[38,1],[39,1],[37,1],[40,1],[40,1],[35,5],[42,2],[42,0],[25,1],[25,1],[25,1],[25,1],[47,3],[11,6],[52,0],[51,0],[49,2],[49,1],[49,0],[54,3],[57,3],[58,3],[58,1],[53,1],[53,1],[53,1],[53,1],[53,1],[53,2],[59,5],[59,4],[68,3],[70,2],[70,0],[71,1],[69,0],[67,3],[74,2],[74,0],[75,1],[73,0],[72,1],[72,1],[72,1],[72,1],[72,1],[72,1],[72,1],[72,1],[76,1],[76,1],[56,3],[89,2],[89,0],[91,1],[91,1],[90,1],[88,0],[87,3],[96,2],[96,0],[97,1],[95,0],[98,1],[98,1],[98,1],[94,3],[94,2],[94,1],[102,1],[102,1],[102,0],[103,2],[103,1],[103,1],[103,1],[103,1],[103,1],[103,1],[103,1],[103,1],[65,4],[65,0],[64,6],[110,5],[110,1],[108,1],[109,0],[112,0],[113,0],[111,0],[63,7],[62,5],[60,8],[117,0],[119,0],[120,0],[118,3],[118,0],[61,1],[61,1],[122,7],[123,8],[127,0],[128,0],[129,0]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 2:
 yy.parser.createDir() 
break;
case 3:
 yy.parser.setName($$[$0]) 
break;
case 4:
 yy.parser.deleteDir() 
break;
case 12: case 16:
 yy.parser.setType($$[$0]) 
break;
case 13:
 yy.parser.setVars($$[$0]); 
break;
case 21:
 yy.parser.setTable($$[$0]) 
break;
case 22:
 yy.parser.setParams($$[$0]) 
break;
case 23:
 yy.parser.setParamsType($$[$0])
break;
case 24:
 yy.parser.setFunType($$[$0])
break;
case 36:
 yy.parser.deleteFunction(); 
break;
case 37:
 yy.parser.setFunParams()
break;
case 42:
 this.$  = [$$[$0-1]]; 
break;
case 43:
 this.$ = $$[$0-2] + ',' + $$[$0] 
break;
case 44:
 this.$ = $$[$0] 
break;
case 52:
yy.parser.processAssign($$[$0-3], $$[$0-1])
break;
case 56: case 61: case 78: case 83:
 yy.parser.poperPush($$[$0]) 
break;
case 57:
yy.parser.processExp()
break;
case 62:
yy.parser.processHypExp()
break;
case 79:
yy.parser.processTerm()
break;
case 84:
yy.parser.processFactor()
break;
case 95:
yy.parser.addQuadVar($$[$0])
break;
case 96:
yy.parser.addQuadConst($$[$0],'int')
break;
case 97:
yy.parser.addQuadConst($$[$0],'float')
break;
case 98:
yy.parser.addQuadConst($$[$0],'string')
break;
case 99:
yy.parser.addQuadConst($$[$0],'bool')
break;
case 100:
yy.parser.addQuadConst($$[$0], 'bool')
break;
case 108:
 yy.parser.checkProcedure($$[$0]) 
break;
case 109:
 yy.parser.genERA() 
break;
case 110:
 yy.parser.getArgument() 
break;
case 111:
 yy.parser.nextArgument() 
break;
case 112:
 yy.parser.genGOSUB() 
break;
case 116:
yy.parser.processCond()
break;
case 117:
yy.parser.endCond()
break;
case 118:
yy.parser.processElse()
break;
case 125:
 yy.parser.pushJump()
break;
case 126:
 yy.parser.processWhile()
break;
case 127:
 yy.parser.endWhile()
break;
}
},
table: [{3:1,4:[1,2]},{1:[3]},{5:3,15:[2,2]},{6:4,15:[1,5]},{7:[1,6]},{7:[2,3]},o([10,32],$V0,{8:7,16:$V1}),{9:9,10:$V2,32:$V3},{7:$V4,15:$V5,17:11,19:12},{10:[1,14]},{15:[1,16],33:15},{7:[1,18],18:17},{7:[2,7],20:[1,19]},o([7,20],[2,13]),{11:20,48:$V6},{34:[1,22]},{34:[2,21]},o($V7,[2,5]),{21:23,24:24,25:25,29:26,30:[1,31],31:[1,32],43:$V8,44:$V9,45:$Va,46:$Vb},{7:$V4,15:$V5,17:33,19:12},{12:[1,34]},o($Vc,$V0,{8:35,16:$V1}),{15:$Vd,35:36,38:37},{22:39,23:$Ve,26:$Vf},{23:[1,41]},o([23,26],[2,12]),{23:[2,16]},o($Vg,[2,30]),o($Vg,[2,31]),o($Vg,[2,32]),o($Vg,[2,33]),{23:[2,17]},{23:[2,18]},{7:[2,8]},{13:42,14:[2,4]},o($Vc,[2,37],{51:43}),{36:[1,44]},{7:[1,45]},{7:[2,22]},{23:[1,46]},{27:[1,47]},o($V7,$V0,{8:48,16:$V1}),{14:[1,49]},{15:$Vh,49:50,50:$Vi,53:51,54:52,55:$Vj,59:53,60:54,61:55,62:56,63:57,64:58,108:66,114:$Vk,115:$Vl,116:$Vm,122:62,123:63,124:$Vn,126:$Vo},{7:[1,69]},{25:71,39:70,43:$V8,44:$V9,45:$Va,46:$Vb},o($V7,$V0,{8:72,16:$V1}),{28:[1,73]},o($V7,[2,11]),{1:[2,1]},{50:[1,74]},{15:$Vh,49:75,50:$Vi,53:51,54:52,55:$Vj,59:53,60:54,61:55,62:56,63:57,64:58,108:66,114:$Vk,115:$Vl,116:$Vm,122:62,123:63,124:$Vn,126:$Vo},{50:[2,39]},o($Vc,[2,45]),o($Vc,[2,46]),o($Vc,[2,47]),o($Vc,[2,48]),o($Vc,[2,49]),{23:[1,76]},{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:77,57:91,64:92,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},{26:$Vz,34:[2,108],65:94,66:[1,95]},{34:[1,97]},o($Vc,[2,121]),o($Vc,[2,122]),{34:[1,98]},{34:[1,99]},{34:[1,100]},{34:[1,101]},{34:[2,125],127:102},{25:105,37:103,40:104,41:[1,106],43:$V8,44:$V9,45:$Va,46:$Vb},o([20,36],$Ve,{22:107,26:$Vf}),o([20,26,36],[2,23]),o($V7,[2,10]),o($VA,$Ve,{22:108,26:$Vf}),o($VB,[2,36],{52:109}),{50:[2,38]},o($Vc,[2,50]),{23:[1,110]},o($VC,[2,79],{88:111}),o($VD,[2,84],{95:112}),{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:114,57:91,64:92,68:113,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},{15:$Vp,26:$Vq,27:$Vr,57:91,64:92,103:115,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},o($VD,[2,90]),o($VE,[2,91]),o($VE,[2,92]),o([20,23,28,34,36,77,78,79,80,81,82,83,84,85,86,92,93,99,100,101],[2,95],{65:116,26:$Vz}),o($VD,[2,96]),o($VD,[2,97]),o($VD,[2,98]),o($VD,[2,99]),o($VD,[2,100]),o($VD,[2,101]),o($VD,[2,102]),{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:118,57:91,58:117,64:92,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},{66:[1,119]},{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:114,57:91,64:92,67:120,68:121,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:122,57:91,64:92,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:114,57:91,64:92,67:123,68:121,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:124,57:91,64:92,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:125,57:91,64:92,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},o($VF,[2,109],{109:126}),{15:[1,127]},{34:[1,128]},{11:129,48:$V6},{48:[2,24]},{48:[2,25]},{48:[2,26]},{20:[1,131],36:[2,29],42:130},o($VA,[2,14]),o($VB,[2,35]),{50:[2,41]},o($VG,[2,75],{89:132,90:133,91:134,92:[1,135],93:[1,136]}),o($VC,[2,82],{96:137,97:138,98:139,99:[1,140],100:[1,141],101:[1,142]}),{36:[1,143]},o([23,36,77,78,79,80,81,82,83,84,85,86],[2,57],{69:144}),o($VD,[2,89]),o($VD,[2,94]),{20:[1,146],28:[1,145]},o($VH,[2,44]),{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:114,57:91,64:92,67:147,68:121,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},{23:[1,148]},o($VI,[2,62],{73:149}),{28:[1,150]},{36:[1,151]},{36:[1,152]},{20:[1,153]},{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:155,57:91,64:92,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66,110:154},{125:[1,156]},{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:114,57:91,64:92,67:157,68:121,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},{9:158,10:$V2,32:$V3},{36:[2,27]},{15:$Vd,35:159,38:37},o($VG,[2,73]),{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:160,57:91,64:92,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},o($VF,[2,78]),o($VF,[2,76]),o($VF,[2,77]),o($VC,[2,80]),{15:$Vp,26:$Vq,27:$Vr,34:$Vs,57:91,64:92,87:161,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},o($VF,[2,83]),o($VF,[2,85]),o($VF,[2,86]),o($VF,[2,87]),o($VD,[2,88]),o($VI,[2,55],{70:162,71:163,72:164,77:[1,165],78:[1,166],79:[1,167],80:[1,168],81:[1,169],82:[1,170],83:[1,171],84:[1,172]}),o($VD,[2,42]),{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:173,57:91,64:92,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},{23:[1,174]},o($Vc,[2,52]),o($VJ,[2,60],{74:175,75:176,76:177,85:[1,178],86:[1,179]}),o($VK,[2,104],{65:180,26:$Vz}),{48:[2,116],117:181},{23:[1,182]},{15:[1,183]},{36:[1,184]},{20:[2,110],36:[2,107],112:185},{15:[1,186]},{36:[1,187]},{10:[2,19]},{36:[2,28]},o($VG,[2,74]),o($VC,[2,81]),o($VI,[2,53]),{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:114,57:91,64:92,68:188,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},o($VF,[2,56]),o($VF,[2,63]),o($VF,[2,64]),o($VF,[2,65]),o($VF,[2,66]),o($VF,[2,67]),o($VF,[2,68]),o($VF,[2,69]),o($VF,[2,70]),o($VH,[2,43]),o($Vc,[2,51]),o($VJ,[2,58]),{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:114,57:91,64:92,67:189,68:121,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66},o($VF,[2,61]),o($VF,[2,71]),o($VF,[2,72]),o($VK,[2,103]),{47:190,48:$VL},o($Vc,[2,114]),{36:[1,192]},o($VD,[2,112],{111:193}),{20:[1,194]},{36:[1,195]},{48:[2,126],128:196},o($VI,[2,54]),o($VJ,[2,59]),o($Vc,[2,120],{118:197,121:[1,198]}),{15:$Vh,49:199,50:$Vi,53:51,54:52,55:$Vj,59:53,60:54,61:55,62:56,63:57,64:58,108:66,114:$Vk,115:$Vl,116:$Vm,122:62,123:63,124:$Vn,126:$Vo},{23:[1,200]},o($VD,[2,105]),o($VF,[2,111],{113:201}),{47:202,48:$VL},{47:203,48:$VL},o($Vc,[2,117],{119:204}),{48:[2,118],120:205},{50:[1,206]},o($Vc,[2,113]),{15:$Vp,26:$Vq,27:$Vr,34:$Vs,56:155,57:91,64:92,87:78,92:$Vt,93:$Vu,94:79,102:81,103:82,104:$Vv,105:$Vw,106:$Vx,107:$Vy,108:66,110:207},o($Vc,[2,123]),o($Vc,[2,127],{129:208}),o($Vc,[2,115]),{47:209,48:$VL},o([15,50,55,114,115,116,121,124,126],[2,34]),{36:[2,106]},o($Vc,[2,124]),o($Vc,[2,119])],
defaultActions: {5:[2,3],16:[2,21],26:[2,16],31:[2,17],32:[2,18],33:[2,8],38:[2,22],49:[2,1],52:[2,39],75:[2,38],104:[2,24],105:[2,25],106:[2,26],110:[2,41],130:[2,27],158:[2,19],159:[2,28],207:[2,106]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};


var actions = require('./actions');
const { 
  createDir, deleteDir, setName,
  setVars, setType, setTable,
  addQuadVar, addQuadConst, poperPush,
  processTerm, processAssign, processFactor, 
  processExp, processHypExp, 
  processCond, endCond, processElse,
  pushJump, processWhile, endWhile,
  deleteFunction, setFunType, setFunParams,
  setParams, setParamsType,
  checkProcedure, genERA, getArgument, nextArgument, genGOSUB
} = actions;

parser.createDir         = _                 => createDir();
parser.setName           = NAME              => setName(NAME);
parser.deleteDir         = _                 => deleteDir();
parser.setVars           = ID                => setVars(ID);
parser.setType           = TYPE              => setType(TYPE);
parser.setTable          = ID                 => setTable(ID);
parser.addQuadVar        = ID                => addQuadVar(ID);
parser.addQuadConst      = (DATA, TYPE)      => addQuadConst(DATA, TYPE);
parser.poperPush         = OP                => poperPush(OP);
parser.processTerm       = _                 => processTerm();
parser.processFactor     = _                 => processFactor();
parser.processAssign     = ID                => processAssign(ID);
parser.processExp        = _                 => processExp();
parser.processHypExp     = _                 => processHypExp();
parser.processCond       = _                 => processCond();
parser.endCond           = _                 => endCond();
parser.processElse       = _                 => processElse();
parser.pushJump          = _                 => pushJump();
parser.processWhile      = _                 => processWhile();
parser.endWhile          = _                 => endWhile();
parser.setFunType        = TYPE              => setFunType(TYPE);
parser.deleteFunction    = _                 => deleteFunction();
parser.setFunParams      = _                 => setFunParams();
parser.setParams         = ID                => setParams(ID);
parser.setParamsType     = TYPE              => setParamsType(TYPE);                   
parser.checkProcedure    = ID                => checkProcedure(ID);
parser.genERA            = _                 => genERA();
parser.getArgument       = _                 => getArgument();
parser.nextArgument      = _                 => nextArgument();
parser.genGOSUB          = _                 => genGOSUB();/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
    var parser = yy.parser;

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 4;
break;
case 1:return 12;
break;
case 2:/* ignore comment */;
break;
case 3:/* IGNORE */
break;
case 4:return 32;
break;
case 5:return 10;
break;
case 6:return 41;
break;
case 7:return 55;
break;
case 8:return 116;
break;
case 9:return 121;
break;
case 10:return 124;
break;
case 11:return 126;
break;
case 12:return 125;
break;
case 13:return 115;
break;
case 14:return 'READ';
break;
case 15:return 'THIS';
break;
case 16:return 'NEW';
break;
case 17:return 16;
break;
case 18:return 43;
break;
case 19:return 44;
break;
case 20:return 46;
break;
case 21:return 45;
break;
case 22:return 41;
break;
case 23:return 106;
break;
case 24:return "FALSE";
break;
case 25:return 'NULL';
break;
case 26:return 'NAN';
break;
case 27:return 31;
break;
case 28:return 30;
break;
case 29:return 84;
break;
case 30:return 83;
break;
case 31:return 82
break;
case 32:return 81
break;
case 33:return 78;
break;
case 34:return 80;
break;
case 35:return 77;
break;
case 36:return 79;
break;
case 37:return 15;
break;
case 38:return 104;
break;
case 39:return 27;
break;
case 40:return 105;
break;
case 41:return 'CTEB';
break;
case 42:return 66;
break;
case 43:return 93;
break;
case 44:return 92;
break;
case 45:return 99;
break;
case 46:return 101;  
break;
case 47:return 100;
break;
case 48:return 86;
break;
case 49:return 85;
break;
case 50:return 'NOT';
break;
case 51:return 26
break;
case 52:return 28
break;
case 53:return 48;
break;
case 54:return 50;
break;
case 55:return 34;
break;
case 56:return 36;
break;
case 57:return 'DOT';
break;
case 58:return 23;
break;
case 59:return 7;
break;
case 60:return 20;
break;
case 61:/* skip whitespace */;
break;
case 62:/* skip EOL */;
break;
case 63:/* skip tab */;
break;
case 64:throw 'Illegal character';
break;
case 65:return 14;
break;
}
},
rules: [/^(?:program\b)/,/^(?:end\b)/,/^(?:\/\/.*\n)/,/^(?:[\/][*][^*]*[*]+([^\/*][^*]*[*]+)*[\/])/,/^(?:function\b)/,/^(?:main\b)/,/^(?:void\b)/,/^(?:return\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:foreach\b)/,/^(?:while\b)/,/^(?:in\b)/,/^(?:print\b)/,/^(?:readLine\b)/,/^(?:this\b)/,/^(?:new\b)/,/^(?:var\b)/,/^(?:int\b)/,/^(?:float\b)/,/^(?:string\b)/,/^(?:bool\b)/,/^(?:void\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:nan\b)/,/^(?:dataset\b)/,/^(?:vector\b)/,/^(?:===)/,/^(?:==)/,/^(?:!==)/,/^(?:!=)/,/^(?:>=)/,/^(?:<=)/,/^(?:>)/,/^(?:<)/,/^(?:([a-zA-Z][a-zA-Z0-9]*))/,/^(?:([0-9]+\.[0-9]+))/,/^(?:([0-9])+)/,/^(?:".*")/,/^(?:true|false\b)/,/^(?:=)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:\|\|)/,/^(?:&&)/,/^(?:!)/,/^(?:\[)/,/^(?:\])/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:\.)/,/^(?:;)/,/^(?::)/,/^(?:,)/,/^(?:\s+)/,/^(?:\n+)/,/^(?:\t+)/,/^(?:.)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = compiler;
exports.Parser = compiler.Parser;
exports.parse = function () { return compiler.parse.apply(compiler, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}