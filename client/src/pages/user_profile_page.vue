<template>
  <b-container>
    <h1>Bejelentkezett felhasználó adatai</h1>
    <p>Név: {{ user.name }} </p>
    <p>Email: {{ user.email }} </p>
  </b-container>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        user: state => state.user.user,
      }),
    },
  };
</script>
