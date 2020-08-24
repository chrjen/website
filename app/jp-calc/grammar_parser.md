# Parser grammar
> expr: term ((PLUS|MINUS) term)*  
>
> term: factor ((MULTIPLY|DIVIDE) factor)*  
>
> factor: NUMBER  
> factor: PLUS factor  
> factor: MINUS factor  
> factor: LPAREN expr RPAREN


## Alternative grammar
> expr: term (PLUS|MINUS) exp  
> expr: term  
> 
> term: factor (MULTIPLY|DIVIDE) term  
> term: factor  
> 
> factor: NUMBER  
> factor: PLUS factor  
> factor: MINUS factor  
> factor: LPAREN expr RPAREN  

# Lexer grammar
## Tokens
> PLUS: [+＋]  
> MINUS: [-ー]  
> MULTIPLY: [*＊]  
> DIVIDE: [/／]  
> LPAREN: [(（]  
> RPAREN: [) ）]  
> NUMBER: number

## Token grammar
> number: (count 兆)? (count 億)? (count 万)? count?  
> number: 零  
> 
> count: (tens2 千)? (tens2 百)? (tens2 十)? tens1  
>
> tens2: 二|三|四|五|六|七|八|九
> tens2: 
>
> tens1: tens2  
> tens1: 一  
