<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <div slot="header">
          <h4 class="card-title">Cryptocurrency in Worldwide</h4>
        </div>
        <div class="table-responsive table-full-width">
          <el-table class="table-striped" :data="cryptocurrency">
            <el-table-column label="symbol" property="symbol"></el-table-column>
            <el-table-column label="name" property="name"></el-table-column>
            <el-table-column
              label="current_price"
              property="current_price"
            ></el-table-column>
            <el-table-column
              label="total_volume"
              property="total_volume"
            ></el-table-column>
            <el-table-column
              label="atl_change_percentage"
              property="atl_change_percentage"
            ></el-table-column>
            <el-table-column label="atl" property="atl"></el-table-column>
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
      cryptocurrency: [],
    };
  },
  created() {
    this.getCryptocurrency();
  },
  methods: {
    getCryptocurrency() {
      const response = axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
          {}
        )
        .then((response) => {
          console.log(response.data);
          this.cryptocurrency = response.data;
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
