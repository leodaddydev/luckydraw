import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Default from "@/layouts/Default.vue";
import SlotMachine from "@/components/SlotMachine.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Default,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: SlotMachine,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
