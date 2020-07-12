<template>
  <div class="content-home">
    <Loader v-if="loading"/>
    <div v-else-if="!this.categories.length">
      <p>Для створення запису у Вас немає категорій витрат/доходів. <router-link to="/category">Добавте категорію</router-link></p>
    </div>
    <form v-else @submit.prevent="CreateRecord()">
      <b-card bg-variant="light" class="record">
        <b-form-group
          label-cols-lg="3"
          label="Створити новий запис"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            label-cols-sm="3"
            label="Категорія:"
            label-align-sm="right"
            label-for="nested-street"
          >
            <b-form-select class="mb-3" v-model="current">
              <b-form-select-option 
               v-for="c in categories" 
               :key="c.id" 
               :value="c.id">{{c.title}}</b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group label-cols-sm="3" label="Опис запису:" label-align-sm="right">
            <b-form-input
              placeholder="Напишіть опис"
              v-model="record"
              :class="{invalid: (!$v.record.required && $v.record.$dirty)}"
            ></b-form-input>
            <small
              class="text-style"
              v-if="(!$v.record.required && $v.record.$dirty)"
            >Поле не повинно бути порожнім</small>
          </b-form-group>

          <b-form-group label-cols-sm="3" label="Сумма:" label-align-sm="right">
            <b-form-input
              placeholder="Введіть суму коштів"
              type="number"
              v-model.number="summ"
              :class="{invalid: (!$v.summ.minValue && $v.summ.$dirty)}"
            ></b-form-input>
            <small
              class="text-style"
              v-if="(!$v.summ.minValue && $v.summ.$dirty)"
            >Введіть суму більше 1</small>
          </b-form-group>

          <b-form-group label-cols-sm="3" label="Тип запису:" label-align-sm="right" class="mb-0">
            <b-form-radio-group class="pt-2" :options="options" v-model="type"></b-form-radio-group>
          </b-form-group>

          <b-button variant="outline-primary" type="submit">Створити</b-button>
        </b-form-group>
      </b-card>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators"
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    current: null,
    categories: [],
    loading: true,
    record: "",
    summ: 1,
    type: "outcome",
    options: [
      { text: "Дохід", value: "income" },
      { text: "Витрата", value: "outcome" }
    ]
  }),
  validations: {
    record: {
      required
    },
    summ: {
      minValue: minValue(1)
    }
  },
  async mounted() {
      this.categories = await this.$store.dispatch('fetchCategory')
      if (!this.categories.length) {
        this.loading = false
      } else {
      const {id, title} = this.categories[0]
      this.current = id,
      this.title = title
      this.loading = false
      }
  },
  computed: {
      ...mapGetters(['info']),
      canCreateRecord() {
          if (this.type === 'income') {
              return true
          } else {
              return this.info.bill >= this.summ
          }
      }
  },
  methods: {
    async CreateRecord() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.canCreateRecord) {
      try{
        await this.$store.dispatch('createRecord', {
            catName: this.current,
            date: new Date().toJSON(),
            type: this.type,
            description: this.record,
            summ: this.summ
        })
        let bill = 0
        if (this.type === 'income') {
          bill = this.info.bill + this.summ
        } else {
          bill = this.info.bill - this.summ
        }
        await this.$store.dispatch('updateBill', {bill})
        this.$v.$reset()
        this.summ = 1
        this.record = ''
        this.$messege('Запис успішно створений')
      } catch(e) {
          console.log('error')
      }
        
      }
      else {
        this.$error('Недостатньо коштів на рахунку для створення запису')
      }
    }
  }
}
</script>