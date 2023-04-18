import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router/router"
import store from "@/store"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faFileExport } from "@fortawesome/free-solid-svg-icons"
import { faBook } from "@fortawesome/free-solid-svg-icons"
import { faList } from "@fortawesome/free-solid-svg-icons"
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faUserAlt } from "@fortawesome/free-solid-svg-icons"
import { faKey } from "@fortawesome/free-solid-svg-icons"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { faUnlock } from "@fortawesome/free-solid-svg-icons"

library.add(faUsers)
library.add(faUser)
library.add(faFile)
library.add(faPlus)
library.add(faFileExport)
library.add(faBook)
library.add(faList)
library.add(faArrowRightToBracket)
library.add(faCheck)
library.add(faUserAlt)
library.add(faKey)
library.add(faLock)
library.add(faUnlock)

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount("#app")
