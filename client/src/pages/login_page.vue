<template>
  <b-container>
    <b-row align-h="center" class="mt-3 mt-xl-5">
      <b-col cols="12" xl="5" align="center">
        <h1> Bejelentkezés </h1>
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-3 mt-xl-5">
      <b-col cols="12" xl="5" align="left">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">E-mail</label>
            <input type="email"
                   class="form-control"
                   id="exampleInputEmail1"
                   v-model="model.email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Jelszó</label>
            <input type="password"
                   class="form-control"
                   id="exampleInputPassword1"
                   v-model="model.password">
          </div>
          <button type="button" class="btn btn-primary" @click="login">Bejelentkezés</button>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
  import AuthService from '../service/auth_service';

  export default {
    data() {
      return {
        model: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      async login() {
        this.$store.dispatch('common/startLoading', null, { root: true });

        try {
          await AuthService.loginUser(this.model);

          this.$store.dispatch('user/getCurrentUser', null, { root: true });

          this.$store.dispatch('common/stopLoading', null, { root: true }).then(() => {
            this.$toast.success({
              title: 'Sikeres',
              message: 'Bejelentkezés sikeres',
            });
            this.$router.push({ name: 'home' });
          });
        } catch (e) {
          this.$store.dispatch('common/stopLoading', null, { root: true });
        }
      },
    },
  };

</script>
