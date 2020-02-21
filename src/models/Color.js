export const COLORS = {
    WHITE: "WHITE",
    BLACK: "BLACK"
};

export function opposite(color) {
    return color === COLORS.WHITE
        ? COLORS.BLACK
        : COLORS.WHITE;
}