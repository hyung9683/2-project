<template>
    <!-- 전체 화면 -->
    <div class="container" :style="sideMain" :class="{'offOn': offOn}">
        <!-- 검색 기능 -->
        <nav class="navbar navbar-expand-md navbar-light position-relative" style="top: 3rem;">
            <div class="col-md-4"></div>
            <div class="col-md-5">
                <form action="">
                    <div class="input-group">
                        <input type="text" class="form-control search-input" placeholder="Search....">
                        <button type="button" class="btn btn-light search-button">
                            <i class="bi bi-search text-danger"></i>
                        </button>
                    </div>
                </form>
            </div>
        </nav>
        <!-- /검색 기능 -->
         <!-- 메인 화면 -->
        <div class="container-fluid" style="position:relative; top:5rem; border-left: 2px groove #eee; border-right: 2px groove #eee;" id="content">
            <div class="d-flex text-align-center" id="MainContent">
                <div class="col-4" style="border-right: 2px groove #eee; padding-right:0.7rem;">
                    <div class="bestQui" style="text-align: center;">인기 퀴즈</div>
                        <div class="mt-2 imageQuiz">
                            <div class="container-fluid" style="text-align: center; box-shadow: 0 1px 0;">
                                <div class="card" v-for="(item, i) in bestList" :key="i">
                                    <img class="card-img-top img-fluid " :src="thImage" />
                                    <div class="card-body">
                                        <div class="card-title">
                                            <div>{{ item.quiz_tit}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="container-fluid" style="text-align: center; box-shadow: 0 1px 0;">
                                <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                                <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                                <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                            </div> -->
                        </div>
                    </div>
                <div class="col-4" style="border-right: 2px groove #eee; padding-right:0.7rem; margin-left:0.7rem;">
                    <div class="currentQui" style="text-align: center;">최근에 푼 퀴즈</div>
                    <div class="mt-2 imageQuiz">
                        <div class="container-fluid" style="text-align: center; box-shadow: 0 1px 0;">
                            <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                            <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                            <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                        </div>
                        <div class="container-fluid" style="text-align: center; box-shadow: 0 1px 0;">
                            <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                            <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                            <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                        </div>
                    </div>
                </div>
                <div class="col-4" style="margin-left:0.7rem; padding-right: 1.2rem;">
                    <div style="text-align: center;">공지사항</div>
                    <div class="mt-2 announcmentMainList">
                        <div class="bottom-border pb-2 announcment">공지사항 첫번째 작성</div>
                        <div class="bottom-border pb-2 announcment">공지사항 첫번째 작성</div>
                        <div class="bottom-border pb-2 announcment">공지사항 첫번째 작성</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /메인 화면 -->
    </div>
    <!-- /전체 화면 -->
</template>

<script>

import axios from 'axios';

export default {
    data() {
    return {
        sideMain: {
            position:'relative',
            transition:'transform 0.25s ease-out',
            transform: '',
            top: '0',
            left: '0'
        },
        offOn: false,
        quiz: {},
        bestList: {},
        thImage: {},
    }
}, 
    created() {
        this.emitter.on('sidebar-toggled', this.toggleMain);
        this.emitter.on('headerHeight', this.sideHeight);
    },
    mounted() {
        // MenuLayout이 펼쳐지고 접혀질때 main화면의 이동여부
         this.emitter.on('sidebar-toggled', this.toggleMain);
         this.sideHeight();


        window.addEventListener('resize', this.sideHeight);
    },
    beforeUnmount() {
        this.emitter.off('sidebar-toggled', this.toggleMain);
        this.emitter.on('headerHeight', this.sideHeight);

        window.removeEventListener('resize', this.sideHeight);
    },
    computed: {
        // toggle() {
        //     return this.emitter.on('sidebar-toggled', this.toggledMain);
        // }
    },
    methods: {
        toggleMain(state) {
            this.offOn = !this.offOn
            if (state === 'open'&& !this.offOn) {
                this.sideMain.transform = 'translateX(9rem)';
            } else if(state === 'closed' && this.offOn) {
                this.sideMain.transform = 'translate(0)';
            }
        },

        sideHeight(height) {
            if (typeof height == 'number') {
                this.sideMain.top = height + 'rem';
            } 
        },
        async QuizList() {

            try {
                const response = await axios.get(`http://localhost:3000/quiz/quizList`);
                
                if (response.message === 'success') {
                    this.besList = response.data;
                }
            } catch(error) {

                console.error(error);

             }
        },
    }
}
</script>
<style scoped>
#MainContent {
        height: 100vh;
        /* margin-left: 0;
        transition: margin 0.25s ease-out; */
    }

.search-input {
        background: transparent;
        border: none;
        border-radius: 0;
        border-bottom: 2px solid #e2e2e2;
        transition: all .4s;
    }

    .search-input:focus {
        background: transparent;
        box-shadow: none;
        border-bottom: 2px solid #dc3545;
    }

    .search-button {
        border-radius: 50%;
        padding: 10px 16px;
        transition: all .4s;
    }

    .search-button:hover {
        background-color: #eee;
        transform: translateY(-1px);
    }
</style>