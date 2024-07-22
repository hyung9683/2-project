<template>
<nav>
    <div class="collapse navbar-collapse" id="sidebar">
                <div class="container-fluid">
                    <div class="row">
                        <!-- 사이드 메뉴 -->
                        <div id="sidebar-menu" class="col-lg-2 sidebar fixed-top">
                            <a href="#" class="navbar-brand text-white text-center d-block mx-auto py-3 mb-4 bottom-border">메뉴자리</a>
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
    </nav>
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