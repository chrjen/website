class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = [];
        this.tileSize = 10;

        for (let i = 0; i < width * height; i++) {
            this.tiles[i] = "empty";
        }
    }

    setTile(x, y, value) {
        this.tiles[y * this.height + x] = value;
    }

    getTile(x, y) {
        return this.tiles[y * this.height + x];
    }

    spawnApple() {
        let index = Math.floor(random(0, this.tiles.length));
        while (this.tiles[index] != "empty") {
            index = Math.floor(random(0, this.tiles.length));
        }
        this.tiles[index] = "apple";
    }

    draw() {
        // strokeWeight(0.25);
        noStroke();
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let tile = this.tiles[y*this.height + x];
                switch (tile) {
                    case "empty":
                        fill(255);
                        square(x * this.tileSize, y * this.tileSize, this.tileSize);
                        break;

                    case "snake":
                        fill(0);
                        square(x * this.tileSize, y * this.tileSize, this.tileSize);
                        break;

                    case "apple":
                        fill(200, 45, 15);
                        ellipseMode(CORNER);
                        circle(x * this.tileSize, y * this.tileSize, this.tileSize);
                        break;
                        
                    default:
                        fill(255, 0, 255);
                        square(x * this.tileSize, y * this.tileSize, this.tileSize);
                        break;
                }
            }
        }

        stroke(0);
        noFill();
        rect(0, 0, width, height);
    }
}