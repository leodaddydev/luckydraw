import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
  RouterView,
} from "vue-router";
import Default from "@/layouts/Default.vue";
import SlotMachine from "@/components/SlotMachine.vue";

export const loginIgnore = {
  names: ["404", "403", "Login"],
  paths: ["/auth/login"],
  includes(route: RouteLocationNormalized): boolean {
    return (
      this.names.includes(route.name as string) ||
      this.paths.includes(route.path)
    );
  },
};

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
