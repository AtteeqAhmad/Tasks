<template>
  <div class="comment">
    <div>
      {{commentData.title}}
      <button
        class="btn btn-danger"
        @click="deleteComment(commentData._id)"
      >Delete Comment</button>
    </div>
  </div>
</template>
  
  
  
  <script>
export default {
  name: "comment",
  props: ["commentData"],
  data() {
    return {
      title: ""
    };
  },

  mounted() {},

  computed: {
    comment() {
      return this.$store.state.activeComment;
    }
  },

  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.commentData._id);
    }
  },

  components: {}
};
</script>


 <style scoped>
</style>