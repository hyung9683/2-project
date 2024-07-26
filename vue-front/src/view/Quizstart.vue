<template>
  <div class="quiz-container">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <div v-if="currentImage && !quizCompleted" class="quiz-image-container">
      <img :src="getImageUrl(currentImage)" alt="퀴즈 이미지" class="quiz-image"/>

      <!-- 힌트 표시 -->
      <div class="hints-container">
        <p v-if="imageAttemptsLeft === 2">힌트1 : {{ currentImage.hint1 }}</p>
        <p v-if="imageAttemptsLeft === 1">힌트2 : {{ currentImage.hint2 }}</p>
      </div>

      <!-- 정답 입력 필드와 확인 버튼 -->
      <div v-if="!feedback">
        <input v-model="userAnswer" placeholder="정답을 입력하세요" class="answer-input"/>
        <button @click="checkAnswer" :disabled="isAnswerChecked">확인</button>
      </div>

      <!-- 피드백 메시지 -->
      <p v-if="feedback">{{ feedback }}</p>
      <!-- 정답 표시 조건 수정: 오답일 때는 보이지 않도록 변경 -->
      <p v-if="isAnswerChecked && isCorrectAnswer">정답입니다! 다음 이미지로 넘어갑니다.</p>
      <p v-if="isAnswerChecked && !isCorrectAnswer && imageAttemptsLeft <= 0">
        정답은: {{ currentImage.answers }}
      </p>

      <!-- 다시 시도하기 버튼 -->
      <button v-if="isAnswerChecked && !isCorrectAnswer && imageAttemptsLeft > 0" @click="resetAttempt">다시 시도하기</button>
      <!-- 남은 기회 표시 -->
      <p v-if="!isAnswerChecked">남은 기회: {{ imageAttemptsLeft }}</p>
      <p v-if="imageAttemptsLeft <= 0 && !isAnswerChecked">기회를 모두 소진했습니다. 다음 이미지로 넘어가려면 버튼을 클릭하세요.</p>
      <!-- 다음 이미지 버튼 -->
      <button v-if="isAnswerChecked && (isCorrectAnswer || imageAttemptsLeft <= 0)" @click="nextImage">다음 이미지</button>
    </div>

    <!-- 퀴즈 완료 후 결과 표시 -->
    <div v-if="quizCompleted" class="quiz-result">
      <p>퀴즈가 완료되었습니다!</p>
      <p>총 맞춘 정답 개수: {{ correctAnswerCount }} / {{ numberOfQuizzes }}</p>
      <!-- 다시 시작 버튼 추가 -->
      <button @click="restartQuiz">다시 시작하기</button>
      <!-- 메인 페이지로 가는 버튼 추가 -->
      <button @click="goToHomePage">메인 페이지로 돌아가기</button>
    </div>

    <!-- 댓글 작성 및 리스트 -->
    <div class="comment-section">
      <h2>댓글</h2>
      <form @submit.prevent="submitComment" class="comment-form">
        <textarea v-model="newComment" placeholder="댓글을 입력하세요..." rows="4" required></textarea>
        <button type="submit" class="submit-comment-button">댓글 작성</button>
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
    <div v-if="quizCompleted" class="confetti">
      <span v-for="n in 100" :key="n" :style="{ top: `${Math.random() * 100}vh`, left: `${Math.random() * 100}vw`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 2}s` }"></span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      images: [], // 퀴즈 이미지 목록
      currentImage: null, // 현재 이미지
      userAnswer: '', // 사용자가 입력한 정답
      feedback: '', // 피드백 메시지
      currentIndex: 0, // 현재 이미지 인덱스
      shuffledImages: [], // 랜덤으로 섞인 이미지 목록
      numberOfQuizzes: 10, // 기본값 설정
      isCorrectAnswer: false, // 정답 여부
      isAnswerChecked: false, // 정답이 확인되었는지 여부
      correctAnswerCount: 0, // 맞춘 정답 개수
      quizCompleted: false, // 퀴즈 완료 여부
      comments: [], // 댓글 목록
      newComment: '',
      quizNo: this.$route.params.quizNo,
      imageAttemptsLeft: 3 // 각 이미지마다 남은 기회
    };
  },
  created() {
    // 쿼리 파라미터에서 개수를 가져옴
    this.numberOfQuizzes = parseInt(this.$route.query.count, 10) || 10;
  },
  mounted() {
    this.loadImages();
    this.loadComments();
  },
  methods: {
    loadImages() {
      axios.get(`http://localhost:3000/quiz/images?quiz_no=${this.$route.params.quizNo}`)
        .then(response => {
          this.images = response.data;
          this.shuffleImages();
          this.showNextImage();
        })
        .catch(error => {
          console.error('이미지 로드 중 오류 발생:', error);
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
    submitComment() {
      if (!this.newComment.trim()) return;

      const userNo = 1; // 실제로는 로그인된 사용자의 ID를 사용해야 합니다.

      axios.post(`http://localhost:3000/quiz/comments/${this.quizNo}`, { text: this.newComment, userNo })
        .then(response => {
          const newComment = {
            id: response.data.id,
            text: response.data.text,
            user_nick: response.data.user_nick,
            createdAt: response.data.createdAt
          };
          this.comments.push(newComment);
          this.newComment = ''; // 입력 필드 초기화
          this.scrollToBottom(); // 댓글 추가 후 스크롤 이동
        })
        .catch(error => {
          console.error('댓글 제출 중 오류 발생:', error);
        });
    },
    deleteComment(commentId) {
      axios.delete(`http://localhost:3000/quiz/delete/${this.quizNo}/${commentId}`)
        .then(() => {
          this.comments = this.comments.filter(comment => comment.id !== commentId);
        })
        .catch(error => {
          console.error('댓글 삭제 중 오류 발생:', error);
        });
    },
    reportComment(commentId) {
      axios.post(`http://localhost:3000/quiz/report/${this.quizNo}/${commentId}`)
        .then(() => {
          alert('댓글이 신고되었습니다.');
        })
        .catch(error => {
          console.error('댓글 신고 중 오류 발생:', error);
        });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const commentList = this.$refs.commentList;
        commentList.scrollTop = commentList.scrollHeight;
      });
    },
    shuffleImages() {
      this.shuffledImages = this.images
        .sort(() => Math.random() - 0.5)
        .slice(0, this.numberOfQuizzes);
    },
    showNextImage() {
      if (this.currentIndex >= this.shuffledImages.length) {
        this.quizCompleted = true;
        return;
      }

      this.currentImage = this.shuffledImages[this.currentIndex];
      this.userAnswer = '';
      this.feedback = '';
      this.isCorrectAnswer = false;
      this.isAnswerChecked = false;
      this.imageAttemptsLeft = 3; // 각 이미지의 기회를 3으로 초기화
    },
    getImageUrl(image) {
      return `http://localhost:3000/uploads/${image.image_path}`;
    },
    checkAnswer() {
      const cleanedUserAnswers = this.userAnswer
        .split(',')
        .map(answer => answer.trim().toLowerCase());

      const correctAnswers = this.currentImage.answers
        .split(',')
        .map(answer => answer.trim().toLowerCase());

      const isCorrect = cleanedUserAnswers.every(answer => correctAnswers.includes(answer));

      if (isCorrect) {
        this.feedback = '정답입니다!';
        this.isCorrectAnswer = true;
        this.correctAnswerCount++;
        this.isAnswerChecked = true;
      } else {
        this.feedback = '오답입니다. 다시 시도해보세요.';
        this.isAnswerChecked = true;
        this.imageAttemptsLeft--; // 기회 1번 감소
        if (this.imageAttemptsLeft <= 0) {
          this.feedback = '기회를 모두 소진했습니다.';
          // 정답을 보이지 않게 하기 위해 `isCorrectAnswer` 상태는 유지
        }
      }
    },
    resetAttempt() {
      this.isAnswerChecked = false;
      this.feedback = '';
      this.userAnswer = '';
    },
    nextImage() {
      this.currentIndex++;
      this.showNextImage();
    },
    restartQuiz() {
      this.currentIndex = 0;
      this.correctAnswerCount = 0;
      this.quizCompleted = false;
      this.shuffleImages();
      this.showNextImage();
    },
    goToHomePage() {
      this.$router.push('/'); // 메인 페이지로 이동
    }
  }
};
</script>

<style>
.quiz-container {
  text-align: center;
  padding: 20px;
}

.quiz-image-container {
  margin-bottom: 20px;
}

.quiz-image {
  width: 300px; /* 이미지의 너비를 고정 */
  height: 200px; /* 이미지의 높이를 고정 */
  object-fit: cover; /* 이미지 비율을 유지하면서 잘라내기 */
  margin: 0 auto; /* 가운데 정렬 */
}

.answer-input {
  width: 100%; /* 입력 필드의 너비를 100%로 설정 */
  max-width: 500px; /* 최대 너비 설정 */
  height: 50px; /* 높이 설정 */
  margin: 10px 0;
  padding: 10px; /* 여백 추가 */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px; /* 폰트 크기 조정 */
  font-family: Arial, sans-serif; /* 폰트 패밀리 설정 */
}

button {
  height: 50px; /* 버튼의 높이 설정 (정답 입력 칸과 동일) */
  padding: 0 20px; /* 좌우 패딩 설정 */
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  background-color: #0056b3;
}

.quiz-result {
  margin-top: 20px;
}

.comment {
  position: relative; /* 상대 위치 지정 */
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: left; /* 왼쪽 정렬 */
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

.comment-section textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  resize: vertical; /* 세로로만 크기 조절 가능 */
}

.comment-section .comment-form {
  display: flex;
  flex-direction: column;
}

.comment-section .submit-comment-button {
  align-self: flex-start; /* 왼쪽 정렬 */
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px; /* 버튼과 텍스트 에어리어 간의 여백 */
}

.comment-section .submit-comment-button:hover {
  background-color: #0056b3;
}

.comment-list {
  margin-top: 20px;
  text-align: left; /* 왼쪽 정렬 */
}

/* 아이콘 크기와 버튼 크기 조정 */
.comment-buttons button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px; /* 버튼 크기 조정 */
  height: 30px; /* 버튼 크기 조정 */
}

.comment-buttons i {
  font-size: 18px; /* 아이콘 크기 조정 */
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

.comment-section h2 {
  text-align: left; /* 제목을 왼쪽으로 정렬 */
  margin-left: 0; /* 제목의 왼쪽 여백을 제거 */
}

@keyframes confetti-fall {
  0% { transform: translateY(-100vh); opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

.confetti {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 9999;
}

.confetti span {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 100, 100, 0.8); /* 기본 꽃가루 색상 */
  border-radius: 50%;
  opacity: 0;
  animation: confetti-fall 2s ease-in forwards;
  transform: rotate(45deg);
}

.confetti span:nth-child(2) { background-color: rgba(100, 255, 100, 0.8); }
.confetti span:nth-child(3) { background-color: rgba(100, 100, 255, 0.8); }
.confetti span:nth-child(4) { background-color: rgba(255, 255, 100, 0.8); }
</style>