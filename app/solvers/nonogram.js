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
function createBoard() {
    let width = 35;
    let height = 23;
    let columns = non42_columns;
    let rows = non42_rows;
    let initialState = non42;
    let nonogramDiv = document.getElementById("nonogram");
    nonogramDiv.innerHTML = "";
    let columnHintsDiv = document.createElement("div");
    columnHintsDiv.classList.add("column");
    columnHintsDiv.classList.add("hints-container");
    for (let i = 0; i < width; i++) {
        let hintsDiv = document.createElement("div");
        hintsDiv.classList.add("hints");
        for (let j = 0; j < columns[i].length; j++) {
            let hintDiv = document.createElement("div");
            hintDiv.classList.add("hint");
            hintDiv.innerHTML = columns[i][j].toString();
            hintsDiv.append(hintDiv);
        }
        columnHintsDiv.append(hintsDiv);
    }
    let rowHintsDiv = document.createElement("div");
    rowHintsDiv.classList.add("row");
    rowHintsDiv.classList.add("hints-container");
    for (let i = 0; i < height; i++) {
        let hintsDiv = document.createElement("div");
        hintsDiv.classList.add("hints");
        for (let j = 0; j < rows[i].length; j++) {
            let hintDiv = document.createElement("div");
            hintDiv.classList.add("hint");
            hintDiv.innerHTML = rows[i][j].toString();
            hintsDiv.append(hintDiv);
        }
        rowHintsDiv.append(hintsDiv);
    }
    let boardDiv = document.createElement("div");
    boardDiv.classList.add("board");
    boardDiv.style.setProperty("--col-width", width.toString());
    for (let i = 0; i < width * height; i++) {
        let tile = document.createElement("div");
        boardDiv.append(tile);
        if (initialState[i] == "1") {
            tile.classList.add("filled");
        }
        else {
            tile.classList.add("marked");
        }
    }
    nonogramDiv.append(columnHintsDiv);
    nonogramDiv.append(rowHintsDiv);
    nonogramDiv.append(boardDiv);
}
//# sourceMappingURL=nonogram.js.map