<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <span class="d-flex justify-content-around" slot="header">
          <h4 class="card-title align-self-center">
            Cryptocurrency in Worldwide
          </h4>
        </span>
        <span
          class="d-flex justify-content-end align-self-center"
          style="padding-right: 6rem"
        >
          <Button
            v-tooltip.top-center="'Add Data'"
            class="btn-warning btn-simple btn-link"
            @click="handleAdd(props)"
            >Add Data</Button
          >
        </span>
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
            <el-table-column :min-width="120" fixed="right" label="Actions">
              <template slot-scope="props">
                <a
                  v-tooltip.top-center="'Edit'"
                  class="btn-warning btn-simple btn-link"
                  @click="handleEdit(props.row)"
                  ><i class="fa fa-edit"></i
                ></a>
                <a
                  v-tooltip.top-center="'Delete'"
                  class="btn-danger btn-simple btn-link"
                  @click="handleDelete(props.row)"
                  ><i class="fa fa-times"></i
                ></a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </card>
    </div>

    <!-- Modal Edit Data -->
    <el-dialog title="Data Management" :visible.sync="dialogVisible">
      <el-form :model="formData">
        <el-form-item label="Symbol">
          <el-input v-model="formData.symbol"> </el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="Current Price">
          <el-input v-model="formData.current_price"></el-input>
        </el-form-item>
        <el-form-item label="Total Volume">
          <el-input v-model="formData.total_volume"></el-input>
        </el-form-item>
        <el-form-item label="Atl Change Percentage">
          <el-input v-model="formData.atl_change_percentage"></el-input>
        </el-form-item>
        <el-form-item label="Atl">
          <el-input v-model="formData.atl"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSave">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  Table,
  TableColumn,
  Dialog,
  Form,
  FormItem,
  Input,
  Button,
} from "element-ui";
import axios from "axios";
export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Button.name]: Button,
  },
  data() {
    return {
      cryptocurrency: [],
      dialogVisible: false,
      formData: {},
      currentIndex: null,
    };
  },
  created() {
    this.getCryptocurrency();
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true;
      this.formData = { ...this.cryptocurrency[index++] };
      // let index = this.cryptocurrency.findIndex(
      //   (element) => element.id == this.cryptocurrency.data.id
      // );
      // if (index == null) {
      //   this.dialogVisible = true;
      // }
    },
    handleEdit(data) {
      this.cryptocurrency.splice();
      // cari data berdasarkan index ke berapa
      // console.log(array1.findIndex(isLargeNumber));
      let index = this.cryptocurrency.findIndex(
        (element) => element.id == data.id
      );
      console.log(index);
      if (index !== -1) {
        this.currentIndex = index;
        this.formData = { ...this.cryptocurrency[index] };
        this.dialogVisible = true;
      }
      // this.cryptocurrency.slice(index, 1);
    },
    handleSave() {
      if (this.currentIndex !== null) {
        this.$set(this.cryptocurrency, this.currentIndex, this.formData);
        this.dialogVisible = false;
      }
    },
    handleDelete(data) {
      this.cryptocurrency.splice();
      // cari data berdasarkan index ke berapa
      // console.log(array1.findIndex(isLargeNumber));
      let index = this.cryptocurrency.findIndex(
        (element) => element.id == data.id
      );
      console.log(index);
      this.cryptocurrency.splice(index, 1);
    },
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
