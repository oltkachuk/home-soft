<template>
    <b-navbar toggleable="lg" type="dark" variant="primary" class="navbar">
      <b-navbar-brand href="#">HomeSoft</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav class="nav_date"> {{date | dateFormat('DD.MM.YYYY HH:mm:ss') }} </b-nav>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <b class="nav-user">
                <b-icon icon="person-fill" font-scale="1.5" variant="dark"></b-icon> {{name}}
              </b>
            </template>
            <b-dropdown-item >
              <b-icon icon="person-fill"></b-icon><router-link to="/profile" @click.prevent>Профіль</router-link>
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="logout()">
              <b-icon icon="power" aria-hidden="true"></b-icon>Вийти
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  data: () => ({
    date: new Date()
  }),
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },
  mounted() {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?messege=logout')
    }
  }
}
</script>