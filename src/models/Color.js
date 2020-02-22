export default class Color {
    static white = new Color("white");
    static black = new Color("black");

    constructor(name) {
        this.name = name;
    }

    get opposite() {
        return this == Color.white
            ? Color.black
            : Color.white;
    }
}