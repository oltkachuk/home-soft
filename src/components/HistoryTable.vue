<template>
  <b-table-simple hover small responsive bordered>
    <b-thead head-variant="light" class="text-center">
      <b-tr>
        <b-th>№</b-th>
        <b-th>Назва категорії</b-th>
        <b-th>Сума коштів</b-th>
        <b-th>Тип запису</b-th>
        <b-th>Дата запису</b-th>
        <b-th>Детальніший опис запису</b-th>
        <b-th>Видалити запис</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr class="text-center" v-for="(r, index) of records" :key="r.id" :value="r.id">
        <b-td>{{ index + 1 }}</b-td>
        <b-td>{{ r.categoryName }}</b-td>
        <b-td>{{ r.summ }}</b-td>
        <b-td>{{ r.categoryType }}</b-td>
        <b-td>{{ r.dateForm | dateFormat('DD.MM.YYYY') }}</b-td>
        <b-td>{{ r.description }}</b-td>
        <b-td>
          <b-icon
            icon="trash-fill"
            class="icon"
            font-scale="1.2"
            @click.prevent="showModal(r.id, r.type, r.summ)"
          ></b-icon>
        </b-td>
      </b-tr>
    </b-tbody>
    <span>
      <b-modal
        id="modal-2"
        ok-title="Видалити"
        cancel-title="Скасувати"
        title="Попередження"
        ok-variant="outline-danger"
        cancel-variant="outline-success"
        header-bg-variant="info"
        @ok="DeleteRecord()"
      >
        <p>
          Ви дійсно хочете видалити даний запис?
          <br />Кошти в сумі {{this.recordSum}} UAH будуть {{this.recordType === 'outcome' ? 'повернуті до' : 'списані з'}} рахунку
        </p>
      </b-modal>
    </span>
  </b-table-simple>
</template>

<script>
export default {
  data: () => ({
    recordId: null,
    recordType: "",
    recordSum: null
  }),
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  methods: {
    showModal(recId, recType, recSum) {
      this.recordId = recId;
      this.recordType = recType;
      this.recordSum = recSum;
      this.$bvModal.show("modal-2");
    },
    async DeleteRecord() {
      try {
        await this.$store.dispatch("deleteOnlyRecord", {
          recordId: this.recordId,
          recordType: this.recordType,
          recordSum: this.recordSum
		})
		this.$emit('deleteRecord')
        this.$messege("Запис успішно видалений");
      } catch (e) {
        console.log("err");
      }
    }
  }
};
</script>