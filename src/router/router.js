import Discount from "@/components/Discount";
import Settle from "@/components/Settle";
import Purchase from "@/components/Purchase";
import Transfer from "@/components/Transfer";
import VueRouter from "vue-router";
import Index from "@/components/Index";
import LogIn from "@/components/LogIn";
import NotFound from "@/components/404";
import store from "@/store";

const routes = [
    {
        path: '/',
        component: Index,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/discount',
        component: Discount,
        meta: {
            title: '贴现'
        }
    },
    {
        path: '/settle',
        component: Settle,
        meta: {
            title: '结算'
        }
    },
    {
        path: '/purchase',
        component: Purchase,
        meta: {
            title: '采购'
        }
    },
    {
        path: '/transfer',
        component: Transfer,
        meta: {
            title: '转让'
        }
    },
    {
        path: '/login',
        component: LogIn,
        meta: {
            title: '登录'
        }
    },
    {
        path: '*',
        component: NotFound,
        meta: {
            title: '找不到页面'
        }
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.fullPath !== '/login' && !store.state.loggedIn) {
        next({ path: '/login' });
    } else {
        next();
    }
});

export default router;
