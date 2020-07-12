<template>
  <div class="empty-layout">
    <div class="register-form">
        <form @submit.prevent='OnLogin()'>
          <b-form-group label="Email:">
            <b-form-input 
            placeholder="Введіть Ваш email"
            v-model="email"
            type="text"
            :state = 'stateEmail'
            :class="{invalid: (!$v.email.required && $v.email.$dirty) || (!$v.email.email && $v.email.$dirty)}"
            ></b-form-input>
          <small class="text-style"
            v-if="(!$v.email.required && $v.email.$dirty)"
          >
            Поле не повинно бути порожнім
          </small>
           <small class="text-style"
            v-else-if="(!$v.email.email && $v.email.$dirty)"
          >
            Введіть коректний email
          </small>
          </b-form-group>
          <b-form-group label="Пароль:">
            <b-form-input 
            type="password" 
            placeholder="Введіть пароль"
            v-model="password"
            :state = 'statePassword'
            :class="{invalid: (!$v.password.required && $v.password.$dirty) || (!$v.password.minLength && $v.password.$dirty)}"
            ></b-form-input>
            <small class="text-style"
            v-if="(!$v.password.required && $v.password.$dirty)"
          >
            Поле не повинно бути порожнім
          </small>
           <small class="text-style"
            v-else-if="(!$v.password.minLength && $v.password.$dirty)"
          >
            Введіть пароль більше 4-ох символів
          </small>
          </b-form-group>
          <b-button type="submit" class="btn" variant="primary">Ввійти</b-button>
          <b-button class="btn" variant="primary" href="/register">Немає акаунту? Зареєструйтесь</b-button>
        </form>
    </div>
  </div>
</template>
<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import messeges from '@/utils/messeges.js'

export default {
  data: () => ({
      email: '',
      password: '',
  }),
  validations: {
    password: {
      required,
      minLength: minLength(4)
    },
    email: {
      email,
      required
    }
  },
  computed: {
    statePassword() {
      if (!this.$v.password.minLength && this.$v.password.$dirty || (!this.$v.password.required && this.$v.password.$dirty)) {
        return false
      }
      else{
        return null
      }
    },
    stateEmail() {
      if (!this.$v.email.required && this.$v.email.$dirty || (!this.$v.email.email && this.$v.email.$dirty)) {
        return false
      }
      else{
        return null
      }
    }
  },
  methods: {
    async OnLogin() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      console.log('true')
      const LogData = {
        email: this.email,
        password: this.password
      }
      console.log(LogData)
      try{
        await this.$store.dispatch('login', LogData)
        this.$router.push("/")
      }catch (e) {console.log('error'+e) }
    }
  },
  mounted() {
    if (messeges[this.$route.query.messege]) {
    this.$messege(messeges[this.$route.query.messege])
    }
  }
}
</script>