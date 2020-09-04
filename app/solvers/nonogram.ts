let non42 = "0000000000011100000000000000000000000000000001111100000000011111111000000000000111111000000011111111111000000000011111110000001111111111111000000001111111100000111111100111110000000011111111000001111100000111100000001111111110000011100000001111000000111110111100000000000000011110000001111001111000000000000001111100000111110011110000000000000111111000011111000111100000000000011111100001111100001111000000000011111110000011111000011110000000001111111000001111111111111111000000111111000000111111111111111111000011111100000001111111111111111110001111100000000001111111111111111000111110000000000000000000001111000001111000000000000000000000011110000011110000000000000000000000111100000111111111111100000000000001111000001111111111111110000000000011110000011111111111111100000000000111100000011111111111110";

let non42_rows = [
    [3],
    [5, 8],
    [6, 11],
    [7, 13],
    [8, 7, 5],
    [8, 5, 4],
    [9, 3, 4],
    [5, 4, 4],
    [4, 4, 5],
    [5, 4, 6],
    [5, 4, 6],
    [5, 4, 7],
    [5, 4, 7],
    [16, 6],
    [18, 6],
    [18, 5],
    [16, 5],
    [4, 4],
    [4, 4],
    [4, 13],
    [4, 15],
    [4, 15],
    [4, 13],
]

let non42_columns = [
    [2],
    [4],
    [6],
    [7],
    [8],
    [10],
    [11],
    [7, 4],
    [7, 4],
    [6, 4],
    [6, 4],
    [23],
    [23],
    [23],
    [22],
    [4],
    [4],
    [2],
    [0],
    [0],
    [3, 6],
    [4, 8],
    [5, 9],
    [4, 10],
    [5, 5, 4],
    [4, 5, 4],
    [4, 4, 4],
    [3, 5, 4],
    [3, 5, 4],
    [4, 5, 4],
    [12, 4],
    [11, 4],
    [9, 4],
    [7, 3],
    [2],
]

enum TileType {
    Marked = -1,
    Blank = 0,
    Filled = 1
}

class Nonogram {
    private _width: number;
    private _height: number;
    private hint_cols: number[][];
    private hint_rows: number[][];
    private boardState: TileType[];
    private boardProxy: TileType[];
    private parentDiv: HTMLElement;
    
    private drawAxes: { x: number, y: number };
    private isDrawing: boolean;
    private isErasing: boolean;
    private drawTileType: TileType;
    private fillTileType: TileType;

    private boardHandler: ProxyHandler<TileType[]> = {
        get: (board, index): number => {
            let val = board[index];
            return (val == undefined ? 0 : val);
        },
        set: (board, index: number, value): boolean => {
            board[index] = value;
            if (index < 0 || index > this._width * this._height) {
                return false;
            }

            let tiles = this.parentDiv.querySelectorAll(".board div");
            let tile = tiles[index];
            tile.className = "";
            switch (board[index]) {
                case TileType.Filled:
                    tile.classList.add("filled");
                    break;

                case TileType.Marked:
                    tile.classList.add("marked");
                    break;

                default:
                    break;
            }

            return true;
        }
    };


    constructor(parent: HTMLElement, controls: HTMLElement) {
        this.parentDiv = parent;
        window.onmouseup = this.tileOnRelease.bind(this);

        let radioBtns = <NodeListOf<HTMLInputElement>>controls.querySelectorAll('input[name="fill-type"]');
        for (let i = 0; i < radioBtns.length; i++) {
            radioBtns[i].onchange = this.onFillTypeChange.bind(this);
        }

        this.onFillTypeChange({ target: controls.querySelector('input[name="fill-type"]:checked') });
    }
    
    public set width(width: number) {
        this._width = width;
        this.parentDiv.style.setProperty("--col-width", this._width.toString());
        this.board = [];
    }
    
    public set height(height: number) {
        this._height = height;
        this.board = [];
    }
    
    public set board(board: TileType[]) {
        this.boardState = board;
        this.boardProxy = new Proxy(this.boardState, this.boardHandler);

        let boardDiv = document.createElement("div");
        boardDiv.classList.add("board");

        for (let i = 0; i < this._width * this._height; i++) {
            let tile = document.createElement("div");
            tile.onmousedown = this.tileOnClick.bind(this);
            tile.onmouseenter = this.tileOnHover.bind(this);
            tile.setAttribute("x", (i % this._width).toString());
            tile.setAttribute("y", Math.floor(i / this._width).toString());
            tile.setAttribute("index", i.toString());
            boardDiv.append(tile);

            switch (this.boardState[i]) {
                case TileType.Filled:
                    tile.classList.add("filled");
                    break;

                case TileType.Marked:
                    tile.classList.add("marked");
                    break;
            
                default:
                    break;
            }
        }

        let old = this.parentDiv.getElementsByClassName("board")
        for (let i = 0; i < old.length; i++) {
            old[i].remove();
        }
        this.parentDiv.append(boardDiv);
    }

    public get board() {
        return this.boardProxy;
    }

    public set cols(hints: number[][]) {
        this.hint_cols = hints;

        let columnHintsDiv = document.createElement("div");
        columnHintsDiv.classList.add("column");
        columnHintsDiv.classList.add("hints-container");
        
        for (let i = 0; i < this._width; i++) {
            let hintsDiv = document.createElement("div");
            hintsDiv.classList.add("hints");
            for (let j = 0; j < this.hint_cols[i].length; j++) {
                let hintDiv = document.createElement("div");
                hintDiv.classList.add("hint");
                hintDiv.innerHTML = this.hint_cols[i][j].toString();
                hintsDiv.append(hintDiv);
            }
            columnHintsDiv.append(hintsDiv);
        }
        
        let old = this.parentDiv.querySelectorAll(".column.hints-container")
        for (let i = 0; i < old.length; i++) {
            old[i].remove();
        }
        this.parentDiv.append(columnHintsDiv);
    }
    
    public set rows(hints: number[][]) {
        this.hint_rows = hints;

        let rowHintsDiv = document.createElement("div");
        rowHintsDiv.classList.add("row");
        rowHintsDiv.classList.add("hints-container");

        for (let i = 0; i < this._height; i++) {
            let hintsDiv = document.createElement("div");
            hintsDiv.classList.add("hints");
            for (let j = 0; j < this.hint_rows[i].length; j++) {
                let hintDiv = document.createElement("div");
                hintDiv.classList.add("hint");
                hintDiv.innerHTML = this.hint_rows[i][j].toString();
                hintsDiv.append(hintDiv);
            }
            rowHintsDiv.append(hintsDiv);
        }

        let old = this.parentDiv.querySelectorAll(".rows.hints-container")
        for (let i = 0; i < old.length; i++) {
            old[i].remove();
        }
        this.parentDiv.append(rowHintsDiv);
    }

    public tileOnClick(event: { target: HTMLDivElement; }) {
        let index = event.target.getAttribute("index");
        this.drawAxes = {
            x: parseInt(event.target.getAttribute("x")),
            y: parseInt(event.target.getAttribute("y"))
        }
        
        if (this.boardState[index] === TileType.Blank) {
            this.isDrawing = true;
            this.drawTileType = this.fillTileType;
        } else {
            this.isErasing = true;
            this.drawTileType = this.boardState[index];
        }

        this.tileOnHover(event);

        return false;
    }
    
    public tileOnHover(event: { target: HTMLDivElement; }) {
        let x = parseInt(event.target.getAttribute("x"));
        let y = parseInt(event.target.getAttribute("y"));

        if (this.drawAxes.x != x && this.drawAxes.y != y) {
            return false;
        }

        if (this.isDrawing) {

            let index = event.target.getAttribute("index");
            if (this.board[index] === TileType.Blank) {
                this.board[index] = this.drawTileType;
            }

        } else if (this.isErasing) {

            let index = event.target.getAttribute("index");
            if (this.board[index] === this.drawTileType) {
                this.board[index] = TileType.Blank;
            }

        } else {
            return false;
        }

        return true;
    }
    
    public tileOnRelease() {
        this.isDrawing = false;
        this.isErasing = false;
    }

    public onFillTypeChange(event: { target: HTMLInputElement; }) {
        switch(event.target.value) {
            case "filled":
                this.fillTileType = TileType.Filled;
                break;

            case "marked":
                this.fillTileType = TileType.Marked;
                break;
        }

        return true;
    }
}

var nonogram;

function onloadBody() {
    let parent = <HTMLDivElement>document.getElementById("nonogram");
    parent.innerHTML = "";

    let controls = <HTMLElement>document.querySelector(".board-container .nonogram-controls");

    nonogram = new Nonogram(parent, controls);
    nonogram.width = 35;
    nonogram.height = 23;
    nonogram.cols = non42_columns;
    nonogram.rows = non42_rows;
    
    for (let i = 0; i < non42.length; i++) {
        let t = parseInt(non42[i]);
        t = (t == 0 ? -1 : t);
        nonogram.board[i] = t;
    }
}
