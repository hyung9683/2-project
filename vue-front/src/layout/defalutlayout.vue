<template>
    <div class="container">
        <header/>
        <menu-layout></menu-layout>
            <router-link />
    </div>
</template>

<script>

import header from './header.vue'
import MenuLayout from './MenuLayout.vue'

export default {
    name: '',
    components: { header, MenuLayout},
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