import Square from "./Square";
import { COLORS, opposite } from "./Color";

function *range() {
    for (let i = 1; i < 7; i++) {
        yield i;
    }
}

export class Piece {
    constructor(board, square, color, name) {
        this.board = board;
        this.square = square;
        this.color = color;
        this.name = name;
        this.isTaken = false;
    }

    get sprite() {
        return `${this.name}_${this.color}.png`.toLowerCase();
    }

    get isWhite() {
        return this.color === COLORS.WHITE;
    }

    get isBlack() {
        return !this.isWhite;
    }
}

export class Pawn extends Piece {
    constructor(board, square, color) {
        super(board, square, color, "pawn")
    }

    get abbrev() { return this.isWhite ? "WP" : "BP" }

    getForward(n) {
        if (n === 2 && this.isWhite && this.square.y != 1) return null;
        if (n === 2 && this.isBlack && this.square.y != 6) return null;

        return this.isWhite
            ? new Square(this.square.x, this.square.y + n)
            : new Square(this.square.x, this.square.y - n);
    }

    getTake(left) {
        if (this.isWhite) {
            return left
                ? new Square(this.square.x - 1, this.square.y + 1)
                : new Square(this.square.x + 1, this.square.y + 1);
        } else {
            return left
                ? new Square(this.square.x + 1, this.square.y - 1)
                : new Square(this.square.x - 1, this.square.y - 1);
        }
            
    }

    *getValidMoves() {
        var forwardOne = this.getForward(1);
        if (forwardOne.isValid && !this.board.hasAnyPiece(forwardOne)) { yield forwardOne; }
        
        var forwardTwo = this.getForward(2);
        if (forwardTwo && forwardTwo.isValid && !this.board.hasAnyPiece(forwardTwo)) { yield forwardTwo; }

        var takeLeft = this.getTake(true);
        if (takeLeft && takeLeft.isValid && !this.board.hasFriendlyPiece(takeLeft) && this.board.hasEnemyPiece(takeLeft, this.color)) { yield takeLeft; }

        var takeRight = this.getTake(false);
        if (takeRight && takeRight.isValid && !this.board.hasFriendlyPiece(takeRight) && this.board.hasEnemyPiece(takeLeft, this.color)) { yield takeRight; }
    }
}
export class Knight extends Piece {
    constructor(board, square, color) {
        super(board, square, color, "knight")
    }

    get abbrev() { return this.isWhite ? "WN" : "BN" }

    *getValidMoves() {
        var allMoves = [
            new Square(this.square.x - 2, this.square.y - 1),
            new Square(this.square.x - 2, this.square.y + 1),
            new Square(this.square.x + 2, this.square.y - 1),
            new Square(this.square.x + 2, this.square.y + 1),
            new Square(this.square.x - 1, this.square.y - 2),
            new Square(this.square.x - 1, this.square.y + 2),
            new Square(this.square.x + 1, this.square.y - 2),
            new Square(this.square.x + 1, this.square.y + 2)
        ];

        for (let move of allMoves) {
            if (move.isValid && !this.board.hasFriendlyPiece(move, this.color)) {
                yield move;
            }
        }
    }
}
export class Bishop extends Piece {
    constructor(board, square, color) {
        super(board, square, color, "bishop")
    }

    get abbrev() { return this.isWhite ? "WB" : "BB" }

    *getValidMoves() {
        for (let move of generateBishopMoves(this)) {
            yield move;
        }
    }
}
export class Rook extends Piece {
    constructor(board, square, color) {
        super(board, square, color, "rook")
    }

    get abbrev() { return this.isWhite ? "WR" : "BR" }

    *getValidMoves() {
        for (let move of generateRookMoves(this)) {
            yield move;
        }
    }
}
export class Queen extends Piece {
    constructor(board, square, color) {
        super(board, square, color, "queen")
    }

    get abbrev() { return this.isWhite ? "WQ" : "BQ" }

    *getValidMoves() {
        for (let move of generateBishopMoves(this)) {
            yield move;
        }
        for (let move of generateRookMoves(this)) {
            yield move;
        }
    }
}
export class King extends Piece {
    constructor(board, square, color) {
        super(board, square, color, "king")
    }

    get abbrev() { return this.isWhite ? "WK" : "BK" }

    *getValidMoves() {
        var allMoves = [
            new Square(this.square.x + 1, this.square.y + 1),
            new Square(this.square.x + 1, this.square.y),
            new Square(this.square.x + 1, this.square.y - 1),
            new Square(this.square.x, this.square.y + 1),
            new Square(this.square.x, this.square.y - 1),
            new Square(this.square.x - 1, this.square.y + 1),
            new Square(this.square.x - 1, this.square.y),
            new Square(this.square.x - 1, this.square.y - 1)
        ];

        for (let move of allMoves) {
            if (move.isValid && !this.board.hasFriendlyPiece(move, this.color)
                && this.board.anyCanMoveTo(move, opposite(this.color))) {
                yield move;
            }
        }
    }
}


function *generateRookMoves(piece) {
    //up
    for (let i of range()) {
        let move = new Square(piece.square.x, piece.square.y + i);
        let hasFriendlyPiece = piece.board.hasFriendlyPiece(move, piece.color);
        if (move.isValid && !hasFriendlyPiece) {
            yield move;
        } else {
            break;
        }
    }
    //down
    for (let i of range()) {
        let move = new Square(piece.square.x, piece.square.y - i);
        let hasFriendlyPiece = piece.board.hasFriendlyPiece(move, piece.color);
        if (move.isValid && !hasFriendlyPiece) {
            yield move;
        } else {
            break;
        }
    }
    //left
    for (let i of range()) {
        let move = new Square(piece.square.x - i, piece.square.y);
        let hasFriendlyPiece = piece.board.hasFriendlyPiece(move, piece.color);
        if (move.isValid && !hasFriendlyPiece) {
            yield move;
        } else {
            break;
        }
    }
    //right
    for (let i of range()) {
        let move = new Square(piece.square.x + i, piece.square.y);
        let hasFriendlyPiece = piece.board.hasFriendlyPiece(move, piece.color);
        if (move.isValid && !hasFriendlyPiece) {
            yield move;
        } else {
            break;
        }
    }
}

function *generateBishopMoves(piece) {
    //up right
    for (let i of range()) {
        let move = new Square(piece.square.x + i, piece.square.y + i);
        let hasFriendlyPiece = piece.board.hasFriendlyPiece(move, piece.color);
        if (move.isValid && !hasFriendlyPiece) {
            yield move;
        } else {
            break;
        }
    }
    //up left
    for (let i of range()) {
        let move = new Square(piece.square.x - i, piece.square.y + i);
        let hasFriendlyPiece = piece.board.hasFriendlyPiece(move, piece.color);
        if (move.isValid && !hasFriendlyPiece) {
            yield move;
        } else {
            break;
        }
    }
    //down right
    for (let i of range()) {
        let move = new Square(piece.square.x + i, piece.square.y - i);
        let hasFriendlyPiece = piece.board.hasFriendlyPiece(move, piece.color);
        if (move.isValid && !hasFriendlyPiece) {
            yield move;
        } else {
            break;
        }
    }
    //down left
    for (let i of range()) {
        let move = new Square(piece.square.x - i, piece.square.y - i);
        let hasFriendlyPiece = piece.board.hasFriendlyPiece(move, piece.color);
        if (move.isValid && !hasFriendlyPiece) {
            yield move;
        } else {
            break;
        }
    }
}