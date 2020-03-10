const defaultState = {
    filterData: {
        authorsId   : '',
        dateFrom: '',
        dateTo: ''
    },
    filtering: false,
}

export default {
    namespaced: true,
    state: {...defaultState},
    getters: {
        filtering: state  => state.filtering,
        filterData: state => state.filterData
    },
    mutations: {
        setFilters (state, {filterData}) {
            //Устанавливаем значения фильтров
            state.filterData = filterData
        },
        resetFilters (state) {
            state.filterData = defaultState.filterData
        },

        setFiltering (state, {filtering}) {
            state.filtering = filtering
        }
    },
    actions: {}
}