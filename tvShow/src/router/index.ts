import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import ShowDetail from "../views/ShowDetail.vue"

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/shows/:id",
		name: "ShowDetail",
		component: ShowDetail,
		props: true,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
