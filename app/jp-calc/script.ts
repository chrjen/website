
function input() {
    let str = (<HTMLInputElement>document.querySelector("#input")).value;
    
    let lexer = new Lexer(str);
    let tokens = lexer.generate_tokens();
    console.log("Lexer output:", tokens.toString());

    let parser = new Parser(tokens);
    let ast = parser.parse();
    console.log("Parser output:", ast);
    console.log("Eval output:", ast.eval());
}

const kanjiDigits = "零一二三四五六七八九";
function kanjiToNumber(str: string) : number|undefined {
    let n = 0;

    let index = str.indexOf('兆');
    if (index > 0) {
        var c = kanjiToNumber(str.substring(0, index));    
        n += c * 1_0000_0000_0000;
        str = str.substring(index+1, str.length);
    }

    index = str.indexOf('億');
    if (index > 0) {
        var c = kanjiToNumber(str.substring(0, index));
        n += c * 1_0000_0000;
        str = str.substring(index + 1, str.length);
    }

    index = str.indexOf('万');
    if (index > 0) {
        var c = kanjiToNumber(str.substring(0, index));
        n += c * 10000;
        str = str.substring(index + 1, str.length);
    }

    index = str.indexOf('千');
    if (index >= 0) {
        var c = index == 0 ? 1 : kanjiToNumber(str.substring(0, index));
        n += c * 1000;
        str = str.substring(index + 1, str.length);
    }

    index = str.indexOf('百');
    if (index >= 0) {
        var c = index == 0 ? 1 : kanjiToNumber(str.substring(0, index));
        n += c * 100;
        str = str.substring(index + 1, str.length);
    }

    index = str.indexOf('十');
    if (index >= 0) {
        var c = index == 0 ? 1 : kanjiToNumber(str.substring(0, index));
        n += c * 10;
        str = str.substring(index + 1, str.length);
    }

    n += kanjiDigits.indexOf(str);

    return n >= 0 ? n : undefined;
}

/* ===== TOKENISER ===== */

enum TokenType {
    NUMBER,
    PLUS,
    MINUS,
    MULTIPLY,
    DIVIDE,
    LPAREN,
    RPAREN,
}

class Token {
    type: TokenType
    value: any

    constructor(type: TokenType, value: any = null) {
        this.type = type;
        this.value = value;
    }

    toString() {
        return `(${TokenType[this.type]}${this.value === null ? "" : ", " + this.value.toString()})`
    }
}

const WHITESPACE = " 　\n\t";
const DIGITS = "零一二三四五六七八九十百千万億兆";

class Lexer {
    private tokens: Token[];
    private index: number = 0;
    private src: string;
    private char: string;

    constructor(src: string) {
        this.src = src;
        this.next();
    }

    next() {
        this.char = this.src[this.index];
        this.index++;
    }

    generate_tokens() : Token[] {
        if (this.tokens != undefined) {
            return this.tokens;
        }
        
        this.tokens = [];
        while (this.char != undefined) {
            if (WHITESPACE.includes(this.char)) {
                this.next();
            } else if (DIGITS.includes(this.char)) {
                this.generate_number();
            } else if (this.char == "+" || this.char == "＋") {
                this.tokens.push(new Token(TokenType.PLUS));
                this.next();
            } else if (this.char == "-" || this.char == "ー") {
                this.tokens.push(new Token(TokenType.MINUS));
                this.next();
            } else if (this.char == "*" || this.char == "＊") {
                this.tokens.push(new Token(TokenType.MULTIPLY));
                this.next();
            } else if (this.char == "/" || this.char == "／") {
                this.tokens.push(new Token(TokenType.DIVIDE));
                this.next();
            } else if (this.char == "(" || this.char == "（") {
                this.tokens.push(new Token(TokenType.LPAREN));
                this.next();
            } else if (this.char == ")" || this.char == "）") {
                this.tokens.push(new Token(TokenType.RPAREN));
                this.next();
            } else {
                console.error("Unknown character:", this.char);
                return;
            }
        }

        return this.tokens;
    }

    generate_number() {
        let value = this.char;
        this.next()

        while (DIGITS.includes(this.char)) {
            value = value.concat(this.char);
            this.next();
        }

        this.tokens.push(new Token(TokenType.NUMBER, kanjiToNumber(value)))
    }
}

/* ===== ABSTRACT SYNTAX TREE ===== */

interface Eval {
    eval(): any;
}

interface EvalNumber {
    eval(): number | undefined;
}

enum BinOp {
    PLUS,
    MINUS,
    MULTIPLY,
    DIVIDE,
}
class NodeBinOp implements EvalNumber {
    left: EvalNumber;
    right: EvalNumber;
    op: BinOp;

    constructor(left: EvalNumber, right: EvalNumber, op: BinOp) {
        this.left = left;
        this.right = right;
        this.op = op;
    }

    eval(): number {
        let leftValue = this.left.eval();
        let rightValue = this.right.eval();
        switch (this.op) {
            case BinOp.PLUS:
                return leftValue + rightValue;
            case BinOp.MINUS:
                return leftValue - rightValue;
            case BinOp.MULTIPLY:
                return leftValue * rightValue;
            case BinOp.DIVIDE:
                return leftValue / rightValue;
        }
    }
}

enum UniOp {
    POSITIVE,
    NEGATIVE,
}
class NodeUniOp implements EvalNumber {
    right: EvalNumber;
    op: UniOp;

    constructor(right: EvalNumber, op: UniOp) {
        this.right = right;
        this.op = op;
    }

    eval(): number {
        let rightValue = this.right.eval();
        switch (this.op) {
            case UniOp.POSITIVE:
                return +rightValue;
            case UniOp.NEGATIVE:
                return -rightValue;
        }
    }
}

class NodeNumber implements EvalNumber {
    value: number;
    
    constructor(value: number) {
        this.value = value;
    }

    eval(): number {
        return this.value;
    }
}

/* ===== PARSER ===== */

class Parser {
    private tokens: Token[];
    private index: number = 0;
    private token: Token;
    private ast: Eval;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.next();
    }

    next() {
        this.token = this.tokens[this.index];
        this.index++;
    }

    parse() : Eval {
        if (this.ast != undefined) {
            return this.ast;
        }

        this.ast = this.expr();

        if (this.token != undefined) {
            console.error(`Syntax error: Parser returned early, index (${this.index}).`)
            return null;
        }

        return this.ast;
    }

    expr() : EvalNumber {
        let ast = this.term();

        while (this.token != undefined && [TokenType.PLUS, TokenType.MINUS].includes(this.token.type)) {

            switch (this.token.type) {
                case TokenType.PLUS:
                    this.next();
                    ast = new NodeBinOp(ast, this.term(), BinOp.PLUS);
                    break;

                case TokenType.MINUS:
                    this.next();
                    ast = new NodeBinOp(ast, this.term(), BinOp.MINUS);
                    break;
            
                default:
                    break;
            }
        }

        return ast;
    }

    term() : EvalNumber {
        let ast = this.factor();

        while (this.token != undefined && [TokenType.MULTIPLY, TokenType.DIVIDE].includes(this.token.type)) {

            switch (this.token.type) {
                case TokenType.MULTIPLY:
                    this.next();
                    ast = new NodeBinOp(ast, this.factor(), BinOp.MULTIPLY);
                    break;

                case TokenType.DIVIDE:
                    this.next();
                    ast = new NodeBinOp(ast, this.factor(), BinOp.DIVIDE);
                    break;

                default:
                    break;
            }
        }

        return ast;
    }

    factor(): EvalNumber {
        let ast = null;

        if (this.token.type === TokenType.NUMBER) {
            ast = new NodeNumber(this.token.value);
        } else {
            console.error(`Syntax error: Not a number at index (${this.index}).`)
        }
        
        this.next()
        return ast;
    }
}