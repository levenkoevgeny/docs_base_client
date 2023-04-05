<template>
  <div class="container-fluid">
    <div>
      <h3>Категории</h3>
      <small>Все ({{ categoriesList.length }})</small>
      <div class="d-flex flex-row justify-content-between align-items-center">
        <div>
          <input type="text" class="form-control" style="width: 400px" />
        </div>
        <div><font-awesome-icon icon="fa-solid fa-file-export" /> Export</div>
        <button
          style="height: 40px; width: 200px"
          type="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="fa-solid fa-plus" /> Добавить
        </button>
      </div>
      <div class="mt-3">
        <div v-if="categoriesList.length > 0">
          <table class="table table-borderless align-middle">
            <thead class="align-middle">
              <tr>
                <th scope="col">
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" />
                  </div>
                </th>
                <th scope="col">Категория</th>
                <th scope="col">Родительская категория</th>
              </tr>
            </thead>
            <tbody class="align-middle">
              <tr v-for="category in categoriesList" :key="category.id">
                <td>
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" />
                  </div>
                </td>
                <td>
                  {{ category.category_item_name }}
                </td>
                <td>
                  {{ category.parent_category }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else><h5>Список пуст</h5></div>
      </div>
    </div>
  </div>
</template>

<script>
import { categoriesAPI } from "@/api/categoriesAPI"
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
export default {
  name: "CategoriesList",
  components: { Spinner },
  data() {
    return {
      categoriesList: [],
      isLoading: true,
      isError: false,
    }
  },
  async created() {
    try {
      const response = await categoriesAPI.getItemsList(this.userToken)
      this.categoriesList = await response.data.results
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
    sortedCategoriesList() {
      return this.categoriesList
    },
  },
  watch: {},
}
</script>

<style scoped></style>
