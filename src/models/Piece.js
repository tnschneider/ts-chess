import Square from "./Square";
import { COLORS, opposite } from "./Color";
import Move from "./Move";

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
        if (forwardOne.isValid && !this.board.hasAnyPiece(forwardOne)) { 
            yield new Move(this, forwardOne, false);

            var forwardTwo = this.getForward(2);
            if (forwardTwo && forwardTwo.isValid && !this.board.hasAnyPiece(forwardTwo)) { 
                yield new Move(this, forwardTwo, false);
            }
        }

        var takeLeft = this.getTake(true);
        if (takeLeft && takeLeft.isValid && !this.board.hasFriendlyPiece(takeLeft, this.color) && this.board.hasEnemyPiece(takeLeft, this.color)) { 
            yield new Move(this, takeLeft, true);
        }

        var takeRight = this.getTake(false);
        if (takeRight && takeRight.isValid && !this.board.hasFriendlyPiece(takeRight, this.color) && this.board.hasEnemyPiece(takeRight, this.color)) { 
            yield new Move(this, takeRight, true);
        }
    }

    copy() {
        return new Pawn(this.board, this.square, this.color);
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
                yield new Move(this, move, true);
            }
        }
    }

    copy() {
        return new Knight(this.board, this.square, this.color);
    }
}
export class Bishop extends Piece {
    constructor(board, square, color) {
        super(board, square, color, "bishop")
    }

    get abbrev() { return this.isWhite ? "WB" : "BB" }

    *getValidMoves() {
        for (let move of generateBishopMoves(this)) {
            yield new Move(this, move, true);
        }
    }

    copy() {
        return new Bishop(this.board, this.square, this.color);
    }
}
export class Rook extends Piece {
    constructor(board, square, color) {
        super(board, square, color, "rook")
    }

    get abbrev() { return this.isWhite ? "WR" : "BR" }

    *getValidMoves() {
        for (let move of generateRookMoves(this)) {
            yield new Move(this, move, true);
        }
    }

    copy() {
        return new Rook(this.board, this.square, this.color);
    }
}
export class Queen extends Piece {
    constructor(board, square, color) {
        super(board, square, color, "queen")
    }

    get abbrev() { return this.isWhite ? "WQ" : "BQ" }

    *getValidMoves() {
        for (let move of generateBishopMoves(this)) {
            yield new Move(this, move, true);
        }
        for (let move of generateRookMoves(this)) {
            yield new Move(this, move, true);
        }
    }

    copy() {
        return new Queen(this.board, this.square, this.color);
    }
}
export class King extends Piece {
    constructor(board, square, color) {
        super(board, square, color, "king")
    }

    get abbrev() { return this.isWhite ? "WK" : "BK" }

    *getValidMoves(exemptKingCheck) {
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
                && (exemptKingCheck || !this.board.anyCanMoveTo(move, opposite(this.color), true))) {
                    //TODO: fix problem with this
                yield new Move(this, move, true);
            }
        }
    }

    copy() {
        return new King(this.board, this.square, this.color);
    }
}


function *generateRookMoves(piece) {
    //up
    for (let i of range()) {
        let move = new Square(piece.square.x, piece.square.y + i);
        let check = checkMove(piece, move);
        if (check > 0) { yield move; }
        if (check < 0) { yield move; break; }
        if (check == 0) { break; }
    }
    //down
    for (let i of range()) {
        let move = new Square(piece.square.x, piece.square.y - i);
        let check = checkMove(piece, move);
        if (check > 0) { yield move; }
        if (check < 0) { yield move; break; }
        if (check == 0) { break; }
    }
    //left
    for (let i of range()) {
        let move = new Square(piece.square.x - i, piece.square.y);
        let check = checkMove(piece, move);
        if (check > 0) { yield move; }
        if (check < 0) { yield move; break; }
        if (check == 0) { break; }
    }
    //right
    for (let i of range()) {
        let move = new Square(piece.square.x + i, piece.square.y);
        let check = checkMove(piece, move);
        if (check > 0) { yield move; }
        if (check < 0) { yield move; break; }
        if (check == 0) { break; }
    }
}

function *generateBishopMoves(piece) {
    //up right
    for (let i of range()) {
        let move = new Square(piece.square.x + i, piece.square.y + i);
        let check = checkMove(piece, move);
        if (check > 0) { yield move; }
        if (check < 0) { yield move; break; }
        if (check == 0) { break; }
    }
    //up left
    for (let i of range()) {
        let move = new Square(piece.square.x - i, piece.square.y + i);
        let check = checkMove(piece, move);
        if (check > 0) { yield move; }
        if (check < 0) { yield move; break; }
        if (check == 0) { break; }
    }
    //down right
    for (let i of range()) {
        let move = new Square(piece.square.x + i, piece.square.y - i);
        let check = checkMove(piece, move);
        if (check > 0) { yield move; }
        if (check < 0) { yield move; break; }
        if (check == 0) { break; }
    }
    //down left
    for (let i of range()) {
        let move = new Square(piece.square.x - i, piece.square.y - i);
        let check = checkMove(piece, move);
        if (check > 0) { yield move; }
        if (check < 0) { yield move; break; }
        if (check == 0) { break; }
    }
}

function checkMove(piece, move) {
    let hasFriendlyPiece = piece.board.hasFriendlyPiece(move, piece.color);
    let hasEnemyPiece = piece.board.hasEnemyPiece(move, piece.color);
    if (move.isValid && !hasFriendlyPiece && !hasEnemyPiece) {
        return 1
    } else if (move.isValid && hasEnemyPiece) {
        return -1;
    } else {
        return 0;
    }
}