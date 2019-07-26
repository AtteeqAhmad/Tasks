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
      }
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
    }
  },

  methods: {
    addComment() {
      this.$store.dispatch("addComment", this.newComment);
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData._id);
    }
  },

  components: {
    Comment
  }
};
</script>

  <style scoped>
</style>