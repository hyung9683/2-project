<template>
  <div class="container">
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
          </div>
        </div>
      </div>

      <!-- 조회수 상위 4개의 퀴즈 카드들 -->
      <div class="top-quizzes">
        <h2>상위 4개의 퀴즈</h2>
        <div class="top-quiz-grid">
          <div 
            class="top-quiz-card" 
            v-for="quiz in topQuizzes" 
            :key="quiz.quiz_no"
            @click="navigateToQuizDetail(quiz.quiz_no)"
          >
            <img 
              :src="getImageUrl(quiz)" 
              alt="퀴즈 이미지" 
              class="quiz-image"
            >
            <div class="quiz-details">
              <h3>{{ quiz.quiz_tit }}</h3>
              <p>{{ quiz.quiz_content }}</p>
              <p>조회수: {{ quiz.quiz_view }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 버튼 영역 -->
    <div class="button-container">
      <div class="button-row">
        <button @click="navigateToStart(10)" aria-label="10개 풀기" type="button" class="ant-btn ant-btn-default CommonButton_root__6p8FJ CommonButton_primary__10UD9">
          <article class="ant-typography CommonButton_label__7JkWE CommonButton_normalLabel__P_TBl">10개 풀기</article>
        </button>
        <button @click="navigateToStart(20)" aria-label="20개 풀기" type="button" class="ant-btn ant-btn-default CommonButton_root__6p8FJ CommonButton_primary__10UD9">
          <article class="ant-typography CommonButton_label__7JkWE CommonButton_normalLabel__P_TBl">20개 풀기</article>
        </button>
        <button @click="navigateToStart(30)" aria-label="30개 풀기" type="button" class="ant-btn ant-btn-default CommonButton_root__6p8FJ CommonButton_primary__10UD9">
          <article class="ant-typography CommonButton_label__7JkWE CommonButton_normalLabel__P_TBl">30개 풀기</article>
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
              <i class="fas fa-trash"></i>
            </button>
            <button @click="reportComment(comment.id)" class="report-button" aria-label="댓글 신고">
              <i class="fas fa-flag"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      topQuizzes: [],
      quizzes: [],
      quizNo: this.$route.params.quizNo,
      quizCategory: null,
      comments: [],
      newComment: ''
    };
  },
  mounted() {
    this.loadQuizzes();
    this.loadComments();
  },
  watch: {
    quizCategory(newCategory) {
      if (newCategory) {
        this.loadTopQuizzes();
      }
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
      this.$router.push(`/quiz/${quizNo}`);
    },
    submitComment() {
      if (!this.newComment.trim()) return;

      const userNo = 1; // 실제 로그인된 사용자의 ID를 사용해야 합니다.
      axios.post(`http://localhost:3000/quiz/comment/${this.quizNo}`, {
        user_no: userNo,
        comment: this.newComment
      })
      .then(response => {
        this.comments.push({
          id: response.data.id,
          text: this.newComment,
          user_nick: '익명', // 실제 사용자의 닉네임을 사용해야 합니다.
          createdAt: new Date()
        });
        this.newComment = '';
      })
      .catch(error => {
        console.error('댓글 작성 중 오류 발생:', error);
      });
    },
    deleteComment(commentId) {
      axios.delete(`http://localhost:3000/quiz/comment/${commentId}`)
        .then(() => {
          this.comments = this.comments.filter(comment => comment.id !== commentId);
        })
        .catch(error => {
          console.error('댓글 삭제 중 오류 발생:', error);
        });
    },
    reportComment(commentId) {
      axios.post(`http://localhost:3000/quiz/comment/report/${commentId}`)
        .then(() => {
          alert('댓글이 신고되었습니다.');
        })
        .catch(error => {
          console.error('댓글 신고 중 오류 발생:', error);
        });
    }
  }
};
</script>

<style scoped>
.button-container {
  margin-bottom: 20px; /* 버튼과 일반 퀴즈 카드 사이에 여백 추가 */
  text-align: center; /* 버튼을 가운데로 정렬 */
}

.button-row {
  width: 100%; /* 버튼의 너비를 부모 요소에 맞춤 */
  display: flex;
  justify-content: center;
  gap: 10px; /* 버튼 간격 조절 */
}

/* 일반 퀴즈 카드 스타일 */
.quiz-card {
  margin-bottom: 20px; /* 각 퀴즈 카드 사이에 여백 추가 */
}

.quiz-card-content {
  display: flex; /* 플렉스 박스 사용 */
  flex-direction: column; /* 세로 방향 정렬: 이미지가 위에, 텍스트가 아래에 위치 */
  align-items: center; /* 수평 가운데 정렬 */
  gap: 10px; /* 이미지와 텍스트 사이 여백 */
}

.card-thumbnail {
  width: 120px; /* 이미지 너비 조절 */
  height: 120px; /* 이미지 높이 조절 */
  object-fit: cover; /* 이미지 비율 유지하며 자르기 */
  margin-top: 100px; /* 이미지 상단 여백 추가 */
}

.quiz-detail {
  text-align: center; /* 텍스트 중앙 정렬 */
}

.quiz-detail h3 {
  margin: 0; /* 제목 여백 제거 */
  font-size: 18px; /* 제목 폰트 크기 조절 */
}

.quiz-detail p {
  margin: 0; /* 단락 여백 제거 */
  font-size: 14px; /* 단락 폰트 크기 조절 */
}

/* 상위 퀴즈 카드 스타일 */
.top-quizzes {
  margin-top: 40px; /* 상위 퀴즈 영역과 일반 퀴즈 카드 사이에 여백 추가 */
  text-align: right; /* 퀴즈 제목을 오른쪽으로 정렬 */
}

.top-quiz-grid {
  display: flex;
  flex-direction: column; /* 세로 방향 정렬 */
  gap: 20px; /* 카드 사이 여백 */
  align-items: flex-end; /* 카드를 오른쪽으로 정렬 */
}

/* 상위 퀴즈 카드 스타일 */
.top-quiz-card {
  display: flex; /* 플렉스 박스 사용 */
  flex-direction: row; /* 이미지와 텍스트를 가로로 나열 */
  align-items: center; /* 세로 가운데 정렬 */
  gap: 10px; /* 이미지와 텍스트 사이 여백 */
  border: 1px solid #ddd; /* 카드 테두리 */
  border-radius: 8px; /* 카드 모서리 둥글게 */
  padding: 10px; /* 카드 내부 여백 */
  background: #fff; /* 카드 배경색 */
  max-width: 400px; /* 카드 최대 너비 설정 */
}

.quiz-details {
  flex: 1; /* 텍스트 영역이 이미지의 나머지 공간을 차지하도록 설정 */
  width: 200px; /* 글씨칸의 너비를 고정 */
  height: 120px; /* 글씨칸의 높이를 고정 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 텍스트가 넘칠 경우 생략 부호 표시 */
  white-space: normal; /* 텍스트가 줄 바꿈 되도록 설정 */
  display: flex;
  flex-direction: column; /* 세로 방향 정렬 */
  justify-content: space-between; /* 텍스트의 공간을 일정하게 배분 */
}

.quiz-details h3 {
  margin-top: 0; /* 제목 위 여백 제거 */
  margin-bottom: 10px; /* 제목 아래 여백 추가 */
  font-size: 16px; /* 제목 폰트 크기 조절 */
}

.quiz-details p {
  margin: 0; /* 단락 여백 제거 */
  font-size: 14px; /* 단락 폰트 크기 조절 */
}

.quiz-image {
  width: 100px; /* 이미지 너비 설정 */
  height: 100px; /* 이미지 높이 설정 */
  object-fit: cover; /* 이미지 비율 유지하며 자르기 */
}

.quiz-details {
  flex: 1; /* 텍스트 영역이 이미지의 나머지 공간을 차지하도록 설정 */
  padding: 10px;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  color: #fff; /* 텍스트 색상 */
  max-width: 300px; /* 텍스트 영역의 최대 너비 설정 */
  overflow: hidden; /* 텍스트가 넘칠 경우 숨기기 */
  text-overflow: ellipsis; /* 텍스트가 넘칠 경우 생략 부호 표시 */
  white-space: nowrap; /* 텍스트가 줄 바꿈 없이 한 줄로 표시되도록 설정 */
}

/* 댓글 영역 스타일 */
.comment {
  position: relative; /* 상대 위치 지정 */
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.comment:last-child {
  border-bottom: none;
}

/* 댓글 버튼 스타일 */
.comment-buttons {
  position: absolute; /* 절대 위치 지정 */
  right: 10px; /* 오른쪽 여백 */
  top: 50%; /* 수직 중앙 정렬 */
  transform: translateY(-50%); /* 수직 중앙 정렬 보정 */
  display: flex;
  gap: 5px; /* 버튼 사이 여백 */
}

.comment-buttons button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.comment-buttons i {
  font-size: 16px; /* 아이콘 크기 조절 */
  color: gray; /* 기본 색상 */
}

.comment-buttons button:hover i {
  color: darkgray; /* 호버 시 색상 변경 */
}

/* 댓글 입력 영역 및 버튼 스타일 */
.comment-section textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  resize: vertical; /* 세로로만 크기 조절 가능 */
}

.comment-section button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.comment-section button:hover {
  background-color: #0056b3;
}

.comment-list {
  margin-top: 20px;
}

/* 버튼 스타일 */
.CommonButton_root__6p8FJ {
  height: 50px; /* 버튼 높이 설정 */
  border: none !important;
  border-radius: 4px !important;
}

.CommonButton_root__6p8FJ:hover {
  border: none !important;
}

.CommonButton_root__6p8FJ:focus-visible {
  outline: none !important;
}

.CommonButton_primary__10UD9 {
  background-color: #6f2cdb !important;
  color: #fff !important;
}

.CommonButton_primary__10UD9:hover {
  background-color: #550ec2 !important;
  color: #fff !important;
}

.CommonButton_primary__10UD9 .CommonButton_label__7JkWE {
  color: #fff !important;
}
</style>