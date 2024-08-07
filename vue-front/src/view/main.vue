<template>
    <!-- 전체 화면 -->
    <div class="container" :style="sideMain" :class="{'offOn': offOn}">
        <!-- 검색 기능 -->
        <nav class="navbar navbar-expand-md navbar-light position-relative" >
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
        <div class="container-fluid" style="position:relative; top:1rem; border-left: 2px groove #eee; border-right: 2px groove #eee; min-height:300vh" id="content">
            <div class="d-flex text-align-center" id="MainContent">
                <!-- 공지사항 -->
                <div class="col-4 noticeMain" style="border-right: 2px groove #eee; padding-right:0.7rem; max-height:100%;">
                    <div style="text-align: center; padding-bottom: 2px; border-bottom: 2px;">공지사항</div>
                        <div v-for="(notice, i) in notices" :key="i" class="mt-2 announcmentMainList" style="text-align: center;">
                            <div class="announcment pb-1">{{ notice.notice_tit }}</div>
                            <div class="border-bottom pb-2 noticeContent">{{ notice.notice_content }}</div>
                        </div>
                </div>
                <!-- /공지사항 -->
                 <!-- 로그인 했을시 나오는 푼 퀴즈 -->
                    <div class="col-8 quizMainList" style="max-height:100%;">
                        <div class="col-12 border-bottom pb-4 mb-4" style="margin-left:1.5rem; padding-left:1.8rem; padding-right:0.2rem; align-content: center; max-height:100vh">
                            <div class="pb-4 currentQui" style="text-align: center;">최근에 푼 퀴즈</div>
                            <div class="mt-2">
                                <div class="row col-4 imageQuiz" style="text-align: center;">
                                    <div class="card" style="padding:0; margin:auto; width:100%; height:16rem;" v-for="(item, i) in currentQuiz" :key="i">
                                        <div v-if="this.user.user_no == item.user_no">
                                            <img class="card-img-top" style="padding-right:0; border:none; max-width: auto; max-height: auto; box-shadow: 0 1px 0; text-align: center;" :src="thImage ? require(`../../../node-back/uploads/${item.quiz_thimg}`) : require(`../../goodsempty.jpg`)"/>
                                            <div class="card-body p-0">
                                                <div class="card-title text-dark" style="font-size: 16px;">
                                                   제목:{{ item.quiz_tit}}
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <!-- /로그인 했을시 나오는 푼 퀴즈 -->
                         <!-- 인기 퀴즈 -->
                        <div class="col-12 border-bottom pb-4" style="margin-left:1.5rem; padding-left:1.8rem; padding-right:0.2rem; align-content: center; max-height:100vh">
                            <div class="pb-4 bestQui" style="text-align: center;">인기 퀴즈</div>
                                <div class="mt-2">
                                    <div class="row col-4 imageQuiz" style="text-align:center;">
                                        <div class="card" style="padding:0; margin:auto; width:100%; height:16rem;" v-for="(item, i) in bestList" :key="i">
                                            <img class="card-img-top" style="padding-right:0; border:none; max-width: auto; max-height: auto; box-shadow: 0 1px 0; text-align: center;" :src="thImage ? require(`../../../node-back/uploads/${item.quiz_thimg}`) : require(`../../goodsempty.jpg`)"/>
                                            <div class="card-body p-0">
                                                <div class="card-title text-dark" style="font-size: 16px;">
                                                   제목:{{ item.quiz_tit}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <!-- /인기 퀴즈 -->
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
        offOn: false,
        quiz: {},
        bestList: {},
        thImage: {},
        notices: {},
        isLoading: true,
        sideMainTop: '0',
        currentQuiz: {},
    }
}, 
    created() {
        this.currentList();
        this.noticeList();
        this.QuizList();
        this.emitter.on('sidebar-toggled', this.toggleMain);
        this.emitter.on('headerHeight', this.sideHeight);
    },
    mounted() {
        // MenuLayout이 펼쳐지고 접혀질때 main화면의 이동여부
         this.emitter.on('sidebar-toggled', this.toggleMain);
        this.noticeList();
        this.QuizList();
        this.currentList();

    },
    beforeUnmount() {
        this.emitter.off('sidebar-toggled', this.toggleMain);
    },
    computed: {

        user() {
            return this.$store.state.user;
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
        sideMain() {
            return {
                top: `${this.computedTop}px`,
                position:'relative',
                transition:'transform 0.25s ease-out',
                transform: '',
                left: '0',
            }
        }
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

        async QuizList() {

            try {
                const response = await axios.get(`http://localhost:3000/quiz/quizList`);
                // console.log(response.data.results);
                
                if (response.data.message === 'success') {
                    this.bestList = response.data.results;
                    // this.thImage = response.data.results.quiz_thimg;
                    for (this.thImage of this.bestList) {
                        // console.log(this.thImage.quiz_thimg);
                        
                    }
                }
            } catch(error) {

                console.error(error);

             }
        },
        async noticeList() {

            try {
                const response = await axios.get(`http://localhost:3000/notice/noticeList`);
                if(response.data.message === 'success') {
                    // console.log(response.data.results);
                    // console.log(response.data.message);
                   return this.notices = response.data.results;
                }
            } catch(error) {
                console.error('에러 발생:', error);
            }
        },

        async currentList() {

            try {
                const response = await axios.get(`http://localhost:3000/quiz/currentQuiz`);
            
                if(response.data.message == 'success') {
                    this.currentQuiz = response.data.results;
                    console.log(this.currentQuiz);
                    

                    for (this.thImage of this.currentQuiz) {
                        
                        if(this.isMounted){
                            console.log(this.thImage.quiz_thimg);
                        }
                        
                    }
                 }   
            } catch (error) {
                console.error(error);
                
            }
            
        }
    }
}
</script>
<style scoped>
#MainContent {
        height: auto;
        /* margin-left: 0;
        transition: margin 0.25s ease-out; */
    }

/* .search-input {
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
    } */

    .imageQuiz {
        display: grid;
        position: relative;
        grid-template-columns: repeat(3, 1fr);
        gap:20px;
        width: 100%;
        text-align: center;
        vertical-align: middle;
        align-items: center;
        justify-content: center;
        max-height: 100%;
    }

    .noticeMain {
        background-color: #f1cdbb;
        margin-left: -15px;
        margin-right: -15px;
        padding-left: 15px;
        padding-right: 15px;
    }

    .bestQui {
        background-color: #c4f3dd
    }

    .quizMainList {
        margin-left: -15px;
        margin-right: -15px;
        padding-left: 15px;
        padding-right: 15px;
    }

</style>