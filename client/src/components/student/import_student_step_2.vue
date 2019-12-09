<template>
  <div>
    <h3 class="mt-1">Sikeresen feldolgozott sorok</h3>
    <b-table striped hover :items="parsedData" :fields="fields"></b-table>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    created() {
    },
    data() {
      return {
        fields: [
          {
            key: 'firstName',
            label: 'Keresztnév',
          },
          {
            key: 'lastName',
            label: 'Vezetéknév',
          },
          {
            key: 'neptun',
            label: 'NEPTUN',
          }
        ]
      };
    },
    computed: {
      ...mapState({
        rawData: state => state.studentImport.rawData,
        parsedData: state => state.studentImport.parsedData,
      }),
    }
  };
</script>
