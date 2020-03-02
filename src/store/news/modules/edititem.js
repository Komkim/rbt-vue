import api from '@/api'

const defaultState = {
    formData: {
        title: '',
        desctiption: '',
        text:''
    },
    loading: false,
    saving: false,
}

export default {
    namespaced: true,
    state: {...defaultState},
    getters: {
        data: state => state.formData,
        loading: state => state.loading,
        saving: state => state.saving
    },
    mutations: {
        setData (state, {data}) {
            state.formData = data
        },
        setLoading (state, {loading}) {
            state.loading = loading
        },
        setSaving (state, {saving}) {
            state.saving = saving
        },
        clearFormData (state) {
            state.formData = defaultState.formData
        }
    },
    actions: {
        fetchData ({commit, state}, {uuid}) {
            commit('setLoading', {loading: true})
            return api.news.one({id: uuid})
                .then(res => commit('setData', {data: res.data}))
                .catch(err => err.data)
                .finally(() => commit('setLoading', {loading: false}))
        },

        addData({commit}, {data}) {
            commit('setSaving', {saving: true})
            return api.news.add({data})
                .catch(err => Promise.reject(err.data))
                .finally(() => commit('setSaving', {saving: false}))
        },

        saveData ({commit}, {id, data}) {
            commit('setSaving', {saving: true})
            return api.news.update({id, data})
                .catch(err => {
                    return Promise.reject(err.data)
                })
                .finally(() => commit('setSaving', {saving: false}))
        },

        removeData ({commit}, {id}) {
            commit('setSaving', {saving: true})
            return api.news.delete({id})
                .catch(err => err.data)
                .finally(() => commit('setSaving', {saving: false}))
        },

        updateData ({commit, state}, {id, data}) {
            commit('setSaving', {saving: true})
            return api.news.update({id, data})
                .catch(err => Promise.reject(err.data))
                .finally(() => commit('setSaving', {saving: false}))
        }
    }
}