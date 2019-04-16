%{
    var parser = yy.parser;
%}

digit                         [0-9]
float                         [0-9]+"."[0-9]+
id                            [a-zA-Z][a-zA-Z0-9]*

%%
"program"                   return 'PROGRAM';
"end"                       return 'END';

"//".*\n                   /* ignore comment */;
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   /* IGNORE */

"function"                  return 'FUNCTION';
"main"                      return 'MAIN';
"void"                      return 'VOID';
"return"                    return 'RETURN';

"if"                        return 'IF';
"else"                      return 'ELSE';
"foreach"                   return 'FOREACH';
"while"                     return 'WHILE';
"in"                        return 'IN';

"print"                     return 'PRINT';
"readLine"                  return 'READ';

"this"                      return 'THIS';
"new"                       return 'NEW';
"var"                       return 'VAR';

"int"                       return 'INT';
"float"                     return 'FLOAT';
"string"                    return 'STRING';
"bool"                      return 'BOOL';
"void"                      return 'VOID';

"true"                      return 'TRUE';
"false"                     return "FALSE";
"null"                      return 'NULL';
"nan"                       return 'NAN';
"dataset"                   return 'DATASET';
"vector"                    return 'VECTOR';

"==="                       return 'DEEP_EQUAL';
"=="                        return 'EQUAL';
"!=="                       return 'DEEP_DIFF'
"!="                        return 'DIFF'
">="                        return 'GREATER_EQUAL';
"<="                        return 'LESSER_EQUAL';
">"                         return 'GREATER';
"<"                         return 'LESSER';

{id}                        return 'ID';
{float}                     return 'CTEF';
{digit}+                    return 'CTEI';
\".*\"                      return 'CTES';
"true"|"false"              return 'CTEB';

"="                         return 'ASSIGN';
"+"                         return 'PLUS';
"-"                         return 'MINUS';
"*"                         return 'TIMES';
"/"                         return 'DIVIDE';  
"%"                         return 'REST';

"||"                        return 'OR';
"&&"                        return 'AND';
"!"                         return 'NOT';

"["                         return 'LBRACKET'
"]"                         return 'RBRACKET'
"{"                         return 'LBRACE';
"}"                         return 'RBRACE';
"("                         return 'LPAREN';
")"                         return 'RPAREN';

"."                         return 'DOT';
";"                         return 'SEMICOLON';
":"                         return 'COLON';
","                         return 'COMMA';

\s+                         /* skip whitespace */;
\n+                         /* skip EOL */;
\t+                         /* skip tab */;
.                           throw 'Illegal character';

<<EOF>>                     return 'EOF';
