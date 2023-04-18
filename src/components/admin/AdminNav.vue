<template>
  <nav class="navbar navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <font-awesome-icon icon="fa-solid fa-book" /> Система учета документов
      </a>
      <div class="btn-group dropstart">
        <div
          class="btn btn-secondary bg-primary border-0"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          v-if="userData.last_name"
        >
          <font-awesome-icon icon="fa-solid fa-user" />&nbsp;
          {{ userData.last_name }}
        </div>
        <div
          class="btn btn-secondary bg-primary border-0"
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
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "AdminNav",
  methods: {
    logOut() {
      this.$store.dispatch("auth/actionRemoveLogIn")
      this.$router.push({ name: "login", replace: true })
    },
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
    }),
  },
}
</script>

<style scoped></style>
