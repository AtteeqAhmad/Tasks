<template>
  <div class="board">
    {{board.title}}
    <button class="btn btn-danger" @click="deleteBoard">Delete Me</button>
  </div>
</template>

<script>
export default {
  name: "board",
  data() {
    return {};
  },

  mounted() {
    let dataToSend = {
      boardId: this.$route.params.boardId
    };
    this.$store.dispatch("getBoardById", dataToSend);
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    }
  },
  methods: {
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.board._id);
    }
  },
  components: {}
};
</script>


