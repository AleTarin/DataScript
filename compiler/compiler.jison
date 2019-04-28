%right ASSIGN
%left OR AND
%nonassoc  GREATER GREATER_EQUAL LESSER LESSER_EQUAL DIFF DEEP_DIFF EQUAL DEEP_EQUAL
%left PLUS MINUS
%left TIMES DIVIDE REST
%right NOT
%left DOT

%%

program: PROGRAM _p1 _p2 COLON var modules MAIN _p4 block END _p3 EOF;

_p1: { yy.parser.createDir() };
_p2: ID { yy.parser.setName($ID) };
_p3: { yy.parser.deleteDir() };
_p4: { yy.parser.setMain() };

var 
  : VAR var-recursive var-follow
  | %empty
  ;

var-recursive 
  : _v3 
  | _v3 COMMA var-recursive
  | %empty
  ;

var-follow
  : COLON _v2 var-index SEMICOLON var
  | COLON new-structure SEMICOLON var
  ;
 
_v2: type { yy.parser.setType($type) };
_v3: ID { yy.parser.setVars($ID); };

var-index
  : LBRACKET CTEI RBRACKET var-index
  | %empty
  ;

modules
  : FUNCTION _module1 LPAREN params RPAREN COLON  _module4 block-vars modules 
  | %empty 
  ;
  
module-type: type | VOID ;

params : _module2 COLON _module3 var-index params-recursive;
params-recursive
  : COMMA params
  | %empty
  ;

_module1: ID { yy.parser.setTable($1) };
_module2: ID { yy.parser.setParams($1) };
_module3: type { yy.parser.setParamsType($1)};
_module4: module-type { yy.parser.setFunType($1)};

type: INT | FLOAT | BOOL | STRING | structures ;
structures : VECTOR | DATASET;

block: LBRACE block-inside RBRACE;
block-vars: LBRACE var _module5 block-inside RBRACE _module6;

block-inside
  : statement block-inside
  | return-statement
  | %empty
  ;
  
_module6: { yy.parser.deleteFunction(); };
_module5: { yy.parser.setFunParams()};

return-statement: RETURN exp SEMICOLON { yy.parser.setFunParams()};

array: LBRACKET array-item RBRACKET;
array-item
  : array-item COMMA exp { $$ = $1 + ',' + $3 } 
  | exp { $$ = $1 }
  ;

statement
  : assignation
  | condition
  | cycle
  | print
  | read 
  | call SEMICOLON
  | native-functions
  ;

assignation
  : ID var-cte-exp ASSIGN and-or-expression SEMICOLON
  | ID ASSIGN and-or-expression SEMICOLON {yy.parser.processAssign($1, $3)}
  ;

expression: exp _exp2 expression-recursive;
expression-recursive
  : _exp1 expression
  | %empty
  ;

_exp1: expression-op { yy.parser.poperPush($1) };
_exp2: {yy.parser.processExp()};

and-or-expression: expression _hexp2 and-or-expression-recursive;
and-or-expression-recursive
  : _hexp1 and-or-expression
  | %empty
  ;

_hexp1: and-or-expression-op { yy.parser.poperPush($1) };
_hexp2: {yy.parser.processHypExp()};

expression-op
  : GREATER
  | GREATER_EQUAL
  | LESSER
  | LESSER_EQUAL
  | DIFF
  | DEEP_DIFF
  | EQUAL
  | DEEP_EQUAL
  ;

and-or-expression-op: AND | OR;

exp: term _e2 exp-recursive;
exp-recursive
  : _e1 exp
  | %empty
  ;

exp-op: MINUS | PLUS;

_e1: exp-op { yy.parser.poperPush($1) };
_e2: {yy.parser.processTerm()};

term: factor _t2 term-recursive;
term-op:  TIMES |  REST |  DIVIDE;
term-recursive
  :  _t1 term
  | %empty 
  ;

_t1: term-op { yy.parser.poperPush($1) };
_t2: {yy.parser.processFactor()};


factor 
  : LPAREN expression RPAREN
  | factor-op var-cte
  | var-cte
  ;

factor-op 
  : PLUS
  | MINUS
  | %empty
  ;

var-cte 
  : ID var-cte-exp
  | ID {yy.parser.addQuadVar($1)} 
  | CTEI {yy.parser.addQuadConst($1,'int')}
  | CTEF {yy.parser.addQuadConst($1,'float')}
  | CTES {yy.parser.addQuadConst($1,'string')}
  | TRUE {yy.parser.addQuadConst($1,'bool')}
  | FALSE {yy.parser.addQuadConst($1, 'bool')}
  | array
  | call
  ;

var-cte-exp
  : LBRACKET exp RBRACKET var-cte-exp
  | %empty
  ;

call: _call1 LPAREN _call2 call-exp RPAREN _call5;

call-exp
  : exp _call3 COMMA _call4 call-exp
  | exp
  ;

_call1: ID { yy.parser.checkProcedure($ID) };
_call2: { yy.parser.genERA() };
_call3: { yy.parser.getArgument() };
_call4: { yy.parser.nextArgument() };
_call5: { yy.parser.genGOSUB() };

read: READLINE LPAREN exp COMMA ID RPAREN SEMICOLON { yy.parser.processReadLine($ID) };
print: PRINT LPAREN exp RPAREN SEMICOLON { yy.parser.processPrint() };

condition: IF LPAREN and-or-expression RPAREN _cond1 block condition-else _cond2;
condition-else
  : ELSE _cond3 block
  | %empty
  ;

_cond1: {yy.parser.processCond()};
_cond2: {yy.parser.endCond()};
_cond3: {yy.parser.processElse()};

cycle: cycle-for | cycle-while;

cycle-for: FOREACH LPAREN ID IN ID RPAREN block;
cycle-while: WHILE _while1 LPAREN and-or-expression RPAREN _while2 block _while3;

_while1: { yy.parser.pushJump()};
_while2: { yy.parser.processWhile()};
_while3: { yy.parser.endWhile()};

native-functions
  : rbind
  | cbind
  | setNames
  | getNames
  | row
  | col
  | head
  | tail
  | stdev
  | range
  | min
  | max
  | variance
  | dnorm
  | dbinomial
  | duniform
  | plot
  ;

rbind: RBIND LPAREN ID COMMA ID RPAREN SEMICOLON;
cbind: CBIND LPAREN ID COMMA ID COMMA exp RPAREN SEMICOLON;
getNames: GETNAMES LPAREN ID RPAREN;
setNames: SETNAMES LPAREN ID COMMA VECTOR RPAREN;
row: ROW LPAREN ID COMMA exp RPAREN;
col: COL LPAREN ID COMMA exp RPAREN;
head: HEAD LPAREN ID COMMA exp RPAREN;
tail: TAIL LPAREN ID COMMA exp RPAREN;

stdev: STDEV LPAREN ID RPAREN; 
range: RANGE LPAREN ID RPAREN;
min: MIN LPAREN ID RPAREN;
max: MAX LPAREN ID RPAREN;
variance: VARIANCE LPAREN ID RPAREN;

dnorm: DNORM LPAREN exp COMMA exp COMMA exp RPAREN;
dbinomial: DBINOMAIL LPAREN exp COMMA exp COMMA exp RPAREN;
duniform: DUNIFORM LPAREN exp COMMA exp COMMA exp RPAREN;

barPlot: PLOT LPAREN ID RPAREN;
linePlot: PLOT LPAREN ID RPAREN;

%%

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
  setParams, setParamsType, setMain,
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
parser.genGOSUB          = _                 => genGOSUB();
parser.processReadLine   = ID                => processReadLine(ID);
parser.processPrint      = _                 => processPrint();
parser.setMain           = _                 => setMain();