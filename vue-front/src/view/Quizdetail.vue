<template>
  <div class="container">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <div class="content">
      <!-- 일반 퀴즈 카드들 -->
      <div class="quiz-card-container">
        <div class="quiz-card" v-for="quiz in quizzes" :key="quiz.quiz_no">
          <div class="quiz-card-content">
            <img 
              :src="getImageUrl(quiz)" 
              alt="섬네일 이미지" 
              class="card-thumbnail"
            >
            <div class="quiz-detail">
              <h3>{{ quiz.quiz_tit }}</h3>
              <p>{{ quiz.quiz_content }}</p>
            </div>
            <!-- 버튼 영역 -->
            <div class="button-container">
              <div class="button-row">
                <button @click="navigateToStart(10)" aria-label="10개 풀기" type="button" class="ant-btn ant-btn-default">
                  <span>10개 풀기</span>
                </button>
                <button @click="navigateToStart(20)" aria-label="20개 풀기" type="button" class="ant-btn ant-btn-default">
                  <span>20개 풀기</span>
                </button>
                <button @click="navigateToStart(30)" aria-label="30개 풀기" type="button" class="ant-btn ant-btn-default">
                  <span>30개 풀기</span>
                </button>
              </div>
            </div>
            <!-- 댓글 작성 및 리스트 -->
            <div class="comment-section">
              <h2>댓글</h2>
              <form @submit.prevent="submitComment">
                <textarea v-model="newComment" placeholder="댓글을 입력하세요..." rows="4" required></textarea>
                <button type="submit">댓글 작성</button>
              </form>
              <div class="comment-list" ref="commentList">
                <div class="comment" v-for="comment in comments" :key="comment.id">
                  <p><strong>{{ comment.user_nick }}</strong>: {{ comment.text }}</p>
                  <div class="comment-buttons">
                    <button @click="deleteComment(comment.id)" class="delete-button" aria-label="댓글 삭제">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                    <button @click="reportComment(comment.id)" class="report-button" aria-label="댓글 신고">
                      <i class="fas fa-flag"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Top Quizzes -->
      <div class="top-quizzes">
        <h2>상위 4개의 퀴즈</h2>
        <div class="top-quiz-grid">
          <div class="top-quiz-card" v-for="quiz in topQuizzes" :key="quiz.quiz_no" @click="navigateToQuizDetail(quiz.quiz_no)">
            <img :src="getImageUrl(quiz)" alt="퀴즈 이미지" class="quiz-image">
            <div class="quiz-details">
              <h3>{{ quiz.quiz_tit }}</h3>
              <p>{{ quiz.quiz_content }}</p>
              <p>조회수: {{ quiz.quiz_view }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Report Popup -->
    <div v-if="showReportPopup" class="report-popup">
      <div class="report-popup-content">
        <h2>댓글 신고</h2>
        <button @click="closeReportPopup" class="close-button">&times;</button>
        <div>
          <label>신고유형</label>
          <div>
            <label>
              <input type="radio" value="비속어 사용" v-model="selectedReport.type" /> 비속어 사용
            </label>
            <label>
              <input type="radio" value="분란 조장" v-model="selectedReport.type" /> 분란 조장
            </label>
            <label>
              <input type="radio" value="스팸/광고" v-model="selectedReport.type" /> 스팸/광고
            </label>
            <label>
              <input type="radio" value="개인정보 노출" v-model="selectedReport.type" /> 개인정보 노출
            </label>
          </div>
        </div>
        <div>
          <label>신고 내용:</label>
          <textarea v-model="selectedReport.content"></textarea>
        </div>
        <button @click="handleReport">신고하기</button>
        <button @click="closeReportPopup" style="background-color:#e6c9a7">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      topQuizzes: [],
      quizzes: [],
      quizNo: this.$route.params.quizNo,
      quizCategory: null,
      comments: [],
      newComment: '',
      showReportPopup: false,
      selectedReport: {
        type: '',
        content: ''
      },
      reportCommentId: null
    };
  },
  computed: {
    ...mapState(['user']),
    userNo() {
      return this.user.user_no;
    },
    userNick() {
      return this.user.user_nick;
    }
  },
  mounted() {
    this.loadQuizzes();
    this.loadComments();
  },
  computed: {

      headerHeight() {
        return this.$store.state.headerHeight;
      },

      NaviHeight() {
        return this.$store.state.naviHeight;
      },

      baseTop() {
        return parseInt(this.detailTop || '0', 10);
      },

      computedTop() {
        const headHeight = this.headerHeight;
        const baseTop = this.baseTop;
        const naviHeight = this.NaviHeight;
        if(!isNaN(headHeight) && !isNaN(baseTop) && !isNaN(naviHeight)) {

          return baseTop + headHeight + naviHeight ;
        }
        console.log(baseTop);
        return baseTop;
      },
      quizDetail() {
        return {
          top:`${this.computedTop}px`,
        };
      },
 
  },
  watch: {
    quizCategory(newCategory) {
      if (newCategory) {
        this.loadTopQuizzes();
      }
    },
    '$route.params.quizNo'(newQuizNo) {
      this.quizNo = newQuizNo;
      this.loadQuizzes();
      this.loadComments();
    }
  },
  methods: {
    loadQuizzes() {
      if (!this.quizNo) {
        console.error('퀴즈 번호가 없습니다.');
        return;
      }

      axios.get(`http://localhost:3000/quiz/detail/${this.quizNo}`)
        .then(response => {
          this.quizzes = [response.data];
          this.quizCategory = response.data.quiz_category;
        })
        .catch(error => {
          console.error('퀴즈 로드 중 오류 발생:', error);
        });
    },
    loadTopQuizzes() {
      if (!this.quizCategory) {
        console.error('퀴즈 카테고리가 설정되지 않았습니다.');
        return;
      }

      axios.get(`http://localhost:3000/quiz/top-quizzes/${this.quizCategory}`)
        .then(response => {
          this.topQuizzes = response.data;
        })
        .catch(error => {
          console.error('상위 퀴즈 로드 중 오류 발생:', error);
        });
    },
    loadComments() {
      axios.get(`http://localhost:3000/quiz/commentlist/${this.quizNo}`)
        .then(response => {
          this.comments = response.data.map(comment => ({
            id: comment.id,
            text: comment.text,
            user_nick: comment.nick,
            createdAt: comment.createdAt
          }));
        })
        .catch(error => {
          console.error('댓글 로드 중 오류 발생:', error);
        });
    },
    getImageUrl(quiz) {
      return `http://localhost:3000/uploads/${quiz.quiz_thimg}`;
    },
    navigateToStart(numberOfQuizzes) {
      if (!this.quizNo) {
        console.error('퀴즈 번호가 없습니다.');
        return;
      }
      this.$router.push({ name: 'StartPage', params: { quizNo: this.quizNo }, query: { count: numberOfQuizzes } });
    },
    navigateToQuizDetail(quizNo) {
      this.incrementQuizView(quizNo);
    },
    incrementQuizView(quizNo) {
      axios.post(`http://localhost:3000/quiz/view/${quizNo}`)
        .then(() => {
          this.updateQuizView(quizNo)
            .then(() => {
              this.loadTopQuizzes();
              this.$router.push({ name: 'QuizPage', params: { quizNo } });
            });
        })
        .catch(error => {
          console.error('조회 수 증가 중 오류 발생:', error);
          this.$router.push({ name: 'QuizPage', params: { quizNo } });
        });
    },
    updateQuizView(quizNo) {
      return axios.get(`http://localhost:3000/quiz/detail/${quizNo}`)
        .then(response => {
          const updatedQuiz = response.data;
          const index = this.topQuizzes.findIndex(quiz => quiz.quiz_no === quizNo);
          if (index !== -1) {
            this.$set(this.topQuizzes, index, updatedQuiz);
          }
        })
        .catch(error => {
          console.error('퀴즈 업데이트 중 오류 발생:', error);
        });
    },
    submitComment() {
      if (!this.newComment || !this.userNo) {
        alert('댓글을 입력하거나 사용자 정보를 확인하세요.');
        return;
      }

      axios.post(`http://localhost:3000/quiz/comments/${this.quizNo}`, {
        text: this.newComment,
        userNo: this.userNo
      })
      .then(() => {
        this.newComment = '';
        this.loadComments();
      })
      .catch(error => {
        console.error('댓글 작성 중 오류 발생:', error);
      });
    },
    deleteComment(commentId) {
    if (!this.userNo) {
        alert('사용자 정보를 확인하세요.');
        return;
    }

    axios.delete(`http://localhost:3000/quiz/delete/${this.quizNo}/${commentId}`, {
        data: { userNo: this.userNo } // 사용자 ID를 요청 본문에 포함
    })
    .then(() => {
        this.loadComments();
    })
    .catch(error => {
        console.error('댓글 삭제 중 오류 발생:', error);
        alert('아이디가 다릅니다');
    });
},
    reportComment(commentId) {
      this.reportCommentId = commentId;
      this.showReportPopup = true;
    },
    handleReport() {
    if (!this.selectedReport.type || !this.selectedReport.content) {
      alert('신고 유형과 내용을 모두 입력하세요.');
      return;
    }

    const reportData = {
      comment_id: this.reportCommentId,
      type: this.selectedReport.type,
      content: this.selectedReport.content,
      user_no: this.userNo // 추가된 부분
    };

    axios.post('http://localhost:3000/quiz/report', reportData)
      .then(() => {
        alert('신고가 접수되었습니다.');
        this.closeReportPopup();
      })
      .catch(error => {
        console.error('신고 처리 중 오류 발생:', error.response ? error.response.data : error.message);
      });
  },
    closeReportPopup() {
      this.showReportPopup = false;
      this.selectedReport = {
        type: '',
        content: ''
      };
      this.reportCommentId = null;
    }
  }
};
</script>

<style scoped>
 .container {
  position: relative;
    top: 100px;
    padding-top: 60px; /* 상단 여백 제거 */
    background-color: #eff9e9;
}

.content {
  display: flex;
  gap: 30px; /* 섹션 간의 간격을 조정 */
}

.quiz-card-container {
  flex: 2;
}

.quiz-card {
  margin-bottom: 30px; /* 각 퀴즈 카드 사이에 여백 추가 */
}

.quiz-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px; /* 이미지와 버튼, 댓글 사이 여백 조정 */
}

.card-thumbnail {
  width: 300px;
  height: 200px;
  object-fit: cover;
}

.quiz-detail {
  text-align: center;
}

.quiz-detail h3 {
  margin: 0;
  font-size: 20px; /* 제목 폰트 크기 조정 */
}

.quiz-detail p {
  margin: 0;
  font-size: 16px; /* 단락 폰트 크기 조정 */
}

/* 버튼 영역 스타일 */
.button-container {
  display: flex;
  flex-direction: column;
  gap: 15px; /* 버튼들 사이의 간격 조정 */
  width: 100%;
  margin-top: 30px; /* 이미지와 버튼 사이 여백 조정 */
  align-items: center; /* 버튼들을 가운데 정렬 */
}

.button-row {
  display: flex;
  gap: 25px; /* 버튼들 사이의 간격 조정 */
  justify-content: center; /* 버튼들을 가운데 정렬 */
}

/* 버튼 스타일 */
.ant-btn {
  padding: 12px 24px; /* 버튼 패딩 조정 */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px; /* 버튼 폰트 크기 조정 */
}

.ant-btn:hover {
  background-color: #0056b3;
}

/* 댓글 입력 영역 및 버튼 스타일 */
.comment-section {
  margin-top: 30px; /* 댓글 입력 영역 상단 여백 조정 */
  width: 100%;
}

.comment-section textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 18px; /* 텍스트 영역 폰트 크기 조정 */
  resize: vertical;
}

.comment-section button {
  padding: 12px 24px; /* 댓글 작성 버튼 패딩 조정 */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px; /* 버튼 폰트 크기 조정 */
}

.comment-section button:hover {
  background-color: #0056b3;
}

/* 댓글 리스트 스타일 */
.comment-list {
  margin-top: 30px; /* 댓글 리스트 상단 여백 조정 */
}

.comment {
  position: relative;
  padding: 12px; /* 댓글 패딩 조정 */
  border-bottom: 1px solid #eee;
}

.comment:last-child {
  border-bottom: none;
}

.comment-buttons {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 10px; /* 댓글 버튼 사이 여백 조정 */
}

.comment-buttons button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.comment-buttons i {
  font-size: 18px; /* 아이콘 크기 조정 */
  color: gray;
}

.comment-buttons button:hover i {
  color: darkgray;
}

/* 상위 퀴즈 카드 스타일 */
.top-quizzes {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 상위 퀴즈 카드 간의 간격 조정 */
}

.top-quiz-grid {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 상위 퀴즈 카드 간의 간격 조정 */
}

.top-quiz-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px; /* 이미지와 텍스트 사이 여백 조정 */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px; /* 카드 패딩 조정 */
  background: #fff;
  max-width: 100%; /* 카드의 최대 너비를 컨테이너에 맞게 설정 */
  box-sizing: border-box; /* 패딩과 테두리를 포함한 전체 크기 계산 */
}

.quiz-image {
  width: 120px; /* 이미지 너비 조정 */
  height: 120px; /* 이미지 높이 조정 */
  object-fit: cover; /* 이미지 비율을 유지하면서 카드에 맞게 조정 */
}

.quiz-details {
  flex: 1;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  max-width: calc(100% - 130px); /* 이미지 너비와 여백을 고려한 최대 너비 설정 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 카드의 제목과 내용에 대한 스타일 */
.quiz-details h3 {
  margin: 0;
  font-size: 18px; /* 제목 폰트 크기 조정 */
}

.quiz-details p {
  margin: 0;
  font-size: 14px; /* 단락 폰트 크기 조정 */
}

.comment-buttons {
  display: flex;
  gap: 10px; /* 버튼들 사이 간격 조정 */
}

.comment-buttons button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  color: gray;
}

.comment-buttons i {
  font-size: 18px; /* 아이콘 크기 조정 */
}

.comment-buttons button:hover i {
  color: darkgray;
}

.report-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.report-popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  border: none;
  background: none;
}

.report-popup-content h2 {
  margin: 0;
}

.report-popup-content textarea {
  width: 100%;
  margin-top: 10px;
}

.report-popup-content button {
  margin-top: 10px;
}
</style>