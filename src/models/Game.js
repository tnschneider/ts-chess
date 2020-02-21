import Board from "./Board";
import { Pawn, Bishop, Rook, Queen, King, Knight } from "./Piece";
import Square from "./Square";
import { COLORS, opposite } from "./Color";

export default class Game {
    constructor() {
        this.turnColor = COLORS.WHITE;

        this.board = new Board();
        
        let pieces = [
            new Knight(this.board, new Square(1, 0), COLORS.WHITE),
            new Knight(this.board, new Square(1, 7), COLORS.BLACK),
            new Knight(this.board, new Square(6, 0), COLORS.WHITE),
            new Knight(this.board, new Square(6, 7), COLORS.BLACK),
            new Bishop(this.board, new Square(2, 0), COLORS.WHITE),
            new Bishop(this.board, new Square(2, 7), COLORS.BLACK),
            new Bishop(this.board, new Square(5, 0), COLORS.WHITE),
            new Bishop(this.board, new Square(5, 7), COLORS.BLACK),
            new Rook(this.board, new Square(0, 0), COLORS.WHITE),
            new Rook(this.board, new Square(0, 7), COLORS.BLACK),
            new Rook(this.board, new Square(7, 0), COLORS.WHITE),
            new Rook(this.board, new Square(7, 7), COLORS.BLACK),
            new Queen(this.board, new Square(3, 0), COLORS.WHITE),
            new Queen(this.board, new Square(3, 7), COLORS.BLACK),
            new King(this.board, new Square(4, 0), COLORS.WHITE),
            new King(this.board, new Square(4, 7), COLORS.BLACK)
        ];

        for (let i = 0; i <= 7; i++) {
            pieces.push(new Pawn(this.board, new Square(i, 1), COLORS.WHITE));
            pieces.push(new Pawn(this.board, new Square(i, 6), COLORS.BLACK));
        }

        this.board.pieces = pieces;
    }

    makeMove(move) {
        this.board = this.board.applyMove(move);
        this.turnColor = opposite(this.turnColor);
    }

    makeFirstMove() {
        let madeMove = false;
        for (let piece of this.board.getPieces(this.turnColor)) {
            for (let move of piece.getValidMoves()) {
                this.board = this.board.applyMove(move);
                madeMove = true;
                break;
            }
            if (madeMove) break;
        }
        
        this.turnColor = opposite(this.turnColor);

        return madeMove;
    }
}