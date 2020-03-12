<template>
    <el-dialog
            :visible="open"
            @close="_onCloseModal"
            width="800px"
    >
        <template slot="title">Фильтр</template>
        <el-form
                v-model="filters"
                label-position="top"
        >
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item
                            label="Автор:"
                    >
                        <el-input
                                placeholder="Поиск по названию"
                                v-model="filters.authorName"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item
                            label="Дата с:"
                    >
                        <el-date-picker
                                class="full-width"
                                v-model="filters.dateFrom"
                                type="date"
                                placeholder="Дата с"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                            label="Дата по:"
                    >
                        <el-date-picker
                                class="full-width"
                                v-model="filters.dateTo"
                                type="date"
                                placeholder="Дата по"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-row type="flex" justify="end">
                    <el-button
                            type="warning"
                            @click="_applyFilters"
                    >
                        Применить
                    </el-button>
                    <el-button
                            type="danger"
                            @click="_resetFilters"
                    >
                        Отменить
                    </el-button>
                </el-row>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import moment from 'moment'

    export default {
        name: 'Filters',
        props: {
            open: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters('news/filters', [
                'filterData'
            ]),
            ...mapGetters('authors/suggest', [
                'data',
                'loading'
            ])
        },
        data () {
            return {
                filters: {
                    searchString: '',
                    dateFrom: '',
                    dateTo: '',
                    authorId: '',
                    authorName: ''
                },
                list: [],
                suggestOptions: []
            }
        },
        methods: {
            ...mapMutations('news/filters', [
                'setFilters',
                'resetFilters'
            ]),

            ...mapActions('news/table', [
                'fetchData'
            ]),

            ...mapActions('authors/suggest', [
                'suggest']
            ),

            _onCloseModal () {
                this.$emit('modal-close')
            },

            _applyFilters () {
                let storeData = {...this.filters}
                storeData.dateFrom = storeData.dateFrom ? moment(storeData.dateFrom).format('x') : ''
                storeData.dateTo = storeData.dateTo ? moment(storeData.dateTo).format('x') : ''
                this.setFilters({filterData: storeData})
                let queryData = {...storeData}
                for (let prop in queryData) {
                    if(queryData[prop] === '') {
                        delete queryData[prop]
                    }
                }

                this.$router.push({ query: {...this.$route.query, ...queryData}})
                this._onCloseModal()
                this.fetchData()
            },

            _resetFilters () {
                this.resetFilters()
                this.filters = {...this.filterData}
                this.$router.push({ query: ''})
                this._onCloseModal()
                this.fetchData()
            },

            _onSuggestChange(query) {
                this.suggest({query})
            }
        },
        mounted () {
            this.filters = {...this.filterData}
        }
    }
</script>

<style>

</style>
