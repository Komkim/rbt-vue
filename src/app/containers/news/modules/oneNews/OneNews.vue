<template>
    <div>
        <el-row
                :gutter="20"
        >
            <el-col
                    :span="3"
            >
                <span>Название</span>
            </el-col>
            <el-col
                    :span="3"
            >
                <div
                        class="grid-content"
                >
                    {{data.title}}
                </div>
            </el-col>
            <el-col
                    :span="3" :offset="4"
            >
                <span>Дата создания</span>
            </el-col>
            <el-col
                    :span="3"
            >
                <div
                        class="grid-content"
                >
                    {{dateFormat(data.created_at)}}
                </div>
            </el-col>
        </el-row>
        <el-row
                :gutter="20"
        >
            <el-col
                    :span="20"
            >
                <div
                        class="grid-content"
                >
                    {{data.text}}
                </div>
            </el-col>
        </el-row>
        <el-row
                :gutter="20"
        >
            <el-col
                    :span="3"
            >
                <span>Автор</span>
            </el-col>
            <el-col
                    :span="3"
            >
                <div
                        v-if=loading
                        class="grid-content"
                >
                    {{data.author.name}}
                </div>
                <div c-else>
                    >
                    Не указано
                </div>
            </el-col>
            <el-col
                    :span="3"
            >
                <span>Рейтинг</span>
            </el-col>
            <el-col
                    :span="3"
            >
                <div
                        class="grid-content"
                >
                    {{data.author.rating}}
                </div>
            </el-col>
            <el-col
                    :span="3"
            >
                <span>Статей</span>
            </el-col>
            <el-col
                    :span="3"
            >
                <div
                        class="grid-content"
                >
                    {{data.author.posts}}
                </div>
            </el-col>
        </el-row>
        <el-row
                :gutter="20"
        >
            <el-col
                    :span="4"
                    :offset="9"
            ой>
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

        computed: {
            ...mapGetters('news/onenews', [
                'data',
                'loading',
            ]),

        },
        methods: {
            ...mapActions('news/onenews', [
                'fetchOneData'
            ]),

            dateFormat(time){
                return moment(time).format("DD-MM-YYYY")
            },
            mainPages(){
                return this.$router.push({name: 'NewsTable'})
            },
        },

        mounted() {
            this.fetchOneData({uuid: this.$route.params.uuid})
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