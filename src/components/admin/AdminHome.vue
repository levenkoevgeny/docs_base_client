<template>
  <AdminNav />
  <div class="container-fluid">
    <div class="d-flex">
      <div style="width: 300px" class="mt-3">
        <div>
          <h5>
            <router-link
              to="/admin"
              class="link-secondary"
              style="text-decoration: none"
            >
              Администрирование</router-link
            >
          </h5>
        </div>
        <ul class="list-group">
          <li class="list-group-item border-0" v-if="userData.is_superuser">
            <router-link
              to="/admin/subdivisions"
              class="link-secondary"
              style="text-decoration: none"
              ><font-awesome-icon icon="fa-solid fa-users" />&nbsp;
              Подразделения</router-link
            >
          </li>

          <li class="list-group-item border-0">
            <router-link
              to="/admin/users"
              class="link-secondary"
              style="text-decoration: none"
              ><font-awesome-icon icon="fa-solid fa-user" />&nbsp;
              Пользователи</router-link
            >
          </li>
          <li class="list-group-item border-0" v-if="userData.is_superuser">
            <router-link
              to="/admin/categories"
              class="link-secondary"
              style="text-decoration: none"
              ><font-awesome-icon icon="fa-solid fa-list" />&nbsp;
              Категории</router-link
            >
          </li>
          <li class="list-group-item border-0">
            <router-link
              to="/admin/docs"
              class="link-secondary"
              style="text-decoration: none"
              ><font-awesome-icon icon="fa-solid fa-file" />&nbsp;
              Документы</router-link
            >
          </li>
        </ul>
        <!--        <div class="mt-3"><h5>Разделы</h5></div>-->
        <!--        <ul class="list-group">-->
        <!--          <li class="list-group-item border-0">-->
        <!--            <a href="" class="link-secondary" style="text-decoration: none"-->
        <!--              >Раздел 1</a-->
        <!--            >-->
        <!--            <ul class="list-group">-->
        <!--              <li class="list-group-item border-0">-->
        <!--                <a href="" class="link-secondary" style="text-decoration: none"-->
        <!--                  >Подраздел 1</a-->
        <!--                >-->
        <!--              </li>-->
        <!--              <li class="list-group-item border-0">-->
        <!--                <a href="" class="link-secondary" style="text-decoration: none"-->
        <!--                  >Подраздел 2</a-->
        <!--                >-->
        <!--              </li>-->
        <!--              <li class="list-group-item border-0">-->
        <!--                <a href="" class="link-secondary" style="text-decoration: none"-->
        <!--                  >Подраздел 3</a-->
        <!--                >-->
        <!--              </li>-->
        <!--            </ul>-->
        <!--          </li>-->
        <!--          <li class="list-group-item border-0">-->
        <!--            <a href="" class="link-secondary" style="text-decoration: none"-->
        <!--              >Раздел 2</a-->
        <!--            >-->
        <!--            <ul class="list-group">-->
        <!--              <li class="list-group-item border-0">-->
        <!--                <a href="" class="link-secondary" style="text-decoration: none"-->
        <!--                  >Подраздел 1</a-->
        <!--                >-->
        <!--              </li>-->
        <!--              <li class="list-group-item border-0">-->
        <!--                <a href="" class="link-secondary" style="text-decoration: none"-->
        <!--                  >Подраздел 2</a-->
        <!--                >-->
        <!--              </li>-->
        <!--              <li class="list-group-item border-0">-->
        <!--                <a href="" class="link-secondary" style="text-decoration: none"-->
        <!--                  >Подраздел 3</a-->
        <!--                >-->
        <!--              </li>-->
        <!--            </ul>-->
        <!--          </li>-->
        <!--        </ul>-->
      </div>
      <div class="px-3 pt-4" style="width: 100%">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav"
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
export default {
  name: "AdminHome",
  components: { AdminNav, Spinner },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken",
    }),
  },
}
</script>

<style scoped></style>
