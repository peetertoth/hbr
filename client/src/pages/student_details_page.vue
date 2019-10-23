<template>
  <b-container v-if="initialized">
    <h1 class="mb-5"> <i>{{ student.fullName }}</i> hallgató adatai</h1>
    <b-row class="my-2">
      <b-col xl="2">
        <label><strong>Vezetéknév:</strong></label>
      </b-col>
      <b-col xl="10">
        <input-edit v-model="student.lastName" ></input-edit>
      </b-col>
    </b-row>
    <b-row class="my-2">
      <b-col xl="2">
        <label><strong>Keresztnév:</strong></label>
      </b-col>
      <b-col xl="10">
        <input-edit v-model="student.firstName" ></input-edit>
      </b-col>
    </b-row>
    <b-row class="my-2">
      <b-col xl="2">
        <label><strong>Neptun:</strong></label>
      </b-col>
      <b-col xl="10">
        <input-edit v-model="student.neptun" ></input-edit>
      </b-col>
    </b-row>
    <b-row class="">
      <b-col xl="2">
        <label><strong>Létrehozva:</strong></label>
      </b-col>
      <b-col xl="10">
        {{ student.createdAt }}
      </b-col>
    </b-row>

    <h2 class="my-5">Csoportok amelyekhez hozzá van rendelve</h2>
    <b-row align-h="center">
      <b-col cols="12">
        <b-table stacked="sm" simple hover head-variant="light"
                 :items="student.groups"
                 :fields="tableFields"
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner big type="grow" label="Spinning"></b-spinner>
            </div>
          </template>

          <template v-slot:cell(actions)="data">
            <b-button variant="outline-info" @click="openUserDetails(data.item._id)">
              Részletek
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
  import { mapState } from 'vuex';
  import InputEdit from '../components/input_edit';

  export default {
    components: {
      InputEdit,
    },
    data() {
      return {
        initialized: false,
        tableFields: [
          {
            key: 'name',
            label: 'Név',
            sortable: false,
          },
          {
            key: 'createdAt',
            label: 'Csoporthoz rendelve',
            sortable: false,
          },
          {
            key: 'actions',
            label: 'Műveletek',
            sortable: false,
          },
        ],
      };
    },
    computed: {
      ...mapState({
        student: state => state.studentDetails.student,
      }),
    },
    created() {
      this.$store.dispatch('studentDetails/loadStudent', { id: this.$route.params.id }, { root: true }).then(() => {
        this.initialized = true;
      });
    },
    methods: {
      openUserDetails(id) {
        console.warn('TODO: implement openUserDetails');
        this.$toast.warn({
          title: 'Warn',
          message: 'TODO: implement openUserDetails',
        });
      },
    },
  };
</script>
