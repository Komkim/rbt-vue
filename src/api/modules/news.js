import { axios, apiPrefixV1 } from '@/api/config'

export default {

    get({query}) {
        return axios.get(`${apiPrefixV1}/news`,{params: query})
    },

    one({id}) {
        return axios.get(`${apiPrefixV1}/news/${id}`)
    },

    add({data}) {
        return axios.post(`${apiPrefixV1}/news/create`,{data})
    },

    update ({id, data}) {
        return axios.put(`${apiPrefixV1}/news/${id}`, {data})
    },

    delete ({id}) {
        return axios.delete(`${apiPrefixV1}/news/${id}`)
    }
}
