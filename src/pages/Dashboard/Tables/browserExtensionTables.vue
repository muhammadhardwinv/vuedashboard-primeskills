<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <div slot="header">
          <h4 class="card-title">Browser Extension</h4>
        </div>
        <div class="table-responsive table-full-width">
          <el-table class="table-striped" :data="browserExtension">
            <el-table-column label="id" property="id"></el-table-column>
            <el-table-column label="name" property="name"></el-table-column>
            <el-table-column
              label="description"
              property="description"
            ></el-table-column>
            <el-table-column
              label="licenseId"
              property="licenseId"
            ></el-table-column>
            <el-table-column
              label="syntaxIds"
              property="syntaxIds"
            ></el-table-column>
            <el-table-column
              label="tagIds"
              property="syntaxIds"
            ></el-table-column>
            <el-table-column
              label="languageIds"
              property="languageIds"
            ></el-table-column>
          </el-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import axios from "axios";
export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      browserExtension: [],
    };
  },
  created() {
    this.getBrowserExtension();
  },
  methods: {
    getBrowserExtension() {
      const response = axios
        .get("https://filterlists.com/api/directory/lists", {})
        .then((response) => {
          console.log(response.data);
          this.browserExtension = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    tableRowClassName(row, index) {
      if (index === 0) {
        return "success";
      } else if (index === 2) {
        return "info";
      } else if (index === 4) {
        return "danger";
      } else if (index === 6) {
        return "warning";
      }
      return "";
    },
  },
};
</script>
<style></style>
