import Vue from 'vue'
import Router from 'vue-router'

import News from '@/app/containers/news/NewsIndex'

Vue.use(Router)

/** Подключение  роутинга приложения */
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'news',
            exact: true,
            component: News,
        },
    ]
})

export default router

