import { createRouter, createWebHistory } from "vue-router"

import NotFoundView from "@/components/common/NotFoundView"
import CategoriesList from "@/components/admin/CategoriesList"
import UsersList from "@/components/admin/UsersList"
import SubdivisionsList from "@/components/admin/SubdivisionsList"
import DocsList from "@/components/admin/DocsList"
import LoginView from "@/components/auth/LoginView"
import Main from "@/components/admin/Main"
import AdminHome from "@/components/admin/AdminHome"
import ClientMain from "@/components/client/ClientMain"

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
    path: "",
    name: "client-main",
    component: ClientMain,
    meta: { requiresAuth: false },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminHome,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "admin-main",
        component: Main,
      },
      {
        path: "users",
        name: "admin-users",
        component: UsersList,
      },
      {
        path: "docs",
        name: "admin-docs",
        component: DocsList,
      },
      {
        path: "subdivisions",
        name: "admin-subdivisions",
        component: SubdivisionsList,
      },
      {
        path: "categories",
        name: "admin-categories",
        component: CategoriesList,
      },
    ],
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
