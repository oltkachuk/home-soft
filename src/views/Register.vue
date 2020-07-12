<template>
  <div class="empty-layout">
    <div class="register-form">
      <b-form @submit.prevent="OnRegister()">
        <b-form-group label="Email:">
          <b-form-input
            placeholder="Введіть Ваш email"
            v-model="email"
            :state="stateEmail"
            :class="{invalid: (!$v.email.required && $v.email.$dirty) || (!$v.email.email && $v.email.$dirty)}"
          ></b-form-input>
          <small
            class="text-style"
            v-if="(!$v.email.required && $v.email.$dirty)"
          >Поле не повинно бути порожнім</small>
          <small
            class="text-style"
            v-else-if="(!$v.email.email && $v.email.$dirty)"
          >Введіть коректний email</small>
        </b-form-group>
        <b-form-group label="Ім'я:">
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
        <b-form-group label="Пароль:">
          <b-form-input
            placeholder="Придумайте пароль більше 6-ох символів"
            v-model="password"
            :state="statePassword"
            :class="{invalid: (!$v.password.required && $v.password.$dirty) || (!$v.password.minLength && $v.password.$dirty)}"
          ></b-form-input>
          <small
            class="text-style"
            v-if="(!$v.password.required && $v.password.$dirty)"
          >Поле не повинно бути порожнім</small>
          <small
            class="text-style"
            v-else-if="(!$v.password.minLength && $v.password.$dirty)"
          >Введіть пароль більше 6-ох символів</small>
        </b-form-group>
        <b-form-group
          label="Стартовий капітал:"
          description="Для коректної роботи програми введіть Ваш стартовий капітал"
        >
          <b-form-input placeholder="Введіть Ваш капітал"
          :state="stateBill"
          type="number"
          v-model.number="bill"
          :class="{invalid: (!$v.bill.minValue && $v.bill.$dirty)}"
          ></b-form-input>
          <small
            class="text-style"
            v-if="(!$v.bill.minValue && $v.bill.$dirty)"
          >Введіть капітал більше 100 грн.</small>
        </b-form-group>
        <b-button type="submit" variant="primary">Зареєструватись</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { required, minLength, minValue, email } from "vuelidate/lib/validators";

export default {
  data: () => ({
    email: "",
    password: "",
    bill: 100,
    name: ""
  }),
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    email: {
      email,
      required
    },
    bill: {
      minValue: minValue(100)
    },
    name: {
      required
    }
  },
  computed: {
    statePassword() {
      if (
        (!this.$v.password.minLength && this.$v.password.$dirty) ||
        (!this.$v.password.required && this.$v.password.$dirty)
      ) {
        return false;
      } else {
        return null;
      }
    },
    stateEmail() {
      if (
        (!this.$v.email.required && this.$v.email.$dirty) ||
        (!this.$v.email.email && this.$v.email.$dirty)
      ) {
        return false;
      } else {
        return null;
      }
    },
    stateBill() {
      if (
        (!this.$v.bill.minValue && this.$v.bill.$dirty)
      ) {
        return false;
      } else {
        return null;
      }
    },
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
  methods: {
    async OnRegister() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const FormData = {
        email: this.email,
        password: this.password,
        name: this.name,
        bill: this.bill
      }
      try{
        await this.$store.dispatch('register', FormData)
        this.$router.push('/')
      } catch(e) {
        console.log('error')
      }
    }
  }
};
</script>