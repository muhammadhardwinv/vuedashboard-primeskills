<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <div slot="header">
          <h4 class="card-title">List of Public API</h4>
        </div>
        <div class="table-responsive table-full-width">
          <el-table class="table-striped" :data="apiList">
            <el-table-column
              label="entries"
              propperty="entries"
            ></el-table-column>
            <el-table-column label="API" property="API"></el-table-column>
            <el-table-column
              label="Description"
              property="Description"
            ></el-table-column>
            <el-table-column
              label="Category"
              property="Category"
            ></el-table-column>
            <el-table-column label="Auth" property="Auth"></el-table-column>
            <el-table-column label="HTTPS" property="HTTPS"></el-table-column>
            <el-table-column label="Cors" property="Cors"></el-table-column>
            <el-table-column label="Link" property="Link"></el-table-column>
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
      apiList: [],
    };
  },
  created() {
    this.getAPIList();
  },
  methods: {
    getAPIList() {
      const response = axios
        .get("https://api.publicapis.org/entries", {})
        .then((response) => {
          console.log(response.data.entries);
          this.apiList = response.data.entries;
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
