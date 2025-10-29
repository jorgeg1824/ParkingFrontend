import { createRouter, createWebHistory } from "vue-router";
import type { Router, RouteRecordRaw } from "vue-router";

import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import ModuloCelda from "../components/ModuloCelda.vue";
import CrearCelda from "../components/CrearCelda.vue";

const routes: RouteRecordRaw [] = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/modulo-celda',
        name: 'celda',
        component: ModuloCelda,
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/registro-celda',
        name: 'registro de celda',
        component: CrearCelda
    }
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition){
        return savedPosition ?? {top: 0}
    }
})

export default router