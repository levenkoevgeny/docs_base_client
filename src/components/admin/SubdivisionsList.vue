<template>
  <!--Add new subdivision modal-->
  <div
    class="modal fade"
    id="addSubdivisionModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="addNewSubdivision">
          <div class="modal-header">
            <h5 class="modal-title">Новое подразделение</h5>
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
                    <label class="form-label">Название подразделения</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="newSubdivisionForm.subdivision_name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <select
                      class="form-select"
                      v-model="newSubdivisionForm.region"
                      required
                    >
                      <option selected value="">--------</option>
                      <option
                        v-for="region in sortedRegionsList"
                        :value="region.id"
                        :key="region.id"
                      >
                        {{ region.region }}
                      </option>
                    </select>
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
              ref="addNewSubdivisionModalCloseButton"
            >
              Закрыть
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--Add new subdivision modal-->

  <!--Update new subdivision modal-->
  <div
    class="modal fade"
    id="updateSubdivisionModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="subdivisionUpdate"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="updateSubdivision">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Редактирование</h5>
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
                    <label class="form-label">Название подразделения</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="currentSubdivisionForUpdate.subdivision_name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <select
                      class="form-select"
                      v-model="currentSubdivisionForUpdate.region"
                      required
                    >
                      <option selected value="">--------</option>
                      <option
                        v-for="region in sortedRegionsList"
                        :value="region.id"
                        :key="region.id"
                      >
                        {{ region.region }}
                      </option>
                    </select>
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
              ref="closeSubdivisionUpdateModal"
            >
              Закрыть
            </button>
            <button type="submit" class="btn btn-primary">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--Update new subdivision modal-->

  <div class="container-fluid">
    <div class="alert alert-danger" role="alert" v-if="isError">
      Ошибка приложения
    </div>
    <h3>Подразделения</h3>
    <small>Поиск по названию</small>
    <div class="d-flex flex-row justify-content-between align-items-center">
      <div>
        <input
          type="text"
          class="form-control"
          style="width: 400px"
          v-model="searchForm.subdivision_name"
        />
      </div>
      <div>
        <button
          @click="deleteCheckedSubdivisionsHandler"
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
          data-bs-target="#addSubdivisionModal"
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
      <div v-if="sortedSubdivisionsList.length > 0" class="mt-5">
        <small>Всего записей в базе - ({{ subdivisionsList.count }})</small>
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
              <th scope="col">Название подразделения</th>
              <th scope="col">Область</th>
              <th scope="col">Количество пользователей</th>
              <th scope="col">Дата и время создания</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="subdivision in sortedSubdivisionsList"
              :key="subdivision.id"
              @click="showModalForUpdate(subdivision.id)"
              class="cursor-pointer"
            >
              <td class="text-center">
                <input
                  type="checkbox"
                  class="form-check-input"
                  v-model="subdivision.checked_val"
                  @click.stop
                />
              </td>
              <td>
                {{ subdivision.subdivision_name }}
              </td>
              <td>{{ subdivision.get_region_name }}</td>
              <td>{{ subdivision.get_users_count }}</td>
              <td>
                {{ getFormattedDateComponent(subdivision.date_time_created) }}
                {{ getFormattedTimeComponent(subdivision.date_time_created) }}
              </td>
            </tr>
          </tbody>
        </table>
        <nav>
          <ul class="pagination pagination-md">
            <li
              class="page-item"
              :class="{ disabled: !subdivisionsList.previous }"
            >
              <button
                class="page-link"
                @click="updatePaginator(subdivisionsList.previous)"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li class="mx-2"></li>
            <li class="page-item" :class="{ disabled: !subdivisionsList.next }">
              <button
                class="page-link"
                @click="updatePaginator(subdivisionsList.next)"
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
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
import { subdivisionsAPI } from "@/api/subdivisionsAPI"
import { regionsAPI } from "@/api/regionAPI"
import { getFormattedDate, getFormattedTime } from "@/utils"
import debounce from "lodash.debounce"

export default {
  name: "SubdivisionsList",
  components: { Spinner },
  data() {
    return {
      subdivisionsList: { results: [] },
      regionList: { results: [] },
      newSubdivisionForm: {
        subdivision_name: "",
        region: null,
      },
      currentSubdivisionForUpdate: {
        subdivision_name: "",
        region: null,
      },
      searchForm: {
        subdivision_name: "",
      },
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
        const response = await subdivisionsAPI.getItemsList(this.userToken)
        this.subdivisionsList = await response.data
        const responseRegions = await regionsAPI.getItemsList(this.userToken)
        this.regionList = await responseRegions.data
      } catch (e) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    async addNewSubdivision(event) {
      event.preventDefault()
      this.isLoading = true
      try {
        const response = await subdivisionsAPI.addItem(
          this.userToken,
          this.newSubdivisionForm
        )
        await this.loadData()
      } catch (error) {
        this.isError = true
      } finally {
        this.$refs.addNewSubdivisionModalCloseButton.click()
        this.newSubdivisionForm = {
          subdivision_name: "",
          region: null,
        }
        this.isLoading = false
      }
    },
    async updateSubdivision(event) {
      event.preventDefault()
      try {
        const response = await subdivisionsAPI.updateItem(
          this.userToken,
          this.currentSubdivisionForUpdate
        )
        const updatedSubdivision = await response.data

        this.subdivisionsList.results = this.subdivisionsList.results.map(
          (subdivision) => {
            if (subdivision.id === updatedSubdivision.id) {
              return updatedSubdivision
            } else return subdivision
          }
        )
        this.$refs.closeSubdivisionUpdateModal.click()
      } catch (error) {
        this.isError = true
      } finally {
      }
    },
    async showModalForUpdate(subdivisionID) {
      this.isError = false
      try {
        const response = await subdivisionsAPI.getItemData(
          this.userToken,
          subdivisionID
        )
        this.currentSubdivisionForUpdate = await response.data

        let updateModal = this.$refs.subdivisionUpdate
        let myModal = new bootstrap.Modal(updateModal, {
          keyboard: false,
        })
        myModal.show()
      } catch (event) {
        this.isError = true
      } finally {
      }
    },
    async updatePaginator(url) {
      this.isLoading = true
      try {
        const response = await subdivisionsAPI.updateList(url, this.userToken)
        this.subdivisionsList = await response.data
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    makeFilter: debounce(async function () {
      this.isLoading = true
      try {
        const response = await subdivisionsAPI.getItemsList(
          this.userToken,
          this.searchForm.subdivision_name
        )
        this.subdivisionsList = await response.data
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    }, 500),
    deleteCheckedSubdivisionsHandler() {
      this.isLoading = true
      this.isError = false
      let requestIds = []
      let responseIds = []
      this.subdivisionsList.results.map((subdivision) => {
        if (subdivision.checked_val) {
          requestIds.push(subdivision.id)
        }
        return
      })
      let requests = requestIds.map((id) =>
        subdivisionsAPI.deleteItem(this.userToken, id)
      )
      Promise.all(requests)
        .then(async (responses) => {
          await this.loadData()
        })
        .catch(() => (this.isError = true))
        .finally(() => {
          this.isLoading = false
        })
    },
    checkAllHandler(e) {
      if (e.target.checked) {
        this.subdivisionsList.results = this.subdivisionsList.results.map(
          (subdivision) => ({
            ...subdivision,
            checked_val: true,
          })
        )
      } else {
        this.subdivisionsList.results = this.subdivisionsList.results.map(
          (subdivision) => ({
            ...subdivision,
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
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken",
    }),
    sortedSubdivisionsList() {
      return this.subdivisionsList.results
    },
    sortedRegionsList() {
      return this.regionList.results
    },
    checkedForDeleteCount() {
      let counter = 0
      this.subdivisionsList.results.map((subdivision) => {
        if (subdivision.checked_val) {
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
