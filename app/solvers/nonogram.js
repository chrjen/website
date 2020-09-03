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
];
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
];
var TileType;
(function (TileType) {
    TileType[TileType["Marked"] = -1] = "Marked";
    TileType[TileType["Blank"] = 0] = "Blank";
    TileType[TileType["Filled"] = 1] = "Filled";
})(TileType || (TileType = {}));
class Nonogram {
    constructor(parent) {
        this.boardHandler = {
            get: (board, index) => {
                let val = board[index];
                return (val == undefined ? 0 : val);
            },
            set: (board, index, value) => {
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
        this.parentDiv = parent;
        window.onmouseup = this.tileOnRelease.bind(this);
    }
    set width(width) {
        this._width = width;
        this.parentDiv.style.setProperty("--col-width", this._width.toString());
        this.board = [];
    }
    set height(height) {
        this._height = height;
        this.board = [];
    }
    set board(board) {
        this.boardState = board;
        this.boardProxy = new Proxy(this.boardState, this.boardHandler);
        // this.boardProxy.parent = this;
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
        let old = this.parentDiv.getElementsByClassName("board");
        for (let i = 0; i < old.length; i++) {
            old[i].remove();
        }
        this.parentDiv.append(boardDiv);
    }
    get board() {
        return this.boardProxy;
    }
    set cols(hints) {
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
        let old = this.parentDiv.querySelectorAll(".column.hints-container");
        for (let i = 0; i < old.length; i++) {
            old[i].remove();
        }
        this.parentDiv.append(columnHintsDiv);
    }
    set rows(hints) {
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
        let old = this.parentDiv.querySelectorAll(".rows.hints-container");
        for (let i = 0; i < old.length; i++) {
            old[i].remove();
        }
        this.parentDiv.append(rowHintsDiv);
    }
    tileOnClick(event) {
        this.isDrawing = true;
        let tile = event.target;
        let index = tile.getAttribute("index");
        // this.drawTileType = this.boardState[index];
        this.drawTileType = TileType.Blank;
        this.board[index] = this.drawTileType;
        return false;
    }
    tileOnHover(event) {
        if (!this.isDrawing) {
            return false;
        }
        let tile = event.target;
        let index = tile.getAttribute("index");
        this.board[index] = this.drawTileType;
        return true;
    }
    tileOnRelease() {
        this.isDrawing = false;
    }
}
var nonogram;
function onloadBody() {
    let parent = document.getElementById("nonogram");
    parent.innerHTML = "";
    nonogram = new Nonogram(parent);
    nonogram.width = 35;
    nonogram.height = 23;
    nonogram.cols = non42_columns;
    nonogram.rows = non42_rows;
    let board = [];
    for (let i = 0; i < non42.length; i++) {
        let t = parseInt(non42[i]);
        t = (t == 0 ? -1 : t);
        board.push(t);
    }
    let index = 0;
    let init = setInterval((board, nonogram) => {
        nonogram.board[index] = board[index];
        index++;
        if (index >= 35 * 23) {
            clearInterval(init);
        }
    }, 1, board, nonogram);
}
//# sourceMappingURL=nonogram.js.map