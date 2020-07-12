<template>
  <div class="card-rate">
    <b-card bg-variant="info" text-variant="white" header="Курс валют" class="text-center">
      <b-card-text class="card_text">{{date | dateFormat('dddd DD.MM.YYYY') }}</b-card-text>
      <b-card-text class="card_text">{{rate +" UAH/USD"}}</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
    props: ["rate"],
    data: () => ({
      date: new Date ()
    })
}

</script>