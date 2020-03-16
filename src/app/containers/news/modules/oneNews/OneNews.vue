<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="3">
                <span>Название</span>
            </el-col>
            <el-col :span="3">
                <div class="grid-content">{{data.title}}</div>
            </el-col>
            <el-col :span="3" :offset="4">
                <span>Дата создания</span>
            </el-col>
            <el-col :span="3">
                <div class="grid-content">{{dateFormat(data.created_at)}}</div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                <div class="grid-content">{{data.text}}</div>
            </el-col>
        </el-row>
        <el-row :gutter="20" >
            <el-col :span="3">
                <span>Автор</span>
            </el-col>
            <el-col :span="3">
                <div class="grid-content">{{oneNews.author.name}}</div>
            </el-col>
            <el-col :span="3">
                <span>Рейтинг</span>
            </el-col>
            <el-col :span="3">
                <div class="grid-content">{{oneNews.author.rating}}</div>
            </el-col>
            <el-col :span="3">
                <span>Статей</span>
            </el-col>
            <el-col :span="3">
                <div class="grid-content">{{count}}</div>
            </el-col>
        </el-row>
        <el-row :gutter="20" >
            <el-col :span="4" :offset="9">
                <el-button
                        circle
                        @click="mainPages()"
                >Назад
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import moment from 'moment'
    import {mapGetters, mapActions, mapMutations} from 'vuex'

    export default {
        name: "OneNews",

        data() {
            return {
                oneNews: {
                    author: {
                        name: '',
                        rating: '',
                        id : '',
                    },
                    created_at: '',
                    title: '',
                    text: '',
                    author_id: ''
                },
                filters:{
                    authorId:''
                }

            }
        },
        computed: {
            ...mapGetters('news/onenews', [
                'data',
                'loading',
                //'count'
            ]),
            ...mapGetters('news/filters', [
                'filterData'
            ]),
            ...mapGetters('news/table', [
                'count',
            ]),
        },
        methods: {
            ...mapActions('news/onenews', [
                'fetchOneData',
                'countNews'
            ]),
            ...mapMutations('news/onenews', [
                'setData',
                'setLoading'
            ]),
            ...mapMutations('news/filters', [
                'setFilters',
                'resetFilters'
            ]),
            ...mapActions('news/table', [
                'fetchData'
            ]),

            dateFormat(time){
                return moment(time).format("DD-MM-YYYY")
            },
            mainPages(){
                return this.$router.push({name: 'NewsTable'})
            },
            _applyFilters () {
                //console.log(oneNews)
                //this.filters.authorId = oneNews.author.id
                //console.log(...this.oneNews)

                //let storeData = {...this.data.author_id}
                //this.setFilters({filterData: storeData})

                console.log(this.data)
                this.setFilters({filterData:{ ...this.data.author_id}})

                //let queryData = {...storeData}
                // for (let prop in queryData) {
                //     if(queryData[prop] === '') {
                //         delete queryData[prop]
                //     }
                // }

                this.fetchData()
            },
        },
        watch: {
            data: function (newData) {
                this.oneNews = newData
            }
        },
        mounted() {
            this.fetchOneData({uuid: this.$route.params.uuid})
            this._applyFilters ()
        }
    }

</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>