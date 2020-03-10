import NewsEdit from './modules/newsEdit/NewsEdit'
import NewsTable from './modules/newsTable/NewsTable'

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
        name: 'NewsEdit',
        component: NewsEdit,
    }
]