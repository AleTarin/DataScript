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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[2,5],$V2=[1,8],$V3=[2,7],$V4=[1,14],$V5=[1,22],$V6=[1,24],$V7=[2,16],$V8=[1,26],$V9=[1,27],$Va=[1,28],$Vb=[1,29],$Vc=[5,29,40,43,77,80,81,82,87,89],$Vd=[5,40,43,77,80,81,82,87,89],$Ve=[16,17,22,26,38],$Vf=[1,53],$Vg=[2,25],$Vh=[1,52],$Vi=[1,59],$Vj=[1,58],$Vk=[1,57],$Vl=[1,54],$Vm=[1,60],$Vn=[1,61],$Vo=[1,72],$Vp=[1,93],$Vq=[1,94],$Vr=[2,52],$Vs=[1,88],$Vt=[1,91],$Vu=[1,92],$Vv=[1,95],$Vw=[1,96],$Vx=[16,55,56,57,58,59,60,61,62,63,64],$Vy=[1,100],$Vz=[26,55,56,57,58,59,60,61,62,63,64],$VA=[16,19,22,26,55,56,57,58,59,60,61,62,63,64],$VB=[16,19,22,26,55,56,57,58,59,60,61,62,63,64,66,67],$VC=[16,19,22,26,55,56,57,58,59,60,61,62,63,64,66,67,69,70],$VD=[5,18,74,75],$VE=[16,26],$VF=[2,56],$VG=[5,16,18,25,26,66,67,74,75],$VH=[1,153];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"program":3,"PROGRAM":4,"ID":5,"COLON":6,"var":7,"modules":8,"MAIN":9,"block-vars":10,"END":11,"EOF":12,"VAR":13,"var-recursive":14,"type":15,"SEMICOLON":16,"LBRACKET":17,"CTEI":18,"RBRACKET":19,"ASSIGN":20,"new-structure":21,"COMMA":22,"NEW":23,"structures":24,"LPAREN":25,"RPAREN":26,"vector":27,"dataset":28,"FUNCTION":29,"params":30,"module-type":31,"VOID":32,"INT":33,"FLOAT":34,"BOOL":35,"STRING":36,"block":37,"LBRACE":38,"block-inside":39,"RBRACE":40,"statement":41,"return-statement":42,"RETURN":43,"assignation":44,"condition":45,"cycle":46,"write":47,"read":48,"comment":49,"call":50,"exp":51,"expression":52,"expression-op":53,"NOT":54,"GREATER":55,"GREATER_EQUAL":56,"LESSER":57,"LESSER_EQUAL":58,"DIFF":59,"DEEP_DIFF":60,"EQUAL":61,"DEEP_EQUAL":62,"AND":63,"OR":64,"term":65,"PLUS":66,"MINUS":67,"factor":68,"TIMES":69,"DIVIDE":70,"factor-op":71,"var-cte":72,"var-cte-bracket":73,"CTEF":74,"CTES":75,"var-cte-exp":76,"LCOMMENT":77,"RCOMMNET":78,"call-exp":79,"READLINE":80,"PRINT":81,"IF":82,"condition-else":83,"ELSE":84,"cycle-for":85,"cycle-while":86,"FOREACH":87,"IN":88,"WHILE":89,"$accept":0,"$end":1},
terminals_: {2:"error",4:"PROGRAM",5:"ID",6:"COLON",9:"MAIN",11:"END",12:"EOF",13:"VAR",16:"SEMICOLON",17:"LBRACKET",18:"CTEI",19:"RBRACKET",20:"ASSIGN",22:"COMMA",23:"NEW",25:"LPAREN",26:"RPAREN",27:"vector",28:"dataset",29:"FUNCTION",32:"VOID",33:"INT",34:"FLOAT",35:"BOOL",36:"STRING",38:"LBRACE",40:"RBRACE",43:"RETURN",54:"NOT",55:"GREATER",56:"GREATER_EQUAL",57:"LESSER",58:"LESSER_EQUAL",59:"DIFF",60:"DEEP_DIFF",61:"EQUAL",62:"DEEP_EQUAL",63:"AND",64:"OR",66:"PLUS",67:"MINUS",69:"TIMES",70:"DIVIDE",73:"var-cte-bracket",74:"CTEF",75:"CTES",77:"LCOMMENT",78:"RCOMMNET",80:"READLINE",81:"PRINT",82:"IF",84:"ELSE",87:"FOREACH",88:"IN",89:"WHILE"},
productions_: [0,[3,10],[7,7],[7,10],[7,4],[7,0],[14,3],[14,0],[21,5],[24,1],[24,1],[8,9],[31,1],[31,1],[30,3],[30,5],[30,0],[15,1],[15,1],[15,1],[15,1],[37,3],[10,4],[39,2],[39,1],[39,0],[42,2],[41,1],[41,1],[41,1],[41,1],[41,1],[41,1],[41,1],[44,7],[44,4],[52,3],[52,1],[52,2],[53,1],[53,1],[53,1],[53,1],[53,1],[53,1],[53,1],[53,1],[53,1],[53,1],[51,1],[51,3],[51,3],[51,0],[65,1],[65,3],[65,3],[65,0],[68,3],[68,2],[68,1],[71,1],[71,1],[71,0],[72,1],[72,4],[72,1],[72,1],[72,1],[72,1],[76,1],[76,3],[76,0],[49,3],[50,5],[79,3],[48,7],[47,5],[45,7],[83,2],[83,0],[46,1],[46,1],[85,7],[86,5]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
}
},
table: [{3:1,4:[1,2]},{1:[3]},{5:[1,3]},{6:[1,4]},{7:5,13:$V0,29:$V1},{8:7,29:$V2},{5:[1,9]},{9:[1,10]},{5:[1,11]},{6:$V3,14:12,20:[1,13],22:$V4},{6:[1,15]},{25:[1,16]},{6:[1,17]},{21:18,23:[1,19]},{5:[1,20]},{10:21,38:$V5},{5:$V6,26:$V7,30:23},{15:25,33:$V8,34:$V9,35:$Va,36:$Vb},o($Vc,[2,4]),{24:30,27:[1,31],28:[1,32]},{6:$V3,14:33,22:$V4},{11:[1,34]},o($Vd,$V1,{7:35,13:$V0}),{26:[1,36]},{6:[1,37]},{16:[1,38],17:[1,39]},o($Ve,[2,17]),o($Ve,[2,18]),o($Ve,[2,19]),o($Ve,[2,20]),{25:[1,40]},{25:[2,9]},{25:[2,10]},{6:[2,6]},{12:[1,41]},{5:$Vf,39:42,40:$Vg,41:43,42:44,43:$Vh,44:45,45:46,46:47,47:48,48:49,49:50,50:51,77:$Vi,80:$Vj,81:$Vk,82:$Vl,85:55,86:56,87:$Vm,89:$Vn},{6:[1,62]},{15:63,33:$V8,34:$V9,35:$Va,36:$Vb},o($Vc,$V1,{7:64,13:$V0}),{18:[1,65]},{26:[1,66]},{1:[2,1]},{40:[1,67]},{5:$Vf,39:68,40:$Vg,41:43,42:44,43:$Vh,44:45,45:46,46:47,47:48,48:49,49:50,50:51,77:$Vi,80:$Vj,81:$Vk,82:$Vl,85:55,86:56,87:$Vm,89:$Vn},{40:[2,24]},o($Vd,[2,27]),o($Vd,[2,28]),o($Vd,[2,29]),o($Vd,[2,30]),o($Vd,[2,31]),o($Vd,[2,32]),o($Vd,[2,33]),{5:$Vf,41:69,44:45,45:46,46:47,47:48,48:49,49:50,50:51,77:$Vi,80:$Vj,81:$Vk,82:$Vl,85:55,86:56,87:$Vm,89:$Vn},{17:[1,70],20:[1,71],25:$Vo},{25:[1,73]},o($Vd,[2,80]),o($Vd,[2,81]),{25:[1,74]},{25:[1,75]},{75:[1,76]},{25:[1,77]},{25:[1,78]},{15:80,31:79,32:[1,81],33:$V8,34:$V9,35:$Va,36:$Vb},{22:[1,82],26:[2,14]},o($Vc,[2,2]),{19:[1,83]},{16:[1,84]},o([11,29],[2,22]),{40:[2,23]},{40:[2,26]},{5:$Vp,18:$Vq,19:$Vr,25:$Vs,50:97,51:85,65:86,66:$Vt,67:$Vu,68:87,71:89,72:90,74:$Vv,75:$Vw},o($Vx,$Vr,{65:86,68:87,71:89,72:90,50:97,52:98,51:99,5:$Vp,18:$Vq,25:$Vs,54:$Vy,66:$Vt,67:$Vu,74:$Vv,75:$Vw}),{5:$Vp,18:$Vq,22:$Vr,25:$Vs,50:97,51:102,65:86,66:$Vt,67:$Vu,68:87,71:89,72:90,74:$Vv,75:$Vw,79:101},o($Vz,$Vr,{65:86,68:87,71:89,72:90,50:97,51:99,52:103,5:$Vp,18:$Vq,25:$Vs,54:$Vy,66:$Vt,67:$Vu,74:$Vv,75:$Vw}),{5:$Vp,18:$Vq,25:$Vs,26:$Vr,50:97,51:104,65:86,66:$Vt,67:$Vu,68:87,71:89,72:90,74:$Vv,75:$Vw},{5:$Vp,18:$Vq,22:$Vr,25:$Vs,50:97,51:105,65:86,66:$Vt,67:$Vu,68:87,71:89,72:90,74:$Vv,75:$Vw},{78:[1,106]},{5:[1,107]},o($Vz,$Vr,{65:86,68:87,71:89,72:90,50:97,51:99,52:108,5:$Vp,18:$Vq,25:$Vs,54:$Vy,66:$Vt,67:$Vu,74:$Vv,75:$Vw}),{10:109,38:$V5},{38:[2,12]},{38:[2,13]},{5:$V6,26:$V7,30:110},{16:[1,111]},o($Vc,[2,8]),{19:[1,112]},o($VA,[2,49],{66:[1,113],67:[1,114]}),o($VB,[2,53],{69:[1,115],70:[1,116]}),o($Vz,$Vr,{65:86,68:87,71:89,72:90,50:97,51:99,52:117,5:$Vp,18:$Vq,25:$Vs,54:$Vy,66:$Vt,67:$Vu,74:$Vv,75:$Vw}),{5:$Vp,18:$Vq,50:97,72:118,74:$Vv,75:$Vw},o($VC,[2,59]),o($VD,[2,60]),o($VD,[2,61]),o($VC,[2,63],{17:[1,119],25:$Vo}),o($VC,[2,65]),o($VC,[2,66]),o($VC,[2,67]),o($VC,[2,68]),{16:[1,120]},o($VE,[2,37],{53:121,55:[1,122],56:[1,123],57:[1,124],58:[1,125],59:[1,126],60:[1,127],61:[1,128],62:[1,129],63:[1,130],64:[1,131]}),o($VE,$Vr,{65:86,68:87,71:89,72:90,50:97,51:132,5:$Vp,18:$Vq,25:$Vs,66:$Vt,67:$Vu,74:$Vv,75:$Vw}),{26:[1,133]},{22:[1,134]},{26:[1,135]},{26:[1,136]},{22:[1,137]},o($Vd,[2,72]),{88:[1,138]},{26:[1,139]},{8:140,29:$V2},{26:[2,15]},o($Vc,$V1,{7:141,13:$V0}),{20:[1,142]},o($VA,$Vr,{65:86,68:87,71:89,72:90,50:97,51:143,5:$Vp,18:$Vq,25:$Vs,66:$Vt,67:$Vu,74:$Vv,75:$Vw}),o($VA,$Vr,{65:86,68:87,71:89,72:90,50:97,51:144,5:$Vp,18:$Vq,25:$Vs,66:$Vt,67:$Vu,74:$Vv,75:$Vw}),o($VA,$VF,{68:87,71:89,72:90,50:97,65:145,5:$Vp,18:$Vq,25:$Vs,66:$Vt,67:$Vu,74:$Vv,75:$Vw}),o($VA,$VF,{68:87,71:89,72:90,50:97,65:146,5:$Vp,18:$Vq,25:$Vs,66:$Vt,67:$Vu,74:$Vv,75:$Vw}),{26:[1,147]},o($VC,[2,58]),{73:[1,148]},o($Vd,[2,35]),o($VE,$Vr,{65:86,68:87,71:89,72:90,50:97,51:149,5:$Vp,18:$Vq,25:$Vs,66:$Vt,67:$Vu,74:$Vv,75:$Vw}),o($VG,[2,39]),o($VG,[2,40]),o($VG,[2,41]),o($VG,[2,42]),o($VG,[2,43]),o($VG,[2,44]),o($VG,[2,45]),o($VG,[2,46]),o($VG,[2,47]),o($VG,[2,48]),o($VE,[2,38]),{16:[1,150]},{5:$Vp,18:$Vq,22:$Vr,25:$Vs,50:97,51:102,65:86,66:$Vt,67:$Vu,68:87,71:89,72:90,74:$Vv,75:$Vw,79:151},{37:152,38:$VH},{16:[1,154]},{5:[1,155]},{5:[1,156]},{37:157,38:$VH},{9:[2,11]},o($Vc,[2,3]),o($Vx,$Vr,{65:86,68:87,71:89,72:90,50:97,51:99,52:158,5:$Vp,18:$Vq,25:$Vs,54:$Vy,66:$Vt,67:$Vu,74:$Vv,75:$Vw}),o($VA,[2,50]),o($VA,[2,51]),o($VB,[2,54]),o($VB,[2,55]),o($VC,[2,57]),{19:[1,159]},o($VE,[2,36]),o([5,16,19,22,26,40,43,55,56,57,58,59,60,61,62,63,64,66,67,69,70,77,80,81,82,87,89],[2,73]),{26:[2,74]},{16:[2,79],83:160,84:[1,161]},{5:$Vf,39:162,40:$Vg,41:43,42:44,43:$Vh,44:45,45:46,46:47,47:48,48:49,49:50,50:51,77:$Vi,80:$Vj,81:$Vk,82:$Vl,85:55,86:56,87:$Vm,89:$Vn},o($Vd,[2,76]),{26:[1,163]},{26:[1,164]},o($Vd,[2,83]),{16:[1,165]},o($VC,[2,64]),{16:[1,166]},{37:167,38:$VH},{40:[1,168]},{16:[1,169]},{37:170,38:$VH},o($Vd,[2,34]),o($Vd,[2,77]),{16:[2,78]},o([5,16,40,43,77,80,81,82,84,87,89],[2,21]),o($Vd,[2,75]),o($Vd,[2,82])],
defaultActions: {31:[2,9],32:[2,10],33:[2,6],41:[2,1],44:[2,24],68:[2,23],69:[2,26],80:[2,12],81:[2,13],110:[2,15],140:[2,11],151:[2,74],167:[2,78]},
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

  var symbolTable = require('./symbolTable.js');
/* generated by jison-lex 0.3.4 */
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
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 4;
break;
case 1:return 11;
break;
case 2:return 29;
break;
case 3:return 9;
break;
case 4:return 32;
break;
case 5:return 43;
break;
case 6:return 82;
break;
case 7:return 84;
break;
case 8:return 87;
break;
case 9:return 89;
break;
case 10:return 88;
break;
case 11:return 81;
break;
case 12:return 'READ';
break;
case 13:return 'THIS';
break;
case 14:return 23;
break;
case 15:return 13;
break;
case 16:return 33;
break;
case 17:return 34;
break;
case 18:return 36;
break;
case 19:return 35;
break;
case 20:return 32;
break;
case 21:return 'TRUE';
break;
case 22:return "FALSE";
break;
case 23:return 'NULL';
break;
case 24:return 'NAN';
break;
case 25:return 'DATASET';
break;
case 26:return 'VECTOR';
break;
case 27:return 62;
break;
case 28:return 61;
break;
case 29:return 60
break;
case 30:return 59
break;
case 31:return 55;
break;
case 32:return 56;
break;
case 33:return 57;
break;
case 34:return 58;
break;
case 35:return 20;
break;
case 36:return 66;
break;
case 37:return 67;
break;
case 38:return 69;
break;
case 39:return 70;  
break;
case 40:return 'REST';
break;
case 41:return 64;
break;
case 42:return 63;
break;
case 43:return 54;
break;
case 44:return 17
break;
case 45:return 19
break;
case 46:return 38;
break;
case 47:return 40;
break;
case 48:return 25;
break;
case 49:return 26;
break;
case 50:return 77;
break;
case 51:return 'RCOMMENT';
break;
case 52:return 'DOT';
break;
case 53:return 16;
break;
case 54:return 6;
break;
case 55:return 22;
break;
case 56:return 5;
break;
case 57:return 75;
break;
case 58:return 18;
break;
case 59:return 74;
break;
case 60:return 'CTEB';
break;
case 61:/* ignore comment */
break;
case 62:/* skip whitespace */
break;
case 63:/* skip EOL */
break;
case 64:/* skip tab */
break;
case 65:throw 'Illegal character';
break;
case 66:return 12;
break;
}
},
rules: [/^(?:program\b)/,/^(?:end\b)/,/^(?:function\b)/,/^(?:main\b)/,/^(?:void\b)/,/^(?:return\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:foreach\b)/,/^(?:while\b)/,/^(?:in\b)/,/^(?:print\b)/,/^(?:readLine\b)/,/^(?:this\b)/,/^(?:new\b)/,/^(?:var\b)/,/^(?:int\b)/,/^(?:float\b)/,/^(?:string\b)/,/^(?:bool\b)/,/^(?:void\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:nan\b)/,/^(?:dataset\b)/,/^(?:vector\b)/,/^(?:===)/,/^(?:==)/,/^(?:!==)/,/^(?:!=)/,/^(?:>)/,/^(?:>=)/,/^(?:<)/,/^(?:<=)/,/^(?:=)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:\|\|)/,/^(?:&&)/,/^(?:!)/,/^(?:\[)/,/^(?:\])/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:\/\*)/,/^(?:\*\/)/,/^(?:\.)/,/^(?:;)/,/^(?::)/,/^(?:,)/,/^(?:([a-zA-Z][a-zA-Z0-9]*))/,/^(?:(\.\*))/,/^(?:((-?(?:[0-9]|[1-9][0-9]+)))+)/,/^(?:((-?(?:[0-9]|[1-9][0-9]+)))\.([0-9])+)/,/^(?:true|false\b)/,/^(?:\/\/[^\n]*)/,/^(?:\s+)/,/^(?:\n+)/,/^(?:\t+)/,/^(?:\.)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66],"inclusive":true}}
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