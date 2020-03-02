import Vue from 'vue'
import Vuex from 'vuex'

import authors from './authors'
import news from './news'

Vue.use(Vuex)
const defaultState = {}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {...defaultState},
    getters: {},
    mutations: {},
    modules: {
        authors,
        news
    }
})