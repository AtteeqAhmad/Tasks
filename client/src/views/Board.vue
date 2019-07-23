<template>
  <div class="board">{{board.title}}</div>
</template>

<script>
export default {
  name: "board",
  computed: {
    board() {
      return (
        //FIXME This does not work on page reload because the boards array is empty in the store
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    }
  },
  props: ["boardId"]
};
</script>


<!-- // <script>
// export default {
//   name: "board",
//   data() {
//     retrun {}
//   },
//   mounted() {
//     let dataToSend = {
//       boardId: this.$route.params.boardId
//     };
//     this.$store.dispatch("getBoardByID", dataToSend);
//   },
//   computed: {
//     board() {
//       return this.$store.state.activeBoard;
//     }
//   },
//   methods: {
//     deleteBoard() {
//       this.$store.dispatch("deleteBoard", this.board._id);
//     }
//   },
//   components: {}
// };
// </script>
