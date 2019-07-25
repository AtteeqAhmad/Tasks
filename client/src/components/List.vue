<template>
  <div class="list">
    <div>
      {{listData.title}}
      <button class="btn btn-danger" @click="deleteList(listData._id)">Delete Me</button>
    </div>

    <form @submit.prevent="addTask">
      <input type="text" placeholder="Task title" v-model="newTask.title" required />
      <button type="submit" class="btn btn-primary">I'm your Task</button>
    </form>
    <Task v-for="task in tasks" :taskData="task" :key="task._id"></Task>
  </div>
</template>

<script>
import Task from "@/components/Task.vue";
export default {
  name: "List",
  props: ["listData"],
  data() {
    return {
      title: "",
      newTask: {
        title: "",
        listId: this.listData._id
      }
    };
  },

  mounted() {
    let dataToSend = {};
    this.$store.dispatch("getTasksByListId", this.listData);
  },

  computed: {
    list() {
      return this.$store.state.activeList;
    },
    tasks() {
      return this.$store.state.tasks;
    }
  },

  methods: {
    addTask() {
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = { title: "", listId: this.listData._id };
    },
    deleteList(id) {
      this.$store.dispatch("deleteList", id);
    }
  },

  components: { Task }
};
</script>

<style scoped>
* {
  outline: 1px solid black;
}
</style>
