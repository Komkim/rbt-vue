<template>
    <el-dialog
            :visible="open"
            @close="_onCloseModal"
            width="800px"
    >
        <template slot="title">Поиск новостей</template>
        <el-form
                v-model="filters"
                label-position="top"
        >
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item
                            label="Поиск"
                    >
                        <el-input
                                v-model="filters.searchString"
                                placeholder="Название новости"
                                width="100%"
                                clearable
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                            v-loading="employersLoading"
                            label="Автор:"
                    >
                        <el-select
                                multiple
                                v-model="filters.employers"
                                placeholder="Укажите исполнителей"
                                filterable
                                width="100%"
                        >
                            <el-option
                                    v-for="employer in employers"
                                    :key="employer.id"
                                    :value="employer.id"
                                    :label="employer.name"
                            >
                                {{ employer.name }}
                                <!--                <span @click.prevent.stop="_elSelectClick">x</span>-->
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item
                            label="Заявитель"
                    >
                        <el-select
                                v-model="filters.clientId"
                                filterable
                                remote
                                reserve-keyword
                                :loading="loading"
                                :remote-method="_onSuggestChange"
                                width="100%"
                                placeholder="Введите ФИО"
                        >
                            <el-option
                                    v-for="opt in data"
                                    :key="opt.id"
                                    :value="opt.value"
                                    :label="opt.label"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col
                        v-loading="statusTypesLoading"
                        :span="12"
                >
                    <el-form-item
                            label="Статус заявления"
                    >
                        <el-select
                                class="full-width"
                                v-model="filters.statusType"
                                placeholder="Статус звявления"
                        >
                            <el-option
                                    v-for="status in statusTypes"
                                    :key="status.id"
                                    :value="status.id"
                                    :label="status.type"
                            ></el-option>
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
                        Сбросить
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
            ...mapGetters('office/contracts/filters', [
                'filterData'
            ]),
            ...mapGetters('office/clients/suggest', [
                'data',
                'loading'
            ]),
            ...mapGetters({
                workTypesLoading: 'office/settings/workTypes/loading',
                workTypes: 'office/settings/workTypes/data',
                statusTypesLoading: 'office/settings/statusTypes/loading',
                statusTypes: 'office/settings/statusTypes/data',
                employersLoading: 'office/employers/table/loading',
                employers: 'office/employers/table/data'
                authorLoading: ''
            })
        },
        data () {
            return {
                filters: {
                    employers: [],
                    clientId: '',
                    searchString: '',
                    dateFrom: '',
                    dateTo: '',
                    statusType: ''
                },
                list: [],
                suggestOptions: []
            }
        },
        methods: {
            ...mapMutations('office/contracts/filters', [
                'setFilters',
                'resetFilters'
            ]),

            ...mapActions('office/contracts/table', [
                'fetchData'
            ]),

            ...mapActions({
                suggest: 'office/clients/suggest/suggest',
                fetchEmployers: 'office/employers/table/fetchData'
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
            },

            _elSelectClick () {
                console.log('click')
            }
        },
        mounted() {
            this.filters = {...this.filterData}
            if (this.employers.length === 0) {
                this.fetchEmployers()
            }
        },
    }
</script>

<style>

</style>
