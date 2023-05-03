<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <div slot="header">
          <h4 class="card-title">Carbon Intensity in UK</h4>
        </div>
        <div class="table-responsive table-full-width">
          <el-table class="table-striped" :data="carbonintensity">
            <el-table-column label="from" property="from"></el-table-column>
            <el-table-column label="to" property="to"></el-table-column>
            <el-table-column
              label="forecast"
              property="forecast"
            ></el-table-column>
            <el-table-column label="actual" property="actual"></el-table-column>
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
      carbonintensity: [],
    };
  },
  created() {
    this.getCarbonIntensity();
  },
  methods: {
    getCarbonIntensity() {
      const response = axios
        .get("https://api.carbonintensity.org.uk/intensity/date", {})
        .then((response) => {
          console.log(response.data);
          this.carbonintensity = response.data;
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
