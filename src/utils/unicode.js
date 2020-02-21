 const unicode = {
    PAWN: { WHITE: '\u2659', BLACK: '\u265F' },
    KNIGHT: { WHITE: '\u2658', BLACK: '\u265E' },
    BISHOP: { WHITE: '\u2657', BLACK: '\u265D' },
    ROOK: { WHITE: '\u2656', BLACK: '\u265C' },
    QUEEN: { WHITE: '\u2655', BLACK: '\u265B' },
    KING: { WHITE: '\u2654', BLACK: '\u265A' }
}

export default function getUnicode(piece) {
    switch (piece.name) {
        case "pawn":
            return piece.isWhite ? unicode.PAWN.WHITE : unicode.PAWN.BLACK;
        case "knight":
            return piece.isWhite ? unicode.KNIGHT.WHITE : unicode.KNIGHT.BLACK;
        case "bishop":
            return piece.isWhite ? unicode.BISHOP.WHITE : unicode.BISHOP.BLACK;
        case "rook":
            return piece.isWhite ? unicode.ROOK.WHITE : unicode.ROOK.BLACK;
        case "queen":
            return piece.isWhite ? unicode.QUEEN.WHITE : unicode.QUEEN.BLACK;
        case "king":
            return piece.isWhite ? unicode.KING.WHITE : unicode.KING.BLACK;
    }
}