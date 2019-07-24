<template>
  <div class="list">
    <div v-for="list in lists" :key="list._id">
      {{list.title}}
      <button class="btn btn-danger" @click="deleteList(list._id)">Delete Me</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      title: ""
    };
  },

  mounted() {},

  computed: {
    lists() {
      return this.$store.state.lists;
    }
  },

  methods: {
    deleteList(id) {
      this.$store.dispatch("deleteList", id);
    }
  },

  components: {}
};
</script>

<style scoped>
</style>
