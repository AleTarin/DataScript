%right ASSIGN
%left OR AND
%nonassoc  GREATER GREATER_EQUAL LESSER LESSER_EQUAL DIFF DEEP_DIFF EQUAL DEEP_EQUAL
%left PLUS MINUS
%left TIMES DIVIDE REST
%right NOT
%left DOT

%%

program: PROGRAM _p1 _p2 COLON var modules MAIN block-vars END _p3 EOF;

_p1: { yy.parser.createDir() };
_p2: ID { yy.parser.setName($ID) };
_p3: { yy.parser.deleteDir() };

var 
  : VAR _v1 var-recursive var-follow
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

_v1: { yy.parser.setTable() };
_v2: type { yy.parser.setType($type) };
_v3: ID { yy.parser.setVars($ID); };

var-index
  : LBRACKET CTEI RBRACKET var-index
  | %empty
  ;

new-structure
  : structures { yy.parser.setType($structures) }
  ;

structures
  : VECTOR
  | DATASET
  ;
  
modules
  : FUNCTION ID LPAREN params RPAREN COLON module-type block-vars modules
  | %empty
  ;

module-type
  : type
  | VOID 
  ;

params
  : ID COLON type var-index
  | ID COLON type var-index COMMA params
  | %empty
  ;

type 
  : INT 
  | FLOAT
  | BOOL
  | STRING
  ;

block
  : LBRACE block-inside RBRACE
  ;

block-vars
  : LBRACE var block-inside RBRACE 
  ;
  
block-inside
  : statement block-inside
  | return-statement
  | %empty
  ;

return-statement
  : RETURN statement SEMICOLON
  ;

array
  : LBRACKET array-item RBRACKET
     {{ $$  = [$2]; }}
  ;

array-item
  : array-item COMMA expr
     {{ $$ = $1 + ',' + $3 }}
  | expr
     {{ $$ = $1 }};

statement
  : assignation
  | condition
  | cycle
  | write
  | read
  | call
  ;

assignation
  : ID var-cte-exp ASSIGN and-or-expression SEMICOLON
  | ID ASSIGN and-or-expression SEMICOLON {yy.parser.processAssign($1, $3)}
  ;


expression 
  : exp _exp2 expression-recursive
  ;

expression-recursive
  : _exp1 expression
  | %empty
  ;

_exp1: expression-op { yy.parser.poperPush($1) };
_exp2: {yy.parser.processExp()};

and-or-expression
  : expression _hexp2 and-or-expression-recursive
  ;

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

and-or-expression-op
  : AND
  | OR
  ;

exp: term _e2 exp-recursive;

exp-recursive
  : _e1 exp
  | %empty
  ;

exp-op
  : MINUS
  | PLUS
  ;

_e1: exp-op { yy.parser.poperPush($1) };
_e2: {yy.parser.processTerm()};

term: factor _t2 term-recursive;

term-recursive
  :  _t1 term
  | %empty 
  ;

_t1: term-op { yy.parser.poperPush($1) };
_t2: {yy.parser.processFactor()};

term-op
  :  TIMES
  |  REST
  |  DIVIDE
  ;

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
  | array
  | call
  ;

var-cte-exp
  : LBRACKET exp RBRACKET var-cte-exp
  | %empty
  ;

call
  : ID LPAREN call-exp RPAREN SEMICOLON 
  ;

call-exp
  : exp COMMA call-exp
  | exp
  ;

read
  : READLINE LPAREN exp COMMA ID RPAREN SEMICOLON
  ;

write
  : PRINT LPAREN exp RPAREN SEMICOLON
  ;

condition
  : IF LPAREN and-or-expression RPAREN _cond1 block condition-else _cond2
  ;

_cond1: {yy.parser.processCond()};
_cond2: {yy.parser.endCond()};
_cond3: {yy.parser.processElse()};

condition-else
  : ELSE _cond3 block
  | %empty
  ;

cycle
  : cycle-for
  | cycle-while
  ;

cycle-for
  : FOREACH LPAREN ID IN ID RPAREN block
  ;

cycle-while
  : WHILE _while1 LPAREN and-or-expression RPAREN _while2 block _while3
  ;

_while1: { yy.parser.pushJump()};
_while2: { yy.parser.processWhile()};
_while3: { yy.parser.endWhile()};
%%

var actions = require('./actions');
const { 
  createDir, deleteDir, setName,
  setVars, setType, setTable,
  addQuadVar, addQuadConst, poperPush,
  processTerm, processAssign, processFactor, 
  processExp, processHypExp, 
  processCond, endCond, processElse,
  pushJump, processWhile, endWhile
} = actions;

parser.createDir         = _                 => createDir();
parser.setName           = NAME              => setName(NAME);
parser.deleteDir         = _                 => deleteDir();
parser.setVars           = ID                => setVars(ID);
parser.setType           = TYPE              => setType(TYPE);
parser.setTable          = _                 => setTable();
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