<template>
    <el-form
            v-model="oneNews"
            label-position="top"
    >
        <el-row :gutter="20" >
            <el-col :span="6">
                <el-form-item label="Название:">
                    <div v-model="oneNews.title"/>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Date:">
                    <div v-model="oneNews.date"/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                <el-form-item >
                    <div v-model="oneNews.text"/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20" >
            <el-col :span="6">
                <el-form-item label="Автор:">
                    <div v-model="oneNews.author"/>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Рэйтинг:">
                    <div v-model="oneNews.rating"/>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Статей:">
                    <div v-model="oneNews.count"/>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'

    export default {
        name: "OneNews",

        data () {
            return {
                oneNews: {
                    author: '',
                    date: '',
                    title: '',
                    text: '',
                    rating: '',
                    count: ''
                },
                list: [],
                suggestOptions: []
            }
        },
        methods: {
            ...mapActions('news/table', [
                'fetchData'
            ]),
        },
        mounted() {
            console.log("onenews")
            this.fetchData()
        }
    }
</script>

<style scoped>

</style>