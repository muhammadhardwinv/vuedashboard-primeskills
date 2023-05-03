import DashboardLayout from "src/pages/Dashboard/Layout/DashboardLayout.vue";
// GeneralViews
import NotFound from "src/pages/GeneralViews/NotFoundPage.vue";
// Dashboard pages
import Overview from "src/pages/Dashboard/Dashboard/Overview.vue";
import Stats from "src/pages/Dashboard/Dashboard/Stats.vue";

// Pages
import User from "src/pages/Dashboard/Pages/UserProfile.vue";
import TimeLine from "src/pages/Dashboard/Pages/TimeLinePage.vue";
import Login from "src/pages/Dashboard/Pages/Login.vue";
import Register from "src/pages/Dashboard/Pages/Register.vue";
import Lock from "src/pages/Dashboard/Pages/Lock.vue";

// Components pages
import Buttons from "src/pages/Dashboard/Components/Buttons.vue";
import GridSystem from "src/pages/Dashboard/Components/GridSystem.vue";
import Panels from "src/pages/Dashboard/Components/Panels.vue";
const SweetAlert = () =>
  import("src/pages/Dashboard/Components/SweetAlert.vue");
import Notifications from "src/pages/Dashboard/Components/Notifications.vue";
import Icons from "src/pages/Dashboard/Components/Icons.vue";
import Typography from "src/pages/Dashboard/Components/Typography.vue";

// Forms pages
const RegularForms = () => import("src/pages/Dashboard/Forms/RegularForms.vue");
const ExtendedForms = () =>
  import("src/pages/Dashboard/Forms/ExtendedForms.vue");
const ValidationForms = () =>
  import("src/pages/Dashboard/Forms/ValidationForms.vue");
const Wizard = () => import("src/pages/Dashboard/Forms/Wizard.vue");

// TableList pages
const UniversityTables = () =>
  import("src/pages/Dashboard/Tables/universityTables.vue");
const CryptocurrencyTables = () =>
  import("src/pages/Dashboard/Tables/cryptocurrencyTables.vue");
const BrowserExtensionTables = () =>
  import("src/pages/Dashboard/Tables/browserExtensionTables.vue");
const CarbonIntensityTables = () =>
  import("src/pages/Dashboard/Tables/carbonIntensity.vue");

// Maps pages
const GoogleMaps = () => import("src/pages/Dashboard/Maps/GoogleMaps.vue");
const FullScreenMap = () =>
  import("src/pages/Dashboard/Maps/FullScreenMap.vue");
const VectorMaps = () => import("src/pages/Dashboard/Maps/VectorMapsPage.vue");

// Calendar
const Calendar = () => import("src/pages/Dashboard/Calendar/CalendarRoute.vue");
// Charts
const Charts = () => import("src/pages/Dashboard/Charts.vue");

let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/buttons",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      component: Buttons,
    },
    {
      path: "grid-system",
      name: "Grid System",
      component: GridSystem,
    },
    {
      path: "panels",
      name: "Panels",
      component: Panels,
    },
    {
      path: "sweet-alert",
      name: "Sweet Alert",
      component: SweetAlert,
    },
    {
      path: "notifications",
      name: "Notifications",
      component: Notifications,
    },
    {
      path: "icons",
      name: "Icons",
      component: Icons,
    },
    {
      path: "typography",
      name: "Typography",
      component: Typography,
    },
  ],
};
let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/regular",
  children: [
    {
      path: "regular",
      name: "Regular Forms",
      component: RegularForms,
    },
    {
      path: "extended",
      name: "Extended Forms",
      component: ExtendedForms,
    },
    {
      path: "validation",
      name: "Validation Forms",
      component: ValidationForms,
    },
    {
      path: "wizard",
      name: "Wizard",
      component: Wizard,
    },
  ],
};

let tablesMenu = {
  path: "/table-list",
  component: DashboardLayout,
  redirect: "/table-list/university",
  children: [
    {
      path: "university",
      name: "University Table",
      component: UniversityTables,
    },
    {
      path: "cryptocurrency",
      name: "Cryptocurrency Tables",
      component: CryptocurrencyTables,
    },
    {
      path: "browserextensions",
      name: "Browser Extension Tables",
      component: BrowserExtensionTables,
    },
    {
      path: "carbonintensity",
      name: "Carbon Intensity Tables",
      component: CarbonIntensityTables,
    },
  ],
};

let mapsMenu = {
  path: "/maps",
  component: DashboardLayout,
  redirect: "/maps/google",
  children: [
    {
      path: "google",
      name: "Google Maps",
      component: GoogleMaps,
    },
    {
      path: "full-screen",
      name: "Full Screen Map",
      component: FullScreenMap,
    },
    {
      path: "vector-map",
      name: "Vector Map",
      component: VectorMaps,
    },
  ],
};

let pagesMenu = {
  path: "/pages",
  component: DashboardLayout,
  redirect: "/pages/user",
  children: [
    {
      path: "user",
      name: "User Page",
      component: User,
    },
    {
      path: "timeline",
      name: "Timeline Page",
      component: TimeLine,
    },
  ],
};

let loginPage = {
  path: "/login",
  name: "Login",
  component: Login,
};

let registerPage = {
  path: "/register",
  name: "Register",
  component: Register,
};

let lockPage = {
  path: "/lock",
  name: "Lock",
  component: Lock,
};

const routes = [
  {
    path: "/",
    name: "adminDashboard",
    redirect: "/admin/overview",
  },
  componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  loginPage,
  registerPage,
  lockPage,
  {
    path: "/admin",
    component: DashboardLayout,
    redirect: "/admin/overview",
    children: [
      {
        path: "overview",
        name: "Overview",
        component: Overview,
      },
      {
        path: "stats",
        name: "Stats",
        component: Stats,
      },
      {
        path: "calendar",
        name: "Calendar",
        component: Calendar,
      },
      {
        path: "charts",
        name: "Charts",
        component: Charts,
      },
    ],
  },
  { path: "*", component: NotFound },
];

export default routes;
