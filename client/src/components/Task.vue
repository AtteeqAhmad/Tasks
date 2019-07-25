<template>
  <div class="task">
    <div>
      {{taskData.title}}
      <button class="btn btn-danger" @click="deleteTask(taskData._id)">Delete Me</button>
    </div>
    <!-- 
    <form @submit.prevent="addTask">
      <input type="text" placeholder="title" v-model="newTask.title" required />
      <button type="submit" class="btn btn-primary">I'm your Task</button>
    </form>
    <Task v-for="task in tasks" :taskData="task" :key="task._id"></Task>
    </div>-->
  </div>
</template>


  <script>
export default {
  name: "Task",
  props: ["taskData"],
  data() {
    return {
      title: "",
      taskId: this.taskId
    };
  },

  mounted() {
    let dataToSend = {
      tastId: this.$route.params.taskId
    };
  },

  computed: {},

  methods: {
    deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
    }
  },

  components: {}
};
</script>

  <style scoped>
</style>