<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="12">
        <h1>Csoportok</h1>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="12" class="mt-3">
        <b-button v-b-modal.create_group_modal
                  variant="outline-primary">
          Új csoport létrehozása
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
    <b-modal id="create_group_modal"
             ref="create_group_modal"
             title="Csoport létrehozása"
             @show="resetCreateNewGroup"
             @hidden="resetCreateNewGroup"
             @ok="handleOkCreateNewGroup">
      <form ref="create_new_group_form" @submit.stop.prevent="createNewGroup">
        <b-form-group :state="newGroup.nameState"
                      label="Név"
                      label-for="name-input"
                      :invalid-feedback="invalidFeedbackCreateNewGroup">
          <b-form-input id="name-input"
                        v-model="newGroup.name"
                        :state="newGroup.nameState"
                        required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </b-container>
</template>
<script>
  import { mapState } from 'vuex';
  import GroupService from '../service/group_service';

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
        newGroup: {
          name: '',
          nameState: null,
          nameAlreadyTaken: false,
        },
      };
    },
    computed: {
      ...mapState({
        items: state => state.group.groups,
      }),
      invalidFeedbackCreateNewGroup() {
        if (this.newGroup.nameAlreadyTaken === false) {
          return 'Név kitöltése kötelező';
        } else {
          return 'A név már használatban van';
        }
      }
    },
    created() {
      this.setup();
    },
    methods: {
      setup() {
        this.loadingItems = true;
        this.$store.dispatch('group/loadGroups', null, { root: true }).then(() => {
          setTimeout(() => {
            this.loadingItems = false;
          }, 1000);
        });
      },
      openGroupDetails(groupId) {
        this.$router.push({ name: 'group-details', params: { id: groupId } });
      },
      validateCreateNewGroup() {
        const valid = this.$refs.create_new_group_form.checkValidity();
        this.newGroup.nameState = valid;
        return valid;
      },
      async createNewGroup() {
        if (this.validateCreateNewGroup() === true) {
          const { name } = this.newGroup;
          try {
            let result = await GroupService.create(name, false);

            this.$nextTick(() => {
              this.$toast.success({
                title: 'Sikeres',
                message: 'Csoport létrehozása sikeres',
              });
              this.$refs.create_group_modal.hide();
              this.setup();
            });

          } catch (e) {
            this.newGroup.nameAlreadyTaken = true;
          }
        } else {
          // INVALID
        }
      },
      resetCreateNewGroup() {
        this.newGroup.name = '';
        this.newGroup.nameState = null;
      },
      handleOkCreateNewGroup(evt) {
        evt.preventDefault();
        this.createNewGroup();
      },
    },
  };
</script>
