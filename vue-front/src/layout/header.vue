<template>
 <!-- top navbar -->
 <div id="top_navbar" class="col-lg-12 ms-auto bg-success-subtle fixed-top py-2 header-container" ref="header">
    <div class="row align-items-center">
        <div class="col-md-4">
            <div class="nav navbar-toggle flex-colum text-light text-uppercase mb-0"><button class="btn" style="border:none;" @click="sideBarMenu"><i class="bi bi-list mx-1 me-2"></i></button><a href="#" class="nav-link text-dark logo-container" @click="goToHome"><img class="img-fluid h4-image" src="../assets/2차 프로젝트 로고2.png" style="object-fit: contain;" :style="imageSize"></a></div>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4" style="padding-left: 15%;">
            <ul class="navbar-nav" v-if="this.user.user_no == this.loginUser.user_no">
                <!-- <li class="nav-item"><a href="#" class="nav-link"><i class="bi bi-chat-dots text-dark bi-lg"></i></a></li> -->
                <li class="nav-item"><a href="#" class="nav-link"><i class="bi bi-person-square text-dark bi-lg"></i></a></li>
                <li class="nav-item"><a href="#" class="nav-link"><i class="bi bi-box-arrow-right text-danger bi-lg"></i></a></li>
            </ul>
            <ul class="navbar-nav" v-else>
                <li class="nav-item"><a href="#" class="nav-link subBtn" @click="login"><div class="loginBtn">로그인</div></a></li>
                <li class="nav-item"><a href="#" class="nav-link subBtn" @click="join"><div class="joinBtn">회원가입</div></a></li>
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

        },
        loginUser: {},
    }
}, 
    created() {},
    mounted() {},
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        sideBarMenu() {
            this.emitter.emit('SideBarMenu');
        },
        headerHeight() {
            const headerHeight = `${this.$refs.header.offsetHeight}`;
            this.emitter.emit('headerHeight', headerHeight);
        },
        login(){
            this.$router.push({ path: '/login'});
        },
        join() {
            this.$router.push({ path: '/join'});
        },
        goToHome() {
            this.$router.push({ path: '/' });
        }
    }
}
</script>
<style scoped>


.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    overflow: hidden;
    padding: 0;
    
}

.h4-image {
    height: auto;
    max-height: 100%;
    width: 100%;
}

.joinBtn {
    max-width: auto;
}

.loginBtn {
    max-width: auto;
}


</style>