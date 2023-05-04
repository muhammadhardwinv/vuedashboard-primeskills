  <template>
    <div class="row">
      <div class="col-md-12">
        <card>
          <div slot="header">
            <h4 class="card-title">University in US</h4>
          </div>
          <div class="table-responsive table-full-width">
            <el-table class="table-striped" :data="university">
              <el-table-column
                label="domains"
                property="domains"
              ></el-table-column>
              <el-table-column
                label="Country"
                property="country"
              ></el-table-column>
              <el-table-column
                label="alpha_two_code"
                property="alpha_two_code"
              ></el-table-column>
              <el-table-column
                label="state-provinces"
                property="state-provinces"
              ></el-table-column>
              <el-table-column
                label="web_pages"
                property="web_pages"
              ></el-table-column>
              <el-table-column label="name" property="name"></el-table-column>
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
        university: [],
      };
    },
    created() {
      this.getUniversity();
    },
    methods: {
      getUniversity() {
        const response = axios
          .get(
            "http://universities.hipolabs.com/search?country=United+States",
            {}
          )
          .then((response) => {
            console.log(response.data);
            this.university = response.data;
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
