<template>
 <!-- top navbar -->
 <div id="top_navbar" class="col-lg-12 ms-auto bg-success-subtle fixed-top py-2" ref="header">
    <div class="row align-items-center">
        <div class="col-md-4">
            <div class="nav navbar-toggle flex-colum text-light text-uppercase mb-0"><button style="border:none;" @click="sideBarMenu"><i class="bi bi-list mx-1 me-2"></i></button><a href="#" class="nav-link text-dark logo-container"><img class="img-fluid h4-image" src="../assets/2차 프로젝트 로고2.png" style="object-fit: contain;" :style="imageSize"></a></div>
        </div>
        <div class="col-md-5"></div>
        <div class="col-md-3" style="padding-left: 15%;">
            <ul class="navbar-nav">
                <li class="nav-item"><a href="#" class="nav-link"><i class="bi bi-chat-dots text-dark bi-lg"></i></a></li>
                <li class="nav-item"><a href="#" class="nav-link"><i class="bi bi-person-square text-dark bi-lg"></i></a></li>
                <li class="nav-item"><a href="#" class="nav-link"><i class="bi bi-box-arrow-right text-danger bi-lg"></i></a></li>
            </ul>
        </div>
    </div>
</div>
    <!-- /top navbar -->
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
    return {
        imageSize: {
            height: '7rem',
            width: 'auto',

        }
    }
}, 
    created() {},
    mounted() {},
    computed: {},
    methods: {
        sideBarMenu() {
            this.emitter.emit('SideBarMenu');
        },
        headerHeight() {
            const headerHeight = this.$refs.header.offsetHeight
            console.log(headerHeight);
            this.emitter.emit('headerHeight', headerHeight);
        }
    }
}
</script>
<style scoped>

.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.7rem;
    overflow: hidden;
}

.h4-image {
    height: auto;
    max-height: 100%;
    width: auto;
}
</style>