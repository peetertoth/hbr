<template>
  <div> STEP 2
    <b-table>
      <tr v-for="row in model.parsedData">
        <td><input type="text" v-model="row[0]"></td>
        <td><input type="text" v-model="row[1]"></td>
        <td><input type="text" v-model="row[2]"></td>
      </tr>
    </b-table>
  </div>
</template>
<script>
  export default {
    created() {
      this.model.parsedData = this.value;
    },
    data() {
      return {
        model: {
          parsedData: [],
        }
      };
    },
  };
</script>
