<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <div slot="header">
          <h4 class="card-title">University in US</h4>
        </div>
        <div class="table-responsive table-full-width">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>

          <p class="mt-3">Current Page: {{ currentPage }}</p>

          <b-table
            id="my-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            small
          ></b-table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
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
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
};
</script>
<style></style>
