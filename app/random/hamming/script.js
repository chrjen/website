function onGridLoad() {
    generateGrid();
}
function onTileClick(event) {
    if (event.target.className.length == 0) {
        event.target.classList.add("flipped");
    }
    else {
        event.target.className = "";
    }
}
function getRandomBit() {
    return Math.floor(Math.random() * Math.floor(2));
}
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}
function generateGrid() {
    let grid = document.getElementById("grid");
    grid.innerHTML = "";
    let width = parseInt(document.getElementById("size-selector").value);
    grid.style.setProperty("--grid-width", width.toString());
    let bits = "";
    let ones = [];
    for (let i = 0; i < width * width; i++) {
        bits += getRandomBit().toString();
        if (bits[i] == "1") {
            ones.push(i);
        }
    }
    let sum = 0;
    for (let i = 0; i < ones.length; i++) {
        sum ^= ones[i];
    }
    bits = replaceAt(bits, sum, bits[sum] == "0" ? "1" : "0");
    let parity = 0;
    for (let i = 1; i < bits.length; i++) {
        parity += parseInt(bits[i]);
    }
    console.log(parity, parity % 2);
    parity = parity % 2;
    bits = replaceAt(bits, 0, parity);
    for (let i = 0; i < width * width; i++) {
        let tile = document.createElement("div");
        tile.innerHTML = i.toString();
        tile.onclick = onTileClick.bind(this);
        if (bits[i] == "1") {
            tile.classList.add("flipped");
        }
        grid.append(tile);
    }
}
//# sourceMappingURL=script.js.map