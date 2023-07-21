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
          v-if="userData.last_name"
        >
          <font-awesome-icon icon="fa-solid fa-user" />&nbsp;
          {{ userData.last_name }}
        </div>

        <div
          class="btn btn-secondary bg-dark border-0"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          v-else
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
      <div class="col-lg-3">
        <h5>Навигация</h5>
        <ul class="list-group">
          <li
            class="list-group-item border-0"
            v-for="category in sortedCategoryList"
            :key="category.id"
          >
            <button
              type="button"
              class="btn btn-link my-0 py-0 text-start"
              @click.stop="
                clickGetIntoCategory({
                  ...category,
                  parent_category_isnull: false,
                })
              "
            >
              {{ category.category_item_name }}
            </button>
          </li>
        </ul>
      </div>
      <div class="col-lg-9">
        <div class="alert alert-success" role="alert">Поиск документов</div>
        <div class="mb-3">
          <label class="form-label">Название документа</label>
          <input
            type="text"
            class="form-control"
            v-model="docsSearchForm.file_name"
          />
        </div>

        <div v-if="isLoading">Загрузка ...</div>
        <div v-else>
          <nav aria-label="breadcrumb" class="mt-3">
            <ol class="breadcrumb">
              <li
                class="breadcrumb-item"
                :class="{
                  active: isLastArrayElement(categoryBreadCrumbs, breadCrumb),
                }"
                v-for="breadCrumb in categoryBreadCrumbs"
                :key="breadCrumb.category"
              >
                <button
                  type="button"
                  class="btn btn-link"
                  disabled
                  style="cursor: help !important; text-decoration: none"
                  @click="
                    clickBreadCrumb(
                      breadCrumb.parentSearchFormData.parent_category,
                      breadCrumb.parentSearchFormData.parent_category_isnull,
                      breadCrumb.category_id
                    )
                  "
                  v-if="isLastArrayElement(categoryBreadCrumbs, breadCrumb)"
                >
                  {{ breadCrumb.category_item_name }}
                </button>
                <button
                  type="button"
                  class="btn btn-link"
                  @click="
                    clickBreadCrumb(
                      breadCrumb.parentSearchFormData.parent_category,
                      breadCrumb.parentSearchFormData.parent_category_isnull,
                      breadCrumb.category_id
                    )
                  "
                  v-else
                >
                  {{ breadCrumb.category_item_name }}
                </button>
              </li>
            </ol>
          </nav>
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
import { docsAPIClient } from "@/api/client/docsAPIClient"
import { categoriesAPIClient } from "@/api/client/categoriesAPIClient"
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
      currentCategory: null,
      isLoading: true,
      isError: false,
    }
  },
  async created() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      let docsSearchForm = this.docsSearchForm
      if (!this.userData.is_superuser) {
        docsSearchForm = {
          ...docsSearchForm,
          region: this.userData.get_region,
        }
      }

      this.isLoading = true
      try {
        const response = await docsAPIClient.getItemsList(
          this.userToken,
          docsSearchForm
        )
        this.docsList = await response.data
        const responseCategory = await categoriesAPIClient.getItemsList(
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
        const response = await docsAPIClient.updateList(url, this.userToken)
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
    addToBreadCrumbs(
      category_id,
      category_item_name,
      parent_category,
      parent_category_isnull
    ) {
      this.categoryBreadCrumbs.push({
        category_id,
        category_item_name,
        parentSearchFormData: { parent_category, parent_category_isnull },
      })
    },
    getIntoCategory(parent_category, parent_category_isnull, currentCategory) {
      this.categorySearchForm.parent_category = parent_category
      this.categorySearchForm.parent_category_isnull = parent_category_isnull
      this.currentCategory = currentCategory
      if (currentCategory === null) {
        this.docsSearchForm.category = ""
      } else {
        this.docsSearchForm.category = currentCategory
      }
    },
    clickGetIntoCategory(data) {
      this.isLoading = true
      let {
        id: parentCategory,
        category_item_name,
        parent_category_isnull,
      } = data
      this.getIntoCategory(
        parentCategory,
        parent_category_isnull,
        parentCategory
      )
      this.addToBreadCrumbs(
        parentCategory,
        category_item_name,
        parentCategory,
        parent_category_isnull
      )
      this.currentCategory = parentCategory
    },
    clickBreadCrumb(parentCategory, parent_category_isnull, currentCategory) {
      this.getIntoCategory(
        parentCategory,
        parent_category_isnull,
        currentCategory
      )
      let lastIndex
      this.categoryBreadCrumbs.map((breadCrumb, index) => {
        if (breadCrumb.category_id === currentCategory) {
          lastIndex = index
        }
      })
      this.categoryBreadCrumbs = this.categoryBreadCrumbs.filter(
        (breadCrumb, index) => index < lastIndex + 1
      )
    },
    isLastArrayElement(array, el) {
      let lastIndex = array.length - 1
      let elIndex
      array.map((element, index) => {
        if (element.category_id === el.category_id) {
          elIndex = index
        }
      })
      return elIndex === lastIndex
    },
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
    categorySearchForm: {
      handler(newValue, oldValue) {
        this.debouncedSearch()
      },
      deep: true,
    },
  },
}
</script>

<style scoped></style>
