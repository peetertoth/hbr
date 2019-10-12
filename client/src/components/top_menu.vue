<template>
  <b-navbar toggleable="md" type="dark" variant="dark" sticky>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#" class="mr-xl-5" @click="navigateTo('home')">HBR</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

<!--      <b-navbar-nav>-->
<!--        <b-nav-item href="#">Link</b-nav-item>-->
<!--      </b-navbar-nav>-->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right v-if="user">
          <!-- Using button-content slot -->
          <template slot="button-content">
            {{ user.name }}
          </template>
          <b-dropdown-item href="#" @click="navigateTo('profile')"> Profil </b-dropdown-item>
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
<script>

  import { mapState } from 'vuex';

  export default {
      computed: {
        ...mapState({
            user: state => state.user
        })
      },
      data() {
          return {
          };
      },
      async created() {
          if (!this.user) {
              // try to get user from server
              console.log('User is not in store, try to get from server');
              this.$store.dispatch('getCurrentUser');
          }
      },
      methods: {
          navigateTo(name) {
              this.$router.push({name});
          },
          logout() {
              console.log('Logout user');
              this.$store.dispatch('logoutUser');
              this.$router.push({ name: 'home' });
          }
      }
  };
</script>
