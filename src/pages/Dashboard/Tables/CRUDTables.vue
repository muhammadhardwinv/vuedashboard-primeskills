<template>
  <auth-layout pageClass="login-page">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-lg-4 col-md-6 col-sm-8">
        <ValidationObserver v-slot="{ handleSubmit }">
          <!--You can specify transitions on initial render. The `card-hidden` class will be present initially and then it will be removed-->
          <form @submit.prevent="handleSubmit(submit)">
            <fade-render-transition>
              <card>
                <div slot="header">
                  <h3 class="card-title text-center">Masuk</h3>
                </div>
                <div>
                  <ValidationProvider
                    name="name"
                    rules="required|name"
                    v-slot="{ passed, failed }"
                  >
                    <fg-input
                      type="name"
                      :error="failed ? 'The name field is required' : null"
                      :hasSuccess="passed"
                      label="itemName"
                      name="name"
                      v-model="name"
                    >
                    </fg-input>
                  </ValidationProvider>
                  <ValidationProvider
                    name="quantity"
                    rules="required|min:1"
                    v-slot="{ passed, failed }"
                  >
                    <fg-input
                      type="quantity"
                      :error="failed ? 'The quantity field is required' : null"
                      :hasSuccess="passed"
                      name="quantity"
                      label="quantity"
                      v-model="quantity"
                    >
                    </fg-input>
                  </ValidationProvider>
                  <ValidationProvider
                    name="category"
                    rules="required|category"
                    v-slot="{ passed, failed }"
                  >
                    <fg-input
                      type="category"
                      :error="failed ? 'The category field is required' : null"
                      :hasSuccess="passed"
                      label="category"
                      name="category"
                      v-model="category"
                    >
                    </fg-input>
                  </ValidationProvider>
                </div>
                <div class="text-center">
                  <button
                    @click="onCreate"
                    type="submit"
                    class="btn btn-fill btn-info btn-round btn-wd"
                  >
                    Submit
                  </button>
                  <br />
                </div>
              </card>
            </fade-render-transition>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </auth-layout>
</template>
<script>
import { FadeRenderTransition } from "src/components/index";
import AuthLayout from "./AuthLayout.vue";
import { extend } from "vee-validate";
import { required, name, min } from "vee-validate/dist/rules";
import axios from "axios";

extend("name", name);
extend("quantity", quantity);
extend("category", category);
extend("required", required);
extend("min", min);

export default {
  components: {
    FadeRenderTransition,
    AuthLayout,
  },
  data() {
    return {
      name: "",
      quantity: "",
    };
  },
  methods: {
    submit() {
      alert("Item successfully added.");
    },
    // onCreate() {
    //   const response = axios
    //     .post("https://api-lightspace.primeskills.id/api/auth/login", {
    //       name: this.name,
    //       quantity: this.quantity,
    //     })
    //     .then((response) => {
    //       this.$router.push({ name: "adminDashboard" });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    onCreate() {
      console.log("Item successfully added.");
    },
    toggleNavbar() {
      document.body.classList.toggle("nav-open");
    },
    closeMenu() {
      document.body.classList.remove("nav-open");
      document.body.classList.remove("off-canvas-sidebar");
    },
  },
  beforeDestroy() {
    this.closeMenu();
  },
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
</style>
