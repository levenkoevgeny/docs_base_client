<template>
  <!--Add new doc modal-->
  <div
    class="modal fade"
    id="addDocModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="addNewDoc">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Новый документ</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Категория</label>
                    <select
                      class="form-select"
                      v-model="newDocForm.category"
                      required
                    >
                      <option selected value="">--------</option>
                      <option
                        v-for="category in categoriesList.results"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{ category.category_item_name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Название файла</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="newDocForm.file_name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Описание файла</label>
                    <textarea
                      class="form-control"
                      rows="3"
                      v-model="newDocForm.description"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Прикрепите файл</label>
                    <input
                      type="file"
                      ref="file"
                      name="doc_file"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Дата файла</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="newDocForm.doc_date"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              ref="addNewDocModalCloseButton"
            >
              Закрыть
            </button>
            <button type="submit" class="btn btn-primary">Добавить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--Add new doc modal-->
  <div class="container-fluid">
    <div class="alert alert-danger" role="alert" v-if="isError">
      Ошибка приложения
    </div>
    <div>
      <h3>Документы</h3>
      <small>Поиск по названию документа</small>
      <div class="d-flex flex-row justify-content-between align-items-center">
        <div>
          <input type="text" class="form-control" style="width: 400px" />
        </div>
        <div><font-awesome-icon icon="fa-solid fa-file-export" /> Export</div>
        <button
          style="height: 40px; width: 200px"
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addDocModal"
        >
          <font-awesome-icon icon="fa-solid fa-plus" /> Добавить
        </button>
      </div>
      <div
        v-if="isLoading"
        class="d-flex justify-content-center align-items-center"
        style="height: 80vh"
      >
        <Spinner />
      </div>
      <div v-else>
        <div class="mt-3">
          <div v-if="sortedDocsList.length > 0">
            <small>Всего записей в базе - ({{ docsList.count }})</small>
            <table class="table table-borderless table-hover">
              <thead class="table-head">
                <tr>
                  <th
                    scope="col"
                    class="d-flex justify-content-center align-items-center"
                  >
                    <input type="checkbox" class="form-check-input" />
                  </th>
                  <th scope="col">Picture</th>
                  <th scope="col">Название документа</th>
                  <th scope="col">Описание документа</th>
                  <th scope="col">Категория</th>
                  <th scope="col">Дата документа</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody class="align-middle">
                <tr v-for="doc in sortedDocsList" :key="doc.id">
                  <td>
                    <div class="mb-3 form-check">
                      <input type="checkbox" class="form-check-input" />
                    </div>
                  </td>
                  <td><img src="" alt="" /></td>
                  <td>
                    {{ doc.file_name }}
                  </td>
                  <td>{{ doc.description }}</td>
                  <td>{{ doc.category }}</td>
                  <td>{{ doc.doc_date }}</td>
                  <td><a :href="doc.doc_file">Скачать</a></td>
                </tr>
              </tbody>
            </table>
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

export default {
  name: "DocsList",
  components: { Spinner },
  data() {
    return {
      docsList: { results: [] },
      newDocForm: {
        category: "",
        file_name: "",
        description: "",
        doc_date: "",
      },
      categoriesList: { results: [] },
      isLoading: true,
      isError: false,
    }
  },
  async created() {
    try {
      const response = await docsAPI.getItemsList(this.userToken)
      this.docsList = await response.data
      const categoriesResponse = await categoriesAPI.getItemsList(
        this.userToken,
        {
          category_item_name: "",
          parent_category: "",
          parent_category_isnull: "",
        }
      )
      this.categoriesList = await categoriesResponse.data
    } catch (e) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    async addNewDoc(event) {
      event.preventDefault()
      this.isLoading = true
      let formData = new FormData()
      formData.append("doc_file", this.$refs.file.files[0])
      formData.append("category", this.newDocForm.category)
      formData.append("file_name", this.newDocForm.file_name)
      formData.append("description", this.newDocForm.description)
      formData.append("doc_date", this.newDocForm.doc_date)
      try {
        const response = await docsAPI.addItem(this.userToken, formData)
        const newDoc = await response.data
        this.docsList.results.push(newDoc)
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
        this.$refs.addNewDocModalCloseButton.click()
        this.newDocForm = {
          category: "",
          file_name: "",
          description: "",
          doc_date: "",
        }
        event.target.reset()
      }
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
    // checkedForDeleteCount() {
    //   let counter = 0
    //   this.usersList.map((item) => {
    //     if (item.checked_val) {
    //       counter++
    //     }
    //   })
    //   return counter
    // },
  },
  watch: {},
}
</script>

<style scoped></style>
