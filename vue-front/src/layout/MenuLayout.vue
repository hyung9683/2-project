<template>
    <div class="col-md-3">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">메뉴</h3>
            </div>
            <ul class="list-group">
                <li class="list-group-item" @click="subMenu">한자 퀴즈</li>
                <ul class="list-group">
                    <li class="list-group-item">초급</li>
                    <li class="list-group-item">중급</li>
                    <li class="list-group-item">고급</li>
                </ul>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
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