import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MyHome from "../views/MyHome.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import EventsIndex from "../views/EventsIndex.vue";
import EventsNew from "../views/EventsNew.vue";
import EventsShow from "../views/EventsShow.vue";
import EventsEdit from "../views/EventsEdit.vue";
import EventsNearMe from "../views/EventsNearMe.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/home",
    name: "MyHome",
    component: MyHome,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/events", name: "events", component: EventsIndex },
  { path: "/events/new", name: "events-new", component: EventsNew },
  { path: "/events/:id", name: "events-show", component: EventsShow },
  { path: "/events/:id/edit", name: "events-edit", component: EventsEdit },
  { path: "/eventsnearme", name: "events-near-me", component: EventsNearMe },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
