<template>
  <div>
    <Navbar />
    <Sidebar />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default {
  components: {
    Navbar,
    Sidebar
  },
  mounted() {
    this.$store.dispatch("fetchInfo");
  }
};
</script>
