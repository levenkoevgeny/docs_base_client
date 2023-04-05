<template>
  <div class="container-fluid">
    <div>
      <h3>Пользователи</h3>
      <small>Все ({{ usersList.length }})</small>
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
        <div v-if="usersList.length > 0">
          <table class="table table-borderless align-middle">
            <thead class="align-middle">
              <tr>
                <th scope="col">
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" />
                  </div>
                </th>
                <th scope="col">Picture</th>
                <th scope="col">Username</th>
                <th scope="col">Фамилия</th>
                <th scope="col">Имя</th>
                <th scope="col">Администратор</th>
                <th scope="col">Активный</th>
                <th scope="col">Дата создания</th>
              </tr>
            </thead>
            <tbody class="align-middle">
              <tr v-for="user in usersList" :key="user.id">
                <td>
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" />
                  </div>
                </td>
                <td><img src="" alt="" /></td>
                <td>
                  {{ user.username }}
                </td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.is_superuser }}</td>
                <td>{{ user.is_active }}</td>
                <td>{{ user.date_joined }}</td>
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
import { usersAPI } from "@/api/usersAPI"
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
export default {
  name: "UsersList",
  components: { Spinner },
  data() {
    return {
      usersList: [],
      // newDocForm: {
      //   category: "",
      //   file_name: "",
      //   description: "",
      //   doc_date: "",
      // },
      // categoriesList: [],
      isLoading: true,
      isError: false,
    }
  },
  async created() {
    try {
      const response = await usersAPI.getItemsList(this.userToken)
      this.usersList = await response.data.results
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
      return this.docsList
    },
  },
  watch: {},
}
</script>

<style scoped></style>
