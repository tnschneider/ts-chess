import Square from "./Square";

export default class Board {
    constructor(pieces) {
        this.pieces = pieces;
    }

    hasEnemyPiece(square, color) {
        let p = this.getPieceAt(square);
        return p && p.color !== color;
    }

    hasFriendlyPiece(square, color) {
        let p = this.getPieceAt(square);
        return p && p.color === color;
    }

    anyCanMoveTo(square, color, andCanTake, exemptKingCheck) {
        for (let piece of this.pieces.filter(x => x.color === color)) {
            for (let move of piece.getValidMoves(exemptKingCheck)) {
                if (move.square.equals(square) && (!andCanTake || move.canTake)) {
                    return true;
                }
            }
        }
        return false;
    }

    hasAnyPiece(square) {
        let p = this.getPieceAt(square);
        return !!p;
    }

    getPieceAt(square) {
        return this.pieces.find(piece => piece.square.x === square.x && piece.square.y === square.y);
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
        let pieces = this.pieces.map(x => x.copy());
        return new Board(pieces);
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