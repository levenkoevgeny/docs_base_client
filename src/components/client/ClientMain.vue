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
          <font-awesome-icon icon="fa-solid fa-user" />&nbsp;
          {{ userData.username }}
        </div>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <a class="dropdown-item" @click="logOut"> Выход из системы </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-lg-2">
        <h5>Навигация</h5>
        <ul class="list-group">
          <li
            class="list-group-item border-0"
            v-for="category in sortedCategoryList"
            :key="category.id"
          >
            {{ category.category_item_name }}
          </li>
        </ul>
      </div>
      <div class="col-lg-10">
        <div class="alert alert-success" role="alert">Поиск документов</div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Название документа</label
          >
          <input
            type="text"
            class="form-control"
            v-model="docsSearchForm.file_name"
          />
        </div>

        <div v-if="isLoading">Загрузка ...</div>
        <div v-else>
          <h3 class="my-3">Результаты поиска</h3>
          <div v-if="sortedDocsList.length > 0">
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
                <tr v-for="doc in sortedDocsList" :key="doc.id">
                  <th scope="row"></th>
                  <td>{{ doc.file_name }}</td>
                  <td>{{ doc.doc_date }}</td>
                  <td>{{ doc.get_category }}</td>
                  <td>{{ doc.description }}</td>
                  <td><a :href="doc.doc_file" target="_blank">Скачать</a></td>
                </tr>
              </tbody>
            </table>
            <nav>
              <ul class="pagination pagination-md">
                <li class="page-item" :class="{ disabled: !docsList.previous }">
                  <button
                    class="page-link"
                    @click="updatePaginator(docsList.previous)"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                <li class="mx-2"></li>
                <li class="page-item" :class="{ disabled: !docsList.next }">
                  <button
                    class="page-link"
                    @click="updatePaginator(docsList.next)"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div v-else><h5>Список пуст</h5></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { docsAPI } from "@/api/docsAPI"
import { categoriesAPI } from "@/api/categoriesAPI"
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
import debounce from "lodash.debounce"

export default {
  name: "ClientMain",
  components: { Spinner },
  data() {
    return {
      docsList: { results: [] },
      categoryList: { results: [] },
      docsSearchForm: { file_name: "", category: "", region: "", user: "" },
      categorySearchForm: {
        category_item_name: "",
        parent_category: "",
        parent_category_isnull: true,
      },
      categoryBreadCrumbs: [
        {
          category_id: null,
          category_item_name: "Главная",
          parentSearchFormData: {
            parent_category: "",
            parent_category_isnull: true,
          },
        },
      ],
      isLoading: true,
      isError: false,
    }
  },
  async created() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.isLoading = true
      try {
        const response = await docsAPI.getItemsList(
          this.userToken,
          this.docsSearchForm
        )
        this.docsList = await response.data
        const responseCategory = await categoriesAPI.getItemsList(
          this.userToken,
          this.categorySearchForm
        )
        this.categoryList = await responseCategory.data
      } catch (e) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    async updatePaginator(url) {
      this.isLoading = true
      try {
        const response = await docsAPI.updateList(url, this.userToken)
        this.docsList = await response.data
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    debouncedSearch: debounce(async function () {
      await this.loadData()
    }, 500),
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
      return this.docsList.results
    },
    sortedCategoryList() {
      return this.categoryList.results
    },
  },
  watch: {
    docsSearchForm: {
      handler(newValue, oldValue) {
        this.debouncedSearch()
      },
      deep: true,
    },
  },
}
</script>

<style scoped></style>
