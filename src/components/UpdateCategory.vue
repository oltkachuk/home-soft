<template>
  <div class="update_category">
    <form @submit.prevent="UpdateCategory()">
      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="3"
          label="Редагувати категорію"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group>
            <b-form-radio name="some-radios" value="upgrate" v-model="type">Редагувати</b-form-radio>
            <b-form-radio name="some-radios" value="delete" v-model="type">Видалити</b-form-radio>
          </b-form-group>
          <b-form-select class="mb-3" v-model="current">
            <b-form-select-option v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</b-form-select-option>
          </b-form-select>
          <b-form-group
            v-if="type==='upgrate'"
            label-cols-sm="3"
            label="Назва категорії:"
            label-align-sm="right"
            label-for="nested-street"
          >
            <b-form-input
              placeholder="Введіть нову назву категорії"
              v-model="category"
              :state="stateCategory"
              :class="{invalid: (!$v.category.required && $v.category.$dirty)}"
            ></b-form-input>
            <small
              class="text-style"
              v-if="(!$v.category.required && $v.category.$dirty)"
            >Поле не повинно бути порожнім</small>
          </b-form-group>
          <b-button variant="outline-primary" type="submit" v-if="type === 'upgrate'">Змінити</b-button>
          <b-button
            variant="outline-primary"
            @click.prevent="$bvModal.show('modal-1')"
            v-else
          >Видалити</b-button>
          <span>
            <b-modal
              id="modal-1"
              ok-title="Видалити"
              cancel-title="Скасувати"
              title="Попередження"
              ok-variant="outline-danger"
              cancel-variant="outline-success"
              header-bg-variant="info"
              @ok="DeleteCategory()"
            >
              <p>
                Ви дійсно хочете видалити дану категорію?
                <br />Всі записи, що відносяться до даної категорії будуть видалені також,
                а кошти будуть повернені або списані з рахунку
              </p>
            </b-modal>
          </span>
        </b-form-group>
      </b-card>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  props: ["categories"],
  data: () => ({
    category: "",
    current: null,
    title: "",
    type: "upgrate"
  }),
  validations: {
    category: {
      required
    }
  },
  created() {
    const { id, title } = this.categories[0];
    this.current = id,
    this.title = title
  },
  watch: {
    current(catId) {
        const { title } = this.categories.find(c => c.id === catId)
        this.category = title
    }
  },
  methods: {
    async UpdateCategory() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      } else {
        try {
          const CategoryData = {
            id: this.current,
            title: this.category
          };
          await this.$store.dispatch("updateCategory", CategoryData);
          this.category = null;
          this.$emit('updated', CategoryData)
        } catch (e) {
          console.log("error");
        }
      }
    },
    async DeleteCategory() {
      console.log("delete");
      try {
        await this.$store.dispatch("deleteRecord", {
          CategoryId: this.current
        });
        await this.$store.dispatch("deleteCategory", {
          id: this.current
        });
        this.$emit('delete')
        if (this.categories.length) {
          this.current = this.categories[0].id
          this.title = this.categories[0].title
        } else {
          this.current = null,
          this.title = ""
        }
      } catch (e) {
        console.log("error2");
      }
    }
  },
  computed: {
    stateCategory() {
      if (!this.$v.category.required && this.$v.category.$dirty) {
        return false;
      } else {
        return null;
      }
    }
  }
};
</script>