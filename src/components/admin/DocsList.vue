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
            <h5 class="modal-title">Новый документ</h5>
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
                    <label class="form-label">Регион</label>
                    <select
                      class="form-select"
                      v-model="newDocForm.region"
                      required
                    >
                      <option selected value="">--------</option>
                      <option
                        v-for="region in regionsList.results"
                        :key="region.id"
                        :value="region.id"
                      >
                        {{ region.region }}
                      </option>
                    </select>
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

  <!--Update doc modal-->
  <div
    class="modal fade"
    id="updateDocModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="docUpdate"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="updateDoc">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Редактирование документа
            </h5>
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
                      v-model="currentDocForUpdate.category"
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
                      v-model="currentDocForUpdate.file_name"
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
                      v-model="currentDocForUpdate.description"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Регион</label>
                    <select
                      class="form-select"
                      v-model="currentDocForUpdate.region"
                      required
                    >
                      <option selected value="">--------</option>
                      <option
                        v-for="region in regionsList.results"
                        :key="region.id"
                        :value="region.id"
                      >
                        {{ region.region }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Прикрепите файл</label>
                    <br />
                    <input
                      type="file"
                      ref="fileForUpdate"
                      name="doc_file"
                      class="form-control"
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
                      v-model="currentDocForUpdate.doc_date"
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
              ref="updateDocModalCloseButton"
            >
              Закрыть
            </button>
            <button type="submit" class="btn btn-primary">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--Update doc modal-->

  <div class="container-fluid">
    <div class="alert alert-danger" role="alert" v-if="isError">
      Ошибка приложения
    </div>

    <div class="d-flex align-items-center mb-3">
      <h5><font-awesome-icon icon="fa-solid fa-file" />&nbsp;&nbsp;</h5>
      <h3>Документы</h3>
    </div>

    <div class="shadow p-3 mb-5 bg-body rounded">
      <h5>Поиск</h5>

      <div class="row">
        <div class="col-4">
          <div class="mb-3">
            <label class="form-label">Название документа</label>
            <input
              type="text"
              class="form-control"
              v-model="searchForm.file_name"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="mb-3">
            <label class="form-label">Категория документа</label>
            <select class="form-select" v-model="searchForm.category">
              <option selected value="">--------</option>
              <option
                :value="category.id"
                :key="category.id"
                v-for="category in categoriesList.results"
              >
                {{ category.category_item_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <div class="mb-3">
            <label class="form-label">Область</label>
            <select class="form-select" v-model="searchForm.region">
              <option selected value="">--------</option>
              <option
                :value="region.id"
                :key="region.id"
                v-for="region in regionsList.results"
              >
                {{ region.region }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex flex-row justify-content-end align-items-center mt-3">
      <div>
        <button
          @click="deleteCheckedDocsHandler"
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
          data-bs-target="#addDocModal"
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
      <div class="mt-3">
        <div v-if="sortedDocsList.length > 0">
          <small
            ><b>Всего записей - ({{ docsList.count }})</b></small
          >
          <table class="table table-borderless table-hover">
            <thead class="table-head">
              <tr>
                <th scope="col" class="text-center">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    @change="checkAllHandler($event)"
                  />
                </th>
                <th scope="col">Название документа</th>
                <th scope="col">Категория документа</th>
                <th scope="col">Регион</th>
                <th scope="col">Описание документа</th>
                <th scope="col">Категория</th>
                <th scope="col">Дата документа</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody class="align-middle">
              <tr
                v-for="doc in sortedDocsList"
                :key="doc.id"
                @click="showModalForUpdate(doc.id)"
                class="cursor-pointer"
              >
                <td class="text-center">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    v-model="doc.checked_val"
                    @click.stop
                  />
                </td>

                <td>
                  <font-awesome-icon icon="fa-solid fa-file" />&nbsp;&nbsp;
                  {{ doc.file_name }}
                </td>

                <td>{{ doc.get_category }}</td>
                <td>{{ doc.get_region }}</td>

                <td>{{ doc.description }}</td>
                <td>{{ doc.category }}</td>
                <td>{{ doc.doc_date }}</td>
                <td><a :href="doc.doc_file">Скачать</a></td>
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
</template>

<script>
import { docsAPI } from "@/api/docsAPI"
import { categoriesAPI } from "@/api/categoriesAPI"
import { regionsAPI } from "@/api/regionsAPI"
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
import debounce from "lodash.debounce"
import axios from "axios"

export default {
  name: "DocsList",
  components: { Spinner },
  data() {
    return {
      docsList: { results: [] },
      categoriesList: { results: [] },
      regionsList: { results: [] },
      newDocForm: {
        file_name: "",
        description: "",
        doc_date: "",
        category: "",
        region: "",
      },
      searchForm: {
        file_name: "",
        category: "",
        region: "",
        user: "",
      },
      currentDocForUpdate: {},
      isLoading: true,
      isError: false,
    }
  },
  async created() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const response = await docsAPI.getItemsList(
          this.userToken,
          this.searchForm
        )
        this.docsList = await response.data
        const categoriesResponse = await categoriesAPI.getItemsList(
          this.userToken
        )
        this.categoriesList = await categoriesResponse.data
        const regionsResponse = await regionsAPI.getItemsList(this.userToken)
        this.regionsList = await regionsResponse.data
      } catch (e) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    async addNewDoc(event) {
      event.preventDefault()
      this.isLoading = true
      let formData = new FormData()
      formData.append("doc_file", this.$refs.file.files[0])
      formData.append("category", this.newDocForm.category)
      formData.append("region", this.newDocForm.region)
      formData.append("file_name", this.newDocForm.file_name)
      formData.append("description", this.newDocForm.description)
      formData.append("doc_date", this.newDocForm.doc_date)
      formData.append("user", this.userData.id)
      try {
        await docsAPI.addItem(this.userToken, formData)
        await this.loadData()
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
    async showModalForUpdate(docID) {
      this.isError = false
      try {
        const response = await docsAPI.getItemData(this.userToken, docID)
        this.currentDocForUpdate = await response.data

        const srcToFile = async (src, fileName) => {
          const response = await axios.get(src, {
            responseType: "blob",
          })
          const mimeType = response.headers["content-type"]
          return new File(
            [response.data],
            this.getFileName(this.currentDocForUpdate.doc_file),
            {
              type: mimeType,
            }
          )
        }
        const myFile = await srcToFile(
          this.currentDocForUpdate.doc_file,
          "doc_file.txt"
        )

        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(myFile)
        this.$refs.fileForUpdate.files = dataTransfer.files
        let updateModal = this.$refs.docUpdate
        let myModal = new bootstrap.Modal(updateModal, {
          keyboard: false,
        })
        myModal.show()
      } catch (error) {
        this.isError = true
      } finally {
      }
    },
    async updateDoc() {
      this.isLoading = true
      this.isError = false
      let formData = new FormData()
      formData.append("doc_file", this.$refs.fileForUpdate.files[0])
      formData.append("category", this.currentDocForUpdate.category)
      formData.append("region", this.currentDocForUpdate.region)
      formData.append("file_name", this.currentDocForUpdate.file_name)
      formData.append("description", this.currentDocForUpdate.description)
      formData.append("doc_date", this.currentDocForUpdate.doc_date)
      formData.append("user", this.userData.id)
      try {
        await docsAPI.updateItem(
          this.userToken,
          this.currentDocForUpdate.id,
          formData
        )
        await this.loadData()
      } catch (error) {
        this.isError = true
      } finally {
        this.$refs.updateDocModalCloseButton.click()
        this.isLoading = false
      }
    },
    async deleteCheckedDocsHandler() {
      this.isLoading = true
      this.isError = false
      let requestIds = []
      this.docsList.results.map((doc) => {
        if (doc.checked_val) {
          requestIds.push(doc.id)
        }
        return
      })
      let requests = requestIds.map((id) =>
        docsAPI.deleteItem(this.userToken, id)
      )
      Promise.all(requests)
        .then(async () => {
          await this.loadData()
        })
        .catch(() => (this.isError = true))
        .finally(() => {
          this.isLoading = false
        })
    },
    debouncedSearch: debounce(async function () {
      await this.loadData()
    }, 500),
    checkAllHandler(e) {
      if (e.target.checked) {
        this.docsList.results = this.docsList.results.map((doc) => ({
          ...doc,
          checked_val: true,
        }))
      } else {
        this.docsList.results = this.docsList.results.map((doc) => ({
          ...doc,
          checked_val: false,
        }))
      }
    },
    getFileName(fullPath) {
      let decodedPath = decodeURIComponent(fullPath)
      let baseURL =
        process.env.VUE_APP_BACKEND_PROTOCOL +
        "://" +
        process.env.VUE_APP_BACKEND_HOST +
        ":" +
        process.env.VUE_APP_BACKEND_PORT +
        "/media/docs/"
      return decodedPath.replace(baseURL, "")
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
    checkedForDeleteCount() {
      let counter = 0
      this.docsList.results.map((item) => {
        if (item.checked_val) {
          counter++
        }
      })
      return counter
    },
  },
  watch: {
    searchForm: {
      handler(newValue, oldValue) {
        this.debouncedSearch()
      },
      deep: true,
    },
  },
}
</script>

<style scoped></style>
