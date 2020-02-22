import Board from "./Board";
import { Pawn, Bishop, Rook, Queen, King, Knight } from "./Piece";
import Square from "./Square";
import Color from "./Color";

export default class Game {
    constructor() {
        this.board = new Board();
        
        let pieces = [
            new Knight(this.board, new Square(1, 0), Color.white),
            new Knight(this.board, new Square(1, 7), Color.black),
            new Knight(this.board, new Square(6, 0), Color.white),
            new Knight(this.board, new Square(6, 7), Color.black),
            new Bishop(this.board, new Square(2, 0), Color.white),
            new Bishop(this.board, new Square(2, 7), Color.black),
            new Bishop(this.board, new Square(5, 0), Color.white),
            new Bishop(this.board, new Square(5, 7), Color.black),
            new Rook(this.board, new Square(0, 0), Color.white),
            new Rook(this.board, new Square(0, 7), Color.black),
            new Rook(this.board, new Square(7, 0), Color.white),
            new Rook(this.board, new Square(7, 7), Color.black),
            new Queen(this.board, new Square(3, 0), Color.white),
            new Queen(this.board, new Square(3, 7), Color.black),
            new King(this.board, new Square(4, 0), Color.white),
            new King(this.board, new Square(4, 7), Color.black)
        ];

        for (let i = 0; i <= 7; i++) {
            pieces.push(new Pawn(this.board, new Square(i, 1), Color.white));
            pieces.push(new Pawn(this.board, new Square(i, 6), Color.black));
        }

        this.board.pieces = pieces;
    }

    makeMove(move) {
        this.board = this.board.applyMove(move, true);
    }
}