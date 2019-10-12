<template>
  <b-container>
    <h1 class="mb-3"> Bejelentkezés </h1>
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
  import AuthService from '../service/AuthService';

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
        this.$store.dispatch('startLoading');

        const response = await AuthService.loginUser(this.model);
        const { status } = response;
        if (status === 200) {
          this.$store.dispatch('getCurrentUser');

          this.$store.dispatch('stopLoading').then(() => {
            this.$toast.success({
              title: 'Sikeres',
              message: 'Bejelentkezés sikeres',
            });
            this.$router.push({ name: 'home' });
          });
        } else {
          console.log('response', JSON.stringify(response));

          this.$store.dispatch('stopLoading');
        }
      },
    },
  };

</script>
