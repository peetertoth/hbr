<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="12">
        <h1>Hallgatók</h1>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="12" class="mt-3">
        <b-button class="ml-2" variant="outline-primary" @click="importStudents">
          Hallgatók felvétele
        </b-button>
      </b-col>
    </b-row>
    <!-- Content -->
    <b-row align-h="center" class="mt-3">
      <b-col cols="12">
        <b-table stacked="sm" simple hover head-variant="light"
                 :items="items"
                 :fields="tableFields"
                 :busy="loadingItems"
                 emptyText="Nem található hallgató"
                 show-empty>
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner big type="grow" label="Spinning"></b-spinner>
            </div>
          </template>

          <template v-slot:cell(actions)="data">
            <b-button variant="outline-info" @click="openStudentDetails(data.item._id)">
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

  export default {
    data() {
      return {
        modal: {
          text: '',
        },
        loadingItems: false,
        tableFields: [
          {
            key: 'fullName',
            label: 'Név',
            sortable: false,
          },
          {
            key: 'neptun',
            label: 'Neptun',
            sortable: false,
          },
          {
            key: 'createdAt',
            label: 'Hozzáadva',
            sortable: true,
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
        items: state => state.student.students,
      }),
    },
    created() {
      this.loadingItems = true;
      this.$store.dispatch('student/loadStudents', null, { root: true }).then(() => {
        setTimeout(() => {
          this.loadingItems = false;
        }, 1000);
      });
    },
    methods: {
      openStudentDetails(studentId) {
        this.$router.push({ name: 'student-details', params: { id: studentId } });
      },
      createNewStudent() {
      },
      importStudents() {
        this.$router.push({ name: 'import-students' });
      },
    },
  };
</script>
