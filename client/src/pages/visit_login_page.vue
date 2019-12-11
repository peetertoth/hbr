<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="12">
        <h1>Bejelentkezés megtekintésre</h1>
      </b-col>
    </b-row>
    <!-- Content -->
    <b-row align-h="center" class="mt-3">
      <b-col cols="12">
        <form ref="create_new_visit_form" @submit.stop.prevent="visitLogin">
          <b-form-group label="Neptun"
                        label-for="neptun-input">
            <b-form-input id="neptun-input"
                          v-model="neptun"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" :disabled="!neptun">
            Küldés
          </b-button>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
  import VisitService from '../service/visit_service';

  export default {
    data() {
      return {
        neptun: '',
      };
    },
    methods: {
      visitLogin() {
        VisitService.visitLogin({ neptun: this.neptun, visitId: this.$route.params.id }).then((r) => {
          this.$toast.success({
            title: 'Sikeres',
            message: 'Megtekintésre való bejelentkezés sikeres',
          });
          this.neptun = '';
        });
      },
    },
  };
</script>
