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
                            v-loading="authorsLoading"
                            label="Автор:"
                    >
                        <el-select
                                multiple
                                v-model="filters.authors"
                                placeholder="Укажите автора"
                                filterable
                                width="100%"
                        >
                            <el-option
                                    v-for="author in authors"
                                    :key="author.id"
                                    :value="author.id"
                                    :label="author.name"
                            >
                                {{ author.name }}
                            </el-option>
                        </el-select>
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
            ...mapGetters('news/suggest', [
                'data',
                'loading'
            ]),
            ...mapGetters({
                authorsLoading: 'authros/loading',
                authors: 'authors/data'
            })
        },
        data () {
            return {
                filters: {
                    searchString: '',
                    dateFrom: '',
                    dateTo: '',
                    authors: ''
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

            ...mapActions({
                suggest: 'news/suggest'
            }),

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
        }
    }
</script>

<style>

</style>
