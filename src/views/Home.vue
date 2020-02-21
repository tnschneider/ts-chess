<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>{{pString}}</p>
  </div>
</template>

<script>
import Game from "../models/Game.js";
export default {
  name: 'Home',
  data() {
    return {
      pString: null
    }
  },
  mounted() {
    var game = new Game();
    //this.pString = game.board.print();
    game.makeAllMoves();
  }
}
</script>
