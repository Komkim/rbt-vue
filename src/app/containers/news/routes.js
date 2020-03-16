import NewsTable from './modules/newsTable/NewsTable'
import OneNews from './modules/oneNews/OneNews'

export default [
    {
        path: '/',
        name: 'NewsTable',
        component: NewsTable
    },
    {
        path: '/news/:uuid',
        name: 'OneNews',
        component: OneNews,
    }
]