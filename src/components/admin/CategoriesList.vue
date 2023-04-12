<template>
  <div class="container-fluid">
    <div class="alert alert-danger" role="alert" v-if="isError">
      Ошибка приложения
    </div>
    <h3>Категории</h3>
    <small>Поиск по названию</small>
    <div class="d-flex flex-row justify-content-between align-items-center">
      <div>
        <input
          type="text"
          class="form-control"
          style="width: 400px"
          v-model="searchForm.category_item_name"
        />
      </div>
      <div>
        <button
          @click="deleteCheckedCategoriesHandler"
          style="height: 40px; width: 200px"
          class="btn btn-danger"
          v-if="checkedForDeleteCount"
        >
          Удалить ({{ checkedForDeleteCount }})
        </button>
        <button
          style="height: 40px; width: 200px"
          type="button"
          class="btn btn-primary ms-2"
          data-bs-toggle="modal"
          data-bs-target="#addCategoryModal"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
          Добавить
        </button>
      </div>
    </div>
    <div
      v-if="isLoading"
      class="d-flex justify-content-center align-items-center"
      style="height: 80vh"
    >
      <Spinner />
    </div>

    <div v-else>
      <nav aria-label="breadcrumb" class="mt-5">
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

      <div v-if="sortedCategoriesList.length > 0" class="mt-3">
        <small>Всего записей - ({{ categoriesList.count }})</small>
        <table class="table table-borderless table-hover">
          <thead class="table-head">
            <tr>
              <th
                scope="col"
                class="d-flex justify-content-center align-items-center"
              >
                <input
                  type="checkbox"
                  class="form-check-input"
                  @change="checkAllHandler($event)"
                />
              </th>
              <th scope="col">Категория</th>
              <th scope="col">Дата и время создания</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="category in sortedCategoriesList"
              :key="category.id"
              @click="showModalForUpdate(category.id)"
              class="cursor-pointer"
            >
              <td class="text-center">
                <input
                  type="checkbox"
                  class="form-check-input"
                  v-model="category.checked_val"
                  @click.stop
                />
              </td>
              <td>
                {{ category.category_item_name }}
              </td>
              <td>
                {{ getFormattedDateComponent(category.date_time_created) }}
                {{ getFormattedTimeComponent(category.date_time_created) }}
              </td>
              <td>
                <button
                  class="btn btn-link"
                  @click.stop="
                    clickGetIntoCategory({
                      ...category,
                      parent_category_isnull: false,
                    })
                  "
                >
                  Переход
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <nav>
          <ul class="pagination pagination-md">
            <li
              class="page-item"
              :class="{ disabled: !sortedCategoriesList.previous }"
            >
              <button
                class="page-link"
                @click="updatePaginator(sortedCategoriesList.previous)"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li class="mx-2"></li>
            <li
              class="page-item"
              :class="{ disabled: !sortedCategoriesList.next }"
            >
              <button
                class="page-link"
                @click="updatePaginator(sortedCategoriesList.next)"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div v-else class="mt-3"><h3>Список пуст</h3></div>
    </div>
  </div>
</template>

<script>
import { categoriesAPI } from "@/api/categoriesAPI"
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
import { getFormattedDate, getFormattedTime } from "@/utils"
import debounce from "lodash.debounce"
import { subdivisionsAPI } from "@/api/subdivisionsAPI"

export default {
  name: "CategoriesList",
  components: { Spinner },
  data() {
    return {
      categoriesList: { results: [] },
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
      searchForm: {
        category_item_name: "",
        parent_category: "",
        parent_category_isnull: true,
      },
      currentCategory: null,
      isLoading: true,
      isError: false,
    }
  },
  async created() {
    try {
      const response = await categoriesAPI.getItemsList(
        this.userToken,
        this.searchForm
      )
      this.categoriesList = await response.data
    } catch (e) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    async addNewCategory(event) {},
    async updateCategory(event) {},
    async showModalForUpdate(event) {},
    async updatePaginator(url) {},
    makeFilter: debounce(async function () {
      this.isLoading = true
      try {
        const response = await categoriesAPI.getItemsList(
          this.userToken,
          this.searchForm
        )
        this.categoriesList = await response.data
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    }, 500),
    checkAllHandler(e) {
      if (e.target.checked) {
        this.categoriesList.results = this.categoriesList.results.map(
          (category) => ({
            ...category,
            checked_val: true,
          })
        )
      } else {
        this.categoriesList.results = this.categoriesList.results.map(
          (category) => ({
            ...category,
            checked_val: false,
          })
        )
      }
    },
    getFormattedDateComponent(dateTime) {
      return getFormattedDate(dateTime)
    },
    getFormattedTimeComponent(dateTime) {
      return getFormattedTime(dateTime)
    },
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
      this.searchForm.parent_category = parent_category
      this.searchForm.parent_category_isnull = parent_category_isnull
      this.currentCategory = currentCategory
    },
    clickGetIntoCategory(data) {
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
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken",
    }),
    sortedCategoriesList() {
      return this.categoriesList.results
    },
    checkedForDeleteCount() {
      let counter = 0
      this.categoriesList.results.map((category) => {
        if (category.checked_val) {
          counter++
        }
      })
      return counter
    },
  },
  watch: {
    searchForm: {
      handler(newValue, oldValue) {
        this.makeFilter()
      },
      deep: true,
    },
  },
}
</script>

<style scoped></style>
