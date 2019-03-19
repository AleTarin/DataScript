digit                         [0-9]
integer                       ("-"?(?:[0-9]|[1-9][0-9]+))
string                        ".*" 
id                            [a-zA-Z][a-zA-Z0-9]*
%%
"program"                   return 'PROGRAM';
"end"                       return 'END';

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
">"                         return 'GREATER';
">="                        return 'GREATER_EQUAL';
"<"                         return 'LESSER';
"<="                        return 'LESSER_EQUAL';

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

"/*"                        return 'LCOMMENT';
"*/"                        return 'RCOMMENT';

"."                         return 'DOT';
";"                         return 'SEMICOLON';
":"                         return 'COLON';
","                         return 'COMMA';

{id}                        return 'ID';
{string}                    return 'CTES';
{integer}+                  return 'CTEI';
{integer}\.{digit}+         return 'CTEF';
true|false                  return 'CTEB';

\/\/[^\n]*                  /* ignore comment */
\s+                         /* skip whitespace */
\n+                         /* skip EOL */
\t+                         /* skip tab */
"."                         throw 'Illegal character';
<<EOF>>                     return 'EOF';