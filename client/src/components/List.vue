<template>
  <div class="list">
    {{list.title}}
    <button class="btn btn-danger" @click="deletelist">Delete Me</button>
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
    deleteList() {
      this.$store.dispatch("deleteList", this.list._id);
    }
  },

  components: {}
};
</script>

<style scoped>
</style>
