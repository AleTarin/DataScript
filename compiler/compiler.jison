%{
  var symbolTable = require('./symbolTable.js');
%}

%right ASSIGN
%left OR
%nonassoc EQUAL GREATER
%left PLUS MINUS
%left TIMES
%right NOT
%left DOT

%%

program:
  PROGRAM ID COLON var modules MAIN COLON block-vars END EOF ;

var 
  : VAR ID var-recursive COLON type SEMICOLON var
  | VAR ID var-recursive COLON type LBRACKET CTEI RBRACKET SEMICOLON var
  | VAR ID ASSIGN new-structure
  | %empty
  ;

var-recursive 
  : COMMA ID var-recursive 
  | %empty
  ;

new-structure
  : NEW structures LPAREN RPAREN SEMICOLON
  ;

structures
  : vector
  | dataset
  ;
  
modules
  : FUNCTION ID LPAREN params RPAREN COLON module-type block-vars modules
  ;

module-type
  : type
  | VOID 
  ;

params
  : ID COLON type
  | ID COLON type COMMA params
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
  : RETURN statement 
  ;

statement
  : assignation
  | condition
  | cycle
  | write
  | read
  | comment
  | call
  ;

assignation
  : ID LBRACKET exp RBRACKET ASSIGN expression SEMICOLON
  | ID ASSIGN expression SEMICOLON
  ;

expression 
  : exp expression-op exp 
  | exp
  | NOT exp
  ;

expression-op
  : GREATER
  | GREATER_EQUAL
  | LESSER
  | LESSER_EQUAL
  | DIFF
  | DEEP_DIFF
  | EQUAL
  | DEEP_EQUAL
  | AND
  | OR
  ;

exp
  : term
  | term PLUS exp
  | term MINUS exp
  | %empty
  ;

term
  : factor
  | factor TIMES term
  | factor DIVIDE term
  | %empty 
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
  : ID
  | ID LBRACKET var-cte-bracket RBRACKET
  | CTEI
  | CTEF
  | CTES
  | call
  ;

var-cte-exp
  : exp
  | exp COMMA var-cte-exp
  | %empty
  ;

comment
  : LCOMMENT CTES RCOMMNET
  ;

call
  : ID LPAREN call-exp RPAREN SEMICOLON 
  ;

call-exp
  : exp COMMA call-exp
  ;

read
  : READLINE LPAREN exp COMMA ID RPAREN SEMICOLON
  ;

write
  : PRINT LPAREN exp RPAREN SEMICOLON
  ;

condition
  : IF LPAREN expression RPAREN block condition-else SEMICOLON
  ;

condition-else
  : ELSE block
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
  : WHILE LPAREN expression RPAREN block
  ;




  