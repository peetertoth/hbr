<template>
  <div>
    <b-alert show variant="success">
      Feldolgozott sorok száma: {{ parsedData.length }}
    </b-alert>
    <b-alert show variant="danger" v-if="rawDataLines > 0">
      Sikertelenül feldolgozott sorok száma: {{ rawDataLines }}
    </b-alert>
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
          },
        ],
      };
    },
    computed: {
      ...mapState({
        rawData: state => state.studentImport.rawData,
        parsedData: state => state.studentImport.parsedData,
      }),
      rawDataLines() {
        const rawCount = this.rawData.split('\n').length;
        const res = rawCount - this.parsedData.length;

        return res < 0 ? 0 : res;
      },
    },
  };
</script>
