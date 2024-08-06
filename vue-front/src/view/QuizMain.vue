<template>
    <div class="container quizMain" :style="main_quiz">
        <div class="col-12 p-2 border-bottom" v-if="this.addCategory && this.addLevel">{{this.category}}/{{ this.level }}</div>
    </div>
</template>

<script>
export default {
    data() {
    return {
        category: '',
        level: '',
    }
}, 
    created() {},
    mounted() {},
    computed: {
        user() {
            return this.$store.state.user;
        },

        addressUrl() {
          return this.$store.state.currentUrl;
        },

        addCategory() {
          return this.$store.state.quizCategory;
        },

        addLevel() {
          return this.$store.state.quizLevel;
        },

        headerHeight() {
            return this.$store.state.headerHeight;
        },
        baseTop() {
            return parseInt(this.sideMainTop || '0', 10);

        },
        naviHeight() {
            return this.$store.state.naviHeight;
        },

        computedTop() {
            const height = this.headerHeight;
            const naviHeight = this.naviHeight;
            const baseTop = this.baseTop;

            if(!isNaN(height) && !isNaN(baseTop) && !isNaN(naviHeight)) {

                return baseTop + (height + naviHeight);
            }

            return baseTop;
        },
        main_quiz() {
            return {
                top: `${this.computedTop}px`,

            }
        }
    },
    methods: {
        
    }
}
</script>
<style scoped>
.quizMain {
    position: relative;
    justify-content: center;
    text-align: center;
    align-content: center;
    top: 500px;
}
</style>