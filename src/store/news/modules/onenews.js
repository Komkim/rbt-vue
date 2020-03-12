import api from '@/api'
const defaultState = {
    loading: false,
    data: []
}
export default {
    namespaced: true,
    state: {...defaultState},
    getters: {
        data: state => state.data,
        loading: state => state.loading,
        count: state => state.meta ? state.meta.total : 0,
        filterData: (state, getters, rootState, rootGetters) => rootGetters['news/filters/filterData']
    },
    mutations: {
        setData (state, {data}) {
            state.data = data
        },
        setMeta(state, {data}) {
            state.meta = data
        },
        setLoading (state, {loading}) {
            state.loading = loading
        },
        setCount (state, {count}) {
            state.count = count
        },
    },
    actions: {
        fetchData ({commit, state}, {uuid}) {
            commit('setLoading', {loading: true})
            return api.news.one({id: uuid})
                .then(res => commit('setData', {data: res.data}))
                .catch(err => err)
                .finally(() => commit('setLoading', {loading: false}))
        },
        countNews({commit, state}, {uuid}) {
            commit('setLoading', {loading: true})
            return api.news.get({query: getters.filterData})
                .then(res => {
                    commit('setData', {data: res.data})
                    commit('setMeta', {data: res.meta})
                })
                .catch(err => err)
                .finally(() => commit('setLoading', {loading: false}))
        },
    }
}