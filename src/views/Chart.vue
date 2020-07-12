<template>
        <div class="chart">
            <Loader v-if="loading" />
            <div v-else-if="!this.records.length">
                <p>
                    У Вас немає жодного запису.
                    <router-link to="/record">Добавте запис</router-link>
                </p>
            </div>
            <canvas ref="canvas" class="chart2"> </canvas>
        </div>   
</template>

<script>
import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    data: () => ({
        loading: true,
        records: [],
        categories: []
    }),
    async mounted () {
        this.records = await this.$store.dispatch("fetchRecords")
        this.categories = await this.$store.dispatch("fetchCategory")
        this.renderChart({
        labels: this.categories.map(c => c.title),
        datasets: [{
            label: 'Витрати по категоріям',
                data: this.categories.map(c => {
                    return this.records.reduce((total, r) => {
                        if ( r.CatId === c.id && r.type === 'outcome' ) {
                            total += +r.summ
                        } 
                        return total
                    }, 0) 
                }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    })
    this.loading = false
    }     
}
</script>