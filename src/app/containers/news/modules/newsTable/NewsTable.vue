<template>
    <div>
        <div class="news_table__head">
            <el-button
                    type="warning"
                    @click="_openFilterModal"
            >
                <i class="el-icon-s-operation"></i>
                Фильтр
            </el-button>
            <filters
                    :open="filterIsOpen"
                    @modal-close="_closeFilterModal"
            />
        </div>
        <el-table
                :data="data"
                v-loading="loading"
        >
            <el-table-column
                    prop="title"
                    label="Title"
                    width="150"
                    align="center"
            />
            <el-table-column
                    prop="authorId"
                    label="Author"
                    align="center"
            >
                <template slot-scope="scope">
                    {{_clientString(scope.row.author_id)}}
                </template>
            </el-table-column>

            <el-table-column
                    prop="created_at"
                    label="Время создания"
                    align="center"
            >
                <template slot-scope="scope">
                    {{dateColumn(scope.row.created_at)}}
                </template>
            </el-table-column>
            <el-table-column
                    label="Действия"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-button
                            size="small"
                            type="primary"
                            icon="el-icon-edit"
                            circle
                            @click="_onEditClick(scope.row.id)"
                    >
                    </el-button>
                    <el-button
                            size="small"
                            type="danger"
                            icon="el-icon-delete"
                            :disabled="!canDelete"
                            circle
                            @click="_onDeleteClick(scope.row.id)"
                    >
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div
                v-if="!loading"
                class="news_table__pagination-row"
        >
            <el-pagination
                    layout="sizes, prev, pager, next, slot"
                    :page-sizes="[20,30,40]"
                    :page-size="pageSize"
                    :current-page="page"
                    :total="count"
                    @size-change="_handlePageSizeChange"
                    @current-change="_handlePageChange"
                    @prev-click="_handlePrevPageClick"
                    @next-click="_handleNextPageClick"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import Filters from '../../modules/filters/Filters'

    export default {
        name: 'NewsTable',
        components: {
            Filters
        },
        computed: {
            ...mapGetters('news/table', [
                'data',
                'loading',
                'count',
                'page',
                'pageSize'
            ]),
            ...mapGetters('news/filters', [
                'filtering'
            ])
        },
        methods: {
            ...mapMutations('news/table', [
                'setPage',
                'setPageSize'
            ]),
            ...mapMutations('news/filters', [
                'setFilters'
            ]),
            ...mapActions('news/table', [
                'fetchData'
            ]),
            ...mapActions('news/editItem', [
                'removeData',
            ]),

            dateColumn(data){
                return moment(data).format("DD-MM-YYYY")
            },


            _clientString(data)
            {
                return data.client ? data.client.name : 'Не указан';
            },

            _onEditClick(id) {
                return this.$router.push({name: 'EditNews', params: {uuid: id}})
            },
            _onDeleteClick(id) {
                return this.$confirm('Удалить выбранный элемент?', {
                    confirmButtonText: 'Да',
                    cancelButtonText: 'Отмена',
                    type: 'info'
                })
                    .then(() => {
                        this.removeData({id: id})
                            .then(res => {
                                this.$message.success(`Новость удалена.`)
                                this.fetchData()
                            })
                            .catch(err => {
                                this.message.error(`Ошибка: ${err.message}`)
                            })
                    })
                    .catch(()=>{})
            },
            _openFilterModal () {
                this.filterIsOpen = true
            },

            _closeFilterModal () {
                this.filterIsOpen = false
            },

            _handlePageSizeChange (pageSize) {
                this.$router.push({ query: {...this.$route.query, limit: pageSize, page: '1'}})
                this.setPageSize({pageSize})
                this.setPage({page: 1})
                this.setFilters({filterData: {limit: pageSize}})
                this.fetchData()
                    .then(() => window.scrollTo({top: 0, behavior: 'smooth'}))
            },

            _handlePageChange (page) {
                this.$router.push({query: {...this.$route.query, page: page}})
                this.setPage({page})
                this.setFilters({filterData: {page: page}})
                this.fetchData()
                    .then(() => window.scrollTo({top: 0, behavior: 'smooth'}))
            },

            _handleNextPageClick () {
                let nextPage = this.page + 1;
                this.setPage({page: nextPage})
                this.$router.push({query: {...this.$route.query, page: '' + nextPage}})
                this.setFilters({filterData: {page: nextPage}})
                this.fetchData()
                    .then(() => window.scrollTo({top: 0, behavior: 'smooth'}))
            },

            _handlePrevPageClick () {
                let prevPage = this.page - 1;
                this.setPage({page: prevPage})
                this.$router.push({query: {...this.$route.query, page: '' + prevPage}})
                this.setFilters({filterData: {page: prevPage}})
                this.fetchData()
                    .then(() => window.scrollTo({top: 0, behavior: 'smooth'}))
            },
        },
        mounted () {
            if (!this.$route.query.employers) {
                this.$router.push({query: {...this.$route.query, employers: [this.profile.id]}})
                this.setFilters({filterData: {employers: [this.profile.id]}})
            }
            this.fetchData()
        }
    }
</script>

<style lang="scss">
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }

    .news_table {
        &__head {
            display: flex;
            justify-content: flex-end;
        }

        &__pagination-row {
            margin-top: 20px;
            display: flex;
            justify-content: center;
        }
    }
</style>
