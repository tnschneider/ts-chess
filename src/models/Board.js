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

    anyCanMoveTo(square, color) {

        return square || color;
    }

    hasAnyPiece(square) {
        let p = this.getPieceAt(square);
        return !!p;
    }

    getPieceAt(square) {
        return this.pieces.find(piece => piece.square.x === square.x && piece.square.y === square.y);
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
}