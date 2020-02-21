<template>
  <div class="home">
    <Board v-if="board" :game="game"></Board>
  </div>
</template>

<script>
import Game from "../models/Game.js";
import Board from "../components/Board.vue";
export default {
  name: 'Home',
  components: {
    Board
  },
  data() {
    return {
      game: null
    }
  },
  computed: {
    board() {
      return (this.game || {}).board;
    }
  },
  mounted() {
    this.game = new Game();
  }
}
</script>
