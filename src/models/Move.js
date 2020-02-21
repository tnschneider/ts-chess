export default class Move {
    constructor(piece, square, canTake) {
        this.piece = piece;
        this.square = square;
        this.canTake = canTake;
    }
}