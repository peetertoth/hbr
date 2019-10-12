<template>
  <div>
    <h1>User details</h1>
    <p>Name: {{ user.name }} </p>
    <p>Email: {{ user.email }} </p>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
      computed: {
          ...mapState({
              user: state => state.user
          })
      }
  };
</script>
