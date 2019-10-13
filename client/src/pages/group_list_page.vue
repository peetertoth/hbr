<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="12" xl="10">
        <h1>Csoportok</h1>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="12" xl="10" class="mt-3">
        <b-button variant="outline-primary" @click="createNewGroup">
          Új csoport létrehozása
        </b-button>
      </b-col>
    </b-row>
    <!-- Content -->
    <b-row align-h="center" class="mt-3">
      <b-col cols="12" xl="10">
        <b-table stacked="sm" borderless hover head-variant="light"
                 :items="items"
                 :fields="tableFields"
                 :busy="loadingItems"
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner big type="grow" label="Spinning"></b-spinner>
            </div>
          </template>
          <template v-slot:table-caption>
            <div class="">
              <strong>Hallgatók száma</strong>: Az adott csoporthoz rendelt hallgatók számát jelöli.
              Egy hallgató több csoporthoz is hozzárendelhető.
            </div>
          </template>

          <template v-slot:cell(actions)="data">
            <b-button variant="outline-info" @click="openGroupDetails(data.item._id)">
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
        loadingItems: false,
        tableFields: [
          {
            key: 'name',
            label: 'Név',
            sortable: false,
          },
          {
            key: 'studentsCount',
            label: 'Hallgatók száma',
            sortable: false,
          },
          {
            key: 'createdAt',
            label: 'Létrehozás ideje',
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
        items: state => state.group.groups,
      }),
    },
    created() {
      this.loadingItems = true;
      this.$store.dispatch('group/loadGroups', null, { root: true }).then(() => {
        setTimeout(() => {
          this.loadingItems = false;
        }, 1000);
      });
    },
    methods: {
      openGroupDetails(groupId) {
        console.log('TODO: open group details', groupId);
      },
      createNewGroup() {
        console.log('TODO: open group creation page');
      },
    },
  };
</script>
