<template>
  <b-container v-if="initialized">
    <h1 class="mb-5">Csoport részletei</h1>
    <b-row class="my-2">
      <b-col xl="2">
        <label><strong>Név:</strong></label>
      </b-col>
      <b-col xl="10">
        <input-edit v-model="group.name" @edit="onNameChange"></input-edit>
      </b-col>
    </b-row>
    <b-row class="">
      <b-col xl="2">
        <label><strong>Létrehozva:</strong></label>
      </b-col>
      <b-col xl="10">
        {{ group.createdAt }}
      </b-col>
    </b-row>

    <h2 class="my-5">Csoporthoz rendelt halgatók</h2>
    <b-row align-h="center">
      <b-col cols="12">
        <b-table stacked="sm" simple hover head-variant="light"
                 :items="group.students"
                 :fields="tableFields"
                 :busy="loadingItems"
                 emptyText="Nem található hallgató"
                 show-empty
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner big type="grow" label="Spinning"></b-spinner>
            </div>
          </template>

          <template v-slot:cell(actions)="data">
            <b-button variant="outline-info" @click="openStudentDetails(data.item.studentId)">
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
  import GroupService from '../service/group_service';

  export default {
    components: {
      InputEdit,
    },
    data() {
      return {
        initialized: false,
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
        group: state => state.groupDetails.group,
      }),
    },
    created() {
      this.$store.dispatch('groupDetails/loadGroup', { id: this.$route.params.id }, { root: true }).then(() => {
        this.initialized = true;
      });
    },
    methods: {
      onNameChange(name) {
        console.log('name change', name);
        GroupService.edit(this.group._id, name).then(() => {
          this.group.name = name;
          this.$toast.success({
            title: 'Sikeres',
            message: 'Csoport frissítése sikeres',
          });
        });
      },
      openStudentDetails(studentId) {
        this.$router.push({ name: 'student-details', params: { id: studentId } });
      },
    },
  };
</script>
