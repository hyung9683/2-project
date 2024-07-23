<template>
    <div class="collapse navbar-collapse">
                <div class="container-fluid">
                    <div class="row">
                        <!-- 사이드 메뉴 -->
                        <div id="sidebar-menu" class="col-lg-2 sidebar fixed-top" style="top: 3.8rem;" :style="sidebar" :class="{'off-On': offOn}" refs="sidebar">
                            <a href="#" class="navbar-brand text-secondary text-center d-block mx-auto py-3 mb-4 bottom-border">메뉴자리</a>
                            <div class="bottom-border pb-3">
                                <i class="bi bi-person-circle mx-3 fs-3"></i>
                                <a href="#" class="text-white">관리자</a>
                            </div>
                            <ul class="navbar-nav flex-column mt-2">
                                <!-- 홈 -->
                                <li class="nav-item">
                                    <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link">
                                        <i class="bi bi-house text-white"></i>Home
                                    </a>
                                </li>
                                <!-- 한자 -->
                                <li class="nav-item">
                                    <a href="#Han" class="nav-link text-white p-3 mb-2 sidebar-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="Han">
                                        <i class="bi bi-alipay"></i>한자
                                    </a>
                                    <div class="collapse" id="Han">
                                        <ul class="navbar-nav text-white flex-column">
                                            <li class="nav-item"><a href="#" class="nav-link">초급</a></li>
                                            <li class="nav-item"><a href="#" class="nav-link">중급</a></li>
                                            <li class="nav-item"><a href="#" class="nav-link">고급</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <!-- 영어 -->
                                <li class="nav-item">
                                    <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link" data-bs-toggle="collapse" data-bs-target="#main1" aria-expanded="false">
                                        <i class="bi bi-alipay"></i>영어
                                    </a>
                                </li>
                                <!-- 수학 -->
                                <li class="nav-item">
                                    <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link">
                                        <i class="bi bi-alipay"></i>수학
                                    </a>
                                </li>
                                <!-- 국어 -->
                                <li class="nav-item">
                                    <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link">
                                        <i class="bi bi-alipay"></i>국어
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link">
                                        <i class="bi bi-alipay"></i>자유게시판
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link">
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
export default {
    data() {
    return {
        sidebar : {
            top: '3.7rem',
            marginLeft: '-20rem',
            transition: 'margin 0.25s ease-out',
        },
        offOn: false,
    }
}, 
    created() {},
    mounted() {
        this.emitter.on('SideBarMenu', this.toggleMenu);

        window.addEventListener('resize', this.emitter.on('headerHeight', height => {
            console.log(height);
            this.sidebar.top = height + 'rem';
        })  );
    },
    computed: {
    },
    methods: {
        toggleMenu() {
            this.offOn = !this.offOn;
            if (!this.offOn) {
                this.sidebar.marginLeft = '-20rem';
            } else if (this.offOn) {
                this.sidebar.marginLeft = '0';
            }
        }
    }
}
</script>
<style scoped>
.sidebar {
    height: 100vh;
    background: linear-gradient(rgba(224, 224, 224, 0.7), rgba(99, 99, 99, 0.9));
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 2px 7px 9px #b9b9b9;
}

.bottom-border {
        border-bottom: 2px groove #eee;
    }

    .sidebar-link{
        transition: all .4s;
    }

    .sidebar-link:hover {
        background-color: #df8d8d;
        border-radius: 5px;
    }

    .bi-house {
        margin-right: 0.2rem;
    }

    .bi-alipay {
        margin-right: 0.2rem;
    }

</style>