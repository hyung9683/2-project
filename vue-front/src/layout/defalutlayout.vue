<template>
    <div>
    <nav class="navbar navbar-expand-md navbar-light">
            <button class="navbar-toggler ml-auto mb-2 bg-light" type="button" data-toggle="collapse" data-target="#sidebar">
                <span class="navbar-toggle-icon"></span>
            </button>
        <Header />
            <menu-layout></menu-layout>
    </nav>
        <router-view />
    </div>
</template>

<script>

import Header from './header.vue'
import MenuLayout from './MenuLayout.vue'

export default {
    components: {Header, MenuLayout},
    data() {
    return {
    }
}, 
    mounted() {},
    computed: {},
    methods: {
    }
}
</script>
<style scoped>

</style>