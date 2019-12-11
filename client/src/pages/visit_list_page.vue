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
        >
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
                      name="name-input"
                      invalid-feedback="Név megadása kötelező">
          <b-form-input id="name-input"
                        name="name-input"
                        v-model="newVisit.name"
                        :state="newVisit.nameState"
                        required
          ></b-form-input>
        </b-form-group>
        <b-form-group :state="newVisit.groupIdState"
                      label="Csoport"
                      label-for="group-id-input"
                      name="group-id-input"
                      invalid-feedback="Csoport megadása kötelező">
          <b-form-select id="group-id-input"
                         name="group-id-input"
                         :state="newVisit.groupIdState"
                         v-model="newVisit.groupId"
                         required>
            <template v-for="group in groups">
              <option :value="group._id" :key="group._id">{{ group.name }}</option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-input id="start-input"
                      name="start-input"
                      v-model="newVisit.startTime"
                      :state="newVisit.startTimeState"
                      required
        ></b-form-input>

        <b-form-input id="stop-input"
                      name="stop-input"
                      v-model="newVisit.endTime"
                      :state="newVisit.endTimeState"
                      required
        ></b-form-input>
      </form>
    </b-modal>
  </b-container>
</template>
<script>
  import { mapState } from 'vuex';
  import VisitService from '../service/visit_service';

  export default {
    data() {
      return {
        modal: {
          text: '',
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
          // {
          //   key: 'createdAt',
          //   label: 'Hozzáadva',
          //   sortable: true,
          // },
          // {
          //   key: 'actions',
          //   label: 'Műveletek',
          //   sortable: false,
          // },
        ],
        newVisit: {
          name: '',
          nameState: null,
          groupId: null,
          groupIdState: null,
          startTime: null,
          startTimeState: null,
          endTime: null,
          endTimeState: null,
        },
      };
    },
    computed: {
      ...mapState({
        items: state => state.visit.visits,
        groups: state => state.group.groups,
      }),
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
        return valid;
      },
      async createNewVisit() {
        if (this.validateCreateNewVisit() === true) {
          const {
            name, groupId, startTime, endTime,
          } = this.newVisit;
          try {
            await VisitService.create({
              name, groupId, startTime, endTime,
            }, false);

            this.$nextTick(() => {
              this.$toast.success({
                title: 'Sikeres',
                message: 'Megtekintés létrehozása sikeres',
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
        this.newVisit.startTime = null;
        this.newVisit.startTimeState = null;
        this.newVisit.endTime = null;
        this.newVisit.endTimeState = null;
      },
      handleOkCreateNewVisit(evt) {
        evt.preventDefault();
        this.createNewVisit();
      },
    },
  };
</script>
