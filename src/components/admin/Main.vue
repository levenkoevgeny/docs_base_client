<template>
  <h3>Последние загрузки</h3>
  <p class="text-700">Данные со всех подразделений</p>
  <table class="table table-borderless align-middle">
    <thead class="align-middle">
      <tr>
        <th scope="col"></th>
        <th scope="col">Название документа</th>
        <th scope="col">Описание документа</th>
        <th scope="col">Категория</th>
        <th scope="col">Дата документа</th>
      </tr>
    </thead>
    <tbody class="align-middle">
      <tr v-for="doc in sortedDocsList" :key="doc.id">
        <td><img src="" alt="" /></td>
        <td>
          {{ doc.file_name }}
        </td>
        <td>
          {{ doc.description }}
        </td>
        <td>{{ doc.category }}</td>
        <td>{{ doc.doc_date }}</td>
      </tr>
    </tbody>
  </table>
  <p>
    <router-link to="/admin/docs"> Показать все ></router-link>
  </p>
</template>

<script>
import { docsAPI } from "@/api/docsAPI"
import AdminNav from "@/components/admin/AdminNav"
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"

export default {
  name: "Main",
  components: { AdminNav, Spinner },
  data() {
    return {
      latestDocsList: { results: [] },
      searchForm: {
        file_name: "",
        description: "",
        doc_date: "",
        category: "",
        region: "",
      },
      isLoading: true,
      isError: false,
    }
  },
  async created() {
    try {
      const response = await docsAPI.getItemsList(
        this.userToken,
        this.searchForm
      )
      this.latestDocsList = await response.data
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
      return this.latestDocsList.results.slice(0, 4)
    },
  },
}
</script>

<style scoped></style>
