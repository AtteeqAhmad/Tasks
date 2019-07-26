<template>
  <div class="task">
    <div>
      {{taskData.title}}
      <button class="btn btn-danger" @click="deleteTask">Delete Me</button>
    </div>

    <form @submit.prevent="addComment">
      <input type="text" placeholder="Comment title" v-model="newComment.title" required />
      <button type="submit" class="btn btn-info">Comment Me</button>
    </form>
    <Comment v-for="comment in comments" :commentData="comment" :key="comment._id"></Comment>

    <select v-model="newListId">
      <option v-for="list in lists" :value="list._id" :key="list._id">{{ list.title }}</option>
    </select>
    <button class="btn-sm btn-warning" type="submit" @click="move">Move List</button>
  </div>
</template>


  <script>
import Comment from "@/components/Comment.vue";
export default {
  name: "Task",
  props: ["taskData"],
  data() {
    return {
      title: "",
      newComment: {
        title: "",
        boardId: this.taskData.boardId,
        listId: this.taskData.listId,
        taskId: this.taskData._id
      },
      newListId: ""
    };
  },

  mounted() {
    let dataToSend = {};
    this.$store.dispatch("getCommentsByTaskId", this.taskData);
  },

  computed: {
    task() {
      return this.$store.state.activeTask;
    },
    comments() {
      return this.$store.state.comments[this.taskData._id];
    },
    lists() {
      return this.$store.state.lists;
    }
  },

  methods: {
    addComment() {
      this.$store.dispatch("addComment", this.newComment);
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData._id);
    },

    move() {
      this.$store.dispatch("moveTask", {
        oldListId: this.taskData.listId,
        listId: this.newListId
      });
    }
  },

  components: {
    Comment
  }
};
</script>

  <style scoped>
</style>