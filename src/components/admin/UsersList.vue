<template>
  <!--Add new user modal-->
  <div
    class="modal fade"
    id="addUserModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="addNewUser" autocomplete="off">
          <div class="modal-header">
            <h5 class="modal-title">Новый пользователь</h5>
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
                    <label class="form-label">Логин</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="newUserForm.username"
                      autocomplete="off"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Пароль</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="newUserForm.password"
                      autocomplete="off"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label">Фамилия</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="newUserForm.last_name"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label">Имя</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="newUserForm.first_name"
                      autocomplete="off"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Подразделение</label>
                    <select
                      class="form-select"
                      v-model="newUserForm.subdivision"
                    >
                      <option selected value="">--------</option>
                      <option
                        v-for="subdivision in subdivisionsList.results"
                        :key="subdivision.id"
                        :value="subdivision.id"
                      >
                        {{ subdivision.subdivision_name }}
                        {{ subdivision.get_region_name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row" v-if="userData.is_superuser">
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="newUserForm.is_superuser"
                    />
                    <label class="form-check-label"> Суперпользователь </label>
                  </div>
                </div>
              </div>
              <div class="row" v-if="userData.is_superuser">
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="newUserForm.is_staff"
                    />
                    <label class="form-check-label"> Персонал </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="newUserForm.is_active"
                    />
                    <label class="form-check-label"> Активный </label>
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
              ref="addNewUserModalCloseButton"
            >
              Закрыть
            </button>
            <button type="submit" class="btn btn-primary">Добавить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--Add new user modal-->

  <!--Update user modal-->
  <div
    class="modal fade"
    id="updateUserModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="userUpdate"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="updateUser" autocomplete="off">
          <div class="modal-header">
            <h5 class="modal-title">Редактирование пользователя</h5>
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
                    <label class="form-label">Логин</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="currentUserForUpdate.username"
                      autocomplete="off"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label">Фамилия</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="currentUserForUpdate.last_name"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label">Имя</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="currentUserForUpdate.first_name"
                      autocomplete="off"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Подразделение</label>
                    <select
                      class="form-select"
                      v-model="currentUserForUpdate.subdivision"
                    >
                      <option selected value="">--------</option>
                      <option
                        v-for="subdivision in subdivisionsList.results"
                        :key="subdivision.id"
                        :value="subdivision.id"
                      >
                        {{ subdivision.subdivision_name }}
                        {{ subdivision.get_region_name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row" v-if="userData.is_superuser">
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="currentUserForUpdate.is_superuser"
                    />
                    <label class="form-check-label"> Суперпользователь </label>
                  </div>
                </div>
              </div>
              <div class="row" v-if="userData.is_superuser">
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="currentUserForUpdate.is_staff"
                    />
                    <label class="form-check-label"> Персонал </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="currentUserForUpdate.is_active"
                    />
                    <label class="form-check-label"> Активный </label>
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
              ref="updateUserModalCloseButton"
            >
              Закрыть
            </button>
            <button type="submit" class="btn btn-primary">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--Update user modal-->

  <!--Update password modal-->
  <div
    class="modal fade"
    id="updateUserPasswordModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="userUpdatePassword"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="updateUserPassword" autocomplete="off">
          <div class="modal-header">
            <h5 class="modal-title">
              Смена пароля для - {{ currentUserForUpdate.username }}
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
                    <label class="form-label">Новый пароль</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="newPasswordForm.password"
                      autocomplete="off"
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
              ref="changePasswordModalCloseButton"
            >
              Закрыть
            </button>
            <button type="submit" class="btn btn-primary">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--Update password modal-->

  <div class="container-fluid">
    <div>
      <div class="alert alert-danger" role="alert" v-if="isError">
        Ошибка приложения
      </div>

      <div class="d-flex align-items-center mb-3">
        <h5><font-awesome-icon icon="fa-solid fa-user" />&nbsp;&nbsp;</h5>
        <h3>Пользователи</h3>
      </div>

      <div class="shadow p-3 mb-5 bg-body rounded">
        <h5>Поиск</h5>
        <div class="row">
          <div class="col-4">
            <div class="mb-3">
              <label class="form-label">Логин</label>
              <input
                type="text"
                class="form-control"
                v-model="searchForm.username"
              />
            </div>
          </div>
          <div class="col-4">
            <div class="mb-3">
              <label class="form-label">Фамилия</label>
              <input
                type="text"
                class="form-control"
                v-model="searchForm.last_name"
              />
            </div>
          </div>
          <div class="col-4">
            <div class="mb-3">
              <label class="form-label">Подразделение</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="searchForm.subdivision"
              >
                <option selected value="">----------</option>
                <option
                  v-for="subdivision in subdivisionsList.results"
                  :key="subdivision.id"
                  :value="subdivision.id"
                >
                  {{ subdivision.subdivision_name }}
                  {{ subdivision.get_region_name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="mb-3">
              <label class="form-label">Администратор</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="searchForm.is_superuser"
              >
                <option selected value="">----------</option>
                <option value="true">Да</option>
                <option value="false">Нет</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="mb-3">
              <label class="form-label">Персонал</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="searchForm.is_staff"
              >
                <option selected value="">----------</option>
                <option value="true">Да</option>
                <option value="false">Нет</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="mb-3">
              <label class="form-label">Активный</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="searchForm.is_active"
              >
                <option selected value="">----------</option>
                <option value="true">Да</option>
                <option value="false">Нет</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-row justify-content-end align-items-center mt-3">
        <div>
          <button
            @click="deleteCheckedUsersHandler"
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
            data-bs-target="#addUserModal"
          >
            <font-awesome-icon icon="fa-solid fa-plus" /> Добавить
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
          <small
            ><b>Всего записей - ({{ usersList.count }})</b></small
          >
          <div v-if="sortedUsersList.length > 0">
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
                  <th scope="col">Логин</th>
                  <th scope="col">Фамилия</th>
                  <th scope="col">Подразделение</th>
                  <th scope="col" class="text-center">Администратор</th>
                  <th scope="col" class="text-center">Персонал</th>
                  <th scope="col" class="text-center">Активный</th>
                  <th scope="col" class="text-center">Дата создания</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody class="align-middle">
                <tr
                  v-for="user in sortedUsersList"
                  :key="user.id"
                  @click="showModalForUpdate(user.id)"
                  class="cursor-pointer"
                >
                  <td class="text-center">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      v-model="user.checked_val"
                      @click.stop
                    />
                  </td>
                  <td>
                    {{ user.username }}
                  </td>
                  <td>{{ user.last_name }}</td>
                  <td>{{ user.get_subdivision }}</td>
                  <td v-if="user.is_superuser" class="text-center">
                    <font-awesome-icon icon="fa-solid fa-check" />
                  </td>
                  <td v-else class="text-center"></td>

                  <td v-if="user.is_staff" class="text-center">
                    <font-awesome-icon icon="fa-solid fa-check" />
                  </td>
                  <td v-else class="text-center"></td>
                  <td v-if="user.is_active" class="text-center">
                    <font-awesome-icon icon="fa-solid fa-unlock" />
                  </td>
                  <td v-else class="text-center">
                    <font-awesome-icon icon="fa-solid fa-lock" />
                  </td>
                  <td class="text-center">
                    {{ getFormattedDateComponent(user.date_joined) }}
                    {{ getFormattedTimeComponent(user.date_joined) }}
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click.stop="showModalForUpdatePassword(user.id)"
                    >
                      <font-awesome-icon icon="fa-solid fa-key" /> Обновить
                      пароль
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav>
              <ul class="pagination pagination-md">
                <li
                  class="page-item"
                  :class="{ disabled: !usersList.previous }"
                >
                  <button
                    class="page-link"
                    @click="updatePaginator(usersList.previous)"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                <li class="mx-2"></li>
                <li class="page-item" :class="{ disabled: !usersList.next }">
                  <button
                    class="page-link"
                    @click="updatePaginator(usersList.next)"
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
import { usersAPI } from "@/api/usersAPI"
import { subdivisionsAPI } from "@/api/subdivisionsAPI"
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
import { getFormattedDate, getFormattedTime } from "@/utils"
import debounce from "lodash.debounce"

export default {
  name: "UsersList",
  components: { Spinner },
  data() {
    return {
      usersList: { results: [] },
      subdivisionsList: { results: [] },
      newUserForm: {
        username: "",
        password: "",
        is_superuser: false,
        is_staff: false,
        is_active: true,
        first_name: "",
        last_name: "",
        subdivision: "",
      },
      currentUserForUpdate: {
        username: "",
        password: "",
        is_superuser: false,
        is_staff: false,
        first_name: "",
        last_name: "",
        subdivision: "",
      },
      newPasswordForm: {
        password: "",
      },
      searchForm: {
        username: "",
        last_name: "",
        subdivision: "",
        is_superuser: "",
        is_staff: "",
        is_active: "",
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
      let searchUsersData = this.searchForm
      let searchSubdivisionsData = { subdivision_name: "", region: "" }

      if (!this.userData.is_superuser) {
        searchUsersData = {
          ...searchUsersData,
          subdivision: this.userData.subdivision,
        }
        searchSubdivisionsData = {
          ...searchSubdivisionsData,
          region: this.userData.get_region,
        }
      }

      try {
        const response = await usersAPI.getItemsList(
          this.userToken,
          searchUsersData
        )
        this.usersList = await response.data

        const responseSubdivision = await subdivisionsAPI.getItemsList(
          this.userToken,
          searchSubdivisionsData
        )
        this.subdivisionsList = await responseSubdivision.data
      } catch (e) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    async addNewUser() {
      this.isLoading = true
      try {
        await usersAPI.addItem(this.userToken, this.newUserForm)
        await this.loadData()
      } catch (error) {
        this.isError = true
      } finally {
        this.$refs.addNewUserModalCloseButton.click()
        this.newUserForm = {
          username: "",
          password: "",
          is_superuser: false,
          is_staff: false,
          is_active: true,
          first_name: "",
          last_name: "",
          subdivision: "",
        }
        this.isLoading = false
      }
    },
    async getCurrentUser(userID) {
      const response = await usersAPI.getItemData(this.userToken, userID)
      this.currentUserForUpdate = await response.data
    },
    async showModalForUpdate(userID) {
      this.isError = false
      try {
        await this.getCurrentUser(userID)
        let updateModal = this.$refs.userUpdate
        let myModal = new bootstrap.Modal(updateModal, {
          keyboard: false,
        })
        myModal.show()
      } catch (event) {
        this.isError = true
      } finally {
      }
    },
    async showModalForUpdatePassword(userID) {
      this.isError = false
      try {
        await this.getCurrentUser(userID)
        let updateModal = this.$refs.userUpdatePassword
        let myModal = new bootstrap.Modal(updateModal, {
          keyboard: false,
        })
        myModal.show()
      } catch (event) {
        this.isError = true
      } finally {
      }
    },
    async updateUser() {
      this.isLoading = true
      delete this.currentUserForUpdate.password
      try {
        await usersAPI.updateItem(this.userToken, this.currentUserForUpdate)
        await this.loadData()
      } catch (error) {
        this.isError = true
      } finally {
        this.$refs.updateUserModalCloseButton.click()
        this.isLoading = false
      }
    },
    async deleteCheckedUsersHandler() {
      this.isLoading = true
      this.isError = false
      let requestIds = []
      this.usersList.results.map((item) => {
        if (item.checked_val) {
          requestIds.push(item.id)
        }
        return
      })
      let requests = requestIds.map((id) =>
        usersAPI.deleteItem(this.userToken, id)
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
    async updatePaginator(url) {
      this.isLoading = true
      try {
        const response = await usersAPI.updateList(url, this.userToken)
        this.usersList = await response.data
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    async updateUserPassword() {
      this.isLoading = true
      try {
        await usersAPI.updatePassword(
          this.userToken,
          this.currentUserForUpdate.id,
          this.newPasswordForm
        )
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    debouncedSearch: debounce(async function () {
      await this.loadData()
    }, 500),
    checkAllHandler(e) {
      if (e.target.checked) {
        this.usersList.results = this.usersList.results.map((user) => ({
          ...user,
          checked_val: true,
        }))
      } else {
        this.usersList.results = this.usersList.results.map((user) => ({
          ...user,
          checked_val: false,
        }))
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
    sortedUsersList() {
      return this.usersList.results
    },
    checkedForDeleteCount() {
      let counter = 0
      this.usersList.results.map((user) => {
        if (user.checked_val) {
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
