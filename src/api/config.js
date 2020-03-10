import Axios from 'axios'

//const BASE_API_PATH = "http://192.168.1.40:8081"
//const BASE_API_PATH = "http://185.224.248.225:8081"
const BASE_API_PATH = process.env.VUE_APP_API_URL
const axios = Axios.create({
})

const apiPrefixV1 = `/api`

axios.interceptors.response.use(
    response => Promise.resolve(response.data),
    error => Promise.reject(error.response),
)

export {
    axios,
    apiPrefixV1,
    BASE_API_PATH
}