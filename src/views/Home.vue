<template>
  <div class="content-home">
    <Loader v-if="loading" />
    
    <div v-else>
        <ContentHomeBill 
          :rate = 'currency.rate'
        />
        <ContentHomeCurrency
          :rate = 'currency.rate'
          :date = 'currency.exchangedate'
        />
    </div>
  </div>
</template>

<script>
import ContentHomeBill from "../components/ContentHomeBill";
import ContentHomeCurrency from "../components/ContentHomeCurrency";

export default {
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch("getCurrency")
    this.loading = false;
  },
  components: {
    ContentHomeBill,
    ContentHomeCurrency
  }
};
</script>
