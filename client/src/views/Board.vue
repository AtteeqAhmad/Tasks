<template>
  <div class="board">
    {{board.title}}
    <form @submit.prevent="addList">
      <input type="text" placeholder="List title" v-model="newList.title" required />
      <button type="submit" class="btn btn-primary">Create Me</button>
    </form>
    <List v-for="list in lists" :listData="list" :key="list._id"></List>
  </div>
</template>

<script>
import List from "@/components/List.vue";
export default {
  name: "board",
  props: ["boardId"],
  data() {
    return {
      newList: {
        title: "",
        boardId: this.boardId
      }
    };
  },

  mounted() {
    let dataToSend = {
      boardId: this.$route.params.boardId
    };
    this.$store.dispatch("getBoardById", dataToSend);
    this.$store.dispatch("getListsByBoardId", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    addList() {
      this.$store.dispatch("addList", this.newList);
      this.newList = { title: "", boardId: this.boardId };
    }
  },
  components: {
    List
  }
};
</script>


