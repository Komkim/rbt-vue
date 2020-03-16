import NewsRoutes from '@/app/containers/news/routes'
import NewsIndex from '@/app/containers/news/NewsIndex'

export default [
    {
        path: '/',
        component: NewsIndex,
        exact: true,
        children: NewsRoutes
    }
]