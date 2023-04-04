<template>
  <h3>Последние загрузки</h3>
  <p class="text-700">Данные со всех подразделений</p>
  <table class="table table-borderless align-middle">
    <thead class="align-middle">
      <tr>
        <th scope="col">
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" />
          </div>
        </th>
        <th scope="col"></th>
        <th scope="col">Подразделение</th>
        <th scope="col">Название документа</th>
        <th scope="col">Дата документа</th>
        <th scope="col">Описание документа</th>
        <th scope="col">Категория</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody class="align-middle">
      <tr v-for="doc in latestDocsList" :key="doc.id">
        <td>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" />
          </div>
        </td>
        <td><img src="" alt="" /></td>
        <td>
          <div class="d-flex">
            <div class="text-center">
              <img src="" class="rounded" alt="..." />
            </div>
            <div>Подразделение 1</div>
          </div>
        </td>
        <td>
          {{ doc.file_name }}
        </td>
        <td>{{ doc.doc_date }}</td>
        <td>{{ doc.description }}</td>
        <td>{{ doc.category }}</td>
        <td><a :href="doc.doc_file">Скачать</a></td>
      </tr>
    </tbody>
  </table>
  <p>
    5 из 150 документов
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
      latestDocsList: [],
      isLoading: true,
      isError: false,
    }
  },
  async created() {
    try {
      const response = await docsAPI.getItemsList(this.userToken)
      this.latestDocsList = await response.data.results
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
      return this.latestDocsList
    },
  },
}
</script>

<style scoped></style>
