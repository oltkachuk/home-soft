<template>
  <div id="app">
    <component :is="layout">
    <router-view />
    </component>
  </div>
</template>

<script>

export default {
  computed: {
    layout() {
      return this.$route.meta.layout
    }
  },
}
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "style/index.css";
</style>
