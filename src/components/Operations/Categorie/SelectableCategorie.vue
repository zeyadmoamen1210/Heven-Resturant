<template>
  <div class="categorie category-component">
    <div class="img-circle">
      <img
        v-if="categorie.image"
        class="show-category-image"
        :src="$store.state.url + categorie.image"
        alt=""
      />
    </div>
    <h6>{{ categorie.name }}</h6>

    <div class="edit-delete mt-2">
      <slot name="edit-delete">
        <!-- <button
          class="btn emp-dept-update"
          @click="handleUpdateEmployeeDept(dept)"
        >
          <i class="el-icon-edit"></i>
        </button>

        <button
          class="btn emp-dept-delete"
          @click="handleDeleteEmployeeDept(dept)"
        >
          <i class="el-icon-delete-solid"></i>
        </button> -->
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categorie"],
};
</script>

<style lang="scss">
.img-circle {
  width: 48px;
  height: 48px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: auto;
  img {
    width: 28px;
    height: 28px;
  }
}
.categorie.category-component {
  font-family: "din";
  padding-top: 7px;
  background: #ebf9fc;
  color: #333;
  border-radius: 8px;
  padding-bottom: 10px;
  transition: all 0.5s ease;
  cursor: pointer;
  text-align: center;
  h6 {
    margin-bottom: 0;
    font-size: 13px;
    margin-top: 12px;
  }
  .show-category-image {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: auto;
    text-align: center;
  }

  .edit-delete {
    .edit-delete {
      margin-right: 16px;
      margin-top: 1px;
      button {
        padding: 4px 10px;
        margin: 2px;
      }
    }

    .emp-dept-delete {
      margin-right: 5px;
      color: var(--bs-danger);
      background: #ebf9fc;
      padding: 3px 6px 0;
      cursor: pointer;

      outline: none !important;
    }

    .emp-dept-update {
      background: #ebf9fc !important;
      color: #fff;
      padding: 3px 6px 0;
      cursor: pointer;
      color: #333;
      box-shadow: none;
      outline: none !important;
    }
  }
}
</style>
