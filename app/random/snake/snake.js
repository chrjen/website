class Snake {

    constructor(board) {
        this.forward = {x: 1, y: 0};
        this.newForward = this.forward;
        this.board = board;
        this.body = [
            {x: 0, y:0},
            {x: 1, y:0},
            {x: 2, y:0},
        ];
        this.maxLen = this.body.length;

        this.body.forEach((tile) => {
            this.board.setTile(tile.x, tile.y, "snake");
        });
    }

    tick() {
        this.forward = this.newForward;
        
        let head = this.body[this.body.length-1];
        head = {
            x: head.x + this.forward.x,
            y: head.y + this.forward.y,
        };

        this.board.setTile(head.x, head.y, "snake");
        this.board.setTile(this.body[0].x, this.body[0].y, "empty");

        this.body.push(head);

        while (this.body.length > this.maxLen) {
            this.body.shift();
        }
    }

    grow() {
        this.maxLen++;
    }

    keyPressed() {
        if (this.forward.x == 0) {
            if (keyCode == RIGHT_ARROW) {
                this.newForward = { x: 1, y: 0 };
            } else if (keyCode == LEFT_ARROW) {
                this.newForward = { x: -1, y: 0 };
            }
        } else {
            if (keyCode == DOWN_ARROW) {
                this.newForward = { x: 0, y: 1 };
            } else if (keyCode == UP_ARROW) {
                this.newForward = { x: 0, y: -1 };
            }
        }
    }
}