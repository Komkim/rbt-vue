<template>
    <router-view></router-view>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                collapse: false,
            }
        },
        methods: {
            toggleCollapse () {
                this.collapse = !this.collapse
            }
        },
    }
</script>

<style>

</style>
