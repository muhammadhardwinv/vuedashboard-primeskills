<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title">Cryptocurrency Lists</h4>
    </div>

    <div class="col-12">
      <card title="Cryptocurrency">
        <div>
          <div
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <el-select
              class="select-default mb-3"
              style="width: 200px"
              v-model="pagination.perPage"
              placeholder="Per page"
            >
              <el-option
                class="select-default"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-input
              type="search"
              class="mb-3"
              style="width: 200px"
              placeholder="Search records"
              v-model="searchQuery"
              aria-controls="datatables"
            />
          </div>
          <div class="col-sm-12">
            <el-table stripe style="width: 100%" :data="cryptocurrency" border>
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
              >
              </el-table-column>
              <el-table-column :min-width="120" fixed="right" label="Actions">
                <template slot-scope="props">
                  <a
                    v-tooltip.top-center="'Like'"
                    class="btn-info btn-simple btn-link"
                    @click="handleLike(props.$index, props.row)"
                  >
                    <i class="fa fa-heart"></i
                  ></a>
                  <a
                    v-tooltip.top-center="'Edit'"
                    class="btn-warning btn-simple btn-link"
                    @click="handleEdit(props.$index, props.row)"
                    ><i class="fa fa-edit"></i
                  ></a>
                  <a
                    v-tooltip.top-center="'Delete'"
                    class="btn-danger btn-simple btn-link"
                    @click="handleDelete(props.$index, props.row)"
                    ><i class="fa fa-times"></i
                  ></a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div
          slot="footer"
          class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
        >
          <div class="">
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <l-pagination
            class="pagination-no-border"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="pagination.total"
          >
          </l-pagination>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import { Pagination as LPagination } from "src/components/index";
import users from "./users";
import Fuse from "fuse.js";
import axios from "axios";

export default {
  components: {
    LPagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      cryptocurrency: [],
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: [
        "symbol",
        "name",
        "current_price",
        "total_volume",
        "atl_change_percentage",
      ],
      tableColumns: [
        {
          prop: "symbol",
          label: "symbol",
          minWidth: 200,
        },
        {
          prop: "name",
          label: "name",
          minWidth: 200,
        },
        {
          prop: "current_price",
          label: "current_price",
          minWidth: 50,
        },
        {
          prop: "total_volume",
          label: "total_volume",
          minWidth: 75,
        },
        {
          prop: "atl_change_percentage",
          label: "atl_change_percentage",
          minWidth: 120,
        },
      ],
      tableData: users,
      fuseSearch: null,
    };
  },
  created() {
    this.getCryptocurrency();
  },
  computed: {
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
    /***
     * Searches through table data and returns a paginated array.
     * Note that this should not be used for table with a lot of data as it might be slow!
     * Do the search and the pagination on the server and display the data retrieved from server instead.
     * @returns {computed.pagedData}
     */
    queriedData() {
      let result = this.tableData;
      if (this.searchQuery !== "") {
        result = this.fuseSearch.search(this.searchQuery);
        this.paginationTotal(result.length);
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      this.paginationTotal(this.tableData.length);
      return this.cryptocurrency.length;
    },
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
    handleLike(index, row) {
      alert(`Your want to like ${row.name}`);
    },
    handleEdit(index, row) {
      alert(`Your want to edit ${row.name}`);
    },
    handleDelete(index, row) {
      let indexToDelete = this.tableData.findIndex(
        (tableRow) => tableRow.id === row.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },
    paginationTotal(value) {
      this.pagination.total = value;
    },
  },
  mounted() {
    this.fuseSearch = new Fuse(this.tableData, { keys: ["name", "email"] });
  },
};
</script>
<style></style>
