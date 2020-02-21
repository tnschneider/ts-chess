export default class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get isValid() {
        return this.x >= 0 
            && this.x <= 7
            && this.y >= 0
            && this.y <= 7;
    }
}