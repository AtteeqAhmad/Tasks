<template>
  <div class="task">
    <div>
      {{taskData.title}}
      <button class="btn btn-danger" @click="deleteTask">Delete Me</button>
    </div>
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
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData._id);
    }
  },

  components: {}
};
</script>

  <style scoped>
</style>