<template>
    <div class="news-edit-form">
        <el-form
                ref="newsForm"
                hide-required-asterisk
                label-position="top"
                :model="editFormData"
        >
            <el-form-item
                    label="Название"
                    prop="title"
            >
                <el-input
                        v-model="editFormData.title"
                        placeholder="введите название статьи"
                />
            </el-form-item>
            <el-form-item
                    label="Описание"
                    prop="description"
            >
                <el-input
                        v-model="editFormData.description"
                        placeholder="описание статьи"
                />
            </el-form-item>
            <el-form-item
                    label="Текст"
                    prop="text"
            >
                <el-input
                        v-model="editFormData.text"
                        placeholder="текст статьи"
                />
            </el-form-item>
            <el-form-item
                    label="Автор"
                    prop="author"
            >
                <el-input
                        v-model="editFormData.author"
                        placeholder="автор статьи"
                />
            </el-form-item>
            <el-form-item>
                <el-row type="flex" justify="middle">
                    <el-button
                            type="success"
                            @click="_onSubmitClick"
                            :loading="saving"
                            :disabled="saving"
                    >
                        Сохранить
                    </el-button>
                    <el-button
                            type="danger"
                            @click="_onGoBackClick"
                    >
                        Назад
                    </el-button>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'

    export default {

        name: 'NewsEdit',
        props: {
            formData: {
                type: Object,
                default: () => {}
            },
            saving: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                editFormData: {...this.formData},
                modal: false,
            }
        },
        methods: {
            ...mapActions('news/edititem', [
                'updateData'
            ]),
            _onSubmitClick () {
                // this.$refs['newsForm']
                //     .then(() => {
                //         this.$emit('news_update', {id : this.editFormData.id, data: this.editFormData})
                //     })
                //     .catch(() => this.$message.warning('Проверьте заполненные поля'))

                this.updateData({id:this.editFormData.id, data:this.editFormData})
            .then(res => {
                    this.$message({
                        message: `Обновлено успешно`,
                        type: 'success'
                    });
                    this.$router.push({name: 'NewsTable'})
                })
                    .catch(err => this.$message.error(err.message))
            },

            _onGoBackClick () {
                if(!this.$route.params.uuid && !this.modal){
                    return this.$router.push({name: 'NewsTable'})
                }
                if (this.modal) {
                    this.$emit('modal-close')
                    return;
                }

                this.$confirm('Все несохраненные изменения будут потеряны. Вы хотите вернуться к списку?', {
                    confirmButtonText: 'Ок',
                    cancelButtonText: 'Отмена',
                    type: 'info'
                }).then(() => this.$router.push({name: 'NewsTable'}))
                    .catch(()=>{})
            },

        },
        watch: {
            formData: function (newVal) {
                this.editFormData = {...newVal}
                // console.log(this.$refs['phoneField'].$refs['input'].dispatchEvent(new Event('change')))
            }
        },
    }
</script>

<style lang="scss">
    .news-edit-form {
        text-align: left;
    }
</style>
