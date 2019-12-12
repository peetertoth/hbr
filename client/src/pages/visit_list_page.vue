<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="12">
        <h1>Megtekintési alkalmak</h1>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="12" class="mt-3">
<!--        <b-button variant="outline-primary" @click="createNewStudent">-->
<!--          Új hallgató felvétele-->
<!--        </b-button>-->
        <b-button v-b-modal.create_visit_modal
                  variant="outline-primary">
          Új megtekintés felvétele
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
                 emptyText="Nem található megtekintési alkalom"
                 show-empty
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner big type="grow" label="Spinning"></b-spinner>
            </div>
          </template>

          <template v-slot:cell(actions)="data">
            <b-button variant="outline-info" @click="openVisitDetails(data.item._id)">
              Részletek
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-modal id="create_visit_modal"
             ref="create_visit_modal"
             title="Megtekintés létrehozása"
             @show="resetCreateNewVisit"
             @hidden="resetCreateNewVisit"
             @ok="handleOkCreateNewVisit">
      <form ref="create_new_visit_form" @submit.stop.prevent="createNewVisit">
        <b-form-group :state="newVisit.nameState"
                      label="Név"
                      label-for="name-input"
                      invalid-feedback="Név megadása kötelező">
          <b-form-input id="name-input"
                        v-model="newVisit.name"
                        :state="newVisit.nameState"
                        required
          ></b-form-input>
        </b-form-group>
        <b-form-group :state="newVisit.groupIdState"
                      label="Csoport"
                      label-for="group-id-input"
                      invalid-feedback="Csoport megadása kötelező">
          <b-form-select id="group-id-input"
                         :state="newVisit.groupIdState"
                         v-model="newVisit.groupId"
                         required>
            <template v-for="group in groups">
              <option :value="group._id" :key="group._id">{{ group.name }}</option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group :state="newVisit.startTimeState"
                      label="Kezdete"
                      label-for="start-time-input"
                      invalid-feedback="Kezdő időpont megadása kötelező">
          <date-picker class="dtpicker"
                       v-model="newVisit.startTime" :config="options"></date-picker>
        </b-form-group>

        <b-form-group :state="newVisit.endTimeState"
                      label="Vége"
                      label-for="end-time-input"
                      invalid-feedback="Vége időpont megadása kötelező">
          <date-picker class="dtpicker"
                       v-model="newVisit.endTime" :config="options"></date-picker>
        </b-form-group>
      </form>
    </b-modal>
  </b-container>
</template>
<script>
  import datePicker from 'vue-bootstrap-datetimepicker';
  import { mapState } from 'vuex';
  import VisitService from '../service/visit_service';

  export default {
    components: {
      datePicker,
    },
    data() {
      return {
        options: {
          format: 'YYYY-MM-DD HH:mm',
          useCurrent: false,
        },
        loadingItems: false,
        tableFields: [
          {
            key: 'name',
            label: 'Név',
            sortable: false,
          },
          {
            key: 'groupName',
            label: 'Csoport',
            sortable: false,
          },
          {
            key: 'startTime',
            label: 'Kezdete',
            sortable: true,
            formatter: a => new Date(a).toLocaleString(),
          },
          {
            key: 'endTime',
            label: 'Vége',
            sortable: false,
            formatter: a => new Date(a).toLocaleString(),
          },
          {
            key: 'actions',
            label: 'Műveletek',
            sortable: false,
          },
        ],
        newVisit: {
          name: '',
          nameState: null,
          groupId: null,
          groupIdState: null,
          startTime: '',
          startTimeState: null,
          endTime: '',
          endTimeState: null,
        },
      };
    },
    computed: {
      ...mapState({
        items: state => state.visit.visits,
        groups: state => state.group.groups,
      }),
      startTime() {
        return new Date(this.newVisit.startTime);
      },
    },
    created() {
      this.setup();
      this.$store.dispatch('group/loadGroups', null, { root: true }).then();
    },
    methods: {
      setup() {
        this.loadingItems = true;
        this.$store.dispatch('visit/loadVisits', null, { root: true }).then(() => {
          setTimeout(() => {
            this.loadingItems = false;
          }, 1000);
        });
      },
      openGroupDetails(groupId) {
        this.$router.push({ name: 'group-details', params: { id: groupId } });
      },
      validateCreateNewVisit() {
        const valid = this.$refs.create_new_visit_form.checkValidity();
        this.newVisit.nameState = !!this.newVisit.name;
        this.newVisit.groupIdState = !!this.newVisit.groupId;
        this.newVisit.startTimeState = !!this.newVisit.startTime;
        this.newVisit.endTimeState = !!this.newVisit.endTime;
        return valid
          && this.newVisit.nameState
          && this.newVisit.groupIdState
          && this.newVisit.startTimeState
          && this.newVisit.endTimeState;
      },
      async createNewVisit() {
        if (this.validateCreateNewVisit() === true) {
          const {
            name, groupId, startTime, endTime,
          } = this.newVisit;
          try {
            await VisitService.create({
              name,
              groupId,
              startTime,
              endTime,
            }, false);

            this.$nextTick(() => {
              this.$toast.success({
                title: 'Sikeres',
                message: 'Megtekintési alkalom létrehozása sikeres',
              });
              this.$refs.create_visit_modal.hide();
              this.setup();
            });
          } catch (e) {
            // this.newVisit.nameAlreadyTaken = true;
          }
        } else {
          // INVALID
        }
      },
      resetCreateNewVisit() {
        this.newVisit.name = '';
        this.newVisit.nameState = null;
        this.newVisit.groupId = null;
        this.newVisit.groupIdState = null;
        this.newVisit.startTime = '';
        this.newVisit.startTimeState = null;
        this.newVisit.endTime = '';
        this.newVisit.endTimeState = null;
      },
      handleOkCreateNewVisit(evt) {
        evt.preventDefault();
        this.createNewVisit();
      },
      openVisitDetails(id) {
        this.$router.push({ name: 'visit-details', params: { id } });
      },
    },
  };
</script>
