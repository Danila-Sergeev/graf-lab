import { createRouter, createWebHistory } from "vue-router";
import First from "./components/first.vue"; // Главная страница
import Second from "./components/second.vue"; // Страница работы с графом
import Third from "./components/third.vue";
import Forth from "./components/forth.vue";
import Fifth from "./components/fifth.vue";
import Six from "./components/six.vue";

const routes = [
  {
    path: "/",
    name: "First",
    component: First,
  },
  {
    path: "/second",
    name: "Second",
    component: Second,
  },
  {
    path: "/third",
    name: "Third",
    component: Third,
  },
  {
    path: "/forth",
    name: "Forth",
    component: Forth,
  },
  {
    path: "/fifth",
    name: "Fifth",
    component: Fifth,
  },
  {
    path: "/six",
    name: "Six",
    component: Six,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
