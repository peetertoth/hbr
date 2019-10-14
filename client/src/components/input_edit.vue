<template>
  <div>
    <div v-if="editingInProgress === false" @click="valueOnClick" class="unselectable">
      {{ value }}
    </div>
    <div v-else>
      <b-form-input v-model="model"></b-form-input>
      <div class="mt-1">
        <b-button pill size="sm" variant="outline-primary" @click="onSave">
          Mentés
        </b-button>
        <b-button pill size="sm" variant="outline-danger" @click="onCancel">
          Mégsem
        </b-button>
      </div>
    </div>
  </div>
</template>
<style @scoped="">
  .unselectable {
    user-select: none;
  }
</style>
<script>
  export default {
    props: {
      value: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        model: '',
        editingInProgress: false,
        lastClick: new Date().getTime(),
      };
    },
    created() {
      console.log('input edit created');
      this.model = this.value;
    },
    methods: {
      valueOnClick() {
        const click = new Date().getTime();
        if (click - this.lastClick < 500) {
          this.editingInProgress = true;
        }
        this.lastClick = click;
      },
      onCancel() {
        this.editingInProgress = false;
        this.model = this.value;
      },
      onSave() {
        this.editingInProgress = false;
        this.$emit('edit', this.model);
      }
    },
  };
</script>
