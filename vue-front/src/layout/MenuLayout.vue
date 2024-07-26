<template>
    <div class="collapse navbar-collapse">
                <div class="container-fluid">
                    <div class="row">
                        <!-- 사이드 메뉴 -->
                        <div id="sidebar-menu" class="col-lg-2 sidebar fixed-top" :style="sidebar" :class="{'off-On': offOn}" ref="sidebar">
                            <a href="#" class="navbar-brand text-secondary text-center d-block mx-auto py-3 mb-4 bottom-border">메뉴자리</a>
                            <div class="bottom-border pb-3">
                                <i class="bi bi-person-circle mx-3 fs-3"></i>
                                <a href="#" class="text-white">관리자</a>
                            </div>
                            <ul class="navbar-nav flex-column mt-2" style="text-align:left;">
                                <!-- 홈 -->
                                <!-- <li class="nav-item">
                                    <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link">
                                        <i class="bi bi-house text-white"></i>Home
                                    </a>
                                </li> -->
                                <!-- 한자 -->
                                <li class="nav-item">
                                    <a href="#Han" class="nav-link text-white p-3 mb-2 sidebar-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="Han">
                                        <i class="bi bi-alipay"></i>한자
                                    </a>
                                    <div class="collapse" id="Han">
                                        <ul class="navbar-nav text-white flex-column ms-4">
                                            <li class="nav-item" @click="han_Beginner"><a href="#" class="nav-link">초급</a></li>
                                            <li class="nav-item" @click="han_Intermediate"><a href="#" class="nav-link">중급</a></li>
                                            <li class="nav-item" @click="han_Advanced"><a href="#" class="nav-link">고급</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <!-- 영어 -->
                                <li class="nav-item">
                                    <a href="#Eng" class="nav-link text-white p-3 mb-2 sidebar-link" data-bs-toggle="collapse" aria-controls="Eng" aria-expanded="false">
                                        <i class="bi bi-alipay"></i>영어
                                    </a>
                                    <div class="collapse" id="Eng">
                                        <ul class="navbar-nav text-white flex-column ms-4">
                                            <li class="nav-item" @click="eng_Beginner"><a href="#" class="nav-link">초급</a></li>
                                            <li class="nav-item" @click="eng_Intermediate"><a href="#" class="nav-link">중급</a></li>
                                            <li class="nav-item"  @click="eng_Advanced"><a href="#" class="nav-link">고급</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <!-- 수학 -->
                                <li class="nav-item">
                                    <a href="#Math" class="nav-link text-white p-3 mb-2 sidebar-link" data-bs-toggle="collapse" aria-controls="Math" aria-expanded="false">
                                        <i class="bi bi-alipay"></i>수학
                                    </a>
                                    <div class="collapse" id="Math">
                                        <ul class="navbar-nav text-white flex-column ms-4">
                                            <li class="nav-item" @click="math_Beginner"><a href="#" class="nav-link">초급</a></li>
                                            <li class="nav-item" @click="math_Intermediate"><a href="#" class="nav-link">중급</a></li>
                                            <li class="nav-item" @click="math_Advanced"><a href="#" class="nav-link">고급</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <!-- 국어 -->
                                <li class="nav-item">
                                    <a href="#Lan" class="nav-link text-white p-3 mb-2 sidebar-link" data-bs-toggle="collapse" aria-controls="Lan" aria-expanded="false">
                                        <i class="bi bi-alipay"></i>국어
                                    </a>
                                    <div class="collapse" id="Lan">
                                        <ul class="navbar-nav text-white flex-column ms-4">
                                            <li class="nav-item" @click="lan_Beginner"><a href="#" class="nav-link">초급</a></li>
                                            <li class="nav-item" @click="lan_Intermediate"><a href="#" class="nav-link">중급</a></li>
                                            <li class="nav-item" @click="lan_Advanced"><a href="#" class="nav-link">고급</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link">
                                        <i class="bi bi-alipay"></i>자유게시판
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link" @click="goToQna">
                                        <i class="bi bi-alipay"></i>QnA
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link">
                                        <i class="bi bi-alipay"></i>공지사항
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!-- /사이드 메뉴 -->       
                </div>
            </div>
        </div>
</template>

<script>
import { computed, onMounted} from 'vue';
import { useResize} from '@/mixin';

export default {
    setup(){
    const {headerHeight} = useResize();
    const sidebar = computed(() => {

    return { 
          
        top: `${headerHeight.value}px`,
         marginLeft: '-30rem',
        transition:'margin 0.25s ease-out',
    };

    
});
    onMounted(() => {
            window.addEventListener('resize', )
        })
    return {headerHeight, sidebar};
    },
    data() {
        return {
            offOn: false,
            width: 0,
        }
}, 
    created() {
        this.emitter.on('headerHeight', this.sidebarTop);
         window.addEventListener('resize', this.sidebarTop);
    },
    mounted() {
        this.emitter.on('SideBarMenu', this.toggleMenu);
        this.emitter.on('headerHeight', this.sidebarTop);

        // 해상도 변경시 header크기도 변경되면 그거에 맞춰서 resize 이벤트 발생
        window.addEventListener('resize', this.sidebarTop);
    },
    beforeUnmount() {
        this.emitter.off('SideBarMenu', this.toggleMenu);
        this.emitter.off('headerHeight', this.sidebarTop );

        // 해상도 변경시 header크기도 변경되면 그거에 맞춰서 resize 이벤트 발생
        window.removeEventListener('resize', this.sidebarTop);
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {

        // header에서 toggled시 메뉴가 펼쳐지고, main에 이벤트 전송
        toggleMenu() {
            this.offOn = !this.offOn;
            if (!this.offOn) {
                this.sidebar.marginLeft = '-30rem';
                this.emitter.emit('sidebar-toggled', 'closed');
            } else if (this.offOn) {
                this.sidebar.marginLeft = '0';
                this.emitter.emit('sidebar-toggled', 'open');
            }
        },
        // sidebarTop(height) {
        //     if(typeof height === 'number') {
        //         this.sidebar.top = `${height}` + 'px';
        //     } 
            
        // },
        goToQna() {
            return window.location.href = 'http://localhost:8080/qna?page=1'
            // return this.$router.push({ path:'/qna?page=1'});
        },
        han_Beginner() {
            return this.$router.push()
        }
    }
}
</script>
<style scoped>
.sidebar {
    height: 100vh;
    background: rgba(174, 190, 174, 0.7);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 2px 7px 9px #b9b9b9;
}

.bottom-border {
        border-bottom: 2px groove #eee;
    }

    .sidebar-link{
        transition: all .4s
    }

    .sidebar-link:hover {
        background-color: #83e980;
        border-radius: 5px;
    }

    .sidebar-link:visited {
        background-color: #83e980;
        border-radius: 5px;
    }
    

    .bi-house {
        margin-right: 0.2rem;
    }

    .bi-alipay {
        margin-right: 0.2rem;
    }

    @media (min-width: 969px) {

    }

</style>