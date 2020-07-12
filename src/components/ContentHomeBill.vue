<template>
  <div class="card-bill">
    <b-card bg-variant="info" text-variant="white" header="Рахунок" class="text-center">
      <b-card-text class="card_text">{{bill + " UAH"}}</b-card-text>
      <b-card-text class="card_text">{{ Math.floor(bill / rate) + " USD" }}</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
    computed: {
        bill() {
            return this.$store.getters.info.bill
        }
    },
    props: ["rate"]
}
</script>