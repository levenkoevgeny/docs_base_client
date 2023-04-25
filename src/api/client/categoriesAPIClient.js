import axios from "axios"
import { authHeaders } from "@/api/authAPI"

let base_url = "categories-client"

export const categoriesAPIClient = {
  async getItemsList(
    token,
    searchForm = {
      category_item_name: "",
      parent_category: "",
      parent_category_isnull: "",
    }
  ) {
    let { category_item_name, parent_category, parent_category_isnull } =
      searchForm
    return axios.get(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/${base_url}/?category_item_name__icontains=${category_item_name}&parent_category=${parent_category}&parent_category__isnull=${parent_category_isnull}`,
      authHeaders(token)
    )
  },
}
