<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <b-alert show variant="info">
          A nyers adatok mezőbe a következő adatok kellenek: <b>Vezetéknév</b>,
          <b>Keresztnév</b> és <b>NEPTUN</b>. <br>
          Excel táblából az előbb említett három oszlop tartamára van szükség, fejléc nélkül.
          <br><br>
          Pl.:<br>
          <table>
            <tr>
              <td>Teszt</td>
              <td>Ádám</td>
              <td>ABC123</td>
            </tr>
            <tr>
              <td>Teszt</td>
              <td>Éva</td>
              <td>DEF123</td>
            </tr>
          </table>
          <br>
          Beillesztést követően a <strong>2. Feldolgozás</strong> pontra kattintva látható a
          feldolgozás eredménye.
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        Nyers adatok
        <b-textarea v-model="model.rawData" rows="16" no-resize></b-textarea>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        model: {
          rawData: '',
          parsedData: [],
        },
      };
    },
    computed: {
      ...mapState({
        rawData: state => state.studentImport.rawData,
        parsedData: state => state.studentImport.parsedData,
      }),
    },
    mounted() {
      this.model.rawData = this.rawData || '';
      this.model.parsedData = this.parsedData || [];
    },
    watch: {
      'model.rawData': {
        handler() {
          if (this.model.rawData.length === 0) {
            return;
          }
          try {
            this.$store.dispatch('studentImport/loadRawData', { rawData: this.model.rawData }, { root: true });
            this.model.parsedData = this.parseRawData(this.model.rawData);
            this.$store.dispatch('studentImport/loadParsedData', { parsedData: this.model.parsedData }, { root: true });
            if (this.model.parsedData.length > 0) {
              // this.$emit('done');
            }
          } catch (e) {
            console.error(`Failed to parse raw data. Error: ${e}`);
          }
        },
      },
    },
    methods: {
      parseRawData(data) {
        let splitLines = data.split('\n');
        splitLines = splitLines.map(line => line.split('\t'));
        const parsed = splitLines
          .filter(line => line.length === 3)
          .map(line => ({ lastName: line[0], firstName: line[1], neptun: line[2] }));
        return parsed;
      },
    },
  };
</script>
