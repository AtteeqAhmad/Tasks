<template>
  <div class="list">
    <div>
      {{listData.title}}
      <button class="btn btn-danger" @click="deleteList(listData._id)">Delete Me</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: ["listData"],
  data() {
    return {
      title: ""
    };
  },

  mounted() {},

  computed: {},

  methods: {
    deleteList(id) {
      this.$store.dispatch("deleteList", id);
    }
  },

  components: {}
};
</script>

<style scoped>
* {
  outline: 1px solid black;
}
</style>
