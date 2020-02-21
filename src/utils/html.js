import getUnicode from "@/utils/unicode.js";

export function getElement(piece) {
    var div = document.createElement('div');
    div.innerText = getUnicode(piece);
    div.width = "100%";
    div.height = "100%";
    div.className="piece";
    div.dataset.x = piece.square.x;
    div.dataset.y = piece.square.y;
    return div;
}

export function getHalo(square) {
    var div = document.createElement('div');
    div.width = "100%";
    div.height = "100%";
    div.className="halo";
    div.dataset.x = square.x;
    div.dataset.y = square.y;
    return div;
}