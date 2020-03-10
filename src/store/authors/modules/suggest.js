import api from '@/api'

const defaultState = {
    data : [],
    loading: false,
}

export default {
    namespaced: true,
    state: {...defaultState},
    getters: {
        data: state => state.data,
        loading: state => state.loading
    },
    mutations: {
        setData (state, {data}) {
            state.data = data
        },
        addSuggestData(state, {data}) {
            state.data.push(data)
        },
        setLoading (state, {loading}) {
            state.loading = loading
        }
    },
    actions: {
        suggest ({commit, state},{query}) {
            if(query === '') {
                return
            }
            commit('setLoading', {loading: true})
            return api.authors.suggest({query})
                .then(res => commit('setData', {data: res.data}))
                .catch(err => err)
                .finally(() => commit('setLoading', {loading: false}))
        }
    }
}
