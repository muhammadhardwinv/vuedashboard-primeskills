<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <side-bar>
      <user-menu></user-menu>
      <mobile-menu></mobile-menu>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'nc-icon nc-chart-pie-35',
            path: '/admin/overview',
          }"
        >
        </sidebar-item>
        <sidebar-item :link="{ name: 'Management', icon: 'nc-icon nc-app' }">
          <sidebar-item
            :link="{ name: 'Login Page', path: '/login' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Register', path: '/register' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'User Page', path: '/pages/user' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Lock Screen Page', path: '/lock' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: 'Menu', icon: 'nc-icon nc-paper-2' }">
          <sidebar-item
            :link="{ name: 'University', path: '/table-list/university' }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: 'Cryptocurrency',
              path: '/table-list/cryptocurrency',
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: 'Browser Extensions',
              path: '/table-list/browserextensions',
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: 'API List',
              path: '/table-list/apiList',
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: 'pagination',
              path: '/table-list/pagination',
            }"
          ></sidebar-item>
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
import UserMenu from "./Extra/UserMenu.vue";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
    UserMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    initScrollbar() {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar("main-panel");

        docClasses.add("perfect-scrollbar-on");
      } else {
        docClasses.add("perfect-scrollbar-off");
      }
    },
  },
  mounted() {
    this.initScrollbar();
  },
};
</script>
