import axios from "axios"
import { authHeaders } from "@/api/authAPI"

let base_url = "docs-client"

export const docsAPIClient = {
  async getItemsList(
    token,
    searchForm = { file_name: "", category: "", region: "", user: "" }
  ) {
    let { file_name = "", category = "", region = "", user = "" } = searchForm
    return axios.get(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/${base_url}/?file_name__icontains=${file_name}&category=${category}&region=${region}&user=${user}`,
      authHeaders(token)
    )
  },
  async updateList(url, token) {
    return axios.get(url, authHeaders(token))
  },
}
