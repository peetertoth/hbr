<template>
  <b-container v-if="initialized">
    <h1 class="mb-5">Csoport részletei</h1>
    <b-row class="my-2">
      <b-col xl="2">
        <label><strong>Név:</strong></label>
      </b-col>
      <b-col xl="6">
        <input-edit v-model="group.name" @edit="onNameChange"></input-edit>
      </b-col>
    </b-row>
    <b-row class="">
      <b-col xl="2">
        <label><strong>Létrehozva:</strong></label>
      </b-col>
      <b-col xl="6">
        {{ group.createdAt }}
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
        initialized: false
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
    },
  };
</script>
