<template>
  <h3>Последние загрузки</h3>

  <div class="row">
    <div class="col-xl-5 scaledHover transition">
      <div class="border rounded-3">
        <div class="border-bottom d-flex item-header">
          <div class="d-flex align-items-center m-3">
            <h5>Пользователи</h5>
          </div>
        </div>
        <div class="p-2" style="height: 120px">
          <table
            class="table table-borderless table-hover"
            v-if="sortedUsersList.length > 0"
          >
            <tbody class="align-middle">
              <tr v-for="user in sortedUsersList" :key="user.id">
                <td><img src="" alt="" /></td>
                <td>
                  <font-awesome-icon icon="fa-solid fa-user" />&nbsp;
                  {{ user.username }}
                </td>
                <td>
                  {{ getFormattedDateComponent(user.date_joined) }}
                  {{ getFormattedTimeComponent(user.date_joined) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="m-3">
          <p v-if="sortedUsersList.length > 0">
            <router-link to="/admin/users"> Показать все ></router-link>
          </p>
          <p v-else>
            <router-link to="/admin/users"> Создать ></router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-xl-7 scaledHover transition">
      <div class="border rounded-3">
        <div class="border-bottom d-flex item-header">
          <div class="d-flex align-items-center m-3">
            <h5>Подразделения</h5>
          </div>
        </div>
        <div class="p-2" style="height: 120px">
          <table
            class="table table-borderless table-hover"
            v-if="sortedSubdivisionsList.length > 0"
          >
            <tbody class="align-middle">
              <tr
                v-for="subdivision in sortedSubdivisionsList"
                :key="subdivision.id"
              >
                <td><img src="" alt="" /></td>
                <td>
                  <font-awesome-icon icon="fa-solid fa-users" />&nbsp;
                  {{ subdivision.subdivision_name }}
                </td>
                <td>
                  {{ getFormattedDateComponent(subdivision.date_time_created) }}
                  {{ getFormattedTimeComponent(subdivision.date_time_created) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="m-3">
          <p v-if="sortedSubdivisionsList.length > 0">
            <router-link to="/admin/subdivisions"> Показать все ></router-link>
          </p>
          <p v-else>
            <router-link to="/admin/subdivisions"> Создать ></router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div style="height: 20px"></div>
  <div class="row">
    <div class="col-xl-7 scaledHover transition" v-if="userData.is_superuser">
      <div class="border rounded-3">
        <div class="border-bottom d-flex item-header">
          <div class="d-flex align-items-center m-3">
            <h5>Категории</h5>
          </div>
        </div>
        <div class="p-2" style="height: 120px">
          <table
            class="table table-borderless table-hover"
            v-if="sortedCategoriesList.length > 0"
          >
            <tbody class="align-middle">
              <tr v-for="category in sortedCategoriesList" :key="category.id">
                <td><img src="" alt="" /></td>
                <td>
                  <font-awesome-icon icon="fa-solid fa-list" />&nbsp;
                  {{ category.category_item_name }}
                </td>
                <td>
                  {{ getFormattedDateComponent(category.date_time_created) }}
                  {{ getFormattedTimeComponent(category.date_time_created) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="m-3">
          <p v-if="sortedCategoriesList.length > 0">
            <router-link to="/admin/categories"> Показать все ></router-link>
          </p>
          <p v-else>
            <router-link to="/admin/categories"> Создать ></router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-xl-5 scaledHover transition">
      <div class="border rounded-3">
        <div class="border-bottom d-flex item-header">
          <div class="d-flex align-items-center m-3">
            <h5>Документы</h5>
          </div>
        </div>
        <div class="p-2" style="height: 120px">
          <table
            class="table table-borderless table-hover"
            v-if="sortedDocsList.length > 0"
          >
            <tbody class="align-middle">
              <tr v-for="doc in sortedDocsList" :key="doc.id">
                <td><img src="" alt="" /></td>
                <td>
                  <font-awesome-icon icon="fa-solid fa-file" />&nbsp;
                  {{ doc.file_name }}
                </td>
                <td>
                  {{ getFormattedDateComponent(doc.date_time_created) }}
                  {{ getFormattedTimeComponent(doc.date_time_created) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="m-3">
          <p v-if="sortedDocsList.length > 0">
            <router-link to="/admin/docs"> Показать все ></router-link>
          </p>
          <p v-else>
            <router-link to="/admin/docs"> Создать ></router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { subdivisionsAPI } from "@/api/subdivisionsAPI"
import { usersAPI } from "@/api/usersAPI"
import { categoriesAPI } from "@/api/categoriesAPI"
import { docsAPI } from "@/api/docsAPI"
import AdminNav from "@/components/admin/AdminNav"
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
import { getFormattedDate, getFormattedTime } from "@/utils"

export default {
  name: "Main",
  components: { AdminNav, Spinner },
  data() {
    return {
      latestSubdivisionsList: { results: [] },
      latestUsersList: { results: [] },
      latestCategoriesList: { results: [] },
      latestDocsList: { results: [] },
      isLoading: true,
      isError: false,
    }
  },
  async created() {
    try {
      let subdivisionsSearchForm = {
        subdivision_name: "",
        region: "",
      }
      if (!this.userData.is_superuser) {
        subdivisionsSearchForm = {
          ...subdivisionsSearchForm,
          region: this.userData.get_region,
        }
      }

      const responseSubdivisions = await subdivisionsAPI.getItemsList(
        this.userToken,
        subdivisionsSearchForm
      )
      this.latestSubdivisionsList = await responseSubdivisions.data

      let usersSearchForm = {
        username: "",
        last_name: "",
        subdivision: "",
        is_superuser: "",
        is_staff: "",
        is_active: "",
      }
      if (!this.userData.is_superuser) {
        usersSearchForm = {
          ...usersSearchForm,
          subdivision: this.userData.subdivision,
        }
      }
      const responseUsers = await usersAPI.getItemsList(
        this.userToken,
        usersSearchForm
      )
      this.latestUsersList = await responseUsers.data

      const responseCategories = await categoriesAPI.getItemsList(
        this.userToken
      )
      this.latestCategoriesList = await responseCategories.data

      let docsSearchForm = {
        file_name: "",
        category: "",
        region: "",
        user: "",
      }
      if (!this.userData.is_superuser) {
        docsSearchForm = { ...docsSearchForm, region: this.userData.get_region }
      }

      const responseDocs = await docsAPI.getItemsList(
        this.userToken,
        docsSearchForm
      )
      this.latestDocsList = await responseDocs.data
    } catch (e) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  },
  methods: {
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
      return this.latestSubdivisionsList.results.slice(0, 3)
    },
    sortedUsersList() {
      return this.latestUsersList.results.slice(0, 3)
    },
    sortedCategoriesList() {
      return this.latestCategoriesList.results.slice(0, 3)
    },
    sortedDocsList() {
      return this.latestDocsList.results.slice(0, 3)
    },
  },
}
</script>

<style scoped>
.scaledHover:hover {
  transform: scale(1.02);
}
.scaledHover {
  transform: scale(1);
}
.transition {
  transition: 1s;
}
.item-header {
  background-color: gray;
  opacity: 0.7;
  filter: blur(0.1px);
  color: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
