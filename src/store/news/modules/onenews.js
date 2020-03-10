import api from '@/api'
const defaultState = {
    oneNews: {
        author: '',
        date: '',
        title: '',
        text: '',
        rating: '',
        count: ''
    }
}
export default {
    namespaced: true,
    state: {...defaultState},
    getters: {
        data: state => state.data,
        loading: state => state.loading,
        count: state => state.meta ? state.meta.total : 0,
    },
    mutations: {
        setData (state, {data}) {
            state.data = data
        },
        setMeta(state, {data}) {
            state.meta = data
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
        },
    }
}