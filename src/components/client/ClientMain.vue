<template>
  <div class="container">
    <div class="alert alert-success mt-3" role="alert">Поиск документов</div>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label"
          >Название документа</label
        >
        <input type="text" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Поиск</button>
    </form>
    <h3 class="my-3">Результаты поиска</h3>
    <table class="table my-3">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Название документа</th>
          <th scope="col">Дата документа</th>
          <th scope="col">Категория документа</th>
          <th scope="col">Описание</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doc in docsList" :key="doc.id">
          <th scope="row"></th>
          <td>{{ doc.file_name }}</td>
          <td>{{ doc.doc_date }}</td>
          <td>{{ doc.category.category_item_name }}</td>
          <td>{{ doc.description }}</td>
          <td><a :href="doc.doc_file" target="_blank">Скачать</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { docsAPI } from "@/api/docsAPI"
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
export default {
  name: "ClientMain",
  components: { Spinner },
  data() {
    return {
      docsList: [],
      isLoading: true,
      isError: false,
    }
  },
  async created() {
    try {
      const response = await docsAPI.getItemsList(this.userToken)
      this.docsList = await response.data.results
    } catch (e) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken",
    }),
    sortedDocsList() {
      return this.docsList
    },
  },
  watch: {},
}
</script>

<style scoped></style>
