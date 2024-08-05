<template>
    <!-- 전체 화면 -->
    <div class="container" :style="sideMain" :class="{'offOn': offOn}" style="top: 3rem;">
        <!-- 검색 기능 -->
        <nav class="navbar navbar-expand-md navbar-light position-relative">
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
                    <div style="text-align: center;">공지사항</div>
                    <div class="mt-2 announcmentMainList" style="text-align: center;">
                        <div v-for="notice in contentlist" :key="notice.notice_no" class="border-bottom pb-2 announcment" @click="handlenoticeClick(notice.notice_no)">
                            {{ notice.notice_tit }}
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="col-12 border-bottom" style="padding-right:0.7rem; padding-bottom: 2rem; margin-left:0.7rem;">
                        <div class="currentQui" style="text-align: center;">최근에 푼 퀴즈</div>
                        <div class="mt-2 imageQuiz">
                            <div class="grid-container">
                                <div class="card" v-for="(quiz, i) in recentQuizzes.slice(0, 6)" :key="i" @click="handleCardClick(quiz.quiz_no)">
                                    <img class="card-img-top img-fluid" :src="`http://localhost:3000/uploads/${quiz.quiz_thimg}`" :alt="quiz.quiz_tit" />
                                    <div class="card-body">
                                        <div class="card-title">
                                            <div>{{ quiz.quiz_tit }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12" style="margin-left:0.7rem; padding-right: 1.2rem; padding-top: 2rem;">
                        <div class="bestQui" style="text-align: center;">인기 퀴즈</div>
                        <div class="mt-2 imageQuiz">
                            <div class="grid-container">
                                <div class="card" v-for="(item, i) in bestList" :key="i" @click="handleCardClick(item.quiz_no)">
                                    <img class="card-img-top img-fluid" :src="`http://localhost:3000/uploads/${item.quiz_thimg}`" :alt="item.quiz_tit" />
                                    <div class="card-body">
                                        <div class="card-title">
                                            <div>{{ item.quiz_tit }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                position: 'relative',
                transition: 'transform 0.25s ease-out',
                transform: '',
                top: '0',
                left: '0'
            },
            offOn: false,
            quiz: {},
            bestList: [],
            recentQuizzes: [],  // 최근 푼 퀴즈 데이터 추가
            contentlist: []     // 공지사항 데이터 추가
        };
    },
    created() {
        this.emitter.on('sidebar-toggled', this.toggleMain);
        this.emitter.on('headerHeight', this.sideHeight);
        this.loadRecentQuizzes();  // 최근 푼 퀴즈 데이터 로드
        this.loadBestList();  // 인기 퀴즈 데이터 로드
        this.loadNotices();  // 공지사항 데이터 로드
    },
    mounted() {
        this.emitter.on('sidebar-toggled', this.toggleMain);
    },
    beforeUnmount() {
        this.emitter.off('sidebar-toggled', this.toggleMain);
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        toggleMain(state) {
            this.offOn = !this.offOn;
            if (state === 'open' && !this.offOn) {
                this.sideMain.transform = 'translateX(9rem)';
            } else if (state === 'closed' && this.offOn) {
                this.sideMain.transform = 'translate(0)';
            }
        },
        async loadRecentQuizzes() {
            try {
                const response = await axios.get('http://localhost:3000/quiz/recent-quizzes');
                this.recentQuizzes = response.data;
            } catch (error) {
                console.error('최근 푼 퀴즈 로드 중 오류 발생:', error);
            }
        },
        async loadBestList() {
            try {
                const response = await axios.get('http://localhost:3000/quiz/list');
                if (response.data) {
                    this.bestList = response.data
                        .sort((a, b) => b.quiz_view - a.quiz_view) // 조회수 기준 내림차순 정렬
                        .slice(0, 6); // 상위 6개 선택
                }
            } catch (error) {
                console.error('인기 퀴즈 로드 중 오류 발생:', error);
            }
        },
        async loadNotices() {
            try {
                const response = await axios.get('http://localhost:3000/notice/notice_titles');
                this.contentlist = response.data;
            } catch (error) {
                console.error('공지사항 로드 중 오류 발생:', error);
            }
        },
        handleCardClick(quizNo) {
            axios.post(`http://localhost:3000/quiz/view/${quizNo}`)
              .then(() => {
                this.$router.push(`/quiz/${quizNo}`);
              })
              .catch(error => {
                console.error('조회 수 업데이트 중 오류 발생:', error);
              });
        },
         // 게시글 상세 페이지로 이동
  handlenoticeClick(notice_no) {
    // 게시글 조회수 증가 요청
    axios.post("http://localhost:3000/notice/incrementnoticeView", { notice_no })
      .then(() => {
        // 조회수 증가 후 상세 페이지로 이동
        this.$router.push({
          path: `/admin/notice/noticeDetail`,
          query: { notice_no },
        });
      })
      .catch((err) => {
        console.error("게시글 조회수 증가 중 오류:", err);
      });
  },
    }
}
</script>

<style scoped>
#MainContent {
    height: 100vh;
}

/* 검색 입력 필드 */
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

/* 검색 버튼 */
.search-button {
    border-radius: 50%;
    padding: 10px 16px;
    transition: all .4s;
}

.search-button:hover {
    background-color: #eee;
    transform: translateY(-1px);
}

/* 카드 이미지의 스타일을 설정합니다 */
.card-img-top {
    width: 100%;  /* 카드의 너비를 100%로 설정 */
    height: 150px; /* 고정된 높이 값 */
    object-fit: cover; /* 이미지가 카드 영역을 꽉 채우도록 설정 */
    border-bottom: 1px solid #ddd; /* 이미지 아래에 경계선 추가 */
}

/* 카드의 스타일을 설정합니다 */
.card {
    margin-bottom: 1rem; /* 카드 간의 간격 설정 */
}

/* 이미지 카드의 크기 및 여백을 설정합니다 */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 가로 3개 열 */
    gap: 1rem; /* 카드 간의 간격 */
}

/* 카드의 크기와 높이를 설정하여 정사각형으로 맞춤 */
.card {
    height: 200px; /* 카드의 고정된 높이 값 */
}

/* 공지사항 및 퀴즈 제목 스타일 */
.currentQui, .bestQui {
    text-align: center;
    font-size: 1.5rem; /* 제목 글씨 크기 통일 */
    font-weight: bold;
    overflow: hidden; /* 넘치는 텍스트 숨기기 */
    white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정 */
    text-overflow: ellipsis; /* 넘치는 텍스트에 '...' 추가 */
}

/* 최근 푼 퀴즈와 인기 퀴즈의 제목에 적용될 공통 스타일 */
.announcment, .card-title {
    text-align: center;
    overflow: hidden; /* 넘치는 텍스트 숨기기 */
    white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정 */
    text-overflow: ellipsis; /* 넘치는 텍스트에 '...' 추가 */
}

</style>