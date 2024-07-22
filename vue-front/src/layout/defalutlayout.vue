<template>
    <div>
        <Header/>
            <menu-layout></menu-layout>
        <div class="container">
                <router-view />
        </div>
    </div>
</template>

<script>

import Header from './header.vue'
import MenuLayout from './MenuLayout.vue'

export default {
    name: '',
    components: {Header, MenuLayout},
    data() {
    return {
        example: '',
    }
}, 
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    computed: {},
    beforeUpdate() {}, 
    updated() {}, 
    beforeUnmount() {},
    unmounted() {},
    methods: {}
}
</script>