<template>
    <!-- 전체 화면 -->
    <div class="container" :style="sideMain" :class="{'offOn': offOn}">
        <!-- 검색 기능 -->
        <nav class="navbar navbar-expand-md navbar-light position-relative" >
            <div class="col-md-4"></div>
            <div class="col-md-5">
                <form class="search_form">
                    <div class="input-group">
                        <select @change="handleEventMain($event)">
                            <option disabled value="" selected>카테고리</option>
                            <option value="한자">한자</option>
                            <option value="수학">수학</option>
                            <option value="영어">영어</option>
                            <option value="국어">국어</option>
                        </select>
                        <input type="text" class="form-control search-input" placeholder="Search...." v-model="searchMain">
                        <button type="button" class="btn btn-light search-button" @click="submitMain">
                            <i class="bi bi-search text-danger"></i>
                        </button>
                    </div>
                </form>
            </div>
        </nav>
        <!-- 검색할 시 나오는 화면 -->
                <div class="container-fluid" style="position:relative; top:1rem; border-left: 2px groove #eee; border-right: 2px groove #eee; min-height:300vh; padding-left: 3.6rem;" id="content" v-if="searchMain !== '' && searchList.length > 0 && submitMain">
                    <div class="col-12 quizMainList" style="max-height:100%;">
                            <div class="pb-2 mb-3 pe-2 border-bottom text-start currentQui" style="text-align: center; margin-right: 5rem;">{{ selectCategory }}</div>
                            <div class="mt-2">
                                <div class="row col-4 pb-5 border-bottom searchQuiz" style="text-align: center;">
                                    <div class="pb-4 border-bottom col-12 level">초급</div>
                                    <div class="card" style="padding:0; margin:auto; width:100%; height:16rem;" v-for="(item, i) in searchList" :key="i">
                                        <div class="beginner" v-if="item.quiz_level == 1" @click="goToQuizDetail(item.quiz_category,item.quiz_level,item.quiz_no)">
                                         <img class="card-img-top" style="padding-right:0; border:none; max-width: auto; max-height: auto; box-shadow: 0 1px 0; text-align: center;" :src="thImage ? require(`../../../node-back/uploads/${item.quiz_thimg}`) : require(`../../goodsempty.jpg`)"/>
                                            <div class="card-body p-0">
                                                <div class="card-title text-dark" style="font-size: 16px;">
                                                   제목:{{ item.quiz_tit}}
                                                </div>
                                            </div>
                                     </div>
                                    </div>
                                    <div class="pb-4 border-bottom col-12 level">중급</div>
                                        <div class="card" style="padding:0; margin:auto; width:100%; height:16rem;" v-for="(item, i) in searchList" :key="i">
                                            <div class="middle" v-if="item.quiz_level == 2" @click="goToQuizDetail(item.quiz_category,item.quiz_level,item.quiz_no)">
                                            <img class="card-img-top" style="padding-right:0; border:none; max-width: auto; max-height: auto; box-shadow: 0 1px 0; text-align: center;" :src="thImage ? require(`../../../node-back/uploads/${item.quiz_thimg}`) : require(`../../goodsempty.jpg`)"/>
                                                <div class="card-body p-0">
                                                    <div class="card-title text-dark" style="font-size: 16px;">
                                                    제목:{{ item.quiz_tit}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="pb-4 border-bottom col-12 level">고급</div>
                                        <div class="card" style="padding:0; margin:auto; width:100%; height:16rem;" v-for="(item, i) in searchList" :key="i">
                                            <div class="advance" v-if="item.quiz_level == 3" @click="goToQuizDetail(item.quiz_category,item.quiz_level,item.quiz_no)">
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
                </div>
        <!-- /검색할 시 나오는 화면 -->
    <!-- /검색 기능 -->
         <!-- 메인 화면 -->
        <div class="container-fluid" style="position:relative; top:1rem; border-left: 2px groove #eee; border-right: 2px groove #eee; min-height:300vh" id="content" v-else>
            <div class="d-flex text-align-center" id="MainContent">
                <!-- 공지사항 -->
                <div class="col-4 noticeMain" style="border-right: 2px groove #eee; padding-right:0.7rem; max-height:100%;" >
                    <div style="text-align: center; padding-bottom: 2px; border-bottom: 2px;">공지사항</div>
                        <div v-for="(notice, i) in notices" :key="i" class="mt-2 announcmentMainList" style="text-align: center;">
                            <div @click="goToNoticeDeatil(notice.notice_no)">
                                <div class="announcment pb-1">{{ notice.notice_tit }}</div>
                                <div class="border-bottom pb-2 noticeContent">{{ notice.notice_content }}</div>
                            </div>
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
                                        <div v-if="this.user.user_no == item.user_no" @click="goToQuizDetail(item.quiz_category,item.quiz_level,item.quiz_no)">
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
                                            <div @click="goToQuizDetail(item.quiz_category,item.quiz_level,item.quiz_no)">
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
        thImage: {},
        notices: {},
        isLoading: true,
        sideMainTop: '0',
        currentQuiz: {},
        // allQuiz: {},
        category: {},
        level: {},
        searchMain: '',
        selectCategory: '',
        searchList: {},
        // sliceList: [],
        bestList:{},
        
        
    }
}, 
    created() {
        this.currentList();
        this.noticeList();
        this.QuizList();
        this.emitter.on('sidebar-toggled', this.toggleMain);
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
        },
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
                
                if (response.data.message === 'success') {

                    this.bestList = response.data.results;

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
                            // console.log(this.thImage.quiz_thimg);
                        }
                        
                    }
                 }   
            } catch (error) {
                console.error(error);
                
            }
            
        },
        async submitMain() {
            try { 

                        const response = await axios.post(`http://localhost:3000/quiz/quizSearch`, 
                        {
                            // 검색한 문자열과 선택한 카테고리
                            search_results: this.searchMain,
                            quiz_category: this.selectCategory,
                        
                    });

                    if(response.data.message == 'success') {
                        console.log('서버에서 갖고온 데이터:' ,response.data.results);
                        
                       return this.searchList = response.data.results

                    }
                
            } catch(error) {

                console.error('에러 발생:', error);
                
            }
        },
        handleEventMain(event) {
            console.log(event);
            
            this.selectCategory = event.target.value;

            console.log(this.selectCategory);
        },

        goToQuizDetail(category, level, quizNo) {

            axios.post(`http://localhost:3000/quiz/view/${quizNo}`)
                .then(() => {

                    
                    this.$router.push(`/quiz/${category}/${level}/${quizNo}`);
                    console.log(`${category}/${level}/${quizNo}`);
                    
                })
                .catch(error => {
                    console.error('조회 수 업데이트 중 오류 발생:', error);
                });

        },
        goToNoticeDeatil(notice_no) {

                return this.$router.push({path: `/notice/noticeDetail`, query:{notice_no}});

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
        grid-template-rows: auto;
        gap:20px;
        width: 100%;
        text-align: center;
        vertical-align: middle;
        align-items: center;
        justify-content: center;
        max-height: 100%;
    }

    .searchQuiz {
        display: grid;
        position: relative;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: auto;
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

    .searchQuiz .level {
        grid-column: 1 / -1;
    }

</style>