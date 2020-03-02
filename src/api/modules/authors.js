import { axios, apiPrefixV1 } from '@/api/config'

export default {

    get({query}) {
        return axios.get(`${apiPrefixV1}/authors`,{params: query})
    },

    one({id}) {
        return axios.get(`${apiPrefixV1}/authors/${id}`)
    },

    add({data}) {
        return axios.post(`${apiPrefixV1}/authors/create`,{data})
    },

    update ({id, data}) {
        return axios.put(`${apiPrefixV1}/authors/${id}`, {data})
    },

    delete ({id}) {
        return axios.delete(`${apiPrefixV1}/authors/${id}`)
    },

    suggest({query}) {
        return axios.get(`${apiPrefixV1}/authors/suggest`, {params: {query}})
    }
}
