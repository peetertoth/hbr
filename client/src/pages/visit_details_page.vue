<template>
  <b-container v-if="initialized">
    <h1 class="mb-3"> <i>{{ visit.name }}</i> megtekintés adatai</h1>

    <b-row class="mb-2">
      <b-col cols="12">
        Megtekintés publikus elérése hallgatók számára:
        <a target="_blank" :href="'/visit/login/' + visit._id">Link</a>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col cols="12">
        Csoport:
        <router-link :to="{ name: 'group-details', params: { id: visit.groupId } }">
          {{ visit.groupName }}
        </router-link>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col cols="12">
        Aktív időszak: {{ new Date(visit.startTime).toLocaleString() }} -
        {{ new Date(visit.endTime).toLocaleString() }}
        <b-badge :variant="active ? 'success' : 'light'">
          {{ active ? 'Aktív' : 'Inaktív' }}
        </b-badge>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="9">
        <h2>Megtekintő hallgatók</h2>
      </b-col>
      <b-col cols="3" class="mt-3">
        <b-form-checkbox v-model="showCalled">Szólítottak mutatása</b-form-checkbox>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="12">
        <b-table stacked="sm" simple hover head-variant="light"
                 :items="filteredItems"
                 :fields="tableFields"
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner big type="grow" label="Spinning"></b-spinner>
            </div>
          </template>

          <template v-slot:cell(actions)="data">
            <b-button :variant="data.item.foundAt ? 'info': 'outline-info'"
                      @click="markAsFound(data.item)">
              Kikeresve
            </b-button>
            <b-button :variant="data.item.calledAt ? 'info': 'outline-info'"
                      @click="markAsCalled(data.item)">
              Szólítva
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
  import { mapState } from 'vuex';
  import VisitService from '../service/visit_service';

  export default {
    components: {
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
            label: 'Bejelentkezve',
            sortable: true,
            formatter: date => new Date(date).toLocaleString(),
          },
          {
            key: 'foundAt',
            label: 'Kikeresve',
            sortable: true,
            formatter: date => (date ? new Date(date).toLocaleString() : ''),
          },
          {
            key: 'calledAt',
            label: 'Szólítva',
            sortable: true,
            formatter: date => (date ? new Date(date).toLocaleString() : ''),
          },
          {
            key: 'actions',
            label: 'Műveletek',
            sortable: false,
          },
        ],
        showCalled: true,
      };
    },
    computed: {
      ...mapState({
        visit: state => state.visitDetails.visit,
      }),
      filteredItems() {
        if (this.showCalled === false) {
          return this.visit.students.filter(e => !e.calledAt);
        }
        return this.visit.students;
      },
      active() {
        const start = new Date(this.visit.startTime).getTime();
        const end = new Date(this.visit.endTime).getTime();
        const now = new Date().getTime();
        if (start > now || now > end) {
          return false;
        }
        return true;
      },
    },
    created() {
      this.$store.dispatch('visitDetails/loadVisit', { id: this.$route.params.id }, { root: true }).then(() => {
        this.initialized = true;
      });
    },
    methods: {
      markAsFound(item) {
        const { visitId, studentId } = item;
        let foundAt = null;

        if (!item.foundAt) {
          foundAt = new Date();
        }
        VisitService.setFound({ visitId, studentId, foundAt }).then(() => {
          const index = this.visit.students.indexOf(item);
          this.visit.students[index].foundAt = foundAt;
        });
      },
      markAsCalled(item) {
        const { visitId, studentId } = item;
        let calledAt = null;

        if (!item.calledAt) {
          calledAt = new Date();
        }
        VisitService.setCalled({ visitId, studentId, calledAt }).then(() => {
          const index = this.visit.students.indexOf(item);
          this.visit.students[index].calledAt = calledAt;
        });
      },
    },
  };
</script>
