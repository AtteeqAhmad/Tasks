<template>
  <div class="list">
    {{list.title}}
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" required />
      <button class="btn btn-primary" @click="createList">Create Me</button>
      <button class="btn btn-danger" @click="deletelist">Delete Me</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      newList: {}
    };
  },

  mounted() {
    let dataToSend = {
      listId: this.$route.params.listId
    };
    this.$store.dispatch("getLists", dataToSend);
  },

  computed: {
    list() {
      return this.$store.state.lists;
    }
  },

  methods: {
    addList() {
      this.$store.dispatch("addList", this.newList);
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.list._id);
    }
  },

  components: {}
};
</script>

<style scoped>
</style>
