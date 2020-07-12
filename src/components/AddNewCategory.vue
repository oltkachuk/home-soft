<template>
  <div class="create_category">
      <form @submit.prevent="AddCategory()">
      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="3"
          label="Створити нову категорію"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            label-cols-sm="3"
            label="Назва категорії:"
            label-align-sm="right"
            label-for="nested-street"
          >
            <b-form-input
              placeholder="Введіть назву категорії"
              v-model="category"
              :state="stateCategory"
              :class="{invalid: (!$v.category.required && $v.category.$dirty)}"
            ></b-form-input>
            <small
              class="text-style"
              v-if="(!$v.category.required && $v.category.$dirty)"
            >Поле не повинно бути порожнім</small>
          </b-form-group>
          <b-button variant="outline-primary" type="submit">Створити</b-button>
        </b-form-group>
      </b-card>
      </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data: () => ({
    category: ""
  }),
  validations: {
    category: {
      required
    }
  },
  computed: {
    stateCategory() {
      if (!this.$v.category.required && this.$v.category.$dirty) {
        return false
      }
      else{
        return null
      }
    }
  },
   methods: {
    async AddCategory() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        console.log('err')
        return
      }
      try {
        await this.$store.dispatch('CreateCategory', {
          title: this.category
      })
      this.$v.$reset()
      this.category = null
      this.$emit('created', {title: this.category})
      } catch(e) { console.log('err') }
      
    }
  },
}
</script>