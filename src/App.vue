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
        mounted() {
            fetch('/api/news')
                .then(res => console.log(res));
        }
    }
</script>

<style>

</style>
