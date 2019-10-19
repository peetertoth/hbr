<template>
  <b-navbar id="top-menu" toggleable="md" type="dark" variant="dark" sticky>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#" class="mr-xl-5" @click="navigateTo('home')">HBR</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item href="#" v-if="user"
                    @click="navigateTo('group')">Csoportok</b-nav-item>
        <b-nav-item href="#" v-if="user"
                    @click="navigateTo('student')">Hallgatók</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right v-if="user">
          <!-- Using button-content slot -->
          <template slot="button-content">
            {{ user.name }}
          </template>
          <b-dropdown-item href="#" @click="navigateTo('profile')"> Profil</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout">Kijelentkezés</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item right href="#" v-else
                    @click="navigateTo('login')">
          Bejelentkezés
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<style>
  #top-menu {
    text-align: center;
  }
</style>
<script>

  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        user: state => state.user.user,
      }),
    },
    data() {
      return {};
    },
    async created() {
      if (!this.user) {
        // try to get user from server
        // console.log('User is not in store, try to get from server');
        await this.$store.dispatch('user/getCurrentUser', null, { root: true });
      }
    },
    methods: {
      navigateTo(name) {
        this.$router.push({ name });
      },
      logout() {
        this.$store.dispatch('common/startLoading', null, { root: true });

        this.$store.dispatch('user/logoutUser', null, { root: true });

        this.$store.dispatch('common/stopLoading', null, { root: true }).then(() => {
          this.$router.push({ name: 'home' });
          this.$toast.success({
            title: 'Kijelentkezés',
            message: 'Sikeres kijelentkezés',
          });
        });
      },
    },
  };
</script>
