import api from '@/api'
const defaultState = {
    loading: false,
    data: [],
    meta: {},
}

export default {
    namespaced: true,
    state: {...defaultState},
    getters: {
        loading: state => state.loading,
        data: state => state.data,
        count: state => state.meta ? state.meta.total : 0,
        page: state => state.meta ? state.meta.currentPage : 1,
        pageSize: state => state.meta ? parseInt(state.meta.perPage) : 10,
        filterData: (state, getters, rootState, rootGetters) => rootGetters['news/filters/filterData']
    },
    mutations: {
        setData (state, {data}) {
            state.data = data
        },
        setMeta(state, {data}) {
            state.meta = data
        },
        setPage (state, {page}) {
            state.page = page
        },
        setCount (state, {count}) {
            state.count = count
        },
        setLoading (state, {loading}) {
            state.loading = loading
        },
        setPageSize (state, {pageSize}) {
            state.pageSize = pageSize
        }
    },
    actions: {
        fetchData ({commit, getters}) {
            commit('setLoading', {loading: true})
            api.news.get({query: getters.filterData})
                .then(res => {
                    commit('setData', {data: res.data})
                    commit('setMeta', {data: res.meta})
                })
                .catch(err => err)
                .finally(() => commit('setLoading', {loading: false}))
        }
    }
}
