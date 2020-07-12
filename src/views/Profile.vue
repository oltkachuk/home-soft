<template>
  <div class="content-home">
    <Loader v-if="loading" />
    <div class="profile-card" v-else>
      <b-form @submit.prevent="OnUpdate()">
        <b-form-group
           label="Профіль"
           label-size="lg"
           label-class="font-weight-bold pt-0"        
        >
        <b-form-group 
            label="Ім'я:" 
        >
          <b-form-input
            placeholder="Введіть Ваше ім'я:"
            v-model="name"
            :state="stateName"
            :class="{invalid: (!$v.name.required && $v.name.$dirty)}"
          ></b-form-input>
          <small
            class="text-style"
            v-if="(!$v.name.required && $v.name.$dirty)"
          >Поле не повинно бути порожнім</small>
        </b-form-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Обновити</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { required } from "vuelidate/lib/validators"
export default {
  data: () => ({
    loading: true,
    name: ""
  }),
  mounted() {
    this.name = this.info.name
    this.$store.commit('setInfo', this.info)
    this.loading = false
  },
  computed: {
    ...mapGetters(["info"]),
    stateName() {
      if (
        !this.$v.name.required && this.$v.name.$dirty
      ) {
        return false;
      } else {
        return null;
      }
    }
  },
  validations: {
    name: {
      required
    }
  },
  methods: {
      async OnUpdate() {
        if (this.$v.$invalid) {
            this.$v.$touch()
            return
        }
        await this.$store.dispatch('updateBill', {name: this.name})
        this.$messege('Профіль успішно обновлений')
        
      }
  }
}
</script>