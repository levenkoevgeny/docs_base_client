<template>
  <h3>Последние загрузки</h3>
  <p class="text-700">Данные со всех подразделений</p>
  <table class="table table-borderless align-middle">
    <thead class="align-middle">
      <tr>
        <th scope="col">
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" />
          </div>
        </th>
        <th scope="col"></th>
        <th scope="col">Подразделение</th>
        <th scope="col">Название документа</th>
        <th scope="col">Дата и время загрузки</th>
        <th scope="col">Описание документа</th>
      </tr>
    </thead>
    <tbody class="align-middle">
      <tr>
        <th scope="row">
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" />
          </div>
        </th>
        <td><img src="" alt="" /></td>
        <td>
          <div class="d-flex">
            <div class="text-center">
              <img src="" class="rounded" alt="..." />
            </div>
            <div>Подразделение 1</div>
          </div>
        </td>
        <td><a href="">Документ о ....</a></td>
        <td>03.04.2023г.</td>
        <td>Лучший документ ....</td>
      </tr>
      <tr>
        <th scope="row">
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" />
          </div>
        </th>
        <td><img src="" alt="" /></td>
        <td>
          <div class="d-flex">
            <div class="text-center">
              <img src="" class="rounded" alt="..." />
            </div>
            <div>Подразделение 1</div>
          </div>
        </td>
        <td><a href="">Документ о ....</a></td>
        <td>03.04.2023г.</td>
        <td>Лучший документ ....</td>
      </tr>
      <tr>
        <th scope="row">
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" />
          </div>
        </th>
        <td><img src="" alt="" /></td>
        <td>
          <div class="d-flex">
            <div class="text-center">
              <img src="" class="rounded" alt="..." />
            </div>
            <div>Подразделение 1</div>
          </div>
        </td>
        <td><a href="">Документ о ....</a></td>
        <td>03.04.2023г.</td>
        <td>Лучший документ ....</td>
      </tr>
      <tr>
        <th scope="row">
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" />
          </div>
        </th>
        <td><img src="" alt="" /></td>
        <td>
          <div class="d-flex">
            <div class="text-center">
              <img src="" class="rounded" alt="..." />
            </div>
            <div>Подразделение 1</div>
          </div>
        </td>
        <td><a href="">Документ о ....</a></td>
        <td>03.04.2023г.</td>
        <td>Лучший документ ....</td>
      </tr>
      <tr>
        <th scope="row">
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" />
          </div>
        </th>
        <td><img src="" alt="" /></td>
        <td>
          <div class="d-flex">
            <div class="text-center">
              <img src="" class="rounded" alt="..." />
            </div>
            <div>Подразделение 1</div>
          </div>
        </td>
        <td><a href="">Документ о ....</a></td>
        <td>03.04.2023г.</td>
        <td>Лучший документ ....</td>
      </tr>
      <tr>
        <th scope="row">
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" />
          </div>
        </th>
        <td><img src="" alt="" /></td>
        <td>
          <div class="d-flex">
            <div class="text-center">
              <img src="" class="rounded" alt="..." />
            </div>
            <div>Подразделение 1</div>
          </div>
        </td>
        <td><a href="">Документ о ....</a></td>
        <td>03.04.2023г.</td>
        <td>Лучший документ ....</td>
      </tr>
    </tbody>
  </table>
  <p>
    5 из 150 документов
    <router-link to="/admin/docs"> Показать все ></router-link>
  </p>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav"
import Spinner from "@/components/common/Spinner"

export default {
  name: "Main",
  components: { AdminNav, Spinner },
  data() {
    return {
      lastDocsList: [],
      isLoading: true,
      isError: false,
    }
  },
}
</script>

<style scoped></style>
