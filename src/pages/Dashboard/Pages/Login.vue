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
                    name="email"
                    rules="required|email"
                    v-slot="{ passed, failed }"
                  >
                    <fg-input
                      type="email"
                      :error="failed ? 'The Email field is required' : null"
                      :hasSuccess="passed"
                      label="Email address"
                      name="email"
                      v-model="email"
                    >
                    </fg-input>
                  </ValidationProvider>
                  <ValidationProvider
                    name="password"
                    rules="required|min:5"
                    v-slot="{ passed, failed }"
                  >
                    <fg-input
                      type="password"
                      :error="failed ? 'The Password field is required' : null"
                      :hasSuccess="passed"
                      name="password"
                      label="Password"
                      v-model="password"
                    >
                    </fg-input>
                  </ValidationProvider>
                </div>
                <div class="text-center">
                  <button
                    @click="onLogin"
                    type="submit"
                    class="btn btn-fill btn-info btn-round btn-wd"
                  >
                    Login
                  </button>
                  <br />
                  <div class="forgot">
                    <router-link to="/register" class="card-category">
                      Forgot your password?
                    </router-link>
                  </div>
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
import {
  Checkbox as LCheckbox,
  FadeRenderTransition,
} from "src/components/index";
import AuthLayout from "./AuthLayout.vue";
import { extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";
import axios from "axios";

extend("email", email);
extend("required", required);
extend("min", min);

export default {
  components: {
    FadeRenderTransition,
    AuthLayout,
  },
  data() {
    return {
      email: "",
      password: "",
      subscribe: true,
    };
  },
  // created() {
  //   this.token = JSON.parse(localStorage.getItem("token")) || [];
  // },

  methods: {
    getData() {
      const userData = JSON.parse(localStorage.getItem("data"));
    },
    submit() {
      alert("Form has been submitted!");
    },
    onLogin() {
      const response = axios
        .post("https://api-lightspace.primeskills.id/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // window.alert("Login Success");
          this.$router.push({ name: "adminDashboard" });
          // localStorage.setItem(response.data.token);
          // console.log(response.data.data.token);
          this.data = response.data.data.token;
          localStorage.setItem("token", response.data.data.token);
        })
        .catch((error) => {
          console.log(error);
          window.alert("Login Failed");
        });
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
