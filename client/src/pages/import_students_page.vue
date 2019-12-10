<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="12">
        <h1>Hallgatók importálása</h1>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="12" class="mt-3">
        <b-nav pills justified>
          <b-nav-item :active="step === 1" @click="step = 1">1. Adatbevitel</b-nav-item>
          <b-nav-item :active="step === 2" @click="step = 2">2. Feldolgozás</b-nav-item>
          <b-nav-item :active="step === 3" @click="step = 3">3. Csoporthoz rendelés</b-nav-item>
<!--          <b-nav-item :active="step === 4" @click="step = 4">1. Nyers adatok</b-nav-item>-->
        </b-nav>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="12" class="mt-3">
        <step1 v-if="step === 1"
               @done="onStepOneDone"></step1>
        <step2 v-if="step === 2"></step2>
        <step3 v-if="step === 3"></step3>
<!--        <step4 v-if="step === 4"></step4>-->
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
  import { mapState } from 'vuex';
  import Step1 from '../components/student/import_student_step_1.vue';
  import Step2 from '../components/student/import_student_step_2.vue';
  import Step3 from '../components/student/import_student_step_3.vue';

  export default {
    components: {
      Step1,
      Step2,
      Step3,
    },
    computed: {
      ...mapState({
        rawData: state => state.studentImport.rawData,
        parsedData: state => state.studentImport.parsedData,
      }),
    },
    data() {
      return {
        step: 1,
        model: {
        },
      };
    },
    methods: {
      onStepOneDone() {
        this.step = 2;
      },
    },
    created() {
      this.$store.dispatch('group/loadGroups', null, { root: true }).then();
    },
  };
</script>
