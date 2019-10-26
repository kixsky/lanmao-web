import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '*',
        redirect: '/main'
    },
    {
        name: 'main',
        path: '/main',
        component: () => import('../view/main'),
        meta: {
            title: '首页'
        },
        redirect: '/desk',
        children: [
            {
                path: '/mech',
                name: 'mech',
                component: () => import('../view/mech'),
                meta: {
                    title: '技师管理'
                }
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../view/user'),
                meta: {
                    title: '用户管理'
                }
            },
            {
                path: '/desk',
                name: 'desk',
                component: () => import('../view/desk'),
                meta: {
                    title: '控制台'
                }
            },
            {
                path: '/book',
                name: 'book',
                component: () => import('../view/book'),
                meta: {
                    title: '预约中心'
                }
            }
        ]
    },
    {
        name: 'login',
        component: () => import('../view/login'),
        meta: {
            title: '登陆'
        }
    }
];

// add route path
routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export {
    router
};