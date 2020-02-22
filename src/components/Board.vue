<template>
  <div class="b" ref="board">
  <div class="r r-7 odd">
    <div class="c c-0 even"></div><div class="c c-1 odd"></div><div class="c c-2 even"></div><div class="c c-3 odd"></div>
    <div class="c c-4 even"></div><div class="c c-5 odd"></div><div class="c c-6 even"></div><div class="c c-7 odd"></div>
  </div>
  <div class="r r-6 even">
    <div class="c c-0 even"></div><div class="c c-1 odd"></div><div class="c c-2 even"></div><div class="c c-3 odd"></div>
    <div class="c c-4 even"></div><div class="c c-5 odd"></div><div class="c c-6 even"></div><div class="c c-7 odd"></div>
  </div>
  <div class="r r-5 odd">
    <div class="c c-0 even"></div><div class="c c-1 odd"></div><div class="c c-2 even"></div><div class="c c-3 odd"></div>
    <div class="c c-4 even"></div><div class="c c-5 odd"></div><div class="c c-6 even"></div><div class="c c-7 odd"></div>
  </div>
  <div class="r r-4 even">
    <div class="c c-0 even"></div><div class="c c-1 odd"></div><div class="c c-2 even"></div><div class="c c-3 odd"></div>
    <div class="c c-4 even"></div><div class="c c-5 odd"></div><div class="c c-6 even"></div><div class="c c-7 odd"></div>
  </div>
  <div class="r r-3 odd">
    <div class="c c-0 even"></div><div class="c c-1 odd"></div><div class="c c-2 even"></div><div class="c c-3 odd"></div>
    <div class="c c-4 even"></div><div class="c c-5 odd"></div><div class="c c-6 even"></div><div class="c c-7 odd"></div>
  </div>
  <div class="r r-2 even">
    <div class="c c-0 even"></div><div class="c c-1 odd"></div><div class="c c-2 even"></div><div class="c c-3 odd"></div>
    <div class="c c-4 even"></div><div class="c c-5 odd"></div><div class="c c-6 even"></div><div class="c c-7 odd"></div>
  </div>
  <div class="r r-1 odd">
    <div class="c c-0 even"></div><div class="c c-1 odd"></div><div class="c c-2 even"></div><div class="c c-3 odd"></div>
    <div class="c c-4 even"></div><div class="c c-5 odd"></div><div class="c c-6 even"></div><div class="c c-7 odd"></div>
  </div>
  <div class="r r-0 even">
    <div class="c c-0 even"></div><div class="c c-1 odd"></div><div class="c c-2 even"></div><div class="c c-3 odd"></div>
    <div class="c c-4 even"></div><div class="c c-5 odd"></div><div class="c c-6 even"></div><div class="c c-7 odd"></div>
  </div>
  </div>
</template>

<script>
import Square from "@/models/Square.js";
import { getElement, getHalo } from "@/utils/html.js";

export default {
  name: 'Board',
  data() {
    return {
      currentMoves: []
    }
  },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  computed: {
    board() {
      return (this.game || {}).board;
    }
  },
  methods: {
    renderBoard() {
      if (!this.board) return;
      for (let i = 7; i >= 0; i--) {
        for (let j = 0; j <= 7; j++) {
          let location = new Square(j, i);
          let square = this.getSquareAt(location);
          if (square.firstChild) square.removeChild(square.firstChild);
          let piece = this.board.getPieceAt(location);
          if (piece) {
            var el = getElement(piece);
            el.onclick = this.onPieceClicked;
            square.appendChild(el);
          }
        }
      }
    },
    highlightMovableSquares(piece) {
      this.clearCurrentMoves();
      for (let move of piece.getValidMoves()) {
        let square = this.getSquareAt(move.square);
        let halo = getHalo(move.square)
        halo.onclick = this.onHaloClicked;
        square.appendChild(halo);
        this.currentMoves.push({move, halo});
      }
    },
    getSquareAt(square) {
      let board = this.$refs.board;
      let q = `.r-${square.y} > .c-${square.x}`;
      return board.querySelector(q);
    },
    onPieceClicked(e) {
      let square = new Square(parseInt(e.target.dataset.x), parseInt(e.target.dataset.y));
      let piece = this.board.getPieceAt(square);
      if (piece.color !== this.game.board.turnColor) return;
      this.highlightMovableSquares(piece);
    },
    onHaloClicked(e) {
      let square = new Square(parseInt(e.target.dataset.x), parseInt(e.target.dataset.y));
      let move = this.currentMoves.find(x => x.move.square.equals(square));
      this.game.makeMove(move.move);
      this.clearCurrentMoves();
    },
    clearCurrentMoves() {
      for (let move of this.currentMoves) {
        move.halo.parentNode.removeChild(move.halo);
      }
      this.currentMoves = [];
    }
  },
  mounted() {
    this.renderBoard();
  },
  watch: {
    board() { 
      this.renderBoard();
    }
  }
}
</script>
<style lang="scss">
  .even > .even {
    background-color: darkgray;
  }
  .even > .odd {
    background-color: lightgray;
  }
  .odd > .even {
    background-color: lightgray;
  }
  .odd > .odd {
    background-color: darkgray;
  }
  .c {
    height: 50px;
    width: 50px;
    position: relative;
  }
  .b {
    display: flex;
    flex-direction: column; 
  }
  .r {
    display: flex;
    flex-direction: row; 
  }
  .piece {
    line-height: 50px;
    font-size: 30px;
    user-select: none;
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    width: 100%;
  }
  .halo {
    background-color: orange;
    opacity: 0.5;
    z-index: 50;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0; left: 0;
  }
</style>
