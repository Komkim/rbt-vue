import api from '@/api'

const defaultState = {
    formData: {
        name: '',
        rating: ''
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
            return api.authors.one({id: uuid})
                .then(res => commit('setData', {data: res.data}))
                .catch(err => err.data)
                .finally(() => commit('setLoading', {loading: false}))
        },

        addData({commit}, {data}) {
            commit('setSaving', {saving: true})
            return api.authors.add({data})
                .catch(err => Promise.reject(err.data))
                .finally(() => commit('setSaving', {saving: false}))
        },

        saveData ({commit}, {id, data}) {
            commit('setSaving', {saving: true})
            return api.authors.update({id, data})
                .catch(err => {
                    return Promise.reject(err.data)
                })
                .finally(() => commit('setSaving', {saving: false}))
        },

        removeData ({commit}, {id}) {
            commit('setSaving', {saving: true})
            return api.authors.delete({id})
                .catch(err => err.data)
                .finally(() => commit('setSaving', {saving: false}))
        },

        updateData ({commit, state}, {id, data}) {
            commit('setSaving', {saving: true})
            return api.authors.update({id, data})
                .catch(err => Promise.reject(err.data))
                .finally(() => commit('setSaving', {saving: false}))
        }
    }
}