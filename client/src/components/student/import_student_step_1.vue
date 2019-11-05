<template>
  <b-container>
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
      this.model.rawData = this.rawData;
      this.model.rawData = this.parsedData;
    },
    watch: {
      'model.rawData'() {
        console.log('raw data changed', this.model.rawData.length);
        try {
          this.$store.dispatch('studentImport/loadRawData', { rawData: this.model.rawData }, { root: true });
          this.model.parsedData = this.parseRawData(this.model.rawData);
          this.$store.dispatch('studentImport/loadParsedData', { parsedData: this.model.parsedData }, { root: true });
          if (this.model.parsedData.length > 0) {
            this.$emit('done');
          }
        } catch (e) {
          console.error(`Failed to parse raw data. Error: ${e}`);
        }
      },
    },
    methods: {
      parseRawData(data) {
        console.log(`got data ${data.length}`);
        let splitLines = data.split('\n');
        splitLines = splitLines.map(line => line.split('\t'));
        return splitLines;
      }
      // model() {
      //   console.log('value changed');
      //   this.$emit('input', this.value);
      // },
    },
  };
</script>
