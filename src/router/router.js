import { createRouter, createWebHistory } from "vue-router"

import NotFoundView from "@/components/NotFoundView"
import CategoriesList from "@/components/admin/CategoriesList"
import UsersList from "@/components/admin/UsersList"
import SubdivisionsList from "@/components/admin/SubdivisionsList"
import DocsList from "@/components/admin/DocsList"
import LoginView from "@/components/auth/LoginView"

import store from "@/store"

const routes = [
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/admin",
    name: "admin",
    redirect: "/admin/users",
  },
  {
    path: "/admin/categories",
    name: "categories",
    component: CategoriesList,
    // children: [
    //   {
    //     path: "",
    //     name: "queue_appointments_home",
    //     component: AppointmentListHome,
    //   },
    //   {
    //     path: ":id",
    //     name: "queue_appointments",
    //     component: AppointmentsList,
    //   },
    // ],

    meta: { requiresAuth: true },
  },
  {
    path: "/admin/users",
    name: "users",
    component: UsersList,
  },
  {
    path: "/admin/docs",
    name: "docs",
    component: DocsList,
  },
  {
    path: "/admin/subdivisions",
    name: "subdivisions",
    component: SubdivisionsList,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
})

router.beforeEach(async (to, from) => {
  await store.dispatch("auth/actionCheckLoggedIn")
  const isLoggedIn = true
  // const isLoggedIn = store.getters["auth/getIsLoggedIn"]

  if (to.meta.requiresAuth && !isLoggedIn) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    }
  }
})

export default router
