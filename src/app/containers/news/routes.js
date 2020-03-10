import NewsEdit from './modules/newsEdit/NewsEdit'
import NewsTable from './modules/newsTable/NewsTable'
import OneNews from './modules/oneNews/OneNews'

export default [
    {
        path: '/',
        name: 'NewsTable',
        component: NewsTable
    },
    {
        path: '/news',
        name: 'NewsTable',
        component: NewsTable
    },
    {
        path: '/news/create',
        name: 'NewsContracts',
        component: NewsEdit
    },
    {
        path: '/news/:uuid',
        name: 'OneNews',
        component: OneNews,
    }
]