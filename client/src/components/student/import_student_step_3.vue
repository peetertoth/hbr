<template>
  <div>
    <b-alert show variant="info">
      Amennyiben új csoporthoz szeretnéd hozzáadni a hallgatókat, nyisd meg a
      <b-badge>Csoportok</b-badge> menüpontot, majd kattints az
      <b-badge>Új csoport létrehozása</b-badge> gombra.
      <br>
      Jelenlegi állapot az oldal újratöltéséig megmarad.
    </b-alert>
    <b-form @submit.prevent="importStudents">
      <b-form-group label="Csoport">
        <template v-for="group in groups">
          <b-form-radio v-model="model.selectedGroup"
                        v-bind:key="group" name="Csoport" :value="group" class="ml-2">
            {{ group.name }}</b-form-radio>
        </template>
        <template v-if="!groups || groups.length < 1">
          <b-alert show variant="warning">
            Nincs választható csoport!
          </b-alert>
        </template>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="!model.selectedGroup">
        Adatok rögzítése</b-button>
    </b-form>

  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import studentService from '../../service/student_service';

  export default {
    data() {
      return {
        model: {
          selectedGroup: null,
        },
      };
    },
    computed: {
      ...mapState({
        groups: state => state.group.groups,
        parsedData: state => state.studentImport.parsedData,
        group: state => state.studentImport.group,
      }),
    },
    created() {
    },
    mounted() {
      this.model.selectedGroup = this.group || null;
    },
    watch: {
      'model.selectedGroup': {
        handler() {
          this.$store.dispatch('studentImport/loadGroup', { group: this.model.selectedGroup }, { root: true });
        },
      },
    },
    methods: {
      importStudents() {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        const data = {
          students: this.parsedData,
          groupId: this.group._id,
        };
        studentService.importStudents(data).then(() => {
          this.$toast.success({
            title: 'Sikeres',
            message: 'Bejelentkezés sikeres',
          });
        });
      },
    },
  };
</script>
