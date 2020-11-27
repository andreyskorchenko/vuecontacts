import VueRouter from "vue-router";
import Contacts from "../pages/Contacts";
import Contact from "../pages/Contact";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "contacts",
      component: Contacts,
    },
    {
      path: "/contact/:id",
      name: "contact",
      component: Contact,
    },
    {
      path: "*",
      redirect: { name: "contacts" },
    },
  ],
});
