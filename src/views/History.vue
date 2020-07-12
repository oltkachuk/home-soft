<template>
  <div class="content-home">
    <Loader v-if="loading" />
    <div v-else-if="!this.records.length">
      <p>
        У Вас немає жодного запису.
        <router-link to="/record">Добавте запис</router-link>
      </p>
    </div>
    <section v-else>
      <HistoryTable
      @deleteRecord="deleteRecord()"
      :records="items" />
      <nav aria-label="Paginations">
          <Paginate
            :page-count="pageMax"
            :click-handler="PageHandler"
            :prev-text="'Назад'"
            :next-text="'Вперед'"
            :containerClass="'pagination'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-class="'page-link'"
            :next-class="'page-link'"
          />
      </nav>
    </section>
  </div>
</template>

<script>
import paginations from "../mixins/paginate"
import HistoryTable from "../components/HistoryTable";
export default {
  name: "history",
  mixins: [paginations],
  data: () => ({
    loading: true,
    categories: [],
    records: [],
    updateCount: 0
  }),
  components: {
    HistoryTable
  },
  async mounted() {
    await this.FeatchRecord()
    this.loading = false
    },
  methods: {
    async FeatchRecord() {
        const record = await this.$store.dispatch("fetchRecords");
        this.categories = await this.$store.dispatch("fetchCategory");
        this.records = record.map(rec => {
          return {
            ...rec,
            categoryName: this.categories.find(c => c.id === rec.CatId).title,
            categoryType: rec.type === "income" ? "Дохід" : "Витрата",
            dateForm: new Date(rec.date)
           }
        })
        await this.paginationSetup(this.records)
    },
    async deleteRecord() {
      await this.FeatchRecord()  
   }
  }
}
</script>
