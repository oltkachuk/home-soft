<template>
    <div class="content-home">
        <Loader v-if="loading" />
        <div v-else>
            <AddNewCategory 
            @created='CreateNewCategory'
            />
            <UpdateCategory
            v-if="this.categories.length"
            :categories='categories'
            @updated='UpdateCategory'
            @delete='DeleteCategory'
            :key="categories.length + updateCount"
            />
        </div>
      
    </div>
</template>

<script>
import AddNewCategory from '../components/AddNewCategory'
import UpdateCategory from '../components/UpdateCategory'

export default {
  components: {
    AddNewCategory, UpdateCategory
  },
  data: () => ({
      loading: true,
      categories: [],
      updateCount: 0
  }),
  async mounted() {
      this.categories = await this.$store.dispatch('fetchCategory')
      this.loading = false
  },
  methods: {
      async CreateNewCategory(title) {
          await this.categories.push(title)
          this.categories = await this.$store.dispatch('fetchCategory')
          this.$messege('Категорія успішно створена')         
      },
      UpdateCategory(category) {
          const idx = this.categories.findIndex( c => c.id === category.id)
          this.categories[idx].title = category.title
          this.$messege("Категорія успішно відредагована")
          this.updateCount++
      },
      async DeleteCategory() {
          this.categories = await this.$store.dispatch('fetchCategory')
          await this.$messege("Категорія успішно видалена")

      }
  }
}
</script>