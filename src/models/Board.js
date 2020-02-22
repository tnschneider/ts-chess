import Square from "./Square";

export default class Board {
    constructor() {
        this.pieces = [];
    }

    hasEnemyPiece(square, color) {
        let p = this.getPieceAt(square);
        return p && p.color !== color;
    }

    hasFriendlyPiece(square, color) {
        let p = this.getPieceAt(square);
        return p && p.color === color;
    }

    anyCanRetake(move, color) {
        let copyBoard = this.applyMove(move);

        for (let piece of copyBoard.pieces.filter(x => x.color === color && x.name !== "king")) {
            for (let otherMove of piece.getValidMoves()) {
                if (otherMove.square.equals(move.square) && otherMove.canTake) {
                    return true;
                }
            }
        }

        let king = copyBoard.pieces.find(x => x.color === color && x.name === "king");
        let piece = copyBoard.getPieceAt(move.square);

        if (Math.abs(king.square.x - piece.square.x) <= 1 && Math.abs(king.square.y - piece.square.y) <= 1) {
            return true;
        }

        return false;
    }

    hasAnyPiece(square) {
        let p = this.getPieceAt(square);
        return !!p;
    }

    getPieceAt(square) {
        return this.pieces.find(piece => piece.square.equals(square));
    }

    getPieces(color) {
        return this.pieces.filter(x => x.color === color);
    }

    print() {
        var str = "-------------------------\n"
        for (var i = 7; i >= 0; i--) {
            
            for (var j = 0; j <= 7; j++) {
                str += "|"
                let piece = this.getPieceAt(new Square(j, i)) || {};
                str += piece.abbrev || "  ";
            }

            str += "|\n"
            str += "-------------------------\n"
        }
        return str;
    }

    copy() {
        let board = new Board();
        let pieces = this.pieces.map(x => x.copy(board));
        board.pieces = pieces;
        return board;
    }

    applyMove(move) {
        var newBoard = this.copy();
        var piece = newBoard.getPieceAt(move.piece.square);
        var pieceToTake = newBoard.getPieceAt(move.square);
        if (pieceToTake) {
            pieceToTake.square = new Square(-1, -1);
            pieceToTake.isTaken = true;
        }
        piece.square.x = move.square.x;
        piece.square.y = move.square.y;
        return newBoard;
    }
}