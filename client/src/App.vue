<template>
  <div id="app">
    <top-menu id="top-menu"></top-menu>
    <router-view class="mt-3 mt-lx-5"/>
    <div id="loading" v-if="loading">
      <b-spinner big type="grow" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<style>
  #app {
    text-align: center;
  }

  #loading {
    background-color: #8e908c;
    opacity: 0.5;
    display: block;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  #loading .spinner-grow {
    position: fixed;
    top: calc(50% - 5rem);
    left: calc(50% - 5rem);
    width: 10rem;
    height: 10rem;
  }

  #top-menu {
    z-index: 9;
  }

</style>
<script>
  import { mapState } from 'vuex';
  import TopMenu from './components/top_menu.vue';

  export default {
    components: {
      TopMenu,
    },
    computed: {
      ...mapState({
        loading: state => state.common.loading,
      }),
    },
    data() {
      return {};
    },
  };
</script>
