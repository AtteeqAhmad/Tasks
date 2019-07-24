<template>
  <div class="board">
    {{board.title}}
    <List></List>
  </div>
</template>

<script>
import List from "@/components/List.vue";
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
  components: {
    List
  }
};
</script>


