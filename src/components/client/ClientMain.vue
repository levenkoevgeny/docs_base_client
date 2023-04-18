<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <font-awesome-icon icon="fa-solid fa-book" /> Система учета документов
      </a>
      <div class="btn-group dropstart">
        <div
          class="btn btn-secondary bg-dark border-0"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <font-awesome-icon icon="fa-solid fa-user" />
        </div>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <a class="dropdown-item" @click="logOut"> Выход из системы </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
  methods: {
    logOut() {
      this.$store.dispatch("auth/actionRemoveLogIn")
      this.$router.push({ name: "login", replace: true })
    },
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
