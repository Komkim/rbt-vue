import NewsRoutes from '@/app/containers/news/routes'
import AuthorsRoutes from '@/app/containers/authors/routes'
import NewsIndex from '@/app/containers/news/NewsIndex'
import AuthorsIndex from '@/app/containers/authors/AuthorsIndex'

export default [
    {
        path: '/',
        component: NewsIndex,
        exact: true,
        children: NewsRoutes
    },
    {
        path: '/author',
        component: AuthorsIndex,
        exact: true,
        //children: AuthorsRoutes
    }
]